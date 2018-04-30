"use strict";

const userHelper    = require("../lib/util/user-helper")

const express       = require('express');
const tweetsRoutes  = express.Router();

module.exports = function(DataHelpers) {

  tweetsRoutes.get("/", (req, res) => {
    DataHelpers.getTweets((err, tweets) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweets);
      }
    });
  });

  tweetsRoutes.get("/:id", (req, res) => {
    DataHelpers.getTweet(req.params.id, (err, tweet) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(tweet);
      }
    });
  });

  tweetsRoutes.post("/", (req, res) => {
    if (!req.body.text) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }

    const user = req.body.user ? req.body.user : userHelper.generateRandomUser();
    const tweet = {
      user: user,
      content: {
        text: req.body.text
      },
      likes: 0,
      created_at: Date.now()
    };

    DataHelpers.saveTweet(tweet, err => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  tweetsRoutes.post("/like", (req, res) => {
    if (!req.body.tweetid) {
      res.status(400).json({ error: 'invalid request: no data in POST body'});
      return;
    }
    
    DataHelpers.likeTweet(req.body.tweetid, err => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.status(201).send();
      }
    });
  });

  return tweetsRoutes;

}
