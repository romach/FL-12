export function updateField(state, onCellClick) {
  const field = document.querySelector(".field");
  field.textContent = "";
  document.querySelector(".round-result").textContent =
    state.gameStatus === "ongoing" ? "" : state.gameStatus;
  state.cells.forEach((cell, index) => {
    const cellNode = document.createElement("div");
    cellNode.classList.add("cell");
    if (cell !== "") {
      cellNode.classList.add(`cell-${cell}`);
      if (
        state.winningCells.length > 0 &&
        state.winningCells.some(cellsRange => cellsRange.includes(index))
      ) {
        cellNode.classList.add("win");
      }
    }
    if (cell === "" && state.gameStatus === "ongoing") {
      cellNode.addEventListener("click", () => onCellClick(index));
    }
    field.appendChild(cellNode);
  });
  const scoreXNode = document.querySelector(".score-x .score-value");
  scoreXNode.textContent = state.scores.x;
  const scoreONode = document.querySelector(".score-o .score-value");
  scoreONode.textContent = state.scores.o;
  document.querySelectorAll(".score").forEach(score => {
    score.classList.remove("score-current");
  });
  if (state.currentTurn === "x") {
    document.querySelector(".score-x").classList.add("score-current");
  } else {
    document.querySelector(".score-o").classList.add("score-current");
  }
}
