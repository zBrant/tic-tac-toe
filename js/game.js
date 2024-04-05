(function(){
  let gameBoard = new Array(9).fill(null);
  let boardSection = document.querySelector(".board");
  let fields = document.querySelectorAll("button");

  const winningPositions = [
    [0, 1, 2], // Horizontal line at the top
    [3, 4, 5], // Middle horizontal line
    [6, 7, 8], // Bottom horizontal line
    [0, 3, 6], // Left column
    [1, 4, 7], // Center column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal line from top-left to bottom-right
    [2, 4, 6]  // Diagonal line from top-right to bottom-left
  ];

  fields.forEach(buttonClicked => buttonClicked.addEventListener("click", () => fieldClicked(buttonClicked)));

  function fieldClicked(buttonClicked){
    if(buttonClicked.innerText !== '') return;
    doMove("X", buttonClicked); // player
    if(!checkForWin(gameBoard, 'X')) doMove("O", aiMove()); // Ai
  }

  function doMove(symbol, field){
    if(checkForWin(gameBoard, symbol) || checkForDraw(gameBoard)){
      gameOver();
      return;
    }

    gameBoard[Array.prototype.indexOf.call(boardSection.children, field)] = symbol; 
    field.innerText = symbol; 
  }

  function gameOver() {
    fields.forEach(button => button.disabled = true);
  }

  function aiMove(){
    let position, max = -Infinity;

    gameBoard.forEach((_, i) => {
      if (gameBoard[i] !== null) return; 
      gameBoard[i] = 'O';
      const value = minimax(gameBoard, 0, false);
      gameBoard[i] = null;
      if (value > max) {
        max = value;
        position = i;
      }
    });

    return fields.item(position);
  }

  function checkForWin(board, symbol) {
    return winningPositions.some(positions => 
      positions.every(position => board[position] === symbol));
  }

  function checkForDraw(board) {
    return board.every(position => position !== null)
  }

  function minimax(board, depth, isMax) {
    if (checkForWin(board, 'X')) return -1; // 'X' is the player
    if (checkForWin(board, 'O')) return 1;  // 'O' is the AI
    if (checkForDraw(board)) return 0;

    let min = Infinity, max = -Infinity;
    board.forEach((_, i) => {
        if (board[i] === null) {
          board[i] = isMax ? 'O' : 'X';
          let score = minimax(board, depth + 1, !isMax);
          board[i] = null;
          if(isMax){
            max = Math.max(score, max);
          }else{
            min = Math.min(score, min);
          }
        }
    });

    return isMax ? max : min;
  }
})();