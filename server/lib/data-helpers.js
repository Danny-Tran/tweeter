"use strict";

// Simulates the kind of delay we see with network or filesystem operations
const simulateDelay = require("./util/simulate-delay");

// Defines helper functions for saving and getting tweets, using the database `db`
module.exports = function makeDataHelpers(db) {
  return {
    saveTweet: function(newTweet, callback) {
      db.collection("tweeter").insert(newTweet, (err, result) => {
        if(err) {
          callback(err)
        } else {
          callback(null, true);
          }  
        });
      },

    // Get all tweets in `db`, sorted by newest first
    getTweets: function(callback) {
      const sortNewestFirst = (a, b) => a.created_at - b.created_at;
      db.collection("tweeter").find().toArray((err, tweeter) => {
        callback(null, tweeter.sort(sortNewestFirst));
      });
    }  
  }
}
  
