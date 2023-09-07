jQuery(function($) {
  // Defines the number of candidates to show before the list is truncated
  var candidatesListLimit = 3;

  /**
   * Sets the max-height on a list of candidates
   * 
   * @return {void}
   */
  function truncateCandidatesLists() {
    $('.PaGotv .candidates-list').each(function() {
      if ($(this).children('li').length > candidatesListLimit) {
        var listHeight = getTruncatedCandidatesListHeight($(this).children('li'), candidatesListLimit);

        $(this).addClass('truncated').css('max-height', listHeight + 'px');
      }
    });
  }

  // Truncates all lists of candidates on initial load
  truncateCandidatesLists();

  // Click handler to toggle truncation of lists of candidates
  $('.PaGotv').on('click', '[href="#toggle-list"]', function(e) {
    e.preventDefault();

    // Determines the chamber whose list should be truncated
    var chamber     = $(this).data('chamber');
    // Finds the appropriate list of candidates in the DOM
    var $pairedList = $('.candidates-list--' + chamber);

    // Toggle behavior logic: updates the max-height and FA icon accordingly
    if ($pairedList.hasClass('truncated')) {
      $pairedList.removeClass('truncated').css('max-height', 'none');
      $(this).find('> i').removeClass('fa-chevron-down').addClass('fa-chevron-up');
    } else {
      var listHeight = getTruncatedCandidatesListHeight($pairedList.children('li'), candidatesListLimit);

      $pairedList.addClass('truncated').css('max-height', listHeight + 'px');
      $(this).find('> i').removeClass('fa-chevron-up').addClass('fa-chevron-down');
    }
  });

  /**
   * Calculates the combined height of the specified number of list items
   * 
   * @param {array} $list  a jQuery object containing an array of candidate list items
   * @param {int} limit  the maximum number of candidate list items to calculate to use
   * 
   * @return {int} the combined height
   */
  function getTruncatedCandidatesListHeight($list, limit) {
    var height = 0;

    $list.each(function(i) {
      if (i < limit) {
        height += $(this).outerHeight(true);
      } else {
        return false;
      }
    });

    return height;
  }

  $('.PaGotv').on('click', '.address-header-toggle', function(e) {
    e.preventDefault();

    $('.address-header').fadeOut(400, function() {
      $('.state-selector-header').fadeIn();
    });
  });

  // Onchange handler for the state dropdown
  $('.PaGotv').on('change', '#state', function() {
    var selectedState = $(this).val();

    if (selectedState === '') {
      return false;
    }

    // Injects a loading icon before we attempt to fetch some data
    $('.upcoming-election, .PaGotv .voter-resources, .PaGotv__candidates .PaGotv__card-body')
      .prepend('<div class="PaGotv__loading"><i class="fa fa-fw fa-spinner fa-pulse"></i></div>');

    // AJAX call to repaint the GOTV with new data
    $.post(
      pa_gotv.ajax_url,
      {
        action: 'update_gotv_template',
        state: selectedState,
      },
      function(data) {
        $('.PaGotv__wrapper').empty().html(data);
        // Truncates all lists of candidates again once we get some new data
        truncateCandidatesLists();
      }
    );
  });

  $('.PaGotv').on('click', '.PaGotv__modal_link', function(e) {
    e.preventDefault();

    var modalTarget    = $(this).data('target');
    var modalTemplate  = $(this).data('template');
    var modalBody      = $(this).data('body');
    var modalCandidate = $(this).data('candidate');

    $(modalTarget).modal('show');

    $.post(
      pa_gotv.ajax_url,
      {
        action:       'load_custom_modal_template',
        templatePath: modalTemplate,
        body:         modalBody,
        candidate:    modalCandidate
      },
      function(data) {
        $(modalTarget).find('.modal-body').first().html(data);
      }
    );
  
  });

  // Click handler to process the address form
  $('.PaGotv').on('click', '.PaGotv__form__button--submit', function(e) {
    e.preventDefault();

    var passedValidation = true;

    // Validates the form fields
    $('.PaGotv__form [type="text"], .PaGotv__form select').each(function() {
      $(this).next('.error').remove();

      if (!$(this)[0].validity.valid) {
        passedValidation = false;
        errorMessage     = 'This field is required.';

        // Validates the zip code field
        if ($(this).prop('id') === 'address_form__zip' && $(this)[0].validity.patternMismatch) {
          errorMessage = 'The Zip Code is invalid. Accepted formats are 99999 or 99999-9999.';
        }

        $('<div class="error">' + errorMessage + '</div>').insertAfter($(this));
      }
    });

    if (!passedValidation) {
      return false;
    }

    // Address object needs to be declared BEFORE the modal is closed
    var address = {
      address1: $.trim($('#address_form__address1').val()),
      address2: $.trim($('#address_form__address2').val()),
      city:     $.trim($('#address_form__city').val()),
      state:    $.trim($('#address_form__state').val()),
      zip:      $.trim($('#address_form__zip').val())
    };

    $('#gotvModal').modal('hide');
    // Injects a loading icon before we attempt to fetch some data
    $('.upcoming-election, .PaGotv .voter-resources, .PaGotv__candidates .PaGotv__card-body')
      .prepend('<div class="PaGotv__loading"><i class="fa fa-fw fa-spinner fa-pulse"></i></div>');

    // AJAX call to repaint the GOTV with new data
    $.post(
      pa_gotv.ajax_url,
      {
        action: 'update_gotv_template',
        address: address,
        fromAddressForm: true
      },
      function(data) {
        $('.PaGotv__wrapper').empty().html(data);
        truncateCandidatesLists();
      }
    );
  });

  // Bootstrap event handler to reset the modal body when it's closed
  $('.PaGotv').on('hidden.bs.modal', '#gotvModal', function() {
    $('#gotvModal')
      .find('.modal-body')
      .first()
      .html('<p style="text-align:center;"><i class="fa fa-fw fa-spinner fa-pulse" style="font-size:3rem;"></i></p>');
  });

  // Bootstrap event handler to open only one accordion item at a time
  $('.PaGotv').on('show.bs.collapse', '.collapse', function(e) {
    var parent = $(this).data('parent');

    $(parent + ' .collapse').not(e.target).removeClass('in');
    // Toggles the open/close chevron
    $(parent + ' .accordion-toggle').removeClass('open');
    $(this).prev().find('.accordion-toggle').toggleClass('open');
  });

  $('.PaGotv').on('hide.bs.collapse', '.collapse', function(e) {
    var parent = $(this).data('parent');

    $(parent + ' .collapse').not(e.target).removeClass('in');
    // Sets all toggles with the "closed" chevron
    $(parent + ' .accordion-toggle').removeClass('open');
  });

  // the google analytics ID from site options, we can only log an event if we have one
  if (window.pa_gotv.ga_id !== 'undefined') {
    // the dropdown state from GOTV
    var $state_dropdown = $('#state');
    // your state using the Geolocation service and IP address
    var current_state = pa_gotv.current_state;

    // when someone clicks on Register to Vote
    $('.PaGotv').on('click', '.register-to-vote .button--primary', function () {
      // if we have a valid state in the dropdown, use that, otherwise fallback to using your geolocated state
      if ($state_dropdown.length > 0 && $state_dropdown.val() !== '') {
        current_state = $('#state').val();
      }

      // if we have valid details, send a click event for the register to vote button
      if (current_state !== 'undefined' && current_state !== '') {
        ga('gtag_' + window.pa_gotv.ga_id + '.send', 'event', 'Button Click', 'Register To Vote', current_state);
      }
    });
  }
});