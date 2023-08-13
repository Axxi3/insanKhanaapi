const mongoose =require('mongoose')   
const {Schema}= mongoose;  
const userData =new Schema(  { 


    name:{ 
        type:String, 
       required:true
    } ,   
    location:{ 
        type:String, 
        required:true
    }, 
    email: { 
        type:String, 
       required:true
    },  
    password: { 
        type:String, 
       required:true
    } ,   
    pfp: { 
        type:String, 
       required:true
    },
    date: { 
        type:Date, 
        default:Date.now
    }, 
    Cart:{ 
        type:Object, 
        default:[]
    }
}
)


module.exports=mongoose.model ('user', userData)