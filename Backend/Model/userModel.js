const mongoose = require("mongoose");

//schema
const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    role:{
        type: String,
        required: true
    },
});

//model
const DbUser = mongoose.model("user", userSchema);

module.exports = DbUser;