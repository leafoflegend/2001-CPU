// The following pattern will match all characters that are not alphanumeric.
const pattern = /[^a-zA-Z0-9]/gm;

const str = 'as dg5345A';

const arrOfNonallowed = str.match(pattern);

console.log('>>>>>>>>> arrOfNonallowed', arrOfNonallowed);

if(arrOfNonallowed && arrOfNonallowed.length) {
  throw new Error('Oops!  No funny characters!')
}

