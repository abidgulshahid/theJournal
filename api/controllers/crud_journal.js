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

      if (!text || text == "") {
        return res.status(400).json({message: "Empty Thoughts cannot be submitted!."})
      }

  
      if (!user) {
        return res.status(401).json({ message: "Invalid Access Token" });
      }


      // Sending APi Request to External Service for Grammar Checking

      try {
        // Getting General Statistics
        const response = await axios.post(
            'https://api.sapling.ai/api/v1/statistics',
            {
                "key": 'OLICF8JLP2GQE9JYXJ4AMQMSEYTBZ3PU',
                text,
            },
        );

        // Getting Sentence Tone


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
    } catch (err) {
        const { msg } = err.response.data;
        console.log({err: msg});

    }


    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error during login" });
    }
  };