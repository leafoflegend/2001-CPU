const { DataTypes } = require("sequelize");

const { sequelize } = require("../connection");

const Post = sequelize.define('Post', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  content: {
    type: DataTypes.TEXT,
    // adds a NOT NULL constraint in the table definition
    allowNull: false,
    // a JS validation before attempting to insert in db
    validate: {
      notEmpty: true
    }
  },
});

module.exports = Post;
