const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const { tache, validationDataTache } = require("../models/tache");
const verifyToken = require("../middlewares/auth");
const mongoose = require('mongoose');

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
  verifyToken,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const taches = await tache.find({ user: id });
    res.status(200).json({ taches, message: "Tâches récupérées avec succès" });
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
  verifyToken,
  asyncHandler(async (req, res) => {
    const updates = req.body;
    
    if (!Array.isArray(updates)) {
      return res.status(400).json({ message: "Le corps de la requête doit être un tableau." });
    }

    const updatePromises = updates.map( async (item) => {
      return await tache.findByIdAndUpdate(item.id, { $set: { faite: item.faite } });
    });

    await Promise.all(updatePromises);
    res.status(200).json({ message: "Tâches mises à jour avec succès" });
  }),
);

/**
 * @Method  GET
 * @description statistiques des taches pour le dashboard
 * @route /api/tache/stats/:id
 * @access private
 */
router.get(
  "/stats/:id",
  verifyToken,
  asyncHandler(async (req, res) => {
    const id = req.params.id;
    const taches = await tache.find({ user: id });
    const now = new Date();

    const total = taches.length;
    const completed = taches.filter((t) => t.faite).length;
    const pending = taches.filter((t) => !t.faite).length;
    const overdue = taches.filter(
      (t) => !t.faite && new Date(t.deadline) < now,
    ).length;

    const categories = {};
    taches.forEach((t) => {
      categories[t.categorie] = (categories[t.categorie] || 0) + 1;
    });

    const priorities = { High: 0, Medium: 0, Low: 0 };
    taches.forEach((t) => {
      if (priorities[t.priorite] !== undefined) priorities[t.priorite]++;
    });

    const recent = [...taches]
      .sort((a, b) => new Date(b.deadline) - new Date(a.deadline))
      .slice(0, 5);

    res.status(200).json({ total, completed, pending, overdue, categories, priorities, recent });
  }),
);

module.exports = router;
