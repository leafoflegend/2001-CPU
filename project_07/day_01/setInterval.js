
let currArr = [5, 4, 3, 6, 1]

setInterval(actionToRepeat, 500)
setInterval(actionToRepeat, 1300)

function actionToRepeat(){
  randomArr();
  render();
}

function randomArr(){
  const newArr = currArr.map(function(elem){
    // Math.random() gives a number between 0 and 1 (exclusive)
    return Math.ceil(Math.random() * 10);
  })
  currArr = newArr;
}

function render(){
  console.log('the current array is ', currArr)
}
