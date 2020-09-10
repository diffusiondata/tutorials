# diffusion-chat-app-v2

This is a sample chat application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud.

Users can chat in real time across various meeting rooms.

A simple project illustrating production and consumption of messages to and from a Diffusion Cloud instance.

This version preserves the chat history and displays it when you rejoin a room. History is stored using the time series topic type, which contains a timestamped series of events.

# Version 2

**diffusion-chat-app-v2** introduces the concept of [Time Series](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/data/topics/timeseries_topics.html) topics.

# From our SDK

* [diffusion.topics.TopicSpecification](https://docs.pushtechnology.com/docs/6.5.1/js/classes/topicspecification.html) : [TopicType.TIME_SERIES](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#topictypeenum.time_series)

```js
diffusion.topics.TopicSpecification(diffusion.topics.TopicType.TIME_SERIES, 
	{
		TIME_SERIES_EVENT_VALUE_TYPE : "json",
		TIME_SERIES_RETAINED_RANGE: "limit 100",
		TIME_SERIES_SUBSCRIPTION_RANGE: "limit 100"
	});
```
* [session.timeseries.append](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/timeseries.html#append)
```js
session.timeseries.append(_roomTopic,
	{
		text: msg 
		name: name,
		timestamp: new Date().toLocaleTimeString()
	},
	diffusion.datatypes.json());
```
			   

# Requirements

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion Cloud service, version 6.5.0 or greater.
* Create a service [here](https://diffusion.cloud/).

# Setup

Set lines 44-46 of `public/js/app.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: host ("diffusionchatapp.eu.diffusion.cloud" by default)
* user: 'user'
* password: 'password'

# Execution

Really easy - just open the index.html file locally and off you go!

