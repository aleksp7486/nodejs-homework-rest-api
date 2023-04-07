const Joi = require('joi');

const { ValidationError } = require('../helpers/error');

const addContactValidation = (req, _, next) => {
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
    next(new ValidationError(JSON.stringify(validationResult.error.details)));
  }

  next();
};

const updateContactValidation = (req, _, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string()
      .length(10)
      .pattern(/^[0-9]+$/),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(
      next(new ValidationError(JSON.stringify(validationResult.error.details))),
    );
  }

  next();
};

const userValidation = (req, _, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(
      next(new ValidationError(JSON.stringify(validationResult.error.details))),
    );
  }

  next();
};

const userConfirmationValidation = (req, _, next) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(
      next(new ValidationError(JSON.stringify(validationResult.error.details))),
    );
  }

  next();
};

const subscriptionValidation = (req, _, next) => {
  const schema = Joi.object({
    subscription: Joi.string().valid('starter', 'pro', 'business'),
  });

  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    next(
      next(new ValidationError(JSON.stringify(validationResult.error.details))),
    );
  }

  next();
};

module.exports = {
  addContactValidation,
  updateContactValidation,
  userValidation,
  subscriptionValidation,
  userConfirmationValidation,
};
