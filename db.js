const mongoose = require('mongoose');
const { search } = require('./routes/DisplayData');
const MongoUri = "mongodb+srv://Literallyraj:Trisha69@cluster0.vbotgg7.mongodb.net/Fooddelivery?retryWrites=true&w=majority";   


// const search = async (query)=>{ 
//     await collection.find({ $text: { $search: {query} } }).toArray();   
    
// }

const connectToMongoDB = async () => {   

    try {
        await mongoose.connect(MongoUri);
        console.log("Connected successfully");  
        const FoodItem = mongoose.model("FoodItem", new mongoose.Schema({}), "Food_items");     
        const Foodcategory = mongoose.model("FoodCategory", new mongoose.Schema({}), "Food_category");     
        const users = mongoose.model("users", new mongoose.Schema({}), "users");   
        console.log("Connected successfully");    
        global.Users=await users.find({}).exec();
        global.category=await Foodcategory.find({}).exec();   
         global.data = await FoodItem.find({}).exec();     

        // global.food_item=data;    
        
        // console.log(global.food_item)
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports =  connectToMongoDB ;  

