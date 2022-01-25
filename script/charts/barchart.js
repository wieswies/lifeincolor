function initBarchart() {
  var svgEl = d3.select("#barchart_year");

  // set the dimensions and margins of the graph
  var margin = { top: 20, right: 40, bottom: 30, left: 40 },
    width = svgEl.attr("width") - margin.left - margin.right,
    height = svgEl.attr("height") - margin.top - margin.bottom;

  // append the svg object to the body of the page
  var svg = svgEl
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // Parse the Data
  d3.csv(
    "https://raw.githubusercontent.com/wieswies/lifeincolor/main/data/statistics/barchart_year.csv",
    function (data) {
      // X axis
      var x = d3
        .scaleBand()
        .range([0, width])
        .domain(
          data.map(function (d) {
            return d.Year;
          })
        )
        .padding(0.2);
      svg
        .append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .attr("font-family", undefined)
        .selectAll("text")
        .attr("font-family", undefined)
        .attr("transform", "rotate(45)")
        .style("text-anchor", "start");

      // Add Y axis
      var y = d3.scaleLinear().domain([0, 200]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y)).attr("font-family", undefined);

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
        .attr("x", function (d) {
          return x(d.Year);
        })
        .attr("y", function (d) {
          return y(d.count);
        })
        .attr("width", x.bandwidth())
        .attr("height", function (d) {
          return height - y(d.count);
        })
        .attr("fill", "rgb(255, 248, 220)");
    }
  );
}
initBarchart();
