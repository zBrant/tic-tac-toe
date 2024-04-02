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
    doMove("X", buttonClicked); // player
    if(!checkForWin(gameBoard, 'X')) doMove("O", aiMove()); // Ai
  }

  function doMove(symbol, field){
    if(field.innerText !== '') return;

    gameBoard[Array.prototype.indexOf.call(boardSection.children, field)] = symbol; 
    field.innerText = symbol; 

    if(checkForWin(gameBoard, symbol) || checkForDraw(gameBoard)) gameOver();
  }

  function gameOver() {
    fields.forEach(button => button.disabled = true);
  }

  function aiMove(){
    let position, max = -Infinity;

    for(let i = 0; i < gameBoard.length; i++){
      if(gameBoard[i] === null){
        gameBoard[i] = 'O';
        const value = minimax(gameBoard, 0,  false);
        gameBoard[i] = null;
        if(value > max){
          max = value;
          position = i;
        }
      }
    }

    return fields.item(position);
  }

  function checkForWin(board, symbol) {
    for (const positions of winningPositions) {
      const [pos1, pos2, pos3] = positions;
      if (board[pos1] === symbol && board[pos2] === symbol && board[pos3] === symbol) {
        return true;
      }
    }
    return false;
  }

  function checkForDraw(board) {
    return board.every(position => position !== null)
  }

  function minimax(board, depth, isMax) {
    if (checkForWin(board, 'X')) return -10; // 'X' is the player
    if (checkForWin(board, 'O')) return 10;  // 'O' is the AI
    if (checkForDraw(board)) return 0;

    if (isMax) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          let score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          let score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
}

  // function minimax(isUser){
  //   let min = Infinity, max = -Infinity;
  //   if(checkForWin(gameBoard, "O")) return 1;  // max for ai
  //   if(checkForWin(gameBoard, "X")) return -1; // min for user 
  //   if(checkForDraw(gameBoard)) return 0; // draw

  //   for(let i = 0; i < gameBoard.length; i++){
  //     if(gameBoard[i] === null){
  //       gameBoard[i] = isUser ? 'X' : 'O';
  //       const value = minimax(!isUser);
  //       gameBoard[i] = null;

  //       if(isUser) {
  //         min = Math.min(min, value);
  //       }else{
  //         max = Math.max(max, value);
  //       } 
  //     }
  //   }

  //   return isUser ? min : max;
  // }

})();