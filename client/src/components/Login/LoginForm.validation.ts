const usernameValidation = (value: string) => {
  const sanitizeUsername = value.trim().toLowerCase();
  const alphaNumericRegex = new RegExp(/^[a-z0-9]+$/i);

  if (sanitizeUsername.length === 0)
    return 'Username field is required';
  if (sanitizeUsername.length < 5 || sanitizeUsername.length > 25)
    return 'Invalid username entered';
  if (!alphaNumericRegex.test(sanitizeUsername))
    return 'Invalid username entered';
}

const passwordValidation = (value: string) => {
  const sanitizePassword = value.trim();

  if (sanitizePassword.length === 0)
    return 'Password field is required';
  if (sanitizePassword.length < 5 || sanitizePassword.length > 25)
    return 'Invalid credentials entered';
}

export { usernameValidation, passwordValidation }