import { checkSchema, Schema } from 'express-validator';
import { Account } from '../models';

const isUniqueEmail = async (value: string) => {
  const account = await Account.findOneBy({ email: value });

  if (account) {
    return Promise.reject('Email is already in use');
  }
}

const isUniqueUsername = async (value: string) => {
  const account = await Account.findOneBy({ username: value });

  if (account) {
    return Promise.reject('Username is already in use');
  }
}

const getSchema = {
  username: {
    in: ['params'],
    trim: true,
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'The user does not exist',
      bail: true,
    },
    isAlphanumeric: {
      errorMessage: 'The user does not exist',
      bail: true,
    },
    toLowerCase: true,
  }
}

const registerSchema = {
  username: {
    in: ['body'],
    trim: true,
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Username should be between 5 and 25 characters',
      bail: true,
    },
    isAlphanumeric: {
      errorMessage: 'Username should contain only alphanumeric characters',
      bail: true,
    },
    toLowerCase: true,
    custom: {
      options: isUniqueUsername,
    },
  },
  email: {
    in: ['body'],
    trim: true,
    isEmail: {
      errorMessage: 'Email address entered is invalid',
      bail: true,
    },
    normalizeEmail: {
      options: { gmail_remove_dots: false, all_lowercase: true },
    },
    custom: {
      options: isUniqueEmail,
    },
  },
  password: {
    in: ['body'],
    trim: true,
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Password should be between 5 and 25 characters',
    },
  },
}

const loginSchema = {
  username: {
    in: ['body'],
    trim: true,
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Invalid credentials',
      bail: true,
    },
    toLowerCase: true,
  },
  password: {
    in: ['body'],
    trim: true,
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Invalid credentials',
      bail: true,
    }
  },
}

const updateSchema = {
  username: {
    optional: true,
    in: ['body'],
    trim: true,
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Username should be between 5 and 25 characters',
      bail: true,
    },
    isAlphanumeric: {
      errorMessage: 'Username entered should only contain alphanumeric characters',
      bail: true,
    },
    toLowerCase: true,
    custom: {
      options: isUniqueUsername,
    },
  },
  email: {
    optional: true,
    in: ['body'],
    trim: true,
    isEmail: {
      errorMessage: 'Email address entered is invalid',
      bail: true,
    }, 
    normalizeEmail: {
      options: { gmail_remove_dots: false, all_lowercase: true },
    },
    custom: {
      options: isUniqueEmail,
    },
  },
  password: {
    optional: true,
    in: ['body'],
    trim: true,
    isLength: {
      options: { min: 5, max: 25 },
      errorMessage: 'Password should be between 5 and 25 characters',
    },
  },
}

const getValidation = checkSchema(getSchema as Schema);
const registerValidation = checkSchema(registerSchema as Schema);
const loginValidation = checkSchema(loginSchema as Schema);
const updateValidation = checkSchema(updateSchema as Schema);

export { getValidation, registerValidation, loginValidation, updateValidation };