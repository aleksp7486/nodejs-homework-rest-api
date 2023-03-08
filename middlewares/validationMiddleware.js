const Joi = require('joi');

const addContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/)
      .required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next({
      status: 400,
      message: validationResult.error.details,
    });
  }

  next();
};

const updateContactValidation = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next({
      status: 400,
      message: validationResult.error.details,
    });
  }

  next();
};

module.exports = { addContactValidation, updateContactValidation };
