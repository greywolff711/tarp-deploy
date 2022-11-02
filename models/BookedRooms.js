const mongoose = require("mongoose")
const { Schema } = mongoose;
const { ObjectId } = Schema.Types;

const bookedRooms = Schema({
  patient: {
    type: ObjectId,
    ref: "Patient",
  },
  room: {
    type: ObjectId,
    ref: "Room",
  },
  from: {
    type: Date,
    required: true,
  },
  // to: {
  //   type: Date,
  //   required: true,
  // },
  price: {
    type: Number,
    required: true,
  },
  paid: {
    type: Boolean,
    required: true,
  },
});

const BookedRooms = mongoose.model("BookedRooms", bookedRooms);

module.exports = BookedRooms;
