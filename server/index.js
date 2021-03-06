"use strict";

// Basic express setup:

const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

const {MongoClient} = require("mongodb");
const MONGODB_URI = "mongodb://localhost:27017/tweeter";

(async function() {
  try {
    const db = await MongoClient.connect(MONGODB_URI);
    const DataHelpers = require("./lib/data-helpers.js")(db);
    const tweetsRoutes = require("./routes/tweets")(DataHelpers);
    app.use("/tweets", tweetsRoutes);
  } catch (err) {
    console.log(err.stack);
  }
})();

// MongoClient.connect(MONGODB_URI, (err, db) => {
//   const DataHelpers = require("./lib/data-helpers.js")(db);
//   const tweetsRoutes = require("./routes/tweets")(DataHelpers);

//   // Mount the tweets routes at the "/tweets" path prefix:
//   app.use("/tweets", tweetsRoutes);
// });

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
