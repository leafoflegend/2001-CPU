const state = {
  message: '',
  news: [],
}

const menu = () => {
  return $(`
    <nav>
      <h1>
        Welcome to the news app!
      </h1>
      <button class="btn btn-primary fetch-news">Fetch News</button>
      <button class="btn btn-primary business-news">Get Business News</button>
    </nav>
  `)
}

const fetchNews = async () => {
  const res = await fetch('/news');
  const data = await res.json();
  console.log('>>>>>>>>> data', data);
  state.news = data.news;
}

const fetchBusinessNews = async () => {
  const res = await fetch('/news', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      categories: 'business'
    })
  });
  const data = await res.json();
  console.log('>>>>>>>>> data', data);
  state.news = data.news;
}

$('#app').on('click', '.fetch-news', async () => {
  console.log('clicked');
  await fetchNews();
  render();
})

$('#app').on('click', '.business-news', async () => {
  await fetchBusinessNews();
  render();
})

const news = () => {
  return state.news.map(article => $(`
    <div class="card" id="post-data">
      <div class="card-body">
        <h5 class="card-title">${article.title}</h5>
        <p>Author: ${article.author}</p>
        <p>${article.published}</p>
        <p>${article.description}</p>
        ${article.image && article.image !== 'None' ? `<img src="${article.image}" style="width: 5rem;"/>` : ''}
      </div>
    </div>
  `))
}

function render () {
  const app = $('#app');
  app.empty();
  app.append(menu())
  app.append(news());
  // renderPostList();
}

render();