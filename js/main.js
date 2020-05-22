//declare board game and winning combinations
let grid = ["_","_","_","_","_","_","_","_","_"];
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
  //declare variables
  let player1Src, player1Alt, player2Src, player2Alt;
  let getImageId, getImageSrc, getImageAlt;
  let score1 = 0, score2 = 0;
  let player1HasChosen = false,
      player2HasChosen = false,
      hasGameStarted = false;
  let p1Icon, p2Icon;
  let turn;
  let player = ' ';
  let tilesPlayed = 0;

  //declare jQuery Tags
  $player1Markers = $('#player-1 .marker');
  $player2Markers = $('#player-2 .marker');
  $marker = $('.marker');
  $player1Prompts = $('#player-1 #prompts');
  $player2Prompts = $('#player-2 #prompts');
  $asidePrompts = $('aside #prompts');
  $start = $('#start');
  $player1 = $('#player-1');
  $player2 = $('#player-2');
  $h3Title1 = $('#player-1 h3#title1');
  $h3Title2 = $('#player-2 h3#title2');
  $player1Score = $('#player-1 p#player1-score');
  $player2Score = $('#player-2 p#player2-score');
  $boxes = $('.boxes');
  $reset = $('#reset');

  //hide reset
  $reset.hide();

  //choose token to play for Player 1
  $player1Markers.click(function(){
    $marker.removeClass("animated flash");
    player1Src = $(this).attr('src');
    //checks if the token was already taken by player 2
    if (player2HasChosen && player2Src === player1Src){
      $player1Prompts.text("Pick Another One!");
      player1Src = ' ';
    //checks if a game has already started
    }else if (hasGameStarted){
      $asidePrompts.text("Game ongoing! You cannot choose another token!");
      $asidePrompts.show();
      player1Src = p1Icon;
    }else {
      // can choose another token
      if (player1HasChosen){
        $player1Markers.removeClass('marker-selected');
        $player2Markers.removeClass('grayscale');
      }
      p1Icon = player1Src;
      player1Alt = $(this).attr('alt');
      $(this).addClass('marker-selected');
      for (let i = 0; i < $player2Markers.length; i++){
        const $player2Image = $player2Markers.eq(i);
        if(player1Src === $player2Image.attr('src')){
          $player2Image.addClass('grayscale');
        }
      }
      player1HasChosen = true;
      $player1Prompts.hide();
    }
  });

  //choose token to play for Player 2
  $player2Markers.click(function(){
    $marker.removeClass("animated flash");
    player2Src = $(this).attr('src');
    //checks if the token was already taken by player 2
    if (player1HasChosen && player1Src === player2Src){
      $player2Prompts.text("Pick Another One!");
      player2Src = ' ';
    //checks if a game has already started
    }else if (hasGameStarted){
      $asidePrompts.text("Game ongoing! You cannot choose another token!");
      $asidePrompts.show();
      player2Src = p2Icon;
    }else {
      // can choose another token
      if (player2HasChosen){
        $player2Markers.removeClass('marker-selected');
        $player1Markers.removeClass('grayscale');
      }
      p2Icon = player2Src;
      player2Alt = $(this).attr('alt');
      $(this).addClass('marker-selected');
      let $p1CurrentIcon;
      for (let i = 0; i < $player1Markers.length; i++){
        const $p1CurrentIcon = $player1Markers.eq(i);
        if(player2Src === $p1CurrentIcon.attr('src')){
          $p1CurrentIcon.addClass('grayscale');
        }
      }
      player2HasChosen = true;
      $player2Prompts.hide();
    }
  });

  //click to start game to determine who will go first
  $start.on('click', function(){
    //checks if players have markers
    if (!player1HasChosen && !player2HasChosen){
      $marker.addClass("animated flash");
      $asidePrompts.text("Please choose a token");
    } else if(!player1HasChosen && player2HasChosen) {
      $player1Markers.addClass("animated flash");
      $player1Prompts.text("Please choose a token");
    } else if(player1HasChosen && !player2HasChosen) {
      $player2Markers.addClass("animated flash");
      $player2Prompts.text("Please choose a token");
    } else {
      hasGameStarted = true;
      //generate random number to determine who will play first
      const randomTurn = Math.floor(Math.random(1,4) * (4-1) + 1);
      if(randomTurn === 1 || randomTurn === 2){
        turn = 'X';
        $player1.addClass(`active-player-${player1Alt}`);
      }else {
        turn = 'O';
        $player2.addClass(`active-player-${player2Alt}`);
      }
    }
  });

  //checks the main board if there's a winner based on the winning combinations
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
  };

  //checks and display images on the board and calls checkWin function
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
      // counts number of tiles played
      tilesPlayed += 1;
      if (wonGame){
        //to display winner on Player 1 side
        if (turn === 'X'){
          player = player1Alt;
          score1 += 1;
          $h3Title1.addClass("animated flash");
          $h3Title1.text(`${player} wins!!`);
          $player1Score.text(score1);
        //to display winner on Player 2 side
        }else {
          player = player2Alt;
          score2 += 1;
          $h3Title2.addClass("animated flash");
          $h3Title2.text(`${player} wins!!`);
          $player2Score.text(score2);
        }
        // no clicking on board if there's a winner
        $boxes.off('click', getBox);
        $asidePrompts.text('Thanks for playing!');
        $asidePrompts.show();
        $reset.show();
        $start.hide();
        //draw
      }else if (tilesPlayed === 9 && !wonGame){
        $h3Title1.addClass("animated flash");
        $h3Title2.addClass("animated flash");
        $h3Title1.text(`Nobody wins!!`);
        $h3Title2.text(`Nobody wins!!`);
        $asidePrompts.text('Thanks for playing!');
        $asidePrompts.show();
        $player1.removeClass(`active-player-${player1Alt}`);
        $player2.removeClass(`active-player-${player2Alt}`);
        $reset.show();
        $start.hide();
        //next turn
      }else {
        if (turn === 'X'){
          turn = 'O';
          $player1.removeClass(`active-player-${player1Alt}`);
          $player2.addClass(`active-player-${player2Alt}`);
        }else {
          turn = 'X';
          $player2.removeClass(`active-player-${player2Alt}`);
          $player1.addClass(`active-player-${player1Alt}`);
        }
      }
    }
  };

  //get div box number
  const getBox = function(){
    if (!player1HasChosen && !player2HasChosen){
      $marker.addClass("animated flash");
      $asidePrompts.text("Please choose a token");
    } else if(!player1HasChosen && player2HasChosen) {
      $player1Markers.addClass("animated flash");
      $player1Prompts.text("Please choose a token");
    } else if(player1HasChosen && !player2HasChosen) {
      $player2Markers.addClass("animated flash");
      $player2Prompts.text("Please choose a token");
    } else if (hasGameStarted) {
      $box = $(this);
      const arrayNum = ($box.attr('id').slice(-1)) - 1;
      makeTurn(arrayNum, turn, $box);
    }
  }

  $boxes.on('click', getBox);

  //resets the board game
  $reset.on('click', function(){
    $('.boxes img').remove();
    grid = ["_","_","_","_","_","_","_","_","_"];
    tilesPlayed = 0;
    $h3Title1.text("Player 1");
    $h3Title2.text("Player 2");
    $boxes.on('click', getBox);
    $asidePrompts.text("Please choose a token");
    $asidePrompts.show();
    $h3Title2.removeClass("animated flash");
    $h3Title1.removeClass("animated flash");
    $player1.removeClass(`active-player-${player1Alt}`);
    $player2.removeClass(`active-player-${player2Alt}`);
    $marker.removeClass("grayscale marker-selected");
    player1HasChosen = false;
    player2HasChosen = false;
    hasGameStarted = false;
    $reset.hide();
    $start.show();
  });

});
