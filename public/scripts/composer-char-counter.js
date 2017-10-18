$(document).ready(() => {
  $(".new-tweet textarea").bind("input propertychange", function() {
    const tweet = $(this).val();
    const x = 140 - tweet.length;

    const counter = $(this).siblings(".counter");
    counter.html(x.toString());
    
    const invalidClass = "counter-invalid";
    if (x < 0) {
      counter.addClass(invalidClass);
    } else {
      counter.removeClass(invalidClass);
    }
  });
});
