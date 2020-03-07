const CHOICES = ["rock", "paper", "scissors"];
const WINS_TO_END = 3;
let rounds = [];
let winner = null;

function resetState() {
  rounds = [];
  winner = null;
}

function getRounds() {
  return [...rounds];
}

function getWinner() {
  return winner;
}

function processChoice(choice) {
  if (winner) {
    return;
  }
  rounds.push(makeChoiceAndReturnRound(choice));
  updateWinner();
}

function makeChoiceAndReturnRound(userChoice) {
  const computerChoice = CHOICES[Math.trunc(Math.random() * CHOICES.length)];
  let result;
  if (userChoice === computerChoice) {
    result = "draw";
  } else {
    if (
      (userChoice === "rock" && computerChoice === "scissors") ||
      (userChoice === "scissors" && computerChoice === "paper") ||
      (userChoice === "paper" && computerChoice === "rock")
    ) {
      result = "win";
    } else {
      result = "loose";
    }
  }
  return { userChoice, computerChoice, result };
}

function updateWinner() {
  if (countResult("win") === WINS_TO_END) {
    winner = "user";
  }
  if (countResult("loose") === WINS_TO_END) {
    winner = "computer";
  }
}

function countResult(result) {
  return rounds.filter(round => round.result === result).length;
}

export { resetState, processChoice, getRounds, getWinner };
