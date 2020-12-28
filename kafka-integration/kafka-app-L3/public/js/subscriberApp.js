let _session = null;
let _fxTopic = null;

// get query params from url
let host = getQueryVariable("host") || "kafkagateway-eu.eu.diffusion.cloud";

// update h1 title on the kafka2diffusion.html page
document.getElementById("room-title").innerText = 'Ingest FX data from Kafka';

var useShift = false;
// using JSCharting to graph fx
var chart = JSC.chart('chartDiv', {
	yAxis_formatString: 'n',
	xAxis_overflow: 'hidden',
	margin_right: 20,
	toolbar: {
	  margin: 5,
	  items: {
		'Shift Values': {
		  type: 'checkbox',
		  value: false,
		  tooltip: 'The shift option determines whether the first point in the series is removed when adding a new point.',
		  events: { change: shiftPoints_btnClick  }
		}
	  }
	},
	xAxis: { scale_type: 'time'  },
	series: [
	  {
		name: 'open',
		points: []
	  }
	]
  });

// Hook into the form's onsubmit callback. This will send updates to the fx topic in Diffusion.
let parametersForm = document.getElementById("parametersForm");
parametersForm.onsubmit = (evt) => {
	evt.preventDefault();
	
	let input = parametersForm.querySelector("[name='currency']");
	let currency = input.value; // currency format is as shown here. eg: GBP.USD

	// define your fx stream: number of fx JSON packages and frequency of update
	_fxTopic = "FXPairs.tier2." + currency; // currency format is as shown here. eg: GBP.USD
 
    // Connect to your Diffusion service, or leave this values and connect to our sandbox
    // Sign up to Diffusion Cloud and get your service up a running in a minute.
    diffusion.connect({
        host : host, // Use your Diffusion service or connect to our sandbox "kafkagateway-eu.eu.diffusion.cloud"
        principal : "admin", // This user only have access to a specific topic path: "FXPairs.tier2.GBP.USD"
        credentials : "password"
    }).then(
        (session) => {
	    // now we have a session open to our Diffusion service.
        console.log("Connected to Diffusion Server!");
	    _session = session;

	    // Set up a stream to receive updates from the fx topic.
	    session.addStream(_fxTopic, diffusion.datatypes.json())
	        .on("value", displayMessage);

	    // Subscribe to the fx topic.
        session.select(_fxTopic);
        
        console.log("Sunscribed to: " + _fxTopic);
	
        },
        (err) => {
	        alert(err);
        }
    );
    
    // update h1 title on the kafka2diffusion.html page
    document.getElementById("room-title").innerText = 'Listening for FX data from Kafka';
    
    return true;
};

// Display a fx values received by Diffusion
function displayMessage(topic, specification, newValue, oldValue) {
    
	let msg = newValue.get();
	let timestamp = new Date().getTime();

    // insert messages in container
    let container = document.getElementById("messages");
	let entry = document.createElement("li");
	entry.classList.add("list-group-item");

	let header = document.createElement("strong");
	header.innerText = "partition: " + msg.partition + "  |  key: " + msg.key + "  |  timestamp: " + timestamp;
	
	let content = document.createElement("p");
	content.innerText = "open: " + msg.value.open + "  |  high: " + msg.value.high + "  |  low: " + msg.value.low;

	entry.appendChild(header);
	entry.appendChild(content);
	container.appendChild(entry);

	// Scroll to bottom of container, to show latest message.
	container.scrollTop = container.scrollHeight - container.clientHeight;

	// passing x,y points to JSCharting to graph fx
	chart.series(0).points.add({  y:parseFloat(msg.value.open),  x:timestamp },{shift: useShift});
}

// function to shift points in fx graph
function shiftPoints_btnClick(shiftVal) {
	useShift=shiftVal;
}
