/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  const tweetData = {
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
  }

  const createTweetElement = (data) => {
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
  };

  const $tweet = createTweetElement(tweetData);

  console.log($tweet);
  $("#tweets").append($tweet);
});
