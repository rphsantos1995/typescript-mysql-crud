import Joi from 'joi';

const productSchema = Joi.object({
  name: Joi.string().required().min(3)
    .messages({
      'string.base': 'Name must be a string',
      'string.min': 'Name must be longer than 2 characters',
      'any.required': 'Name is required' }),
  amount: Joi.string().required().min(3)
    .messages({
      'string.base': 'Amount must be a string',
      'string.min': 'Amount must be longer than 2 characters',
      'any.required': 'Amount is required' }),
});

export default productSchema;