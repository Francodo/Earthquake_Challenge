
var mymap = L.map('mapid').setView([39.5, -98.5], 3);

console.log("working.....coming at you......")

// Add tiles of any choice. 
var streets = L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
     accessToken: API_KEY
});

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


// Create a base layer that holds both maps.
var baseMaps = {
    "Streets": streets,
    "Satellite Streets": satelliteStreets
  };

// Create the earthquake layer for the map.
var earthquakes = new L.layerGroup();

// Define the overlay object to add
var overlays = {
    Earthquakes: earthquakes
};


// Create the map object with center, zoom level and default layer.
//var mymap = L.map('mapid', {
//	center: [44.0, -80.0],
//	zoom: 2,
//	layers: [streets]
//});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(mymap);


// Accessing the airport GeoJSON URL
//var airportData = "https://raw.githubusercontent.com/Francodo/Mapping_Earthquakes/master/majorAirports.json";

// Accessing the Toronto airline routes GeoJSON URL.
//var torontoData = "https://raw.githubusercontent.com/Francodo/Mapping_Earthquakes/master/torontoRoutes.json";

// Accessing the Toronto neighborhoods GeoJSON URL.
//var torontoHoods = "https://raw.githubusercontent.com/Francodo/Mapping_Earthquakes/master/torontoNeighborhoods.json";

// Get data from cities.js
//var cityData = cities; 
// Next, we need to iterate through each city array

// Loop through the cities array and create one marker for each city.
// Add each location to the map with addTo() function and pass mymap ar argument
// Get coordinates of each city with (city.location)
//.forEach(function(city) {
//    console.log(city)
//    L.circleMarker(city.location, {
//        radius: city.population/100000
//    })                 
//    .bindPopup("<h2>" + city.city + ", " + city.state + "</h2> <hr> <h3>Population " + city.population + "</h3>")
//    .addTo(mymap);
//});

// Adding line to a map requires a one dimensional array with two element:Latitute and longitude
// In this example starting point is Los Angeles International Airport((LAX); ending point is San Francisco
// International Airport (SFO) 
// Coordinates for each point to be used in the line.
var line = [
    [33.9416, -118.4085],
    [37.6213, -122.3790],
    [40.7899, -111.9791],
    [47.4502, -122.3088]
  ];
// Create a polyline using the line coordinates and make the line red.
//L.polyline(line, {
//    color: "yellow"
//  }).addTo(mymap);

// Adding GeoJSON
// Add GeoJSON data.

/*var  sanFranAirport =
{"type":"FeatureCollection","features":[{
    "type":"Feature",
    "properties":{
        "id":"3469",
        "name":"San Francisco International Airport",
        "city":"San Francisco",
        "country":"United States",
        "faa":"SFO",
        "icao":"KSFO",
        "alt":"13",
        "tz-offset":"-8",
        "dst":"A",
        "tz":"America/Los_Angeles"},
        "geometry":{
            "type":"Point",
            "coordinates":[-122.375,37.61899948120117]}}
]};
*/
// Grabbing our GeoJSON data.
//L.geoJSON(sanFranAirport).addTo(mymap);

// Grabbing our GeoJSON data.
//L.geoJson(sanFranAirport, {
//    // We turn each feature into a marker on the map.
//    pointToLayer: function(feature, latlng) {
//      console.log(feature);
//      return L.marker(latlng)
//     .bindPopup("<h2>" + feature.properties.city + "</h2>");
//    }
//  }).addTo(mymap);

//  L.geoJson(sanFranAirport, {
//    onEachFeature: function(feature, layer) {
//    console.log(layer)
//      layer.bindPopup();
//     }
//}).addTo(mymap);

// Create a style for the lines.
//var myStyle = {
//	color: "#ffffa1",
//	weight: 2
//}

// Grabbing our GeoJSON data.
//d3.json(airportData).then(function(data) {
//    console.log(data);
// Creating a GeoJSON layer with the retrieved data.
//L.geoJson(data).addTo(mymap);
//});

// Grabbing our GeoJSON data for torontoRoutes.json.
//d3.json(torontoData).then(function(data) {
//  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
//L.geoJson(data).addTo(mymap);

//});

// Grabbing our GeoJSON data for torontoHoods.json.
//d3.json(torontoHoods).then(function(data) {
//  console.log(data);

// Creating a GeoJSON layer with the retrieved data.
//L.geoJSON(data).addTo(mymap);

//});

// Retrieve the earthquake GeoJSON data.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(data) {
  // Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data).addTo(mymap);
});

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
  }

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
      return 1;
    }
    return magnitude * 4;
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