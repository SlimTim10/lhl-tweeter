"use strict";

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
        db.collection("tweets").find().toArray((err, tweets) => {
          if (err) return callback(err);

          const sortNewestFirst = (a, b) => b.created_at - a.created_at;
          callback(null, tweets.sort(sortNewestFirst));
        });
      });
    }

  };
}
