const express = require('express');
const cors = require('cors');
const userRoutes=require("./routes/userRoutes");
const linkRoutes=require("./routes/linkRoutes");
const { connectDB } = require('./config/db');
require('dotenv').config();
const app = express();


// Middleware
app.use(cors({
    origin: 'https://linkspin.vercel.app',
    credentials: true,
  }));
app.use(express.json());
app.use("/user",userRoutes);
app.use("/",linkRoutes)

// DATABASE CONNECTION
connectDB();

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the Link Analytics Dashboard API');
});


// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
