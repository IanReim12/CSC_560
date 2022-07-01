//This document is starting our express app, and setting up the express router
//This document is also initializing cors and body parser
//This document is also used to create a connection to our mongodb database
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import issue from "./models/issue.js";
import connectDB from "./config/db.js";

connectDB();
const app = express();
const router = express.Router();
app.use(cors());
app.use(express.json()); //add middleware to our app
app.use(express.urlencoded({ extended: false }));

const port = "4000";
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Database connected");
});

app.use("/api", router); //connects router to default url, change / if you want to change default path

//Single use routing syle for get request - returns all instances of issues
router.route("/").get(async (req, res) => {
  const issues = await issue.find();
  console.log(issues);
  res.status(200).json(issues);
});

//Get single issue by providing an id
router.route("/api/:id").get((req, res) => {
  issue.findById(req.params.id, (err, issue) => {
    if (err) {
      console.log(err);
    } else {
      res.json(issue);
    }
  });
});

//Add issue to the database
router.route("/api/add").post(async (req, res) => {
  let newIssue = await new issue(req.body);
  console.log(newIssue);
  newIssue
    .save()
    .then((newIssue) => {
      res.status(200).json({ newIssue: "Added Successfully" });
    })
    .catch((err) => {
      res.status(400).send("Failed to create");
    });
});

//update existing issues
router.route("/api/update/:id").post((req, res) => {
  issue.findById(req.params.id, (err, issue) => {
    if (!issue) {
      return next(new Error("Could not load doc"));
    } else {
      issue.title = req.body.title;
      issue.responsible = req.body.responsible;
      issue.description = req.body.description;
      issue.severity = req.body.severity;
      issue.status = req.body.status;

      issue
        .save()
        .then((issue) => {
          res.json("Update done");
        })
        .catch((err) => {
          res.status(400).send("Update Failed");
        });
    }
  });
});

router.route("/api/delete/:id").delete((req, res) => {
  issue.findByIdAndRemove({ _id: req.params.id }, (err, issue) => {
    if (err) {
      res.json(err);
    } else {
      res.json("Deleted");
    }
  });
});
app.listen(port, () => console.log(`Express server running on port ${port}`));
