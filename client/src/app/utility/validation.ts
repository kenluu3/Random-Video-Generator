const alphaNumericRegex = new RegExp(/^[a-z0-9]+$/i);
const emailRegex = new RegExp(/\S+@\S+\.\S+/);

const loginValidation = {
  username: (value: string) => {
    const sanitizeUsername = value.trim().toLowerCase();

    if (sanitizeUsername.length === 0)
      return 'Username field is required';
    if (sanitizeUsername.length < 5 || sanitizeUsername.length > 25)
      return 'Invalid username entered';
    if (!alphaNumericRegex.test(sanitizeUsername))
      return 'Invalid username entered';
  },
  password: (value: string) => {
    const sanitizePassword = value.trim();

    if (sanitizePassword.length === 0)
      return 'Password field is required';
    if (sanitizePassword.length < 5 || sanitizePassword.length > 25)
      return 'Invalid credentials entered';
  },
}

const registerValidation = {
  username: (value: string) => {
    const sanitizeUsername = value.trim().toLowerCase();
  
    if (sanitizeUsername.length === 0)
      return 'Username field is required';
    if (sanitizeUsername.length < 5 || sanitizeUsername.length > 25)
      return 'Username entered must be between 5 and 25 characters';
    if (!alphaNumericRegex.test(sanitizeUsername))
      return 'Username must only contain alphanumeric characters.';
  },
  password: (value: string) => {
    const sanitizePassword = value.trim();
  
    if (sanitizePassword.length === 0)
      return 'Password field is required';
    if (sanitizePassword.length < 5 || sanitizePassword.length > 25)
      return 'Password entered must be between 5 and 25 characters';
  },
  email: (value: string) => {
    const sanitizeEmail = value.trim().toLowerCase();
  
    if (sanitizeEmail.length === 0)
      return 'Email field is required';
    if (!emailRegex.test(sanitizeEmail))
      return 'Invalid email entered';
  },
  confirmPassword: (value: string, values: any) => {
    const sanitizePassword = value.trim();
  
    if (sanitizePassword !== values.password || !values.password)
      return 'Password does not match';
  },
}

const profileValidation = { 
  username: registerValidation.username, 
  email: registerValidation.email,
  password: registerValidation.password,
}

export { loginValidation, registerValidation, profileValidation }