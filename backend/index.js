const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')    
const MindBloomModel = require('./models/Mindbloom')

const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://nextjs929306:MO3NZnHs1gmpgydw@cluster0.goghawl.mongodb.net/MindBloom")

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