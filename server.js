const express = require("express");

const app = express(); // Initialize Express application
const port = 3000; // Define the port number
const db = require("./db"); // Import the database connection (db.js)

const personRoute = require("./routes/personRoutes");
const menuRoute = require("./routes/menuRoutes");

//middleware that is used to parse the data that comes from frontend to the required form such as json
const bodyparser = require("body-parser");
app.use(bodyparser.json()); //req.body store

app.use("/person", personRoute);
//  app.use("/",menuRoute)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
