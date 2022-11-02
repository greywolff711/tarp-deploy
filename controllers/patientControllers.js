const express = require("express");
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");
const Patient = require("../models/inpatient");
const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Patient.findOne({ email })
    .then((patient) => {
      if (!patient)
        return res.status(400).json({ msg: "patient does not exist" });
      bcrypt.compare(password, patient.password).then((isMatch) => {
        if (!isMatch)
          return res.status(400).json({ msg: "Invalid credentials" });
        jwt.sign(
          { id: patient._id },
          config.get("jwttoken"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
            });
          }
        );
      });
    })
    .catch((err) => {});
});

router.post(
  "/signup",
  check("name", "name is required").not().isEmpty(),
  check("email", "email is required").isEmail(),
  check("password", "password is required").notEmpty(),
  check("age", "age is required").notEmpty(),
  check("phoneNo", "phone is required").notEmpty(),
  check("address", "address is required").notEmpty(),
  async (req, res) => {
    console.log(req.body);
    errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { name, email, password, age, gender, phoneNo, address } = req.body;

    try {
      let patient = await Patient.findOne({ email });
      if (patient) {
        return res
          .status(400)
          .json({ error: [{ msg: "User is already taken" }] });
      }

      patient = new Patient({
        name,
        email,
        password,
        age,
        gender,
        phoneNo,
        address,
      });

      //encrypting password
      const salt = await bcrypt.genSalt(10);
      patient.password = await bcrypt.hash(password, salt);
      await patient.save();
      //return json web token
      const payload = {
        user: {
          id: patient.id,
        },
      };
      jwt.sign(
        payload,
        config.get("jwttoken"),
        { expiresIn: 3600 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.log(err.message);
      res.status(500).send("Server Error");
    }
  }
);

router.get("/:id", (req, res) => {
  const userId = req.params["id"];
  Patient.findOne({ _id: userId }).then((user) => {
    return user;
  });
});

module.exports = router;
