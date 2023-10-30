function openPopup() {
  const popupOverlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.popup');
  
  popupOverlay.style.display = 'block';
  popup.style.display = 'block';
  popup.style.opacity = '1';
  popupOverlay.style.opacity = '1';
  
  document.querySelector(".nav-list").addEventListener('click', closePopup);
  document.querySelector(".nav-toggle").addEventListener('click', closePopup);

  document.querySelector(".nav-list").classList.remove("active");
  document.querySelector(".nav-toggle").classList.remove("active");
}

function closePopup() {
  const popupOverlay = document.querySelector('.popup-overlay');
  const popup = document.querySelector('.popup');

  popup.classList.add('fade-out');
  popupOverlay.classList.add('fade-out');
  
  popup.addEventListener('animationend', function handler() {
    popupOverlay.style.display = 'none';
    popup.style.display = 'none';
    popup.classList.remove('fade-out');
    popupOverlay.classList.remove('fade-out');
    popup.removeEventListener('animationend', handler); 

    document.querySelector(".nav-list").removeEventListener('click', closePopup);
    document.querySelector(".nav-toggle").removeEventListener('click', closePopup);
  });
}