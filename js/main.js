let grid = ["_","_","_","_","_","_","_","_","_"];
let indices = [];
const winningCombo = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8]
];

$(document).ready(function(){

  let player1Src, player1Alt, player2Src, player2Alt;
  let getImageId, getImageSrc, getImageAlt;
  let score1 = 0, score2 = 0;
  let player1HasChosen = false, player2HasChosen = false;
  let p1Icon, p2Icon;

  $player1Markers = $('#player-1 .marker');
  $player2Markers = $('#player-2 .marker');

  $player1Markers.click(function(){
    player1Src = $(this).attr('src');
    if (player2HasChosen && player2Src === player1Src){
      $('#player-1 #prompts').text("Pick Another One!");
      player1Src = ' ';
    }else if (player1HasChosen && player2HasChosen){
      $('aside #prompts').text("Game ongoing! You cannot choose another marker!");
      player1Src = p1Icon;
    }else {
      p1Icon = player1Src;
      player1Alt = $(this).attr('alt');
      $(this).addClass('marker-selected');
      for (let i = 0; i < $player2Markers.length; i++){
        const $player2Image = $player2Markers.eq(i);
        if(player1Src === $player2Image.attr('src')){
          $player2Image.addClass('grayscale');
          // $player2Image.off('click');
        }
      }
      player1HasChosen = true;
    }
  });

  $player2Markers.click(function(){
    player2Src = $(this).attr('src');
    if (player1HasChosen && player1Src === player2Src){
      $('#player-2 #prompts').text("Pick Another One!");
      player2Src = ' ';
    }else if (player1HasChosen && player2HasChosen){
      $('aside #prompts').text("Game ongoing! You cannot choose another marker!");
      player2Src = p2Icon;
    }else {
      p2Icon = player2Src;
      player2Alt = $(this).attr('alt');
      $(this).addClass('marker-selected');
      for (let i = 0; i < $player1Markers.length; i++){
        const $player1Image = $player1Markers.eq(i);
        if(player2Src === $player1Image.attr('src')){
          $player1Image.addClass('grayscale');
        }
      }
      player2HasChosen = true;
    }
  });

  // $('.marker').click(function(){
  //   getImageSrc = $(this).attr('src');
  //   getImageId = $(this).attr('id');
  //   getImageAlt = $(this).attr('alt');
  //   $imgMarker = $(this);
  //   if (getImageId === 'icon-1' ||
  //       getImageId === 'icon-2' ||
  //       getImageId === 'icon-3' ||
  //       getImageId === 'icon-4' ||
  //       getImageId === 'icon-5') {
  //         player1Src = getImageSrc;
  //         player1Alt = getImageAlt;
  //         $imgMarker.addClass('marker-selected');
  //   }else {
  //     player2Src = getImageSrc;
  //     player2Alt = getImageAlt;
  //     $imgMarker.addClass('marker-selected');
  //   }
  // });

  // const $box1 = $('#box-1');
  // const $box2 = $('#box-2');
  // const $box3 = $('#box-3');
  // const $box4 = $('#box-4');
  // const $box5 = $('#box-5');
  // const $box6 = $('#box-6');
  // const $box7 = $('#box-7');
  // const $box8 = $('#box-8');
  // const $box9 = $('#box-9');

  let turn = 'X'; // initial turn
  let winner = {};

  const checkWin = function(){
    let a, b, c;
    for (let i = 0; i < winningCombo.length; i++) {
      a = winningCombo[i][0];
      b = winningCombo[i][1];
      c = winningCombo[i][2];
      if (grid[a] === turn && grid[b] === turn && grid[c] === turn){
        hasWon = true;
        return hasWon;
      }
    }
    // let idx = grid.indexOf(turn);
    // while(idx != -1){
    //   indices.push(idx + 1);
    //   idx = grid.indexOf(turn, idx + 1);
    // }
    // let hasWon = false;
    // // let number = 0;
    // // console.log(turn, indices);
    // if (indices.length === 3){
    //   const indicesString = indices.join();
    //   winningCombo.forEach(function(element){
    //     let winningComboString = element.join();
    //     if (indicesString === winningComboString){
    //       hasWon = true;
    //     }
    //   });
    // } else if (indices.length > 3){
    //   const indicesString = indices.join();
    //   winningCombo.forEach(function(element){
    //     let winningComboString = RegExp(`${element.join('.*')}`);
    //     // console.log(winningComboString);
    //     if (winningComboString.test(indicesString)){
    //       hasWon = true;
    //     }
    //   });
    // }
    // indices = [];
    // return hasWon;
  };

  let player = ' ';
  let tilesPlayed = 0;
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
      tilesPlayed += 1;
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
        $('.boxes').off('click', getBox);
      }else if (tilesPlayed === 9 && !wonGame){
        $('#player-1 h3#title1').addClass("animated flash");
        $('#player-2 h3#title2').addClass("animated flash");
        $('#player-1 h3#title1').text(`Nobody wins!!`);
        $('#player-2 h3#title2').text(`Nobody wins!!`);
      }else {
        if (turn === 'X'){
          turn = 'O';
        }else {
          turn = 'X';
        }
      }
      }
  };


  const getBox = function(){
    if (!player1HasChosen && !player2HasChosen){
      $('.marker').addClass("animated flash");
      $('aside #prompts').text("Please choose a marker");
    } else if(!player1HasChosen && player2HasChosen) {
      $player1Markers.addClass("animated flash");
      $('#player-1 #prompts').text("Please choose a marker");
    } else if(player1HasChosen && !player2HasChosen) {
      $player2Markers.addClass("animated flash");
      $('#player-2 #prompts').text("Please choose a marker");
    } else {
      // $('.marker').off('click');
      $box = $(this);
      const arrayNum = ($box.attr('id').slice(-1)) - 1; // get array number
      makeTurn(arrayNum, turn, $box);
    }
  }

  $('.boxes').on('click', getBox);

  // const getBox = function(event){
  //   const arrayNum = ((event.data.box).attr('id').slice(-1)) - 1; // get array number
  //   makeTurn(arrayNum, turn, event.data.box);
  // };
  //
  //   $box1.on('click', { box: $box1}, getBox);
  //   $box2.on('click', { box: $box2}, getBox);
  //   $box3.on('click', { box: $box3}, getBox);
  //   $box4.on('click', { box: $box4}, getBox);
  //   $box5.on('click', { box: $box5}, getBox);
  //   $box6.on('click', { box: $box6}, getBox);
  //   $box7.on('click', { box: $box7}, getBox);
  //   $box8.on('click', { box: $box8}, getBox);
  //   $box9.on('click', { box: $box9}, getBox);


    $('#reset').on('click', function(){
      $('.boxes img').remove();
      turn = 'X';
      grid = ["_","_","_","_","_","_","_","_","_"];
      tilesPlayed = 0;
      $('#player-1 h3#title1').text("Player 1");
      $('#player-2 h3#title2').text("Player 2");
      $('.boxes').on('click', getBox);
      $('aside #prompts').hide();
      $('#player-2 h3#title2').removeClass("animated flash");
      $('#player-1 h3#title1').removeClass("animated flash");
      $('.marker').removeClass("grayscale marker-selected");
      player1HasChosen = false;
      player2HasChosen = false;
      // $('.marker').on('click');
    });
});
