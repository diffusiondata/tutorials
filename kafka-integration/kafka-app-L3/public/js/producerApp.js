let _session = null;
let _fxTopic = "FXPairs";  // This is the Diffusion topic where we publish the fx data stream. Then Kafka adapter will broadcast this stream into Kafka cluster.

// get query params from url
let host = getQueryVariable("host") || "kafkagateway-eu.eu.diffusion.cloud";

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
    host : host, // Use your Diffusion service or connect to our sandbox "kafkagateway-eu.eu.diffusion.cloud"
    principal : "admin",
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

		let pairName, pairRandomizer, timestamp;
		pairRandomizer = (Math.random()*10).toFixed(0);
		timestamp = new Date().getTime();

		if (pairRandomizer < 1) { pairName = "GBP:EUR"; }
		else if (pairRandomizer < 3) { pairName = "GBP:USD"; }
		else if (pairRandomizer < 5) { pairName = "GBP:JPY"; }
		else if (pairRandomizer < 7) { pairName = "JPY:EUR"; }
		else if (pairRandomizer < 9) { pairName = "USD:EUR"; }
		else if (pairRandomizer < 11) { pairName = "USD:JPY"; }

		//_session.topicUpdate.set(_fxTopic, diffusion.datatypes.json(),
		_session.topicUpdate.createUpdateStream(_fxTopic, diffusion.datatypes.json()).set( 
					{
							pairName: pairName,
							pairs: [
							  {
								tiers: [
								  {
									offer: {
									  big: "0.67",
									  points: "236"
									},
									high: "0.67007",
									low: "0.67280",
									bid: {
									  big: "0.67",
									  points: "235"
									},
									open: 0.67060 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "0.7035",
									  points: "236"
									},
									high: "0.67007",
									low: "0.67280",
									bid: {
									  big: "0.6365",
									  points: "235"
									},
									open: 0.67060 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "0.737",
									  points: "236"
									},
									high: "0.67007",
									low: "0.67280",
									bid: {
									  big: "0.603",
									  points: "235"
									},
									open: 0.67060 + Math.random() - 0.5
								  }
								],
								pairName: "AUD-USD",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "1.09",
									  points: "627"
									},
									high: "1.09186",
									low: "1.09741",
									bid: {
									  big: "1.09",
									  points: "621"
									},
									open: 1.09284 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.1445",
									  points: "627"
									},
									high: "1.09186",
									low: "1.09741",
									bid: {
									  big: "1.0355",
									  points: "621"
									},
									open: 1.09284 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.199",
									  points: "627"
									},
									high: "1.09186",
									low: "1.09741",
									bid: {
									  big: "0.981",
									  points: "621"
									},
									open: 1.09284 + Math.random() - 0.5
								  }
								],
								pairName: "EUR-CHF",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "0.89",
									  points: "064"
									},
									high: "0.88951",
									low: "0.89225",
									bid: {
									  big: "0.89",
									  points: "056"
									},
									open: 0.89102 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "0.9345",
									  points: "064"
									},
									high: "0.88951",
									low: "0.89225",
									bid: {
									  big: "0.8455",
									  points: "056"
									},
									open: 0.89102 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "0.979",
									  points: "064"
									},
									high: "0.88951",
									low: "0.89225",
									bid: {
									  big: "0.801",
									  points: "056"
									},
									open: 0.89102 + Math.random() - 0.5
								  }
								],
								pairName: "EUR-GBP",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "117.",
									  points: "309"
									},
									high: "117.246",
									low: "117.657",
									bid: {
									  big: "117.",
									  points: "305"
									},
									open: 117.518 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "122.85",
									  points: "309"
									},
									high: "117.246",
									low: "117.657",
									bid: {
									  big: "111.15",
									  points: "305"
									},
									open: 117.518 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "128.7",
									  points: "309"
									},
									high: "117.246",
									low: "117.657",
									bid: {
									  big: "105.3",
									  points: "305"
									},
									open: 117.518 + Math.random() - 0.5
								  }
								],
								pairName: "EUR-JPY",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "1.09",
									  points: "688"
									},
									high: "1.09407",
									low: "1.09741",
									bid: {
									  big: "1.09",
									  points: "687"
									},
									open: 1.09625 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.1445",
									  points: "688"
									},
									high: "1.09407",
									low: "1.09741",
									bid: {
									  big: "1.0355",
									  points: "687"
									},
									open: 1.09625 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.199",
									  points: "688"
									},
									high: "1.09407",
									low: "1.09741",
									bid: {
									  big: "0.981",
									  points: "687"
									},
									open: 1.09625 + Math.random() - 0.5
								  }
								],
								pairName: "EUR-USD",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "131.",
									  points: "718"
									},
									high: "131.478",
									low: "132.087",
									bid: {
									  big: "131.",
									  points: "709"
									},
									open: 131.938 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "137.55",
									  points: "718"
									},
									high: "131.478",
									low: "132.087",
									bid: {
									  big: "124.45",
									  points: "709"
									},
									open: 131.938 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "144.1",
									  points: "718"
									},
									high: "131.478",
									low: "132.087",
									bid: {
									  big: "117.9",
									  points: "709"
									},
									open: 131.938 + Math.random() - 0.5
								  }
								],
								pairName: "GBP-JPY",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "1.23",
									  points: "165"
									},
									high: "1.22652",
									low: "1.23219",
									bid: {
									  big: "1.23",
									  points: "157"
									},
									open: 1.23067 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.2915",
									  points: "165"
									},
									high: "1.22652",
									low: "1.23219",
									bid: {
									  big: "1.1685",
									  points: "157"
									},
									open: 1.23067 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.353",
									  points: "165"
									},
									high: "1.22652",
									low: "1.23219",
									bid: {
									  big: "1.107",
									  points: "158"
									},
									open: 1.24067 + Math.random() - 0.5
								  }
								],
								pairName: "GBP-USD",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "1.33",
									  points: "276"
									},
									high: "1.33136",
									low: "1.33391",
									bid: {
									  big: "1.33",
									  points: "268"
									},
									open: 1.33245 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.3965",
									  points: "276"
									},
									high: "1.33136",
									low: "1.33391",
									bid: {
									  big: "1.2635",
									  points: "268"
									},
									open: 1.33245 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.463",
									  points: "276"
									},
									high: "1.33136",
									low: "1.33391",
									bid: {
									  big: "1.197",
									  points: "268"
									},
									open: 1.33245 + Math.random() - 0.5
								  }
								],
								pairName: "USD-CAD",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "0.99",
									  points: "947"
									},
									high: "0.99589",
									low: "1.00284",
									bid: {
									  big: "0.99",
									  points: "941"
									},
									open: 0.99685 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.0395",
									  points: "947"
									},
									high: "0.99589",
									low: "1.00284",
									bid: {
									  big: "0.9405",
									  points: "941"
									},
									open: 0.99685 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "1.089",
									  points: "947"
									},
									high: "0.99589",
									low: "1.00284",
									bid: {
									  big: "0.891",
									  points: "941"
									},
									open: 0.99685 + Math.random() - 0.5
								  }
								],
								pairName: "USD-CHF",
								timestamp: timestamp
							  },
							  {
								tiers: [
								  {
									offer: {
									  big: "106.",
									  points: "948"
									},
									high: "106.924",
									low: "107.303",
									bid: {
									  big: "106.",
									  points: "944"
									},
									open: 107.201 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "111.3",
									  points: "948"
									},
									high: "106.924",
									low: "107.303",
									bid: {
									  big: "100.7",
									  points: "944"
									},
									open: 107.201 + Math.random() - 0.5
								  },
								  {
									offer: {
									  big: "116.6",
									  points: "948"
									},
									high: "106.924",
									low: "107.303",
									bid: {
									  big: "95.4",
									  points: "944"
									},
									open: 107.201 + Math.random() - 0.5
								  }
								],
								pairName: "USD-JPY",
								timestamp: timestamp
							  }
							],
							timestamp: timestamp
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
