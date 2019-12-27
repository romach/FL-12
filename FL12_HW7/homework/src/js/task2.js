// Your code goes here
const playGameConfirmation = confirm('Do you want to play a game?');
if (!playGameConfirmation) {
  alert('You did not become a billionaire, but can.');
} else {
  const ONE = 1;
  const INITIAL_MAXIMUM_GUESS_RANGE_SIZE = 8;
  let maximumGuessRangeSize = INITIAL_MAXIMUM_GUESS_RANGE_SIZE;
  let prizes = {
    1: 100,
    2: 50,
    3: 25
  };
  let gameIsOn = true;
  let totalUserPrize = 0;
  while (gameIsOn) {
    const GUESS_ATTEMPTS_COUNT = 3;
    const winNumber = Math.floor(Math.random() * (maximumGuessRangeSize + ONE));
    let currentAttemptNumber = 1;
    let userHasGuessed = false;
    while (currentAttemptNumber <= GUESS_ATTEMPTS_COUNT && !userHasGuessed) {
      const userGuess = parseInt(
        prompt(`Choose a roulette pocket number from 0 to ${maximumGuessRangeSize}
Attempts left: ${GUESS_ATTEMPTS_COUNT - currentAttemptNumber + 1}
Total prize: ${totalUserPrize}$
Possible prize on current attempt: ${prizes[currentAttemptNumber]}$`)
      );
      if (userGuess === winNumber) {
        userHasGuessed = true;
      }
      currentAttemptNumber++;
    }
    if (!userHasGuessed) {
      alert(
        `Thank you for your participation. Your prize is: ${totalUserPrize}`
      );
      gameIsOn = confirm('Do you want to play again?');
      prizes = {
        1: 100,
        2: 50,
        3: 25
      };
      maximumGuessRangeSize = INITIAL_MAXIMUM_GUESS_RANGE_SIZE;
      totalUserPrize = 0;
    } else {
      totalUserPrize += prizes[currentAttemptNumber];
      const continueConfirmation = confirm(`Congratulation, you won!
Your prize is: ${totalUserPrize} $.
Do you want to continue?`);
      if (!continueConfirmation) {
        alert(
          `Thank you for your participation. Your prize is: ${totalUserPrize} $`
        );
        gameIsOn = confirm('Do you want to play again?');
      } else {
        const TWO = 2;
        const NUMBER_RANGE_ENLARGEMENT = 4;
        maximumGuessRangeSize += NUMBER_RANGE_ENLARGEMENT;
        for (const [place, sum] of Object.entries(prizes)) {
          prizes[place] = sum * TWO;
        }
      }
    }
  }
}
