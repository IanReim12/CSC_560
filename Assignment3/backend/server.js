//this file creates a new express application

const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");

connectDB();
const app = express();
app.use(express.json()); //add middleware to our app
app.use(express.urlencoded({ extended: false })); //add middleware to our app
app.use("/api/blues", require("./routes/routes"));

app.listen(port, () => console.log(`Server started on port ${port}`));
