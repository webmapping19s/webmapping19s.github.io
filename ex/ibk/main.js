// Innsbruck Beispiel

let karte = L.map("map");

const kartenLayer = {
    osm : L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains : ["a","b","c"],
        attribution : 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap : L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm : L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche : L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains : ["maps","maps1","maps2","maps3","maps4"],
        attribution : 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    stamen_toner : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains : ["a","b","c"],
        attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains : ["a","b","c"],
        attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor : L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains : ["a","b","c"],
        attribution : 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    })
};

kartenLayer.bmapgelaende.addTo(karte);

L.control.layers({
    "Geoland Basemap" : kartenLayer.geolandbasemap,
    "Geoland Basemap Grau" : kartenLayer.bmapgrau,
    "Geoland Basemap Overlay" : kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI" : kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto" : kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände" : kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche" : kartenLayer.bmapoberflaeche,
    "OpenStreetMap" : kartenLayer.osm,
    "Stamen Toner" : kartenLayer.stamen_toner,
    "Stamen Terrain" : kartenLayer.stamen_terrain,
    "Stamen Watercolor" : kartenLayer.stamen_watercolor
}).addTo(karte);

karte.setView(
    [47.267222, 11.392778],15
);

//console.log(SPORTSTAETTEN);

for (let staette of SPORTSTAETTEN) {
    //console.log(staette);
    // Piktogramm definieren
    let piktogramm = L.icon({
        iconUrl : `icons/icon_${staette.icon}_schwarz_auf_weiss_250px.png`,
        iconSize : [32, 32],    // verkleinern auf 32 x 32 Pixel
        iconAnchor: [16, 32],   // Mitte Basis
        popupAnchor: [0, -34]   // Mitte Oben mit 2 Pixel Abstand
    });

    // Marker zeichnen
    let positionsMarker = L.marker(
        [staette.lat, staette.lng], {
            icon : piktogramm
        }
    ).addTo(karte);

    // Popup hinzufügen
    positionsMarker.bindPopup(`
        <h3>${staette.name}</h3>
        <p>${staette.typ}</p>
    `);

}
