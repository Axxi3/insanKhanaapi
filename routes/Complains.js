const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();  
const cors = require('cors');   
const User = require('../models/ComplainingUsers'); 

router.post( 
    "/postcomplain",cors(), 
    body("name").notEmpty(), 
    body("email","Not a valid email").isEmail(), 
    body("complain").notEmpty().isLength({min:10}), 
    async(req,res)=>{ 
       try {
        await User.create({ 
            name:req.body.name, 
            email:req.body.email, 
            complain:req.body.complain
        }) 
        res.json({success:true})
       } catch (error) {
        console.log("-----", error);
        res.json({ success: false });
       }
    }
)



module.exports = router;