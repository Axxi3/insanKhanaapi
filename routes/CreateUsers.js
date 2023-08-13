const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/user');
const cors = require('cors');  
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret="myguitar'snameistrisha@123"
router.post(
  "/createuser",cors(),
  body('name').notEmpty(),
  body('email', 'Not a valid email').isEmail(),
  body('pass', 'Not a valid password').isLength({ min: 6, max: 15 }),
  async (req, res) => {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).send({ errors: result.array() });
    }  


    const saltRounds = await bcrypt.genSalt(10);  
    let secPass=await bcrypt.hash(req.body.pass,saltRounds)


    try {
      await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email,  
        pfp: req.body.pfp,
        location: req.body.location
      });
      res.json({ success: true });
    } catch (error) {
      console.log("-----", error);
      res.json({ success: false });
    }
  }
);  


router.post(
    "/loginuser",cors(),async (req, res) => {
        let email=req.body.email
        try {
      let exist=  await User.findOne({email})  
      if(!exist) { 
        return res.status(400).send({ errors: "This email doesn't exists, try logging in" });
      }   

      const pwsCompare = bcrypt.compare(req.body.pass,exist.password)

      if(pwsCompare) {   
        const data={ 
          user: { 
            id:exist.id
          }
        }   
        const auth=jwt.sign(data,jwtSecret)
        return res.json({success:true,auth:auth})   
       
      } else { 
        return res.status(400).send({ errors: "Password is wrong" });
      }
        res.json({ success: true });
      } catch (error) {
        console.log("-----", error);
        res.json({ success: false });
      }
    }
  );
   
router.post("/userexist",cors(),async(req,res)=> { 
  let email=req.body.email 
  try { 
    let exist =await User.findOne({email})  
    if(exist) { 
      return res.json({success:true})
    }    
    else { 
      res.json({ success: false });
    }
  }  catch (error) { 
    console.log("----" , error) 
    res.json({success:false})
  }
})

module.exports = router;
