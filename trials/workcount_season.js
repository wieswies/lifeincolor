var root = am5.Root.new("workcount_season");


// Set themes
// https://www.amcharts.com/docs/v5/concepts/themes/
root.setThemes([
  am5themes_Animated.new(root)
]);


// Create chart
// https://www.amcharts.com/docs/v5/charts/xy-chart/
var chart = root.container.children.push(am5xy.XYChart.new(root, {
  panX: false,
  panY: false,
  layout: root.verticalLayout
}));

var data = [{"Season": "Autumn", "Count": 185}, {"Season": "Spring", "Count": 147}, {"Season": "Summer", "Count": 197}, {"Season": "Winter", "Count": 108}, {"Season": "Unknown", "Count": 233}]

// Create axes
// Rotate labels:
var xRenderer = am5xy.AxisRendererX.new(root, { minGridDistance: 30 });
xRenderer.labels.template.setAll({
  rotation: -75,
  centerY: am5.p50,
  centerX: am5.p100,
  paddingRight: 15
});


// https://www.amcharts.com/docs/v5/charts/xy-chart/axes/
var xAxis = chart.xAxes.push(am5xy.CategoryAxis.new(root, {
  categoryField: "Season",
  renderer: xRenderer,
  tooltip: am5.Tooltip.new(root, {})
}));

xAxis.data.setAll(data);

var yAxis = chart.yAxes.push(am5xy.ValueAxis.new(root, {
  min: 0,
  renderer: am5xy.AxisRendererY.new(root, {})
}));

// Modify chart colors
chart.get("colors").set("colors", [
  am5.color(0x095256),
  am5.color(0x087f8c),
  am5.color(0x5aaa95),
  am5.color(0x86a873),
  am5.color(0xbb9f06)
]);

// Add legend
// https://www.amcharts.com/docs/v5/charts/xy-chart/legend-xy-series/
// var legend = chart.children.push(am5.Legend.new(root, {
//   centerX: am5.p50,
//   x: am5.p50
// }));


// Add series
// https://www.amcharts.com/docs/v5/charts/xy-chart/series/
function makeSeries(name, fieldName) {
  var series = chart.series.push(am5xy.ColumnSeries.new(root, {
    name: name,
    stacked: true,
    xAxis: xAxis,
    yAxis: yAxis,
    valueYField: fieldName,
    categoryXField: "Season"
  }));

  series.columns.template.setAll({
    tooltipText: "{categoryX}: {valueY}",
    tooltipY: am5.percent(10),
  });
  series.data.setAll(data);

  // Make stuff animate on load
  // https://www.amcharts.com/docs/v5/concepts/animations/
  series.appear();

  series.bullets.push(function () {
    return am5.Bullet.new(root, {
      sprite: am5.Label.new(root, {
        text: "{valueY}",
        fill: root.interfaceColors.get("alternativeText"),
        centerY: am5.p50,
        centerX: am5.p50,
        populateText: true
      })
    });
  });

  legend.data.push(series);
}

makeSeries("Work count", "Count");

// Make stuff animate on load
// https://www.amcharts.com/docs/v5/concepts/animations/
chart.appear(1000, 100);
