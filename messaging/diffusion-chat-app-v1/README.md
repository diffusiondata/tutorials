# diffusion-chat-app-v1

This is sample chat application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud.
Users can chat in realtime across various meeting rooms.
A simple projects, illustrating production and consumption of chat messages to and from a Diffusion Cloud instance.

# Version 1

diffusion-chat-app-v1 introduces de concept of Publish and Subscribe to topics (data structures).

# From our SDK

* [diffusion.connect](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#connect)
```
diffusion.connect({
	host : "diffusionchatapp.eu.diffusion.cloud",
	principal : "user",
	credentials : "password"})
```
* [session.topics.add](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/topiccontrol.html#add)
```
session.topics.add(_roomTopic, diffusion.topics.TopicType.JSON);
```
* [session.addStream](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/session.html#addstream)
```
session.addStream(_roomTopic, diffusion.datatypes.json());
```
* [session.select](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/session.html#select)
```
session.select(_roomTopic);
```
* [session.topicUpdate.set](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/topicupdate.html#set)
```
session.topicUpdate.set(_roomTopic, diffusion.datatypes.json(),
	{
		text: msg,
		name: name,
		timestamp: new Date().toLocaleTimeString()
	});
```

# Requirements

* A Diffusion service (Cloud or On-Premise), version 6.5.0 or greater.
* Create a service [here](https://management.ad.diffusion.cloud/)

# Setup

Set lines 43 of `public/js/app.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: 'diffusionchatapp.eu.diffusion.cloud'
* user: 'user'
* password: 'password'

# Execution

Really easy, just open the index.html file and off you go!
