// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const { getUser, getEvent, getEvents, eventQL } = require("grql/utils");

//=========================================================================================

module.exports = {
  events: async () => {
    try {
      const events = await Event.find();
      return events.map(event => eventQL(event));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    const { title, description, price, date } = args.eventInput;
    try {
      const event = new Event({
        title,
        description,
        price: +price,
        date: new Date(date),
        creator: req.userId
      });
      const ev = await event.save();

      const creator = await User.findById(req.userId);

      if (!creator) throw new Error("user not found.");
      creator.createdEvents.push(event);

      await creator.save();

      return eventQL(ev);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
};
