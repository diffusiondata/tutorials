let _session = null;

// Hook into the form's onsubmit callback.
// This will add a new user to the system authentication config on the Diffusion service.
let form = document.getElementById("accountForm");
form.onsubmit = (evt) => {
	//evt.preventDefault();
	
	let inputName = form.querySelector("[name='name']");
	let name = inputName.value;

	let inputPassword = form.querySelector("[name='password']");
	let password = inputPassword.value;
	
    // Prevent js injection attack
	name = name.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();
	password = password.replace(/</g, "&lt;").replace(/>/g, "&gt;").trim();

	console.log("Admin wants to add new user: " + name);

	// Changes to the system authentication config are done with a SystemAuthenticationScriptBuilder 
	let authenticationScriptBuilder = _session.security.authenticationScriptBuilder();

	// Add a new user and set password & roles.
	let addUserScript = authenticationScriptBuilder
		.addPrincipal(name, password, ['CLIENT','TOPIC_CONTROL'])
		.build();

	// Update the system authentication store
	_session.security.updateAuthenticationStore(addUserScript).then(function() {
		console.log('Updated system authentication config');
	}, function(error) {
		console.log('Failed to update system authentication: ', error);
	});

};

// Connect to your Diffusion service as admin to add new users, or leave this values and connect to our sandbox
diffusion.connect({
    host : "diffusionchatapp.eu.diffusion.cloud",
    principal : 'auth-handler',
    credentials : 'password'
}).then(
    (session) => {
		// now we have a session open to our Diffusion service.
		console.log("Connected to Diffusion Server!");
		_session = session;
	},
	(err) => {
		alert(err);
	}
);
