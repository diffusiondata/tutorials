# diffusion-chat-app-v3

This is a sample chat application using [Diffusion Cloud](https://www.pushtechnology.com/product-overview).

Users can chat in real time across various meeting rooms.

A simple project illustrating production and consumption of messages to and from a Diffusion Cloud instance.

Instead of allowing everyone to connect with the Diffusion admin principal, this version of the app prompts you to create an account by supplying a username and password. 

The app uses the account details to create a Diffusion principal with the correct permissions to send and receive chat messages. Each user is authenticated as their own individual principal.

# Version 3

**diffusion-chat-app-v3** introduces the concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) > [authentication, principals and roles](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/useraccess/atn_model.html).

# From our SDK

* [session.security.authenticationScriptBuilder()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/security.html#authenticationscriptbuilder)
```js
session.security.authenticationScriptBuilder();
```
* [addPrincipal()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/systemauthenticationscriptbuilder.html#addprincipal) - [build()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/systemauthenticationscriptbuilder.html#build)
```js
authenticationScriptBuilder
		.addPrincipal(name, password, ['CLIENT','TOPIC_CONTROL'])
		.build();
```
* [session.security.updateAuthenticationStore()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/security.html#updateauthenticationstore)
```js
session.security.updateAuthenticationStore(addUserScript);
```

# Requirements

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion Cloud service, version 6.5.0 or greater.
* Create a service [here](https://management.ad.diffusion.cloud/).

# Setup

Set line 28-30 of `public/js/signup.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: 'diffusionchatapp.eu.diffusion.cloud'


# Execution

Really easy - just open the index.html file locally and off you go!

In this version, before you can chat, you need to click *Create Account* at the bottom of index.html.
