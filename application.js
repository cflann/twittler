$(document).ready(function() {

  var colorClasses = ["yellow-shirt", "blue-shirt", "red-shirt"];
  var getNextColor = function() {
    var nextColor = colorClasses.pop();
    colorClasses.unshift(nextColor);
    return nextColor;
  };
  
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
  
  var get10Newest = function() {
    var newest = $('<div></div>').addClass('newest');
    var length = streams.home.length;
    for (var i = 1; i < 11; i++) {
      if (length - i > -1) {
        var tweet = streams.home[length-i];
        streams.home[length-i].shown = true;
        var $tweet = tweetDiv(tweet);
        $tweet.addClass(getNextColor());
        newest.append($tweet);
      }
    }
    return newest;
  };

  var show10Newest = function() {
    if ($('.newest').length > 0) {
      $('.newest').remove();
    }

    var $newest = get10Newest();
    $newest.css({"display": "none"});
    $('main').append($newest);
    $('.newest').slideDown();
  };

  show10Newest();

  var $addTweet = function(tweet) {
    var $tweet = tweetDiv(tweet);
    $tweet.addClass(getNextColor());
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
    //updateTweets();
    updateTweets();
    writeTweet(message);
    $addTweet(streams.home[streams.home.length-1]);
    streams.home[streams.home.length-1].shown = true;
    $input.val('');    
  });

  function updateTweets() {
    var $oldFirst = $('.tweet').first();
    var index = streams.home.length - 1;
    while (streams.home[index].shown === false) {
      index--;
    }
    for (var i = index+1; i < streams.home.length; i++) {
      streams.home[i].shown = true;
      $addTweet(streams.home[i]);
    }
  }

  var scheduleNextUpdate = function() {
    updateTweets();
    setTimeout(scheduleNextUpdate, 2000);
  };
  scheduleNextUpdate();
    
});
