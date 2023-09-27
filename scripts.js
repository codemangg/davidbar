document.addEventListener("DOMContentLoaded", function() {
    var map = L.map('map').setView([47.3185068, 13.1383278], 17); // Zoom level adjusted to 17
    
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    var marker = L.marker([47.3185068, 13.1383278]).addTo(map) // Set marker at POI
      .bindPopup('GERARDO')
      .openPopup();
  
    map.setView(marker.getLatLng()); // Center the map on the marker
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
