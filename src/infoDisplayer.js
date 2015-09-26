export default (function() { 
  var container = $('.tweet-container');

  function infoDisplayer(info) {
    console.log("called");
    var tweetContainer = $("<blockquote>").append(info.text);
    container.html(tweetContainer)
  }

  return {
    display: infoDisplayer
  }
})();
