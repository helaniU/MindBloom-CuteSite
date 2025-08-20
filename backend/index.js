const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')    
const MindBloomModel = require('./models/Mindbloom')

const app = express()
app.use(express.json())
app.use(cors())

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/MindBloom";
mongoose.connect(MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

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

app.post('/register', (req, res) =>{
    MindBloomModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})

app.listen(3001, () => {
    console.log("Server is running on port 3001")
})