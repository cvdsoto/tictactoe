## Tic-tac-toe ft. Red Velvet

This is our first project for our SEI course at GA. I made a Red Velvet-themed tic-tac-toe because of my current obsession with KPOP. A live demo link can be seen [here](https://cvdsoto.github.io/tictactoe/).

### Technologies Used
This game was made by using HTML, CSS, and JavaScript (jQuery).

### Features
- Players can choose their own tokens and will not allow another player to choose a token that is already taken.
- Displays a score counter so players can keep track of their wins (without refreshing the page).

### How to Play the Game

1. Players choose a token on their side to start the game.
2. Click the "Start Game" button to determine who will go first (the one with the highlighted background).
3. Players will take turns, pressing the tiles on in the middle to make their move.
4. The player who succeeds in placing three of their tokens in a horizontal, vertical, or diagonal row is the winner.
5. Refresh the board to start a new round.

### Known Bugs
- Clicking the "Start Button" while a game is ongoing will restart the players' turn.
- When the game is a draw, the last player's background is still highlighted.

### Wish List
- Use LocalStorage to allow games to continue after page refresh / loss of internet connectivity
- Custom board sizes
