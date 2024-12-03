// script.js

const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartButton = document.getElementById("restart");
const modeSelection = document.getElementById("mode");
let board = Array(9).fill(null);
let isGameActive = true;
let currentPlayer = "X";
let gameMode = "PVP"; // Default mode is Player vs Player

// Winning combinations
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// Initialize the game
function initGame() {
  cells.forEach((cell, index) => {
    cell.textContent = "";
    cell.classList.remove("taken", "x", "o");
    cell.setAttribute("data-index", index);
    cell.addEventListener("click", handleCellClick);
  });

  board = Array(9).fill(null);
  isGameActive = true;
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle cell click
function handleCellClick(e) {
  const index = e.target.getAttribute("data-index");

  if (!isGameActive || board[index]) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;
  e.target.classList.add("taken", currentPlayer.toLowerCase());

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    isGameActive = false;
    return;
  }

  if (board.every(cell => cell !== null)) {
    statusText.textContent = "It's a draw!";
    isGameActive = false;
    return;
  }

  if (gameMode === "PVP") {
    // Switch player in Player vs Player mode
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  } else if (gameMode === "PVC") {
    // Handle computer's turn in Player vs Computer mode
    currentPlayer = "O";
    statusText.textContent = "Computer's turn";

    setTimeout(() => {
      const emptyCells = board.map((val, i) => (val === null ? i : null)).filter(i => i !== null);
      const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];

      board[randomIndex] = currentPlayer;
      const computerCell = cells[randomIndex];
      computerCell.textContent = currentPlayer;
      computerCell.classList.add("taken", "o");

      if (checkWin(currentPlayer)) {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        isGameActive = false;
      } else {
        currentPlayer = "X";
        statusText.textContent = `Player ${currentPlayer}'s turn`;
      }
    }, 500);
  }
}

// Check for win
function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

// Restart the game
restartButton.addEventListener("click", () => {
  initGame();
});

// Mode selection
modeSelection.addEventListener("change", (e) => {
  gameMode = e.target.value;
  initGame();
});

// Initialize the game on page load
initGame();
