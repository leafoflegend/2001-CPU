const app = $('#app');

const API_URL = 'https://api.currentsapi.services/v1';
const API_KEY = 'bxbVukCM_lyco1x1IVgUKZUwM88RIWE9ESPytTb63ICwQiUU';
const LANG = 'en';
const INITIAL_FETCH_KEY = 'initial_news';
// 5 Minutes in Milliseconds
const CACHE_TIMEOUT = 1000 * 60 * 5;

const LATEST_NEWS_URL = `${API_URL}/latest-news?language=${LANG}&apiKey=${API_KEY}`;

const fetchJson = (url) => fetch(url)
  .then(res => res.json());

// Maybe store pieces of the URL in state...
const state = {
  fetchedItems: [],
};

const initialFetch = () => new Promise((res, rej) => {
  const initialFetchItems = localStorage.getItem(INITIAL_FETCH_KEY);

  if (!initialFetchItems) {
    fetchJson(LATEST_NEWS_URL)
      .then(({ news }) => {
        state.fetchedItems = news;
        localStorage.setItem(INITIAL_FETCH_KEY, JSON.stringify({
          news,
          timestamp: Date.now(),
        }));
        console.log('Got the news pipin fresh: ', news);
        res(news);
      })
      .catch(err => {
        console.error(err);
        rej(err);
      });
  } else {
    const { news, timestamp } = JSON.parse(initialFetchItems);

    console.log('Got some cold news: ', news);

    const now = Date.now();

    if (now - timestamp > CACHE_TIMEOUT) {
      console.log('content too old! refreshing content');
      localStorage.removeItem(INITIAL_FETCH_KEY);
      initialFetch()
        .then(res)
        .catch(rej);
    } else {
      console.log('cache is still fresh enough!');
      state.fetchedItems = news;
      res(news);
    }
  }
});

const createNewsCard = (newsItem) => {
  const newsCard = $('<div>');

  newsCard.css({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'flex-start',
    width: '95%',
    border: 'solid 3px pink',
  });

  const newsImage = $(`<img src="${newsItem.image}" />`);

  newsImage.css({
    height: '200px',
  });

  const newsTitle = $(`<h3> ${newsItem.title} </h3>`);
  const newsDescription = $(`<article> ${newsItem.description} </article>`);
  const newsAuthor = $(`<h6> Written by ${newsItem.author} @ ${new Date(newsItem.published)} </h6>`);

  newsCard.append(newsImage, newsTitle, newsDescription, newsAuthor);

  return newsCard;
}

const render = () => {
  $(document).ready(() => {
    const newsCards = state.fetchedItems.map(createNewsCard);

    app.append(...newsCards);
  });
}

// I want to be able to await initialFetch
const bootstrap = async () => {
  await initialFetch();
  render();
}

bootstrap();
