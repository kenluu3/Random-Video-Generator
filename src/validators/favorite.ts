import { checkSchema, Schema } from 'express-validator';

const addSchema = {
  id: {
    in: ['body'],
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: 'Missing video ID',
    },
  },
  title: {
    in: ['body'],
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: 'Missing video title',
    },
  },
  channel : {
    in: ['body'],
    trim: true,
    isEmpty: {
      negated: true,
      errorMessage: 'Missing channel',
    },
  },
}

const removeSchema = {
  id: {
    in: ['body'],
    trim: true,
    isEmpty: {
      negated: true,
     errorMessage: 'Missing video ID',
    },
  },
}

const addValidation = checkSchema(addSchema as Schema);
const removeValidation = checkSchema(removeSchema as Schema);

export { addValidation, removeValidation };