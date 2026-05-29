const jwt =
require("jsonwebtoken");

const bcrypt =
require("bcryptjs");

const express =
require("express");

const router =
express.Router();

const User =
require("../models/User");

/* SIGNUP API */

router.post("/signup", async(req,res)=>{

  try{

    const {
      username,
      email,
      password
    } = req.body;

    const hashedPassword =
    await bcrypt.hash(password,10);

    const newUser = new User({

      username,

      email,

      password:hashedPassword

    });

    await newUser.save();

    res.json({

      message:
      "User Registered Successfully"

    });

  }

  catch(error){

    res.json({
      error:error.message
    });

  }

});

/* LOGIN API */

router.post("/login", async(req,res)=>{

  try{

    const {
      email,
      password
    } = req.body;

    const user =
    await User.findOne({ email });

    /* USER NOT FOUND */

    if(!user){

      return res.json({

        message:"User Not Found"

      });

    }

    /* CHECK PASSWORD */

    const isMatch =
    await bcrypt.compare(

      password,

      user.password

    );

    if(!isMatch){

      return res.json({

        message:"Invalid Password"

      });

    }

    /* CREATE JWT TOKEN */

    const token = jwt.sign(

      {
        id:user._id
      },

      "secretkey",

      {
        expiresIn:"1d"
      }

    );

    /* SUCCESS RESPONSE */

    res.json({

      message:"Login Successful",

      token,

      user

    });

  }

  catch(error){

    res.json({

      error:error.message

    });

  }

});

module.exports = router;