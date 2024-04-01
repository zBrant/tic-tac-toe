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

  let isUser = false 

  fields.forEach(buttonClicked => buttonClicked.addEventListener("click", () => fieldClicked(buttonClicked)));

  function fieldClicked(buttonClicked){
    if(buttonClicked.innerText !== '') return;
    // isUser ? doMove("X", buttonClicked) : doMove("O", aiMove()); 
    isUser ? doMove("X", buttonClicked) : doMove("O", buttonClicked); 
    isUser = !isUser;
  }

  function doMove(symbol, field){
    if(field == null) return;
    field.innerText = symbol; 
    gameBoard[Array.prototype.indexOf.call(boardSection.children, field)] = symbol; 
  }

  function aiMove(){
    let a = minimax(isUser, Array.from(fields).filter(x => x.innerText === '')); 
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

  function minimax(isUser){
    let valor;
  }
})();