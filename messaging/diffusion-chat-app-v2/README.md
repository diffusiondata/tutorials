# diffusion-chat-app-v2

This is sample chat application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud.
Users can chat in realtime across various meeting rooms.
A simple projects, illustrating production and consumption of messages to and from a Diffusion Cloud instance.

# Version 2

**diffusion-chat-app-v2** introduces de concept of [Time Series](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/data/topics/timeseries_topics.html).

# From our SDK

* [diffusion.topics.TopicSpecification](https://docs.pushtechnology.com/docs/6.5.1/js/classes/topicspecification.html) : [TopicType.TIME_SERIES](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#topictypeenum.time_series)

```
diffusion.topics.TopicSpecification(diffusion.topics.TopicType.TIME_SERIES, 
	{
		TIME_SERIES_EVENT_VALUE_TYPE : "json",
		TIME_SERIES_RETAINED_RANGE: "limit 100",
		TIME_SERIES_SUBSCRIPTION_RANGE: "limit 100"
	});
```
* [session.timeseries.append](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/timeseries.html#append)
```
session.timeseries.append(_roomTopic,
	{
		text: msg 
		name: name,
		timestamp: new Date().toLocaleTimeString()
	},
	diffusion.datatypes.json());
```
			   

# Requirements

* A Diffusion service (Cloud or On-Premise), version 6.5.0 or greater.
* Create a service [here](https://management.ad.diffusion.cloud/)

# Setup

Set lines 44-46 of `public/js/app.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: host ("diffusionchatapp.eu.diffusion.cloud" by default)
* user: 'user'
* password: 'password'

# Execution

Really easy, just open the index.html file and off you go!

