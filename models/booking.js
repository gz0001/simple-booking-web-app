const mongoose = require("mongoose");

const { Schema } = mongoose;

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

module.exports = mongoose.model("Booking", bookingSchema);
