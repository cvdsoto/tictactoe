const grid = ["_","_","_","_","_","_","_","_","_"];
let indices = [];
const winningCombo = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

$(document).ready(function(){

  let player1Src = ' ', player1Alt, player2Src = ' ', player2Alt;
  let getImageId, getImageSrc, getImageAlt;
  let score1 = 0, score2 = 0;

  $('.marker').click(function(){
    getImageSrc = $(this).attr('src');
    getImageId = $(this).attr('id');
    getImageAlt = $(this).attr('alt');
    if (getImageId === 'icon-1' ||
        getImageId === 'icon-2' ||
        getImageId === 'icon-3' ||
        getImageId === 'icon-4' ||
        getImageId === 'icon-5') {
          player1Src = getImageSrc;
          player1Alt = getImageAlt;
    }else {
      player2Src = getImageSrc;
      player2Alt = getImageAlt;
    }
  });

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
  let winner = {};
  const checkWin = function(){
    let idx = grid.indexOf(turn);
    while(idx != -1){
      indices.push(idx + 1);
      idx = grid.indexOf(turn, idx + 1);
    }
    let hasWon = false;
    let number = 0;
    // console.log(turn, indices);
    if (indices.length === 3){
      const indicesString = indices.join();
      winningCombo.forEach(function(element){
        let winningComboString = element.join();
        if (indicesString === winningComboString){
          hasWon = true;
        }
      });
    } else if (indices.length > 3){
      const indicesString = indices.join();
      winningCombo.forEach(function(element){
        let winningComboString = RegExp(`${element.join('.*')}`);
        // console.log(winningComboString);
        if (winningComboString.test(indicesString)){
          hasWon = true;
        }
      });
    }
    indices = [];
    return hasWon;
  };

  let player = ' ';
  const makeTurn = function(num, letter, box){
    if (grid[num] === '_' || grid[num] === letter){
      grid[num] = letter;
      if (letter === 'X') {
        box.html(`<img src=${player1Src}>`);
      }
      else {
        box.html(`<img src=${player2Src}>`);
      }
      const wonGame = checkWin();
      console.log(wonGame);
      if (wonGame){
        if (turn === 'X'){
          player = player1Alt;
          score1 += 1;
          $('#player-1 h3#title1').addClass("animated flash");
          $('#player-1 h3#title1').text(`${player} wins!!`);
          $('#player-1 p#player1-score').text(score1);
        }else {
          player = player2Alt;
          score2 += 1;
          $('#player-2 h3#title2').addClass("animated flash");
          $('#player-2 h3#title2').text(`${player} wins!!`);
          $('#player-2 p#player2-score').text(score2);
        }
        $('.boxes').off('click');

      }else {
        if (turn === 'X'){
          turn = 'O';
        }else {
          turn = 'X';
        }
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
// start: original code! do not delete!!!
// const row1 = winningCombo.row1.join();
// const row2 = winningCombo.row2.join();
// const row3 = winningCombo.row3.join();
// const col1 = winningCombo.col1.join();
// const col2 = winningCombo.col2.join();
// const col3 = winningCombo.col3.join();
// const diagonal1 = winningCombo.diagonal1.join();
// const diagonal2 = winningCombo.diagonal2.join();
// const str2 = indices.join();
// if(row1 === str2 || row2 === str2 || row3 === str2 || col1 === str2 || col2 === str2 || col3 === str2 || diagonal1 === str2 || diagonal2 === str2 ){
//   console.log('you win!');
// }
// end: original code! do not delete!!!
