/**
 * Created by andrey on 3/14/16.
 */
function init() {
    OpenLayers.Lang.setCode('ru');
    map = new OpenLayers.Map("basicMap");

    var mapnik = new OpenLayers.Layer.OSM();
    var fromProjection = new OpenLayers.Projection("EPSG:4326");   // Transform from WGS 1984
    var toProjection = new OpenLayers.Projection("EPSG:900913"); // to Spherical Mercator Projection
    var position = new OpenLayers.LonLat( 27.5667,  53.9).transform(fromProjection, toProjection);
    var zoom = 15;

    map.addLayer(mapnik);

    var markers = new OpenLayers.Layer.Markers( "Markers" );
    map.addLayer(markers);

    var size = new OpenLayers.Size(21,25);
    var offset = new OpenLayers.Pixel(-(size.w/2), -size.h);
    var icon = new OpenLayers.Icon('http://0.0.0.0:9000/static/img/login.png', size, offset);
    //markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(0,0),icon));
    //markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(0,0),icon.clone()));

    markers.addMarker(new OpenLayers.Marker(new OpenLayers.LonLat(27.5667,  53.9).transform(
        new OpenLayers.Projection("EPSG:4326"),
        new OpenLayers.Projection("EPSG:900913")
    ), icon));

    map.setCenter(position, zoom);


}


init();