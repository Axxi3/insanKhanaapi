const mongoose =require('mongoose')   
const {Schema}= mongoose;   
const Addtocart=({ 
    id:{ 
        type:String, 
        required:true
    }
})

module.exports=mongoose.model ('Addtocart', Addtocart)