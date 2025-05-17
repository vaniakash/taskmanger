const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const { syncModels } = require('./models');

// Load env vars
dotenv.config();

// Route files
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/tasks');
const adminRoutes = require('./routes/admin');

// Initialize express
const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: ['https://berkysan.shop', 'http://localhost:3000'],
  credentials: true
}));

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/admin', adminRoutes);

// Root route
app.get('/', (req, res) => {
  res.send('TaskTreker API is running...');
});

// Connect to database and sync models
const initializeDatabase = async () => {
  try {
    // Connect to MySQL
    await connectDB();
    
    // Sync models with database
    await syncModels();
    
    console.log('Database initialization complete');
  } catch (error) {
    console.error(`Database initialization error: ${error.message}`);
    process.exit(1);
  }
};

// Initialize database
initializeDatabase();

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 