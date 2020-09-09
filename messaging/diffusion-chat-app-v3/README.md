# diffusion-chat-app-v3

This is sample chat application using [Diffusion Cloud](https://www.pushtechnology.com/product-overview).
Users can chat in realtime across various meeting rooms.
A simple projects, illustrating production and consumption of messages to and from a Diffusion Cloud instance.

# Version 3

**diffusion-chat-app-v3** introduces de concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) > [authentication, principals and roles](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/useraccess/atn_model.html).

# From our SDK

* [session.security.authenticationScriptBuilder()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/security.html#authenticationscriptbuilder)
```
session.security.authenticationScriptBuilder();
```
* [addPrincipal()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/systemauthenticationscriptbuilder.html#addprincipal) - [build()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/systemauthenticationscriptbuilder.html#build)
```
authenticationScriptBuilder
		.addPrincipal(name, password, ['CLIENT','TOPIC_CONTROL'])
		.build();
```
* [session.security.updateAuthenticationStore()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/security.html#updateauthenticationstore)
```
session.security.updateAuthenticationStore(addUserScript);
```

# Requirements

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion service (Cloud or On-Premise), version 6.5.0 or greater.
* Create a service [here](https://management.ad.diffusion.cloud/).
* Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/#diffusion-cloud-quick-start) and get your service up in a minute!

# Setup

Set line 28-30 of `public/js/signup.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: 'diffusionchatapp.eu.diffusion.cloud'

# Execution

Really easy, just open the index.html file locally and off you go!


