document.addEventListener("DOMContentLoaded", function() {
  var map = L.map('map').setView([47.3185068, 13.1383278], 17);
  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);
  
  var marker = L.marker([47.3185068, 13.1383278]).addTo(map)
    .bindPopup('GERARDO')
    .openPopup();

  map.setView(marker.getLatLng()); 
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href').substring(1);
      if (targetId !== 'impressum') {
          document.querySelector('#' + targetId).scrollIntoView({
              behavior: 'smooth'
          });
      } else {
          window.location.href = 'impressum.html';
      }
  });
});

let currentImageIndex = 0;
const images = [
  'bildgalerie/image1.jpg',
  'bildgalerie/image2.jpg',
  'bildgalerie/image3.jpg',
  'bildgalerie/image4.jpg',
  'bildgalerie/image5.jpg'
  // Add more image paths if needed
];

function openSlideshow() {
  const slideshow = document.getElementById('slideshow');
  const slideshowImg = document.getElementById('slideshowImg');

  currentImageIndex = 0;
  slideshowImg.src = images[currentImageIndex];
  slideshow.style.display = "block";
}

function closeSlideshow() {
  document.getElementById('slideshow').style.display = "none";
}

function changeSlide(n) {
  currentImageIndex += n;
  if (currentImageIndex > images.length - 1) {
      currentImageIndex = 0;
  } else if (currentImageIndex < 0) {
      currentImageIndex = images.length - 1;
  }
  document.getElementById('slideshowImg').src = images[currentImageIndex];
}

document.querySelector('a[href="#images"]').addEventListener('click', function(e) {
  e.preventDefault();
  openSlideshow();
});

document.addEventListener('keydown', function(event) {
  if (document.getElementById('slideshow').style.display === "block") {
      switch (event.key) {
          case "Escape": // If Escape key is pressed
              closeSlideshow();
              break;
          case "ArrowRight": // If Right Arrow key is pressed
              changeSlide(1);
              break;
          case "ArrowLeft": // If Left Arrow key is pressed
              changeSlide(-1);
              break;
      }
  }
});