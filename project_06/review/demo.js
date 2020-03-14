/*
  Necessary for the workshop
    Arrays: indexOf, splice, push, pop, shift, unshift
    Objects: Accessing and updating properties
    Pushing to an array in an object
    Working with an element of an array as a parameter of a callback (i.e. in function passed to forEach)
    Updating global variables
    Keeping data consistent so that re-rendering is accurate
    Reading and writing data to elements using jQuery's .data() method
  Other stuff
    Arrays: pop, shift, unshift, forEach
    jQuery: Interpolating strings
    $(this) - what is it?
    localStorage (JSON.stringify() and JSON.parse())
*/

/*
  Notes on the workshop:
  - CONSOLE.LOG all over the place.  Many of the functions you won't know are working until you get later on in the app.  Console log the data you get so you know it's working.  Call functions manually.  (demo the first one as a blank function, just console.log('hello') inside the function)
  - advanceToNextServer() - It will NOT get called once you're done with this section. Test it by console logging `nextServer` inside the function and calling it in the Chrome console.
*/

let comicsList, favorites;

/*
  < -------------------------------------------- >

              BEGIN FETCH CODE

  < -------------------------------------------- >

Don't worry about what's going on here.  We haven't gone over this.  It gets comics based on an array of comic numbers.
*/

function getRandomNum(range = 600){
  return Math.round(Math.random() * range);
}

async function fetchSingleComic(comicNum) {
  comicNum = comicNum || getRandomNum();
  console.log('fetching comic for', comicNum)
  const response = await fetch(`https://xkcd.now.sh/?comic=${comicNum}`);
  const comic = await response.json();
  return comic;
}

async function addFiveRandomComics(){
  for (let i = 0; i < 5; ++i){
    const newComic = await fetchSingleComic();
    comicsList.unshift(newComic);
  }
  setAndRerender();
}
async function addSingleRandomComic(){
  const newComic = await fetchSingleComic();
  comicsList.unshift(newComic);
  setAndRerender();
}

async function fetchComics(arrOfNums = []) {
  if(!arrOfNums.length) {
    for(let i=0; i<10; ++i){
      let randNum = getRandomNum();
      arrOfNums.push(randNum);
    }
  }
  console.log('fetching comics for', arrOfNums)
  const responses = await Promise.all(arrOfNums.map(num => fetch(`https://xkcd.now.sh/?comic=${num}`)))
  const comicsList = await Promise.all(responses.map(response => response.json()));
  console.log(comicsList)
  return comicsList;
}

async function loadRandomComics(){
  comicsList = await fetchComics();
  setAndRerender();
}

/* < ----------- END FETCH CODE ----------- > */

// DEFAULT
const DEFAULT_COMICS = [
  {
    month: "2",
    num: 386,
    link: "",
    year: "2008",
    news: "",
    safe_title: "Duty Calls",
    transcript: "[[A stick man is behind computer]] Voice outside frame: Are you coming to bed? Man: I can't. This is important. Voice: What? Man: Someone is WRONG on the internet. {{title text: What do you want me to do? LEAVE? Then they'll keep being wrong!}}",
    alt: "What do you want me to do? LEAVE? Then they'll keep being wrong!",
    img: "https://imgs.xkcd.com/comics/duty_calls.png",
    title: "Duty Calls",
    day: "20"
  },
  {
    month: "11",
    num: 349,
    link: "",
    year: "2007",
    news: "",
    safe_title: "Success",
    transcript: "As a project wears on, standards for success slip lower and lower. 0 hours [[Woman looking at man working on the computer.]] Man: Okay, I should be able to dual-boot BSD soon. 6 hours [[Man on the floor fiddling with the open tower in front of him.]] Man: I'll be happy if I can get the system working like it was when I started. 10 hours [[Man standing in front of the computer which now has a laptop plugged into the tower.]] Man: Well the desktop's a lost cause, but I think I can fix the problems the laptop's developed. 24 hours [[Man and woman swimming in the sea, island and beach seen in the distance.]] Man: If we're lucky, the sharks will stay away until we reach shallow water. Woman: If we make it back alive, you're never upgrading anything again. {{ 40% of OpenBSD installs lead to shark attacks. It's their only standing security issue. }}",
    alt: "40% of OpenBSD installs lead to shark attacks. It's their only standing security issue.",
    img: "https://imgs.xkcd.com/comics/success.png",
    title: "Success",
    day: "26"
  },
  {
    month: "7",
    num: 614,
    link: "",
    year: "2009",
    news: "",
    safe_title: "Woodpecker",
    transcript: "[[A man with a beret and a woman are standing on a boardwalk, leaning on a handrail.]] Man: A woodpecker! <<Pop pop pop>> Woman: Yup. [[The woodpecker is banging its head against a tree.]] Woman: He hatched about this time last year. <<Pop pop pop pop>> [[The woman walks away. The man is still standing at the handrail.]] Man: ... woodpecker? Man: It's your birthday! Man: Did you know? Man: Did... did nobody tell you? [[The man stands, looking.]] [[The man walks away.]] [[There is a tree.]] [[The man approaches the tree with a present in a box, tied up with ribbon.]] [[The man sets the present down at the base of the tree and looks up.]] [[The man walks away.]] [[The present is sitting at the bottom of the tree.]] [[The woodpecker looks down at the present.]] [[The woodpecker sits on the present.]] [[The woodpecker pulls on the ribbon tying the present closed.]] ((full width panel)) [[The woodpecker is flying, with an electric drill dangling from its feet, held by the cord.]] {{Title text: If you don't have an extension cord I can get that too. Because we're friends! Right?}}",
    alt: "If you don't have an extension cord I can get that too. Because we're friends! Right?",
    img: "https://imgs.xkcd.com/comics/woodpecker.png",
    title: "Woodpecker",
    day: "24"
  },
  {
    month: "1",
    num: 15,
    link: "",
    year: "2006",
    news: "",
    safe_title: "Just Alerting You",
    transcript: "[[There is a man standing on top of a dinosaur (Brontosaurus?) and holding reins to the dinosaurs head.]] Man: Before you talk to me, I should warn you: I am kind of strange {{title text: Just thought you should know}}",
    alt: "Just thought you should know",
    img: "https://imgs.xkcd.com/comics/just_alerting_you.jpg",
    title: "Just Alerting You",
    day: "1"
  },
  {
    month: "1",
    num: 20,
    link: "",
    year: "2006",
    news: "",
    safe_title: "Ferret",
    transcript: "[[A ferret with airplane wings on it]] Friend: Why on earth did you make those wings? You don't seriously think they could let your ferret fly, right? Guy: I... of course not. Guy: That would be pretty dumb. It's just, uh... ...a Halloween costume. Friend: oh, okay. Friend: Besides, who would want a pet to fly anyway? Guy: Yeah. Pretty lame, huh? Friend: Anyway, let's go play video games. [[Friend leaves]] [[Friend is gone, and Guy is looking at ferret]] [[Guy imagines ferret flying over the ocean near the beach using his makeshift wings]] {{title text: My brother had a ferret he loved which died since I drew this strip. RIP.}}",
    alt: "My brother had a ferret he loved which died since I drew this strip. RIP.",
    img: "https://imgs.xkcd.com/comics/ferret.jpg",
    title: "Ferret",
    day: "1"
  },
  {
    month: "1",
    num: 25,
    link: "",
    year: "2006",
    news: "",
    safe_title: "Barrel - Part 4",
    transcript: "[[The barrel is shown, floating sideways in a choppy sea. The boy can not be seen]] {{title text: :( }}",
    alt: ":(",
    img: "https://imgs.xkcd.com/comics/barrel_part_4.jpg",
    title: "Barrel - Part 4",
    day: "1"
  },
  {
    month: "1",
    num: 35,
    link: "",
    year: "2006",
    news: "",
    safe_title: "Sheep",
    transcript: "Heading: Another from my high-school notebooks. [[A sheep and a potted saguaro cactus linked by an arcing yellow electricity bolt, drawn on graph paper]] {{title text: I think it's the sheep zapping the cactus and not vice-versa}}",
    alt: "I think it's the sheep zapping the cactus and not vice-versa",
    img: "https://imgs.xkcd.com/comics/sheep.jpg",
    title: "Sheep",
    day: "1"
  },
];

/*
  < -------------------------------------------- >

              BEGIN LIVE DEMO CODE

  < -------------------------------------------- >
*/

function buildComicCard(comic) {
  // accepts comic object. creates jquery and return it
  // want to use `img` `alt` `safe_title`
  const comicCard = $(`
    <section class="single-comic-card">
      <img src="${comic.img}"/>
      <h3>${comic.safe_title}</h3>
      <p class="comic-alt">${comic.alt}</p>
      <button class="action delete">DELETE</button>
      <button class="action edit">EDIT</button>
    </section>
  `);
  comicCard.data('comic', comic);
  return comicCard;
}

function render() {
  // empties main element and renders elements inside it based on comicsList
  $('.comic-list').empty();
  comicsList.forEach(function(comic){
    $('.comic-list').append(buildComicCard(comic));
  })

}

function loadComics() {
  // reads localStorage. Sets comicsList equal to that or the default comics
  const fromLocal = localStorage.getItem('comics');
  comicsList = fromLocal
  ? JSON.parse(fromLocal)
  : DEFAULT_COMICS
}

function setComics() {
  // takes whatever is in comicsList and sets to localStorage
  localStorage.setItem('comics', JSON.stringify(comicsList));
}

function loadAndRender(){
  // calls loadComics and rerenders
  loadComics();
  setAndRerender();
}

function setAndRerender() {
  // calls setComics and rerenders
  setComics();
  console.log(comicsList)
  render();
}

// click handlers
$('main').on('click', '.action.delete', function () {
  // click handler to delete a comic
  console.log('clicked!');
  const comicCard = $(this).closest('.single-comic-card');
  const comicObj = comicCard.data('comic')
  const index = comicsList.indexOf(comicObj)
  comicsList.splice(index, 1);
  comicCard.slideUp();
  setAndRerender();
})

$('.load-default').click(function(){
  // sets comicsList to default
  comicsList = DEFAULT_COMICS;
  setAndRerender();
})

// hook up the respective click handlers
$('.remove-first').click(function(){
  comicsList.shift();
  setAndRerender();
})

$('.remove-last').click(function(){
  console.log('remove last')
  comicsList.pop();
  setAndRerender();
})

$('.load-1-random').click(function(){
  addSingleRandomComic();
});

$('.load-5-random').click(addFiveRandomComics);
$('.load-random').click(loadRandomComics);

$('main').on('click', '.action.edit', function () {
  // click handler to edit a comic. This will be for Saturday!
  console.log('clicked EDIT');
  const para = $(this).siblings('.comic-alt');
  console.log(para);
  const text = para.text();
  console.log(text);
  const newInput = $(`<textarea>${text}</textarea>`);
  newInput.on('input', function(){
    const currVal = newInput.val();
    console.log(currVal);
    para.text(currVal);
  })
  const saveButton = $('<button>SAVE</button>');
  saveButton.click(function(){
    newInput.remove();
    $(this).remove();
  })
  const parent = $(this).parent();
  parent.append(newInput);
  parent.append(saveButton);
});

// make sure to render on initial load!



loadAndRender();


/* 
  < -------------------------------- >
                JS demo
  < -------------------------------- >
*/
const numbers = [1, 2, 3, 4, 5];

const two = numbers[numbers.indexOf(2)];
console.log(two)

const three = numbers[2];

const lastElem = numbers[numbers.length - 1];
console.log(lastElem);

// push, pop, shift, unshift

console.log(numbers);
numbers.push(6);
console.log(numbers);
numbers.unshift(0);
console.log(numbers);
numbers.pop();
console.log(numbers);
numbers.shift();
console.log(numbers);

const dogs = ['fido', 'butch', 'buck', 'max', 'yoda', 'zeus']

for (let i = 0; i < dogs.length; ++i) {
  console.log('the index: ', i);
  console.log('the dog: ', dogs[i]);
}

dogs.forEach(function(dog){
  console.log(`${dog} says "woof!"`);
});

// setting an item on localStorage.
localStorage.setItem('dogs', JSON.stringify(dogs));

// localStorage is much like an object literal. We have keys and values.  Like this object:
const newLocalStorage = {
  dogs: dogs
}
const unparsed = localStorage.getItem('dogs');
const fetchedDogs = JSON.parse(localStorage.getItem('dogs'));
console.log('unparsed', unparsed);
console.log('typeof unparsed', typeof unparsed);
console.log(fetchedDogs);
console.log('typeof fetchedDogs', typeof fetchedDogs);
console.log(Array.isArray(fetchedDogs))

// access value from array
const newButch = dogs[1];
// access value from object
const dogsArray = newLocalStorage.dogs;
// access via bracket notation
const dogsArray2 = newLocalStorage['dogs'];
