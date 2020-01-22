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

kartenLayer.bmaphidpi.addTo(karte);

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

karte.setView(
    [47.267222, 11.392778], 15
);

async function loadStations() {
    const response = await fetch("https://aws.openweb.cc/stations");
    const stations = await response.json();
    const awsTirol = L.featureGroup();
    L.geoJson(stations)
        .bindPopup(function (layer) {
            // console.log("Layer: ", layer);
            const date = new Date(layer.feature.properties.date);
            // console.log("Datum: ", date, layer.feature.properties.date);
            return `
                <h4>${layer.feature.properties.name}</h4>
                Höhe: ${layer.feature.geometry.coordinates[2]} m<br>
                Temperatur: ${layer.feature.properties.LT} °C<br>
                Datum: ${date.toLocaleDateString("de-AT")} ${date.toLocaleTimeString("de-AT")} <br>
                Windgeschwindigkeit: 
                ${layer.feature.properties.WG ? layer.feature.properties.WG + ' km/h': 'keine Daten'}
                <hr>
                <footer>Quelle: Land Tirol - <a href="https://data.tirol.gv.at">data.tirol.gv.at</a></footer>
            `;
        }).addTo(awsTirol);
    karte.fitBounds(awsTirol.getBounds());
    layerControl.addOverlay(awsTirol, "Wetterstationen Tirol");




let farben = [
    [0,"blau"],
    [5,"gelb"],
    [10,"rot"]
];
farben.length;
farben[2][1]
for (let i=0; i<farben.length; i++) {
    console.log(farben[i]);
}









    // Windlayer hinzufügen
    const windLayer = L.featureGroup();
    const windPalette = [
        [20.37, "#00b900"], // 3 Bft - schwache Brise
        [29.63, "#10cd24"], // 4 Bft - mäßige Brise
        [40.74, "#72d475"], // 5 Bft - frische Brise, frischer Wind
        [51.86, "#fed6d3"], // 6 Bft - starker Wind
        [62.97, "#ffb6b3"], // 7 Bft - steifer Wind
        [75.93, "#ff9e9a"], // 8 Bft - stürmischer Wind
        [88.9, "#ff8281"], // 9 Bft - Sturm
        [103.71, "#ff6160"], // 10 Bft - schwerer Sturm
        [118.53, "#ff453c"], // 11 Bft - orkanartiger Sturm
        [999, "#ff200e"], // >= 11 Bft - Orkan
    ];
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.WR) {
                let color = windPalette[windPalette.length - 1][1];
                for (let i = 0; i < windPalette.length; i++) {
                    //console.log(feature.properties.WG)
                    if (feature.properties.WG < windPalette[i][0]) {
                        color = windPalette[i][1];
                        break;
                    }
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<i style="color: ${color};transform: rotate(${feature.properties.WR}deg)" class="fas fa-arrow-circle-up fa-2x"></i>`
                    })
                });
            }
        }
    }).addTo(windLayer);
    layerControl.addOverlay(windLayer, "Windrichtung");
    //windLayer.addTo(karte);

    // Temperaturlayer hinzufügen
    const temperaturLayer = L.featureGroup();
    const temperaturPalette = [
        [-28, "#646664"], // Grau
        [-26, "#8c8a8c"],
        [-24, "#b4b2b4"],
        [-22, "#cccecc"],
        [-20, "#e4e6e4"],
        [-18, "#772d76"], // Lila
        [-16, "#b123b0"],
        [-14, "#d219d1"],
        [-12, "#ff00ff"],
        [-10, "#ff94ff"],
        [-8, "#3800d1"], // Dunkelblau
        [-6, "#325afe"],
        [-4, "#2695ff"],
        [-2, "#00cdff"],
        [0, "#00fffe"],
        [2, "#007800"], // Dunkelgrün
        [4, "#009d00"],
        [6, "#00bc02"],
        [8, "#00e200"],
        [10, "#00ff00"],
        [12, "#fcff00"], // Gelb
        [14, "#fdf200"],
        [16, "#fde100"],
        [18, "#ffd100"],
        [20, "#ffbd00"],
        [22, "#ffad00"],
        [24, "#ff9c00"],
        [26, "#ff7800"],
        [28, "red"], // Rot
        [30, "#f30102"],
        [32, "#d20000"],
        [34, "#c10000"],
        [36, "#b10000"],
        [38, "#a10000"],
        [40, "#900000"],
        [42, "#770100"],
        [44, "#5f0100"],
        [46, "#460101"],
        [99, "#2e0203"], // >= 46°
    ];

    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.LT) {
                // Farbe des letzten Eintrags der Farbpalette als Standardfarbe setzen 
                let color = temperaturPalette[temperaturPalette.length - 1][1];

                // jeden Temperaturwert mit den Schwellen der Farbpalette vergleichen
                for (let i = 0; i < temperaturPalette.length; i++) {
                    //console.log(farbPalette[i],feature.properties.LT);
                    if (feature.properties.LT < temperaturPalette[i][0]) {
                        // der Temperaturwert ist kleiner als die Schwelle -> die entsprechende Farbe zuweisen
                        color = temperaturPalette[i][1];

                        // Überprüfung beenden, weil die Farbe bereits ermittelt ist
                        break;
                    } else {
                        // weiter zum nächsten Schwellenwert
                    }
                }
                // Marker mit Temperaturwert und Hintergrundfarbe zurückgeben
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.LT}</div>`
                    })
                });
            }
        }
    }).addTo(temperaturLayer);
    layerControl.addOverlay(temperaturLayer, "Temperatur");
    //temperaturLayer.addTo(karte);

    // Feuchtelayer hinzufügen
    const feuchteLayer = L.featureGroup();
    const feuchtePalette = [
        [30, "#EEE"],
        [40, "#DDD"],
        [50, "#C6C9CE"],
        [60, "#BBB"],
        [70, "#AAC"],
        [80, "#9998DD"],
        [90, "#8788EE"],
        [999, "#7677E1"], // >= 90%
    ];
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.RH) {
                let color = feuchtePalette[feuchtePalette.length - 1][1];
                for (let i = 0; i < feuchtePalette.length; i++) {
                    //console.log(feature.properties.RH)
                    if (feature.properties.RH < feuchtePalette[i][0]) {
                        color = feuchtePalette[i][1];
                        break;
                    }
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.RH}</div>`
                    })
                });
            }
        }
    }).addTo(feuchteLayer);
    layerControl.addOverlay(feuchteLayer, "Relative Feuchte (%)");
    //feuchteLayer.addTo(karte);

    // Schneelayer hinzufügen
    const schneeLayer = L.featureGroup();
    const schneePalette = [
        [10, "#69723d"],
        [20, "#ff7b00"],
        [30, "#42ef42"],
        [50, "#63ffc6"],
        [75, "#21bdff"],
        [100, "#396bbd"],
        [150, "#ff63ff"],
        [200, "#ffff00"],
        [250, "#ffbd00"],
        [300, "#ff0084"],
        [400, "#7b0084"],
        [999, "#000000"],
    ];
    L.geoJson(stations, {
        pointToLayer: function (feature, latlng) {
            if (feature.properties.HS) {
                let color = schneePalette[schneePalette.length - 1][1];
                for (let i = 0; i < schneePalette.length; i++) {
                    //console.log(feature.properties.HS)
                    if (feature.properties.HS < schneePalette[i][0]) {
                        color = schneePalette[i][1];
                        break;
                    }
                }
                return L.marker(latlng, {
                    icon: L.divIcon({
                        html: `<div class="temperaturLabel" style="background-color:${color}">${feature.properties.HS}</div>`
                    })
                });
            }
        }
    }).addTo(schneeLayer);
    layerControl.addOverlay(schneeLayer, "Schneehöhe (cm)");
    schneeLayer.addTo(karte);

}
loadStations();