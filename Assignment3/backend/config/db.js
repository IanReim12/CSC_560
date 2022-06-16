const client = require("express-stormpath/lib/client");
const mongoose = require("mongoose");
const bluesSchema = require("../model/bluesModel");
const url = "mongodb://127.0.0.1:27017/BluesPlayers_MGSHDB";
const { MongoClient } = require("mongodb");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(url);
    // const conn = await new MongoClient(url);

    // conn.connect();
    console.log(`MongoDB Connected: ${conn.connection.host}`);

    // await listDatabases(conn);
    // await listCollections(conn);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = connectDB;

// async function listCollections(conn) {
//   conn
//     .connect()
//     .then(
//       (conn) => conn.db("BluesPlayers_MGSHDB").listCollections().toArray() // Returns a promise that will resolve to the list of the collections
//     )
//     .then((cols) => console.log("Collections", cols))
//     .finally(() => conn.close());
// }

// module.exports = connectDB;
// async function listDatabases(conn) {
//   databasesList = await conn.db().admin().listDatabases();
//   console.log("Databases:");
//   databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
// }
