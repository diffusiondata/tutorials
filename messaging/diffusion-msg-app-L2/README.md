# diffusion-msg-app-L2

Introduction to Diffusion Real-Time Messaging through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud.

Users can interact in realtime across various topic rooms.

Simple projects, illustrating production and consumption of messages to and from a Diffusion Cloud instance.

# Lesson 2: Time Series

**diffusion-msg-app-L2** introduces the concept of [Time Series](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/data/topics/timeseries_topics.html) topic to hold a sequence of events. Time series topics are useful for collaborative applications such as chat rooms. Multiple users can concurrently update a time series topic.

# APIs used in this application

## Step 1: Topic Types and Specifications
### [diffusion.topics.TopicSpecification](https://docs.pushtechnology.com/docs/6.5.1/js/classes/topicspecification.html) : [TopicType.TIME_SERIES](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#topictypeenum.time_series)

```js
diffusion.topics.TopicSpecification(diffusion.topics.TopicType.TIME_SERIES, 
	{
		TIME_SERIES_EVENT_VALUE_TYPE : "json",
		TIME_SERIES_RETAINED_RANGE: "limit 100",
		TIME_SERIES_SUBSCRIPTION_RANGE: "limit 100"
	});
```
## Step 2: Append/Update Time Series
### [session.timeseries.append](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/timeseries.html#append)
```js
session.timeseries.append(_roomTopic,
	{
		text: msg 
		name: name,
		timestamp: new Date().toLocaleTimeString()
	},
	diffusion.datatypes.json());
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

