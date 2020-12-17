let _session = null;
let _fxTopic = "majorIndexesList.diffusion";  // This is the Diffusion topic where we publish the fx data stream. Then Kafka adapter will broadcast this stream into Kafka cluster.

// get query params from url
let host = getQueryVariable("host") || "kafkagateway.us.diffusion.cloud";

// update h1 title on the diffusion2kafka.html page
document.getElementById("room-title").innerText = 'Broadcast Index data to Kafka';

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

		//_session.topicUpdate.createUpdateStream(_fxTopic, diffusion.datatypes.json()).set(
		_session.topicUpdate.set(_fxTopic, diffusion.datatypes.json(), 
					{
						timestamp : new Date().getTime(),
						majorIndexesList : [ {
							ticker : ".DJI",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "Dow Jones"
						  }, {
							ticker : ".IXIC",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "Nasdaq"
						  }, {
							ticker : ".INX",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "S&P 500"
						  }, {
							ticker : "%5EFCHI",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "CAC 40"
						  }, {
							ticker : "%5ERUI",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "Russell 1000 Index"
						  }, {
							ticker : "%5ERUT",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "Russell 2000 Index"
						  }, {
							ticker : "%5EPSE",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "NYSE Arca Technology 100 Index"
						  }, {
							ticker : "%5EDJT",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "Dow Jones Transportation Average"
						  }, {
							ticker : "%5EIXCO",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "NASDAQ Computer Index"
						  }, {
							ticker : "%5EMID",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "S&P 400 Mid Cap Index"
						  }, {
							ticker : "%5ENDX",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "NASDAQ 100 Index"
						  }, {
							ticker : "%5ENYA",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "NYSE Composite Index"
						  }, {
							ticker : "%5EOEX",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "S&P 100 Index"
						  }, {
							ticker : "%5ESOX",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "PHLX Semiconductor Index"
						  }, {
							ticker : "%5EXAU",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "PHLX Gold/Silver Index"
						  }, {
							ticker : "%5EXAX",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "NYSE American Composite Index"
						  }, {
							ticker : "%5EXMI",
							changes :  (Math.random()*100).toFixed(0),
							price :  (Math.random()*100).toFixed(0),
							indexName : "NYSE Arca Major Market Index"
						  } ]

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
