---
description: ''
sidebar: 'getting-started'
prev: ''
next: ''
---

# 애플리케이션과 BPM 연동(비동기 방식)

## 1. 동기 방식의 App 연동 시 문제점
![IMAGE](../../uengine-image/115.png) 
[이미지 1] 동기식 방식

  동기 방식은 응답을 기다리는 방식입니다. 일반적인 BPM과 App 간의 동기 방식 연동은 BPM의 응답을 기다리기 때문에 BPM에 장애가 발생하면 App에도 영향을 줄 수 있습니다. 이로 인해 시스템 전체에 장애가 전파되고 응답 지연이 발생할 수 있습니다.  
  또한, App과 관련된 세부정보가 많아져 dependency(의존성)을 이해를 해야 하는 등의 문제점이 있습니다.
  
  이러한 이유로 App과 BPM간의 동기 방식 처리시에 **장애 전파**가 되며, **결합도가 높고**, 실패시 즉각적인 처리가 불가능하다는 단점이 있습니다.
  

## 2. 비동기 방식의 App 연동
### 2.1 연동 원칙
  App과 BPM을 **비동기 방식**으로 처리합니다. 이는 BPM이 중지된 상태에서도 App에도 장애가 전파가 되지 않도록 되며, 이로 인해 App과 BPM의 시스템간의 블로킹 문제 등을 해소하는데 탁월한 방법이 됩니다.

* 단방향 의존성 
    - **비의존성**
        - 메시지 브로커를 통해 이벤트 메시지를 전송하므로, BPM 호출을 기다리지 않습니다.
    - **장애차단**
        - BPM시스템의 오류및 중지가 되었더라도, App에서의 영향이 없습니다. 장애 발생 시 다른 시스템에 영향을 주지 않습니다.
    - **보장성**
        - 중지된 BPM이 재실행 되더라도, 이전의 데이터가 반드시 처리가 되도록 보장합니다.

* 역할분리
    - App
        - 업무 화면 
        - 도메인로직 
        - 데이터 관리
    - BPM
        - 어플리케이션과 BPM 연동 시 시각적 이벤트 처리와 업무 공유 가능
        - BPM에서 프로세스 흐름 정의 및 업무 배분 용이
        - 업무 규칙(컨디션)에 따른 프로세스 분기/반복 
        - 담당자를 조직도에서 찾아서 담당자에게 업무 화면(App)을 라우팅 (워크아이템)

### 2.2 예제
  비동기 방식의 APP과 BPM을 연동 하는 "장애 신고 및 처리" 예제 입니다. 
  
![IMAGE](../../uengine-image/104.png) 
[이미지 2] "장애 신고 및 처리" 예제

  사용자가 어떠한 장애문제가 생겨 문제를 해결 하기 위해 장애 신고를 진행 합니다.

  신고된 내용을 바탕으로 담당자가 지정이 되고, 지정된 담장자는 사용자가 신고한 내용을 바탕으로 문제를 해결하는 장애 처리 되는 예제 입니다.

![IMAGE](../../uengine-image/98.png)
[이미지 3] "장애 신고 및 처리" 흐름도

"장애 신고 및 처리"의 예제는 2가지의 이벤트 타입을 정의 하여 진행 하였습니다.
- 장애 신고 (TroubleIssued)
- 장애 처리 (TroubleCompleted)

"장애 신고"는 사용자가 장애의 종류와 장애의 문제점을 작성 하여 전달하는 이벤트 타입 입니다. 
  
"장애 처리"는 사용자가 입력한 문제점을 바탕으로 담당자가 장애처리를 진행 한 후 완료되는 이벤트 타입 입니다. 

### 2.3 애플리케이션(Publisher)
  App에서는 "장애 신고" 및 "장애 처리"를 사용자가 입력을 하기 위한 화면 및 이벤트 전송을 정의 합니다. 
  그리고 사용자가 입력한 정보를 가지고 "장애 신고(TroubleIssued)", "장애 처리(TroubleCompleted)"이벤트 타입으로 메시지브로커에 전달하기 위한 메시지 발행 시키는 역할을 합니다.

  아래 코드는 App에서 이벤트를 발생 시키기 위한 코드 입니다.

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
1. 장애 티켓 발행(TroubleIssued) 이벤트 작성시 AbstractEvent클래스를 상속하고, TroubleIssued 속성값을 설정 합니다.

```java
// 예시 2-1) Kafka를 통한 메시지 송신
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
2. AbstractEvent 클래스는 메시지브로커 채널 연결하여 메시지를 전달 할 수 있도록 선언한 클래스입니다.

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
3. TroubleTicket 클래스로 이벤트를 송신(Publisher) 하기 위해서 실행하는 클래스 입니다. publishAfterCommit() 함수를 통해서 메시지 브로커 쪽으로 송신 하게 됩니다.
- 송신 메시지 예시
```sh
{"eventType":"TroubleIssued","timestamp":1718873491127,"id":1,"troubleType":"sw","description":"sw is error."}
```

### 2.4 Message Broker
Message Broker(메시지 브로커)는 시스템간 비동기 방식으로 연동하기 위해서 사용합니다. 대표적으로 Kafka을 사용하는데, 메시지 브로커는 시스템간의 의존성을 제거 하여 블로킹 문제를 해소하는데 탁월한 방법이 됩니다. 또한 메시지를 전달 보장을 통해서 안전한 연동 방식을 지원 합니다. 이러한 특성으로 인해 대규모 시스템, 분산 시스템, 마이크로서비스 아키텍처에 널리 사용됩니다.

"장애 신고 및 처리" 예제에도 App과 BPM간의 의존성을 낮추고, 연동을 하기 위해서 비동기 방식인 Kafka를 사용하여 서로 장애 전파를 차단하고, 서로 시스템간에 영향도를 낮추는 작업을 했습니다.

### 2.5 BPM(Subscriber)
App에서 메시지가 발행될 때마다 수신되며, 조건에 따라 메시지를 분류할 수 있습니다.

#### 2.6 비동기 연동 테스트
비동기 방식의 장점 확인 하기 위해서 테스트를 진행 하였습니다. App과 BPM간에 서비스를 실행 중에 BPM의 서비스가 중지가 된 상태에서 App의 정상적인 실행 흐름을 가져가도록 하였습니다.

App에서는 이전 예제와 같이 장애신고를 접수를 받는 상황이고, BPM 서비스는 중지되어 이벤트 수신을 못받는 상황을 테스트 하였습니다. 


1. 사용자는 장애신고를 App에서 정상적으로 신고를 접수하여 메시지브로커의 Kafka를 통해서 이벤트가 발생되었습니다.
    ![IMAGE](../../uengine-image/117.png)
    [이미지 4] BPM 중지 상태

* 메시지 내용
```sh    
{"eventType":"TroubleIssued","timestamp":1719386892341,"id":16,"troubleType":"sw","description":"프로그램이 실행안됩니다."}
{"eventType":"TroubleCompleted","timestamp":1719386909644,"id":16,"description":"프로그램이 실행안됩니다.","reason":"버전을 업데이트 했습니다."}
```    
중지된 BPM의 상태와 상관 없이, App에서는 정상적인 "장애 신고"에 대한 업무를 진행하여, 이벤트가 발생된 것을 볼 수 있습니다.



2. 중지된 BPM 실행을 하고, 이전 메시지를 처리 하는지 확인 해보겠습니다. 
![IMAGE](../../uengine-image/118.png)
[이미지 5] BPM 재실행및 처리

중지된 BPM이 재실행 되면, App에서 메시지브로커를 통해서 발생된 이벤트를 BPM이 이후에 받아서 처리 하는 것을 확인 할 수 있습니다.


## 3. 프로세스 모델링
"프로세스 정의" 에서 프로세스에 대한 정의를 진행합니다. 업무의 흐름을 정의하고 각 업무에 대해서 정의 할 수 있습니다. 

### 3.1 프로세스 변수 설정
- 프로세스에 필요한 변수를 설정 할 수 있습니다.
> 왼쪽 "프로세스 변수" 버튼을 클릭하여, text형식의 "TroubleType"변수를 선언합니다. 
![IMAGE](../../uengine-image/108.png)
[이미지 6] 프로세스 변수 설정


### 3.2 사용자 업무 설정(User task)
- 사용자 업무는 "Default", "Form", "외부 어플리케이션"을 설정 할 수 있습니다. App 연동을 하기 위해서는 "외부 어플리케이션"을 설정 합니다.
> 상단에 tools 중 "Create task"를 클릭하여 task를 생성합니다.("User Task"타입 변경) 
![IMAGE](../../uengine-image/99.png)
[이미지 7] Task 수정


#### 3.2.1 "장애 신고"업무 설정
  사용자가 장애를 신고를 하기 위해서 App에 제공하는 화면 URL과 해당 화면에서 수신할 이벤트타입을 설정을 해야 합니다.
> 화면 URL과 "Event Type"은 수신 받을 타입인 "TroubleIssued"을 설정 합니다.
![IMAGE](../../uengine-image/100.png)
[이미지 8] User Task 외부 App 설정

* 사용자 업무의 "외부 어플리케이션" 설정 정보
    - URL
        - 화면에 대한 정의 하는 부분으로서, "외부 어플리케이션"의 정의된 화면에 접근 URL정보 입니다.
    - Event Type
        - 이벤트 타입을 정의 하는 부분으로서, 이벤트 발생시 어떤한 이벤트를 수신 할 지에 대한 타입의 정의하는 부분 입니다.
    - Event Attributes
        - 메시지의 속성값 정의 하는 부분으로서, 수신된 메시지를 속성값에 맞게 처리 하기 위해서 정의하는 부분입니다.
    - Event Mapping
        - 수신된 메시지에서 "Event Attributes"에 정의된 부분과 다른 정보를 매핑하는 역할으로서, 수신된 메시지에서 정의된 속성값을 추출하여 저장및 처리를 하기 위한 매핑 부분 입니다.

* "외부 어플리케이션"의 Event Mapping 설정
    - 사용자가 보내진 메시지형식에서 해당 이벤트의 속성값을 해당 프로세스 변수에 저장을 하거나, 전달하는 역할로 mapping을 통해서 진행 할 수 있습니다.

    ![IMAGE](../../uengine-image/107.png)
    이미지 9] 메시지의 속성값 "troubleType"을 프로세스 변수인"TroubleType"에 매핑


#### 3.2.2 "장애 처리"업무 설정
- 신고 유형에 따라서 업무를 수신 받은 엔지니어에게 업무를 설정합니다. 또한, URL에 유동적인 화면의 정보를 설정 할 수있습니다.
![IMAGE](../../uengine-image/109.png)
[이미지 10] 업무 완료 설정
```sh
/* 설정된 속성값으로 유동적인 화면 구성을 할 수 있습니다 */
EX) http://localhost:8080/#/TroubleCompleted/<%instance.corrkey%>
```


### 3.3 분기 설정(gateway)
  "장애 신고"한 사용자가 입력한 타입에 따라서 담당자에게 전달하기 위해서, 조건에 따른 분기를 처리하는 역할입니다.
  분기 설정은 TroubleType의 값이 "sw"값과 일치할때 해당 업무로 전달되도록 설정 했습니다.
![IMAGE](../../uengine-image/111.png)
[이미지 11] 조건 분기 설정

## 4. 실행

1. "장애신고 및 처리" 프로세스 실행
- 사용자가 장애신고를 하기 위해서는 "프로세스 정의 체계도"에서 "장애 신고 및처리"프로세스를 선택하여 우측 상단버튼을 통해서 진행 합니다.
![IMAGE](../../uengine-image/103.png)
[이미지 12] 프로세스 정보

2. 사용자가 "장애 신고" 업무에서 장애 신청
- 사용자가 App에서 제공한 화면에서 장애 내용을 입력합니다.
![IMAGE](../../uengine-image/114.png) 
[이미지 13] 실행 화면

3. 업무에 따른 화면 라우팅(엔지니어 업무 접수)
- 사용자의 신고신청을 하게 되면, 신고접수 기준으로 엔지니어의 "할일 목록"에 나타납니다.
![IMAGE](../../uengine-image/112.png) 
[이미지 14] 엔지니어 업무 화면

4. 업무 완료 처리(엔지니어 장애 처리)
- 사용자가 입력한 "장애 신고" 기반으로 장애 처리 내역을 입력합니다.
![IMAGE](../../uengine-image/113.png) 
[이미지 15] 엔지니어 장애 처리


## 5. 정리
  App과 BPM간의 비동기식 메시지브로커를 경유한 Pub/Sub 방식의 비동기식 연동은 상호시스템간에 **결합도를 낮게** 하여, **장애 차단** 할 수 있습니다. 반면, 동기식 방식에서 상호 서비스간에 응답을 기다리기 때문에 BPM에서 장애가 발생하면 App에서도 장애가 전파가 되는 문제가 있습니다.

  그리고 비동기 방식으로 상호 서비스를 연동 할때, App에서 BPM의 호출에 따라서 변경되거나, 상호 시스템에 응답을 기다리는 부분이 없어서 상호 시스템간에 **비의존성**을 가집니다. 

  그에따라서 BPM 시스템이 중지된 상태에서도 App에서 발생한 이벤트를 BPM이 이후에 받아서 처리 할 수 있고, 상태를 **동기화** 할 수 있습니다. 이것은 기존의 동기식방식의 장애전파와 runtime간에 시스템 블로킹의 문제를 해소하는데 탁월한 방법이 됩니다.

  BPM에서는 App과 연동 방식은 위와 같은 이유로 **비동기 방식**의 연동을 적합 합니다.
 
## 참고 영상
[![이벤트기반 연동](http://img.youtube.com/vi/wZ3VW7YF98g/0.jpg)](https://youtu.be/wZ3VW7YF98g)
