const mongoose = require('mongoose');
const joi = require('joi');

const schema = new mongoose.Schema({
    nomComplet: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
    },
    Email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        default: "user",
    }
});

const users = mongoose.model("users", schema);

const validationDataRegister = (data) => {
    const schema = joi.object({
        nomComplet: joi.string().min(3).max(50).required(),
        Email: joi.string().email().required(),
        password: joi.string().min(8).max(30).required(),
    });
    return schema.validate(data);
};

module.exports = { users, validationDataRegister };