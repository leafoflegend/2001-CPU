// .attr
// Change an attribute on an html element.
// .input values
// Read text that a user has inputted.
// .hasClass
// Check if an element has a css class

$('.input-div button').click(function () {
  const wasClicked = $('.one button').hasClass('clicked');

  if (wasClicked === false) {
    const text = $('.input-div input').val();

    console.log('Submit clicked with text: ', text);

    if (text.length > 0) {
      const newPar = $('<p>');

      $('.input-entries').append(newPar.text(text));
    }
  }
});

$('.one button').click(function () {
  const theButton = $('.one button');

  theButton.attr('disabled', true);
  theButton.addClass('clicked');
});
