const { db, seed } = require('./db/index');
const { startServer, app } = require('./api/index');

app.get('/cheeses', async (req, res) => {
  const { rows: cheeses } = await db.query(`
    SELECT *
    FROM cheese;
  `);

  res.send({ cheeses });
});

app.post('/cheeses', async (req, res) => {
  const { name, meltable, stinky } = req.body;

  if (typeof name !== 'string' || typeof meltable !== 'boolean' || typeof stinky !== 'boolean') {
    res.status(400).send({
      message: 'Cheeses require that you specify how "stinky", "meltable", and what their "name" is.',
    });
  } else {
    try {
      await db.query(`
      INSERT INTO cheese (name, stinky, meltable)
      VALUES ($1, $2, $3);
    `, [name, stinky, meltable]);

      res.status(201).send({
        message: `Cheese ${name} added to DB successfully!`,
      });
    } catch (e) {
      res.status(409).send({
        message: `Cheese ${name} already exists in DB. Cannot add.`,
      });
    }
  }
});

seed()
  .then(startServer);

