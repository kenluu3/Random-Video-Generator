const usernameValidation = (value: string) => {
  const sanitizeUsername = value.trim().toLowerCase();
  const alphaNumericRegex = new RegExp(/^[a-z0-9]+$/i);

  if (sanitizeUsername.length === 0)
    return 'Username field is required';
  if (sanitizeUsername.length < 5 || sanitizeUsername.length > 25)
    return 'Username entered must be between 5 and 25 characters';
  if (!alphaNumericRegex.test(sanitizeUsername))
    return 'Username must only contain alphanumeric characters.';
}

const passwordValidation = (value: string) => {
  const sanitizePassword = value.trim();

  if (sanitizePassword.length === 0)
    return 'Password field is required';
  if (sanitizePassword.length < 5 || sanitizePassword.length > 25)
    return 'Password entered must be between 5 and 25 characters';
}

const emailValidation = (value: string) => {
  const sanitizeEmail = value.trim().toLowerCase();
  const emailRegex = new RegExp(/\S+@\S+\.\S+/);

  if (sanitizeEmail.length === 0)
    return 'Email field is required';
  if (!emailRegex.test(sanitizeEmail))
    return 'Invalid email entered';
  
}

const confirmPasswordValidation = (value: string, values: any) => {
  const sanitizePassword = value.trim();

  if (sanitizePassword !== values.password || !values.password)
    return 'Password does not match';
}

export { confirmPasswordValidation, emailValidation, passwordValidation, usernameValidation };