const bcrypt = require('bcrypt');

// Our terrible hashing function.
// Given any input, generate an output. Given the same input any amount of times - generate the same output.
// const hashingFunction = (salt, s) => {
//   const stringToHash = `${salt}${s}`;
//
//   let hashedStr = stringToHash
//     .split('')
//     .map(char => char.charCodeAt(0))
//     .join('');
//
//   if (hashedStr.length < 30) {
//     const remainder = 30 - hashedStr.length;
//
//     for (let i = 0; i < remainder; ++i) {
//       hashedStr += i;
//     }
//   }
//
//   if (hashedStr.length > 30) {
//     hashedStr = hashedStr.substr(0, 30);
//   }
//
//   return hashedStr;
// };

const hashingFunction = async (str) => {
  const hash = await bcrypt.hash(str, 10);

  console.log(hash);

  return hash;
}

const compare = async (plain, hash) => {
  const comparisonResult = await bcrypt.compare(plain, hash);

  console.log(comparisonResult);

  return comparisonResult;
}

module.exports = {
  hashingFunction,
  compare,
};
