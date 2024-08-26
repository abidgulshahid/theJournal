const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {User}  = require("../models/user_models");

exports.decrypt_password = async (req, res) => {
    try {
        const { access_token } = req.body
        const {password} = req.body

    
          const decoded = jwt.decode(access_token);
          const userId = decoded.userId
          const user = await User.findById( userId )
    
      
          if (!user) {
            return res.status(401).json({ message: "Invalid Access Token" });
          }
    
  
      // Compare Passwords
      const passwordMatch = await bcrypt.hash(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

 
        return res
        .status(200)
        .json({ 
          'message': 'Login Successfully'
          

         });
      

  
    
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error during login" });
    }
  };
  