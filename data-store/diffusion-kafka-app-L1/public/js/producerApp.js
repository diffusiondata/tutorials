let _session = null;
let _fxTopic = "diffusion.fx";  // This is the Diffusion topic where we publish the fx data stream. Then Kafka adapter will broadcast this stream into Kafka cluster.

let bid, offer;

// get query params from url
let host = getQueryVariable("host") || "kafkagateway.us.diffusion.cloud";

// update h1 title on the diffusion2kafka.html page
document.getElementById("room-title").innerText = 'Broadcast FX data to Kafka';

// Hook into the form's onsubmit callback. This will send updates to the fx topic in Diffusion.
let parametersForm = document.getElementById("parametersForm");
parametersForm.onsubmit = (evt) => {
	evt.preventDefault();
	
	let input1 = parametersForm.querySelector("[name='loop']");
	let loop = parseInt(input1.value);

	let input2 = parametersForm.querySelector("[name='frequency']");
	let frequency = parseInt(input2.value);

	// define your fx stream: number of fx JSON packages and frequency of update
	publishFX(loop, frequency, loop);
 
    return true;
};

// Connect to your Diffusion service, or leave this values and connect to our sandbox
// Sign up to Diffusion Cloud and get your service up a running in a minute.
diffusion.connect({
    host : host, // Use your Diffusion service or connect to our sandbox "kafkagateway.us.diffusion.cloud"
    principal : "user",
    credentials : "password"
}).then(
    (session) => {
		// now we have a session open to our Diffusion service.
		console.log("Connected to Diffusion Server!");
		_session = session;

		// Create an fx topic with a JSON data type.
		session.topics.add(_fxTopic, diffusion.topics.TopicType.JSON);
    },
    (err) => {
		alert(err);
    }
);

function publishFX(loop, frequency, totalLoops) {
    setTimeout(() => {

        bid = 1 + Math.random() - 0.5;
		offer = 1 + Math.random() - 0.5;
		
		let pairName, pairRandomizer;
		pairRandomizer = (Math.random()*10).toFixed(0);

		if (pairRandomizer < 1) { pairName = "GBP:EUR"; }
		else if (pairRandomizer < 3) { pairName = "GBP:USD"; }
		else if (pairRandomizer < 5) { pairName = "GBP:JPY"; }
		else if (pairRandomizer < 7) { pairName = "JPY:EUR"; }
		else if (pairRandomizer < 9) { pairName = "USD:EUR"; }
		else if (pairRandomizer < 11) { pairName = "USD:JPY"; }

		//_session.topicUpdate.createUpdateStream(_fxTopic, diffusion.datatypes.json()).set(
		_session.topicUpdate.set(_fxTopic, diffusion.datatypes.json(), 
					{
						pairName : pairName,
						timestamp : new Date().getTime(),
						bid : bid.toFixed(2),
						offer : offer.toFixed(2)
					}
		);
		
		let percentage = 100 - (loop * 100 / totalLoops);
		// update h1 title on the diffusion2kafka.html page
		document.getElementById("room-title").innerText = 'Broadcast in progress... ' + percentage.toFixed(0) + '%';
    
        if(loop > 1) {
            publishFX(loop - 1, frequency, totalLoops);
        } else {
			// update h1 title on the diffusion2kafka.html page
			document.getElementById("room-title").innerText = 'Broadcast completed!';
		}
	}, frequency);
}
