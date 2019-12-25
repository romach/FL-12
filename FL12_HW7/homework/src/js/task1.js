// Your code goes here

// Task #1. Check the email and change the password
// Write the code which verify user rights.

// Step 1. Check login
//     • Ask user for an email // use prompt()
const MINIMUM_EMAIL_LENGTH = 5
const USER_EMAIL = 'user@gmail.com'
const USER_PASSWORD = 'UserPass'
const ADMIN_EMAIL = 'admin@gmail.com'
const ADMIN_PASSWORD = 'AdminPass'
const NEW_PASSWORD_MINIMUM_LENGTH = 6

const email = prompt('Enter your e-mail')
//     • If the input is an empty line or Esc – show “Canceled.” // for showing - use alert()
if (email === null || email === '') {
  alert('Canceled')
//     • If the input length less than 5 symbols - show “I don't know any emails having name length less than 5 symbols”. 
} else if (email.length < MINIMUM_EMAIL_LENGTH) {
  alert('I don\'t know any emails having name length less than 5 symbols')
//     • If the visitor enters "user@gmail.com" or "admin@gmail.com" then prompt for a password.
} else if (email === USER_EMAIL || email === ADMIN_EMAIL) {
  // Step 2. Check password:
  const password = prompt('Enter password')
  // • For an empty string or cancelled input, show “Canceled.”
  if (password === null || password === '') {
    alert('Canceled')
  // • For email "user@gmail.com" correct password is “UserPass”, for "admin@gmail.com" correct password is  “AdminPass”.
  } else if ((email === USER_EMAIL && password === USER_PASSWORD) || (email === ADMIN_EMAIL && password === ADMIN_PASSWORD)) {
    // Step 3. Change the password:
    //     • 1) Suggest user/admin to change his password – “Do you want to change your password?”. //use confirm()
    const changePasswordConfirmation = confirm('Do you want to change your password?')
    //     • In case the user clicks the 'Cancel' button, the message “You have failed the change.” //use alert()
    if (!changePasswordConfirmation) {
      alert('You have failed the change')
    } else {
      //     • 2) If user clicked ‘Ok’ – ask to write the old password (use prompt() ) and validate it as at Step 2. 
      const oldPassword = prompt('Enter old password')
      if (oldPassword === null || oldPassword === '') {
        alert('Canceled')
      } else if ((email === USER_EMAIL && oldPassword === USER_PASSWORD) || (email === ADMIN_EMAIL && oldPassword === ADMIN_PASSWORD)) {
        //     • 3) If the visitor enters correct old password for current email then prompt for a new password.
        const newPassword = prompt('Enter new password')
        //     • If the input is an empty line or ‘Cancel’ button is clicked  – show “Canceled” //use alert()
        if (newPassword === null || newPassword === '') {
          alert('Canceled')
          //     • If the input length less than 6 – show  “It’s too short password. Sorry.”
        } else if (newPassword.length < NEW_PASSWORD_MINIMUM_LENGTH) {
          alert('It’s too short password. Sorry.')
          //     • 4) If the new password is valid ask to enter it again.//use prompt()
        } else {
          const newPasswordRepeat = prompt('Enter new password again')
          //     • If the inputted value  doesn’t match the new password from 3) – show “You wrote the wrong password.”
          if (newPasswordRepeat !== newPassword) {
            alert('You wrote the wrong password.')
            //     • If user write the same new – show “You have successfully changed your password.” //use alert()
          } else {
            alert('You have successfully changed your password.')
          }
        }
      } else {
        alert('Wrong old password')
      }
    }
  } else {
    //   In other case, show “Wrong password”.
    alert('Wrong password')
  }
} else {
  //     • If it’s another string – then show “I don’t know you”.
  alert('I don\'t know you')
}