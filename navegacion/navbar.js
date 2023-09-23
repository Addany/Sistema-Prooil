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
    openPopup(); // Asegúrate de que openPopup también esté definido o elimínalo si no es necesario
    $('.submenu').slideUp();
  });

  $('.nav-toggle').on('click', function () {
    $('.nav-list').toggleClass('active');
    $('.nav-toggle').toggleClass('active');
  });
});

