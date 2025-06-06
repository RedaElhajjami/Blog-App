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
//Recuperer les post de user
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});
router.post('/', auth, upload.single('image'), async (req, res) => {
    try {
        console.log("Request Body:", req.body); // Log the request body
        console.log("Uploaded File:", req.file); // Log the uploaded file details

        const { title, content, category } = req.body;
        if (!title || !content || !category) {
            return res.status(400).json({ message: 'All fields are required' });
        }

        const post = new Post({
            title,
            content,
            category,
            image: req.file ? `uploads/${req.file.filename}` : null, // Save the relative file path
            user: req.user.id,
        });
        await post.save();
        res.json(post);
    } catch (error) {
        console.error("Error in POST /posts:", error); // Log the error
        res.status(500).json({ message: 'Server error' });
    }
});
// filepath: c:\Users\redaa\Desktop\Blog-App\backend\routes\post.js
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (error) {
        console.error("Error fetching post:", error);
        res.status(500).json({ message: 'Server error' });
    }
});
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
router.get('/user/:userId', async (req, res) => {
    try {
        const posts = await Post.find({ user: req.params.userId });
        res.json(posts);
    } catch (error) {
        console.error("Error fetching user's posts:", error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;