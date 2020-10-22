# diffusion-kafka-app-L1

# Lesson 1: Publish messages from Diffusion to Kafka
**diffusion-kafka-app-L1** introduces the concept of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf) and its configuration.
In this lesson, I will present how to configure Kafka adapter in cloud, to consume [topic data](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html) from 
Diffusion server and publish it to Kafka cluster in specific Kafka topic.


# **Step 1: Setup Diffusion publisher**
## APIs used in this application
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

# **Step 2: Configure Kafka Adapter in Cloud**
## Kafka Adapter Configuration > Broadcast to Kafka
### Go to: [Diffusion Cloud > Manage Service > Adapters > Kafka Adapter](https://management.ad.diffusion.cloud/#!/login)
[![Kafka Adapter Video](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L1/images/adapter.png)](https://www.pushtechnology.com/blog/how-to-build-a-real-time-messaging-app-using-diffusion/)
```js
Adapters > Kafka Adapter > Broadcast_to_Kafka Config:

	Broker > connect to you Kafka cluster > (eg: "kafka-plain.preprod-demo.pushtechnology.com:9094")
	Diffusion service credentials > admin, password, > (use the "Security" tab to create a user or admin account)
	Diffusion Topic > the Diffusion topic selector, from which messages are to be broadcasted to Kafka cluster > (eg: "diffusion.fx")
	Kafka Topic > the destination Kafka topic at your Kafka cluster > (eg: "kafka.fx")

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

