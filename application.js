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
    
    var $at = $('<a></a>');
    var $date = $('<div></div>');
    var $message = $('<div></div>');        
    $at.addClass('tweet-at');
    $date.addClass('tweet-date');
    $message.addClass('tweet-message');

    var tweeter = tweet.user;
    $at.text('@' + tweeter);
    $at.on('click', function(event) {
      event.stopPropagation();
      var $modal = $('#myModal');      
      var $modalBody = $modal.find('.modal-body');
      $modalBody.text(''); // clear modal body
      $modal.find('.modal-title').text(tweeter + "'s tweets");
      var color = getNextColor();
      for (var i = 0; i < streams.users[tweeter].length; i++) {
        var $tweet = tweetDiv(streams.users[tweeter][i]);
        $tweet.addClass(color);
        $tweet.prependTo($modalBody);
      }
      var colorCode = $modalBody.children().first().find('.tweet-at').css('color');
      $modal.find('button')
        .css({'background-color': colorCode,
              'color': '#ffffff'});
      $modal.modal('show');     
    });
    $date.text(/*'Star Date: ' + */moment(tweet.created_at).fromNow());
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
    $('.newest')
      .css('opacity', 0)
      .slideDown('slow')
      .animate(
        { opacity: 1 },
        { queue: false, duration: 'slow' }
      );
  };

  show10Newest();

  var $addTweet = function(tweet) {
    var $tweet = tweetDiv(tweet);
    $tweet.addClass(getNextColor());
    $tweet.css('display', 'none');
    $('#new-tweet').after($tweet);
    
    $tweet
      .css('opacity', 0)
      .slideDown('slow')
      .animate(
        { opacity: 1 },
        { queue: false, duration: 'slow' }
      );
    
    var $tweets = $('main .tweet');
    if ($tweets.length > 20) {
      $tweets.last().fadeOut();
      $tweets.last().remove();
    }
  };

  window.visitor = "visitor";
  streams.users.visitor = [];
  
  $('#new-tweet').on('click', 'button', function() {
    var $input = $('#new-tweet').find('input');
    var message = $input.val();
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
