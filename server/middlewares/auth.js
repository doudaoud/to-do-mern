const jwt = require("jsonwebtoken");
require("dotenv").config();

/**
 * Middleware qui vérifie le token JWT dans le header Authorization.
 * Protège les routes privées côté serveur.
 */
function verifyToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  // format attendu : "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Accès refusé. Token manquant." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, email }
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide ou expiré." });
  }
}

module.exports =  verifyToken ;
