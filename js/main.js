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
  let getImageId, getOtherImageClass;
  let score1 = 0, score2 = 0;
  let player1HasChosen = false, player2HasChosen = false, hasGameStarted = false;
  let turn;
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
  $player1Score = $('#player-1 span#player1-score');
  $player2Score = $('#player-2 span#player2-score');
  $boxes = $('.boxes');
  $reset = $('#reset');

  //hide reset
  $reset.hide();

  // assigning token/marker on correct player
  const assignToken = function (thisImageId, otherImageId, $playerPrompts, $player1Markers, $player2Markers, playerHasChosen) {
    let playerSrc, playerAlt;
    const $otherImage = $(`#icon-${otherImageId}`); // opponent's Image ID
    const $thisImage = $(`#icon-${thisImageId}`);

    //get same image on the opponent's side and check if it's already chosen by looking if the class "marker-selected" is already assigned to the opponent's image
    getOtherImageClass = $otherImage.attr('class');
    if (getOtherImageClass.includes('marker-selected')) {
      $playerPrompts.text("Pick Another One!");
    } else {
      // checks if the player has already selected a token so it can remove the grayscale class on opponent's side and marker-selected class on the player's side
      if (playerHasChosen){
        $player1Markers.removeClass('marker-selected');
        $player2Markers.removeClass('grayscale');
      }
      // assign the image src and alt, add the classes accordingly, and indicate that the player has already chosen a token
        playerSrc = $thisImage.attr('src');
        playerAlt = $thisImage.attr('alt');
        $thisImage.addClass('marker-selected');
        $otherImage.addClass('grayscale');
        playerHasChosen = true;
        $playerPrompts.text("");
    }
    return [playerSrc, playerAlt, playerHasChosen];
  }

  // checking which player should the token be assigned
  const getToken = function () {
    getImageId = parseInt($(this).attr('id').slice(5));
    $marker.removeClass("animated flash");
    // checks if a game is ongoing. A player cannot choose another token while playing
    if (hasGameStarted) {
      $asidePrompts.text("Game ongoing! You cannot choose another token!");
      $asidePrompts.show();
    } else {
      // if the image id is between 1-5, the token should be assigned to Player 1
      if (getImageId >= 1 && getImageId <= 5) {
        const opponentImageId = getImageId + 5; // opponent's Image ID
        const token = assignToken(getImageId, opponentImageId, $player1Prompts, $player1Markers, $player2Markers, player1HasChosen);
        player1Src = token[0]
        player1Alt = token[1]
        player1HasChosen = token[2];
      } else {
        // if the image is more than 5, the token should be assigned to Player 2
        const opponentImageId = getImageId - 5; // opponent's Image ID
        const token = assignToken(getImageId, opponentImageId, $player2Prompts, $player2Markers, $player1Markers, player2HasChosen);
        player2Src = token[0]
        player2Alt = token[1]
        player2HasChosen = token[2];
      }
    }
  }

  $marker.click(getToken);

  // checks if the players have chosen their markers
  const checkPlayersHaveMarkers = function () {
    let result = true;
    if (!player1HasChosen && !player2HasChosen){
      $marker.addClass("animated flash");
      $asidePrompts.text("Please choose a token");
      result = false;
    } else if(!player1HasChosen && player2HasChosen) {
      $player1Markers.addClass("animated flash");
      $player1Prompts.text("Please choose a token");
      result = false;
    } else if(player1HasChosen && !player2HasChosen) {
      $player2Markers.addClass("animated flash");
      $player2Prompts.text("Please choose a token");
      result = false;
    }
    return result;
  }

  //click to start game to determine who will go first
  $start.on('click', function(){
    //checks if players have markers
    const playersHaveMarkers = checkPlayersHaveMarkers();
    if (playersHaveMarkers) {
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
          score1 += 1;
          $h3Title1.addClass("animated flash");
          $h3Title1.text(`${player1Alt} wins!!`);
          $player1Score.text(score1);
        //to display winner on Player 2 side
        }else {
          score2 += 1;
          $h3Title2.addClass("animated flash");
          $h3Title2.text(`${player2Alt} wins!!`);
          $player2Score.text(score2);
        }
        // no clicking on board if there's a winner
        $boxes.off('click', getBox);
        $asidePrompts.text('Thanks for playing!');
        $asidePrompts.show();
        $reset.show();
        $start.hide();
        // draw
      } else if (tilesPlayed === 9 && !wonGame){
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
      } else {
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
    const playersHaveMarkers = checkPlayersHaveMarkers();
    if (playersHaveMarkers && hasGameStarted) {
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
