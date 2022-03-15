import Joi from 'joi';

const errMsg = {
  user: {
    userRequired: 'Username is required',
    userString: 'Username must be a string',
    userLength: 'Username must be longer than 2 characters',
  },
  classe: {
    classeRequired: 'Classe is required',
    classeString: 'Classe must be a string',
    classeLength: 'Classe must be longer than 2 characters',
  },
  level: {
    levelRequired: 'Level is required',
    levelNumber: 'Level must be a number',
    levelLength: 'Level must be greater than 0',
  },
  password: {
    passwordRequired: 'Password is required',
    passwordString: 'Password must be a string',
    passwordLength: 'Password must be longer than 7 characters',
  },
};

const userSchema = Joi.object({
  username: Joi.string().required().min(3)
    .messages({
      'string.base': errMsg.user.userString,
      'string.min': errMsg.user.userLength,
      'any.required': errMsg.user.userRequired }),
  classe: Joi.string().required().min(3)
    .messages({
      'string.base': errMsg.classe.classeString,
      'string.min': errMsg.classe.classeLength,
      'any.required': errMsg.classe.classeRequired }),
  level: Joi.number().strict().integer().min(1)
    .required()
    .messages({
      'number.base': errMsg.level.levelNumber,
      'number.min': errMsg.level.levelLength,
      'any.required': errMsg.level.levelRequired }),

  password: Joi.string().required().min(8)
    .messages({
      'string.base': errMsg.password.passwordString,
      'string.min': errMsg.password.passwordLength,
      'any.required': errMsg.password.passwordRequired }),
});

export default userSchema;