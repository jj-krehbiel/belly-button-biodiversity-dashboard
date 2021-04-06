// Fetch the JSON data and console log it
d3.json("../interactive-visualization-challenge/samples.json").then(function(data) {
    console.log(data);
     // Grab values from the response json object to build the plots
     var human = data.samples.map(sample => sample.id);
     var values = data.samples.map(sample => sample.sample_values.slice(0,10));
     var ids = data.samples.map(sample => sample.otu_ids.slice(0,10));
     var otuLabels = data.samples.map(sample => sample.otu_labels.slice(0,10));
     console.log(human);
     console.log(values);
     console.log(ids);
     console.log(otuLabels);
  });

