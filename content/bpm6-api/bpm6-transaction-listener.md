---
description: ''
sidebar: 'getting-started'
prev: ''
next: ''
---

# uEngine6 트랜잭션 리스너

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

하나의 트랜잭션 내에 여러개의 메인과 서브 프로세스 인스턴스, 그리고 심지어 멀티플 인스턴스가 생성되었다가 한번에 저장되어야 하기 때문에, 액티비티들을 실행하면서 발생하는 모든 프로세스 인스턴스의 상태나 프로세스 변수의 값을 JPA Repository 를 통하여 매번 읽고 쓰고가 생길때마다 SQL 을 DB 로 전송했다가는 성능 저하가 심각하게 발생하여 uEngine 은 전통적으로 DAO 에 대한 Caching 프레임워크를 자체적으로 개발하여 사용하고 있었다.

uEngine6 에서는 대대적으로 기존 자체 기술을 Spring 기반의 가능한 표준 기술로 대체하기로 한바, JPA 기반으로 기존 동작을 구현하기로 하였다.

해서 하나의 Request 에 유일한 완료시점에 변경된 프로세스 인스턴스들만 마지막 상태값을 저장할 수 있어야 한다.

저자가 Spring 을 잘 몰라서 그런지 여러방법 (Application Event 등) 들을 써봤으나, 제대로 한번만 호출이 안되는 관계로, 결국 서비스단에서 다음과 같이 애노테이션을 주면, 이를 advice 가 걸러내어 시작시점과 완료시점에 수정된 인스턴스들만 걸러내어 저장 시켜주는 프레임워크를 만들게 되었다:


```java
@RequestMapping(value = "/work-item/{taskId}", method = RequestMethod.POST)
@Transactional
@ProcessTransactional //important!
public void putWorkItem(@PathVariable("taskId") String taskId, @RequestBody WorkItem workItem) throws Exception {....}
```


결론적으로, 기존에 트랜잭션을 걸기위해서 스프링에서 @Transactional 을 선언한다고 하면, 거기에 보태어 @ProcessTransactional 하나만 더 선언해주기만 하면 된다. 위와 같이 선언해주면, 다음의 Advice 가 등록된 TransactionListener 들 각자에 beforeCommit, beforeRollback 을 콜백받을 기회를 주게된다:


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

JPAProcessInstance 는 자기 자신이 생성되는 순간, ThreadLocal 객체로 존재하는 ProcessTransactionContext 에 자신을 등록하고, beforeCommit() 에서 자신을 최종으로 한번만 저장하는 로직을 응집도 있게 구현하고 있다:




```java
package org.uengine.five;
...
public class JPAProcessInstance extends DefaultProcessInstance implements ProcessTransactionListener { // JPAProcessInstance 는 ProcessTransactionListener 이다.

   ...

    public JPAProcessInstance(ProcessDefinition procDefinition, String instanceId, Map options) throws Exception {
        super(procDefinition, instanceId, options);
...

        //Add this instance as transaction listener and register this so that it can be cached.
        // JPAProcessInstance 가 어떻게든 생성되면, 자신을 ProcessTransactionContext 에 등록한다.
        ProcessTransactionContext.getThreadLocalInstance().addTransactionListener(this);
        ProcessTransactionContext.getThreadLocalInstance().registerProcessInstance(this);
....

        }
    }
...

//   자신이 커밋되기 직전에 자신의 수정된 사항들을 한번에 저장한다. 파일과 DB 를 저장하고 있다.

    @Override
    public void beforeCommit(ProcessTransactionContext tx) throws Exception {

        processInstanceRepository.save(getProcessInstanceEntity());

        IResource resource = new DefaultResource("instances/" + getInstanceId());
        resourceManager.save(resource, getVariables());
    }
...
}
```
## 사용 확장
만약, JPAProcessInstance 와 같이 애플리케이션 로직에서 구현한 것들도 한번에 이벤트를 받아 캐시된 정보를 최종적으로 한번만 저장해야 하는 필요성이 있다면 아래와 같이 구현하면 될 것이다:

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














