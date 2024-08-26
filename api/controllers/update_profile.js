const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User}  = require("../models/user_models");

exports.updateProfile = async (request, res) => {
  try {
    const { user_id, password, full_name, location, email } = request.body;

    // Check If The Input Fields are Valid
    if ( !password || !full_name || !location ||  !email) {
      return res
        .status(400)
        .json({ message: "Please Input your Correct Data" });
    }






    // Hash The User's Password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Check If User Exists In The Database
    const existingUser = await User.findByIdAndUpdate( user_id , 
        {
            email: email,
            location: location,
            full_name:full_name,
            password: hashedPassword,

        }
    );

    if (!existingUser) {
      return res.status(404).json({ message: "User Not Exists" });
    }

    return res
      .status(201)
      .json({ message: "User Updated Successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "Error updating user" });
  }
};
