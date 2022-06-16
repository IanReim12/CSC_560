//this file takes the CRUD logic created in the bluesController and applies it to the router, enabling the ability to handle different requests

const express = require("express");
//creates a new Router object called router, will handle http requests
const router = express.Router();
//import CRUD functionalty from the bluesController file, CRUD actions are imported from controller and called against the router object we created above
const {
  getBlues,
  addPlayer,
  deletePlayer,
  editPlayer,
  findHighestScorer,
  findHighestDScorer,
  findHighestPim,
  findHighestPAssists,
} = require("../controllers/bluesController");

router.get("/", getBlues);
router.get("/Oscorer", findHighestScorer);
router.get("/Dscorer", findHighestDScorer);
router.get("/Opim", findHighestPim);
router.get("/OPAssists", findHighestPAssists);

router.post("/", addPlayer);

router.put("/:id", editPlayer);

router.delete("/:id", deletePlayer);

module.exports = router;
