---
description: ''
sidebar: 'getting-started'
---

# External Service Integration
uEngine6 BPM explains how to execute processes by integrating with external services. There are three main methods for communicating with external services, and each method is explained.
    
- SOA (MSA) Architecture Example - Event
- SOA (MSA) Architecture Example - Message
- REST API Integration [<span style="color:red;font-size: 0.7em;">NOT RECOMMENDED</span>]

## SOA (MSA) Architecture Example - Event
- This is a method of proceeding by sending and receiving events with external services. It generally works asynchronously, proceeding after sending an event, and then continuing after receiving an event when the external service's task is completed. Unlike synchronous methods, the asynchronous approach increases cohesion and has the advantage of lower impact when failures occur.

### Example Video
<div style="position: relative; padding-bottom: 56.25%; padding-top: 0px; height: 0; overflow: hidden;">
	<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/E-tjj20-xxI?si=nhcIxujlVzTPXOeh" 
        frameborder="0" crolling="no" frameborder="none" allowfullscreen="">
    </iframe>
</div>
<br>

### 1. Problems with Synchronous App Integration
![IMAGE](../../uengine-image/115.png) 
[Image 1] Synchronous Method

  The synchronous method waits for a response. Typical synchronous integration between BPM and App waits for BPM's response, so if BPM fails, it can affect the App as well. This can propagate failures throughout the system and cause response delays.

  Also, when information requested from App to BPM changes, there are issues such as needing to understand dependencies because many details must also be changed in BPM. For these reasons, when processing synchronously between App and BPM, there are disadvantages such as failure propagation and high coupling, making immediate processing impossible when failures occur.

- Inter-system response waiting **increases coupling.**
- Problems in the BPM system cause **failure propagation** to the App.
- When App request and response requirements change, **dependencies** arise that require BPM changes.



  The synchronous method allows BPM failures to affect the App, propagating failures throughout the system and causing response delays. Also, high dependency causes problems during changes, making synchronous integration unsuitable.
  

### 2. Asynchronous App Integration

#### 2.1 Integration Principles
  App and BPM are processed in an **asynchronous manner.** This prevents failures from propagating to the App even when BPM is stopped, making it an excellent method for resolving blocking issues between App and BPM systems.

* Unidirectional Dependency
    - **Non-dependency**
        - Event messages are sent through a message broker, so it doesn't wait for BPM calls.
    - **Failure Blocking**
        - Even if the BPM system has errors or stops, there is no impact on the App. When failures occur, they don't affect other systems.
    - **Guarantee**
        - Even when a stopped BPM is restarted, it guarantees that previous data will be processed.

* Role Separation
    - App
        - Business screens
        - Domain logic
        - Data management
    - BPM
        - Visual event processing and business sharing when integrating applications and BPM
        - Easy definition of process flows and work distribution in BPM
        - Process branching/repetition according to business rules (conditions)
        - Finding responsible persons from the organization chart and routing business screens (App) to them (work items)

#### 2.2 Example Scenario
  This is an example of "Incident Reporting and Handling" that integrates APP and BPM asynchronously.
  
![IMAGE](../../uengine-image/104.png) 
[Image 2] "Incident Reporting and Handling" Example

  When users experience problems, they report incidents to resolve them.

  Based on the reported content, a person in charge is assigned, and this assigned person resolves the problem based on the content reported by the user.

![IMAGE](../../uengine-image/98.png)
[Image 3] "Incident Reporting and Handling" Flow Chart

The "Incident Reporting and Handling" example was implemented by defining two event types
- Incident Report (TroubleIssued)
- Incident Resolution (TroubleCompleted)

"Incident Report" is an event type where users write and transmit the type of incident and the problem.
  
"Incident Resolution" is an event type that is completed after the person in charge handles the incident based on the problem entered by the user.

#### 2.3 Application(Publisher)
  The App defines screens for users to input "Incident Reports" and "Incident Resolutions" and event transmission.
   It also plays the role of publishing messages to the message broker with the information entered by users as "Incident Report (TroubleIssued)" and "Incident Resolution (TroubleCompleted)" event types.

  The code below is for generating events in the App.

```java
public class TroubleIssued extends AbstractEvent {

    private Long id;
    private String troubleType;
    private String description;
   
    public TroubleIssued() {
        super();
    }

    public TroubleIssued(TroubleTicket ticket) {
        super(ticket);
    }   
}
```
1. When writing a Trouble Ticket issuance (TroubleIssued) event, inherit the AbstractEvent class and set the TroubleIssued property values.

```java
// Example 2-1) Message transmission through Kafka
public class AbstractEvent {

    public void publish() {
        KafkaProcessor processor = ItsmApplication.applicationContext.getBean(KafkaProcessor.class);
        MessageChannel outputChannel = processor.outboundTopic();

        outputChannel.send(
            MessageBuilder
                .withPayload(this)
                .setHeader(
                    MessageHeaders.CONTENT_TYPE,
                    MimeTypeUtils.APPLICATION_JSON
                )
                .setHeader("type", getEventType())
                .build()
        );
    }

    public void publishAfterCommit() {
        TransactionSynchronizationManager.registerSynchronization(
            new TransactionSynchronizationAdapter() {
                @Override
                public void afterCompletion(int status) {
                    AbstractEvent.this.publish();
                }
            }
        );
    }
}
```
2. The AbstractEvent class is a declared class that connects to the message broker channel to deliver messages.

```java
// TroubleTicket.java
@Entity
@Table(name = "troubleTicket_table")
@Data
public class TroubleTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String troubleType;
    private String description;
    private String reason;
    
    @PostPersist
    public void onPostPersist() {
        TroubleIssued trouble = new TroubleIssued(this);
        trouble.publishAfterCommit();
    }

    public void complete(TroubleTicket ticket) {
        TroubleCompleted troubleTicketCompleted = new TroubleCompleted(this);
        troubleTicketCompleted.setReason(ticket.getReason());
        troubleTicketCompleted.publishAfterCommit();
    }

    public static TroubleTicketRepository repository() {
        TroubleTicketRepository troubleTicketRepository = ItsmApplication.applicationContext.getBean(TroubleTicketRepository.class);
        return troubleTicketRepository;
    }
}
```
3. This is a class that executes to transmit (Publisher) events through the TroubleTicket class. It transmits to the message broker through the publishAfterCommit() function.
- Send message example
```sh
{"eventType":"TroubleIssued","timestamp":1718873491127,"id":1,"troubleType":"sw","description":"sw is error."}
```

#### 2.4 Message Broker
Message Broker is used to integrate systems asynchronously. Kafka is a representative example, and message brokers are an excellent method for resolving blocking issues by removing dependencies between systems. It also supports secure integration through guaranteed message delivery. Due to these characteristics, it is widely used in large-scale systems, distributed systems, and microservice architectures.

In the "Incident Reporting and Handling" example, we reduced dependency between App and BPM and used the asynchronous method Kafka to block failure propagation between them and reduce the impact between systems.

#### 2.5 BPM(Subscriber)
Messages are received whenever they are published from the App and can be classified according to conditions.

#### 2.6 Resilience of Asynchronous Integration
We conducted tests to verify the advantages of the asynchronous method. We ensured that the App maintained normal execution flow even when the BPM service was stopped during execution.

As in the previous example, the App was receiving incident reports, and we tested a scenario where the BPM service was stopped and unable to receive events. 


1. The user normally submitted an incident report through the App, and an event was generated through Kafka in the message broker.
    ![IMAGE](../../uengine-image/117.png)
    [Image 4] BPM Stopped State

* Message content
```sh    
{"eventType":"TroubleIssued","timestamp":1719386892341,"id":16,"troubleType":"sw","description":"The program is not running."}
{"eventType":"TroubleCompleted","timestamp":1719386909644,"id":16,"description":"The program is not running.","reason":"Updated the version."}
```    
Regardless of the stopped BPM state, the App proceeded with normal "Incident Report" tasks, and we can see that events were generated.



2. Let's restart the stopped BPM and check if it processes the previous messages.
![IMAGE](../../uengine-image/118.png)
[Image 5] BPM Restart and Processing

When the stopped BPM is restarted, we can confirm that it receives and processes the events generated through the message broker from the App.


### 3. Process Modeling
Define the process in "Process Definition." You can define the workflow and define each task.

#### 3.1 Process Variable Settings
- To store values processed in the App, variables must be declared in BPM. Variables can be set by clicking "Process Variables" in the upper left corner of the "Process Definition" section.
> Declare a text format variable "TroubleType".
![IMAGE](../../uengine-image/108.png)
[Image 6] Process Variable Settings

#### 3.2 External Application Integration
To integrate App and BPM, BPM receives information based on what was processed in the App to handle the App. For integration, select the "External Application" method in User Task and proceed as follows.
![IMAGE](../../uengine-image/100.png)
[Image 7] External Application Integration

##### 3.2.1 App Screen Settings
This section defines the screen. Enter the App's screen URL to make the screen defined in the App accessible.
> Ex) Enter the App's "Incident Report" screen information "http://localhost:8080/#/TroubleIssued".
![IMAGE](../../uengine-image/119.png)
[Image 8] App Screen Settings

##### 3.2.2 Event Definition Settings
This section sets the event type to receive events defined in the App. Based on the set event type, events sent from the App are received to proceed with tasks.
> Ex) Set it to "TroubleIssued" to receive "Incident Reports".
![IMAGE](../../uengine-image/120.png)
[Image 9] Event Definition Settings

##### 3.2.3 Event Properties
This section declares variables to receive and use information from events generated by the App.
> Ex) Processing the "troubleType" property from "Incident Report" variables.
![IMAGE](../../uengine-image/121.png)
[Image 10] Event Properties

##### 3.2.4 Event Mapping
This role passes or stores values through mapping operations for information needed in the task. It can also store information from received events in process variables.
> Ex) Mapping the message property value "troubleType" to the process variable "TroubleType"
![IMAGE](../../uengine-image/107.png)
[Image 11] Mapping Screen



### 4. Execution

1. Execute "Incident Reporting and Handling" Process
- For users to report incidents, select the "Incident Reporting and Handling" process from the "Process Definition Diagram" and proceed through the upper right button.
![IMAGE](../../uengine-image/103.png)
[Image 12] Process Information

2. User submits an "Incident Report" in the task
- The user enters incident details on the screen provided by the App.
![IMAGE](../../uengine-image/114.png) 
[Image 13] Execution Screen

3. Screen routing according to task (Engineer task reception)
- When a user submits a report, it appears in the engineer's "To-Do List" based on the report reception.
![IMAGE](../../uengine-image/112.png) 
[Image 14] Engineer Task Screen

4. Task completion processing (Engineer incident handling)
- Based on the user's "Incident Report," the engineer enters incident handling details.
![IMAGE](../../uengine-image/113.png) 
[Image 15] Engineer Incident Handling


### 5. Summary
  The asynchronous Pub/Sub integration between App and BPM via an asynchronous message broker **reduces coupling** between systems and can **block failures.** In contrast, in the synchronous method, because services wait for responses from each other, if a failure occurs in BPM, it creates a problem where the failure propagates to the App.

  Additionally, when integrating services asynchronously, there is **non-dependency** between systems since the App doesn't change based on BPM calls, and there is no waiting for responses between systems.

  Consequently, even when the BPM system is stopped, it can receive and process events generated by the App later and **synchronize** the state. This is an excellent method for resolving the issues of failure propagation and runtime system blocking in traditional synchronous methods.

 - Systems don't wait for responses from each other, resulting in **low coupling.**
 - When BPM stops due to failures or other reasons, it doesn't affect the App, allowing for **failure blocking.**
 - There is **non-dependency** due to separation of responses and the same between systems.
 - Even if BPM is stopped, it can **synchronize** previously generated events.
 


## SOA (MSA) Architecture Example - Message
- It uses message events to send messages to external services, and after the external service processes and sends a message back, it proceeds after receiving the message event. We will examine how to integrate with external systems using Message Event Notation and REST API through examples.

### 1. Example Scenario
When an incident occurs, the process proceeds through the following steps: assigning a person in charge, checking the error content, creating a work report (external system), and completing the verification process.

### 2. Example Video
<div style="position: relative; padding-bottom: 56.25%; padding-top: 0px; height: 0; overflow: hidden;">
	<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/bxkB-pkOpTQ?si=YRmhriPf_I49H1tw" 
        frameborder="0" crolling="no" frameborder="none" allowfullscreen="">
    </iframe>
</div>
<br>

### 3. Example BPMN
<details>
  <summary>View BPMN</summary>

  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:uengine="http://uengine" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0bfky9r" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="16.4.0">
  <bpmn:collaboration id="Collaboration_0ketuy3">
    <bpmn:participant id="Participant_1o9wosn" processRef="Process_1oscmbn" />
    <bpmn:participant id="Participant_1vhtw3k" name="오류 작업 내역 관리" processRef="Process_0on1ux0" $type="bpmn:Participant">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{"serviceURL":"http://localhost:8087"}</uengine:json>
        </uengine:properties>
      </bpmn:extensionElements>
    </bpmn:participant>
    <bpmn:messageFlow id="Flow_1b35vsc" sourceRef="Event_0937ss0" targetRef="Event_1liy11t" />
    <bpmn:messageFlow id="Flow_1hda9cb" sourceRef="Event_1v118e8" targetRef="Event_00iut9o" />
  </bpmn:collaboration>
  
  <bpmn:process id="Process_1oscmbn" isExecutable="true">
    <bpmn:extensionElements>
      <uengine:properties>
        <uengine:variable name="Worker" type="Text">
          <uengine:json>{"defaultValue":""}</uengine:json>
        </uengine:variable>
        <uengine:variable name="Error" type="Text">
          <uengine:json>{"defaultValue":""}</uengine:json>
        </uengine:variable>
        <uengine:variable name="Status" type="Text">
          <uengine:json>{}</uengine:json>
        </uengine:variable>
      </uengine:properties>
    </bpmn:extensionElements>
    <bpmn:laneSet id="LaneSet_0cwgyi6">
      <bpmn:lane id="Lane_1f3275c" name="관리자" $type="bpmn:Lane">
        <bpmn:extensionElements>
          <uengine:properties>
            <uengine:json>{"roleResolutionContext":{"_type":"org.uengine.five.overriding.IAMRoleResolutionContext","scope":"manager"}}</uengine:json>
          </uengine:properties>
        </bpmn:extensionElements>
        <bpmn:flowNodeRef>Event_1z0qf6o</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0pmhyq2</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_0lwj0om</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Activity_1tz1c18</bpmn:flowNodeRef>
      </bpmn:lane>
      <bpmn:lane id="Lane_0cnpt7b" name="작업자" $type="bpmn:Lane">
        <bpmn:extensionElements>
          <uengine:properties>
            <uengine:json>{"roleResolutionContext":{"_type":"org.uengine.five.overriding.IAMRoleResolutionContext","scope":"manager"}}</uengine:json>
          </uengine:properties>
        </bpmn:extensionElements>
        <bpmn:flowNodeRef>Activity_0x6enn9</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_0937ss0</bpmn:flowNodeRef>
        <bpmn:flowNodeRef>Event_00iut9o</bpmn:flowNodeRef>
      </bpmn:lane>
    </bpmn:laneSet>
    <bpmn:startEvent id="Event_1z0qf6o">
      <bpmn:outgoing>Flow_0l0zoj6</bpmn:outgoing>
    </bpmn:startEvent>
    <bpmn:sequenceFlow id="Flow_0l0zoj6" sourceRef="Event_1z0qf6o" targetRef="Activity_0lwj0om" />
    <bpmn:sequenceFlow id="Flow_0nn4qnj" sourceRef="Activity_0lwj0om" targetRef="Activity_0x6enn9" />
    <bpmn:sequenceFlow id="Flow_1j42mu7" sourceRef="Activity_0x6enn9" targetRef="Event_0937ss0" />
    <bpmn:sequenceFlow id="Flow_1wveg9i" sourceRef="Event_0937ss0" targetRef="Event_00iut9o" />
    <bpmn:sequenceFlow id="Flow_0jf4xqm" sourceRef="Event_00iut9o" targetRef="Activity_1tz1c18" />
    <bpmn:endEvent id="Event_0pmhyq2">
      <bpmn:incoming>Flow_0l2xymz</bpmn:incoming>
    </bpmn:endEvent>
    <bpmn:sequenceFlow id="Flow_0l2xymz" sourceRef="Activity_1tz1c18" targetRef="Event_0pmhyq2" />
    <bpmn:userTask id="Activity_0lwj0om" name="작업자 선택" $type="bpmn:UserTask">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{"parameters":[{"direction":"IN-OUT","variable":{"name":"Worker"},"argument":{"text":"Worker"}}]}</uengine:json>
        </uengine:properties>
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_0l0zoj6</bpmn:incoming>
      <bpmn:outgoing>Flow_0nn4qnj</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:userTask id="Activity_0x6enn9" name="오류내용 인지" $type="bpmn:UserTask">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{"parameters":[{"direction":"IN-OUT","variable":{"name":"Error"},"argument":{"text":"Error"}}]}</uengine:json>
        </uengine:properties>
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_0nn4qnj</bpmn:incoming>
      <bpmn:outgoing>Flow_1j42mu7</bpmn:outgoing>
    </bpmn:userTask>
    <bpmn:intermediateThrowEvent id="Event_0937ss0" name="작업 내역서 작성 요청" $type="bpmn:IntermediateThrowEvent">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{}</uengine:json>
        </uengine:properties>
      </bpmn:extensionElements>
      
      <bpmn:messageEventDefinition id="MessageEventDefinition_0f3qhct" />
    </bpmn:intermediateThrowEvent>
    <bpmn:intermediateCatchEvent id="Event_00iut9o" name="작업 내역서 작성 완료 수신" $type="bpmn:IntermediateCatchEvent">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{"correlationKey":"history","servicePath":"history"}</uengine:json>
        </uengine:properties>
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_1wveg9i</bpmn:incoming>
      <bpmn:outgoing>Flow_0jf4xqm</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_0pxe7n6" />
    </bpmn:intermediateCatchEvent>
    <bpmn:userTask id="Activity_1tz1c18" name="작업 내역서 작성 완료 확인" $type="bpmn:UserTask">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{"parameters":[{"direction":"IN-OUT","variable":{"name":"Status"},"argument":{"text":"Status"}}]}</uengine:json>
        </uengine:properties>
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_0jf4xqm</bpmn:incoming>
      <bpmn:outgoing>Flow_0l2xymz</bpmn:outgoing>
    </bpmn:userTask>
  </bpmn:process>

  <bpmn:process id="Process_0on1ux0" isExecutable="false">
    <bpmn:task id="Activity_09u6k20" name="작업 내역서 작성" $type="bpmn:Task">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{}</uengine:json>
        </uengine:properties>
      </bpmn:extensionElements>
      <bpmn:incoming>Flow_00drr7g</bpmn:incoming>
      <bpmn:outgoing>Flow_1fzqzav</bpmn:outgoing>
    </bpmn:task>
    <bpmn:sequenceFlow id="Flow_00drr7g" sourceRef="Event_1liy11t" targetRef="Activity_09u6k20" />
    <bpmn:sequenceFlow id="Flow_1fzqzav" sourceRef="Activity_09u6k20" targetRef="Event_1v118e8" />
    <bpmn:startEvent id="Event_1liy11t">
      <bpmn:outgoing>Flow_00drr7g</bpmn:outgoing>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1hmq8nc" />
    </bpmn:startEvent>
    <bpmn:endEvent id="Event_1v118e8">
      <bpmn:incoming>Flow_1fzqzav</bpmn:incoming>
      <bpmn:messageEventDefinition id="MessageEventDefinition_1y6bk1d" />
    </bpmn:endEvent>
  </bpmn:process>
  
  <bpmndi:BPMNDiagram id="BPMNDiagram_1">
    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Collaboration_0ketuy3">
      <bpmndi:BPMNShape id="Participant_1o9wosn_di" bpmnElement="Participant_1o9wosn" isHorizontal="true">
        <dc:Bounds x="80" y="120" width="1018" height="250" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_1f3275c_di" bpmnElement="Lane_1f3275c" isHorizontal="true">
        <dc:Bounds x="110" y="120" width="988" height="125" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Lane_0cnpt7b_di" bpmnElement="Lane_0cnpt7b" isHorizontal="true">
        <dc:Bounds x="110" y="245" width="988" height="125" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1z0qf6o_di" bpmnElement="Event_1z0qf6o">
        <dc:Bounds x="172" y="162" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0pmhyq2_di" bpmnElement="Event_0pmhyq2">
        <dc:Bounds x="962" y="162" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0sn28ng_di" bpmnElement="Activity_0lwj0om">
        <dc:Bounds x="260" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_060rqeu_di" bpmnElement="Activity_0x6enn9">
        <dc:Bounds x="420" y="270" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_1p7vfle_di" bpmnElement="Event_0937ss0">
        <dc:Bounds x="582" y="292" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="563" y="254.5" width="73" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_07sc6sc_di" bpmnElement="Event_00iut9o">
        <dc:Bounds x="682" y="292" width="36" height="36" />
        <bpmndi:BPMNLabel>
          <dc:Bounds x="663" y="254.5" width="73" height="27" />
        </bpmndi:BPMNLabel>
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_0oyw50a_di" bpmnElement="Activity_1tz1c18">
        <dc:Bounds x="790" y="140" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_0l0zoj6_di" bpmnElement="Flow_0l0zoj6">
        <di:waypoint x="208" y="180" />
        <di:waypoint x="260" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0nn4qnj_di" bpmnElement="Flow_0nn4qnj">
        <di:waypoint x="360" y="180" />
        <di:waypoint x="390" y="180" />
        <di:waypoint x="390" y="310" />
        <di:waypoint x="420" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1j42mu7_di" bpmnElement="Flow_1j42mu7">
        <di:waypoint x="520" y="310" />
        <di:waypoint x="582" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1wveg9i_di" bpmnElement="Flow_1wveg9i">
        <di:waypoint x="618" y="310" />
        <di:waypoint x="682" y="310" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0jf4xqm_di" bpmnElement="Flow_0jf4xqm">
        <di:waypoint x="718" y="310" />
        <di:waypoint x="754" y="310" />
        <di:waypoint x="754" y="180" />
        <di:waypoint x="790" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_0l2xymz_di" bpmnElement="Flow_0l2xymz">
        <di:waypoint x="890" y="180" />
        <di:waypoint x="962" y="180" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNShape id="Participant_1vhtw3k_di" bpmnElement="Participant_1vhtw3k" isHorizontal="true">
        <dc:Bounds x="80" y="410" width="600" height="250" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Activity_09u6k20_di" bpmnElement="Activity_09u6k20">
        <dc:Bounds x="300" y="490" width="100" height="80" />
        <bpmndi:BPMNLabel />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_171hny1_di" bpmnElement="Event_1liy11t">
        <dc:Bounds x="212" y="512" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNShape id="Event_0ekav1f_di" bpmnElement="Event_1v118e8">
        <dc:Bounds x="452" y="512" width="36" height="36" />
      </bpmndi:BPMNShape>
      <bpmndi:BPMNEdge id="Flow_00drr7g_di" bpmnElement="Flow_00drr7g">
        <di:waypoint x="248" y="530" />
        <di:waypoint x="300" y="530" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1fzqzav_di" bpmnElement="Flow_1fzqzav">
        <di:waypoint x="400" y="530" />
        <di:waypoint x="452" y="530" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1b35vsc_di" bpmnElement="Flow_1b35vsc">
        <di:waypoint x="600" y="328" />
        <di:waypoint x="600" y="390" />
        <di:waypoint x="230" y="390" />
        <di:waypoint x="230" y="512" />
      </bpmndi:BPMNEdge>
      <bpmndi:BPMNEdge id="Flow_1hda9cb_di" bpmnElement="Flow_1hda9cb">
        <di:waypoint x="470" y="512" />
        <di:waypoint x="470" y="420" />
        <di:waypoint x="700" y="420" />
        <di:waypoint x="700" y="328" />
      </bpmndi:BPMNEdge>
    </bpmndi:BPMNPlane>
  </bpmndi:BPMNDiagram>
</bpmn:definitions>

  ```
</details>

### 4. Example Execution Process

#### Step 1: Creating BPMN Process
- **1.1** Create two Pools as shown in the figure below. The Error Handling Pool is the Process where uEngine6 operates, and the Error Work History Management Pool plays the role of an external system.
    ![Lane Drawing](../../uengine-image/SOA-message-1.png)

- **1.2** Configure the Error Work History Management Pool from the created Pools. Enter the server's Endpoint for the API URL and the Open API specification information for the server's Open API spec.
    ![Pool Setting](../../uengine-image/SOA-message-2.png)

- **1.3** Set up process variables. The process variables are Worker, Error, and Status, all specified as String Type.
    ![PV Setting](../../uengine-image/SOA-message-3.png)

- **1.4** Add StartEvent and UserTask. In this UserTask, the Worker is designated.
    - UserTask
    ![UserTask](../../uengine-image/SOA-message-4.png)
    - UserTask - Data Mapping
    ![UserTask](../../uengine-image/SOA-message-5.png)

- **1.5** Add another UserTask. In this UserTask, error content is written.
    - UserTask
    ![UserTask](../../uengine-image/SOA-message-6.png)
    - UserTask - Data Mapping
    ![UserTask](../../uengine-image/SOA-message-7.png)

- **1.6** Add MessageIntermediateThrowEvent. This Event calls the registered API.
    - MessageIntermediateThrowEvent
    ![MessageIntermediateThrowEvent](../../uengine-image/SOA-message-8.png)

- **1.7** Add MessageIntermediateCatchEvent. This Event is completed when the relationship key comes into the registered service path.
    - MessageIntermediateCatchEvent
    ![MessageIntermediateCatchEvent](../../uengine-image/SOA-message-9.png)

- **1.8** Connect with the external system. Since the external system does not actually operate the BPM, draw notations semantically to connect.
    - External System
    ![MessageIntermediateCatchEvent](../../uengine-image/SOA-message-10.png)

- **1.9** Add a work completion confirmation UserTask and EndEvent. In this Task, after confirming completion, the process ends through the EndEvent.
    - UserTask
    ![UserTask](../../uengine-image/SOA-message-11.png)
    - UserTask - Data Mapping
    ![UserTask](../../uengine-image/SOA-message-12.png)

#### Step 2: Execution of the Process
- **2.1** Execute the process. In the first task, designate the Worker.
![UserTask](../../uengine-image/SOA-message-13.png)

- **2.2** Proceed to the next task. In this task, write the error content.
![UserTask](../../uengine-image/SOA-message-14.png)

- **2.3** Execute the process. Write the error content.
![UserTask](../../uengine-image/SOA-message-15.png)

- **2.4** Execute the process. Write the error content.
![UserTask](../../uengine-image/SOA-message-16.png)

- **2.5** Execute the process. Write the error content.
![UserTask](../../uengine-image/SOA-message-17.png)

- **2.6** Execute the process. Write the error content.
![UserTask](../../uengine-image/SOA-message-18.png)

## REST API Integration [<span style="color:red;font-size: 0.8em;">NOT RECOMMENDED</span>]
- This is a method of direct communication between external services and uEngine6 BPM. It proceeds by directly calling from external services to uEngine6 BPM and receiving responses, and if the external service's task changes, uEngine6 BPM must change together. Additionally, since it proceeds synchronously, when a failure occurs in either the external service or BPM, it propagates and affects each other.

<span style="color:red;">[Warning] External application integration (REST API) is not recommended when modeling processes.</span>



