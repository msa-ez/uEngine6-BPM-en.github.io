---
description: ''
sidebar: 'getting-started'
---

# Multi-Instance Processing

## Multiple Instance Processing using Sub-Processes

- Example of Multiple Instance Application Model

>![](../../uengine-image/sub.jpeg)

### Definition of Multiple Instance
A complex process execution feature where the number of execution segments is determined during runtime

### Tips for Specifying Multiple Instances
Sub-processes that specify the range of multiple instance execution segments are supported, and when a process variable corresponding to the parameter value (array value) that generates multiple instances is specified in the sub-process settings, it dynamically generates multiple instances by repeating the number of values entered in the variable in Parallel or Loop method.

The main process places a sub-process for specific tasks to handle various instances and distributes the work.

When creating a sub-process, add a variable that can be stored in the ForEach Variable and map items with multi-data to that variable through form mapping.

## Loop Method Application Example

In this chapter, let's improve the process so that when a user proceeds with the condition of functional improvement, they can branch to a task where they can propose improvement content.

At this time, we will learn the "repeat flow" type so that it can be performed repeatedly until the improvement conditions are met.


>![](../../uengine-image/87-1.png)

>**Figure 1) Final Process Screen**

Delete the empty task activity created in the previous chapter from Case 2's Request for improvement in the conditional branch and write the functional improvement proposal process to be used as follows.

First install the Gateway activity and then add two general human task activities and place them inside the loop.

Since it's a simple form, the process of creating a flow chart will be omitted.
The variables to be added and the variable settings for each activity are as follows.

<br>

- Variable Definition

>|Process Variable ID|Process Variable Name (for display)|Data Format|
>|------|---|---|
>|contents|contents|Text|
>|approved|approved|Yes or No|

<br>

- Activity Definition

>|Activity|Role in Charge|Parameter|
>|------|---|---|
>|Proposal|Right person(Tester)|Contents|
>|Review|Trouble manager|Contents(→), approved|

<br>

- Repeat Flow Activity Definition

>|Condition Variable|Condition|Value|
>|------|---|---|
>|approved|==|No(Directvalue)|


>![](../../uengine-image/88.png)

>**Figure 2) Repeat Condition Setting**

After setting it like this, save and run it.
You can confirm that when the approved variable is selected as "no" in the proposal approval part, the task repeats.

>![](../../uengine-image/89-1.png)

>**Figure 3) Loop Screen**

## Sub-process Application Example

**Definition of Sub-process (Functional Improvement Proposal)**

Let's improve the task so that when a user proceeds with the condition of "functional improvement," they can branch to a process where they can propose functional improvement content.

For this, it is possible to simply add the stage that performs the functional improvement proposal to the corresponding condition block as shown in [Figure A], but we will use the concept of "sub-process" to process the work by separating the definition of the process as shown in [Figure B].


>![](../../uengine-image/90-1.png)

>**Figure A**

>![](../../uengine-image/91-1.png)

>**Figure B**

Using sub-processes in this way has the following advantages.

- 1. Sub-processes can be reused repeatedly in multiple main processes.
- 2. Large processes can be organized by breaking them down into sub-processes for easy monitoring.

First, let's create and register the sub-process to be used in the example.

Write the functional improvement proposal process to be used in Case 2's Request for improvement of the conditional branch as follows.


>![](../../uengine-image/92-1.png)

>**Figure 1) Functional Improvement Proposal Process**

First install the repeat flow activity from the flow control menu, then add two general human task activities and place them inside the loop.
Since it's a simple form, the process of creating a flow chart will be omitted.
Participant definitions and variable settings for each activity are as follows.

<br>

- Defining Participants

>|Process Variable ID|Process Variable Name (for display)|
>|------|---|---|
>|Drafter|drafter|
>|Manager|Manager|

<br>

- Variable Definition

>|Process Variable ID|Process Variable Name (for display)|Data Format|
>|------|---|---|
>|contents|contents|Text|
>|approved|approved|Yes or No|

<br>

- Activity Definition

>|Activity|Role in Charge|Parameter|
>|------|---|---|
>|Proposal|Drafter|contents|
>|Review|Manager|Contents(in), approved|

<br>

- Repeat Flow Activity Definition

>|Condition Variable|Condition|Value|
>|------|---|---|
>|approved|==|No(Directvalue)|

<br>

After setting it like this, save and run it.

**3.2 Setting up the Sub-process**

Drag and drop the sub-process from the control in the existing activity palette to the second branch point and delete the existing empty task.


>![](../../uengine-image/93-1.png)

>**Figure 2) Sub-process Definition**


- Sub-process Basic Property Setting

Now let's set the properties of this sub-process.

When you click the process definition button in the 'Process Definition' property, a list of processes registered in the current process manager appears.

Specify the sub-process you created.

>![](../../uengine-image/94-1.png)

>**Figure 3) Sub-process Designation**