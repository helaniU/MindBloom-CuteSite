const mongoose = require('mongoose')

const MindBloomSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

const MindBloomModel = mongoose.model("users", MindBloomSchema)
module.exports = MindBloomModel