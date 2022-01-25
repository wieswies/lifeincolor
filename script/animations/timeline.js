$(window).scroll(function () {
  const timeline = $(".timeline");
  const win = $(window);
  const offset = timeline.offset();

  const scrollOffset = win.scrollTop();
  const height = win.innerHeight();
  if (scrollOffset + height / 2 > offset.top) {
    timeline.addClass("visible");
  } else {
    timeline.removeClass("visible");
  }
});
