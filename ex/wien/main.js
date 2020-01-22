/* Wien OGD Beispiel Sehenswürdigkeiten & Spazierwege */

let karte = L.map("map");

const kartenLayer = {
    osm: L.tileLayer("https://{s}.tile.osm.org/{z}/{x}/{y}.png", {
        subdomains: ["a", "b", "c"],
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
    }),
    geolandbasemap: L.tileLayer("https://{s}.wien.gv.at/basemap/geolandbasemap/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoverlay: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoverlay/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgrau: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgrau/normal/google3857/{z}/{y}/{x}.png", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaphidpi: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaphidpi/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmaporthofoto30cm: L.tileLayer("https://{s}.wien.gv.at/basemap/bmaporthofoto30cm/normal/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapgelaende: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapgelaende/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
    }),
    bmapoberflaeche: L.tileLayer("https://{s}.wien.gv.at/basemap/bmapoberflaeche/grau/google3857/{z}/{y}/{x}.jpeg", {
        subdomains: ["maps", "maps1", "maps2", "maps3", "maps4"],
        attribution: 'Datenquelle: <a href="https://www.basemap.at">basemap.at</a>'
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
    })
};

const layerControl = L.control.layers({
    "Geoland Basemap": kartenLayer.geolandbasemap,
    "Geoland Basemap Grau": kartenLayer.bmapgrau,
    "Geoland Basemap Overlay": kartenLayer.bmapoverlay,
    "Geoland Basemap High DPI": kartenLayer.bmaphidpi,
    "Geoland Basemap Orthofoto": kartenLayer.bmaporthofoto30cm,
    "Geoland Basemap Gelände": kartenLayer.bmapgelaende,
    "Geoland Basemap Oberfläche": kartenLayer.bmapoberflaeche,
    "OpenStreetMap": kartenLayer.osm,
    "Stamen Toner": kartenLayer.stamen_toner,
    "Stamen Terrain": kartenLayer.stamen_terrain,
    "Stamen Watercolor": kartenLayer.stamen_watercolor
}).addTo(karte);

kartenLayer.bmapgrau.addTo(karte);

karte.addControl(new L.Control.Fullscreen());

karte.addControl(L.control.scale({
    imperial: false,
    metric: true
}));

//
// 1. Sehenswürdigkeiten mit Suchfeld implementieren
//

function markerErzeugen(feature, latlng) {
    // Marker mit eigenem Icon definieren
    const standortMarker = L.marker(latlng, {
        icon: L.icon({
            iconUrl: "http://www.data.wien.gv.at/icons/sehenswuerdigogd.svg",
            iconSize: [16, 16]
        })
    });

    // Popup hinzufügen
    standortMarker.bindPopup(`
        <h3>${feature.properties.NAME}</h3>
        <p>${feature.properties.BEMERKUNG ? feature.properties.BEMERKUNG : ""}</p>
        <hr>
        <footer><a target="blank" href="${feature.properties.WEITERE_INF}">Weblink</a></footer>
    `);

    // fertigen Marker mit Popup zurückgeben
    return standortMarker;
}
// Funktion zum Laden der Sehenswürdigkeiten definieren
async function standorteLaden(url) {
    // Clustergruppe für die Standorte definieren und zur Karte hinzufügen
    const standorteClusterGruppe = L.markerClusterGroup().addTo(karte);

    // Daten downloaden und in JSON umwandeln
    const antwort = await fetch(url);
    const jsonDaten = await antwort.json();

    // GeoJSON Layer mit Markern zur Clustergruppe hinzufügen
    L.geoJson(jsonDaten, {
        pointToLayer: markerErzeugen
    }).addTo(standorteClusterGruppe);

    // die Clustergruppe als ein-, ausschaltbares Overlay hinzufügen
    layerControl.addOverlay(standorteClusterGruppe, "Sehenswürdigkeiten");

    // das Suchfeld definieren und zur Karte hinzufügen
    new L.Control.Search({
        layer: standorteClusterGruppe,
        propertyName: "NAME",
        zoom: 17,
        initial: false
    }).addTo(karte);

    // auf die Sehenswürdigkeiten zoomen
    karte.fitBounds(standorteClusterGruppe.getBounds());
}
// die Sehenswürdigkeiten laden
standorteLaden("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERPUNKTOGD%20&srsName=EPSG:4326&outputFormat=json");



//
// 2. Spazierwege implementieren
//
function linienPopupErzeugen(feature, layer) {
    layer.bindPopup(`
        <h3>${feature.properties.NAME}</h3>
    `);
}
// Funktion zum Laden der Spazierwege definieren    
async function wegeLaden(url) {
    // Daten downloaden und in JSON umwandeln
    const antwort = await fetch(url);
    const jsonDaten = await antwort.json();

    // Wege in der Farbe Grün mit Popup erzeugen und zur Karte hinzufügen
    const wegeGruppe = L.geoJson(jsonDaten, {
        style: function (feature) {
            return {
                color: "green"
            };
        },
        onEachFeature: linienPopupErzeugen
    }).addTo(karte);

    // Wege  als ein-, ausschaltbares Overlay hinzufügen
    layerControl.addOverlay(wegeGruppe, "Spazierwege");
}
// die Spazierwege laden
wegeLaden("https://data.wien.gv.at/daten/geo?service=WFS&request=GetFeature&version=1.1.0&typeName=ogdwien:SPAZIERLINIEOGD%20&srsName=EPSG:4326&outputFormat=json");