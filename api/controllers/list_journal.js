const {User, Journal}  = require("../models/user_models");
const jwt = require("jsonwebtoken");

  
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