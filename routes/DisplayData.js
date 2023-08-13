const express = require('express');
const router = express.Router();   
const connectToMongoDB = require('../db');
const cors = require('cors');  
const user = require('../models/user');
router.get("/getfood",(req,res)=>{ 
    try {  
        // This will set the global.food_item variable
        // console.log(global.data); 
        res.send([global.data])
    } catch (error) {
        console.log(error)  
        res.send("Server Error")
    }
})

router.get("/getcategory",(req,res)=>{ 
    try {  
        // This will set the global.food_item variable
        // console.log(global.category); 
        res.send([global.category])
    } catch (error) {
        console.log(error)  
        res.send("Server Error")
    }
})  


const mongoose = require('mongoose');

router.get("/search/:key", cors(), async (req, res) => {
    
    try {
      let data = await user.find({
        "$or": [
          {
            "_id": req.params.key, // Using the provided key directly
          },
        ],
      });
      res.send({success: true ,data});
    } catch (err) {
      res.status(400).send({success: false});  
      console.log(err)
    }
  });
  

  

module.exports= router