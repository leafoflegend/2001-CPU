// The following pattern will match all characters that are not alphanumeric.
const pattern = /[^a-zA-Z0-9]/gm;

const str = 'as dg5&34*5A';

const arrOfNonallowed = str.match(pattern);

console.log('>>>>>>>>> arrOfNonallowed', arrOfNonallowed);

if (arrOfNonallowed && arrOfNonallowed.length) {
  throw new Error('Oops!  No funny characters!')
}

// const newStr = str.match(pattern).join('');

// console.log('>>>>>>>>> newStr', newStr);

const exampleHTML = `<input required pattern="[A-Za-z]" title="Only non-funny characters" id="form"></input>`;
