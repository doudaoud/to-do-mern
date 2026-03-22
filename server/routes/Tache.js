const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { tache, validationDataTache } = require("../models/tache");
const verifyToken = require("../middlewares/auth");

/**
 * @Method  POST
 * @description cree une tache a faire
 * @route /api/tache/create
 * @access private (requiert une authentification)
 * @route /api/tache/create/:id
 */
router.post(
  "/create/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    const { error } = validationDataTache(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const user = req.params.id;
    console.log(user);
    const { title, description, categorie, priorite, deadline } = req.body;

    const newTache = new tache({
      title,
      description,
      categorie,
      priorite,
      deadline,
      user,
    });
    await newTache.save();
    res.status(201).json({ message: "Tâche créée avec succès." });
  }),
);
/**
 * @Method  GET
 * @description get les  taches a faire de ce utilisateur
 * @route /api/tache/get/:id
 * @access private (requiert une authentification)
 * @route /api/tache/get/:id
 */
router.get(
  "/get/:id",
  asyncHandler(async (req, res) => {
    const id = req.params.id;

    const taches = await tache.find({ user: id });
    res.status(200).json({ taches, message: "taches recupirer avec succes" });
  }),
);
/**
 * @Method  DELETE
 * @description supprimer une tache
 * @route /api/tache/delete/:id
 * @access private
 */
router.delete(
  "/delete/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    await tache.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Tâche supprimée avec succès" });
  }),
);
/**
 * @Method  patch
 * @description update etat de la tache
 * @route /api/tache/patch
 * @access private (requiert une authentification)
 */

router.patch(
  "/patch",
  asyncHandler(async (req, res) => {
   
  }),
);

module.exports = router;
