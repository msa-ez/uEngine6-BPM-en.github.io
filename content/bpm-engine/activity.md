---
description: ''
sidebar: 'getting-started'
---

# Activity

## 1. Activity

Activity 클래스는 uEngine 프로세스 엔진의 핵심 구성 요소 중 하나입니다. 워크플로우 또는 비즈니스 프로세스 관리 시스템에서 사용되는 다양한 활동(Activities)의 기본 행동, 속성, 콜백 메시지를 정의합니다. 이 클래스는 추상 클래스로서, 실제 활동을 구현하기 위해 상속받아 사용됩니다. Activity 클래스는 프로세스 정의 내에서 다양한 활동을 모델링하는 데 사용되며, 복합 활동(ComplexActivity)과 같은 다른 활동 유형을 포함할 수 있는 자체 포함 관계를 가집니다.

**주요 메서드**

``` java
executeActivity(ProcessInstance instance): 추상 메서드로, 활동의 실제 실행 로직 구현.
fireComplete(ProcessInstance instance): 활동이 완료되었음을 인스턴스에 알림.
fireFault(ProcessInstance instance, FaultContext faultContext): 활동 실행 중 오류가 발생했음을 인스턴스에 알림.
setStatus(ProcessInstance instance, String status): 활동의 상태를 설정.
getStatus(ProcessInstance instance): 활동의 현재 상태를 반환.
onEvent(String command, ProcessInstance instance, Object payload): 다양한 이벤트(완료, 오류 등) 처리.
```

**실행 흐름**

1. 활동 초기화: Activity 인스턴스가 생성[createInstance()]되고, 필요한 속성들이 설정됩니다.
2. 실행 전 처리: beforeExecute 메소드에서 실행 전 필요한 사전 처리를 수행합니다.
3. 활동 실행: executeActivity 메서드를 통해 활동의 실제 로직이 실행됩니다. 이 메서드는 하위 클래스에서 구현되어야 합니다.
4. 이벤트 처리: 활동 실행 중 발생하는 다양한 이벤트(예: 완료, 오류)는 onEvent 메서드를 통해 처리됩니다. 완료 이벤트는 fireComplete 메서드를 호출하여 발생시킬 수 있으며, 오류 이벤트는 fireFault 메서드를 호출하여 발생시킵니다.
5. 상태 관리: 활동의 상태(예: 실행 중, 완료, 오류)는 setStatus 및 getStatus 메서드를 통해 관리됩니다.



## 2. DefaultActivity

DefaultActivity 클래스는 uEngine 프로세스 엔진에서 기본적인 활동(activity)의 실행 로직을 구현합니다. 이 클래스는 Activity 인터페이스 또는 추상 클래스를 상속받아, 프로세스 내에서 수행되어야 하는 특정 작업이나 행동을 정의합니다. DefaultActivity는 가장 기본적인 활동 유형을 나타내며, 복잡한 프로세스 흐름에서 활용될 수 있는 다양한 활동의 기반 클래스 역할을 합니다.

다음은 DefaultActivity 클래스와 관련된 주요 구성 요소와 Activity 인터페이스와의 관계를 클래스 다이어그램 형태로 나타낸 것입니다. 이 다이어그램은 DefaultActivity의 구조와 주요 관계, 그리고 다른 활동과의 연계를 개략적으로 보여줍니다.

![Pasted image 20240314162348](https://github.com/sooheon45/topping-github-action/assets/54785805/39cbc125-8578-412d-a8d3-730fec4df075)

**특징**
.... ....

<!-- **분석 포인트** -->
<!-- 
- 상속 및 구현 관계: DefaultActivity는 Activity 인터페이스를 구현하거나 추상 클래스를 상속받아, execute 메소드를 포함하여 활동이 실행되어야 하는 로직을 구현합니다.
- 핵심 속성:
- name: 활동의 이름을 저장합니다. 이는 프로세스 내에서 활동을 식별하는 데 사용됩니다.
- 핵심 메소드:
- execute(ProcessInstance instance): 이 메소드는 활동이 실행될 때 호출되며, 프로세스 인스턴스를 매개변수로 받아 해당 활동의 실행 로직을 수행합니다.
- 활동 연계:
- DefaultActivity는 다음에 실행될 활동(Activity)을 가리킬 수 있으며, 이를 통해 프로세스의 실행 흐름을 구성합니다.
- ComplexActivity: 복잡한 활동을 나타내며, 여러 개의 Activity를 포함할 수 있습니다. ComplexActivity는 내부적으로 여러 활동을 관리하고 순차적 또는 병렬적으로 실행할 수 있는 로직을 구현합니다. -->

**주요 메소드**

... 내용 추가 필요 ...

<!-- **fireComplete 메소드의 주요 기능**

1. 상태 업데이트: 활동의 상태를 완료(Completed)로 업데이트합니다. 이는 프로세스 인스턴스 내에서 해당 활동이 성공적으로 완료되었음을 나타냅니다.

2. 이벤트 트리거: 활동 완료와 관련된 이벤트를 트리거할 수 있습니다. 이를 통해 다른 활동이나 프로세스의 특정 로직이 실행될 수 있도록 합니다.

3. 다음 활동 실행: 현재 활동의 완료를 기반으로 다음에 실행될 활동을 결정하고 실행합니다. 이는 프로세스의 실행 흐름을 제어하는 중요한 메커니즘입니다.

4. 프로세스 완료 처리: 현재 활동이 프로세스의 마지막 활동일 경우, 프로세스 인스턴스 전체를 완료 처리할 수 있습니다. 이는 프로세스 인스턴스의 생명 주기 관리에 필수적입니다. -->


## 3. HumanActivity

 HumanActivity는 ReceiveActivity 클래스를 확장하여 정의된 클래스입니다. 이 클래스는 워크플로우 또는 비즈니스 프로세스 관리 시스템에서 수동 참여 활동을 모델링하는 데 사용됩니다. HumanActivity 클래스는 사용자 작업, 결정, 입력 등 인간의 참여가 필요한 활동을 나타내며, 이를 통해 프로세스 인스턴스의 실행 중에 특정 작업을 할당하고 관리할 수 있습니다.

**주요 특징 및 기능**
- 속성 및 메서드: HumanActivity 클래스는 다양한 속성(예: role, tool, duration, isSendEmailWorkitem 등)과 메서드(예: getDuration(), setDuration(), getRole(), setRole() 등)를 포함합니다. 이러한 속성과 메서드는 활동의 실행, 역할 관리, 작업 항목의 생성 및 완료 등을 관리하는 데 사용됩니다.
역할 및 작업 항목 관리: 이 클래스는 역할1과 작업 항목2 관리를 위한 메서드를 제공합니다. 예를 들어, getActualMapping() 메서드는 프로세스 인스턴스에 대한 실제 사용자 매핑을 검색하고, addWorkitem() 메서드는 새 작업 항목을 추가합니다.

- 이벤트 및 상태 관리: onComplete(), onReceive(), suspend(), compensate() 등의 메서드를 통해 활동의 상태를 관리하고, 프로세스 인스턴스의 상태 변경 시 이벤트를 처리합니다.

- 확장성: HumanActivity 클래스는 다양한 확장 포인트를 제공하여, 비즈니스 로직에 따라 사용자 정의 동작을 구현할 수 있습니다. 예를 들어, afterExecute() 메서드는 활동 실행 후 추가 작업을 수행하는 데 사용될 수 있습니다.

- 스냅샷 및 상세 정보: saveSnapshotHTML() 메서드와 getActivityDetails() 메서드는 활동의 스냅샷을 저장하고, 활동에 대한 상세 정보를 제공하는 데 사용됩니다.


## 4. FlowActivity

FlowActivity 클래스는 uEngine BPM 시스템 내에서 복잡한 프로세스 흐름을 관리하는 데 사용되는 핵심 클래스 중 하나입니다. 이 클래스는 ComplexActivity를 상속받아, 여러 개의 Activity 인스턴스들을 순차적이거나 병렬적으로 실행할 수 있는 흐름을 정의합니다. FlowActivity는 BPMN의 시퀀스 플로우(Sequence Flow) 개념을 구현하여, 프로세스 내에서 활동 간의 흐름을 제어합니다.

**주요 특징 및 기능**

- 시퀀스 플로우 관리: FlowActivity는 내부적으로 ArrayList를 사용하여 시퀀스 플로우를 관리합니다. 시퀀스 플로우는 활동 간의 흐름을 정의하며, 각 플로우는 시작 활동과 종료 활동을 연결합니다.
- 활동 실행 순서 제어: FlowActivity는 포함된 활동들의 실행 순서를 제어합니다. 이는 시퀀스 플로우에 정의된 순서에 따라 진행되며, 병렬 실행이 필요한 경우에도 이를 지원합니다.
- 동적 활동 추가 및 제거: 프로세스 정의 시점 뿐만 아니라 실행 시간에도 활동을 동적으로 추가하거나 제거할 수 있습니다. 이를 통해 유연한 프로세스 실행이 가능합니다.
- 이벤트 처리: FlowActivity는 내부적으로 다양한 이벤트를 처리할 수 있습니다. 예를 들어, 활동 실행 전후에 특정 로직을 수행하거나, 특정 조건에서 추가적인 활동을 실행할 수 있습니다.

**코드 분석**

```java
public class FlowActivity extends ComplexActivity {
    ArrayList<SequenceFlow> sequenceFlows;

    public ArrayList<SequenceFlow> getSequenceFlows() {
        if (this.sequenceFlows == null) {
            this.setSequenceFlows(new ArrayList<SequenceFlow>());
        }
        return sequenceFlows;
    }

    public void setSequenceFlows(ArrayList<SequenceFlow> sequenceFlows) {
        this.sequenceFlows = sequenceFlows;
    }

    public void addSequenceFlow(SequenceFlow transition) {
        this.getSequenceFlows().add(transition);
    }

    @Override
    public void afterDeserialization() {
        super.afterDeserialization();
        // 시퀀스 플로우 및 활동 관계 재구성 로직
    }
}
```

- sequenceFlows: FlowActivity가 관리하는 시퀀스 플로우 목록입니다. 각 SequenceFlow 객체는 흐름의 시작점과 끝점을 나타내는 활동을 연결합니다.
- getSequenceFlows(): 시퀀스 플로우 목록을 반환합니다. 목록이 초기화되지 않은 경우 새로운 ArrayList를 생성하여 반환합니다.
- setSequenceFlows(ArrayList sequenceFlows): 시퀀스 플로우 목록을 설정합니다. 이 메소드를 통해 FlowActivity의 흐름을 정의할 수 있습니다.
- addSequenceFlow(SequenceFlow transition): 새로운 시퀀스 플로우를 추가합니다. 이를 통해 동적으로 활동 간의 흐름을 추가할 수 있습니다.
- afterDeserialization(): 객체 직렬화 후에 호출되는 메소드로, 시퀀스 플로우 및 활동 간의 관계를 재구성하는 메소드입니다. 이 메소드는 직렬화 과정에서 분리되었던 활동들과 시퀀스 플로우들 사이의 연결을 복원하는 데 사용됩니다. 이는 프로세스 정의가 파일이나 데이터베이스에서 로드된 후, 모든 활동과 흐름이 올바르게 연결되어 있어야 함을 보장합니다.

**활용 사례**

FlowActivity는 복잡한 프로세스 흐름을 구현할 때 유용합니다. 예를 들어, 결재 프로세스에서 여러 단계의 승인을 거쳐야 하는 경우, 각 승인 단계를 Activity로 정의하고, 이들 사이의 순서와 조건을 SequenceFlow를 통해 정의할 수 있습니다. 또한, 특정 조건에서만 실행되어야 하는 활동이 있는 경우, 해당 조건을 평가하는 로직을 포함하는 시퀀스 플로우를 추가하여 조건부 실행을 구현할 수 있습니다.

**excuteActivity 코드 분석**

1. 이벤트 리스너 등록

먼저, FlowActivity가 포함하고 있는 모든 자식 활동1들을 순회하면서, 이벤트를 수신할 수 있는 활동(즉, Event이면서 MessageListener 인터페이스를 구현한 활동)을 찾습니다. 이러한 활동들에 대해, 프로세스 정의를 통해 메시지 리스너를 등록합니다. 이는 프로세스 실행 중에 특정 이벤트가 발생했을 때 해당 활동이 이벤트를 처리할 수 있도록 합니다.

2. 시작 활동 실행

getStartActivities 메소드를 호출하여 시작할 수 있는 활동들의 목록을 가져옵니다. 시작 활동은 일반적으로 입력 시퀀스 플로우가 없는 활동으로 정의됩니다. 이 목록에는 이벤트 기반 활동과 일반 활동이 모두 포함될 수 있습니다.

- 이벤트 활동 우선 실행: 먼저, 이벤트 기반 활동2들을 실행합니다. 이는 프로세스의 시작점에서 발생할 수 있는 이벤트를 처리하기 위함입니다.
- 일반 활동 실행: 이후, 이벤트가 아닌 나머지 시작 활동들을 실행합니다. 이 단계에서는 일반적인 비즈니스 로직이나 작업이 수행됩니다.
    
    3. 완료 처리
    

시작할 활동이 없는 경우, 즉 startActivities 목록이 비어 있거나 null인 경우, FlowActivity의 실행을 즉시 완료합니다(fireComplete 호출). 이는 프로세스에 더 이상 실행할 활동이 없음을 의미합니다.

**핵심 포인트**

- 이 메소드는 프로세스 실행 시 이벤트 리스너를 등록하고, 시작 가능한 활동들을 실행하는 데 중점을 둡니다.
- 이벤트 기반 활동은 프로세스의 다른 활동들보다 우선적으로 실행되어, 프로세스 시작 시 발생할 수 있는 이벤트를 처리할 수 있습니다.
- 시작 활동이 없는 경우, FlowActivity는 추가적인 작업 없이 실행을 완료합니다.

이 구현을 통해 FlowActivity는 프로세스의 실행 흐름을 유연하게 관리하며, 이벤트 처리와 활동 실행 순서를 효과적으로 제어할 수 있습니다.

**결론**

FlowActivity는 uEngine BPM 시스템에서 프로세스의 복잡한 흐름을 관리하는 데 필수적인 클래스입니다. 이를 통해 개발자는 프로세스의 다양한 활동들 사이의 순서와 조건을 유연하게 정의할 수 있으며, 병렬 실행과 같은 고급 흐름 제어 기능도 구현할 수 있습니다. FlowActivity의 활용은 프로세스 모델링의 복잡성을 줄이고, 실행 시간에 프로세스를 동적으로 조정할 수 있는 능력을 제공합니다.


## 5. Gateway

Gateway별 완료 조건
Gateway 클래스를 상속받는 모든 클래스에서 fireComplete 메소드의 호출 조건은 해당 게이트웨이의 유형과 프로세스의 실행 흐름에 따라 달라집니다. Gateway는 BPMN에서 정의된 여러 유형의 게이트웨이를 구현하기 위한 기본 클래스로, 프로세스의 실행 흐름을 제어하는 역할을 합니다. 여기에는 병렬(Parallel), 독점적(Exclusive), 포괄적(Inclusive), 그리고 복합(Complex) 게이트웨이 등이 포함됩니다.

각 게이트웨이 유형별 fireComplete 호출 조건은 다음과 같습니다:

### 5-1. ParallelGateway (병렬)

- 분기: 모든 분기 경로를 동시에 활성화합니다. fireComplete는 분기 조건 없이 호출됩니다.
- 병합: 모든 병렬 경로가 완료될 때까지 기다린 후 fireComplete를 호출합니다. 즉, 병렬로 실행된 모든 경로의 완료가 fireComplete의 호출 조건입니다.

### 5-2.ExclusiveGateway (독점적)

- 분기: 조건 평가를 통해 단 하나의 경로만을 선택하여 활성화합니다. 선택된 경로의 활동이 완료되면 fireComplete를 호출합니다.
- 병합: 특별한 병합 로직 없이, 도착한 첫 번째 토큰에 대해 fireComplete를 호출합니다.

### 5-3. InclusiveGateway (포괄적)

- 분기: 조건 평가를 통해 하나 이상의 경로를 선택하여 활성화합니다. 선택된 모든 경로의 활동이 완료되면 fireComplete를 호출합니다.
- 병합: 병렬 게이트웨이와 유사하게, 모든 활성화된 경로가 완료될 때까지 기다린 후 fireComplete를 호출합니다.

### 5-4. ComplexGateway (복합)

- 복합 게이트웨이는 더 복잡한 조건과 동기화를 처리할 수 있으며, fireComplete의 호출 조건은 구현에 따라 크게 달라질 수 있습니다. 일반적으로, 사용자 정의 로직에 따라 특정 조건을 만족할 때 fireComplete를 호출합니다.

**결론**

Gateway를 상속받는 각 클래스는 프로세스의 실행 흐름을 제어하는 특정 로직을 구현합니다. fireComplete 메소드의 호출 조건은 게이트웨이의 유형과 해당 게이트웨이가 프로세스 내에서 수행하는 역할에 따라 결정됩니다. 이러한 조건들은 프로세스의 정확한 실행 흐름을 보장하고, 프로세스 모델링의 다양한 요구 사항을 충족시키기 위해 중요합니다.

