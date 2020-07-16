const { DataTypes } = require("sequelize");

const { sequelize } = require("../connection");

const User = sequelize.define('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    // UNIQUE
    unique: true,
    validate: {
      notEmpty: true,
      isAlpha: true
    }
  },
  lastName: {
    type: DataTypes.STRING,
    // adds a NOT NULL constraint in the table definition
    allowNull: false,
    // a JS validation before attempting to insert in db
    validate: {
      notEmpty: true,
      isAlpha: true
    }
  },
  age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    }
  }
});

module.exports = User;
