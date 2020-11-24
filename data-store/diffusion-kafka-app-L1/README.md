# diffusion-kafka-app-L1

Introduction to Diffusion Real-Time Event Stream through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud and Apache Kafka.

A set of simple projects, illustrating production and consumption of foreign exchange (fx) event streams to and from Kafka clusters and Diffusion Cloud instance via the use of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf).

These JavaScript code examples will help you publish fx events on real-time from a front end app to a Kafka cluster, consume from it and transform data on-the-fly via our powerful [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) feature. You can also use other programming languages from our [SDKs](https://docs.pushtechnology.com/#sdks), including iOS, Android, C, .NET, and more.


![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L1/images/kafkaL1.png)

# Lesson 1: Publish event streams to Kafka cluster
**diffusion-kafka-app-L1** introduces the concept of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf) and its configuration, to consume fx [topic data](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html) from your Diffusion server and publish it to Kafka cluster in specific Kafka topic.

# APIs used to build the publisher app

## **Step 1: Connect to Diffusion**
### [diffusion.connect](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#connect) > [*create your host*](https://dashboard.diffusion.cloud)
```js
diffusion.connect({
	host : host, // Use your Diffusion service or connect to our sandbox "kafkagateway.eu.diffusion.cloud"
	principal : "user",
	credentials : "password"})
```
## **Step 2: Create a Topic**
### [session.topics.add](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/topiccontrol.html#add)
```js
session.topics.add(_fxTopic, diffusion.topics.TopicType.JSON);
```
### Go to: [Diffusion Cloud > Manage Service > Console > Topics](https://dashboard.diffusion.cloud)
We are setting up `_fxTopic` with the topic path: `diffusion.fx`
![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L1/images/topics.png)

## **Step 3: Update a Topic**
### [session.topicUpdate.set](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/topicupdate.html#set)
```js
session.topicUpdate.set(_fxTopic, diffusion.datatypes.json(),
	{
		pairName : pairName,
		timestamp : new Date().getTime(),
		bid : bid.toFixed(2),
		offer : offer.toFixed(2)
	});
```
## **Step 3 Alternative: Update a Topic more efficiently**
### [session.topicUpdate.createUpdateStream](https://docs.pushtechnology.com/docs/6.5.1/js/interfaces/topicupdate.html#createupdatestream)
Update streams send a sequence of updates for a specific topic. They can result in more efficient use of the network as only the differences between the current value and the updated value are transmitted. 
```js
session.topicUpdate.createUpdateStream(_fxTopic, diffusion.datatypes.json()).set(
	{
		pairName : pairName,
		timestamp : new Date().getTime(),
		bid : bid.toFixed(2),
		offer : offer.toFixed(2)
	});
```
## **Step 4: Configure Kafka Adapter in Cloud**
### Go to: [Diffusion Cloud > Manage Service > Adapters > Kafka Adapter > Broadcast to Kafka](https://management.ad.diffusion.cloud/#!/login)
[![Kafka Adapter Video](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L1/images/adapter.png)](https://www.pushtechnology.com/blog/how-to-build-a-real-time-messaging-app-using-diffusion/)
```
Adapters > Kafka Adapter > Broadcast_to_Kafka Config:

	Bootstrap Server > connect to your Kafka cluster (eg: "kafka-plain.preprod-demo.pushtechnology.com:9094")
	Diffusion service credentials > your admin, password (use the "Security" tab to create a user or admin account)
	Diffusion Topic > source of events broadcasted to Kafka cluster (eg: "diffusion.fx")
	Kafka Topic > destination Kafka topic at your Kafka cluster (eg: "kafka.firehose.fx")

```
			   
# Pre-requisites

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion service (Cloud or On-Premise), version 6.6 (update to latest preview version) or greater. Create a service [here](https://management.ad.diffusion.cloud/).
* Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/#diffusion-cloud-quick-start) and get your service up in a minute!

# Setup

Make sure to add Diffusion library to your code. For JavaScript, we have added the following line in our `public/diffusion2kafka.html`:
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

# Go to Lesson 2

[Click here](https://github.com/pushtechnology/tutorials/tree/master/data-store/diffusion-kafka-app-L2) to go to lesson 2.
**diffusion-kafka-app-L2** introduces the concept of [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html), a dynamic mechanism to map part of a server's [Topic Tree](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_tree.html) to another. This enables real-time data transformation before sending it to subscribed clients as well as to create dynamic data models based on on-the-fly data (eg: Kafka firehose data).
This lesson also shows how to Subscribe to fx data using Diffusion Topic Views in order to consume what you need, not all the Kafka stream.
