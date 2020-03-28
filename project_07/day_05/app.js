// .data
//
// .on

// click handlers
//
// render / append cycle

const state = {
  selectedPokemon: null,
  jLis: [ ...$('li') ].map(function (li) {
    const jLi = $(li);

    jLi.data('eliot', 'cool');

    return jLi;
  }),
};

for (let i = 0; i < state.jLis.length; ++i) {
  const jLi = state.jLis[i];

  jLi.on('mouseenter', function () {
    alert('You hovered! Are you sure you want to do this???');
  });

  jLi.click(function () {
    state.selectedPokemon = i;

    console.log(jLi.data('eliot'));

    render();
  });
}

function render() {
  $('h3').remove();

  const newSelection = $(`<h3> The Selected Pokemon is: ${state.jLis[state.selectedPokemon].text()} </h3>`);

  const app = $('.app');

  app.append(newSelection);
}
