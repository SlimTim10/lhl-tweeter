/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

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
    const avatarElem = $("<img>")
          .attr("src", data.user.avatars.small);
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
          .append(avatarElem)
          .append(authorElem)
          .append(usernameElem))
      .append(contentElem)
      .append(
        footerElem
          .append(dateElem));
  }

  $(".new-tweet form").on("submit", function(event) {
    event.preventDefault();
    const $form = $(this);
    const content = $form.serializeArray()[0].value;
    const data = $form.serialize();
    const action = $form.attr("action");
    const method = $form.attr("method");
    if (validTweet(content)) {
      $.ajax({
        method: method,
        url: action,
        data: data
      })
        .done(function() {
          loadTweets();
        });
    } else {
      alert("Invalid tweet");
    }
  });

  function validTweet(content) {
    return content !== ""
      && content !== null
      && content !== undefined
      && content.length > 0
      && content.length <= 140;
  }

  function loadTweets() {
    const url = $(".new-tweet form").attr("action");
    $.getJSON(url, function(data) {
      renderTweets(data);
    });
  }
  
  loadTweets();
  
});
