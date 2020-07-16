const { User, Group, Post, sync } = require("./index");

const users = [
  { firstName: "Justin", lastName: "Cook", age: 22 },
  { firstName: "Justi", lastName: "Coo", age: 22 },
  { firstName: "Just", lastName: "Co", age: 22 },
  { firstName: "Jus", lastName: "C", age: 22 },
];

const groups = [
  { name: "Javascript", category: "computer science" },
  { name: "Java", category: "computer science" },
  { name: "Discrete Math", category: "computer science" },
  { name: "Linear Algebra", category: "math" },
];

const posts = [
  { title: "Closure", content: "So cool" },
  { title: "OOP", content: "So cool" },
  { title: "Set Theory", content: "So cool" },
  { title: "Transformations", content: "So cool" },
];

sync(true)
  .then(async () => {
    const groupsCreated = await Group.bulkCreate(groups);
    const usersCreated = await User.bulkCreate(users);

    const postsCreated = await Post.bulkCreate(posts.map((post, i) => {
      return {
        ...post,
        UserId: usersCreated[i].id,
        GroupId: groupsCreated[i].id
      };
    }));

    const post = await Post.findAll({
      where: {
        title: "OOP"
      },
      include: [{ model: User }, { model: Group }]
    });

    console.log(post);
    console.log(post[0].User);
    console.log(post[0].Group);
  })
  .catch(console.error);


