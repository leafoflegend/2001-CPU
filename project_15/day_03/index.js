const express = require('express');
const chalk = require('chalk');
const uuid = require('uuid');
const dotenv = require('dotenv');
const axios = require('axios');
const { Client } = require('pg');

const PORT = process.env.PORT || 3000;

dotenv.config();
const app = express();

const db = new Client(`postgres://localhost:5432/${process.env.DATABASE_URI || 'project_15_day_03'}`);

db.connect();

const createTables = async (clear = false) => {
  if (clear) {
    await db.query(`
      DROP TABLE IF EXISTS users;
    `);
  }

  await db.query(`
    CREATE TABLE IF NOT EXISTS users (
      uuid PRIMARY KEY NOT NULL,
      github_access_token TEXT NOT NULL,
      github_id TEXT NOT NULL
    );
  `)
}

const getAccessToken = async (code) => {
  const { data: { access_token: accessToken } } = await axios.post(
    'https://github.com/login/oauth/access_token',
    {
      code,
      client_id: process.env.GH_CLIENT_ID,
      client_secret: process.env.GH_CLIENT_SECRET,
    },
    {
      headers: {
        accept: 'application/json',
      },
    },
  );

  return accessToken;
};

const getUserDataFromGitHub = async (accessToken) => {
  const { data } = await axios.get('https://api.github.com/user', {
    headers: {
      authorization: `token ${accessToken}`,
    },
  });

  return data;
}

app.get('/login', async (req, res) => {
  await db.query(`
    INSERT INTO users (uuid)
    VALUES ($1);
  `, [uuid.v4()]);
});

app.get('/github_login', (req, res) => {
  res.redirect(`https://github.com/login/oauth/authorize?client_id=${process.env.GH_CLIENT_ID}`);
});

app.get('/github', async (req, res) => {
  const { code } = req.query;

  const accessToken = await getAccessToken(code);

  console.log('Access Token: ', accessToken);

  const { data: userData } = await getUserDataFromGitHub(accessToken);

  const githubId = userData.id.toString();

    const { rows: [user] } = await db.query(`
      SELECT *
      FROM users
      WHERE "github_id"=$1
    `, githubId);

    if (!user || !user.github_access_token) {
      // TODO: This doesn't work - due to lack of session we don't know who this user is at this point in time.
      await db.query(`
        UPDATE users
        SET "github_access_token"=$1, "github_id"=$2
        WHERE users.uuid=$3
      `, [accessToken, githubId,])
    }

    res.redirect('/');
});

app.listen(PORT, () => {
  console.log(chalk.green(`Server is now listening on PORT:${PORT}`));
});
