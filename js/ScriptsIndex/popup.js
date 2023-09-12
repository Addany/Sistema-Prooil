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

