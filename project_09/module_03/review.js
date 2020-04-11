// # Review for Module 03

// Object Destructuring

const person = {
  pet: 'Dog',
  name: 'Eliot',
  sport: 'Snow',
  place: 'Nantucket',
}
// destructuring selected properties of an object
const {place: island, name} = person;
console.log('>>>>>>>>> island', island);


const listPeople = ['Eliot', 'Preston'];

const [eliot, preston] = listPeople;

// // looping over objects
// for(const key in person) {
//   console.log(`The current key is ${key}`)
//   console.log(`The current prop is ${person[key]}`)
// }

// Array Destructuring


const lizardsArr = ['FrankieDoo', 'Argo', 'GeicoGuy'];
const firstLizard = lizardsArr[0];

const [foo] = lizardsArr;
const [, second, third, fourth] = lizardsArr;

console.log('>>>>>>>>> foo', foo);
console.log('>>>>>>>>> second', second);
console.log('>>>>>>>>> fourth', fourth);

const BASE_URL = 'https://api.harvardartmuseums.org';
const KEY = 'apikey=351673f0-777e-11ea-b7b8-399da107d1d6'; // USE YOUR KEY HERE
const fetchData = async () => {
  try {
    const response = await fetch(`${ BASE_URL }/century?${ KEY }`);
    const data = await response.json();
    return data.records;
  } catch(err) {
    console.error(err)
  }
}

// const fetchData = () => {
//   return fetch(`${ BASE_URL }/century?${ KEY }`)
//     .then(response => {
//       return response.json()
//     })
//     .then(data => {
//       return data
//     })

// }

// fetch(`${ BASE_URL }/century?${ KEY }`)
//   .then(response => {
//     // console.log(response.json());
//     return response.json();
//   })
//   .then(data => {
//     console.log('>>>>>>>>> data', data);
//     return data
//   })
//   .catch(err => {
//     console.error(err)
//   })
//   .finally(() => {
//     console.log('were done!')
//   })
// // fetchData();



// Promise.all

// const bootstrap = async() => {
//   // without destructuring
//   // const arrOfPromises = [fetchData(), fetchData()];
//   // const resolvedPromises = await Promise.all(arrOfPromises);

//   // with destructuring
//   const [data1, data2] = await Promise.all([fetchData(), fetchData()]);

//   console.log('>>>>>>>>> data1', data1);
//   console.log('>>>>>>>>> data2', data2);
//   // const data = await fetchData();
//   // const data2 = await fetchData();
//   // console.log('>>>>>>>>> data', data);
//   // console.log('>>>>>>>>> data2', data2);

// }
// bootstrap();


// async functions broadly
// BELOW WILL ONLY WORK IN NODE
// const fs = require('fs');
// const path = require('path');

// fs.readFile(path.join(__dirname, 'someText.txt'), {encoding: 'utf8'}, function(err, data) {
//   if (err) {
//     console.error(err);
//   }
//   console.log(data);
// });



