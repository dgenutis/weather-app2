/**
 * @license MIT
 * @fileoverview Menage all routes
 * @copyright Dainius Genutis 2024 All rights reserved
 * @author Dainius Genutis <dainiusgenutis@yahoo.com>
*/


'use strict';

import { updateWeather, error404} from './app.js'
const defaultLocation = "#/weather?lat=55.7127529&lon=21.1350469"; //Klaipėda

const currentLocation = function () {
    window.navigator.geolocation.getCurrentPosition(res => {
        const {latitude, longitude} = res.coords;

        updateWeather(`lat=${latitude}`, `lon=${longitude}`);
    }, err => {
        window.location.hash = defaultLocation;
    });
}



/**
 * @param {string} query Searched query
 */


const searchedLocation = query => updateWeather(... query.split("&"));
// updateWeathe("lat=51.5073219", "lon=-0.1276474")

const routes = new Map ([
    ["/current-location", currentLocation],
    ["/weather", searchedLocation]
]);

const checkHash = function () {
    const requestURL = window.location.hash.slice(1);

    const [route, query] = requestURL.includes ? requestURL.split("?") : [requestURL];

    routes.get(route) ? routes.get(route)(query) : error404();
}

window.addEventListener("hashchange", checkHash);

window.addEventListener("load", function (){
    if (!this.window.location.hash) {
        this.window.location.hash = "#/current-location";
    } else {
        checkHash()
    }
})

