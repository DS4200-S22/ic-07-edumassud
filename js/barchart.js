/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// It adds a svg with the given attributes to the div with id
// "hard-coded-bar"
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// Gets the highest score in the dataset
let maxY1 = d3.max(data1, function(d) { return d.score; });

// Sets up the y scale based on the highest y value  
let yScale1 = d3.scaleLinear()
            .domain([0,maxY1])
            .range([height-margin.bottom,margin.top]); 

// Sets up the x axis scale
let xScale1 = d3.scaleBand()
            .domain(d3.range(data1.length))
            .range([margin.left, width - margin.right])
            .padding(0.1); 

// Sets up the y axis writtings 
svg1.append("g")
   .attr("transform", `translate(${margin.left}, 0)`) 
   .call(d3.axisLeft(yScale1)) 
   .attr("font-size", '20px'); 

// Sets up the x axis letters
svg1.append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`) 
    .call(d3.axisBottom(xScale1) 
            .tickFormat(i => data1[i].name))  
    .attr("font-size", '20px'); 

/* 

  Tooltip Set-up  

*/

// Not sure...
const tooltip1 = d3.select("#hard-coded-bar") 
                .append("div") 
                .attr('id', "tooltip1") 
                .style("opacity", 0) 
                .attr("class", "tooltip"); 

// Setting up the mouseover design 
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") 
          .style("opacity", 1);  
}

// Not sure either
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
}

// Removes the tooltip when the mouse isn't over it
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); 
}

/* 

  Bars 

*/

// Sets up the whole chart
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) 
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

/*

Bullet 11

*/

const svg2 = d3
  .select("#csv-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

svg2.append("g")
  .attr("transform", `translate(${margin.left}, 0)`) 
  .call(d3.axisLeft(yScale1)) 
  .attr("font-size", '20px'); 

// Sets up the x axis letters
svg2.append("g")
  .attr("transform", `translate(0,${height - margin.bottom})`) 
  .call(d3.axisBottom(xScale1) 
          .tickFormat(i => data1[i].name))  
  .attr("font-size", '20px'); 

d3.csv("data/barchart.csv").then((data) => { 

  // d3.csv parses a csv file and passes the data
  // to an anonymous function. Note how we build
  // our visual inside of this anonymous function 

  // let's check our data
  console.log(data);   



  // add our circles with styling 
  svg2.selectAll(".bar") 
      .data(data) // this is passed into the anonymous function
      .enter()  
      .append("rect")
        .attr("class", "bar") 
        .attr("x", (d,i) => xScale1(i)) 
        .attr("y", (d) => yScale1(d.score)) 
        .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
        .attr("width", xScale1.bandwidth()) 
        .on("mouseover", mouseover1) 
        .on("mousemove", mousemove1)
        .on("mouseleave", mouseleave1);
});



