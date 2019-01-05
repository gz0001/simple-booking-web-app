const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const { getUser, getEvent, getEvents, userQL } = require("grql/utils");

//=========================================================================================

module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map(user => userQL(user));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },

  createUser: async args => {
    const { email, password } = args.userInput;
    try {
      const checkUser = await User.findOne({ email });
      if (checkUser) throw new Error("User already exists");

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await new User({
        email,
        password: hashedPassword
      }).save();

      return user.obj;
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
        const token = await jwt.sign({userId: user.id, email: user._doc.email}, 'truong92', {
          expiresIn: '1h'
        })
        return {userId: user.id, token, tokenExpiration: 1}
      }
    } catch (error) {
      throw error;
    }
  }
};
