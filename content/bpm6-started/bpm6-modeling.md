---
description: '구성요소 및 실행'
sidebar: 'getting-started'
---

# Components

## Content
The components of uEngine6 BPM are the basic elements that make up a process. Each component performs a specific role and function, allowing complex processes to be modeled and executed.

## 1. Events
Events represent occurrences in a process, and the process can react to events or trigger events. Events are classified as start events, end events, intermediate events, and boundary events.

![](../../uengine-image/modeling/events/events.png)
Various events elements can be changed in the element change.

- Start events
---
Define the starting point of a process or sub-process.

- End events
---
Define the end of a specific sequence in a process.

- Intermediate events
---
Represent events that occur in the middle of a process and are used to control or change the flow of the process. Depending on the type of event, they are classified as Throw or Catch events to define specific triggers in the process.

- Boundary events 
---
Define what to do when an event occurs in the ongoing flow of a process. For example, if a specific task is generated for a user in the process, you can attach an intermediate message CATCH event to the task to automate the sequence flow with a message sending task to send a message.


## Types of Events and Descriptions
### 1.1 Message events
Message events are events that trigger events by generating and receiving defined messages in a process.

- **Message start event**
  + A process can have one or more message start events. Each message event must have a different name.
- **Message intermediate throw event**
  + When this event is reached during the process, it creates a message task and waits for completion. When the task is completed, the process continues.
- **Message intermediate catch event**
  + When this event is reached during the process, it creates a message receiving task, and the instance is stopped at this point, waiting for a specific message receiving task. When a specific message is received, the event is completed and the process continues.
- **Message boundary catch event**
  + A TASK can have one or more message boundary events. While the task is in progress, the event creates a receiving task, and when a specific message is received, it is triggered to that event.
- **Message end event**
  + When this event is reached during the process, the process ends simultaneously with sending a message.
- **Example**
  + This is an example process where a worker recognizes an error, sends a message for task management, writes the error content, and then delivers a completion message.
![](../../uengine-image/modeling/events/event-message.png)

### 1.2 Timer events
Timer events are events that execute the defined task upon event reception according to a defined time or period, and then execute the next process. They are used when there is a task in the process that needs to wait for a certain time or be executed periodically.

- **Timer start event**
  + A process can have one or more timer start events. A time date or time period definition must be made. When the timer is triggered, the instance and timer start event are activated.
- **Timer intermediate catch event**
  + The intermediate catch timer must define a time date or duration. The process stops at that point and waits until it is triggered. After the event is completed, the process continues.
- **Timer boundary catch event**
  + The timer boundary catch event must define a time date or time period. The TASK activity is completed at the point when the defined timer trigger is completed.

- **Example**
  + This is an example process using a timer event for going to work.
    - The process starts at a set time every day, requests attendance if attendance is not checked for 30 minutes after the attendance time, and delivers completion when attendance is checked.
![](../../uengine-image/modeling/events/event-timer.png)


### 1.3 Compensation events
Compensation events are used when a specific task in an ongoing process needs to be reverted or canceled. When a normal task has been performed but needs to be canceled due to a subsequent incorrect flow, this event occurs to proceed with compensation work as a cancellation task.

- **Compensation intermediate throw event**
  + This event is used to proceed with a task that needs compensation by canceling it among the ongoing tasks in the process. The event triggers a compensation event, and when the compensation event is completed, it proceeds to the next task.
- **Compensation boundary catch event**
  + Triggered by the compensation intermediate throw event, this event receives and proceeds with the compensation task. After completing the compensation task, it notifies that it has been completed.
- **Compensation end event**
  + Plays the role of triggering compensation work at the end point. It is used when there is a need to cancel or compensate for previously completed work when the process ends.
- **Example**
  + This is an example process where, when purchasing a product, the product's inventory is first reserved and then deducted after the purchase is completed. However, if the purchase is canceled during the payment process, the inventory is not deducted and the inventory is compensated.
  ![](../../uengine-image/modeling/events/event-compensation.png)


### 1.4 Error events
Error events are events used to identify errors during the process, transmit and receive events for error handling.

- **Error boundary catch event**
  + This is an event waiting to receive an error handling event, and it receives an error event transmitted from the process and forwards it to the error handling task.
- **Error end event**
  + This is an event that notifies error handling by generating and terminating the event when an error occurs in the process.
- **Example**
  + This is an example process where, when an unverifiable error occurs while checking the inventory of a product, such as when checking new products or unregistered products, direct verification is performed.
  ![](../../uengine-image/modeling/events/event-error.png)

### 1.5 Signal events
Signal events are used to send or receive signals between processes. They are events that can trigger all received signal events that match the broadcasted signal. They are used to notify based on specific conditions or state changes.

- **Signal start event**
  + When starting a process, it can trigger multiple signal events received by the signal start event.
- **Signal intermediate throw event**
  + This is an event that generates a signal to allow the receiving signal to occur.
- **Signal intermediate catch event**
  + When a process runs to this event, it stops at that point and waits for a signal reception. After the signal is received and the event is completed, the process continues.
- **Signal boundary catch event**
  + A Task can have one or more events. When the Task is executed, it waits for a signal reception, and when a signal is generated from the Task, it is triggered to that event.
- **Signal end event**
  + At the end point of the process, it sends a signal with the signal end event and terminates the process. For example, it can proceed with a task of notifying another process of the completion of a process.
- **Example**
  + This is an example process where a seller receives and handles product sales, purchase cancellation requests, and size exchange requests. For purchase cancellations, the seller requests the payment management department to cancel, and when completed, gives a notification, and for size exchanges, if the exchange size is not available, the seller requests courier delivery.
  ![](../../uengine-image/modeling/events/event-signal.png)

### 1.6 Conditional events
Conditional events are events that are triggered when given conditions match. They are generally defined based on process variables or external data. Start and boundary events can be set in interrupting and non-interrupting ways, with the default being the interrupting way. The interrupting way stops the existing process and creates a new instance. The non-interrupting way maintains the existing process and creates a new instance.

- **Conditional start event**
  + A process can have one or more conditional start events. It starts the process when a specific condition is met at the starting point of the process. There can be multiple conditional start events, and when each condition is met, the corresponding process starts.
- **Conditional intermediate catch event**
  + It waits until a specific condition is met in the middle of the process, and when the condition is met, the process continues.
- **Conditional boundary catch event**
  + A Task can have one or more of these events. When the Task is executed, it waits for reception, and the event is triggered when the condition is met.
- **Example**
  + This is an example process where a seller processes inventory management by setting conditions to send a notification or automatically send a request to the manufacturer when the inventory is less than 100.
  ![](../../uengine-image/modeling/events/event-conditional.png)

### 1.7 Link events
Link events can be used to connect separate sections within the same process. Multiple throw link events can be connected to one catch link event, but one throw link event cannot be connected to multiple catch link events.

- **Link intermediate throw event**
  + A link intermediate throw event is set at the ending point to transmit an event so that the catch event can be activated.
- **Link intermediate catch event**
  + It is activated when the throw event is triggered, calling the catch event to connect the process.
- **Example**
  + This is an example process for making clothing, connecting from the design team to the inspection team through link events.
  ![](../../uengine-image/modeling/events/event-link.png)

### 1.8 Terminate events
When a process reaches a terminate event, the tasks and instances in the same flow as the terminate event are terminated.

- **Terminate end event**
  + When a process reaches a terminate event, the instances in the same flow as the terminate event are terminated.
- **Example**
  + This is an example process for a coupon seller to process the coupons they issued.
  ![](../../uengine-image/modeling/events/event-terminate.png)


### 1.9 Escalation events
Escalation events are used to communicate with a higher process. Unlike error events, they have no impact on the process flow and continue after being delivered to the higher process.

- **Escalation intermediate throw event**
  + It is an event that transmits to a higher process, sending the escalation event as a code and then continuing the process as is.
- **Escalation boundary catch event**
  + Only one catch event can be defined. It receives the closest throw code event and proceeds with the flow of the received event.
- **Example**
  + This is an example process where a seller has insufficient inventory for shipping, and without affecting the flow of the process, if delivery is possible within 1 day, the seller ships and delivers a shipping delay notification message.
  ![](../../uengine-image/modeling/events/event-escalation.png)
   	     
## 2. Tasks
Tasks are used to perform the activities of a process. Each TASK performs a specific job and can be modeled as the actual execution unit.

![](../../uengine-image/modeling/tasks/tasks.png)
You can change various Tasks elements in the element modification.

## Types and Descriptions of Tasks
### 2.1 User task
- This is a task that users need to process. Users proceed with their work using software and automated systems, and when the task is reached, a task Todo list is created for the relevant role.

uEngine6 BPM provides User task functionality in 3 formats.
- Basic format
  + This is a basic format where users input values according to the property values that are set.
- Form format
  + This method allows users to input according to a specific form format that has been created. Detailed information about the form can be found on the "[**Form Management**](/bpm6-started/form-definition/)" page.
- External application format
  + This is a format that proceeds with work by calling an external application. External services are shown in iframe format, and work proceeds through the call of external services.

- **Examples**
  + Basic format: Enter the property values that users input.
  ![](../../uengine-image/modeling/tasks/task-userTask-1.png)
  + Form format: After defining in the form, the defined form information is loaded, and when the form is selected, it is set to that form.
  ![](../../uengine-image/modeling/tasks/task-userTask-2.png)
  + External application format: After entering the URL of the external service, enter the property values provided by the external service to receive information from the external service.
  ![](../../uengine-image/modeling/tasks/task-userTask-3.png)

### 2.2 Service task
- Generally used for interaction with external systems. It proceeds with tasks that call external services and receives results.
- **Example**
  + This is an example process where the result value is received as a "result" value to check the inventory of a product from an external service.
  ![](../../uengine-image/modeling/tasks/task-service.png)

### 2.3 Script task
- Allows for micro settings or actions that are difficult to process with just process settings by directly setting JavaScript or Java language in the activity.
- **Example**
  + This is an example process where, to launch a new product, the result value according to script conditions is stored in the "result" variable using the product criteria information.

 ![](../../uengine-image/modeling/tasks/task-script.png)

[Warn] Do not rely on Script Task to write too much logic! As the process becomes larger and more difficult to manage, try to design it as much as possible with process definitions, and if that is difficult, develop it as a separate service and manage it accordingly.

### 2.4 Send task
- Generally used to send messages to an external system. It specializes only in message transmission and is implemented in the same way as a Service task, but focuses on transmission.
- **Example**
  + This is an example process that delivers to an external service after completing the purchase of a new product so that the external service can process it.
  ![](../../uengine-image/modeling/tasks/task-send.png)

### 2.5 Receive task
- A task that waits for a specific message or event and pauses progress until that message or event is received. It proceeds to the next step when the message arrives.
- **Example**
  + This is an example process that waits until registration by an external service and allows for reception by putting in information to be received from the external service.
   ![](../../uengine-image/modeling/tasks/task-receive.png)

### 2.6 Manual task
- Represents tasks that people need to perform manually. It is used when a person needs to perform the task directly without using software or automated systems. For example, it is used when reading and judging documents or performing specific tasks.
- **Example**
  + This is an example process where a person actually verifies whether a new product has been registered.
  ![](../../uengine-image/modeling/tasks/task-manual.png)

### 2.7 Business rule task
- Verifies and executes business rules in the process. Sets one or more business rules and proceeds with the process according to the rules.
- **Example**
  + This is an example process that verifies purchase decisions according to the company's internal purchasing rules.
  ![](../../uengine-image/modeling/tasks/task-business-rule.png)

## 3. SubProcess
SubProcess is a task that groups specific tasks within a process as a process to increase reusability. Repetitive tasks can be made into sub-processes, or complex processes can be divided into smaller units to increase the readability of the entire process. 
![](../../uengine-image/modeling/subprocess/subprocess.png)
You can change various SubProcess elements in the element modification.
## Types and Descriptions of SubProcess
### 3.1 Embedded SubProcess
- This is an embedded sub-process that is included in the main process and cannot be called independently from the outside. This sub-process is used when performing repetitive tasks. This process is only executed in the main process.
- **Example**
  + This is an example process that executes the task of handling fault reports, creating a subprocess for repetitive tasks in the process for reuse.
  ![](../../uengine-image/modeling/subprocess/subprocess-embedded.png)
 
### 3.2 Call Activity
- Calls and executes a process defined externally. It is a reusable process that can be called and used the same way in multiple processes.
- **Example**
  + When performing the same task according to membership status in the "purchase progress task," calling the same process can reduce repetitive modeling work.
  ![](../../uengine-image/modeling/subprocess/subprocess-call.png)


## 4. Gateways
Gateways are used to branch or merge the flow of a process. Gateways control the execution path of a process and can proceed along different paths according to conditions. Also, you can control the flow of the process using the conditions of outgoing (outgoing lines) and incoming (incoming lines) at each gateway. For detailed information, please refer to the [**Conditional Branching Processing**](/bpm6-started/conditional-branch/) page.
![](../../uengine-image/modeling/gateways/gateways.png)
You can change various gateway elements in the element modification.

## Types and Descriptions of Gateways
### 4.1 Exclusive gateway
- Only one path that matches among several conditions is executed, and other paths are ignored. When two or more paths match, one path is selected according to priority.
  + Outgoing: Proceeds along one path that matches according to conditions.
  + Incoming: Proceeds to the next path when one of the connected paths is received.
- **Example**
  + This is an example process that proceeds to one department that matches the condition.
  ![](../../uengine-image/modeling/gateways/gateway-exclusive.png)

### 4.2 Parallel gateway
- Multiple paths are executed simultaneously. In the case of parallel execution, it proceeds to the next path when all paths are completed.
  + Outgoing: Proceeds in parallel along all connected paths without conditions.
  + Incoming: Proceeds to the next path when all connected paths are completed.
- **Example**
  + This is an example process that proceeds simultaneously in two departments.
  ![](../../uengine-image/modeling/gateways/gateway-parallel.png)

### 4.3 Inclusive gateway
- One or more paths can be selected and executed simultaneously. In the case of parallel execution, it proceeds to the next path when one path is completed.
  + Outgoing: Proceeds along **one or more** paths that match according to conditions.
  + Incoming: Proceeds to the next path when one of the connected paths is received.
- **Example**
  + This is an example process that proceeds to **one or more** departments that match the condition.
  ![](../../uengine-image/modeling/gateways/gateway-Inclusive.png)

## 5. Pool & Lane
In the process, Pool and Lane are used to visually distinguish roles and organizations. Also, through the flow of the sequence, you can understand responsibilities and roles.

### 5.1 Pool
 - Generally represents an organization or system and defines the boundary in which the process is performed. That is, each Pool means an independent process, and there can be multiple Lanes within a Pool.

### 5.2 Lane
 - Each Lane is used to distinguish specific work units or roles. The Lane is used to visually distinguish the flow of the process.

 - **Example**
  + A pool usually denotes an organization or system that encompasses the lane, such as putting in the "Product Team" organization, and this is an example process that displays the roles under the Product Team.
  ![](../../uengine-image/modeling/pool-lane/pool_lane.png)