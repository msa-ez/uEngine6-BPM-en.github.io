---
description: ''
sidebar: 'getting-started'
prev: ''
next: ''
---

# uEngine6 Transaction Listener

Main interface of ProcessTransactionListener is as follows:

```java
package org.uengine.five;

public interface ProcessTransactionListener {
    void beforeCommit(ProcessTransactionContext tx) throws Exception;
    void beforeRollback(ProcessTransactionContext tx) throws Exception;
    void afterCommit(ProcessTransactionContext tx) throws Exception;
    void afterRollback(ProcessTransactionContext tx) throws Exception;
}
```

The transactional management in uEngine6 was reimagined to address performance challenges. Since multiple instances (main processes, sub-processes, and even multiple instances) need to be created and saved within a single transaction, continuously reading and writing process instance states and variable values through JPA Repository with SQL transmissions to the database for every change would cause serious performance degradation. Traditionally, uEngine developed and used its own caching framework for DAOs to mitigate this issue.

In uEngine6, there was a major initiative to replace proprietary technologies with standard Spring-based technologies where possible, so they decided to implement the existing functionality based on JPA.

The goal was to save only the modified process instances at a unique completion point of a single request, capturing just their final state values.

The author, admittedly not very familiar with Spring, tried various methods (including Application Events) but couldn't get them to execute just once properly. Eventually, they created a framework at the service layer where an annotation could be applied, and an advice would filter it to save only the modified instances at the start and completion points:


```java
@RequestMapping(value = "/work-item/{taskId}", method = RequestMethod.POST)
@Transactional
@ProcessTransactional //important!
public void putWorkItem(@PathVariable("taskId") String taskId, @RequestBody WorkItem workItem) throws Exception {....}
```


In conclusion, whereas previously you would declare @Transactional in Spring to establish a transaction, now you simply need to add one more declaration: @ProcessTransactional. When declared this way, the following Advice gives registered TransactionListeners the opportunity to receive callbacks for beforeCommit and beforeRollback:


```java
package org.uengine.five;
...

@Aspect
@Component
public class ProcessTransactionAdvice {

    @Before("@annotation(org.uengine.five.ProcessTransactional)")
    public void initiateTransaction() throws Exception {
        System.out.println("start tx");
        new ProcessTransactionContext();
    }

    @AfterReturning("@annotation(org.uengine.five.ProcessTransactional)")
    public void commitTransaction() throws Exception {
        System.out.println("commit");
        ProcessTransactionContext.getThreadLocalInstance().commit();
    }

    @AfterThrowing("@annotation(org.uengine.five.ProcessTransactional)")
    public void rollbackTransaction() throws Exception {
        System.out.println("rollback");
        ProcessTransactionContext.getThreadLocalInstance().rollback();
    }
}
```

The JPAProcessInstance registers itself to the ProcessTransactionContext (which exists as a ThreadLocal object) at the moment of its creation, and then implements a cohesive logic to save itself only once in its final state during the beforeCommit() method:




```java
package org.uengine.five;
...
public class JPAProcessInstance extends DefaultProcessInstance implements ProcessTransactionListener { // JPAProcessInstance is a ProcessTransactionListener.

   ...

    public JPAProcessInstance(ProcessDefinition procDefinition, String instanceId, Map options) throws Exception {
        super(procDefinition, instanceId, options);
...

        //Add this instance as transaction listener and register this so that it can be cached.
        // When a JPAProcessInstance is created in any way, it registers itself in the ProcessTransactionContext.
        ProcessTransactionContext.getThreadLocalInstance().addTransactionListener(this);
        ProcessTransactionContext.getThreadLocalInstance().registerProcessInstance(this);
....

        }
    }
...

//   Just before it is committed, it saves all its modifications at once. It saves to both file and DB.

    @Override
    public void beforeCommit(ProcessTransactionContext tx) throws Exception {

        processInstanceRepository.save(getProcessInstanceEntity());

        IResource resource = new DefaultResource("instances/" + getInstanceId());
        resourceManager.save(resource, getVariables());
    }
...
}
```
## Usage Extension
If there's a need for application logic implementations (similar to JPAProcessInstance) to receive events once and save cached information only at the final stage, they could be implemented as follows:

```java
executeActivity(....){
   ProcessTransactionContext.getThreadLocalInstance().addTransactionListener(
        new ProcessTransactionListener(){
             public void beforeCommit(...){
                  flushSomething();
             }

              ...
        }
   );
}
```














