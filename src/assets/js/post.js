var index = $('#index');
var position = index.position();

$(window).on('resize scroll', function() {
  $('.heading').each(function() {
    const id = $(this).attr('id');
    if ($(this).isInViewport()) {
      $('.index__item').removeClass('index--highlight');
      $(`#prefix-${id}`).addClass('index--highlight');
    }
  });

  const windowPosition = $(window).scrollTop();

  if (windowPosition >= position.top) {
    index.addClass('index--sticked');
  } else {
    index.removeClass('index--sticked');
  }
});
