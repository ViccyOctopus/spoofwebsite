$(function() {
  $('[data-pamodal][data-target]').on('click', function() {
    var target = $(this).data('target');
    // bootstrap modal
    $(target).modal();
  });
});

$('#ddcTakeActionModal').on('hidden.bs.modal', function () {
  window.location.hash = 'close';
});