let _session = null;

// Hook into the form's onsubmit callback.
// This will add a new user to the system authentication config on the Diffusion service.
let form = document.getElementById("accountForm");
form.onsubmit = (evt) => {

	// Stay in the form until session is established
	if (_session == null) {
		evt.preventDefault();
	}

	let inputHost = form.querySelector("[name='host']");
	let host = inputHost.value;
	if (host == ""){
		// Uses our sandbox if no Diffusion service is provided in the form
		host = "diffusionchatapp.eu.diffusion.cloud";
	}
	
	let inputName = form.querySelector("[name='name']");
	let name = inputName.value;

	let inputPassword = form.querySelector("[name='password']");
	let password = inputPassword.value;

	// Connect to your Diffusion service as 'admin' to add new users, or use our 'auth-handler' user to connect to our sandbox
	let sessionPromise = diffusion.connect({
		host : host, // Use your Diffusion service or connect to our sandbox "diffusionchatapp.eu.diffusion.cloud"
		principal : 'auth-handler', // If you have not created this role in your service, use your Admin principal
		credentials : 'password' // make sure to update the passowrd as well
	});

	// Update submit button's text and style to prompt chatroom access
	// TODO: Find a way to wait for session to be established before calling .then
	updateButton();
	
	sessionPromise.then(
		(session) => {
			// now we have a session open to our Diffusion service.
			console.log("Connected to Diffusion Service: " + host);
			_session = session;

			// Changes to the system authentication config are done with a SystemAuthenticationScriptBuilder 
			let authenticationScriptBuilder = session.security.authenticationScriptBuilder();

			// Add a new user and set password & roles.
			let addUserScript = authenticationScriptBuilder
				.addPrincipal(name, password, ['CLIENT','TOPIC_CONTROL'])
				.build();

			console.log("System wants to add new user: " + name);

			// Update the system authentication store
			session.security.updateAuthenticationStore(addUserScript).then(function() {
				console.log('Updated system authentication config');
			}, function(error) {
				console.log('Failed to update system authentication: ', error);
			});
		},
		(err) => {
			alert(err);
		}
	);
};

// Update button text and style
function updateButton() {
	let button = document.getElementById("submit");
	button.style = "color:#3d3d3d; background-color:#ffffff;";
	button.value = "Account created, go to chatroom!";
}
