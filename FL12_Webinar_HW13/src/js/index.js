import { handleCellClick } from "./game-logic";
import { updateField } from "./gui";
import "../sass/index.scss";

let state = {
  cells: [],
  scores: {},
  currentTurn: "",
  gameStatus: "",
  winningCells: []
};
initializeField();
initializeScore();
updateField(state, onCellClick);

const newGameButton = document.querySelector(".new-game");
newGameButton.addEventListener("click", () => {
  initializeField(), updateField(state, onCellClick);
});
const clearButton = document.querySelector(".clear");
clearButton.addEventListener("click", () => {
  initializeField();
  initializeScore();
  updateField(state, onCellClick);
});

function initializeField() {
  state.cells = ["", "", "", "", "", "", "", "", ""];
  state.currentTurn = Math.random() < 0.5 ? "x" : "o";
  state.gameStatus = "ongoing";
  state.winningCells = [];
}

function initializeScore() {
  state.scores = {
    x: 0,
    o: 0
  };
}

function clone(cloned) {
  return JSON.parse(JSON.stringify(cloned));
}

function onCellClick(cellIndex) {
  state = handleCellClick({ cellIndex: cellIndex, ...clone(state) });
  updateField(state, onCellClick);
}
