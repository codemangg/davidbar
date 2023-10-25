document.addEventListener("DOMContentLoaded", function () {
  if (document.getElementById('map')) {
      initMap();
  }
  initSmoothScroll();
  if (document.getElementById('slideshow')) {
      initSlideshow();
      initKeyboardNavigation();
      initSwipeNavigation();
  }
  initHamburgerMenu();
});

function initMap() {
  var map = L.map('map').setView([47.3185068, 13.1383278], 17);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  var customIcon = L.icon({
      iconUrl: './images/marker-icon.png',
      shadowUrl: './images/marker-shadow.png',
      iconSize: [25, 41],
      shadowSize: [41, 41],
      iconAnchor: [12, 41],
      shadowAnchor: [12, 41],
      popupAnchor: [-3, -76]
  });

  var marker = L.marker([47.3185068, 13.1383278], {icon: customIcon}).addTo(map)
      .bindPopup('<img src="./logos/Gerardo.jpg" alt="GERARDO Logo" width="200"><br><strong>Pub-Bar Gerardo</strong><br>Goldegger Straße 6<br>5620 Schwarzach')
      .openPopup();

  map.setView(marker.getLatLng());
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();

          const targetId = this.getAttribute('href').substring(1);
          const targetElement = document.querySelector('#' + targetId);

          if (targetId === 'images') {
              openSlideshow();
          } else if (targetId !== 'impressum.html') {
              if (targetElement) {
                  targetElement.scrollIntoView({
                      behavior: 'smooth'
                  });
              } else {
                  console.error("No element found with the id:", targetId);
              }
          } else {
              window.location.href = './pages/impressum.html';
          }
      });
  });
}

let currentImageIndex = 0;
const images = [
  'bildgalerie/image1.jpg',
  'bildgalerie/image2.jpg',
  'bildgalerie/image3.jpg',
  'bildgalerie/image4.jpg',
  'bildgalerie/image5.jpg'
];

function initSlideshow() {
  document.querySelector('a[href="#images"]').addEventListener('click', function (e) {
      e.preventDefault();
      openSlideshow();
  });
}

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

function initKeyboardNavigation() {
  document.addEventListener('keydown', function (event) {
      if (document.getElementById('slideshow').style.display === "block") {
          switch (event.key) {
              case "Escape":
                  closeSlideshow();
                  break;
              case "ArrowRight":
                  changeSlide(1);
                  break;
              case "ArrowLeft":
                  changeSlide(-1);
                  break;
          }
      }
  });
}

function initSwipeNavigation() {
  let touchStartX = null;

  document.getElementById('slideshow').addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
  });

  document.getElementById('slideshow').addEventListener('touchmove', function (e) {
      e.preventDefault();
  });

  document.getElementById('slideshow').addEventListener('touchend', function (e) {
      if (touchStartX === null) {
          return;
      }

      let touchEndX = e.changedTouches[0].clientX;
      let diffX = touchStartX - touchEndX;

      if (Math.abs(diffX) > 50) {
          if (diffX > 0) {
              changeSlide(1);
          } else {
              changeSlide(-1);
          }
      }

      touchStartX = null;
  });
}

function initHamburgerMenu() {
  const hamburgerMenu = document.getElementById('hamburger-menu');
  const mobileNavMenu = document.getElementById('mobile-nav-menu');

  if (!hamburgerMenu || !mobileNavMenu) {
      return;
  }

  const menuLinks = mobileNavMenu.querySelectorAll('a');

  hamburgerMenu.addEventListener('click', function() {
      toggleMenu();
  });

  menuLinks.forEach(link => {
      link.addEventListener('click', function() {
          toggleMenu();
      });
  });

  function toggleMenu() {
      if (mobileNavMenu.classList.contains('open')) {
          mobileNavMenu.classList.remove('open');
      } else {
          mobileNavMenu.classList.add('open');
      }
  }
}
