# diffusion-kafka-app-L1

Introduction to Diffusion Real-Time Data Store through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud and Apache Kafka.

A set of simple projects, illustrating production and consumption of foreign exchange (fx) data streams to and from Kafka clusters and Diffusion Cloud instance via the use of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf).

These JavaScript code examples will help you publish fx data on real-time from a front end app to a Kafka cluster, consume from it and transform data on-the-fly via our powerful [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) feature. You can also use other programming languages from our [SDKs](https://docs.pushtechnology.com/#sdks), including iOS, Android, C, .NET, and more. 

# Lesson 1: Publish Topics to Kafka cluster
**diffusion-kafka-app-L1** introduces the concept of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf) and its configuration, as well as how to Publish fx data to ['Topics' (data structures)](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html). In Diffusion, data is stored and distributed through Topics (similar to Kafka).

# APIs used in this application

## **Step 1: Connect to Diffusion**
### [diffusion.connect](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#connect) > [*create your host*](https://management.ad.diffusion.cloud/)
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
### Go to: [Diffusion Cloud > Manage Service > Console > Topics](https://management.ad.diffusion.cloud/#!/login)
We are seeting up `_fxTopic` with the topic path: `diffusion.fx`
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
## **Step 4: Kafka Adapter Configuration**
### Go to: [Diffusion Cloud > Manage Service > Adapters > Kafka Adapter](https://management.ad.diffusion.cloud/#!/login)
#### Adapters > Kafka Adapter > Broadcast to Kafka
[![Kafka Adapter Video](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L1/images/adapter.png)](https://www.pushtechnology.com/blog/how-to-build-a-real-time-messaging-app-using-diffusion/)
```js
Adpapters > Kafka Adapter > Broadcast_to_Kafka Config:

	Broker > connect to you Kafka cluster > (eg: "kafka-plain.preprod-demo.pushtechnology.com:9094")
	Diffusion service credentials > admin, password, > (use the "Security" tab to create a user or admin account)
	Diffusion Topic > the data source to broadcast to Kafka cluster > (eg: "diffusion.fx")
	Kafka Topic > the destination topic at your Kafka cluster > (eg: "kafka.fx")

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
Set lines 32-34 of `public/js/producerApp.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: host ("kafkagateway.us.diffusion.cloud" by default)
* user: 'user'
* password: 'password'

# Execution

Really easy, just open the index.html file locally and off you go!

