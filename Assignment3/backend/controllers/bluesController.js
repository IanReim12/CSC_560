//this file creats all of the CRUD aspects to our application
const asyncHandler = require("express-async-handler");
//importing the blues model and storing it in the variable Blues
const BluesD = require("../model/bluesModel");
const BluesO = require("../model/bluesForwardModel");
const { raw } = require("body-parser");

//req and res are given by Express framework,  req object represents http request, res is for responses
//the async keyword indicates that this is an asynchronous function and thus makes it return a promise
//the await keyword is used to wait for a promise, can only be used in async functions
const getBlues = asyncHandler(async (req, res) => {
  //creates new variable blues,
  const blues = await BluesO.find();
  res.status(200).json(blues);
});
const addPlayer = asyncHandler(async (req, res) => {
  const player = await BluesO.create({
    name: "Brett Hull",
    number: "9",
    position: "RW",
  });
  console.log(player);

  res.status(200).json(player);
});
const deletePlayer = asyncHandler(async (req, res) => {
  const player = await BluesO.findById(req.params.id);
  if (!player) {
    res.status(400);
    throw new Error("Player not found");
  }
  await player.remove();
  res.status(200).json("deleted");
});
const editPlayer = asyncHandler(async (req, res) => {
  const player = await BluesO.findById(req.params.id);
  if (!player) {
    res.status(400);
    throw new Error("Player not found");
  }
  const updatedPlayer = await BluesO.findByIdAndUpdate(
    req.params.id,
    { name: "test" },
    {
      new: true,
    }
  );
  res.status(200).json(updatedPlayer);
});

const findHighestScorer = asyncHandler(async (req, res) => {
  const greatest = await BluesO.find().sort("-reg22Goals").limit(1);
  res.status(200).json(greatest);
});

const findHighestDScorer = asyncHandler(async (req, res) => {
  const greatest = await BluesD.find().sort("-reg22Goals").limit(1);
  res.status(200).json(greatest);
});

const findHighestPim = asyncHandler(async (req, res) => {
  const greatest = await BluesO.find().sort("-reg22PIM").limit(3);
  res.status(200).json(greatest);
});

const findHighestPAssists = asyncHandler(async (req, res) => {
  const greatest = await BluesO.find().sort("-post22Assists").limit(3);
  res.status(200).json(greatest);
});
module.exports = {
  getBlues,
  addPlayer,
  deletePlayer,
  editPlayer,
  findHighestScorer,
  findHighestDScorer,
  findHighestPim,
  findHighestPAssists,
};
