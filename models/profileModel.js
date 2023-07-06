const mongoose = require("mongoose")

const profileSchema = new mongoose.Schema({
    name:{type: String, requried: true},
    age: {type: String, requried: true},
    height: {type: String, requried: true},
})

const ProfileModel = mongoose.model('profiles', profileSchema)

module.exports = ProfileModel;