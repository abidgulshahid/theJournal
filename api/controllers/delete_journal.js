const {User, Journal}  = require("../models/user_models");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const axios = require('axios'); 


exports.delete_entry = async (req, res) => {
    try {
      const id = req.body

      if (!id) {
        return res.status(200).json({'message': "ID not Found" })
      }
  
      const get_journal = await Journal.findByIdAndDelete(id.id)
  
      return res
        .status(200)
        .json({ 
            'message': 'Deleted Successfully'
         });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error during deleting" });
    }
  };