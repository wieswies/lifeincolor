// BASIC BACKGROUND MAP

// // The svg
// const svg = d3.select("svg"),
//   width = +svg.attr("width"),
//   height = +svg.attr("height");

// // Map and projection
// const projection = d3
//   .geoNaturalEarth1()
//   .scale(width / 1.5 / Math.PI)
//   .translate([width / 2, height / 2]);

// // Load external data and boot
// d3.json(
//     "custom.geo.json" //
// ).then(function (data) {
//   // Draw the map
//   svg
//     .append("g")
//     .selectAll("path")
//     .data(data.features)
//     .join("path")
//     .attr("fill", "#69b3a2")
//     .attr("d", d3.geoPath().projection(projection))
//     .style("stroke", "#fff")
//     .style("stroke-width", 0.1);
// })

// d3.selectAll('svg').attr("transform", "translate(10, 10)")
// ;


// CONNECTED WORLD MAP
// The svg
var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height");

// Map and projection
var projection = d3.geoMercator()
    .scale(85)
    .translate([width/2, height/2*1.3])

// A path generator
var path = d3.geoPath()
    .projection(projection)

// Load world shape AND list of connection
d3.queue()
  .defer(d3.json, "../data/europe.geo.json")  // World shape
  .defer(d3.csv, "https://raw.githubusercontent.com/wieswies/life_in_color/main/life_in_color/data/vg_latlon.csv")
  //.defer(d3.csv, "https://raw.githubusercontent.com/wieswies/life_in_color/main/life_in_color/data/vg_latlon_names.csv")
  .await(ready);

function ready(error, dataGeo, data) {

    // Reformat the list of link. Note that columns in csv file are called long1, long2, lat1, lat2
    var link = []
    data.forEach(function(row){
      source = [+row.long1, +row.lat1]
      target = [+row.long2, +row.lat2]
      topush = {type: "LineString", coordinates: [source, target]}
      link.push(topush)
    })

    // Draw the map
    svg.append("g")
        .selectAll("path")
        .data(dataGeo.features)
        .enter().append("path")
            .attr("fill", "#b8ccb8")
            .attr("d", d3.geoPath()
                .projection(projection)
            )
            .style("stroke", "#fff")
            .style("stroke-width", 0.1)

    // Add the path
    svg.selectAll("myPath")
      .data(link)
      .enter()
      .append("path")
        .attr("d", function(d){ return path(d)})
        .style("fill", "none")
        .style("stroke", "#698888")
        .style("stroke-width", 0.05)
      .append("text")

    // svg.selectAll(".labels")
    //   .data(data)
    //   .enter().append("text")
    //   .attr("class", "labels")
    //   .text(function(d) {return d.place;})
    //   .attr("x", function(d) {
    //     return projection([d.lon, d.lat])[0];
    //   })
    //   .attr("y", function(d) {
    //     return projection([d.lon, d.lat])[1];
    //   })
    
    d3.selectAll('svg').attr("transform", "scale(12)");
}
