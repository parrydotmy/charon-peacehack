export default (function() { 
  var container = $('.tweet-container');

  function infoDisplayer(info) {
    var tweetContainer = $("<blockquote>")
                            .append(info.text)
                            .addClass("twitter-tweet");
    container.html(tweetContainer)
  }

  return {
    display: infoDisplayer
  }
})();
