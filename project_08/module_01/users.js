const USERS_URL = `https://reqres.in/api/users?per_page=2`;
const backButton = $('#back');
const forwardButton = $('#forward');
const usersList = $('#user-list');

const metadata = {
  minPage: 1,
  currentPage: null,
  maxPage: null
};

function renderUser(user) {
  const { first_name: firstName, last_name: lastName, email, avatar } = user;

  const userDiv = $(`
<div>
    <h3> ${firstName} ${lastName} </h3>
    <h4> ${email} </h4>
    <img src="${avatar}" />
</div>
  `);

  userDiv.css({
    display: 'flex',
    'flex-direction': 'column',
    'justify-content': 'center',
    'align-items': 'center',
    border: 'solid 1px black',
    padding: '10px',
    margin: '5px',
  });

  return userDiv;
}

function renderUserList(userList) {
  usersList.empty();

  usersList.append(userList.map(renderUser));
}

function updatePageInfo() {
  const { currentPage, maxPage } = metadata;

  $('#page-info').text(
    `Page ${currentPage} / ${maxPage}`
  );
}

function updateButtons() {
  const { currentPage, maxPage, minPage } = metadata;

  if (currentPage === maxPage) {
    forwardButton.attr('disabled', true);
  } else {
    forwardButton.removeAttr('disabled');
  }

  if (currentPage === minPage) {
    backButton.attr('disabled', true);
  } else {
    backButton.removeAttr('disabled');
  }
}

function fetchUserList(currentPage = 1) {
  fetch(`${ USERS_URL }&page=${ currentPage }`)
    .then(function (res) {
      return res.json();
    })
    .then(function (userData) {
      const { total_pages: totalPages, data } = userData;

      // update metadata
      metadata.currentPage  = currentPage;
      metadata.maxPage = totalPages;
      // renderUserList
      renderUserList(data);
      // updatePageInfo
      updatePageInfo();
      // updateButtons
      updateButtons();
    })
    .catch(function (error) {
      console.error('Error fetching and/or rendering the page.', error);
    });
}

backButton.on('click', function () {
  const { currentPage } = metadata;

  fetchUserList(currentPage - 1);
});

forwardButton.on('click', function () {
  const { currentPage } = metadata;

  fetchUserList(currentPage + 1);
});

function bootstrap() {
  fetchUserList();
}

bootstrap();
