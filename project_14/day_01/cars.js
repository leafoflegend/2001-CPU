const express = require('express');
const { db } = require('./db.js');

const carsRouter = express.Router();

carsRouter.get('/', async (req, res) => {
  const { rows: cars } = await db.query(`
    SELECT * FROM cars;
  `);

  res.send(cars);
});

carsRouter.post('/', async (req, res) => {
  const { make, model, year } = req.body;

  if (
    typeof make !== 'string' ||
    typeof model !== 'string' ||
    typeof year !== 'number'
  ) {
    res.status(400).send({
      message: 'You must enter a make, model, and year.',
    });
  }

  await db.query(`
    INSERT INTO cars (make, model, year)
    VALUES (
      $1,
      $2,
      $3
    );
  `, [make, model, year]);

  // createdCar = res.rows[0];
  const { rows: [createdCar] } = await db.query(`
    SELECT * FROM cars
    WHERE "make"=$1 AND "model"=$2 AND "year"=$3
    LIMIT 1;
  `, [make, model, year]);

  res.send(createdCar);
});

module.exports = carsRouter;
