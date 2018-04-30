"use strict";

const ObjectID = require('mongodb').ObjectID;

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {

    // Saves a tweet to `db`
    saveTweet: function(newTweet, callback) {
      simulateDelay(() => {
        db.collection("tweets").insertOne(newTweet, (err, result) => {
          if (err) return callback(err);
          
          callback(null, true);
        });
      });
    },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      simulateDelay(() => {
        db.collection("tweets").find().sort({created_at: -1}).toArray(callback);
      });
    },

    getTweet: function(id, callback) {
      simulateDelay(() => {
        db.collection("tweets").find({ _id: ObjectID(id) }).toArray(callback);
      });
    },

    likeTweet: function(id, callback) {
      simulateDelay(() => {
        db.collection("tweets").updateOne(
          {_id: ObjectID(id)},
          {
            $inc: { likes: 1 }
          });
        callback(null, true);
      });
    }

  };
}
