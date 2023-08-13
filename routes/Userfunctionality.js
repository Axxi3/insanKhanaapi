const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();

const Card=require('../models/Card')
const Document = require('../models/user'); 
const cors = require('cors');     
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret="myguitar'snameistrisha@123";



router.get('/getuserinfo/:id', async (req, res) => {
    const id = req.params.id;
    try {
      const document = await Document.findById(id);
      if (!document) {
        res.status(404).json({ error: 'Document not found' });
      } else {
        res.json({success:true ,document});
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });  



  router.put("/updateuserinfo/:id",async (req,res)=>{ 
    const id=req.params.id;   
    const updatedData = req.body;

    try{ 
      const doc=await Document.findByIdAndUpdate(id,updatedData, { new: true }); 
      if (!doc) {
        res.status(404).json({ error: 'Document not found', success:false });
      } else { 
        res.json({success:true})
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })  


  router.post(
    "/addcard", cors(),
    body("number").notEmpty(),
    body("name").notEmpty(),
    body("id").notEmpty(),
    body("type").notEmpty(),
    async (req, res) => {
      const result = validationResult(req);
      if (!result.isEmpty()) {
        return res.status(400).send({ errors: result.array() });
      }
  
      try {
        await Card.create({
          name: req.body.name,
          number: req.body.number,
          id: req.body.id,
          type: req.body.type,
        });
        res.json({ success: true }); // Fixed typo here
      } catch (error) {
        console.log("-----", error);
        res.json({ success: false });
      }
    }
  );  

  router.get("/getcard/:id",cors(),async(req,res)=>{ 
    const id=req.params.id;   
    try{ 
      const doc = await Card.findOne({id:id})  
      if (!doc) {
        res.status(404).json({ error: 'Document not found', success:false });
      } else { 
        res.json({success:true,doc})  
      }
    }catch(error){ 
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  

  
  
  router.post("/changepassword/:id", async (req, res) => {
    const id = req.params.id;
  
    try {
      const doc = await Document.findOne({ _id: id });
  
      if (!doc) {
        return res.status(404).json({ error: 'Document not found', success: false });
      }
  
      // Compare the old password (input by the user) with the stored hashed password
      const isPasswordCorrect = await bcrypt.compare(req.body.CP, doc.password);
  
      if (isPasswordCorrect) {
        // Hash the new password before updating
        const saltRounds = await bcrypt.genSalt(10);
        const newHashedPassword = await bcrypt.hash(req.body.password, saltRounds);
  
        // Update the password in the document
        const updatedDoc = await Document.findOneAndUpdate(
          { _id: id },
          { $set: { password: newHashedPassword } },
          { new: true }
        );
  
        if (!updatedDoc) {
          return res.status(404).json({ error: 'Document not found', success: false });
        } else {
          return res.json({ success: true, alert:"Password has been changed"});
        }
      } else {
        return res.json({ success: false, alert: "Incorrect Password" });
      }
    } catch (error) {
      console.log("Error:", error);
      res.json({ success: false });
    }
  });
  
  module.exports = router;
  
module.exports = router;
