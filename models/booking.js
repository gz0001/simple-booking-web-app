const mongoose = require("mongoose");
const { Schema } = mongoose;
const { getUser, getEvent, getBooking } = require("grql/utils");

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

bookingSchema.virtual("qlObj").get(function() {
  return {
    ...this._doc,
    _id: this.id,
    event: getEvent(this._doc.event),
    user: getUser(this.doc.user),
    createdAt: this._doc.createdAt.toString(),
    updatedAt: this._doc.updatedAt.toString()
  };
});

module.exports = mongoose.model("Booking", bookingSchema);
