export default (function() {
  var FirebaseAPI = require("firebase");
  var firebase    = new FirebaseAPI("https://burning-inferno-9567.firebaseio.com/");

  function getData(hashtag, callback) {
    // TODO use hashtag
    firebase.child("tweets/").on("value", function(tweets) {
      callback(tweets.val());
    })
  }

  return {
    row: getData
  }
})();
