function buildMetadata(sample) {
    var tempURL = `metadata/${sample}`
    console.log(tempURL);
  // @TODO: Complete the following function that builds the metadata panel

     Plotly.d3.json(tempURL,function(error,response){
        if (error) return console.log(error);
        console.log(response);
//         var data = response[0];
//         console.log(data)       
    
    // Use d3 to select the panel with id of `#sample-metadata`
    var metabody=d3.select("#sample-metadata");
    console.log(metabody);
         
    // Use `.html("") to clear any existing metadata
    metabody.html("");
    console.log(metabody);

    // Use `Object.entries` to add each key and value pair to the panel   
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
//     response.forEach(function(data) {
//       console.log(data);
         
     // Append a cell to the row for each value
    // in the weather report object

      var row = metabody.append("tr");
      Object.entries(response).forEach(function(res) {
//         console.log(res[0], res[1]);
          metabody.selectAll("tr")
          .select("tr")
          .data(res)
          .enter()
          .append("tr")
          .html(`<td>${res[0]}:</td><td>${res[1]}</td>`)
      });
    
    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  });
}

function buildCharts(sample) {
    var tempURL = `samples/${sample}`
    console.log(tempURL);
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  // @TODO: Complete the following function that builds the metadata panel

   Plotly.d3.json(tempURL,function(error,data){
      if (error) return console.log(error);
      console.log(data);
    
    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: data.otu_ids,
      y: data.sample_values,
      text: data.otu_labels,
      mode: 'markers',
      marker: {
        color: data.otu_ids,
        size: data.sample_values
      }
    };

    var data1 = [trace1];


      Plotly.newPlot('bubble', data1);
    // @TODO: Build a Pie Chart
    // HINT: You will need to use slice() to grab the top 10 sample_values,
    // otu_ids, and labels (10 each).
    var trace2 = {
    values: data.sample_values.slice(1,11),
    type: 'pie',
    name: data.otu_labels.slice(1,11),
    labels: data.otu_ids.slice(1,11),
    hoverinfo: 'label+values+name'
    };

    var data2 = [trace2];

      Plotly.newPlot('pie', data2);


    });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
