$('.ddc_header__mobile_menu__icon').click(function () {

  $(this).parents('.ddc_header').toggleClass('ddc_header--is-open');
  $('body').toggleClass('body--ddc_header--is-open');


});


$(document).ready(function () {

  // grab an element
  var myElement = document.querySelector('.headroom');
  // construct an instance of Headroom, passing the element
  var headroom = new Headroom(myElement);
  // initialise
  headroom.init();

  // Search Button

  // Trigger search submit on click
  $('form#search_form').on('submit', function (topSearch) {

    topSearch.preventDefault();

    // If search input has content
    if ($('input#search_input').val() != '') {

      // Clear variables
      var searchQuery = null;
      var searchQueryUrl = null;

      // Set variable as input value
      var searchQuery = $('input#search_input').val();

      // Create search query url variable
      var searchQueryUrl = window.location.origin + '/?s=' + searchQuery;

      // Redirect user to blog page with search query
      window.location.href = searchQueryUrl;

    } else {
      $('input#search_input').css('box-shadow', 'inset 0px 0px 8px rgba(200, 55, 30, .4)').attr('placeholder', 'Please enter a search term...');
    }

  });

  $('form#searchform').on('submit', function (topSearch) {

    topSearch.preventDefault();

    // If search input has content
    if ($('input#searchinput').val() != '') {

      // Clear variables
      var searchQuery = null;
      var searchQueryUrl = null;

      // Set variable as input value
      var searchQuery = $('input#searchinput').val();
      console.log(searchQuery);
      // Create search query url variable
      var searchQueryUrl = window.location.origin + '/?s=' + searchQuery;

      // Redirect user to blog page with search query
      window.location.href = searchQueryUrl;

    } else {
      $('input#searchinput').css('box-shadow', 'inset 0px 0px 8px rgba(200, 55, 30, .4)').attr('placeholder', 'Please enter a search term...');
    }

  });

  var p = $('.ddc_header__searchinput__mobile').detach();
  $('.ddc_header__nav .menu').prepend(p);
});
