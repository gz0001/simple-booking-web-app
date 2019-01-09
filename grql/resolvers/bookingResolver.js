// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const {
  bookingQL,
  eventQL,
  getUser,
  getEvent,
  getBooking
} = require("grql/utils");

//=========================================================================================

module.exports = {
  bookings: async (args, req) => {
    //if (!req.isAuth) throw new Error("Unauthenticated!");
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => bookingQL(booking));
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated!");
    const eventId = args.eventId;
    try {
      const event = await Event.findOne({ _id: eventId });
      if (!event) throw new Error("Event not found!");
      const booking = await new Booking({
        event: event,
        user: req.userId
      }).save();

      return bookingQL(booking);
    } catch (error) {
      throw error;
    }
  },

  cancelBooking: async (args, req) => {
    if (!req.isAuth) throw new Error("Unauthenticated!");
    const bookingId = args.bookingId;
    try {
      const booking = await Booking.findById(bookingId).populate("event");
      const event = eventQL(booking.event);
      await Booking.deleteOne({ _id: bookingId });
      return event;
    } catch (error) {
      throw error;
    }
  }
};
