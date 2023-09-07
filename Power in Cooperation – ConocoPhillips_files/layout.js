$(function() {
  if ($('.pic_toast').length) {
    $('.pic_toast').insertAfter('.footer');
  }

  $('.pic_toast__close').on('click', function() {
    $(this).closest('.pic_toast').fadeOut(250, function() {
      $(this).hide();
    });
  });

  $('.pic_toast__button button').on('click', function() {
    window.localStorage.setItem('pa-toast-accept', 'true');
    $('.pic_toast__close').trigger('click');
  });

  if (window.localStorage.getItem('pa-toast-accept') === 'true') {
    $('.pic_toast').remove();
  }
});
