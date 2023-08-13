const mongoose =require('mongoose')   
const {Schema}= mongoose;  
const complaininguserData=({ 
    name:{ 
        type:String, 
       required:true
    } , 
    email:{ 
        type:String, 
        required:true
    } , 
    complain:{ 
        type:String, 
        required:true
    },
    date: { 
        type:Date, 
        default:Date.now
    }
})


module.exports=mongoose.model ('ComplainingUsers', complaininguserData)