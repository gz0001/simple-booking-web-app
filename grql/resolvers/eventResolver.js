// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const { getUser, getEvent, getEvents, eventQL } = require("grql/utils");
const queryHelper = require("grql/utils/queryHelper");

//=========================================================================================

module.exports = {
  events: async ({ option }) => {
    try {
      const events = await queryHelper(Event, option);
      return events.map(event => eventQL(event));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated");
    const {
      title,
      description,
      price,
      date,
      dateEnd,
      street,
      city,
      max,
      status,
      pics
    } = args.eventInput;
    try {
      const event = new Event({
        title,
        description,
        price: +price,
        date: new Date(date),
        dateEnd: dateEnd ? new Date(dateEnd) : null,
        creator: req.userId,
        location: {
          street,
          city
        },
        max,
        status,
        pics
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
