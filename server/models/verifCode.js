const mongoose = require("mongoose");

const verifCodeSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  // données temporaires en attente de validation
  nomComplet: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  expiresAt: {
    type: Date,
    required: true,
    default: () => new Date(Date.now() + 15 * 60 * 1000), // expire dans 15 minutes
  },
});

// Suppression automatique du document quand expiresAt est passé
verifCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const VerifCode = mongoose.model("VerifCode", verifCodeSchema);

module.exports = VerifCode;
