const grid = ["_","_","_","_","_","_","_","_","_"];
let indices = [];
const winningCombo = {
  row1: [0, 1, 2],
  row2: [3, 4, 5],
  row3: [6, 7, 8],
  col1: [0, 3, 6],
  col2: [1, 4, 7],
  col3: [2, 5, 8],
  diagonal1: [0, 4, 8],
  diagonal2: [2, 4, 6],
}

$(document).ready(function(){
  const $box1 = $('#box-1');
  const $box2 = $('#box-2');
  const $box3 = $('#box-3');
  const $box4 = $('#box-4');
  const $box5 = $('#box-5');
  const $box6 = $('#box-6');
  const $box7 = $('#box-7');
  const $box8 = $('#box-8');
  const $box9 = $('#box-9');

  let turn = 'X'; // initial turn

  const checkWin = function(){
    let idx = grid.indexOf(turn);
    while(idx != -1){
      indices.push(idx);
      idx = grid.indexOf(turn, idx + 1);
    }
    // console.log(turn, indices);
    if (indices.length === 3){
      const row1 = winningCombo.row1.join();
      const row2 = winningCombo.row2.join();
      const row3 = winningCombo.row3.join();
      const col1 = winningCombo.col1.join();
      const col2 = winningCombo.col2.join();
      const col3 = winningCombo.col3.join();
      const diagonal1 = winningCombo.diagonal1.join();
      const diagonal2 = winningCombo.diagonal2.join();
      const str2 = indices.join();
      // console.log(row1, row2, row3, col1, col2, col3, diagonal1, diagonal2);
      if(row1 === str2 || row2 === str2 || row3 === str2 || col1 === str2 || col2 === str2 || col3 === str2 || diagonal1 === str2 ||diagonal2 === str2 ){
        console.log('you win!');
      }
    }
    indices = [];
  };

  const makeTurn = function(num, letter, box){
    if (grid[num] === '_' || array[num] === letter){
      grid[num] = letter;
      box.html(letter);
        checkWin();
      if (turn === 'X'){
        turn = 'O';
      }else {
        turn = 'X';
      }
    }
  };

  const getBox = function(event){
    const arrayNum = ((event.data.box).attr('id').slice(-1)) - 1; // get array number
    makeTurn(arrayNum, turn, event.data.box);
  };

  $box1.on('click', { box: $box1}, getBox);
  $box2.on('click', { box: $box2}, getBox);
  $box3.on('click', { box: $box3}, getBox);
  $box4.on('click', { box: $box4}, getBox);
  $box5.on('click', { box: $box5}, getBox);
  $box6.on('click', { box: $box6}, getBox);
  $box7.on('click', { box: $box7}, getBox);
  $box8.on('click', { box: $box8}, getBox);
  $box9.on('click', { box: $box9}, getBox);


});
