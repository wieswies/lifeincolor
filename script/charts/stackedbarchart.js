var svg = d3.select("svg#stackedbarchatSvg"),
  margin = { top: 50, right: 40, bottom: 100, left: 40 },
  width = +svg.attr("width") - margin.left - margin.right,
  height = +svg.attr("height") - margin.top - margin.bottom,
  g = svg
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// set x scale
var x = d3.scaleBand().rangeRound([0, width]).paddingInner(0.5).align(0.1);

// set y scale
var y = d3.scaleLinear().rangeRound([height, 0]);

// set the colors
var z = d3.scaleOrdinal().range(["#db733b", "#85c0ed", "#88a364", "#f3ba1c"]);

// load the csv and create the chart
d3.csv(
  "https://raw.githubusercontent.com/wieswies/life_in_color/main/life_in_color/data/vgph_barchart.csv",
  function (d, i, columns) {
    for (i = 1, t = 0; i < columns.length; ++i)
      t += d[columns[i]] = +d[columns[i]];
    d.total = t;
    return d;
  },
  function (error, data) {
    if (error) throw error;

    var keys = data.columns.slice(1);

    data.sort(function (a, b) {
      return b.total - a.total;
    });
    x.domain(
      data.map(function (d) {
        return d.place;
      })
    );
    y.domain([
      0,
      d3.max(data, function (d) {
        return d.total;
      }),
    ]).nice();
    z.domain(keys);

    g.append("g")
      .selectAll("g")
      .data(d3.stack().keys(keys)(data))
      .enter()
      .append("g")
      .attr("fill", function (d) {
        return z(d.key);
      })
      .selectAll("rect")
      .data(function (d) {
        return d;
      })
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.data.place);
      })
      .attr("y", function (d) {
        return y(d[1]);
      })
      .attr("height", function (d) {
        return y(d[0]) - y(d[1]);
      })
      .attr("width", x.bandwidth())
      .on("mouseover", function () {
        tooltip.style("display", null);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      })
      .on("mousemove", function (d) {
        console.log(d);
        var xPosition = d3.mouse(this)[0] - 5;
        var yPosition = d3.mouse(this)[1] - 5;
        tooltip.attr(
          "transform",
          "translate(" + xPosition + "," + yPosition + ")"
        );
        tooltip.select("text").text(d[1] - d[0] + " paintings");
      });

    g.append("g")
      .attr("class", "axis")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x))
      .attr("font-family", undefined) // Remove the added font-family
      .selectAll("text")
      .attr("transform", "rotate(45)")
      .style("text-anchor", "start");

    g.append("g")
      .attr("class", "axis")
      .call(d3.axisLeft(y).ticks(null, "s"))
      .append("text")
      .attr("x", 2)
      .attr("y", y(y.ticks().pop()) + 0.5)
      .attr("dy", "0.32em")
      .attr("fill", "#000")
      .attr("font-weight", "bold")
      .attr("text-anchor", "start");

    var legend = g
      .append("g")
      .attr("font-size", 10)
      .attr("text-anchor", "end")
      .selectAll("g")
      .data(keys.slice().reverse())
      .enter()
      .append("g")
      .attr("transform", function (d, i) {
        return "translate(0," + i * 20 + ")";
      });

    legend
      .append("rect")
      .attr("x", width - 19)
      .attr("width", 19)
      .attr("height", 19)
      .attr("fill", z);

    legend
      .append("text")
      .attr("x", width - 24)
      .attr("y", 9.5)
      .attr("dy", "0.32em")
      .text(function (d) {
        return d[0].toUpperCase() + d.substring(1);
      });
  }
);

// Prep the tooltip bits, initial display is hidden
var tooltip = svg.append("g").attr("class", "tooltip").style("display", "none");

tooltip
  .append("rect")
  .attr("width", 130)
  .attr("height", 20)
  .attr("fill", "rgb(54, 83, 61)")
  .style("opacity", 0.5);

tooltip
  .append("text")
  .attr("x", 30)
  .attr("dy", "1.2em")
  .style("text-align", "left")
  .style("font-family", "Quosm")
  .attr("font-family", "Quosm")
  .attr("font-size", "12px")
  .attr("font-weight", "bold");
