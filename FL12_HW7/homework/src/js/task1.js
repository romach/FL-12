// Your code goes here
const MINIMUM_EMAIL_LENGTH = 5;
const USER_EMAIL = 'user@gmail.com';
const USER_PASSWORD = 'UserPass';
const ADMIN_EMAIL = 'admin@gmail.com';
const ADMIN_PASSWORD = 'AdminPass';
const NEW_PASSWORD_MINIMUM_LENGTH = 6;
const email = prompt('Enter your e-mail');
if (email === null || email === '') {
  alert('Canceled');
} else if (email.length < MINIMUM_EMAIL_LENGTH) {
  alert('I don\'t know any emails having name length less than 5 symbols');
} else if (email === USER_EMAIL || email === ADMIN_EMAIL) {
  const password = prompt('Enter password');
  if (password === null || password === '') {
    alert('Canceled');
  } else if (
    email === USER_EMAIL && password === USER_PASSWORD ||
    email === ADMIN_EMAIL && password === ADMIN_PASSWORD
  ) {
    const changePasswordConfirmation = confirm(
      'Do you want to change your password?'
    );
    if (!changePasswordConfirmation) {
      alert('You have failed the change');
    } else {
      const oldPassword = prompt('Enter old password');
      if (oldPassword === null || oldPassword === '') {
        alert('Canceled');
      } else if (
        email === USER_EMAIL && oldPassword === USER_PASSWORD ||
        email === ADMIN_EMAIL && oldPassword === ADMIN_PASSWORD
      ) {
        const newPassword = prompt('Enter new password');
        if (newPassword === null || newPassword === '') {
          alert('Canceled');
        } else if (newPassword.length < NEW_PASSWORD_MINIMUM_LENGTH) {
          alert('It’s too short password. Sorry.');
        } else {
          const newPasswordRepeat = prompt('Enter new password again');
          if (newPasswordRepeat !== newPassword) {
            alert('You wrote the wrong password.');
          } else {
            alert('You have successfully changed your password.');
          }
        }
      } else {
        alert('Wrong old password');
      }
    }
  } else {
    alert('Wrong password');
  }
} else {
  alert("I don't know you");
}
