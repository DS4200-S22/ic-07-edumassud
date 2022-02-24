/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// Set dimensions and margins for the plot 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 

// add an svg to build within using deminsions set above
const svg1 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);


d3.csv("data/scatter.csv").then((data) => { 

    let maxX = d3.max(data, (d) => { return d.day; }); 
    console.log("Max x: " + maxX); 

    // find max Y 
    let maxY = d3.max(data, (d) => { return d.score; }); 
    console.log("Max y: " + maxY); 

    // Now that we have our maxes we define scale functions that
    // map our data values (domain for the scale function) to our
    // pixel values (range for the scale function)

    let xScale = d3.scaleLinear() // linear scale because we have 
                                    // linear data 
                    .domain([0, maxX])  // inputs for the function
                    .range([margin.left, width - margin.right]); 
                    // ^ outputs for the function 

    let yScale = d3.scaleLinear()
                .domain([0, maxY])
                .range([height - margin.bottom, margin.top]); 

    svg1.append("g") // g is a "placeholder" svg
        .attr("transform", `translate(0,${height - margin.bottom})`) 
        // ^ moves axis to bottom of svg 
        .call(d3.axisBottom(xScale)) // built in function for bottom
                                    // axis given a scale function 
            .attr("font-size", '20px'); // set font size
    
    // Add y axis to svg6 
    svg1.append("g") // g is a "placeholder" svg
        .attr("transform", `translate(${margin.left}, 0)`) 
        // ^ move axis inside of left margin
        .call(d3.axisLeft(yScale)) // built in function for left
                                    // axis given a scale function 
        .attr("font-size", '20px'); // set font size

  // add our circles with styling 
  svg1.selectAll("circle") 
      .data(data)
      .enter()  
      .append("circle")
        .attr("cx", (d) => xScale(d.day)) // use xScale to return 
                                        // pixel value for given
                                        // datum 
        .attr("cy", (d) => yScale(d.score)) // use yScale to return 
                                        // pixel value for given
                                        // datum 
        .attr("r", 10);
});