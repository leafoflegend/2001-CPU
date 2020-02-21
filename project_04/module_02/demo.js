const blueThings = $('.blue');

for (let i = 0; i < blueThings.length; ++i) {
  const currentBlueThing = blueThings[i];

  $(currentBlueThing).click(function () {
    $(this).css('background-color', 'green');
    $('h3', this).css('color', 'red');
    $('p', this).css('color', 'white');
  });
}

const whiteThings = $('.white');

for (let i = 0; i < whiteThings.length; ++i) {
  const currentWhiteThing = whiteThings[i];

  $(currentWhiteThing).click(function () {
    $(this).fadeOut();
  });
}

const redThings = $('.red');

for (let i = 0; i < redThings.length; ++i) {
  const currentRedThing = redThings[i];

  $(currentRedThing).click(function () {
    $(this).append($(this).html());

    // NOTE: Copying children
    // const blueThingChildren = $(blueThings[i]).children();
    //
    // for (let j = 0; j < blueThingChildren.length; ++j) {
    //   const blueThingsChild = blueThingChildren[j];
    //
    //   console.log(blueThingsChild.tagName);
    //
    //   if (blueThingsChild.tagName === 'P') {
    //     const clonedBlueThingChild = $(blueThingsChild).clone();
    //     $(this).append(clonedBlueThingChild);
    //   }
    // }
  })
}
