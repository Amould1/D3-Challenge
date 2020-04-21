d3.csv("data.csv")
  .then(function(Data) {

    Data.forEach(function(data) {
      data.age = +data.age;
      data.smokes = +data.smokes;
    });

var svgWidth = 1000;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;
var svg = d3.select(".chart")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

    var xLinearScale = d3.scaleLinear()
      .domain([20, 60])
      .range([100, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([9.7, 30])
      .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.smokes))
    .attr("r", "16")
    .attr("fill", "green")
    .attr("opacity", ".4");

    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([70, -55])
      .html(function(d) {
        return (`${d.abbr}<br>Age: ${d.age}<br>Smokes: ${d.smokes}%`);
      });

    chartGroup.call(toolTip);

    chartGroup.append("text")
        .style("text-anchor", "middle")
        .style("font-size", "10px")
        .selectAll("tspan")
        .data(Data)
        .enter()
        .append("tspan")
            .attr("x", function(data) {
                return xLinearScale(data.age);
            })
            .attr("y", function(data) {
                return yLinearScale(data.smokes);
            })
            .text(function(data) {
                return data.abbr
            });

    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 60)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Smokes (%)");

    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 25})`)
      .attr("class", "axisText")
      .text("Age");
  });