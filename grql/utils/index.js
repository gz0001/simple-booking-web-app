// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Helper:
const queryHelper = require("grql/utils/queryHelper");

//=========================================================================================

// User:
const getUser = async userId => {
  try {
    const user = await User.findById(userId);
    if (!user) return null;
    return {
      ...user.obj,
      createdEvents: ({ option }) => getEvents(user._doc.createdEvents, option),
      bookings: ({ option }) => getBookings(user._doc.bookings, option)
    };
  } catch (error) {
    throw error;
  }
};

// Event:
const getEvent = async eventId => {
  try {
    const event = await Event.findById(eventId);
    if (!event) return null;
    return {
      ...event.obj,
      creator: () => getUser(event._doc.creator),
      bookings: ({ option }) => getBookings(event._doc.bookings, option)
    };
  } catch (error) {}
};

const getEvents = async (eventIds, option) => {
  try {
    const events = await queryHelper(Event, option, { _id: { $in: eventIds } });
    return events.map(event => ({
      ...event.obj,
      creator: () => getUser(event._doc.creator),
      bookings: ({ option }) => getBookings(event._doc.bookings, option)
    }));
  } catch (error) {
    throw error;
  }
};

// Booking:
const getBooking = async bookingId => {
  try {
    const booking = await Booking.findById(bookingId);
    if (!booking) return null;
    return {
      ...booking.obj,
      event: () => getEvent(booking.obj.event),
      user: () => getUser(booking.obj.user)
    };
  } catch (error) {
    throw error;
  }
};

const getBookings = async (bookingIds, option) => {
  try {
    const bookings = await queryHelper(Booking, option, {
      _id: { $in: bookingIds }
    });
    return bookings.map(booking => ({
      ...booking.obj,
      event: () => getEvent(booking.obj.event),
      user: () => getUser(booking.obj.user)
    }));
  } catch (error) {
    throw error;
  }
};

// Transform:

const userQL = user => {
  if (!user) return null;
  return {
    ...user.obj,
    createdEvents: ({ option }) => getEvents(user._doc.createdEvents, option),
    bookings: ({ option }) => getBookings(user._doc.bookings, option)
  };
};

const eventQL = event => {
  if (!event) return null;
  return {
    ...event.obj,
    creator: () => getUser(event._doc.creator),
    bookings: ({ option }) => getBookings(event._doc.bookings, option)
  };
};

const bookingQL = booking => {
  if (!booking) return null;
  return {
    ...booking.obj,
    user: () => getUser(booking.obj.user),
    event: () => getEvent(booking.obj.event)
  };
};

module.exports = {
  getBooking,
  getBookings,
  getUser,
  getEvent,
  getEvents,
  userQL,
  eventQL,
  bookingQL
};
