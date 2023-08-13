const express = require('express')
const app = express()
const port = 5000
const mongoDB=require("./db")    
const cors = require('cors');
// app.use((req,res,next)=> { 
//   res.setHeader("Access-Control-Allow-Origin","http://localhost:3000") 
//   res.header( 
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Ture, Accept"
//   )  
//   next()
// })
app.use(cors());
mongoDB()

app.use(express.json())  

app.use(require("./routes/CreateUsers"))     
app.use(require("./routes/DisplayData"))   
app.use(require("./routes/Complains"))    
app.use(require("./routes/Userfunctionality"))
app.get('/', (req, res) => {
  res.send('Hello World!')
})    
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})   
