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

L.tileLayer.provider('Esri.WorldPhysical', 'Esri.WorldTopoMap').addTo(map);

$.getJSON("assets/SlaveRevolts-CoordsEdit.geojson", function(data){
  
  
  let revoltsites = L.geoJson(data, {
    
    pointToLayer: function(feature, latlng) {
      return new L.CircleMarker(latlng, {
        radius:8,
        color: getColor(feature)
      });
    },
    onEachFeature: addPopUp
    
  });

  revoltsites.addTo(map);
  
});

// revoltsites.addTo(map).on('click', function(){
//   sidebar.setContent(feature.properties["Column"]).show();
//   let sidebar = L.control.sidebar('sidebar', {
//     position: 'left'
// });
   
//   map.addControl(sidebar);

function addPopUp(feature,layer){
  layer.bindPopup(feature.properties["Column"])
  
}

// let sidenavCollection = document.getElementsByClassName('sidenav');
// sidenavCollection[0].innerHTML = popupContent;


function getColor(feature){
  switch (feature.properties["Column"]) {
            case '1500':
              return  'yellow';
            case '1500 Penn':
              return 'yellow';
            case '1600':
              return 'green';
            case '1600 Penn':
              return 'green';
            case '1700':
              return 'black';
            case '1700 Penn':
              return 'black';
            case '1800':
              return 'red';
            case '1800 Penn':
              return 'red';
            default:
              return 'black';
          }
        }



function myFunction(feature){
  if(feature.properties.type == "person"){}
  
}