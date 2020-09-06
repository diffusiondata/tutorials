let _session = null;
let _roomTopic = null;

// get query params from url
let name = getQueryVariable("name") || "Anonymous";
let password = getQueryVariable("password") || "Invalid password";
let room = getQueryVariable("room") || "No Room Selected";

// update room title on the chat.html page
document.getElementById("room-title").innerText = room;

// Hook into the form's onsubmit callback. This will send updates to the chatroom topic in Diffusion.
let form = document.getElementById("messageForm");
form.onsubmit = (evt) => {
    evt.preventDefault();
    let input = form.querySelector("[name='message']");
    let msg = input.value;

    // Prevent js injection attack
    msg = msg.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

    // Ignore empty messages
    if (msg === "") {
	return false;
    }

    // Send update to Diffusion
    _session.timeseries.append(_roomTopic,
			       {
				   text: msg,
				   name: name,
				   timestamp: new Date().toLocaleTimeString()
			       },
			       diffusion.datatypes.json());

    input.value = "";
    input.focus();
    return true;
};

// Connect to your Diffusion service, or leave this values and connect to our sandbox
// Sign up to Diffusion Cloud and get your service up a running in a minute.
diffusion.connect({
    host : "diffusionchatapp.eu.diffusion.cloud",
    principal : name,
    credentials : password
}).then(
    (session) => {
	// now we have a session open to our Diffusion service.
	console.log("Connected to Diffusion Server!");
	console.log(name + " wants to join " + room);
	_session = session;

	// Create a Diffusion Topic called Chat and as many subtopics as rooms we have.
	_roomTopic = "Chat/" + room;

	// Use a TimeSeries topic with a JSON data type.
	// This allows us to maintain a history of the chat, along with the ability to add metadata to the message (timestamp, name)
	session.topics.add(_roomTopic,
			   new diffusion.topics.TopicSpecification(diffusion.topics.TopicType.TIME_SERIES, {
			       TIME_SERIES_EVENT_VALUE_TYPE : "json",
			       TIME_SERIES_RETAINED_RANGE: "limit 100",
			       TIME_SERIES_SUBSCRIPTION_RANGE: "limit 100"
			   }));
	
	// Set up a stream to receive updates from the chatroom topic.
	session.addStream(_roomTopic, diffusion.datatypes.json())
	    .on("value", displayMessage);

	// Subscribe to the chatroom topic.
	session.select(_roomTopic);
	
	// Update the topic to announce the user's arrival in the chatroom.
	session.timeseries.append(_roomTopic,
				  {
				      text: name + " has joined",
				      name: "System",
				      timestamp: new Date().toLocaleTimeString()
				  },
				  diffusion.datatypes.json());
    },
    (err) => {
	alert(err);
    }
);

// Display a chat message received by Diffusion
function displayMessage(topic, specification, newValue, oldValue) {
    
    let msg = newValue.value.get();
    
    // insert messages in container
    let container = document.getElementById("messages");
    let entry = document.createElement("li");
    entry.classList.add("list-group-item");

    let header = document.createElement("strong");
    header.innerText = new Date().toUTCString() + " " + msg.name;
	let content = document.createElement("p");
	if(msg.name === name) {
		// Change my messages text style from other users
		content.classList.add("mymessages");
    }
    content.innerText = msg.text;

    entry.appendChild(header);
    entry.appendChild(content);
    container.appendChild(entry);

    // Scroll to bottom of container, to show latest message.
    container.scrollTop = container.scrollHeight - container.clientHeight;
}
