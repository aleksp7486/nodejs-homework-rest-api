class PhoneBookError extends Error {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class ValidationError extends PhoneBookError {
  constructor(message) {
    super(message);
    this.status = 400;
  }
}

class NotAuthorizedError extends PhoneBookError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class IdError extends PhoneBookError {
  constructor(message) {
    super(message);
    this.status = 401;
  }
}

class RegistrationError extends PhoneBookError {
  constructor(message) {
    super(message);
    this.status = 409;
  }
}

module.exports = {
  PhoneBookError,
  ValidationError,
  NotAuthorizedError,
  IdError,
  RegistrationError,
};
