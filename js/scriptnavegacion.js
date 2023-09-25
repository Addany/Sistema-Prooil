$('#navbar').load('navegacion/navbar.php', function() {
  $.getScript("navegacion/navbar.js", function() {
    $('#page-container').fadeIn();
  });
});