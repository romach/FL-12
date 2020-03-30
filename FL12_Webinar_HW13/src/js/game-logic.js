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

export function handleCellClick({
  cellIndex,
  cells,
  winningCells,
  currentTurn,
  gameStatus,
  scores
}) {
  cells[cellIndex] = currentTurn;
  winningCells = getWinningCells(cells, currentTurn);
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
  return { cells, winningCells, currentTurn, gameStatus, scores };
}

function getWinningCells(cells, currentTurn) {
  return winningCellsIndeces.filter(winningRange =>
    winningRange.every(index => cells[index] === currentTurn)
  );
}
