const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const auth = require('../middleware/auth');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb){
        cb(null, Date.now() + '-' + file.originalname)
    }
})
const upload = multer({ storage:storage });
//Recuperer les taches de user
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
//Ajouter une tache
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        const { title, content, category, image } = req.body; 
        if (!title || !content || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const post = new Post({
            title,
            content,
            category,
            image: req.file ? `./uploads/${req.file.filename}` : 'https://via.placeholder.com/150', // Default image if none provided
            user: req.user.id,
        });
        await post.save();
        res.json(post);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
//Supprimer une tache
router.delete('/:id', auth, async (req, res) => {
    try {
        const result = await Post.deleteOne({ _id: req.params.id, user: req.user.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Tache non trouvée ou non autorisée' });
        }
        res.json({ message: 'Tache supprimée avec succès' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error serveur lors de la suppression' });
    }
});
module.exports = router;