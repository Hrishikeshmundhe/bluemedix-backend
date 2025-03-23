const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ MongoDB Connection Error:", err));

// Default Route (Check if Server is Running)
app.get('/', (req, res) => {
  res.send('🚀 API is running...');
});

// Import Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes'); // ✅ Added auth routes

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes); // ✅ Added auth routes

// Error Handling Middleware
app.use((req, res, next) => {
  res.status(404).json({ message: "Route Not Found" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
