const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const jwt=require('jsonwebtoken');
const fetchuser = require("../middleware/fetchUser");

const JWT_SCERET = "JeevanKa$Sceret";
router.post(
  "/signup",
  [
    body("name", "enter a valid name").isLength({ min: 5 }),
    body("email", "enter valid email").isEmail(),
    body("password", "password must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const secPass = await bcrypt.hash(req.body.password, salt);
      const user =await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
      });
      const data={
        user:{
            id:user.id
        }
      }
      const authtoken = jwt.sign(data,JWT_SCERET);
      res.json({sucess:true,authtoken});
    } catch (err) {
      res.json({ sucess:false,error: "please enter unique value for email", msg: err.msg });
    }
    ;
  }
);

router.post(
    "/login",
    [
      body("email", "enter valid email").isEmail(),
      body("password", "password must be atleast 5 characters").isLength({
        min: 5,
      }),
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const {email,password} =req.body;
        let user =await User.findOne({email})
        if(!user){
            res.json({sucess:false,error:"please login with proper credentials"})
        }
        const validPass = await bcrypt.compare(password, user.password);
        if(!validPass){
            res.json({sucess:false,error:"please login with proper credentials"})
        }

        const data={
          user:{
              id:user.id
          }
        }
        const authtoken = jwt.sign(data,JWT_SCERET);
        res.json({sucess:true,authtoken});
      } catch (err) {
        console.log(err)
        res.json({ sucess:false,error: "Internal server error", msg: err.msg });
      }
      ;
    }
  );

  router.get(
    "/getuser",
    fetchuser,
    async (req, res) => {
        try {
        const id =req.user.id;
        let user =await User.findById(id).select("-password")
        if(!user){
            res.json({error:"please login with proper credentials"})
        }
        res.json({user});
      } catch (err) {
        console.log(err)
        res.json({ error: "Internal server error", msg: err.msg });
      }
      ;
    }
  );

module.exports = router;
