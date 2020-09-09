<img src="https://www.pushtechnology.com/wp-content/themes/pushtechnology/img/diffusion-padding-bottom.png" height="80" title="Logo">

# Diffusion-chat-app

This is sample chat application using [Diffusion](https://www.pushtechnology.com/product-overview) Cloud.
Users can chat in realtime across various meeting rooms.
A simple projects, illustrating production and consumption of messages to and from a Diffusion Cloud instance.

# Version 1
[diffusion-chat-app-v1](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v1) introduces de concept of Publish and Subscribe to [topics (data structures)](https://docs.pushtechnology.com/docs/6.5.1/manual/html/introduction/overview/topics_data.html).

# Version 2
[diffusion-chat-app-v2](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v2) introduces de concept of [Time Series](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/data/topics/timeseries_topics.html).

# Version 3
[diffusion-chat-app-v3](https://github.com/pushtechnology/tutorials/tree/master/messaging/diffusion-chat-app-v3) introduces de concept of [Security](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/c_security.html) > [authentication, principals and roles](https://docs.pushtechnology.com/docs/6.5.1/manual/html/designguide/security/useraccess/atn_model.html).


# Requirements

* A Diffusion service (Cloud or On-Premise), version 6.5.0 or greater.
* Create a service [here](https://management.ad.diffusion.cloud/)

# Setup

Update `public/js/app.js` to the hostname of your Diffusion Cloud service, which you can find in your service dashboard.
You can also leave the default values and connect to our sandbox service:
* host: 'diffusionchatapp.eu.diffusion.cloud'
* user: 'user'
* password: 'password'

<img src="https://github.com/pushtechnology/tutorials/blob/master/messaging/chat-screen.png" height="500" title="chat-screen">
