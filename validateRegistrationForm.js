function validateForm(event) {
  // prevent default form submission so that we can do validations:
  event.preventDefault();

  // validate username:
  const username = document.getElementById("username").value;
  if (!isValidUsername(username)) {
    alert(
      "Username must start with a letter and be at least 3 characters long."
    );
    return false;
  }

  // validate password:
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirm_password").value;
  if (!isValidPassword(password)) {
    alert(
      "Password must be at least 8 characters long and contain at least one uppercase letter, one number, and one special character (/ * - + ! @ # $ ^ & ~ [ ])."
    );
    return false;
  }

  // validate email address:
  const email = document.getElementById("email").value;
  if (!isValidEmail(email)) {
    alert("Please provide a valid email address.");
    return false;
  }

  // ensure passwords match:
  if (password !== confirmPassword) {
    alert("Passwords do not match.");
    return false;
  }

  // if all validations pass, refresh page:
  alert("Form submitted successfully!");
  location.reload();
}

// check if username is valid:
function isValidUsername(username) {
  if (username.length < 3) {
    return false;
  }

  const firstChar = username.charAt(0);
  if (!isLetter(firstChar)) {
    return false;
  }

  for (let i = 1; i < username.length; i++) {
    const char = username.charAt(i);
    if (!isAlphanumeric(char)) {
      return false;
    }
  }

  return true;
}

// do simple email validation:
function isValidEmail(email) {
  return email.includes("@") && email.includes(".");
}

// check if password is valid:
function isValidPassword(password) {
  if (password.length < 8) {
    return false;
  }

  let hasUpperCase = false;
  let hasNumber = false;
  let hasSpecialChar = false;
  const specialChars = "/ * - + ! @ # $ ^ & ~ [ ]";

  for (let i = 0; i < password.length; i++) {
    const char = password.charAt(i);
    if (isUpperCaseLetter(char)) {
      hasUpperCase = true;
    } else if (isNumber(char)) {
      hasNumber = true;
    } else if (specialChars.includes(char)) {
      hasSpecialChar = true;
    }
  }

  return hasUpperCase && hasNumber && hasSpecialChar;
}

// check if a given character is a letter:
function isLetter(char) {
  return (char >= "a" && char <= "z") || (char >= "A" && char <= "Z");
}

// check if a character is in uppercase:
function isUpperCaseLetter(char) {
  return char >= "A" && char <= "Z";
}

// check if a character is a number:
function isNumber(char) {
  return char >= "0" && char <= "9";
}

// check that a given character is either a letter or a number:
function isAlphanumeric(char) {
  return isLetter(char) || isNumber(char);
}
