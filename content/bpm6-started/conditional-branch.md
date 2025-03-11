---
description: ''
sidebar: 'getting-started'
---

# Conditional Branching

## Using Gateways for Branching in Processes

- Example of applying gateway branching

>![](../../uengine-image/condition.jpeg)

### Applying Conditions and Branching When Defining Processes

Using Gateway notation, you can define process variables and set conditions to perform branching.

In Gateway settings, you can compare simple process variables and define complex rules with And/Or combinations.

By properly mapping branching variables to each process variable, you specify the execution stages of the process for different situations.

Process the main issues in the process by requesting messages by type, allowing designated actions to be executed in each pool.

## Conditional Branching Flow Control Example

In this chapter, we will learn about the "conditional branching" flow type by extending the basic Trouble-Ticket example to have different workflows according to the user's fault type.
The target process is as shown in [Figure 7-1].

>![](../../uengine-image/76-1.png)

>**Figure 1) Final Process Screen**

As shown in [Figure 7-1], the target process is to follow the existing workflow if the fault type entered by the user belongs to the "SW" or "HW" area, and to skip the process if it corresponds to "Feature Improvement".

- Conditional Branching
To create a conditional branching block, you use the "Conditional Branching" activity within the "Flow Control" activity group.


>![](../../uengine-image/77-1.png)

>**Figure 2) Conditional Branching Process**

To create a conditional branching activity, click on the Gateway icon and then drag&drop it, and a conditional branching block will appear on the flow chart as shown above.

Drag this activity to the location where you want to execute the conditional branching

To execute conditional branching, you need to define the conditions for branching and the processes to be executed for each condition.

First, include the activities you want to execute in the conditional branching block in order by drag and drop, as shown in [Figure 7-3].


>![](../../uengine-image/78-1.png)

>**Figure 3) Specifying the Execution Area**

<br>

>![](../../uengine-image/79-1.png)

>**Figure 4) Specifying the Second Execution Area**


Once the form is complete, click on the title of each execution area and specify as follows.

- First execution area: S/W or H/W
- Second execution area: Request for improvement


>![](../../uengine-image/80-1.png)

>**Figure 5) Specifying Branching Process Titles**

This completes the basic execution areas for creating a conditional branching process. Let's set the conditions for when it's SW or HW.

As shown in [Figure 6], with the properties window open, check Complex Rule, set the variable to class of problem, set the Comparator to =, and enter software and hardware as the Value values.

Since the right process is executed in the case of both S/W or H/W, the two conditions are effectively connected with an OR condition.



>![](../../uengine-image/81-1.png)

<!-- >![](../../uengine-image/82.png) -->

>**Figure 6) Setting Branching Condition (Otherwise)**

Finally, check the 'Otherwise Condition' in the properties of the feature improvement request execution condition, which will become the condition that branches when it doesn't match any other conditions.

Let's save what we've done so far and test it.



<!-- >![](../../uengine-image/83.png) -->

>![](../../uengine-image/85-1.png)

>**Figure 7) Conditional Branching Execution History (When System-Related Fault)**

Looking at the execution results above, you can see that the process has moved to the software fault area among the two execution paths.

Now, let's create a case where improvement is required due to another type of fault.

<br>

<!-- >![](../../uengine-image/85-1.png) -->

>![](../../uengine-image/86-1.png)

>**Figure 8) Conditional Branching Execution History (When Improvement Request)**

When the fault type is Request for improvement, you can see that the flow of the process executes the empty task below and then terminates.

Since conditional branching is a core function for implementing decision-making in business processes, it should be studied until it can be applied.