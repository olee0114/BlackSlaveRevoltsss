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


map.setView([16.23866202852162, -2.362826680216191], 3);


let baseMaps = {
    "Physical": wphys,
    "Boundaries/Places": wtopo
};

let layerControl = L.control.layers(baseMaps).addTo(map);

L.tileLayer.provider('Esri.WorldPhysical','Esri.WorldTopoMap').addTo(map);

$.getJSON("assets/SlaveRevolts.geojson", function(data){
  
  
  let revoltsites = L.geoJson(data, {
    
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature),
      });
    },
    onEachFeature: PointActions
    
  });

  revoltsites.addTo(map);

});

let CurrentPoint;

function PointActions (feature, layer) {

    let SB = document.getElementById("sidebar"), displayValue = "";
        
        layer.on('click', function (e) {
          let NewPoint = feature.properties["Description"];
             if (SB.style.display == "none") {
              console.log('no point yet!')
              SB.innerHTML = '<html>' + '<h4 style="margin-top: 1rem; margin-bottom: 1rem;"><strong>' + feature.properties["Place"] +
            '</strong></h4>' + '<h5 style="margin-top: 0rem;"><i>' + feature.properties["Year to Display"] + '</i></h5><h3>' + feature.properties["Revolt Name"] +'</h3>'
           + '<h2 style="text-align: left;">' + feature.properties["Description"] + '</h2>' + '</html>';

              SB.style.display == ""
                }
             if (SB.style.display == "") {
              console.log('a point?!')
                let SB = document.getElementById("sidebar");

                 SB.innerHTML = '<html>' + '<h4 style="margin-top: 1rem; margin-bottom: 1rem;"><strong>' + feature.properties["Place"] +
            '</strong></h4>' + '<h5 style="margin-top: 0rem;"><i>' + feature.properties["Year to Display"] + '</i></h5><h3>' + feature.properties["Revolt Name"] +'</h3>'
           + '<h2 style="text-align: left;">' + feature.properties["Description"] + '</h2>' + '</html>';
                  CurrentPoint = NewPoint;
                  SB.style.display = "none";
                }
             if (SB.style.display == "" && CurrentPoint == NewPoint){
                  displayValue = "none";
                SB.style.display = displayValue;
              }
        });
      }

// function PointActions (feature, layer) {

//     let SB = document.getElementById("sidebar"), displayValue = "";
        
//         layer.on('click', function (e) {
//              if (SB.style.display == "none")
//                   displayValue = "";
//              if (SB.style.display == "")
//                   displayValue = "none";
//                 SB.style.display = displayValue;
//         });

//         layer.on('click', function (e) {
//           let SB = document.getElementById("sidebar");
//             SB.innerHTML = '<html>' + '<h4 style="margin-top: 1rem; margin-bottom: 1rem;"><strong>' + feature.properties["Place"] +
//             '</strong></h4>' + '<h5 style="margin-top: 0rem;"><i>' + feature.properties["Year to Display"] + '</i></h5><h3>' + feature.properties["Revolt Name"] +'</h3>'
//            + '<h2 style="text-align: left;">' + feature.properties["Description"] + '</h2>' + '</html>';
//         });

//         layer.on('click', function(e) {
//             map.setView(e.latlng, 6);
//         });

//     }


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