// Build initial plot
function init(){
    buildPlot()
}

// Create option change function
function optionChanged() {
    buildPlot();
}

// Fetch the JSON data and console log it
function buildPlot(){
    const path = "../interactive-visualization-challenge/samples.json"
    d3.json(path).then(function(data) {
        console.log(data);
        // Grab IDs of the human participants
        var human = data.names;
        
        // Make dropdown menu using human array
        var dropdown = d3.select("select");
        human.forEach(human => {
            dropdown.append("option").text(human).property("value", human);
        });

        // Assign a variable to the value in the dropdown menu
        var selectedHuman = d3.selectAll("#selDataset").node().value;
        console.log(selectedHuman);

        // filter data based on selectedHuman
        filteredData = data.samples.filter(option => option.id == selectedHuman)
        console.log(filteredData);

        var traceBar = {
            x: filteredData[0].sample_values.slice(0,10).reverse(),
            y: filteredData[0].otu_ids.slice(0, 10).reverse().map(int => "OTU " + int.toString()),
            text: filteredData[0].otu_labels.slice(0,10).reverse(),
            type:"bar",
            orientation: 'h'
        };

        var dataBar = [traceBar];

        Plotly.newPlot("bar", dataBar);

        // filter metadata based on selectedHuman
        filteredMeta = data.metadata.filter(entry => entry.id == selectedHuman)
        console.log(filteredMeta)
        
        //create metadata object
        var metadata = {
            'id: ': filteredMeta[0].id,
            'ethnicity: ': filteredMeta[0].ethnicity,
            'gender: ': filteredMeta[0].gender,
            'age: ': filteredMeta[0].age,
            'location: ': filteredMeta[0].location,
            'bbtype: ': filteredMeta[0].bbtype,
            'wfreq: ': filteredMeta[0].wfreq
        }

        //select the area for the metadata
        var demoBox = d3.select("#sample-metadata");
        // clear box to insert new data
        demoBox.html("")
        // append key value pairs to demoBox
        Object.entries(metadata).forEach(([key, value])=>{
            demoBox.append('p').text(key + value)
        });

        // create the bubble chart
        var traceBubble = {
            x : filteredData[0].otu_ids,
            y : filteredData[0].sample_values,
            text : filteredData[0].otu_labels,
            mode : 'markers',
            marker: {
                color : filteredData[0].otu_ids,
                size : filteredData[0].sample_values
            }
        };

        var dataBubble = [traceBubble];

        Plotly.newPlot('bubble', dataBubble);


});
};

init()