# diffusion-kafka-app-L1

Introduction to Diffusion Real-Time Data Store through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud and Apache Kafka.

A set of simple projects, illustrating production and consumption of foreign exchange (fx) data streams to and from Kafka clusters and Diffusion Cloud instance via the use of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf).

These JavaScript code examples will help you publish fx data on real-time from a front end app to a Kafka cluster, consume from it and transform data on-the-fly via our powerful [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) feature. You can also use other programming languages from our [SDKs](https://docs.pushtechnology.com/#sdks), including iOS, Android, C, .NET, and more. 

# Lesson 1: Publish Topics to Kafka cluster
**diffusion-kafka-app-L1** introduces the concept of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf) and its configuration, as well as how to Publish fx data to ['Topics' (data structures)](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html). In Diffusion, data is stored and distributed through Topics (similar to Kafka).

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

Make sure to add Diffusion library to your code. For JavaScript, we have added the following line in our `public/diffusion2kafka.html`:
```
<script src='https://download.pushtechnology.com/clients/6.5.1/js/diffusion-6.5.1.js'></script>
```
Set lines 44-46 of `public/js/producerApp.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: host ("kafkagateway.us.diffusion.cloud" by default)
* user: 'user'
* password: 'password'

# Execution

Really easy, just open the index.html file locally and off you go!

