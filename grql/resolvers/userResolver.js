const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const { getUser, getEvent, getEvents, userQL } = require("grql/utils");
const queryHelper = require("grql/utils/queryHelper");

//=========================================================================================

module.exports = {
  users: async ({ option }, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated!");
    try {
      const users = await queryHelper(User, option);
      return users.map(user => userQL(user));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createUser: async args => {
    const {
      email,
      password,
      firstname,
      lastname,
      city,
      age,
      pic
    } = args.userInput;
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await new User({
        email,
        password: hashedPassword,
        firstname,
        lastname,
        city,
        age,
        pic
      }).save();

      const token = await jwt.sign(
        { userId: user.id, email: user._doc.email },
        "truong92",
        {
          expiresIn: "7d"
        }
      );
      return { userId: user.id, token, tokenExpiration: "7d" };
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  login: async ({ email, password }) => {
    try {
      const user = await User.findOne({ email });
      // Check user exist:
      if (!user) throw Error("User does not exist!");

      const isEqual = await bcrypt.compare(password, user.password);
      if (!isEqual) {
        throw new Error("Password is not correct!");
      } else {
        const token = await jwt.sign({ userId: user.id }, "truong92", {
          expiresIn: "1h"
        });
        return { userId: user.id, token, tokenExpiration: "1h" };
      }
    } catch (error) {
      throw error;
    }
  },
  verifyToken: async (args, req) => {
    const { isAuth, userId } = req;
    try {
      if (!isAuth) throw new Error("token expired!");

      const newToken = await jwt.sign({ userId }, "truong92", {
        expiresIn: "1h"
      });
      return { userId, token: newToken, tokenExpiration: "1h" };
    } catch (error) {
      throw error;
    }
  }
};
