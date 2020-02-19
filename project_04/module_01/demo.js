const createRedBox = function() {
  let color = 'red';

  const redBox = $('<div>')
    .css('width', '100px')
    .css('height', '100px')
    .css('background-color', 'red')
    .css('border', 'solid 1px hotpink')
    .click(function () {
      if (color === 'red') {
        redBox.css('background-color', 'blue');
        color = 'blue';
      } else {
        redBox.css('background-color', 'red');
        color = 'red';
      }
    });

  return redBox;
};

for (let i = 0; i < 10; ++i) {
  $('.container')
    .append(createRedBox());
}
