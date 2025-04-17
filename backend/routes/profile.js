const express = require('express');
const router = express.Router();
const User = require('../models/User');
const auth = require('../middleware/auth');

router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ fullname: user.fullname, email: user.email });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
router.put('/profile', auth, async (req, res) => {
    const { fullname, email } = req.body;
  
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.fullname = fullname || user.fullname;
      user.email = email || user.email;
  
      await user.save();
      res.json({ message: 'Profile updated successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Server error' });
    }
  });
module.exports = router;