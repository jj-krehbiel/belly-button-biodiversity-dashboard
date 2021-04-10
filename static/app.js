// Fetch the JSON data and console log it
const path = "../interactive-visualization-challenge/samples.json"
d3.json(path).then(function(data) {
    console.log(data);
     // Grab values from the response json object to build the plots
    var human = data.names;
    var human_id = human[0];
    console.log(human_id);
    var sample = data.samples.filter(sample => sample.id === human_id)[0];
    console.log(sample);
    var values = sample.sample_values.slice(0,10).reverse();
    var otu_ids = sample.otu_ids.slice(0,10).map(id => "otu " + id).reverse();
    var otu_id_no = data.samples.map(sample => sample.otu_ids.slice(0,10));
    var bubblex = +otu_id_no;
    var otuLabels = data.samples.map(sample => sample.otu_labels.slice(0,10));
    var ethnicity = data.metadata.map(metadata => metadata.ethnicity);
    var gender = data.metadata.map(metadata => metadata.gender);
    var age = data.metadata.map(metadata => metadata.age);
    var location = data.metadata.map(metadata => metadata.location);
    var bbtype = data.metadata.map(metadata => metadata.bbtype);
    var wfreq = data.metadata.map(metadata => metadata.wfreq);
    
    // Make dropdown menu using human array
    var dropdown = d3.select("select");
    human.forEach(human => {
        dropdown.append("option").text(human).property("value", human);
    });

    // console.log(human);
    // console.log(values);
    // console.log(otu_ids);
    console.log(otuLabels);
    console.log(ethnicity)
    console.log(gender);
    console.log(age);
    console.log(location);
    console.log(bbtype);
    console.log(wfreq);

    // Make a function to display default bar chart
    function init() {
     
        var trace1 = {
            x: values,
            y: otu_ids,
            text: otuLabels,
            orientation: "h",
            type: "bar"
        };
        
        var data = [trace1];
        
        Plotly.newPlot("bar", data);

        // Display default bubble chart
        var trace2 = {
            x: otu_ids.sort((a,b)=>a-b),
            y: values,
            // mode: 'marker',
            text: otuLabels,
            marker:{
                size: values,
                color: otu_ids
            }
        };

        var data2 = [trace2];

        var layout = {
            showlegend: false,
            // height: 600,
            // width: 1800
        };

        Plotly.newPlot("bubble", data2, layout);
        console.log("bubblex: ", bubblex)

        // Display default demographic data
        
        // function addMetadata(metadata) {
        //     var metadata = d3.select("#sample-metadata");
        //     metadata.text("Sup!");
        // }
        
        // .append.text("Hello!");

    };

    init();

    });




