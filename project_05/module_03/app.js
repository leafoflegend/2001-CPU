/*

- CSS Grid
- reviewing global variables
- key presses (inputs) 
- increment cat image number (to change the image) if alt-clicking.
- If shift-clicking, decrement image number
- `.on('input', ...)`
- create text box at the top of the document for the title input, and 3 buttons (red blue green), and when a button is clicked and subsequently text is typed into the box, change the title and font color of the title.
- text manipulation - uppercase and lowercase buttons
- 6 string methods
  - In demo project
    - `toUpperCase()`
    - `toLowerCase()`
    - `slice()`
  - In JS Only
    - `split()`
    - `includes()`
    - `indexOf()`
- In JS Only - complex conditionals - `&&`, `||`, and `!`

QUESTIONS
- CSS Grid 
- 
*/

// let myVar = 'Im global'

// function myFunc () {
//   let myVar = 0;
//   console.log(myVar)
// }

// myFunc()

let operation;

function clickHandler(event) {
  console.log(event.shiftKey);
  const imgSrc = $(this).attr('src');
  console.log(imgSrc);
  let myPiece = imgSrc.slice(-3);
  // console.log(myPiece);
  if(event.shiftKey) {
    myPiece++;
  } else {
    myPiece--;
  }
  // console.log(myPiece);
  const newSrc = imgSrc.slice(0,-3) + myPiece;
  console.log(newSrc);
  $(this).attr('src', newSrc);
}

$('section img').click(clickHandler);

$('#gato-input').on('input', function(){
  let currentText = $(this).val();
  console.log(currentText);
  if (operation === 'uppercase') {
    currentText = currentText.toUpperCase();
  } else if(operation === 'lowercase') {
    currentText = currentText.toLowerCase();
  }
  $('h1').text(currentText);
})

$('button.transform').click(function(){
  console.log('clicking button')
  if($(this).text() === 'UPPERCASE') {
    operation = 'uppercase';
  } else {
    operation = 'lowercase';
  }
  console.log(operation)
})

// const myDiv = $('<div>Hello!<div>')
// $('footer').append(myDiv)

// myDiv.click(function(){ 
//   console.log('hello')
// });

// toUpperCase
// const myLowerCase = 'preston';
// console.log(myLowerCase)
// const myUpperCase = myLowerCase.toUpperCase();
// console.log(myUpperCase);
// const myNewLowerCase = myUpperCase.toLowerCase();
// console.log(myNewLowerCase);
// console.log(myUpperCase);

// // triple equals vs double equals

// const myNumStr = '1';
// const myNum = 1;
// console.log(myNumStr == myNum);

// Other string methods
// .split();

const myString = 'Brian is a - cool guy. I would like to talk to him more';
const myArr = myString.split('.');
console.log(myArr);
for(let i=0; i<myArr.length; ++i){
    let elem = myArr[i];
    console.log(elem.toUpperCase())
    
}

// .includes();

console.log(myString.includes('Preston'))

// .indexOf()

console.log(myString.indexOf('a'));