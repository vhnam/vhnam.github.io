'use strict';

function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 5,
        center: {
            lng: 39.6441650390625,
            lat: 49.83798245308484
        },
    });

    var marker1 = new google.maps.Marker({
        position: {
            lng: 37.646026611328125,
            lat: 55.75184939173528
        },
        map: map,
    });

    var marker2 = new google.maps.Marker({
        position: {
            lng: 39.250030517578125,
            lat: 51.67255514839676
        },
        map: map,
    });

    var marker3 = new google.maps.Marker({
        position: {
            lng: 39.7349739074707,
            lat: 43.60823944964323
        },
        map: map,
    });
}