// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const { getUser, getEvent, getEvents } = require("grql/utils");

//=========================================================================================

module.exports = {
  users: async () => {
    try {
      const users = await User.find();
      return users.map(user => ({
        ...user.obj,
        createdEvents: getEvents(user._doc.createdEvents)
      }));
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
  }
};
