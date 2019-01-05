// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const { getUser, getEvent, getBooking } = require("grql/utils");

//=========================================================================================

module.exports = {
  bookings: async () => {
    try {
      const bookings = await Booking.find();
      return bookings.map(booking => ({
        ...booking.obj,
        user: getUser(booking.obj.user),
        event: getEvent(booking.obj.event)
      }));
    } catch (error) {
      throw error;
    }
  },
  bookEvent: async args => {
    const eventID = args.eventID;
    try {
      const event = await Event.findOne({ _id: eventID });
      const booking = await new Booking({
        event: event,
        user: "5c28b6ef5c6f272388050877"
      }).save();

      return getBooking(booking._id);
    } catch (error) {
      throw error;
    }
  },

  cancelBooking: async args => {
    const bookingID = args.bookingID;
    try {
      const booking = await Booking.findById(bookingID).populate("event");
      const event = {
        ...booking.event.obj,
        creator: getUser(booking.event.obj.creator)
      };
      await Booking.deleteOne({ _id: bookingID });
      return event;
    } catch (error) {
      throw error;
    }
  }
};
