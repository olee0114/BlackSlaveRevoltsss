let wtopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});

let wphys = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
  maxZoom: 8
});

let map = L.map('map', {
  layers: [wphys, wtopo]
});

$.getJSON("assets/SlaveRevolts.geojson", function(data){
  
  let fourLayer = L.geoJson(data, {

  filter: function(feature, layer) {
    return (feature.properties["Century"] === "1400");},

  pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature),
      });
    },
    onEachFeature: PointActions
    
  });

   fourLayer.addTo(map);

});

$.getJSON("assets/SlaveRevolts.geojson", function(data){

 let fiveLayer = L.geoJson(data, {

  filter: function(feature, layer) {
    return (feature.properties["Century"] === "1500");},

  pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature),
      });
    },
    onEachFeature: PointActions
    
  });

   fiveLayer.addTo(map);

});

$.getJSON("assets/SlaveRevolts.geojson", function(data){


  let sixLayer = L.geoJson(data, {

  filter: function(feature, layer) {
    return (feature.properties["Century"] === "1600");},

  pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature),
      });
    },
    onEachFeature: PointActions
    
  });

 sixLayer.addTo(map);

});

$.getJSON("assets/SlaveRevolts.geojson", function(data){


  let sevenLayer = L.geoJson(data, {

  filter: function(feature, layer) {
    return (feature.properties["Century"] === "1700");},

  pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature),
      });
    },
    onEachFeature: PointActions
    
  });

  sevenLayer.addTo(map);

});

$.getJSON("assets/SlaveRevolts.geojson", function(data){


  let eightLayer = L.geoJson(data, {

  filter: function(feature, layer) {
    return (feature.properties["Century"] === "1800");},

  pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature),
      });
    },
    onEachFeature: PointActions
    
  });

 eightLayer.addTo(map);

});

$.getJSON("assets/SlaveRevolts.geojson", function(data){


  let nineLayer = L.geoJson(data, {

  filter: function(feature, layer) {
    return (feature.properties["Century"] === "1900");},

  pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature),
      });
    },
    onEachFeature: PointActions
    
  });

 nineLayer.addTo(map);

});

// let revoltsites = L.layerGroup([fourLayer, fiveLayer, sixLayer, sevenLayer, eightLayer, nineLayer);

map.setView([16.23866202852162, -2.362826680216191], 3);

let baseMaps = {
    "Physical": wphys,
    "Boundaries/Places": wtopo
};

// let overlayMaps = {
//     "1400s": fourLayer,
//     "1500s": fiveLayer,
//     "1600s": sixLayer,
//     "1700s": sevenLayer,
//     "1800s": eightLayer,
//     "1900+": nineLayer
// };

let layerControl = L.control.layers(baseMaps).addTo(map);

// $.getJSON("assets/SlaveRevolts.geojson", function(data){
  
  
//   let revoltsites = L.geoJson(data, {

//     pointToLayer: function(feature, latlng) {
//       return new L.CircleMarker(latlng, {
//         radius:8,
//         color: getColor(feature),
//       });
//     },
//     onEachFeature: PointActions
    
//   });

//   revoltsites.addTo(map);

// });


let CurrentPoint; //initialize variable that will hold the current point value

function PointActions (feature, layer) {

    let SB = document.getElementById("sidebar"), displayValue = "";
        
        layer.on('click', function (e) {
            let NewPoint = feature.properties["Description"]; //declare variable that holds the new point value when a new click event happens

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

        layer.on('click', function (e) {
          let SB = document.getElementById("sidebar");
            SB.innerHTML = '<html>' + '<h4 style="margin-top: 1rem; margin-bottom: 1rem;"><strong>' + feature.properties["Place"] +
            '</strong></h4>' + '<h5 style="margin-top: 0rem;"><i>' + feature.properties["Year to Display"] + '</i></h5><h3>' + feature.properties["Revolt Name"] +'</h3>'
           + '<h2 style="text-align: left;">' + feature.properties["Description"] + '</h2>' + '</html>';
        });

        layer.on('click', function(e) {
            map.setView(e.latlng, 6);
        });

    }


function getColor(feature){
  switch (feature.properties["Century"]) {
            case '1400':
              return  'black';
            case '1500':
              return  'green';
            case '1600':
              return 'green';
            case '1700':
              return 'yellow';
            case '1800':
              return 'red';
            case '1900':
              return 'black';
            default:
              return 'black';
          }
        } 



function myFunction(feature){
  if(feature.properties.type == "person"){}
  
}