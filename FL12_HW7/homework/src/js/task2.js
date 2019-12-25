// Your code goes here
// Task #2. Guessing game
// Your task is to write a simple simulator of casino roulette. 

// Requirements:
// Step 1:
//     • Create a prompt window (use confirm()). Show the message inside the window ‘Do you want to play a game?’.
const playGameConfirmation = confirm('Do you want to play a game?')
if (!playGameConfirmation) {
  //     • In case the user clicks the 'Cancel' button, the message 'You did not become a billionaire, but can.' should be shown (use alert).
  alert('You did not become a billionaire, but can.')
} else {
  // Step 2:
  //• If user clicked ‘Ok’ – start a game: randomly (use Math.random()) choose an integer number in range [0; 8] (including 0 and 8)
  // and ask user to enter a number of pocket on which the ball could land (use prompt()).

}
//     • User has 3 attempts to guess a number.
//     • If user guessed the number on which ball landed, on 1-st attempt prize is 100$ (maximum prize for current numbers range), 2-nd attempt – 50$, 3-rd attempt – 25$. 
//     • If user did not guess a number show the message ‘Thank you for your participation. Your prize is: … $’ (Use alert) and ask if he wants to play again (use confirm).
// Step 3:
//     • If user did guess - Show the message ‘Congratulation, you won!   Your prize is: … $. Do you want to continue?’.
//     • If user does not want to continue – show the message ‘Thank you for your participation. Your prize is: … $’ (Use alert) and ask if he wants to play again (use confirm).
//     • If user does want to continue, make number range bigger at 4 as the previous one (for example [0; 8] -> [0; 12]), and two times bigger maximum prize (for example on 1-st attempt prize will be 200$, 2-nd attempt – 100$, 3-rd attempt – 50$). Prize must be added to the previous one and number of attempts should be set to 3 (user should have 3 attempts to guess a number for each numbers range)
//     • Each time you ask user to enter a number you should show him a range of cells, how much attempts he has left, his total prize and possible prize on current attempt. See Figure 1:


//     • All these stuffs should be repeated until user lose or decide to quit