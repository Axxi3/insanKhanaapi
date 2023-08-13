const mongoose =require('mongoose')   
const {Schema}= mongoose;  
const Card=({ 
    name:{ 
        type:String, 
       required:true
    }, 
    number:{ 
        type:String,  
        required:true
    }, 
    type:{ 
        type:String, 
        required:true
    }, 
    id:{ 
        type:String, 
        required:true
    }
})   
module.exports=mongoose.model ('Card', Card)