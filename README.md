# Earthquake_Challenge
Francis Odo

Background 
This project demonstrates the application of data in creating maps. In particular, it shows how to map earthquake data in the very best visualization format using HTML, JavaScript and CSS programing language and techniques. 
Objective
The objective is to create a three-tiered layer map that presents a choice menu for the viewer using the GeoJSON formatted tectonic plates data from Github. 
Tools/Environment
Our development environment is Visual Studio Code. Programming is done using:
•	HTML
•	JavaScript
•	CSS
Data is supplied from a Github repository for Earthquakes tectonic plates in GeoJSON format (GeoJSON/PB2002_boundaries.json). Other sources of support material include (CDN – Mapbox, Leaflets)
Code Plan
JAVASCRIPT
•	Create a map variable with “mapid” and Geo-Location coordinates.
•	Create a variable for the tile layer for the base map
•	Create a variable for the satellite layer and add to the base map structure
•	Create a variable for dark view and add to map
•	Create a variable for light view and add to map
•	Create a variable for the tectonic layer with the link or url for the data 
•	Create a styling function with the necessary parameters (opacity, fillcolor, color, etc.)
•	Apply D3.json to retrieved data
•	Create and add circle and pop markers 
•	Create overlays (for satellite and tectonic plates)
HTML
•	Format HTML template
•	Include links for stylesheet
•	Include links for logic.js and config.js 
CSS
•	Create a style.css file
Approach
•	Create map image in HTML and display in web browser.
•	Folder arrangement
Risk
•	Map image requires a significant amount of computer memory. There may be a noticeable delay as the map page renders.
•	Coloring can be improved
Conclusion
The process of creating maps with earthquake data is successfully demonstrated as required. The code will need some improvement for better performance. 
Here are some sample screen shots:

Note: In order to test any of the code, remember to modify the path for each resource files in index.html file accordingly.
