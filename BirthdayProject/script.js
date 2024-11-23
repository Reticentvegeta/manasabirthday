// Postcard Flip Functionality
function openPostcard() {
  const postcard = document.querySelector('.postcard');
  postcard.classList.toggle('flipped');
}

// Tic-Tac-Toe Game Logic
const ticTacToe = document.getElementById("tic-tac-toe");
const gameMessage = document.getElementById("game-message");
let board = ["", "", "", "", "", "", "", "", ""];
let playerTurn = true; // Manasa's turn

function createGrid() {
  ticTacToe.innerHTML = '';
  board.forEach((cell, index) => {
    const cellElement = document.createElement("div");
    cellElement.classList.add("cell");
    cellElement.addEventListener("click", () => handleMove(index));
    ticTacToe.appendChild(cellElement);
  });
}

function handleMove(index) {
  if (board[index] === "") {
    board[index] = playerTurn ? "X" : "O";
    updateGrid();
    if (checkWin()) {
      gameMessage.textContent = "Manasa wins you were  meant to win anyway!";
      return;
    }
    playerTurn = !playerTurn;
    if (!playerTurn) {
      makeAiMove();
    }
  }
}

function makeAiMove() {
  setTimeout(() => {
    const emptyCells = board.map((cell, index) => (cell === "" ? index : null)).filter((index) => index !== null);
    if (emptyCells.length > 0) {
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
      board[randomIndex] = "O";
      updateGrid();
      if (checkWin()) {
        gameMessage.textContent = "Manasa wins you were  meant to win anyway!";
      }
      playerTurn = true;
    }
  }, 500);
}

function updateGrid() {
  const cells = document.querySelectorAll(".cell");
  cells.forEach((cell, index) => {
    cell.textContent = board[index];
  });
}

function checkWin() {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6], // Diagonals
  ];
  return winPatterns.some(pattern => 
    pattern.every(index => board[index] === "X")
  );
}

// Initialize Game
createGrid();
