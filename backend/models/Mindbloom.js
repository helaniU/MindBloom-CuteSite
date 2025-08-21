const mongoose = require('mongoose')

// Defining the schema (structure) for the "users" collection
const MindBloomSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
})

// Creating a model based on the schema
const MindBloomModel = mongoose.model("users", MindBloomSchema)

// Exporting the model so it can be used in other files 
module.exports = MindBloomModel