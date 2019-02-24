const ObjectId = require("mongoose").Types.ObjectId;

// Models:
const User = require("models/user");
const Event = require("models/event");
const Booking = require("models/booking");

// Utils:
const ServerError = require("utils/error");
const { getUser, getEvent, getEvents, eventQL } = require("grql/utils");
const queryHelper = require("grql/utils/queryHelper");

//=========================================================================================

module.exports = {
  events: async ({ option }, req) => {
    if (!req.isAuth) throw new ServerError("Unauthenticated", 401);

    try {
      const events = await queryHelper(Event, option);
      return events.map(event => eventQL(event));
    } catch (error) {
      console.log(error);
      throw error;
    }
  },
  popularEvents: async ({ limit }, req) => {
    //if (!req.isAuth) throw new ServerError("Unauthenticated", 401);
    const { userId } = req;

    try {
      const events = await Event.aggregate([
        {
          $match: {
            creator: { $ne: new ObjectId(userId) },
            date: { $gt: new Date() }
          }
        },
        {
          $unwind: {
            path: "$bookings",
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $group: {
            _id: "$_id",
            count: {
              $sum: 1
            }
          }
        },
        {
          $sort: {
            count: -1
          }
        },
        {
          $limit: limit
        }
      ]);

      return events.map(ev => getEvent(ev._id.toString()));
    } catch (error) {
      console.log("err: ", error);
      throw error;
    }
  },
  createEvent: async (args, req) => {
    if (!req.isAuth) throw new ServerError("Unauthenticated", 401);
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
