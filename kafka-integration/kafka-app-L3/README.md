# Fine-grained distribution of Kafka event firehose with Topic Views

Introduction to Diffusion Real-Time Event Stream through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud and Apache Kafka.

A set of simple projects, illustrating production and consumption of foreign exchange (fx) event streams to and from Kafka clusters and Diffusion Cloud instance via the use of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf).

These JavaScript code examples will help you publish fx events on real-time from a front end app to a Kafka cluster, consume from it and transform data on-the-fly via our powerful [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) feature. You can also use other programming languages from our [SDKs](https://docs.pushtechnology.com/#sdks), including iOS, Android, C, .NET, and more.


![](https://github.com/pushtechnology/tutorials/blob/master/kafka-integration/kafka-app-L3/images/kafkaL2.png)

# Fine-grained distribution of Kafka event firehose with Topic Views
**diffusion-kafka-app-L2** introduces the concept of [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html), a dynamic mechanism to map part of a server's [Topic Tree](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_tree.html) to another. This enables real-time data transformation before sending it to subscribed clients as well as to create dynamic data models based on on-the-fly data (eg: Kafka firehose data).
This lesson also shows how to Subscribe to fx data using Diffusion Topic Views in order to consume what you need, not all the Kafka stream.

# Features used in this lesson

## Step 1: Configure Kafka Adapter in Cloud
### Go to: [Diffusion Cloud > Manage Service > Adapters > Kafka Adapter > Ingest from Kafka](https://dashboard.diffusion.cloud)
[![Kafka Adapter Video](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/ingest.png)](https://www.pushtechnology.com/blog/how-to-build-a-real-time-messaging-app-using-diffusion/)
```
Adapters > Kafka Adapter > Ingest_from_Kafka Config:

	Bootstrap Server > connect to you Kafka cluster (eg: "kafka-plain.preprod-demo.pushtechnology.com:9094")
	Diffusion service credentials > admin, password (use the "Security" tab to create a user or admin account)
	Kafka Topic subscription > the source topic from your Kafka cluster (eg: "kafka.firehose.fx")
	Kafka Topic value type > we are using JSON but can be string, integer, byte, etc.
	Kafka Topic key type > use string type for this code example.
```

## Step 2: Check the Kafka stream is ingested
### Go to: [Diffusion Cloud > Manage Service > Console > Topics](https://dashboard.diffusion.cloud)
We can see the events from `kafka.firehose.fx` Kafka topic (we set up on previous step) is now being published to Diffusion topic path: `kafka.firehose.fx`. If there are no new events, it might be because the `kafka.firehose.fx` topic has not received any updates from Kafka.

![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/kafka%20firehose.png)

## Step 3: Create a Topic View using [Source value directives](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html)
Source value directives use the keyword [`scalar()`](https://www.pushtechnology.com/blog/tutorial/using-topic-views-5.naming-reference-topic-with-topic-content/) and are parameterized by a single JSON pointer that extracts a scalar value from the source value.

There are also other directives like [`expand()` value directive](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) to create multiple reference topics from a single JSON source topic, or [`value()` directive](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) to create a [new JSON value](https://www.pushtechnology.com/blog/new-topic-view-features-in-6.4) with a subset of a JSON source topic.

### Go to: [Diffusion Cloud > Manage Service > Console > Topics > Topic Views](https://management.ad.diffusion.cloud/#!/login)
We are going to `map` `kafka.firehose.fx` stream (we set up on previous step) `to` a new Diffusion Topic View with path: `kafka/fx/<scalar(/value/pairName)>` where `/value/pairName` is the Kafka payload currency `pairName` (from previous step).

***This Topic View will take care of dynamic branching and routing of event streams in real-time, by only sending the specific currency pair, the Kafka stream consumer is subscribed to, and not the whole stream.***

##### Topic View Specification:
##### `map kafka.firehose.fx to kafka/fx/<scalar(/value/pairName)>`

![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/topic%20views.png)

***Alternatively, this is another example combining scalar and expand value directives used for dynamic branching and routing of event streams in real-time:***
##### Topic View Specification:
##### `map kafka.firehose.fx to kafka/fx/<scalar(/value/pairName)>/<expand(/value)>`

## Step 4: Dynamic branching and routing of Kafka events firehose
As new events are coming in from the Kafka firehose, Diffusion is dynamically branching and routing the currency pairs to the right subscriber.

**Note:** The topic path will dynamically change as new currency pair values come in.

### Go to: [Diffusion Cloud > Manage Service > Console > Topics](https://management.ad.diffusion.cloud/#!/login)

##### The following image shows a Topic View for the following specification:
##### `map kafka.firehose.fx to kafka/fx/<scalar(/value/pairName)>`
![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/topic%20path.png)

##### Alternatively, the following image shows a Topic View for the following specification:
##### `map kafka.firehose.fx to kafka/fx/<scalar(/value/pairName)>/<expand(/value)>`
![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/expand.png)


## Suggested: 6 Lessons Using Topic Views
### Lesson 1: [Mapping Topics](https://www.pushtechnology.com/blog/tutorial/using-topic-views-1.mapping-topics/)
### Lesson 2: [Mapping Topic Branches](https://www.pushtechnology.com/blog/tutorial/using-topic-views-2.mapping-topic-branches/)
### Lesson 3: [Extracting Source Topic Values](https://www.pushtechnology.com/blog/tutorial/using-topic-views-3.-extracting-source-topic-values/)
### Lesson 4: [Throttling Reference Topics](https://www.pushtechnology.com/blog/tutorial/using-topic-views-4.throttling-reference-topics/)
### Lesson 5: [Naming Reference Topic With Topic Content](https://www.pushtechnology.com/blog/tutorial/using-topic-views-5.naming-reference-topic-with-topic-content/)
### Lesson 6: [Changing Topic Properties Of Reference Topics](https://www.pushtechnology.com/blog/tutorial/using-topic-views-6.changing-topic-properties-of-reference-topics/)

# APIs used in the subscriber application

## **Step 1: Connect to Diffusion**
### [diffusion.connect](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#connect) > [*create your host*](https://management.ad.diffusion.cloud/)
```js
diffusion.connect({
	host : host, // Use your Diffusion service or connect to our sandbox "kafkagateway.eu.diffusion.cloud"
	principal : "user", // This user has access to all topic tree, so no granular security is done here (check lesson 3 for security and permissions)
	credentials : "password"})
```
## **Step 2: Create a Topic Listener**
### [session.addStream](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/session.html#addstream)
In this case `_fxTopic` is the path to the currency pairName, eg: `kafka/fx/GBP:EUR`
```js
session.addStream(_fxTopic, diffusion.datatypes.json());
```
## **Step 3: Subscribe to a Topic**
### [session.select](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/session.html#select)
```js
session.select(_fxTopic);
```

# Pre-requisites

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion service (Cloud or On-Premise), version 6.6 (update to latest preview version) or greater. Create a service [here](https://management.ad.diffusion.cloud/).
* Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/#diffusion-cloud-quick-start) and get your service up in a minute!

# Setup

Make sure to add Diffusion library to your code. For JavaScript, we have added the following line in our `public/diffusion2kafka.html` and `public/diffusion2kafka.html`:
```
<script src='https://download.pushtechnology.com/clients/6.5.1/js/diffusion-6.5.1.js'></script>
```
Set lines 32-34 of `public/js/producerApp.js` and lines 50-52 of `public/js/subscriberApp.js`to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: host ("kafkagateway.us.diffusion.cloud" by default)
* user: 'user'
* password: 'password'

# Execution

Really easy, just open the index.html file locally and off you go!

# Go to Lesson 3

[Click here](https://github.com/pushtechnology/tutorials/tree/master/data-store/diffusion-kafka-app-L3) to go to lesson 3.
**diffusion-kafka-app-L3** introduces the concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) and topic [path permissions](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/security/permissions_reference.html) for fine-grained security management of your data structure. It also shows how to Subscribe to fx data using [Diffusion Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) in order to consume what you need, not all the Kafka stream.
