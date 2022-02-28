/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// Set dimensions and margins for the plot 
// const width1 = 900; 
// const height = 450; 
// const margin = {left:50, right:50, bottom:50, top:50}; 

// add an svg to build within using deminsions set above
const svg = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom);

  const g = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);


  // X LABEL
  g.append("text")
    .attr("class", "x-axis lable")
    .attr("x", - (height / 2))
    .attr("y", -50)
    .attr("text-anchor", "middle")
    .attr("transform", "rotate(-90)")
    .text("Days");

  // Y LABEL
  g.append("text")
    .attr("class", "y-axis lable")
    .attr("x", width / 2)
    .attr("y", height + 100)
    .attr("text-anchor", "middle")
    .text("Score");

  d3.csv("data/scatter.csv").then(data => {

    console.log(data);
    const x = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.day)])
        .range([0, width]);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.score)])
      .range([0, height]);

    const xAxisCall = d3.axisBottom(x);
    g.append("g")
      .attr("class", "x axis")
      .attr("transform", `translate(0, ${height})`)
      .call(xAxisCall)
      .selectAll("text")
          .attr("text-anchor", "end")
          .attr("transform", "rotate(-40)");

    const yAxisCall = d3.axisLeft(y);
    g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall);

    g.selectAll("circle")
      .data("g")
      .enter()
      .append("circle")
        .attr("cx", (d, i) => x(d.day))
        .attr("cy", (d) => y(d.score))
        .attr("r", 5)
        .attr("fill", "red");
  });