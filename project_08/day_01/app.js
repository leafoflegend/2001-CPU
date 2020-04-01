// Failure

// 1 + 1 === 2
// Top to Bottom, Left to Right
// Computer systems should be certain

// function addTwoNums(numOne, numTwo) {
//   return numOne + numTwo;
// }

// console.log(addTwoNums(1, 2));

// Communicating over the internet.
// The second that our code starts to interact with external systems, we lose certainty. We can no longer trust our code will always work as expected.
// People or servers might not be connected to the internet.
// The thing were talking to, might no longer speak our language.
// It might speak our language but not want to talk to us.
// We might be communicating with the wrong thing, due to an address change.
// Hackers destroyed the DNS system, or something wild and crazy.
// Theres too many unknowns when communicating over the internet.

// Thats why we refer to communication over the internet as a "request" and "response" cycle. Requests ARENT ALWAYS FULFILLED.

// Before asynchronicity
// const server = {
//   getPosts: function() {
//     const internetUp = Math.random() * 10 >= 5;
//
//     if (!internetUp) throw new Error('Cannot respond to request.');
//
//     return [
//       {
//         title: 'My first quarantine',
//         body: 'it sucked',
//       },
//     ]
//   }
// };

// console.log(server.getPosts());

// Potential of failure

// const server = {
//   getPosts: function(cb, errCb) {
//     const internetUp = Math.random() * 10 >= 5;
//
//     setTimeout(function () {
//       if (!internetUp) errCb(new Error('Cannot respond to request.'));
//
//       console.log('Sending response!');
//
//       cb([
//         {
//           title: 'My first quarantine',
//           body: 'it sucked',
//         },
//       ]);
//     }, Math.random() * 2000);
//   }
// };

// How long?

// Brian: Wasnt ready when it executed

// Uncertainty of when?

// console.log(server.getPosts(
//   function (response) {
//     console.log(response);
//   },
//   function (error) {
//     console.log('Error received, ignoring.');
//   }),
// );

// console.log('We keep moving forward!');

// The function here is a callback...
// It runs, and gets called back to run, after the setTimeout is complete.
// setTimeout(function () {
//   // call this thing!
// }, 1000);

// We see the log above before the log in the server, because, javascript wants to be able to continue working, even while other things are happening in the background.
// This is part of what has made javascript successful.
// We want to be able to see a web page, and interact with it, even while it is making requests for other things that may take a long time. On youtubes page, we can click around, read reviews, etc, while the video is loading.

// How do we deal with failure? !!! Catch it

// Callback hell. People hate this. Its awful.


// Example to make you hate me and callbacks.
// server.getPosts(
//   function (response) {
//     console.log(response);
//     server.makePost(
//       response,
//       function(response) {
//         server.registerPostCreation()
//       },
//       function(err) {
//         home.registerError(err, function() {
//           console.log('Success registering error.');
//         })
//       }
//     )
//   },
//   function (error) {
//     console.log('Error received, ignoring.');
//   }),

// This is callback hell. We dont like this.

// Promises
// Promises are just pretty callbacks. They assure us of two things:

// Promises will:
// Fail
// or succeed.
// there is not inbetween.

// setTimeout(function () {
//
// }, 1000);

// I want to make a function that waits a certain amount of time.

// const delay = (ms) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > .5) reject();
//
//       resolve();
//     }, ms);
//   });
// };
//
// delay(500)
//   .then(() => {
//     console.log('Waited .5 second.');
//   })
//   .catch(() => {
//     console.log('Waiting failed.');
//   });

// const somePromise = new Promise(function (resolve) {
//   resolve();
// });
//
// somePromise.then(() => {
//   console.log('Success!');
// });
//
// somePromise.then(() => {
//   console.log('Success!');
// });
//
// somePromise.then(() => {
//   console.log('Success!');
// });
//
// somePromise.then(() => {
//   console.log('Success!');
// });

// Promises are just objects, and all .then or .catch do, is take your callback (the function you give it), and wait until YOU call resolve. When YOU CALL RESOLVE (or reject), it will CALL ALL THE FUNCTIONS YOU GAVE IT.

const createPost = (post) => {
  const container = $('<div>');

  container.css({
    margin: '10px',
    padding: '10px',
    border: 'solid 1px black',
  });

  const title = $(`<h3> ${post.title} </h3>`);
  const body = $(`<h3> ${post.body} </h3>`);

  container.append(title, body);

  return container;
};

window.fetch('https://jsonplace-univclone.herokuapp.com/posts')
  .then(response => {
    return response.json();
  })
  .then(data => {
    const allPosts = data.map(createPost);

    $(document).ready(() => $('#app').append(allPosts));
  })
  .catch(e => {
    $(document)
      .ready(() => $('#app').append(
        $(`<div> Not found! </div>`),
      ));
  });
