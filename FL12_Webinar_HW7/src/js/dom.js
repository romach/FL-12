function refreshDOM(rounds, winner) {
  refreshRoundsList(rounds);
  refreshWinMessage(winner);
}

function refreshRoundsList(rounds) {
  const roundsSection = document.querySelector(".rounds");
  roundsSection.textContent = "";
  rounds.forEach((round, index) => {
    const resultMessages = {
      win: '<span class="round-result round-result-win">You’ve WON!</span>',
      loose: '<span class="round-result round-result-lose">You’ve LOSE!</span>',
      draw: '<span class="round-result round-result-draw">DRAW!</span>'
    };
    const roundElement = document.createElement("div");
    roundElement.insertAdjacentHTML(
      "beforeend",
      `<strong>Round ${index + 1}:</strong> ${uppercaseFirstLetter(
        round.userChoice
      )} vs. ${uppercaseFirstLetter(round.computerChoice)}, ${
        resultMessages[round.result]
      }`
    );
    roundsSection.appendChild(roundElement);
  });
}

function uppercaseFirstLetter(word) {
  return word[0].toUpperCase() + word.slice(1);
}

function refreshWinMessage(winner) {
  const finalResultSection = document.querySelector(".final-result");
  finalResultSection.textContent = "";
  const winMessages = {
    user: `<div class="final-result-win">User won</div>`,
    computer: `<div class="final-result-lose">Computer won</div>`
  };
  if (winner) {
    finalResultSection.insertAdjacentHTML("beforeend", winMessages[winner]);
  }
}

export { refreshDOM };
