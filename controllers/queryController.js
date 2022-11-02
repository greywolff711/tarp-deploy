const express = require("express");
const { check, validationResult } = require("express-validator");
const router = express.Router();
const auth = require("../middleware/auth");

const Query = require("../models/query");

router.post(
  "/query",
  check("query", "query string should not be empty").notEmpty(),
  async (req, res) => {
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    let { patient,query,status } = req.body;
    // let patientId = req.user.id;

    try {
      query = new Query({
        patient,
        query,
        status,
      });
      await query.save();
      res.status(201).json({ msg: "Query successfully reported" });
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/",  async (req, res) => {
  try {
    const queries = await Query.find();
    res.status(200).json(queries);
  } catch (err) {
    console.log(err.message);
  }
});

router.get("/:query_id",  async (req, res) => {
  try {
    let query = await Query.findOne({ _id: req.params.query_id });
    res.status(200).json(query);
  } catch (err) {
    console.log(err.message);
  }
});

router.post(
  "/:query_id",
  // auth,
  check('status','Status should be of type boolean').isBoolean().notEmpty(),
  async (req, res) => {
    // let status = req.body.status;
    const {patient,query,status}=req.body;
    console.log("req.body")
    const fields={};
    if(query.length != 0 )
    {
      fields.query=query;
    }
    if(patient.length != 0)
    {
      fields.patient=patient;
    }
    if(status ==="false")
    {
      fields.status=false
    }
    if(status ==="true"){
      fields.status=true
    }
    console.log(fields.query)
    try{
        // let r = await Query.findOneAndUpdate({_id: req.params.query_id},{status});
        let r = await Query.findOneAndUpdate(
          {_id: req.params.query_id},
          {$set:fields},
          {new: true}
        );
        res.status(200).json({msg:"Updated successfully"})
    }
    catch(err){
        console.log(err);
    }
  }
);

router.delete("/:query_id", async (req, res) => {
  try {
    await Query.findOneAndDelete({ _id: req.params.query_id });
    res.json({ msg: "Query deleted successfully." });
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
