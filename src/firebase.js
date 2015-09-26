export default (function() {
  var FirebaseAPI = require("firebase");
  var firebase    = new FirebaseAPI("https://burning-inferno-9567.firebaseio.com/");
  
  function getTweets(callback) {
    firebase.child("tweets/").on("value", function(tweets) { 
      callback(tweets.val());
    })
  }

  return {
    getTweets: getTweets
  }
})();
