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

const insertActor = ({ name }) => {
  return db.query(`
    INSERT INTO actors (name)
    VALUES ($1);
  `, [name]);
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

const associateActorMovies = (actorId, movieId) => {
  return db.query(`
    INSERT INTO actor_movies (actor_id, movie_id)
    VALUES (
      $1,
      $2
    );
  `, [actorId, movieId]);
}

const getActorByName = async (actorName) => {
  const { rows: [actor] } = await db.query(`
    SELECT *
    FROM actors
    WHERE "name"=$1
    LIMIT 1
  `, [actorName]);

  return actor;
}

const getMovieByTitle = async (movieTitle) => {
  const { rows: [movie] } = await db.query(`
    SELECT *
    FROM movies
    WHERE "title"=$1
    LIMIT 1
  `, [movieTitle]);

  return movie;
}

const getActorMovies = async (actorId) => {
  const { rows } = await db.query(`
    SELECT * 
    FROM movies
    WHERE id 
    IN (
      SELECT movie_id 
      FROM actor_movies
      WHERE "actor_id"=$1
    );
  `, [actorId]);

  return rows;
}

const deleteMovie = (movieId) => {
  return db.query(`
    DELETE FROM movies
    WHERE "id"=$1;
  `, [movieId]);
}

const seed = async () => {
  try {
    const tables = ['actor_movies', 'actors', 'movies'];
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
        name TEXT NOT NULL
      );
    `)

    await db.query(`
      CREATE TABLE actor_movies (
        actor_id INTEGER REFERENCES actors("id") ON DELETE CASCADE NOT NULL,
        movie_id INTEGER REFERENCES movies("id") ON DELETE CASCADE NOT NULL,
        UNIQUE (actor_id, movie_id)
      );
    `);

    await insertMovie({
      title: 'Guardians of the Galaxy',
      year: 2014,
    });

    await insertMovie({
      title: 'Jurassic Park',
      year: 2008,
    });

    await insertActor({
      name: 'Christopher Pratt',
    });

    await updateActor(
      1,
      {
        name: 'Chris Pratt',
      },
    );

    const [actor, jurassic, guardians] = await Promise.all([
      getActorByName('Chris Pratt'),
      getMovieByTitle('Jurassic Park'),
      getMovieByTitle('Guardians of the Galaxy'),
    ]);

    await associateActorMovies(actor.id, jurassic.id);
    await associateActorMovies(actor.id, guardians.id);

    const actorMovies = await getActorMovies(actor.id);

    console.log(actorMovies);

    await deleteMovie(jurassic.id);

    const actorMoviesAfterDelete = await getActorMovies(actor.id);

    console.log(actorMoviesAfterDelete);

    console.log('Success!');
    process.exit(0);
  } catch (e) {
    console.error('Error while seeding!', e);
    process.exit(1);
  }
}

seed();
