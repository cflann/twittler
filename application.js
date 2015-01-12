$(document).ready(function() {

  var tweetDiv = function(tweet) {
    var $tweet = $('<div></div>');
    $tweet.addClass('tweet');
    
    var $at = $('<div></div>');
    var $date = $('<div></div>');
    var $message = $('<div></div>');        
    $at.addClass('tweet-at');
    $date.addClass('tweet-date');
    $message.addClass('tweet-message');

    $at.text('@' + tweet.user);
    $at.on('click', function() {
      // modal tweet list
    });
    $date.text('Star Date: ' + tweet.created_at);
    $message.text(tweet.message);
    $tweet.append($at, $date, $message);
    return $tweet;
  };
  
  var getNewest = function() {
    var newest = $('<div></div>').addClass('newest');
    var length = streams.home.length;
    for (var i = 1; i < 11; i++) {
      if (length - i > -1) {
        var tweet = streams.home[length-i];
        var $tweet = tweetDiv(tweet);
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

  var $addTweet = function(tweet) {
    var $tweet = tweetDiv(tweet);
    $tweet.css('display', 'none');
    $('#new-tweet').after($tweet);
    $tweet.slideDown();
    
    var $tweets = $('.tweet');
    if ($tweets.length > 20) {
      $tweets.last().remove();
    }
  };

  window.visitor = "visitor";
  streams.users.visitor = [];
  
  $('#new-tweet').on('click', 'button', function() {
    var $input = $('#new-tweet').find('input');
    var message = $input.val();
    writeTweet(message);
    $addTweet(streams.home[streams.home.length-1]);
    $input.val('');    
  });
  
});
