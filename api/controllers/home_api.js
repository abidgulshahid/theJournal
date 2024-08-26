const {User}  = require("../models/user_models");
const jwt = require("jsonwebtoken");


exports.home_api = async (req, res) => {
    try {
    const { access_token } = req.body
    const {username} = req.body

      const decoded = jwt.decode(access_token);
      const userId = decoded.userId
      const user = await User.findById( userId )

  
      if (!user) {
        return res.status(401).json({ message: "Invalid Access Token" });
      }

  
      return res
        .status(200)
        .json({ 
            "data": user, 
            'username': user.username,

          'message': 'Login Successfully'
          

         });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: "Error during login" });
    }
  };
  