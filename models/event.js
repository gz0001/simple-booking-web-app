const mongoose = require("mongoose");
const { Schema } = mongoose;

//=========================================================================================

const eventSchema = new Schema(
  {
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    date: { type: Date, required: true },
    dateEnd: Date,
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    bookings: [{ type: Schema.Types.ObjectId, ref: "Booking" }],
    location: {
      street: { type: String, required: true },
      city: { type: String, required: true }
    },
    category: [String],
    max: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      required: true,
      default: "ongoing"
    },
    pics: [String]
  },
  {
    timestamps: true
  }
);

eventSchema.virtual("obj").get(function() {
  const { date, dateEnd } = this._doc;
  return {
    ...this._doc,
    _id: this.id,
    date: new Date(date).toString(),
    dateEnd: dateEnd ? new Date(dateEnd).toString() : null
  };
});

module.exports = mongoose.model("Event", eventSchema);
