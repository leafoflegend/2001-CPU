let movies = [
  {
    title: 'Tombstone',
    genre: 'Western',
    watched: false,
  },
  {
    title: 'Idiocracy',
    genre: 'Comedy',
    watched: false,
  },
  {
    title: 'Space Jam',
    genre: 'Sports/Animated',
    watched: false,
  },
  {
    title: 'Shawshank Redemption',
    genre: 'Drama',
    watched: false,
  },
];

function createMovieCard(movie, index) {
  const container = $('<div>');

  const title = $(`<h1> ${movie.title} </h1>`);
  const genre = $(`<h2> ${movie.genre} </h2>`);
  const watchedCheckbox = $(`<input type="checkbox" />`);

  if (movie.watched) {
    watchedCheckbox.attr('checked', true);
  }

  watchedCheckbox.on('input', function () {
    const isChecked = $(this).is(':checked');

    movie.watched = isChecked;

    render();
  });

  container.append(title);
  container.append(genre);
  container.append(watchedCheckbox);

  container.css({
    color: 'white',
    border: 'solid 3px black',
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    'background-color': movie.watched ? 'green' : 'gray',
    margin: '5px',
    'margin-top': '0px',
  });

  return container;
}

function createHeader() {
  const header = $('<div>');

  header.css({
    width: '100vw',
    height: '35px',
    'text-align': 'center',
    position: 'fixed',
    'border-bottom': 'solid 3px black',
    'background-color': 'white',
  });

  let totalWatchedMovies = 0;

  movies.forEach(function (movie) {
    if (movie.watched) {
      ++totalWatchedMovies;
    }
  });

  header.text(`You've watched ${totalWatchedMovies} / ${movies.length} movies`);

  return header;
}

function render() {
  const body = $('body');

  body.empty();

  body.append(createHeader());

  const app = $('<div>');

  app.css({
    'padding-top': '40px',
  });

  movies.forEach(function (movie, index) {
    app.append(createMovieCard(movie, index));
  });

  body.append(app);

  localStorage.setItem(
    'movies',
    movies
  );
}

function firstRender () {
  const storedMovies = localStorage.getItem('movies');

  if (storedMovies) movies = JSON.parse(storedMovies);

  render();
}

$(document).ready(firstRender);
