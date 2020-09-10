<img src="https://www.pushtechnology.com/wp-content/themes/pushtechnology/img/diffusion-padding-bottom.png" height="80" title="Logo">

# Real-Time Messaging

Introduction to Diffusion Real-Time Messaging through a simple application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud.

Users can interact in realtime across various topic rooms.

Simple projects, illustrating production and consumption of messages to and from a Diffusion Cloud instance.

# Lesson 1: Topics
[diffusion-chat-app-v1](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v1) introduces the concept of Publish and Subscribe to [topics (data structures)](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html).

# Lesson 2: Time Series
[diffusion-chat-app-v2](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v2) introduces the concept of [Time Series](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/data/topics/timeseries_topics.html) to retrive a define sequence of past messages.

# Lesson 3: Security
[diffusion-chat-app-v3](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v3) introduces the concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) > [authentication, principals and roles](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/useraccess/atn_model.html).


# Pre-requisites

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion service (Cloud or On-Premise), version 6.5.0 or greater. Create a service [here](https://management.ad.diffusion.cloud/).
* Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/#diffusion-cloud-quick-start) and get your service up in a minute!

# Setup

Update `public/js/app.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: 'diffusionchatapp.eu.diffusion.cloud'
* user: 'user'
* password: 'password'

# Chat UI

<img src="https://github.com/pushtechnology/tutorials/blob/master/messaging/chat-screen.png" height="500" title="chat-screen">
