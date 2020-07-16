const { Sequelize } = require('sequelize');

const DATABASE_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/user_groups';

const sequelize = new Sequelize(DATABASE_URL);

const sync = async (force) => {
  await sequelize.authenticate();
  await sequelize.sync({ force });
};

module.exports = {
  sequelize,
  sync
};
