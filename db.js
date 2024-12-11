const mongoose = require("mongoose");

// Define the MongoDB connection URL
// const url = "mongodb://127.0.0.1:27017/Hotels"; // Use 127.0.0.1 instead of localhost
require("dotenv").config();

const url = process.env.DB_URL;

mongoose.connect(url);

// Get the connection instance
const db = mongoose.connection;

// Handle additional connection events (optional but helpful)
db.on("connected", () => {
  console.log("Mongoose connected to MongoDB server");
});

db.on("disconnected", () => {
  console.log("Mongoose disconnected from MongoDB server");
});

db.on("error", (err) => {
  console.log("MongoDB connection error:", err);
});

// Export the database connection
module.exports = db;
