const mongoose = require('mongoose');
const joi = require('joi');
const schema = new mongoose.Schema({
    nomComplet: {
        type: String,
        required: true,
        Max: 30,
        Min: 8,

    },
    Email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        default: "user",
        type: String,
    }
})

const users = mongoose.model("users", schema);

const validationDataRegister = (data) => {
    const shema = joi.object({
        nomComple: joi.string().min(8).max(30).required(),
        Email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required()
    })
    return shema.validate(data);
}
module.exports = {users , validationDataRegister};