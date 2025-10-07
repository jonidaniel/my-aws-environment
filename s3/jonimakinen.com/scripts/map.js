// Initiate Leaflet maps
const map1 = L.map("map1");
const map2 = L.map("map2");
const map3 = L.map("map3");

// Define map bounds
const southWest = L.latLng(-90, -180);
const northEast = L.latLng(90, 180);
const bounds = L.latLngBounds(southWest, northEast);

/** Creates popups for map markers
 *
 * @param {map1, map2, or map3} map
 * @param {Feature (here: meteorite marker) on GeoJSON layer} meteorite
 * @param {Total mass of meteorites} totalMass
 * @returns Popup for marker
 */
function getPopup(map, meteorite, totalMass) {
  // Get current HTML file name to find out webpage's language
  const path = window.location.pathname;
  const page = path.split("/").pop();

  // English popups for map1
  if (page == "meteorites-en.html" && map._container.id == "map1") {
    popup =
      "Name: " +
      meteorite.properties.name +
      "<br />Year: " +
      meteorite.properties.year +
      "<br />Mass: " +
      meteorite.properties["mass (g)"] +
      " g<br />Latitude: " +
      meteorite.geometry.coordinates[1] +
      "<br />Longitude: " +
      meteorite.geometry.coordinates[0];
    // Finnish popups for map1
  } else if (page == "meteorites-fi.html" && map._container.id == "map1") {
    popup =
      "Nimi: " +
      meteorite.properties.name +
      "<br />Vuosi: " +
      meteorite.properties.year +
      "<br />Massa: " +
      meteorite.properties["mass (g)"] +
      " g<br />Leveysaste: " +
      meteorite.geometry.coordinates[1] +
      "<br />Pituusaste: " +
      meteorite.geometry.coordinates[0];
    // English popups for map2
  } else if (page == "meteorites-en.html" && map._container.id == "map2") {
    popup =
      "Mean of Meteorite Locations" +
      "<br />Latitude: " +
      meteorite.geometry.coordinates[1] +
      "<br />Longitude: " +
      meteorite.geometry.coordinates[0];
    // Finnish popups for map2
  } else if (page == "meteorites-fi.html" && map._container.id == "map2") {
    popup =
      "Meteoriittien sijaintien keskiarvo" +
      "<br />Leveysaste: " +
      meteorite.geometry.coordinates[1] +
      "<br />Pituusaste: " +
      meteorite.geometry.coordinates[0];
    // English popups for map3
  } else if (page == "meteorites-en.html" && map._container.id == "map3") {
    popup =
      "Weighted Mean of Meteorite Locations" +
      "<br />Total mass: " +
      meteorite.properties.mass_total +
      " g<br />Latitude: " +
      meteorite.geometry.coordinates[1] +
      "<br />Longitude: " +
      meteorite.geometry.coordinates[0];
    // Finnish popups for map3
  } else if (page == "meteorites-fi.html" && map._container.id == "map3") {
    popup =
      "Meteoriittien sijaintien painotettu keskiarvo" +
      "<br />Yhteismassa: " +
      meteorite.properties.mass_total +
      " g<br />Leveysaste: " +
      meteorite.geometry.coordinates[1] +
      "<br />Pituusaste: " +
      meteorite.geometry.coordinates[0];
  }

  return popup;
}

/** Adds markers to the map
 *
 * @param {map1, map2, or map3} map
 * @param {GeoJSON formed from Shapefile; contains meteorite locations} geoJson
 */
function addGeoJSONLayer(map, geoJson) {
  // Construct GeoJSON layer
  const layer = L.geoJSON(geoJson, {
    // Bind popup text string to each meteorite marker
    onEachFeature: (feature, layer) => {
      const popup = getPopup(map, feature);
      layer.bindPopup(popup);
    },

    // Create modified markers
    pointToLayer: (feature, latLng) => {
      // Red marker
      if (map._container.id == "map2") {
        var redIcon = L.icon({
          iconUrl: "../assets/icons/red-marker.png",
          shadowUrl: "../assets/icons/marker-shadow.png",

          iconAnchor: [12, 41], // Point of icon which will correspond to marker's location
          iconSize: [25, 41],
          popupAnchor: [1, -34], // Point from which popup should open relative to iconAnchor
          shadowSize: [41, 41],
          tooltipArchor: [16, -28],
        });
        return L.marker([latLng.lat, latLng.lng], {
          icon: redIcon,
        }).addTo(map);

        // Green marker
      } else if (map._container.id == "map3") {
        var greenIcon = L.icon({
          iconUrl: "../assets/icons/green-marker.png",
          shadowUrl: "../assets/icons/marker-shadow.png",

          iconAnchor: [12, 41], // Point of icon which will correspond to marker's location
          iconSize: [25, 41],
          popupAnchor: [1, -34], // Point from which popup should open relative to iconAnchor
          shadowSize: [41, 41],
          tooltipArchor: [16, -28],
        });
        return L.marker([latLng.lat, latLng.lng], {
          icon: greenIcon,
        }).addTo(map);

        // Return default marker
      } else return L.marker([latLng.lat, latLng.lng]).addTo(map);
    },
  }).addTo(map);

  // Fit the map bounds to the layer bounds (i.e. align them)
  map.fitBounds(layer.getBounds());
}

/** Creates a Leaflet map
 *
 * @param {map1, map2, or map3} map
 * @param {GeoJSON formed from Shapefile; contains meteorite locations} geoJson
 */
function createMap(map, geoJson) {
  // Set map bounds
  map.setMaxBounds(bounds);
  // Always pan inside map bounds
  map.on("drag", function () {
    map.panInsideBounds(bounds, { animate: false });
  });
  // Add a satellite tile layer to the map
  L.tileLayer("http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
    attribution: "&copy; Google Maps; meteorite data by NASA",
    maxZoom: 20,
    noWrap: true,
    subdomains: ["mt0", "mt1", "mt2", "mt3"],
  }).addTo(map);

  addGeoJSONLayer(map, geoJson);
}

/** Loads a Shapefile from s3://meteorite-landings,
 * simultaneously turning it into a GeoJSON object
 *
 * @param {S3 bucket object name} object
 * @returns GeoJSON object formed from Shapefile
 */
async function loadShapefile(object) {
  // Load meteorite data from bucket using Shapefile.js
  const geoJson = await shp(
    `https://meteorite-landings.s3.eu-north-1.amazonaws.com/${object}`
  );

  return geoJson;
}

// Load compressed Shapefiles and create maps from them
loadShapefile("meteorites.zip")
  .then((geoJson) => {
    createMap(map1, geoJson);
  })
  .catch((error) => {
    console.log(
      "Error when loading https://meteorite-landings.s3.eu-north-1.amazonaws.com/meteorites.zip"
    );
    console.log(error);
  });
loadShapefile("meteorites_mean.zip")
  .then((geoJson) => {
    createMap(map2, geoJson);
  })
  .catch((error) => {
    console.log(
      "Error when loading https://meteorite-landings.s3.eu-north-1.amazonaws.com/meteorites_mean.zip"
    );
    console.log(error);
  });
loadShapefile("meteorites_mean_weighted.zip")
  .then((geoJson) => {
    createMap(map3, geoJson);
  })
  .catch((error) => {
    console.log(
      "Error when loading https://meteorite-landings.s3.eu-north-1.amazonaws.com/meteorites_mean_weighted.zip"
    );
    console.log(error);
  });
