/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function(){

  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": {
          "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
          "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
          "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
        },
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": {
          "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
          "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
          "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
        },
        "handle": "@rd" },
        "content": {
          "text": "Je pense , donc je suis"
        },
        "created_at": 1461113959088
      },
      {
        "user": {
          "name": "Johann von Goethe",
          "avatars": {
            "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
            "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
            "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
          },
          "handle": "@johann49"
        },
        "content": {
          "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
        },
        "created_at": 1461113796368
      }
    ];
    
// formating time function
function formatTime (time) {
  var diff = Math.floor((Date.now() - time) / 1000);
  var interval = Math.floor(diff / 31536000);
  
  if (interval >= 1) {
    return interval + " years" + " ago";
  }
  interval = Math.floor(diff / 2592000);
  if (interval >= 1) {
    return interval + " months" + " ago";
  }
  interval = Math.floor(diff / 604800);
  if (interval >= 1) {
    return interval + " weeks" + " ago";
  }
  interval = Math.floor(diff / 86400);
  if (interval >= 1) {
    return interval + " days" + " ago";
  }
  interval = Math.floor(diff / 3600);
  if (interval >= 1) {
    return interval + " hours" + " ago";
  }
  interval = Math.floor(diff / 60);
  if (interval >= 1) {
    return interval + " minutes" + " ago";
  }
  return "<1m" + " ago";
}

// creating tweet function using data
function createTweetElement(tweetData) {
  const $header = $("<header>")
  .addClass("header-header")
  
  const $tweet = $("<p>").text(tweetData.content.text)
  .addClass("tweet")
  
  const $footer = $("<footer>").text(formatTime(tweetData.created_at))
  
  const $tweetContainer = $("<article>")
  .addClass("hover")
  
  const $username = $("<div>").text(tweetData.user.name)
  .addClass("tweet-header")
  const $handle = $("<div>").text(tweetData.user.handle)
  .addClass("handle-tag")
  const $image = $("<img>").attr('src', tweetData.user.avatars.small)
  .addClass("image")  
  
  $header.append($image).append($username).append($handle)
  return $tweetContainer.append($header).append($tweet).append($footer)
};

// function to render tweet
function renderTweets(tweets) {
  // loops through tweets
    for (i in tweets){
    $(".tweetContainer").prepend(createTweetElement(tweets[i])); 
  }
}

function loadtweet(){
  // $("textarea").empty();
  
  $.ajax ({
    url: "/tweets",
    method: "GET"
  }).done(function (tweets) {
    $("textarea").val("");
    renderTweets(tweets);
  })
}

$(".tweetform").submit(function(event){
  event.preventDefault();
if (!$("textarea").val()) {
  alert("please eneter your tweets")
} else if ($("textarea").val().length > 140) {
  alert("please keep your tweets under 140 Characters")
} else {
  let $form = $(this);
  let term = $form.find("textarea[name='text']").val();
  // let url = $form.attr("action");
  
  $.post("/tweets", {text:term}).done(function(){
    loadtweet();
  })
}
});

renderTweets(loadtweet());



});






