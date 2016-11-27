'use strict';

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5
    });

    var marker1 = new google.maps.Marker({
        position: {
            lat: 37.646026611328125,
            lng: 55.75184939173528
        },
        map: map,
    });

    var marker1 = new google.maps.Marker({
        position: {
            lat: 39.250030517578125,
            lng: 51.67255514839676
        },
        map: map,
    });

    var marker1 = new google.maps.Marker({
        position: {
            lat: 39.7349739074707,
            lng: 43.60823944964323
        },
        map: map,
    });
}