const { getStats } = require('./b.js');

const raisePokemon = (pokemon) => {
  const stats = getStats(pokemon);

  ++stats.level;

  return pokemon;
}

const lookupPokemon = (id) => {
  const pokemon = getById(id);

  return pokemon;
}

module.exports = {
  raisePokemon,
  lookupPokemon,
};
