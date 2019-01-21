const mongoose = require("mongoose");
const { Schema } = mongoose;
const Event = require("models/event");
const User = require("models/user");

//=========================================================================================

const bookingSchema = new Schema(
  {
    event: {
      type: Schema.Types.ObjectId,
      ref: "Event"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    status: {
      type: String,
      default: "booked"
    }
  },
  {
    timestamps: true
  }
);

bookingSchema.virtual("obj").get(function() {
  return {
    ...this._doc,
    _id: this.id,
    createdAt: this._doc.createdAt.toString(),
    updatedAt: this._doc.updatedAt.toString()
  };
});

bookingSchema.pre("save", async function() {
  if (this.isNew) {
    const {
      _doc: { event, user },
      id
    } = this;

    await User.findOneAndUpdate({ _id: user }, { $push: { bookings: id } });
    await Event.findOneAndUpdate({ _id: event }, { $push: { bookings: id } });
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
