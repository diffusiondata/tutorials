# diffusion-kafka-app-L2

Introduction to Diffusion Real-Time Data Store through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud and Apache Kafka.

A set of simple projects, illustrating production and consumption of foreign exchange (fx) data streams to and from Kafka clusters and Diffusion Cloud instance via the use of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf).

These JavaScript code examples will help you publish fx data on real-time from a front end app to a Kafka cluster, consume from it and transform data on-the-fly via our powerful [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) feature. You can also use other programming languages from our [SDKs](https://docs.pushtechnology.com/#sdks), including iOS, Android, C, .NET, and more. 

# Lesson 2: Ingest Kafka Topics (firehose) and Create Topic Views
**diffusion-kafka-app-L2** introduces the concept of [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html), a dynamic mechanism to map part of a server's [Topic Tree](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_tree.html) (data structure) to another. This enables real-time data transformation before sending it to subscribed clients as well as to create dynamic data models based on on-the-fly data (eg: Kafka firehose data).

# Features used in this lesson

## Step 1: Kafka Adapter Configuration > Ingest from Kafka
### Go to: [Diffusion Cloud > Manage Service > Adapters > Kafka Adapter](https://management.ad.diffusion.cloud/#!/login)
[![Kafka Adapter Video](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/ingest.png)](https://www.pushtechnology.com/blog/how-to-build-a-real-time-messaging-app-using-diffusion/)
```js
Adpapters > Kafka Adapter > Ingest_from_Kafka Config:

	Bootstrap Server > connect to you Kafka cluster > (eg: "kafka-plain.preprod-demo.pushtechnology.com:9094")
	Diffusion service credentials > admin, password, > (use the "Security" tab to create a user or admin account)
	Kafka Topic subscription > the source topic from your Kafka cluster > (eg: "kafka.firehose.fx")
	Kafka Topic value type > we are using JSON but can be string, integer, byte, etc.
```
## Step 2: Check the Kafka stream is ingested
### Go to: [Diffusion Cloud > Manage Service > Console > Topics](https://management.ad.diffusion.cloud/#!/login)
We can see the `kafka.firehose.fx` stream from Kafka cluster (we set up on previous step) is now being ingested by Diffusion with the topic path: `kafka.firehose.fx`

![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/kafka%20firehose.png)

## Step 3: Create a Topic View using [Source value directives](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html)
Source value directives use the keyword [`scalar()`](https://www.pushtechnology.com/blog/tutorial/using-topic-views-5.naming-reference-topic-with-topic-content/) and are parameterized by a single JSON pointer that extracts a scalar value from the source value.
### Go to: [Diffusion Cloud > Manage Service > Console > Topics > Topic Views](https://management.ad.diffusion.cloud/#!/login)
We are going to map `kafka.firehose.fx` stream (we set up on previous step) to a new Diffusion Topic View with path: `kafka/fx/<scalar(/value/pairName)>` where `/value/pairName` is the Kafka payload currency pairName (from previous step).

***This Topic View will act as a real-time multiplexer sending only the currency pair the Kafka stream consumer is subscribed to, and not the whole stream.***

![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/topic%20views.png)

## Step 4: Check the Topic View is multiplexing the Kafka firehose
As new values are coming in from the Kafka firehose, Diffusion is multiplexing and publishing the currency pairs on real-time.

**Note:** The topic path will dynamically change as new currency pair values come in.
### Go to: [Diffusion Cloud > Manage Service > Console > Topics](https://management.ad.diffusion.cloud/#!/login)

![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/topic%20path.png)

# Pre-requisites

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion service (Cloud or On-Premise), version 6.5.0 or greater. Create a service [here](https://management.ad.diffusion.cloud/).
* Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/#diffusion-cloud-quick-start) and get your service up in a minute!

# Setup

Make sure to add Diffusion library to your code. For JavaScript, we have added the following line in our `public/diffusion2kafka.html` and `public/diffusion2kafka.html`:
```
<script src='https://download.pushtechnology.com/clients/6.5.1/js/diffusion-6.5.1.js'></script>
```
Set lines 32-34 of `public/js/producerApp.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: host ("kafkagateway.us.diffusion.cloud" by default)
* user: 'user'
* password: 'password'

# Execution

Really easy, just open the index.html file locally and off you go!

