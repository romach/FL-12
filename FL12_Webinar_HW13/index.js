let cells;
let scores;
let currentTurn;
let gameStatus;
const winningCellsIndeces = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
let winningCells;

initializeField();
initializeScore();
updateField();

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", () => {initializeField(), updateField()});
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  initializeField();
  initializeScore();
  updateField();
});

function initializeField() {
  cells = ["", "", "", "", "", "", "", "", ""];
  currentTurn = Math.random() < 0.5 ? "x" : "o";
  gameStatus = "ongoing";
  winningCells = [];
}

function initializeScore() {
  scores = {
    x: 0,
    o: 0
  };
}

function handleCellClick(index) {
  cells[index] = currentTurn;
  winningCells = getWinningCells();
  if (winningCells.length > 0) {
    gameStatus = currentTurn === "x" ? "First player won" : "Second player won";
    scores[currentTurn] = scores[currentTurn] + 1;
  } else if (cells.every(cell => cell !== "")) {
    gameStatus = "Draw";
    scores.x++;
    scores.o++;
  } else {
    currentTurn = currentTurn === "x" ? "o" : "x";
  }
  updateField();
}

function getWinningCells() {
  return winningCellsIndeces.filter(winningRange =>
    winningRange.every(index => cells[index] === currentTurn)
  );
}

function updateField() {
  const field = document.querySelector(".field");
  field.textContent = "";
  document.querySelector(".round-result").textContent =
    gameStatus === "ongoing" ? "" : gameStatus;
  cells.forEach((cell, index) => {
    const cellNode = document.createElement("div");
    cellNode.classList.add("cell");
    if (cell !== "") {
      cellNode.classList.add(`cell-${cell}`);
      if (
        winningCells.length > 0 &&
        winningCells.some(cellsRange => cellsRange.includes(index))
      ) {
        cellNode.classList.add("win");
      }
    } else if (gameStatus === "ongoing") {
      cellNode.addEventListener("click", () => handleCellClick(index));
    }
    field.appendChild(cellNode);
  });
  const scoreXNode = document.querySelector(".score-x .score-value");
  scoreXNode.textContent = scores.x;
  const scoreONode = document.querySelector(".score-o .score-value");
  scoreONode.textContent = scores.o;
  document.querySelectorAll(".score").forEach(score => {
    score.classList.remove("score-current");
  });
  if (currentTurn === "x") {
    document.querySelector(".score-x").classList.add("score-current");
  } else {
    document.querySelector(".score-o").classList.add("score-current");
  }
}
