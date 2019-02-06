module.exports = class ServerError extends Error {
  constructor(message, code) {
    super(message);
    this.code = code;
  }
};
