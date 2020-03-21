// Get access to page
const app = $('#app');

const ROCK = 'ROCK';
const PAPER = 'PAPER';
const SCISSORS = 'SCISSORS';
const NONE = 'NONE';
const NONE_URL = 'https://lh3.googleusercontent.com/proxy/-yo0GGObyXh-XDC01NgN0mxWU3qs6gR-a0kKYsloDYfNhESR0j3WXTlxN_0hNg_YTH3pLrI41Di4XxT5CpCP2P64HD8Qfs79m3Agh4ss4jetC3_wPq5z8mK0J2lVO2wG';

// Define initial state
// PlayerMoves and Choices
const state = {
  playerOneChoice: NONE,
  playerTwoChoice: NONE,
  winner: null,
  choices: {
      ROCK: 'https://i.redd.it/brxxveprs2e01.png',
      PAPER: 'https://www.pngfind.com/pngs/m/283-2836733_crumpled-paper-ball-paper-trash-transparent-background-hd.png',
      SCISSORS: 'https://www.pinclipart.com/picdir/middle/42-422590_child-scissors-png-clip-art-royalty-free-stock.png',
  },
};

// Render - Render an initial view

const renderChoice = (lastChoice) => {
  const imageUrl = state.choices[lastChoice];

  const img = $(`<img src='${imageUrl || NONE_URL}' />`)

  img.css({
    width: '150px',
    height: '150px',
    margin: '10px 0px',
  });

  return img;
};

const checkCases = (player, opponent, name) => {
  if (player === ROCK && opponent === SCISSORS) {
    return name;
  }

  if (player === SCISSORS && opponent === PAPER) {
    return name;
  }

  if (player === PAPER && opponent === ROCK) {
    return name;
  }

  return null;
};

const determineWinner = () => {
  const p1 = state.playerOneChoice;
  const p2 = state.playerTwoChoice;

  if (p1 === p2) {
    return false;
  }

  const playerOneWin = checkCases(p1, p2, 'Player One');

  if (playerOneWin) {
    state.winner = playerOneWin;
    return true;
  }

  const playerTwoWin = checkCases(p2, p1, 'Player Two');

  if (playerTwoWin) {
    state.winner = playerTwoWin;
    return true;
  }

  return false;
};

const clickHandler = (choice) => {
  state.winner = null;
  // Take the choice from the human and set it
  state.playerOneChoice = choice;
  // Need to create a choice for theee AI

  const choices = Object.keys(state.choices);

  const randIdx = Math.floor(Math.random() * 3);

  state.playerTwoChoice = choices[randIdx];
  // Look at both choices and determine if someone won

  const gameOver = determineWinner();

  // Render
  render();
};

const renderPlayer = (human, lastChoice) => {
  const player = $('<div>');
  player.css({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'flex-start',
    'align-items': 'center',
    'background-color': 'peru',
    width: '40%',
    height: '90%',
    border: 'solid 1px black',
    display: 'flex',
    margin: '10px',
    'flex-direction': 'column',
  });

  // Player Title ✅
  // An image of their choice ✅
  // Buttons to select choice ✅

  const title = $(`<h3> ${human ? 'Player 1' : 'Player 2'} </h3>`)
  player.append(title);

  const img = renderChoice(lastChoice);
  player.append(img);

  if (human) {
    // [ROCK, PAPER, SCISSORS]
    const choices = Object.keys(state.choices);

    // Map to turn it into [<button />, ...]
    const buttons = choices.map((choice) => {
      const button = $(`<button> ${choice} </button>`);
      button.css({
        width: '90%',
        margin: '10px 0px',
      });

      button.click(() => clickHandler(choice));

      return button;
    });

    // Appending each button
    buttons.forEach((button) => {
      player.append(button)
    });
  }

  return player;
};

const renderTitle = () => {
  const titleContainer = $('<div>');

  titleContainer.css({
    'text-align': 'center',
  });

  const title = $('<h1> rock, paper, scissors </h1>');

  titleContainer.append(title);

  if (state.winner) {
    const winnerText = $(`<h2> ${state.winner} has won! </h2>`);
    winnerText.css({
      color: 'green',
    });

    titleContainer.append(winnerText);
  }

  return titleContainer;
};

function render() {
  app.empty();
  app.append(renderTitle());

  const gameContainer = $('<div>');
  gameContainer.css({
    display: 'flex',
    width: '100%',
    'flex-grow': 1,
    'flex-direction': 'row',
    'justify-content': 'space-between',
    'align-items': 'center',
  });

  const humanChoice = state.playerOneChoice;
  const aiChoice = state.playerTwoChoice;

  gameContainer.append(renderPlayer(true, humanChoice));
  gameContainer.append(renderPlayer(false, aiChoice));

  app.append(gameContainer);
};

// Interactivity

$(document).ready(render);
