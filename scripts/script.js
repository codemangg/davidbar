document.addEventListener("DOMContentLoaded", function () {
    console.log("DOMContentLoaded fired.");

    // Check if the current page is NOT impressum.html
    if (window.location.pathname.indexOf("impressum.html") === -1) {
        initMap();
        initSmoothScroll();
        initSlideshow();
    } else {
        console.log("We're on the impressum.html page. Skipping initMap, initSmoothScroll, and initSlideshow.");
    }

    initHamburgerMenu();
    initMenuSwipe();
});

function initMap() {
    console.log("initMap fired.");

    if (!document.getElementById('map')) return;

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
        popupAnchor: [0, -20]
    });

    var marker = L.marker([47.3185068, 13.1383278], { icon: customIcon }).addTo(map)
        .bindPopup('<img src="./logos/Gerardo.jpg" alt="GERARDO Logo" width="200"><br><strong>Pub-Bar Gerardo</strong><br>Goldegger Straße 6<br>5620 Schwarzach', {
            autoPanPadding: [20, 20]
        })
        .openPopup();

    map.setView(marker.getLatLng());
}

function initSmoothScroll() {
    console.log("initSmoothScroll fired.");

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.querySelector('#' + targetId);

            if (targetId === 'images') {
                openSlideshow();
            } else if (targetId !== 'impressum.html' && targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            } else if (targetId === 'impressum.html') {
                window.location.href = './pages/impressum.html';
            }
        });
    });
}

let currentImageIndex = 0;
const images = ['bildgalerie/image1.jpg', 'bildgalerie/image2.jpg', 'bildgalerie/image3.jpg', 'bildgalerie/image4.jpg', 'bildgalerie/image5.jpg'];

function initSlideshow() {
    console.log("initSlideshow fired.");

    if (!document.getElementById('slideshow')) return;

    document.querySelector('a[href="#images"]').addEventListener('click', openSlideshow);

    document.addEventListener('keydown', function (event) {
        if (document.getElementById('slideshow').style.display === "block") {
            switch (event.key) {
                case "Escape": closeSlideshow(); break;
                case "ArrowRight": changeSlide(1); break;
                case "ArrowLeft": changeSlide(-1); break;
            }
        }
    });

    let touchStartX = null;
    const slideshowEl = document.getElementById('slideshow');

    slideshowEl.addEventListener('touchstart', e => touchStartX = e.touches[0].clientX);
    slideshowEl.addEventListener('touchmove', e => e.preventDefault());
    slideshowEl.addEventListener('touchend', function (e) {
        if (!touchStartX) return;

        let touchEndX = e.changedTouches[0].clientX;
        let diffX = touchStartX - touchEndX;

        if (Math.abs(diffX) > 50) {
            changeSlide(diffX > 0 ? 1 : -1);
        }

        touchStartX = null;
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
    currentImageIndex = (currentImageIndex + n + images.length) % images.length;
    document.getElementById('slideshowImg').src = images[currentImageIndex];
}

function initHamburgerMenu() {
    console.log("initHamburgerMenu fired.");

    const hamburgerMenu = document.getElementById('hamburger-menu');
    const mobileNavMenu = document.getElementById('mobile-nav-menu');
    const hamburgerMenuMobile = document.getElementById('hamburger-menu-mobile');

    if (!mobileNavMenu) return;

    const toggle = () => toggleMenu();

    if (hamburgerMenu) hamburgerMenu.addEventListener('click', toggle);
    if (hamburgerMenuMobile) hamburgerMenuMobile.addEventListener('click', toggle);

    mobileNavMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', toggle));
}

function initMenuSwipe() {
    console.log("initMenuSwipe fired.");

    let touchStartXMenu = null;
    let touchEndXMenu = null;

    document.addEventListener('touchstart', function (e) {
        touchStartXMenu = e.touches[0].clientX;
    });

    document.addEventListener('touchend', function (e) {
        touchEndXMenu = e.changedTouches[0].clientX;
        handleMenuSwipeGesture(touchStartXMenu, touchEndXMenu);
    });
}

function handleMenuSwipeGesture(touchStartXMenu, touchEndXMenu) {
    let slideshow = document.getElementById('slideshow');
    if (!touchStartXMenu || !touchEndXMenu || (slideshow && slideshow.style.display === "block")) return;

    let diffX = touchStartXMenu - touchEndXMenu;
    if (Math.abs(diffX) > 100) {
        if (diffX > 0 && document.getElementById('mobile-nav-menu').classList.contains('open')) {
            toggleMenu();
        } else if (diffX < 0 && !document.getElementById('mobile-nav-menu').classList.contains('open')) {
            toggleMenu();
        }
    }
}

function toggleMenu() {
    let nav = document.getElementById('mobile-nav-menu');
    let hamburger = document.getElementById('hamburger-menu');
    let hamburgerMobile = document.getElementById('hamburger-menu-mobile');
    
    if (!nav) return;

    if (nav.classList.contains('open')) {
        nav.classList.remove('open');

        hamburger.style.display = "flex";
        hamburgerMobile.style.display = "none";

    } else {
        nav.classList.add('open');
        
        hamburger.style.display = "none"; 
        hamburgerMobile.style.display = "flex";
    }
}

