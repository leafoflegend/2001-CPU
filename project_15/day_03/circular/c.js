const { lookupPokemon } = require('./a.js');

const hydrateStats = (pokemon) => {
  const hydratedPokemon = lookupPokemon(pokemon);

  return hydratedPokemon.stats;
}

module.exports = {
  hydrateStats,
};

// a -> b -> c -> undefined (a)
