const bcrypt = require("bcryptjs");

// Resolvers:
const bookingResolver = require("./bookingResolver");
const userResolver = require("./userResolver");
const eventResolver = require("./eventResolver");

// Root resolvers:
module.exports = {
  // Event api:
  ...eventResolver,

  // User api:
  ...userResolver,

  // Booking:
  ...bookingResolver
};
