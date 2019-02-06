// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const ServerError = require("utils/error");
const {
  bookingQL,
  eventQL,
  getUser,
  getEvent,
  getBooking
} = require("grql/utils");
const queryHelper = require("grql/utils/queryHelper");

//=========================================================================================

module.exports = {
  bookings: async ({ option }, req) => {
    if (!req.isAuth) throw new ServerError("Unauthenticated", 401);
    try {
      const bookings = await queryHelper(Booking, option);
      return bookings.map(booking => bookingQL(booking));
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) throw new ServerError("Unauthenticated", 401);
    const eventId = args.eventId;
    try {
      const event = await Event.findOne({ _id: eventId });
      if (!event) throw new Error("Event not found!");
      const booking = await new Booking({
        event: event._id,
        user: req.userId
      }).save();

      return bookingQL(booking);
    } catch (error) {
      throw error;
    }
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) throw new ServerError("Unauthenticated", 401);
    const bookingId = args.bookingId;
    try {
      const booking = await Booking.findById(bookingId).populate("event");
      const event = eventQL(booking.event);
      await booking.set({ status: "canceled" }).save();
      return event;
    } catch (error) {
      throw error;
    }
  }
};
