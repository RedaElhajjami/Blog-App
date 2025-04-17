const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

const mongoURL = process.env.MONGO_URL;
if (!mongoURL) {
  console.error("MongoDB URL is undefined. Check your environment variables.");
  process.exit(1);
}

mongoose
  .connect(mongoURL)
  .then(() => console.log("MongoDB connecté"))
  .catch((err) => console.log(err));

// Ajouter les routes
const postRoutes = require("./routes/post");
const authRoutes = require('./routes/auth');
const profileRoutes = require('./routes/profile');
const path = require('path');

app.use("/api/posts", postRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/api', profileRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`));