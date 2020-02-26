const app = $('.app');

const origin = window.location.origin;
const pathname = window.location.pathname;

const basePath = `${origin}${pathname}`;

function createBox(classType, x, y) {
  const div = $('<div>');

  div.addClass(classType);
  div.attr('data-x-pos', x);
  div.attr('data-y-pos', y);

  return div;
}

const width = 5;
const height = 5;

let lastClicked;

for (let x = 0; x < width; ++x) {
  for (let y = 0; y < height; ++y) {
    const cell = createBox('cell', x, y);

    cell.click(function () {
      if (lastClicked) {
        lastClicked.removeClass('highlight');
      }

      const self = $(this);

      self.addClass('highlight');

      lastClicked = self;

      window.location.href = `${basePath}#-x${x}-y${y}`;
    });

    app.append(cell);
  }
}

if (window.location.hash) {
  const positions = window.location.hash.split('-');

  const rawXPos = positions[1].split('');
  const rawYPos = positions[2].split('');

  const x = rawXPos[1];
  const y = rawYPos[1];

  // Search for this.
  const loadedBox = $(`[data-x-pos=${x}][data-y-pos=${y}]`);

  loadedBox.addClass('highlight');

  lastClicked = loadedBox;
}
