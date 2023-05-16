let wphys = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Source: US National Park Service',
  maxZoom: 8
});

let wtopo = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
  attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
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

L.tileLayer.provider('Esri.WorldTopoMap', 'Esri.WorldPhysical').addTo(map);

$.getJSON("assets/SlaveRevolts.geojson", function(data){
  
  
  let revoltsites = L.geoJson(data, {
    
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature)
      });
    },
    onEachFeature: addSidebar
    
  });

  revoltsites.addTo(map);

});


function addSidebar (feature, layer) {

    let SB = document.getElementById("sidebar"), displayValue = "";
        
        layer.on('click', function (e) {
             if (SB.style.display == "none")
                  displayValue = "";
                if (SB.style.display == "")
                  displayValue = "none";
                SB.style.display = displayValue;
        });

        layer.on('click', function (e) {
          let SB = document.getElementById("sidebar");
            SB.innerHTML = '<html>' + '<h1>' + feature.properties["Year to Display"] +
            '</h1>' + '<h2>' + feature.properties["Place"] + '<br></br>' + feature.properties["Revolt Name"] +'</h2>'
           + '<h2 style="text-align: left;">' + feature.properties["Description"] + '</h2>' + '</html>';
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