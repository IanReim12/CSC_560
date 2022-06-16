//This File - creates a model of a bluesPlayer object to be added to the blues players MongoDB
//import mongoose
const mongoose = require("mongoose");
//new mongoose schema for a blues player
const bluesSchema = mongoose.Schema({
  name: String,
  number: String,
  position: String,
  handedness: String,
  reg22Points: String,
  reg22Gaols: String,
  reg22Assists: String,
  reg22PlusMinus: String,
  reg22PPG: String,
  reg22OTG: String,
  reg22PIM: String,
  reg22GP: String,
  post22Points: String,
  post22Goals: String,
  post22Assists: String,
  post22PlusMinus: String,
  post22PPG: String,
  post22OTG: String,
  post22PIM: String,
  post22GP: String,
  CareerPoints: String,
  CareerGoals: String,
  CareerAssists: String,
});

//export as a model - a model is a class in which we construct a document
//Our model will constuct Blues documents with all the properties held in bluesSchema
module.exports = mongoose.model("BluesD", bluesSchema, "bluesDefenceman");
