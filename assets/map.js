
//init map
const map = L.map('map', {
    center: [16.23866202852162, -2.362826680216191],
    zoom: 3
});

//define wtopo (topographic w labels) tile layer
var wtopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

wtopo.addTo(map);

//define wphys (physical map) tile layer
var wphys = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
maxZoom: 8
});

wphys.addTo(map);

    
//define and draw 1400 layer markers with color swatch            
var fourLayer = L.geoJson(testset1, {

filter: function(feature, layer) {
    return (feature.properties["century"] === "1400");},

pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
        radius:8,
        color: 'black',
    });
    },
    onEachFeature: PointActions
});

fourLayer.addTo(map);

//define and draw 1500 layer markers with color swatch            
var fiveLayer = L.geoJson(testset1, {

filter: function(feature, layer) {
    return (feature.properties["century"] === "1500");},

pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
        radius:8,
        color: 'green',
    });
    },
    onEachFeature: PointActions
});

fiveLayer.addTo(map);

//define and draw 1600 layer markers with color swatch            
var sixLayer = L.geoJson(testset1, {

filter: function(feature, layer) {
    return (feature.properties["century"] === "1600");},

pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
        radius:8,
        color: 'white',
    });
    },
    onEachFeature: PointActions
    
});

sixLayer.addTo(map);

//define and draw 1700 layer markers with color swatch            
var sevenLayer = L.geoJson(testset1, {

filter: function(feature, layer) {
    return (feature.properties["century"] === "1700");},

pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
        radius:8,
        color: 'orange',
    });
    },
    onEachFeature: PointActions
    
});

sevenLayer.addTo(map);

//define and draw 1800 layer markers with color swatch            
var eightLayer = L.geoJson(testset1, {

filter: function(feature, layer) {
    return (feature.properties["century"] === "1800");},

pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
        radius:8,
        color: 'red',
    });
    },
    onEachFeature: PointActions
});

eightLayer.addTo(map);

//define and draw 1900+ layer markers with color swatch            
var nineLayer = L.geoJson(testset1, {

filter: function(feature, layer) {
    return (feature.properties["century"] === "1900");},

pointToLayer: function(feature, latlng) {
    return new L.CircleMarker(latlng, {
        radius:8,
        color: 'yellow',
    });
    },
    onEachFeature: PointActions
});

nineLayer.addTo(map);


//tile layer control
var baseMaps = {
    "Topographical Map": wtopo,
    "Physical Map": wphys
};

var overlayMaps = {
    "1400s": fourLayer,
    "1500s": fiveLayer,
    "1600s": sixLayer,
    "1700s": sevenLayer,
    "1800s": eightLayer,
    "1900s+": nineLayer
    //"Revolts data": revoltsData
};

//add a layer control element to the map in the bottom left
var layerControl = L.control.layers(baseMaps, overlayMaps, { position: 'bottomleft' }).addTo(map);

let CurrentPoint; //initialize variable that will hold the current point value

//close the sidebar when "X" is clicked
function closeSidebar(){
    let SB = document.getElementById("sidebar");
    SB.style.display = "none";
  }

//actions upon marker click
function PointActions (feature, layer) {

    let SB = document.getElementById("sidebar"), displayValue = "";
        
        layer.on('click', function (e) {
            let NewPoint = feature.properties["unique_identifier"]; //declare variable that holds the new point value when a new click event happens

            //if sidebar is hidden, set displayValue to "".
            //save the value of newPoint in the currentPoint variable
            if (SB.style.display == "none"){
                displayValue = "";
                CurrentPoint = NewPoint;
                }
            //if sidebar is visible + currentPoint doesn't equal newPoint, that means a new point has been clicked
            //therefore hide the sidebar
            if (SB.style.display == "" && CurrentPoint !== NewPoint){
                displayValue = "";
                }
            //if the sidebar is visible and currentPoint is the same as newPoint, the same point has been clicked twice
            //therefore, hide the sidebar
            if (SB.style.display == "" && CurrentPoint == NewPoint){
                displayValue = "none";
            }
            //outside of the if-statement, set the sidebar.style.display equal to displayValue
            SB.style.display = displayValue;
        });

        //display point features in their respective divs
        layer.on('click', function (e) {
        document.getElementById("sidebar-place").innerHTML = feature.properties["place"] + " (" + feature.properties["latitude"] + ", " + feature.properties["longitude"] + ") ";
        document.getElementById("sidebar-year").innerHTML = feature.properties["year_to_display"];
        document.getElementById("sidebar-name").innerHTML = feature.properties["revolt_name"];
        document.getElementById("sidebar-desc").innerHTML = feature.properties["description"];
        document.getElementById("sidebar-sources").innerHTML = feature.properties["citations"];
        });

        layer.on('click', function(e) {
            map.setView(e.latlng, 6);
        });

    }