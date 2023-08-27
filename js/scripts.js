document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const navList = document.querySelector(".nav-list");

  navToggle.addEventListener("click", function () {
    navList.classList.toggle("active");
    navToggle.classList.toggle("active");
  });
});




const slides = document.querySelectorAll('.slide');
let currentSlide = 0;

function showSlide(index) {
  slides.forEach((slide, idx) => {
    if (idx === index) {
      slide.classList.add('active');
    } else {
      slide.classList.remove('active');
    }
  });
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % slides.length;
  showSlide(currentSlide);
}

setInterval(nextSlide, 5000); // Cambiar cada 5 segundos (5000 ms)

// Mostrar el primer slide al cargar la página
showSlide(currentSlide);


// Función para abrir el popup
function openPopup() {
  const popupOverlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.popup');
  popupOverlay.style.display = 'block';
  popup.style.display = 'block';
}

// Función para cerrar el popup
function closePopup() {
  const popupOverlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.popup');
  popupOverlay.style.display = 'none';
  popup.style.display = 'none';
}


// Función para mostrar el primer popup
function showPopup() {
  document.getElementById('first-popup').classList.add('popup-visible');
}


