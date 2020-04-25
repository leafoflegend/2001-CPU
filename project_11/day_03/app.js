const app = $('#app');
const newDiv = $(`
  <blockquote class="blockquote">
    <p id="myId">hello again</p>
  </blockquote>
  <code>const myVar = 'something cool';</code>
`).data('aThing', [1, 4, 3])

const myDiv = newDiv.find('#myId');
myDiv.data('newThing', 'stuff');
console.log('>>>>>>>>> myDiv', myDiv);

app.append();
console.log('>>>>>>>>> ,', newDiv.data('aThing'));

console.log('>>>>>>>>> myDiv.data', myDiv.data('newThing'));
