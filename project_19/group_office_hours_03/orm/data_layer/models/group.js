const { DataTypes } = require("sequelize");

const { sequelize } = require("../connection");

const Group = sequelize.define('Group', {
  // Model attributes are defined here
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    // UNIQUE
    unique: true,
    validate: {
      notEmpty: true,
    }
  },
  category: {
    type: DataTypes.STRING,
    // adds a NOT NULL constraint in the table definition
    allowNull: false,
    // a JS validation before attempting to insert in db
    validate: {
      notEmpty: true,
      isIn: [['computer science', 'math']]
    }
  },
});

module.exports = Group;
