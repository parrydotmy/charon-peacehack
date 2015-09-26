export default (function() { 
  var container = $('.tweet-container');

  function infoDisplayer(info) {
    var tweetParagraph = $('<p>')
      .append(info.text) 
    var tweetContainer = $("<blockquote>")
                            .append(tweetParagraph)
                            .addClass("twitter-tweet")
                            .append("- " + info.name);
    container.html(tweetContainer)
  }

  return {
    display: infoDisplayer
  }
})();
