# diffusion-msg-app-L3
Introduction to Diffusion Real-Time Messaging through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud.

Users can interact in realtime across various topic rooms.

Simple projects, illustrating production and consumption of messages to and from a Diffusion Cloud instance.

# Lesson 3: Security
[diffusion-msg-app-L3](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v3) introduces the concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) by requiring sessions to [authenticate](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/useraccess/atn_model.html) and use [role-based](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/role_based_security.html) authorization to define the actions that a client can perform.

# APIs used in this application
## Step 1: Using Auth script builder
### [session.security.authenticationScriptBuilder()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/security.html#authenticationscriptbuilder)
```js
session.security.authenticationScriptBuilder();
```
## Step 2: Create a new user (principal) with a user name, password and [ROLES](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/roles_permissions.html)
### [addPrincipal()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/systemauthenticationscriptbuilder.html#addprincipal) - [build()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/systemauthenticationscriptbuilder.html#build)
```js
authenticationScriptBuilder
		.addPrincipal(name, password, ['CLIENT','TOPIC_CONTROL'])
		.build();
```
## Step 3: Update the Auth store
### [session.security.updateAuthenticationStore()](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/security.html#updateauthenticationstore)
```js
session.security.updateAuthenticationStore(addUserScript);
```

# Pre-requisites
*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion service (Cloud or On-Premise), version 6.5.0 or greater. Create a service [here](https://management.ad.diffusion.cloud/).
* Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/#diffusion-cloud-quick-start) and get your service up in a minute!

# Setup
Set line 28-30 of `public/js/signup.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: 'diffusionchatapp.eu.diffusion.cloud'

# Execution
Really easy, just open the index.html file locally and off you go!


