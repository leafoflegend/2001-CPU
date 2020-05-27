const axios = require('axios');

// Jest Globals
// expect
// describe
// it/test
// beforeEach

/*
TDD - Test Driven Development

You should never write code unless a test is failing. You write tests, you then write code until those tests pass.

1. You have to specify what you want your code to do, before you write your code.
2. It will confirm that old functionality continues to work, as we change the application.
*/

describe('Application', () => {
  describe('Server', () => {
    // Here is how you might go about storing a login token to use in each test
    // let token = '';
    //
    // beforeAll - runs once before all below tests
    // beforeEach(async () => {
    //   const res = await login();
    //
    //   token = res.token;
    // });

    it('responds to a request at /api/health with a message specifying it is healthy', async () => {
      const res = await axios.get('http://localhost:3000/api/health');

      expect(typeof res.data.message).toEqual('string');
    });

    it('responds to a request at /api/users with a list of users', async () => {
      const res = await axios.get('http://localhost:3000/api/users');

      res.data.users.forEach(user => {
        expect(typeof user.name).toEqual('string');
      });
    });
  });
});
