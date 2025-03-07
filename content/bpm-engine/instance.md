---
description: ''
sidebar: 'getting-started'
---

# Instance

## Process Instance
### 1. 관계
- ProcessInstance: Process 관련 인터페이스.

- ProcessInstanceImpl: ProcessInstance 인터페이스를 구현하는 구체적인 클래스. 

- AbstractProcessInstance: ProcessInstance를 생성하고 관리하는 데 사용되는 추상 클래스 또는 베이스 클래스.


 하단의 다이어그램은 AbstractProcessInstance를 통해 프로세스 인스턴스의 생성과 관리를 어떻게 추상화하고, ProcessInstance 인터페이스를 통해 다양한 프로세스 인스턴스의 동작을 일관되게 정의하는지 보여줍니다. ProcessInstanceImpl 클래스는 이 인터페이스를 구현하여 실제 로직을 제공합니다. 이러한 설계는 유연성과 확장성을 제공하며, 다양한 유형의 프로세스 인스턴스를 쉽게 지원할 수 있게 해줍니다.

![스크린샷 2024-04-02 오후 4 08 42](https://github.com/sooheon45/topping-github-action/assets/54785805/cf7265a8-3c42-4c91-a0df-8788f96ae586)


### 2. ProcessInstance

ProcessInstance 인터페이스는 비즈니스 프로세스의 실행 인스턴스를 추상화하여 정의합니다. 
이 인터페이스는 프로세스의 상태 관리, 변수 및 속성 관리, 역할 매핑, 이벤트 처리 등 프로세스 인스턴스의 핵심 기능을 제공합니다. 
다음은 ProcessInstance 인터페이스의 주요 기능과 사용 예시입니다.

예시)
``` java
// 프로세스 인스턴스 생성 및 초기화
ProcessInstance myProcessInstance = processInstanceFactory.createProcessInstance();
myProcessInstance.setInstanceId("12345");
myProcessInstance.setProcessDefinition(myProcessDefinition);

// 역할 매핑 추가
RoleMapping roleMapping = new RoleMapping();
roleMapping.setRoleName("Manager");
roleMapping.setEndpoint("manager@example.com");
myProcessInstance.putRoleMapping(roleMapping);

// 변수 설정 및 조회
myProcessInstance.set("myTag", "orderNumber", "ORD123456");
Serializable orderNumber = myProcessInstance.get("myTag", "orderNumber");

// 프로세스 실행
myProcessInstance.execute();
```

1. 인스턴스 식별자 관리
```java
getInstanceId(): 현재 프로세스 인스턴스의 식별자를 반환합니다.
setInstanceId(String value): 프로세스 인스턴스에 식별자를 설정합니다.
```
2. 프로세스 정의 접근
```java
getProcessDefinition(): 현재 프로세스 인스턴스에 연결된 프로세스 정의를 반환합니다.
setProcessDefinition(ProcessDefinition value): 프로세스 인스턴스에 프로세스 정의를 설정합니다.
```
3. 역할 매핑 관리
```java
getRoleMapping(String roleName): 지정된 역할 이름에 대한 역할 매핑을 반환합니다.
putRoleMapping(RoleMapping roleMap): 프로세스 인스턴스에 역할 매핑을 추가합니다.
```
4. 변수 및 속성 관리
```java
set(String tracingTag, String key, Serializable val): 지정된 키에 대한 값을 설정합니다.
get(String tracingTag, String key): 지정된 키에 대한 값을 반환합니다.
```
5. 상태 관리
```java
setStatus(String tracingTag, String status): 프로세스 인스턴스의 상태를 설정합니다.
getStatus(String tracingTag): 프로세스 인스턴스의 현재 상태를 반환합니다.
```
6. 이벤트 및 예외 처리
```java
addMessageListener(String message, String tracingTag): 특정 메시지에 대한 리스너를 추가합니다.
fireComplete(String tracingTag): 프로세스 인스턴스의 완료 이벤트를 발생시킵니다.
```
7. 실행 및 활동 관리
```java
execute(): 프로세스 인스턴스를 실행합니다.
getCurrentRunningActivity(): 현재 실행 중인 활동을 반환합니다.
```


### 3. ProcessInstanceImpl

 Spring Boot와 uEngine 프레임워크를 사용하여 프로세스 인스턴스 관리를 위한 REST API를 구현한 것입니다. 
 이 클래스는 InstanceService 인터페이스를 구현하며, 프로세스 인스턴스의 생성, 중지, 일시 정지, 재개 등의 기능을 제공합니다.
 주요 구성 요소와 기능은 다음과 같습니다

**주요 의존성**

1. DefinitionServiceUtil, ApplicationContext, WorklistRepository 통해 필요한 서비스와 컨텍스트에 접근합니다.
2. ProcessInstanceRepository, ServiceEndpointRepository 등의 JPA 리포지토리를 사용하여 데이터베이스와의 상호작용을 관리합니다.

**주요 API 엔드포인트**
#### 프로세스 인스턴스 시작
- **함수**: `start(ProcessExecutionCommand command)`
- **경로**: `/instance`
- **메소드**: POST, PUT



2. 프로세스 인스턴스 중지: POST 요청을 /instance/{instanceId}/stop 엔드포인트로 보내 특정 인스턴스를 중지합니다.

3. 프로세스 인스턴스 일시 정지 및 재개: 각각 /instance/{instanceId}/suspend와 /instance/{instanceId}/resume 엔드포인트를 통해 일시 정지 및 재개 기능을 제공합니다.

4. 프로세스 인스턴스 조회: GET 요청을 /instance/{instanceId}로 보내 특정 인스턴스의 상태와 정보를 조회합니다.
변수 및 역할 매핑 관리: 프로세스 인스턴스의 변수와 역할 매핑을 조회하고 설정하는 엔드포인트(/instance/{instanceId}/variables, /instance/{instanceId}/role-mapping/{roleName} 등)를 제공합니다.

5. 작업 항목 관리: 작업 항목을 조회하고 업데이트하는 API(/work-item/{taskId})를 통해 사용자 작업의 관리를 지원합니다.

**트랜잭션 관리**
@Transactional 및 @ProcessTransactional 어노테이션을 사용하여 데이터베이스 트랜잭션의 시작, 커밋, 롤백을 관리합니다. 이는 데이터 일관성을 유지하고, 오류 발생 시 롤백을 통해 데이터를 원래 상태로 복구하는 데 필요합니다.

1. 예외 처리 방식
ResponseStatusException을 던지는 방식으로 예외 상황을 처리합니다. 예를 들어, 클래스를 찾을 수 없거나 정의를 찾을 수 없는 경우 HttpStatus.INTERNAL_SERVER_ERROR 또는 HttpStatus.NOT_FOUND와 같은 상태 코드와 함께 클라이언트에게 응답합니다.

2. 보안
SecurityAwareServletFilter를 통해 사용자 인증 정보를 관리하고, API 호출 시 사용자 ID를 전역 컨텍스트에 설정합니다.
이 파일은 복잡한 비즈니스 프로세스를 관리하고 실행하기 위한 RESTful API를 제공하는 중요한 컴포넌트입니다. 각 메소드와 엔드포인트는 프로세스 인스턴스의 생명주기를 관리하고, 사용자와 시스템 간의 상호작용을 가능하게 합니다.


### 4. AbstractProcessInstance
 AbstractProcessInstance 클래스는 uEngine BPM 시스템에서 프로세스 인스턴스의 핵심 기능과 속성을 정의하는 중요한 기반 클래스입니다.
 이 클래스를 상속받아 구현하는 하위 클래스는 프로세스 인스턴스의 구체적인 로직과 상태 관리를 담당합니다.
 이러한 구현은 프로세스의 실행 흐름,이벤트 처리, 변수 및 역할 매핑 관리 등 프로세스 인스턴스가 필요로 하는 다양한 기능을 포함할 수 있습니다.AbstractProcessInstance를 상속받는 클래스는 이 추상 클래스에서 정의된 메소드들을 구현함으로써,uEngine BPM 시스템 내에서 프로세스의 실행과 관리를 가능하게 합니다.

![Untitled](https://github.com/sooheon45/topping-github-action/assets/54785805/66363bd4-b6c5-48aa-8b43-fa4097646413)

**주요 특징 및 기능**

1. 인스턴스 식별자 및 기본 속성: 인스턴스 ID, 이름 등의 기본 속성 관리를 위한 추상 메소드(getInstanceId, setInstanceId, getName, setName)를 제공합니다.

2. 프로세스 정의 접근: 프로세스 인스턴스가 속한 프로세스 정의에 접근하기 위한 메소드1를 포함합니다. 이를 통해 인스턴스는 실행 중인 프로세스의 구조와 설정에 접근할 수 있습니다.

3. 역할 매핑 및 변수 관리: 프로세스 인스턴스 내에서 역할(Role)과 프로세스 변수(Process Variable)를 관리하기 위한 메소드(getRoleMapping, putRoleMapping, set, get)를 포함합니다.

4. 상태 관리: 프로세스 인스턴스의 상태(getStatus, setStatus)를 관리하며, 특정 활동의 완료2 또는 오류3를 처리합니다.

5. 실행 범위 및 트랜잭션 컨텍스트: 실행 범위4와 트랜잭션 컨텍스트5를 관리합니다. 이는 복잡한 프로세스 흐름과 트랜잭션을 처리하는 데 필요합니다.

6. 이벤트 리스너 관리: 프로세스 인스턴스에서 발생하는 이벤트를 처리하기 위한 리스너(addMessageListener, removeMessageListener)를 등록 및 제거합니다.

7. 실행 및 상태 조회: 현재 실행 중인 활동(getCurrentRunningActivity, getCurrentRunningActivities)을 조회하고, 특정 조건을 만족하는 활동들을 깊이 우선 탐색6으로 조회합니다.


## Instance Service 상세 설명

### 1. InstanceService
프로세스 인스턴스 관리를 위한 REST API를 정의하는 *인터페이스입니다. Spring Cloud의 Feign 클라이언트를 사용하여 bpm 서비스와 통신합니다.

#### 1.1 interface 목록
##### 1.1.1 인스턴스 시작및 재시작
- **메소드**: `start(ProcessExecutionCommand command)`
- **경로**: POST, PUT: `/instance`

##### 1.1.2 인스턴스 중지
- **메소드**: `stop(String instanceId)`
- **경로**: POST: `/instance/{instanceId}/stop`

##### 1.1.3 중지된 프로세스 인스턴스 재개
- **메소드**: `resume(String instanceId)`
- **경로**: POST: `/instance/{instanceId}/resume`

##### 1.1.4 인스턴스의 정보 조회
- **메소드**: `getInstance(String instanceId)`
- **경로**: GET: `/instance/{instanceId}`

##### 1.1.5 지정된 위치 이동
- **메소드**: `backToHere(String instanceId, String tracingTag)`
- **경로**: POST: `/instance/{instanceId}/activity/{tracingTag}/backToHere`

##### 1.1.6 메시지 전송
- **메소드**: `postMessage(String instanceId, Message message)`
- **경로**: POST: `/instance/{instanceId}/messages`

##### 1.1.7 인스턴스의 모든 변수 조회
- **메소드**: `getProcessVariables(String instanceId)`
- **경로**: GET: `/instance/{instanceId}/variables`

##### 1.1.8 인스턴스의 특정 변수 값 조회
- **메소드**: `getVariable(String instId, String varName)`
- **경로**: GET: `/instance/{instId}/variable/{varName}`

##### 1.1.9 인스턴스의 변수 값 설정
- **메소드**: `setVariable(String instanceId, String varName, String varValue)`
- **경로**: POST: `/instance/{instanceId}/variable/{varName}`

##### 1.1.10 역할 매핑 정보 조회
- **메소드**: `getRoleMapping(String instId, String roleName)`
- **경로**: GET: `/instance/{instId}/role-mapping/{roleName}`

##### 1.1.11 역할 매핑 설정
- **메소드**: `setRoleMapping(String instanceId, String roleName, RoleMapping roleMapping)`
- **경로**: POST: `/instance/{instanceId}/role-mapping/{roleName}`

##### 1.1.12 지정된 작업 항목의 정보 조회
- **메소드**: `getWorkItem(String taskId)`
- **경로**: GET: `/work-item/{taskId}`

##### 1.1.13 지정된 작업 항목 업데이트
- **메소드**: `putWorkItem(String taskId, WorkItemResource workItem)`
- **경로**: POST: `/work-item/{taskId}`

### 2. InstanceServiceImpl
InstanceService 인터페이스의 구현체로, 프로세스 인스턴스의 생성, 중지, 재개, 조회 등의 실제 로직을 처리합니다. @Autowired를 통해 다른 서비스와 리포지토리에 접근합니다. 예외 처리, 트랜잭션 관리, JSON 데이터 처리 등의 기능을 포함합니다.

### 3. ProcessExecutionCommand
InstanceService 인터페이스와 InstanceServiceImpl에서 사용하는 데이터 전송 객체(DTO)입니다. 프로세스 실행 명령, 메시지 전송, 작업 항목 정보 등을 담습니다.

### 4. ProcessInstanceEntity
데이터베이스에 저장되는 엔티티 클래스입니다. 프로세스 인스턴스와 작업 목록의 정보를 저장합니다. JPA 어노테이션을 사용하여 데이터베이스 테이블과 매핑됩니다.

### 5. ProcessInstanceRepository
JPA 리포지토리 인터페이스로, 데이터베이스의 프로세스 인스턴스와 작업 목록에 대한 CRUD 연산을 추상화합니다. Spring Data JPA를 사용하여 구현체를 자동으로 생성합니다.
