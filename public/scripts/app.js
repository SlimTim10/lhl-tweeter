/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
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

  function renderTweets(tweets) {
    tweets.forEach((tweetData) => {
      $tweet = createTweetElement(tweetData);
      $("#tweets").append($tweet);
    });
  }

  function createTweetElement(data) {
    const articleElem = $("<article>")
          .addClass("tweet");
    const headerElem = $("<header>");
    const authorElem = $("<span>")
          .addClass("author")
          .text(data.user.name);
    const usernameElem = $("<span>")
          .addClass("username")
          .text(data.user.handle);
    const contentElem = $("<p>")
          .addClass("tweet-content")
          .text(data.content.text);
    const footerElem = $("<footer>");
    const dateElem = $("<p>")
          .addClass("date")
          .text(data.created_at);

    return articleElem
      .append(
        headerElem
          .append(authorElem)
          .append(usernameElem))
      .append(contentElem)
      .append(
        footerElem
          .append(dateElem));
  }

  renderTweets(data);
});
