/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {

  loadTweets();
  
  $("#nav-bar .compose").on("click", () => {
    $(".new-tweet").slideToggle(400, () => {
      $(this).find("textarea").focus();
    });
  });

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
        .done(() => {
          loadTweets();
        });
    } else {
      alert("Invalid tweet");
    }
  });

});

const validTweet = content => {
  return content !== ""
    && content !== null
    && content !== undefined
    && content.length > 0
    && content.length <= 140;
}

const loadTweets = () => {
  const url = $(".new-tweet form").attr("action");
  $.getJSON(url, data => {
    renderTweets(data);
  });
}

const renderTweets = tweets => {
  const $tweetsContainer = $("#tweets").html("");
  tweets.forEach((tweetData) => {
    const $tweet = createTweetElement(tweetData);
    $tweetsContainer.append($tweet);
  });
}

const createTweetElement = data => {
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
        .text(timeAgo(data.created_at));

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

const timeAgo = timestamp => {
  const timediff = Date.now() - timestamp;
  
  const msSecond = 1000;
  const msMinute = msSecond * 60;
  const msHour = msMinute * 60;
  const msDay = msHour * 24;
  const msMonth = msDay * 30;
  const msYear = msMonth * 12;

  if (timediff < msSecond) {
    return "Now";
  } else if (timediff < msMinute) {
    return (Math.floor(timediff / msSecond)) + " seconds ago";
  } else if (timediff < msHour) {
    return (Math.floor(timediff / msMinute)) + " minutes ago";
  } else if (timediff < msDay) {
    return (Math.floor(timediff / msHour)) + " hours ago";
  } else if (timediff < msMonth) {
    return (Math.floor(timediff / msDay)) + " days ago";
  } else if (timediff < msYear) {
    return (Math.floor(timediff / msMonth)) + " months ago";
  } else {
    return (Math.floor(timediff / msYear)) + " years ago";
  }
}
