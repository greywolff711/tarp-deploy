const express = require("express");
const router = express.Router();

const BookedRooms = require("../models/BookedRooms");
const Rooms = require("../models/room");
const Inpatient = require("../models/inpatient");
const Outpatient = require("../models/outpatient");

router.get("/", async (req, res) => {
  try {
    const rooms = await BookedRooms.find();
    res.json(rooms);
  } catch (err) {
    console.log(err.message);
  }
});

router.post("/", async (req, res) => {
  try {
    // add the doctor id from the req pro
    const { from, price, paid, patient, room } = req.body;
    inpatient_fetch=await Inpatient.find({phone:patient});
    outpatient_fetch=await Outpatient.find({phoneNo:patient});
    let patient_id=null;
    if(inpatient_fetch.length===0){patient_id=outpatient_fetch[0]._id;}
    else patient_id=inpatient_fetch[0]._id;
    
    const booking = new BookedRooms({
      patient:patient_id,
      room,
      from,
      price,
      paid,
    });
    await booking.save();
    await Rooms.findOneAndUpdate({ _id: room }, { booked: true });
    res.json({ msg: "SUCCESSFUL BOOKING" });
  } catch (error) {
    console.log(error.message);
  }
});

router.post("/:book_id", async (req, res) => {
  try {
    // add the doctor id from the req pro
    console.log(req.body);
    const { from, price, paid, patient, room } = req.body;
    
    const fields = {};
    if (from.length != 0) {
      fields.from = from;
    }
    if (price.length != 0) {
      fields.price = price;
    }
    if (paid === "false") {
      fields.paid = false;
    }
    if (paid === "true") {
      fields.paid = true;
    }
    if (patient.length != 0) {
      inpatient_fetch=await Inpatient.find({phone:patient});
      outpatient_fetch=await Outpatient.find({phoneNo:patient});
      let patient_id=null;
      if(inpatient_fetch.length===0){patient_id=outpatient_fetch[0]._id;}
      else patient_id=inpatient_fetch[0]._id;
  
      fields.patient = patient_id;
    }
    if (room.length != 0) {
      fields.room = room;
    }
    try {
      let r = await BookedRooms.findOneAndUpdate(
        { _id: req.params.book_id },
        { $set: fields },
        { new: true }
      );
      res.status(200).json({ msg: "Updated successfully" });
    } catch (err) {
      console.log(err);
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:book_id", async (req, res) => {
  try {
    const obj = await BookedRooms.findOneAndRemove({
      book_id: req.params.book_id,
    });
    await Rooms.findOneAndUpdate({ _id: obj.room }, { booked: false });
    res.json({ msg: "Booking removed" });
  } catch (err) {
    console.log(err.message);
  }
});

module.exports = router;
