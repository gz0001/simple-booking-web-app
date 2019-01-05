// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

//=========================================================================================

// User:
const getUser = async userId => {
  try {
    const user = await User.findById(userId);
    return {
      ...user.obj,
      createdEvents: getEvents(user._doc.createdEvents)
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
      creator: getUser(event._doc.creator)
    };
  } catch (error) {}
};

const getEvents = async eventIds => {
  try {
    const events = await Event.find({ _id: { $in: eventIds } });
    return events.map(event => ({
      ...event.obj,
      creator: getUser(event._doc.creator)
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
      event: getEvent(booking.obj.event),
      user: getUser(booking.obj.user)
    };
  } catch (error) {
    throw error;
  }
};

const getBookings = async bookingIds => {
  try {
    const bookings = await Booking.find({ _id: { $in: bookingIds } });
    return bookings.map(booking => ({
      ...booking.obj,
      event: getEvent(booking.obj.event),
      user: getUser(booking.obj.user)
    }));
  } catch (error) {
    throw error;
  }
};

module.exports = {
  getBooking,
  getBookings,
  getUser,
  getEvent,
  getEvents
};
