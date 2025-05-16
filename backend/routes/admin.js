const express = require('express');
const router = express.Router();
const { User, Task } = require('../models');
const { protect } = require('../middleware/authMiddleware');
const { protectAdmin } = require('../middleware/adminMiddleware');

// Apply both middlewares
const adminRoute = [protect, protectAdmin];

// @route   GET /api/admin/users
// @desc    Get all users
// @access  Admin
router.get('/users', adminRoute, async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['createdAt', 'DESC']]
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/admin/users/:id
// @desc    Delete a user
// @access  Admin
router.delete('/users/:id', adminRoute, async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Don't allow admins to delete themselves
    if (user.id === req.user.id) {
      return res.status(400).json({ message: 'Cannot delete your own admin account' });
    }
    
    // Delete all tasks associated with this user
    await Task.destroy({ where: { userId: user.id } });
    
    // Delete the user
    await user.destroy();
    
    res.json({ message: 'User and all associated tasks removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   PUT /api/admin/users/:id
// @desc    Update user (including admin status)
// @access  Admin
router.put('/users/:id', adminRoute, async (req, res) => {
  try {
    const { name, email, isAdmin } = req.body;
    
    const user = await User.findByPk(req.params.id);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update user fields
    if (name) user.name = name;
    if (email) user.email = email;
    if (isAdmin !== undefined) user.isAdmin = isAdmin;
    
    await user.save();
    
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      createdAt: user.createdAt
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   GET /api/admin/tasks
// @desc    Get all tasks from all users
// @access  Admin
router.get('/tasks', adminRoute, async (req, res) => {
  try {
    const tasks = await Task.findAll({
      include: [{ 
        model: User,
        attributes: ['name', 'email']
      }],
      order: [['createdAt', 'DESC']]
    });
    
    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// @route   DELETE /api/admin/tasks/:id
// @desc    Delete any task as admin
// @access  Admin
router.delete('/tasks/:id', adminRoute, async (req, res) => {
  try {
    const task = await Task.findByPk(req.params.id);
    
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    
    await task.destroy();
    
    res.json({ message: 'Task removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router; 