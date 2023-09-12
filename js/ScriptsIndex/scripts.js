function openPopup() {
  const popupOverlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.popup');
  popupOverlay.style.display = 'block';
  popup.style.display = 'block';
  
  document.querySelector(".nav-list").classList.remove("active");
  document.querySelector(".nav-toggle").classList.remove("active");
}

function closePopup() {
  const popupOverlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.popup');
  popupOverlay.style.display = 'none';
  popup.style.display = 'none';
}

$(document).ready(function(){
  $('.submenu-parent > a').on('click', function(e){
    e.preventDefault();
    
    var submenu = $(this).siblings('.submenu');
    $('.submenu').not(submenu).slideUp();

    submenu.slideToggle(function() {
      closePopup();
    });
    
    $(this).blur();
  });

  $('.menu-item').on('click', function(e){
    e.preventDefault();
    $('.submenu').hide();

    $(this).next('.submenu').show(function() {
      closePopup();
    });
  });

  $('.custom-button.open-popup-button').on('click', function(){
    openPopup();
    $('.submenu').slideUp();
  });

  $('.nav-toggle').on('click', function () {
    $('.nav-list').toggleClass('active');
    $('.nav-toggle').toggleClass('active');
    closePopup();
  });
});

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, idx) => {
    slide.classList.toggle('active', idx === index);
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000);
showSlide(currentSlide);