const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");

const Room = require("../models/room");

router.post(
  "/room",
  // auth,
  check("roomNo", "room num is required").isNumeric().notEmpty(),
  check("block", "block is required").notEmpty(),
  check("pricePerDay", "price per day is required").isNumeric().notEmpty(),
  async (req, res) => {
    console.log(req.user);
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { roomNo, block, pricePerDay } = req.body;

    try {
      let room = await Room.findOne({ roomNo, block });
      if (room) {
        return res
          .status(400)
          .json({ error: [{ msg: "Room number is already given" }] });
      }

      room = new Room({
        roomNo: parseInt(roomNo),
        block,
        pricePerDay: parseInt(pricePerDay),
      });
      await room.save();
      res.status(201).json({ msg: "Room successfully added" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/", async (req, res) => {
  try {
    const rooms = await Room.find();
    res.status(200).json(rooms);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/left", async (req, res) => {
  try {
    let result = await Room.count({ booked: { $ne: true } });
    res.json({ left: result });
  } catch (err) {
    console.log(err);
  }
});

router.get("/:room_no", async (req, res) => {
  try {
    let room = await Room.findOne({ _id: req.params.room_no });
    res.status(200).json(room);
  } catch (err) {
    console.log(err.message);
  }
});

router.delete("/:room_id", async (req, res) => {
  try {
    await Room.findOneAndDelete({ _id: req.params.room_id });
    res.json({ msg: "Room deleted successfully." });
  } catch (err) {
    console.log(err);
  }
});

router.post("/:room_id", async (req, res) => {
  // let status = req.body.status;
  const { roomNo, block, pricePerDay } = req.body;
  // console.log(req.body)
  const fields = {};
  if (roomNo.length != 0) {
    fields.roomNo = parseInt(roomNo);
  }
  if (block.length != 0) {
    fields.block = block;
  }
  if (pricePerDay.length != 0) {
    fields.pricePerDay = pricePerDay;
  }
  console.log(fields.query);
  try {
    let r = await Room.findOneAndUpdate(
      { _id: req.params.room_id },
      { $set: fields },
      { new: true }
    );
    res.status(200).json({ msg: "Updated successfully" });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
