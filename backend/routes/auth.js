const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Inscription
router.post("/register", async (req, res) => {
  const { email, password, fullname } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = new User({ fullname, email, password: hashedPassword });
    console.log(user);
    await user.save();
    res.json({ message: "Utilisateur créé" });
  } catch (err) {
    res.status(400).json({ message: "Email déjà utilisé" });
  }
});

// Connexion
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Identifiants invalides" });
  }
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  res.json({ token });
});

module.exports = router;