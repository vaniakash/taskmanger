const User = require('./User');
const Task = require('./Task');
const { sequelize } = require('../config/db');

// Define associations
Task.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Task, { foreignKey: 'userId' });

// Function to sync all models with the database
const syncModels = async () => {
  try {
    // Create tables if they don't exist
    await sequelize.sync();
    console.log('Database models synchronized');
  } catch (error) {
    console.error('Error synchronizing models:', error);
    process.exit(1);
  }
};

module.exports = {
  User,
  Task,
  syncModels
}; 