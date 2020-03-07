import "../sass/styles.scss";
import { refreshDOM } from "./dom";
import { processChoice, resetState, getRounds, getWinner } from "./logic";

initializeApp();

function initializeApp() {
  addHandlersOnChoiceButtons();
  addHandlerOnResetLink();
}

function addHandlersOnChoiceButtons() {
  const choiceButtons = document.querySelectorAll(".button");
  for (const button of choiceButtons) {
    button.addEventListener("click", () => {
      processChoice(button.dataset.choice);
      refreshDOM(getRounds(), getWinner());
    });
  }
}

function addHandlerOnResetLink() {
  const resetLink = document.querySelector(".reset");
  resetLink.addEventListener("click", function resetGame() {
    resetState();
    refreshDOM(getRounds(), getWinner());
  });
}
