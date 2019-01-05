const mongoose = require("mongoose");
const { Schema } = mongoose;
const { getUser, getEvents, getBooking } = require("grql/utils");

//=========================================================================================

const eventSchema = new Schema({
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
  date: {
    type: Date,
    required: true
  },
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

eventSchema.virtual("obj").get(function() {
  return {
    ...this._doc,
    _id: this.id,
    date: new Date(this._doc.date).toString()
  };
});

eventSchema.virtual("qlObj").get(function() {
  return {
    ...this._doc,
    _id: this.id,
    date: new Date(this._doc.date).toString(),
    creator: getUser(this._doc.creator)
  };
});

module.exports = mongoose.model("Event", eventSchema);
