export default (function() {
  var container = $('.tweet-container');

  function infoDisplayer(info) {
    $.ajax({
      url: "https://api.twitter.com/1/statuses/oembed.json?url=" + info.url,
      dataType: "jsonp",
      success: function(data){
        container.html(data.html)
      },
      error: function(err, str) {
               console.log(str)
             }
    });
  }

  return {
    display: infoDisplayer
  }
})();
