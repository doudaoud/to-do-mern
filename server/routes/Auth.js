const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { users, validationDataRegister } = require("../models/user");
const VerifCode = require("../models/verifCode");
const { createMail, senMail } = require("../utils/sendMailverif");

/**
 * @method  POST
 * @route /api/register
 * @description Envoie un code de vérification par email et stocke les données temporairement en DB
 * @access public
 */
router.post(
  "/register",
  asyncHandler(async (req, res) => {
    const { error } = validationDataRegister(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const existingUser = await users.findOne({ Email: req.body.Email });
    if (existingUser) {
      return res.status(400).json({ message: "Ce mail est déjà utilisé." });
    }

    // Supprimer tout code précédent pour cet email (renvoi de code)
    await VerifCode.deleteMany({ email: req.body.Email });

    const code = Math.floor(100000 + Math.random() * 900000);
    const mail = createMail(req.body.Email, code);
    const response = await senMail(mail);

    if (response.status === 200) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      // Stocker le code et les données côté serveur (expire en 15 min automatiquement)
      await VerifCode.create({
        email: req.body.Email,
        code,
        nomComplet: req.body.nomComplet,
        password: hashedPassword,
      });

      return res.status(200).json({ message: "Code de vérification envoyé." });
    } else {
      return res.status(500).json({ message: `Erreur envoi email : ${response.message}` });
    }
  }),
);

/**
 * @method  POST
 * @route /api/verify
 * @description Vérifie le code OTP et crée le compte utilisateur
 * @access public
 */
router.post(
  "/verify",
  asyncHandler(async (req, res) => {
    const { email, code } = req.body;

    if (!email || !code) {
      return res.status(400).json({ message: "Email et code requis." });
    }

    const pendingUser = await VerifCode.findOne({ email });

    if (!pendingUser) {
      return res.status(400).json({
        message: "Code invalide ou expiré. Veuillez recommencer l'inscription.",
      });
    }

    if (Number(code) !== pendingUser.code) {
      return res.status(400).json({ message: "Code incorrect." });
    }

    // Code valide : créer le compte
    const newUser = new users({
      nomComplet: pendingUser.nomComplet,
      Email: pendingUser.email,
      password: pendingUser.password,
    });
    await newUser.save();

    // Supprimer le code de vérification utilisé
    await VerifCode.deleteOne({ email });

    res.status(201).json({ message: "Compte créé avec succès." });
  }),
);

/**
 * @method  POST
 * @route /api/login
 * @description Authentification utilisateur
 * @access public
 */
router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await users.findOne({ Email: email });

    if (!user) {
      return res.status(400).json({ message: "Utilisateur non trouvé." });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user._id, email: user.Email },
      process.env.JWT_SECRET,
      { expiresIn: "30d" },
    );

    const dataUser = { ...user._doc };
    delete dataUser.password;

    res.status(200).json({
      message: "Connexion réussie",
      token,
      dataUser,
    });
  }),
);

module.exports = router;
