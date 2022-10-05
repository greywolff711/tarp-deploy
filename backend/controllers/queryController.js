const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");

const Query = require("../models/query");

router.post(
  "/query",
  auth,
  check("query", "query string should not be empty").notEmpty(),
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { query } = req.body;
    let patientId = req.user.id;

    try {
      let room = await Query.findOne({ query });
      if (room) {
        return res
          .status(400)
          .json({ error: [{ msg: "Similar query is already there" }] });
      }

      query = new Query({
        patient: patientId,
        query,
      });
      await query.save();
      res.status(201).json({ msg: "Query successfully reported" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/",auth,  async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:query_id", auth, async (req, res) => {
  try {
    let query = await Query.findOne({ _id: req.params.query_id });
    res.status(200).json(query);
  } catch (err) {
    console.log(err.message);
  }
});

router.post(
  "/:query_id",
  auth,
  check('status','Status should be of type boolean').isBoolean().notEmpty(),
  async (req, res) => {
    let status = req.body.status;
    try{
        let r = await Query.findOneAndUpdate({_id: req.params.query_id},{status});
        res.status(200).json({msg:"Updated successfully"})
    }
    catch(err){
        console.log(err);
    }
  }
);

router.delete("/:query_id", auth, async (req, res) => {
  try {
    await Query.findOneAndDelete({ _id: req.params.query_id });
    res.json({ msg: "Query deleted successfully." });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;