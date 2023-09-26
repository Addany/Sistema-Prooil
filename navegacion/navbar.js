$(document).ready(function() {
  $('.submenu-parent > a').on('click', function(e) {
    e.preventDefault();
    
    var submenu = $(this).siblings('.submenu');
    $('.submenu').not(submenu).slideUp();

    submenu.slideToggle();
    
    $(this).blur();
  });

  $('.menu-item').on('click', function(e) {
    e.preventDefault();
    $('.submenu').hide();

    $(this).next('.submenu').show();
  });

  $('.custom-button.open-popup-button').on('click', function() {
    openPopup(); 
    $('.submenu').slideUp();
  });

  $('.nav-toggle').on('click', function () {
    $('.nav-list').toggleClass('active');
    $('.nav-toggle').toggleClass('active');
  });

  $(document).on('click', function(e) {
    if (!$(e.target).closest('.navbar, .submenu-parent, .menu-item, .custom-button.open-popup-button, .nav-toggle').length) {
        $('.submenu').slideUp();
    }
  });
});

$(document).on('click', function(e) {
  if (!$(e.target).closest('.navbar, .submenu-parent, .menu-item, .custom-button.open-popup-button, .nav-toggle').length) {
      $('.submenu').slideUp();

      if ($('.nav-list').hasClass('active')) {
          $('.nav-list').removeClass('active');
          $('.nav-toggle').removeClass('active');
      }
  }
});