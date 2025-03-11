---
description: ''
sidebar: 'getting-started'
prev: ''
next: ''
---

# Message Listener API

This is the method and API specification for exposing uEngine process definitions directly as APIs.

## Service Definition

```java
http POST localhost:8080/service correlationKey="user_key" defId="Robot Process Automation.xml" path="message"
```

- path becomes the url path of the service to be opened. For example, if you set it as "message", it will be accessible in process-service as follows:

```java
localhost:8080/services/message
```

- defId represents the process definition to be connected with the service message.
- correlationKey becomes the key value that distinguishes process instances. If this value comes into the payload with the same value, it will find the corresponding process instance and map it.


## KakaoTalk Chatbot Example

When a message received through KakaoTalk is transmitted to the bot server, the message will come in the following format:

```java
http localhost:8080/services/message content="메시지" user_key="XXXXX"
```

- user_key is uniquely determined for the KakaoTalk terminal or user, so you can use this value as the correlation key. Therefore, you can open a service with the following MessageStartEvent settings:

![](../../uengine-image/12-1.png)

- path: message
- correlation key: user_key
- Result variable binding: content -> Process variable to hold the received value