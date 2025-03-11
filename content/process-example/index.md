---

description: '서브 프로세스를 활용한 프로세스 작성'
sidebar: 'getting-started'

---

### Loan Management Process

The process below explains how to model the loan approval and execution process using the uEngine6 process modeler. This diagram shows the flow from loan application to execution, delinquency verification, and collection.

![](../../uengine-image/process-writing_1.svg)

#### Process Overview
This section explains the loan management process. It explains the flow of how loans are received, approved, and executed. The main steps are as follows:

1. **Loan Application**: The customer applies for a loan.
2. **Reception**: The responsible department receives the application.
3. **Loan Approval Decision**: If approved, it is executed; if rejected, it is terminated.
4. **Verification of Delinquency After Loan Execution**: After loan execution, delinquency status is checked at regular intervals.
   - When delinquency occurs: Additional management is required.
   - If there is no delinquency: It is maintained normally.

#### Detailed Process Flow Description
1. When a customer applies for a loan, it is received by the responsible department.
2. The loan approval decision is made after review.
3. If approved, the loan is executed, and delinquency status is checked at regular intervals afterward.
4. If delinquency occurs, documents are reviewed and delinquency status is checked again.
   - If delinquency continues, a collection request is initiated.
   - If delinquency is resolved, normal flow is maintained.
5. If the delinquency status continues, the collection procedure is finally initiated.

Refer to this document to configure the loan process in uEngine6 and adjust as needed.

### Process Creation Using Subprocess

In this process, **subprocesses** are utilized to structure the loan approval process more systematically and efficiently.

![](../../uengine-image/process-writing_2.svg)

#### Process Operation Principle

![](../../uengine-image/process-writing_2_1.png)

- When there are many approvers in the loan approval process, repeated approval procedures are organized into a single subprocess.
- If even one person rejects the loan during the approval process, the loan approval process is terminated and moved to the loan rejection process.

#### Role of Subprocess
- In the loan approval process, **approval procedures that are repeatedly performed are organized into a single subprocess,** making them easier to manage.
- The main process that determines approval and rejection is **separated into independent units,** allowing the same approval procedure to be reused in multiple processes.
- If changes occur, only the subprocess needs to be modified, which can **improve process maintainability.**

This provides users with **more consistent approval procedures, improved processing speed, increased work efficiency,** and other effects.

### Utilization of Call Activity

![](../../uengine-image/process-writing_3.svg)

This diagram is the **post-management (Call Activity)** process called from the previously defined loan process. It includes delinquency verification, grace request processing, and collection procedures that occur after loan execution, and is managed as a separate process through call activity.

![](../../uengine-image/process-writing_4.svg)

#### What is Call Activity?
- **Call Activity** is a BPMN element that calls and executes another process as a subprocess.
- It can be executed independently, separate from the parent process, and can be commonly used in multiple processes.
- It serves to **increase maintainability and reusability** and is useful for modularizing specific business logic.

#### Role of Call Activity in this Process
- Call activity is used to **execute the post-management process separately** after loan execution.
- Main functions:
  1. **Document Management** - Organizes necessary documents after loan execution.
  2. **Delinquency Verification** - Checks the customer's loan delinquency status.
  3. **Delinquency Determination** - Initiates follow-up procedures if delinquency occurs.
  4. **Grace Request Processing** - Performs the process for cases where customers request repayment grace.
  5. **Collection Procedure Initiation** - Proceeds with collection if delinquent without a grace request.

#### Advantages of Using Call Activity
1. **Independent Management**  
   - Improves maintainability by separating loan execution process and post-management process.
   
2. **Reusable**  
   - 여Can apply the same post-management procedure to multiple loan products.

3. **Ease of Change**  
   - If the post-management process changes, modifying the call activity applies to all related processes.

As shown, utilizing call activity allows specific processes to be used repeatedly while maintaining independence, providing a very useful function in BPMN-based process design.

