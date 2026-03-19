const mongoose = require("mongoose");
const Joi = require("joi");

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 50,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
    maxlength: 500,
  },
  categorie: {
    type: String,
    required: true,
  },
  priorite: {
    type: String,
    required: true,
  },
  deadline: {
    type: Date,
    required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
  }
});
const tache = mongoose.model("tache", schema);
const validationDataTache = (data) => { 
  const chema = Joi.object({
    title: Joi.string().min(10).max(50).required(),
    description: Joi.string().min(10).max(500).required(),
    categorie: Joi.string().required(),
    priorite: Joi.string().required(),
    deadline: Joi.date().required(),

  })
  return chema.validate(data);
}
module.exports = {tache , validationDataTache };