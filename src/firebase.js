export default (function() {
  let FirebaseAPI = require("firebase");
  let firebase    = new FirebaseAPI("https://burning-inferno-9567.firebaseio.com/");

  let getData = function (hashtag, callback) {
    // TODO use hashtag
    firebase.child("tweets/").on("value", function(tweets) {
      callback(tweets.val())
    })
  }

  let getGuidelines = function (countryCode, callback) {
    firebase.child("guidelines/").on("value", function(guidelines) {
      let data = guidelines.val()
      callback(data[countryCode])
    })
  }

  return {
    row: getData,
    getGuildelines: getGuidelines
  }
})();
