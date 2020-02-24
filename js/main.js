const row1 = ["_","_","_"];
const row2 = ["_","_","_"];
const row3 = ["_","_","_"];

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
      
  };

  const makeTurn = function(array, num, letter, box){
    if (array[num] === '_' || array[num] === letter){
      array[num] = letter;
      box.html(letter);
      if (turn === 'X'){
        turn = 'O';
      }else {
        turn = 'X';
      }
    }
  };

  const getArrayIndex = function(box){
    let number = 0;
      if(box === '1' || box === '4' || box === '7'){
        number = 0;
        return number;
      }else if(box === '2'|| box === '5' || box === '8'){
        number = 1;
        return number;
      }else if(box === '3'|| box === '6' || box === '9'){
        number = 2;
        return number;
      }
  };

  const getBox = function(event){
    const boxNo = (event.data.box).attr('id').slice(-1); // get box number
    const arrayNum = getArrayIndex(boxNo);
    if (boxNo === '1' || boxNo === '2' || boxNo === '3'){
      makeTurn(row1, arrayNum, turn, event.data.box);
    } else if (boxNo === '4' || boxNo === '5' || boxNo === '6'){
      makeTurn(row2, arrayNum, turn, event.data.box);
    } else {
      makeTurn(row3, arrayNum, turn, event.data.box);
    }
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
