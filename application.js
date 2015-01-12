$(document).ready(function() {

  var getNewest = function() {
    var newest = $('<div></div>').addClass('newest');
    var length = streams.home.length;
    for (var i = 1; i < 11; i++) {
      if (length - i > -1) {
        var tweet = streams.home[length-i];
        var $tweet = $('<div></div>');
        $tweet.addClass('tweet');
        var $at = $('<div></div>');
        var $date = $('<div></div>');
        var $message = $('<div></div>');
        $at.addClass('tweet-at');
        $date.addClass('tweet-date');
        $message.addClass('tweet-message');
        $at.text('@' + tweet.user);
        $date.text('Star Date: ' + tweet.created_at);
        $message.text(tweet.message);
        $tweet.append($at, $date, $message);
        newest.append($tweet);
      }
    }
    return newest;
  };

  var showNewest = function() {
    if ($('.newest').length > 0) {
      $('.newest').remove();
    }

    var $newest = getNewest();
    $newest.css({"display": "none"});
    $('main').append($newest);
    $('.newest').slideDown();
  };

  showNewest();
  
});
