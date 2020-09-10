# diffusion-msg-app-L1

Introduction to Diffusion Real-Time Messaging through a simple application using Diffusion Cloud.

Users can interact in realtime across various topic rooms.

Simple projects, illustrating production and consumption of messages to and from a Diffusion Cloud instance.

# Lesson 1: Publish and Subscribe

[**diffusion-msg-app-L1**](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v1) introduces the concept of Publish and Subscribe to ['Topics' (data structures)](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html).

In Diffusion, data is stored and distributed through Topics. Session can subscribe to a topic to receive notifications when the topic value changes and can also update the value. When a topic is updated, all its subscribers are notified of the new value. Diffusion takes care of efficiently broadcasting value changes, even if there are hundred of thousands of subscribers.

# APIs used in this application

## **Step 1: Connect to Diffusion**
### [diffusion.connect](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#connect) > [*create your host*](https://management.ad.diffusion.cloud/)
```js
diffusion.connect({
	host : host, // Use your Diffusion service or connect to our sandbox "diffusionchatapp.eu.diffusion.cloud"
	principal : "user",
	credentials : "password"})
```
## **Step 2: Create a Topic**
### [session.topics.add](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/topiccontrol.html#add)
```js
session.topics.add(_roomTopic, diffusion.topics.TopicType.JSON);
```
## **Step 3: Create a Topic Listener**
### [session.addStream](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/session.html#addstream)
```js
session.addStream(_roomTopic, diffusion.datatypes.json());
```
## **Step 4: Subscribe to a Topic**
### [session.select](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/session.html#select)
```js
session.select(_roomTopic);
```
## **Step 5: Update a Topic**
### [session.topicUpdate.set](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/topicupdate.html#set)
```js
session.topicUpdate.set(_roomTopic, diffusion.datatypes.json(),
	{
		text: msg,
		name: name,
		timestamp: new Date().toLocaleTimeString()
	});
```

# Pre-requisites

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion service (Cloud or On-Premise), version 6.5.0 or greater. Create a service [here](https://management.ad.diffusion.cloud/).
* Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/#diffusion-cloud-quick-start) and get your service up in a minute!

# Setup

Set lines 44-46 of `public/js/app.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: host ("diffusionchatapp.eu.diffusion.cloud" by default)
* user: 'user'
* password: 'password'

# Execution

Really easy, just open the index.html file locally and off you go!
