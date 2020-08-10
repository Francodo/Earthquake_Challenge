
var mymap = L.map('mapid').setView([39.5, -98.5], 3);

console.log("working.....coming at you......")

// Add tiles of any choice. 
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
     accessToken: API_KEY
});

// Add satellite map
var satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
     accessToken: API_KEY
});

streets.addTo(mymap);

// We create the dark view tile layer that will be an option for our map.
var dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
var light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
var tectonicPlates = L.tileLayer('https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json', {

});

// Create a base layer that holds both maps.
var baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets,
    "Light" : light,
    "Tectonic Plates" : tectonicPlates

  };

// Create the earthquake layer for the map.
var earthquakes = new L.layerGroup();

// Create the tectronic
var Tectonic_Plates = new L.layerGroup();

// Define the overlay object_1 to add
var overlays_1 = {
    Earthquakes: earthquakes
    
};
// Define the overlay object_2 to add
var overlays_2 =     {
    Tectonic_Plates: tectonicPlates
};

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays_1, overlays_2).addTo(mymap);

// Retrieve the earthquake GeoJSON data for the week.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(mymap);
});


// Retrieve the earthquake GeoJSON data for tectonic plates PB2002_boundaries.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(mymap);
});

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
//function styleInfo(feature) {
//   return {
//      opacity: 1,
//      fillOpacity: 1,
//      fillColor: getColor(feature.properties.mag),
//      color: "#000000",
//      radius: getRadius(feature.properties.mag),
//      stroke: true,
//      weight: 0.5
//    };
//  }

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#ea2c2c";
    }
    if (magnitude > 4) {
      return "#ea822c";
    }
    if (magnitude > 3) {
      return "#ee9c00";
    }
    if (magnitude > 2) {
      return "#eecc00";
    }
    if (magnitude > 1) {
      return "#d4ee00";
    }
    return "#98ee00";
  }

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 3;
    }
    return magnitude * 4;
  }

  function styleInfo(feature) {
    return {
      opacity: 3,
      fillopacity: 3,
      fillColor: getColor(feature.properties.mag),
      color: "#fffae42",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }


var data = data;
// Creating a GeoJSON layer with the retrieved data.
L.geoJson(data, {
    
// We turn each feature into a circleMarker on the map.
    
    pointToLayer: function(feature, latlng) {
                  console.log(data);
                  return L.circleMarker(latlng);
            },

// We set the style for each circleMarker using our styleInfo function
    style: styleInfo,
    onEachFeature: function(feature, layer) {
    layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);
    }

}).addTo(earthquakes);

earthquakes.addTo(mymap);


// Custom legend control. Create a legend control object.
var legend = L.control({position: 'bottomright'});

legend.onAdd = function () {

    const magnitudes = [0, 1, 2, 3, 4, 5];
    const colors = [
      "#98ee00",
      "#d4ee00",
      "#eecc00",
      "#ee9c00",
      "#ea822c",
      "#ea2c2c"
    ];

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 10, 20, 50, 100, 200, 500, 1000],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitudes.length; i++) {
        console.log(colors[i]);
        div.innerHTML +=
          "<i style='background: " + colors[i] + "'></i> " +
          magnitudes[i] + (magnitudes[i + 1] ? "&ndash;" + magnitudes[i + 1] + "<br>" : "+");
    }

    return div;
};

legend.addTo(mymap);

//});