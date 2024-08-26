const {User, Journal}  = require("../models/user_models");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const axios = require('axios'); 


exports.add = async (req, res) => {
    try {
    const { access_token } = req.body
    const {text} = req.body

      const decoded = jwt.decode(access_token);
      const userId = decoded.userId

      const user = await User.findById( userId )
      const data = ''

      if (!text || text == "") {
        return res.status(400).json({message: "Empty Thoughts cannot be submitted!."})
      }

  
      if (!user) {
        return res.status(401).json({ message: "Invalid Access Token" });
      }


      // Sending APi Request to External Service for Grammar Checking

      try {
        // Getting General Statistics
        console.log("Getting General Statistics")
        const response = await axios.post(
            'https://api.sapling.ai/api/v1/statistics',
            {
                "key": 'OLICF8JLP2GQE9JYXJ4AMQMSEYTBZ3PU',
                text,
            },
        );
        console.log(response.data, 'data')

        // Getting Sentence Tone

        console.log("Getting Sentence Tone ")

        const tone = await axios.post(
          'https://api.sapling.ai/api/v1/tone',
          {
              key: 'OLICF8JLP2GQE9JYXJ4AMQMSEYTBZ3PU',
              text,
          },
      );
        overall = tone.data.overall[0][2]



        if (response.status == 200){
            readability = response.data.readability
            text_standard = response.data.readability_scores.text_standard


            const newJournal = new Journal({
              text: text,
              userID: userId,
              readability: readability,
              tone: overall,
              

            });
        
            await newJournal.save();


      return res
      .status(200)
      .json({ 
          "text": text, 
          'readability': readability, 
          'text_standard': text_standard

          
       });

        }
        console.log({status});
        console.log(JSON.stringify(data, null, 4));
    } catch (err) {
        const { msg } = err.response.data;
        console.log({err: msg});

    }



      // End of External Service


  
    
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error during login" });
    }
  };
  
exports.list_journel = async (req, res) => {
    try {
    const { access_token } = req.body
    
      const decoded = jwt.decode(access_token);
      const customer_id = decoded.userId
      const user = await User.findById( customer_id )

  
      if (!user) {
        return res.status(401).json({ message: "Invalid Access Token" });
      }
    

      const get_journal = await Journal.find({userID:customer_id})
      console.log(get_journal, 'get')
  
      return res
        .status(200)
        .json({ 
            "text": get_journal, 
            'message': 'Login Successfully'
         });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error during login" });
    }
  };

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
      return res.status(500).json({ message: "Error during login" });
    }
  };