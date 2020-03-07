console.log('---------------');

const testArray = [1, 2, 3, 4, 5];

// find
// finds an element in an array or returns undefined

const foundElement = testArray.find(function (elem) {
  // Shortform:
  return elem === 5;

  // Longform:
  // if (elem === 5) return true;
  // else return false;
});

// console.log('Found Element: ', foundElement);

// indexOf
// Another search method on arrays, but instead of returning us an element, it returns an index. It returns -1 if not found.
// indexOf never takes a function, it only takes a value to search for.

// DONT DO THIS!
// testArray.indexOf(function(elem) {
//
// });

const foundIndex = testArray.indexOf(1);

if (foundIndex !== -1) {
  // do the thing - it exists
}

// console.log('Found Index: ', foundIndex);

// splice <--- most powerful
// Splice allows us to modify an array in a variety of ways.
// We can add elements anywhere in the array, and we can remove elements from anywhere in the array. Furthermore, we can actually use splice to retrieve elements from an array.
// Splice can be given negative numbers for the start argument, and it will work leftwards from the right side of the list that many indexes.

const spliceArray = ['a', 'b', 'c', 'd', 'e'];

// Splice returns an array of all removed elements, not a single removed element.
const removedElem = spliceArray.splice(-2, 1);

// console.log('Removed Element: ', removedElem);
// console.log('Splice Array after Splice: ', spliceArray);

// You can insert many items, not just one.
spliceArray.splice(2, 0, 'f');

// Very common for insertions not on the ends of arrays.
// Because on the ends, wed use: push, unshift

// console.log('Splice Array after Insert using Splice: ', spliceArray);

// filter <--- most commonly used

function removeOddOrEven(oddOrEven, list) {
  if (oddOrEven === 'even') {
    return list.filter(function (elem) {
      return elem % 2 === 1;
    });
  } else if (oddOrEven === 'odd') {
    return list.filter(function (elem) {
      return elem % 2 === 0;
    });
  } else {
    console.log('Error you made a mistake! Can only take "odd" or "even" as an argument.');
    return list;
  }
}

// console.log('Remove Evens: ', removeOddOrEven('even', testArray));
//
// console.log('Remove Odds: ', removeOddOrEven('odd', testArray));

const finalTestList = ['true', 'false'];

const filteredList = finalTestList.filter(function (elem) {
  return elem.length > 4;
});

// console.log('Filtered List: ', filteredList);
// console.log('Original List: ', finalTestList);

// Start of JQUERY

const body = $('body');

body.css({
  'background-color': 'red',
});

const app = $('.app');

const container = $('<div>');
const input = $('<input type="text" />');
const button = $('<button> Enter </button>');

const cardContainer = $('<div>');

container.css({
  display: 'flex',
  width: '100vw',
  height: '100px',
  'justify-content': 'center',
  'align-items': 'space-between',
  'flex-direction': 'column',
});

container.append(input);
container.append(button);

app.append(container);
app.append(cardContainer);

const inputList = [];

function clickHandler() {
  const inputVal = input.val();
  input.val('');
  inputList.push(inputVal);
  console.log(inputList);
  render();
}

const cardStyle = {
  border: 'solid 1px black',
  height: '25px',
  'background-color': 'blue',
  color: 'white',
};

function createCard(text) {
  const newCard = $('<div>');
  newCard.css(cardStyle);
  newCard.text(text);

  return newCard;
}

function render() {
  // Clear previous items from cardContainer .empty() ✅
  // Go over list ✅
  // filter out empty strings ✅
  // other stuff, we create a card for ✅
  // we attach that card to the cardContainer ✅
  cardContainer.empty();

  const filteredList = inputList.filter(function (elem) {
    return elem !== '';
  });

  filteredList.forEach(function (elem) {
    const createdCard = createCard(elem);
    cardContainer.append(createdCard);
  });
}

button.click(clickHandler);

