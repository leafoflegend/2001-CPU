const User = require("./user");
const Group = require("./group");
const Post = require("./post");

// Post - User associations
Post.belongsTo(User);
User.hasMany(Post);

// Post - Group associatons
Post.belongsTo(Group);
Group.hasMany(Post);

User.belongsToMany(Group, { through: 'UserGroups' });
Group.belongsToMany(User, { through: 'UserGroups' });

module.exports = {
  Post,
  User,
  Group,
};
