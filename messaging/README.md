<img src="https://www.pushtechnology.com/wp-content/themes/pushtechnology/img/diffusion-padding-bottom.png" height="80" title="Logo">

# Real-Time Publish-Subscribe

Introduction to Diffusion Real-Time Pub-Sub through a simple chat application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud.

Users can chat in real time across various chat rooms.

This is a simple project, illustrating production and consumption of messages to and from a Diffusion Cloud service.

# Lesson 1: Topics
[diffusion-chat-app-v1](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v1) introduces the concept of Publish and Subscribe to [topics (data structures)](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html).

# Lesson 2: Time Series
[diffusion-chat-app-v2](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v2) introduces the concept of [Time Series topics](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/data/topics/timeseries_topics.html) to retrieve a defined sequence of past messages.

# Lesson 3: Security
[diffusion-chat-app-v3](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v3) introduces the concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) > [authentication, principals and roles](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/useraccess/atn_model.html).


# Prerequisites

*  Download our code examples or clone them to your local environment:
```
 git clone https://github.com/pushtechnology/tutorials/
```
* A Diffusion Cloud service version 6.5.0 or greater. Create a service [here](https://diffusion.cloud/).

<!-- * Follow our [Quick Start Guide](https://docs.pushtechnology.com/quickstart/) and get your service up in a minute! -->
<!-- there is no need to follow the QSG, you just need to create a service --> 

# Setup

Update `public/js/app.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: 'diffusionchatapp.eu.diffusion.cloud'
* user: 'user'
* password: 'password'

# Chat UI

<img src="https://github.com/pushtechnology/tutorials/blob/master/messaging/chat-screen.png" height="500" title="chat-screen">
