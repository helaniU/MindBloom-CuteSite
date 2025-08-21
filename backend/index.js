const express = require('express')     //framework for building web servers in Node.js
const mongoose = require('mongoose')    //used to connect & work with mongodb
const cors = require('cors')        //allows backend to be accessed from different frontend domains
const MindBloomModel = require('./models/Mindbloom')    // Importing our user model (schema) from models folder

//creating the express app
const app = express()
app.use(express.json()) // Middleware: allows the server to read JSON data from requests (req.body)
app.use(cors())         //allows cross-origin requests (React frontend can talk to backend)


//connecting mongodb using mongoose
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/MindBloom";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));


  //login API
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    MindBloomModel.findOne({ email: email })
    .then(user => {
        if (user) {
           if (user.password === password){
                res.json("Successful Login")
           }else {
                res.json("Invalid Password")
           }
        } else {
            res.json("User not exist")
        }
    })
})

//register API
app.post('/register', (req, res) =>{
    MindBloomModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

//start the server
app.listen(3001, () => {
    console.log("Server is running on port 3001")
})