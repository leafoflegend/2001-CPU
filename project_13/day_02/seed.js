const { Client } = require('pg');

const db = new Client('postgres://localhost:5432/2001_movies');

try {
  db.connect();
} catch (e) {
  console.error('Failed to connect to database.', e);
  process.exit(1);
}

const dropTable = (tableName) => {
  return db.query(`
    DROP TABLE IF EXISTS ${tableName};
  `);
}

const insertMovie = ({ title, year }) => {
  return db.query(`
    INSERT INTO movies (title, year) 
    VALUES ('${title}', ${year});
  `);
}

const insertActor = ({ name, movieTitle }) => {
  return db.query(`
    INSERT INTO actors (name, movie_id)
    VALUES (
      $1,
      (
        SELECT id 
        FROM movies 
        WHERE title=$2
      )
    );
  `, [name, movieTitle]);
}

const updateActor = (actorId, actorUpdates) => {
  const setArgs = Object
    .entries(actorUpdates)
    .map(([key, value]) => {
      if (typeof value === 'string') {
        return `"${key}"='${value}'`;
      } else {
        return `"${key}"=${value}`;
      }
    })
    .join(', ');

  return db.query(`
    UPDATE actors
    SET ${setArgs}
    WHERE id=$1;
  `, [actorId])
}

const seed = async () => {
  try {
    const tables = ['actors', 'movies'];
    for (let i = 0; i < tables.length; ++i) {
      const table = tables[i];
      await dropTable(table);
    }

    await db.query(`
      CREATE TABLE movies (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        year INTEGER NOT NULL
      );
    `);

    await db.query(`
      CREATE TABLE actors (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        movie_id INTEGER REFERENCES movies(id)
      );
    `)

    await insertMovie({
      title: 'Guardians of the Galaxy',
      year: 2014,
    });

    await insertMovie({
      title: 'Tropic Thunder',
      year: 2008,
    });

    await insertActor({
      name: 'Christopher Pratt',
      movieTitle: 'Guardians of the Galaxy',
    });

    await updateActor(
      1,
      {
        name: 'Chris Pratt',
        movie_id: 2,
      },
    );

    console.log('Success!');
    process.exit(0);
  } catch (e) {
    console.error('Error while seeding!', e);
    process.exit(1);
  }
}

seed();
