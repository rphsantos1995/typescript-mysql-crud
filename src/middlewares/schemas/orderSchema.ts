import Joi from 'joi';

const orderSchema = Joi.object({
  products: Joi.array().required().min(1)
    .messages({
      'array.base': 'Products must be an array of numbers',
      'array.min': 'Products can\'t be empty',
      'any.required': 'Products is required' }),  
});

export default orderSchema;
