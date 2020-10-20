[![Video Tutorial](https://github.com/pushtechnology/tutorials/blob/master/data-store/video.png)](https://www.pushtechnology.com/blog/how-to-build-a-real-time-messaging-app-using-diffusion/)
# Real-Time Data Store

Introduction to Diffusion Real-Time Data Store through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud and Apache Kafka.

A set of simple projects, illustrating production and consumption of foreign exchange (fx) data streams to and from Kafka clusters and Diffusion Cloud instance via the use of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf).

These JavaScript code examples will help you publish fx data on real-time from a front end app to a Kafka cluster, consume from it and transform data on-the-fly via our powerful [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html) feature. You can also use other programming languages from our [SDKs](https://docs.pushtechnology.com/#sdks), including iOS, Android, C, .NET, and more. 

# Lesson 1: Publish Topics to Kafka cluster
[diffusion-kafka-app-L1](https://github.com/pushtechnology/tutorials/tree/master/data-store/diffusion-kafka-app-L1) introduces the concept of our [Kafka Adapter](https://www.pushtechnology.com/wp-content/uploads/2020/08/Diffusion-Cloud-Kafka-adapter.pdf) and its configuration, as well as how to Publish fx data to ['Topics' (data structures)](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html). In Diffusion, data is stored and distributed through Topics (similar to Kafka).

# Lesson 2: Ingest Kafka Topics (firehose) and Create Topic Views
[diffusion-kafka-app-L2](https://github.com/pushtechnology/tutorials/tree/master/data-store/diffusion-kafka-app-L2) introduces the concept of [Topic Views](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_views.html), a dynamic mechanism to map part of a server's [Topic Tree](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/data/topictree/topic_tree.html) (data structure) to another. This enables real-time data transformation before sending it to subscribed clients as well as to create dynamic data models based on on-the-fly data (eg: Kafka firehose data).

# Lesson 3: Subscribe to Kafka Topic Views (Consume what you need, not all the Kafka stream)
[diffusion-kafka-app-L3](https://github.com/pushtechnology/tutorials/tree/master/data-store/diffusion-kafka-app-L2) introduces the concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) and topic [path permissions](https://docs.pushtechnology.com/docs/6.5.2/manual/html/designguide/security/permissions_reference.html) for fine-grained security management of your data structure.

# The code in action
[![Video Tutorial](https://github.com/pushtechnology/tutorials/blob/master/messaging/diffusion-msg-app-L1/code-example.png)](https://youtu.be/tTx8q4oPx7E?t=336)

# Pre-requisites

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion service (Cloud or On-Premise), version 6.5.0 (potentially 6.6) or greater. Create a service [here](https://management.ad.diffusion.cloud/).
* Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/#diffusion-cloud-quick-start) and get your service up in a minute!

# Setup

Make sure to add Diffusion library to your code. For JavaScript, we have added the following line in our `public/kafka2diffusion.html` and `public/diffusion2kafka.html`:
```
<script src='https://download.pushtechnology.com/clients/6.5.1/js/diffusion-6.5.1.js'></script>
```
Update `public/js/producerApp.js` and `public/js/subscriberApp.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
```
* host: 'kafkagateway.us.diffusion.cloud'
* user: 'user'
* password: 'password'
```
