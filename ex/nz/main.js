// Skript für Neuseelandreise

const div = document.getElementById("map");
const breite = div.getAttribute("data-lat");
const laenge = div.getAttribute("data-lng");
const titel = div.getAttribute("data-title");

// Karte initialisieren
let karte = L.map("map");

// Kartenhintergrund Layer definieren
const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    stamen_toner: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_terrain: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.'
    }),
    stamen_watercolor: L.tileLayer("https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.jpg", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.'
    }),
    nz_topo50: L.tileLayer("http://tiles-{s}.data-cdn.linz.govt.nz/services;key=ddcf0e958ca74fb49dbb402fa58e823c/tiles/v4/layer=50767/EPSG:3857/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c", "d"],
        attribution: '<a href="https://data.linz.govt.nz/layer/50767-nz-topo50-maps/">NZ Topo50 Maps</a> (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)'
    }),
    nz_aerial: L.tileLayer("http://tiles-{s}.data-cdn.linz.govt.nz/services;key=ddcf0e958ca74fb49dbb402fa58e823c/tiles/v4/set=4702/EPSG:3857/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c", "d"],
        attribution: '<a href="https://data.linz.govt.nz/set/4702-nz-aerial-imagery/">NZ Aerial Imagery</a> (<a href="https://creativecommons.org/licenses/by/4.0/">CC BY 4.0</a>)'
    }),
};

// Topografische Karte anzeigen
kartenLayer.nz_topo50.addTo(karte);

// Auswahlmenü für Kartenhintergrund Layer hinzufügen
L.control.layers({
    "OpenStreetmap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor,
    "Neuseeland Topo50": kartenLayer.nz_topo50,
    "Neuseeland Luftbild": kartenLayer.nz_aerial,
}).addTo(karte)

// auf Ausschnitt zoomen
karte.setView(
    [breite, laenge],
    13
);

//Positionsmarker setzen
let pin = L.marker(
    [breite, laenge]
).addTo(karte);

//Popup zum Pin hängen
pin.bindPopup(titel).openPopup();

// Fullscreen control hinzufügen
karte.addControl(new L.Control.Fullscreen());

// Koordinatenanzeige in der Karte aktivieren
let koordAnzeige = new L.Control.Coordinates().addTo(karte);
karte.on("click", function (event) {
    koordAnzeige.setCoordinates(event);
});

// Koordinatenazeige in der Adressleiste aktivieren
new L.Hash(karte);