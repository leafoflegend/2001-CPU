const { hydrateStats } = require('./c.js');

const getStats = (pokemon) => {
  return hydrateStats(pokemon);
}

module.exports = {
  getStats,
};
