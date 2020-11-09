# diffusion-kafka-app-L3

Introduction to Diffusion Real-Time Event Stream through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud and Apache Kafka.

A set of simple projects, illustrating production and consumption of foreign exchange (fx) event streams to and from Kafka clusters and Diffusion Cloud instance via the use of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf).

These JavaScript code examples will help you publish fx events on real-time from a front end app to a Kafka cluster, consume from it and transform data on-the-fly via our powerful [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) feature. You can also use other programming languages from our [SDKs](https://docs.pushtechnology.com/#sdks), including iOS, Android, C, .NET, and more. 

# Lesson 3: Subscribe to Kafka Topic Views
**diffusion-kafka-app-L3** introduces the concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) and topic [path permissions](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/security/permissions_reference.html) for fine-grained security management of your data structure. It also shows how to Subscribe to fx data using [Diffusion Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) in order to consume what you need, not all the Kafka stream.

# APIs used in the secure subscriber application

## **Step 1: Connect to Diffusion**
### [diffusion.connect](https://docs.pushtechnology.com/docs/6.5.1/js/globals.html#connect) > [*create your host*](https://management.ad.diffusion.cloud/)
```js
diffusion.connect({
	host : host, // Use your Diffusion service or connect to our sandbox "kafkagateway.eu.diffusion.cloud"
	principal : "GBP:EUR Subscriber", // This user only have access to a specific topic path: "kafka/fx/GBP:EUR"
	credentials : "password"
})
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
### Go to: [Diffusion Cloud > Manage Service > Console > Topics](https://management.ad.diffusion.cloud/#!/login)
We can see the events from ``kafka.firehose.fx`` Kafka topic (we set up on previous step) is now being published to Diffusion topic path: ``kafka.firehose.fx``. If there are no new events, it might be because the `kafka.firehose.fx` topic has not received any updates from Kafka.

![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/kafka%20firehose.png)

## Step 4: Dynamic branching and routing of Kafka events firehose
As new events are coming in from the Kafka firehose, Diffusion is dynamically branching and routing the currency pairs to the right sunscriber.

**Note:** In this example, the subscriber app is listening for changes in topic ``_fxTopic`` and its values, in this case:
```js
_fxTopic = "kafka/fx/GBP:EUR";
```
### Go to: [Diffusion Cloud > Manage Service > Console > Topics](https://management.ad.diffusion.cloud/#!/login)

![](https://github.com/pushtechnology/tutorials/blob/master/data-store/diffusion-kafka-app-L2/images/topic%20path.png)

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
Set lines 50-52 of `public/js/subscriberApp.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: host ("kafkagateway.us.diffusion.cloud" by default)
* user: "GBP:EUR Subscriber", // This user only have access to a specific topic path: "kafka/fx/GBP:EUR"
* password: 'password'

# Execution

Really easy, just open the index.html file locally and off you go!

