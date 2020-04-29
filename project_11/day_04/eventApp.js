const app = $('#app');
// create a div that increases in size when we hit the up arrow

const state = {
  size: 4
}
const sizeDiv = () => $('<div id="size-div">This is where its at</div>').css({
  width: `${state.size}rem`,
  border: '1px solid black'
});

const render = () => {
  app.empty();
  app.append(sizeDiv())
}


$(document).on('keydown', function(event){
  console.log('>>>>>>>>> event.which', event.which);
  if (event.which === 38) {
    console.log('uparrow!')
    state.size++
    console.log('>>>>>>>>> state.size', state.size);
    render();
  }  
})

render();