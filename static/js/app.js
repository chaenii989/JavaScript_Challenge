// from data.js
var tableData = myData;

var tbody = d3.select("tbody");
var inputDate = d3.select("#datetime");
var inputState = d3.select("#stateName");
var searchbtn = d3.select("#filter-btn");
var resetbtn = d3.select("#reset-btn");

//console.log(tableData);

var displayData = (inputData) => {

	inputData.forEach(ufo_info => {
    
    	var row = tbody.append("tr");
    	Object.entries(ufo_info).forEach(([key,value])=> {
        	var cell = row.append("td");
        	cell.text(value);
    	});
	});
}

displayData(tableData);
console.log("working");

// Filter by attribute by clicking search button
searchbtn.on("click", function(){
	d3.event.preventDefault();

	var dateInputData = inputDate.property("value").trim();
    var stateInputData = inputState.property("value").toLowerCase().trim();
    
	// Filter by field matching input data
	var filterDate = myData.filter(myData => myData.datetime === dateInputData);
	console.log(filterDate)
	var filterState = myData.filter(myData => myData.state === stateInputData);
	console.log(filterState)
	var consolidatedData = myData.filter(myData => myData.datetime === dateInputData && myData.state === stateInputData);
	console.log(consolidatedData)

	
	tbody.html("");

	// Add conditions for results based on filtering data

	if (consolidatedData.length !== 0) {
		displayData(consolidatedData);
	}
	else if (consolidatedData.length === 0 && ((filterState.length !== 0 || filterDate.length !== 0))){
		displayData(filterState) || displayData(filterDate);
	
	}
	else {
		tbody.append("tr").append("td").text("No results found with filtered date or states!"); 
	}
})

//reset table by clicking reset button 

resetbtn.on("click", function() {
	tbody.html("");
	displayData(tableData)
	console.log("Table reset")
})
