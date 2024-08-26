const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User  = require("../models/user_models");

exports.test = async (req, res) => {
    try {
        return res.status(200).json({message:"Hello"})
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error during login" });
    }
  };
  