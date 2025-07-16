document.addEventListener('DOMContentLoaded', function() {
    ymaps.ready(initMap);
    
    function initMap() {
        const attractions = {
            'cascade': [40.1911, 44.5151],
            'republic_square': [40.1776, 44.5126],
            'dilijan-park': [40.7400, 44.8500],
            'khndzoresk': [39.5000, 46.3333],
            'amenaprkich': [40.7833, 43.8333],
            'echmiadzin': [40.1617, 44.2914],
            'jermuk-waterfall': [39.8411, 45.6722],
            'jermuk-mineral': [39.8500, 45.6800]
        };
        
        // Находим все контейнеры карт на странице
        const mapContainers = document.querySelectorAll('[id^="map-"]');
        
        mapContainers.forEach(container => {
            const mapId = container.id.replace('map-', '');
            if (attractions[mapId]) {
                const coords = attractions[mapId];
                const map = new ymaps.Map(container.id, {
                    center: coords,
                    zoom: 15
                });
                
                const placemark = new ymaps.Placemark(coords, {
                    hintContent: container.previousElementSibling.querySelector('h2').textContent
                });
                
                map.geoObjects.add(placemark);
            }
        });
    }
});