const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },

    address: String,

    email:{
        type: String,
    }
})

module.exports = mongoose.model("Users", UserSchema);