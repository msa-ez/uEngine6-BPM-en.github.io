---
description: ''
sidebar: 'api-customizing'
prev: ''
next: ''
---

# uEngine6 API Reference

- **[uEngine6 의 모든 API 들은 REST MM 3 인 Hateoas(HAL) 수준을 준수한다](https://en.wikipedia.org/wiki/HATEOAS)**

## Definition 관리

### `/definition`
- **Method**: GET
- **Description**: 저장 된 Definition 목록을 확인 할 수 있다.
- **Produces**: application/json;charset=UTF-8
- **호출**

```sh
http GET http://localhost:8088/definition
```
- **결과**
```json
{
    "_embedded": {
        "definitions": [
            {
                "_links": {
                    "instantiation": {
                        "href": "http://localhost:9093/instance"
                    },
                    "raw": {
                        "href": "http://localhost:9093/definition/raw/definitions/qwer.json"
                    },
                    "self": {
                        "href": "http://localhost:9093/definition/definitions/qwer.bpmn"
                    }
                },
                "directory": false,
                "name": "qwer.bpmn",
                "path": "qwer.bpmn",
                "version": null
            },
            ...
        ]
    }
}
```

### `/versions/**`
- **Method**: GET
- **Description**: Definition의 버전 목록.
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET http://localhost:8088/versions/test/test.bpmn
```
- **결과**
```json
{
    "_embedded": {
        "definitions": [
            {
                "_links": {
                    "instantiation": {
                        "href": "http://localhost:9093/instance"
                    },
                    "raw": {
                        "href": "http://localhost:9093/definition/raw/archive/test/test.bpmn/1.0.json"
                    },
                    "self": {
                        "href": "http://localhost:9093/definition/archive/test/test.bpmn/1.0.bpmn"
                    }
                },
                "directory": false,
                "name": "1.0.bpmn",
                "path": "archive/test/test.bpmn/1.0.bpmn",
                "version": "1.0"
            },
            ...
        ]
    }
}
```

### `/definition/**`
- **Method**: PUT
- **Description**: 폴더 이름 변경 및 이동
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http PUT :9093/definition/new%20folder name="new folder2" path="new folder2"
```
- **결과**
```json
{
    "_links": {
        "self": {
            "href": "http://localhost:9093/definition/definitions/new%20folder2"
        }
    },
    "directory": true,
    "name": "new folder2",
    "path": "definitions/new folder2",
    "version": null
}
```

- **Method**: POST
- **Description**: 폴더 생성.
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http POST localhost:9093/definition name="new folder" directory=true
```
- **결과**
```json
{
    "_links": {
        "self": {
            "href": "http://localhost:9093/definition/definitions/new%20folder"
        }
    },
    "directory": true,
    "name": "new folder",
    "path": "definitions/new folder",
    "version": null
}
```
- **Method**: DELETE
- **Description**: definition 삭제
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http DELETE localhost:9093/definition/new%20folder
```

### `/definition/raw/**`
- **Method**: POST, PUT
- **Description**: Definition 정의 저장 및 수정
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
# @이후에는 bpmn 파일 경로
http POST :9093/definition/raw/test.bpmn definition=@test-origin.bpmn
http PUT :9093/definition/raw/test.bpmn definition=@test-origin.bpmn
```

- **결과**
```json
{
    "_links": {
        "instantiation": {
            "href": "http://localhost:9093/instance"
        },
        "raw": {
            "href": "http://localhost:9093/definition/raw/definitions/test.json"
        },
        "self": {
            "href": "http://localhost:9093/definition/definitions/test.bpmn"
        }
    },
    "directory": false,
    "name": "test.bpmn",
    "path": "definitions/test.bpmn",
    "version": null
}
```
- **Method**: GET
- **Description**: Definition 정의 수신.
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET :9093/definition/raw/test.bpmn 
```

- **결과**
```xml
<?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:uengine="http://uengine" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0bfky9r" name="test-woori" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="16.4.0">
  <bpmn:collaboration id="Collaboration_1uis03l">
    <bpmn:participant id="Participant_1fh7nmt" processRef="Process_1oscmbn">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{}</uengine:json><?xml version="1.0" encoding="UTF-8"?>
<bpmn:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:uengine="http://uengine" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" id="Definitions_0bfky9r" name="test-woori" targetNamespace="http://bpmn.io/schema/bpmn" exporter="bpmn-js (https://demo.bpmn.io)" exporterVersion="16.4.0">
  <bpmn:collaboration id="Collaboration_1uis03l">
    <bpmn:participant id="Participant_1fh7nmt" processRef="Process_1oscmbn">
      <bpmn:extensionElements>
        <uengine:properties>
          <uengine:json>{}</uengine:json>
          <!-- 이하 생략 -->
```
### `/definition/system/**`
- **Method**: POST, PUT
- **Description**: 외부 시스템 등록.
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http PUT localhost:9093/definition/system/test name="test" description="test" spec="test" url="test"
http POST localhost:9093/definition/system/test name="test" description="test" spec="test" url="test"
```

- **결과**
```json
{
    "_links": {
        "instantiation": {
            "href": "http://localhost:9093/instance"
        },
        "raw": {
            "href": "http://localhost:9093/definition/raw/definitions/system/test.json"
        },
        "self": {
            "href": "http://localhost:9093/definition/definitions/system/test.json"
        }
    },
    "directory": false,
    "name": "test.json",
    "path": "definitions/system/test.json",
    "version": null
}
```

### `/definition/system`
- **Method**: GET
- **Description**: 외부 시스템 목록 수신.
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET localhost:9093/definition/system
```
- **결과**
```json
{
    "_embedded": {
        "definitions": [
            {
                "_links": {
                    "instantiation": {
                        "href": "http://localhost:9093/instance"
                    },
                    "raw": {
                        "href": "http://localhost:9093/definition/raw/definitions/system/restaurant.json"
                    },
                    "self": {
                        "href": "http://localhost:9093/definition/definitions/system/restaurant.json"
                    }
                },
                "directory": false,
                "name": "restaurant.json",
                "path": "definitions/system/restaurant.json",
                "version": null
            },
            {
                "_links": {
                    "instantiation": {
                        "href": "http://localhost:9093/instance"
                    },
                    "raw": {
                        "href": "http://localhost:9093/definition/raw/definitions/system/history.json"
                    },
                    "self": {
                        "href": "http://localhost:9093/definition/definitions/system/history.json"
                    }
                },
                "directory": false,
                "name": "history.json",
                "path": "definitions/system/history.json",
                "version": null
            },
            ...
        ]
    }
}
```

### `/definition/map`
- **Method**: POST, PUT
- **Description**: Process Definition Map 등록 및 수정.
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http POST http://localhost:9093/definition/map mega_proc_list:='[
    {
        "id": "test",
        "label": "test",
        "major_proc_list": [
            {
                "id": "main",
                "label": "main",
                "sub_proc_list": [
                    {
                        "id": "Sales"
                    }
                ]
            }
        ]
    }
]'
```
- **결과**
```json
{
    "_links": {
        "instantiation": {
            "href": "http://localhost:9093/instance"
        },
        "raw": {
            "href": "http://localhost:9093/definition/raw/definitions/map.json"
        },
        "self": {
            "href": "http://localhost:9093/definition/definitions/map.json"
        }
    },
    "directory": false,
    "name": "map.json",
    "path": "definitions/map.json",
    "version": null
}
```

- **Method**: GET
- **Description**: Proecss Definition Map 수신
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET localhost:9093/definition/map
```
- **결과**
```json
{
    "mega_proc_list": [
        {
            "id": "test",
            "label": "test",
            "major_proc_list": [
                {
                    "id": "main",
                    "label": "main",
                    "sub_proc_list": [
                        {
                            "id": "Sales"
                        }
                    ]
                }
            ]
        }
    ]
}
```

### `/definition/release/{releaseVersion}`
- **Method**: GET
- **Description**: 버전 릴리즈 및 해당 버전 다운로드 - 브라우저에서 동작 가능
- **Produces**: application/json;charset=UTF-8
- **실행** 
```sh
http GET localhost:9093/definition/release/v1.0
```
- **결과**
```json
HTTP/1.1 200
Connection: keep-alive
Content-Disposition: attachment; filename=v1.0.zip
Content-Length: 117621
Content-Type: application/octet-stream
Date: Mon, 09 Sep 2024 06:40:46 GMT
Keep-Alive: timeout=60



+-----------------------------------------+
| NOTE: binary data not shown in terminal |
+-----------------------------------------+
```
### `/definition/upload`
- **Method**: POST
- **Description**: 릴리즈 된 버전 파일 업로드
- **Consumes**: multipart/form-data
- **Produces**: application/json;charset=UTF-8

## Instance 관리

### `/instance`
- **Method**: POST, PUT
- **Description**: 인스턴스 실행.
- **Consumes**: application/json;charset=UTF-8
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http POST :9094/instance 'processDefinitionId=test/troubleTicket' 'roleMappings[0][name]=initiator' 'roleMappings[0][endpoints][0]=manager' 'roleMappings[0][resourceNames][0]=Initiator'
```

- **결과**
```json
{
    "_links": {
        "definition": {
            "href": "http://localhost:9094/definition/test/troubleTicket"
        },
        "rawDefinition": {
            "href": "http://localhost:9094/definition/raw/test/troubleTicket"
        },
        "role-mapping": {
            "href": "http://localhost:9094/instance/22/role-mapping/{roleName}",
            "templated": true
        },
        "self": {
            "href": "http://localhost:9094/instance/22"
        },
        "stop": {
            "href": "http://localhost:9094/instance/22/stop"
        },
        "suspend": {
            "href": "http://localhost:9094/instance/22/stop"
        },
        "variables": {
            "href": "http://localhost:9094/instance/22/variables"
        }
    },
    "corrkey": null,
    "defVer": null,
    "instanceId": "22",
    "name": "Nonamenull",
    "status": "Running"
}
```
### `/instance/{instanceId}`
- **Method**: GET
- **Description**: 인스턴스 정보 수신
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET :9094/instance/22
```

- **결과**
```json
{
    "_links": {
        "definition": {
            "href": "http://localhost:9094/definition/test/troubleTicket"
        },
        "rawDefinition": {
            "href": "http://localhost:9094/definition/raw/test/troubleTicket"
        },
        "role-mapping": {
            "href": "http://localhost:9094/instance/22/role-mapping/{roleName}",
            "templated": true
        },
        "self": {
            "href": "http://localhost:9094/instance/22"
        },
        "stop": {
            "href": "http://localhost:9094/instance/22/stop"
        },
        "suspend": {
            "href": "http://localhost:9094/instance/22/stop"
        },
        "variables": {
            "href": "http://localhost:9094/instance/22/variables"
        }
    },
    "corrkey": null,
    "defVer": null,
    "instanceId": "22",
    "name": "Nonamenull",
    "status": "Running"
}
```

### `/instance/{instanceId}/eventList`
- **Method**: GET
- **Description**: 인스턴스에 사용 가능 한 이벤트 목록
- **호출**
```sh
http GET :9094/instance/22/eventList
```

- **결과**
```json
[
    {
        "name": "",
        "tracingTag": "Event_045vefp"
    }
]
```

### `/instance/{instanceId}/activity/{tracingTag}/backToHere`
- **Method**: POST
- **Description**: 해당 액티비티로 RollBack
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http POST :9094/instance/22/activity/Activity_0tpln90/backToHerehttp POST :9094/instance/22/activity/Activity_0tpln90/backToHere
```
- **결과**
```json
{
    "_links": {
        "definition": {
            "href": "http://localhost:9094/definition/test/troubleTicket"
        },
        "rawDefinition": {
            "href": "http://localhost:9094/definition/raw/test/troubleTicket"
        },
        "role-mapping": {
            "href": "http://localhost:9094/instance/22/role-mapping/{roleName}",
            "templated": true
        },
        "self": {
            "href": "http://localhost:9094/instance/22"
        },
        "stop": {
            "href": "http://localhost:9094/instance/22/stop"
        },
        "suspend": {
            "href": "http://localhost:9094/instance/22/stop"
        },
        "variables": {
            "href": "http://localhost:9094/instance/22/variables"
        }
    },
    "corrkey": null,
    "defVer": null,
    "instanceId": "22",
    "name": "Nonamenull",
    "status": "Running"
}{
    "_links": {
        "definition": {
            "href": "http://localhost:9094/definition/test/troubleTicket"
        },
        "rawDefinition": {
            "href": "http://localhost:9094/definition/raw/test/troubleTicket"
        },
        "role-mapping": {
            "href": "http://localhost:9094/instance/22/role-mapping/{roleName}",
            "templated": true
        },
        "self": {
            "href": "http://localhost:9094/instance/22"
        },
        "stop": {
            "href": "http://localhost:9094/instance/22/stop"
        },
        "suspend": {
            "href": "http://localhost:9094/instance/22/stop"
        },
        "variables": {
            "href": "http://localhost:9094/instance/22/variables"
        }
    },
    "corrkey": null,
    "defVer": null,
    "instanceId": "22",
    "name": "Nonamenull",
    "status": "Running"
}
```


### `/instance/{instanceId}/variables`
- **Method**: GET
- **Description**: 인스턴스 변수 목록
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET :9094/instance/22/variables
```
- **결과**
```json
{
    ":MESSAGE_event:prop": "Event_045vefp",
    ":MESSAGE_onHumanActivityResultActivity_0bk0z80:prop": "Activity_0bk0z80",
    ":MESSAGE_onHumanActivityResultActivity_0tpln90:prop": "",
    ":_due date:prop": 1727593203856,
    ":_roleMapping_of_initiator": {
        "assignParam1": null,
        "assignType": 0,
        "birthday": null,
        "companyId": null,
        "cursor": 1,
        "dispatchParam1": null,
        "dispatchingOption": -1,
        "dispatchingParameters": null,
        "emailAddress": null,
        "endpoint": null,
        "extendedProperties": null,
        "group": false,
        "groupId": null,
        "groupName": null,
        "instanceMessengerId": null,
        "isReferencer": null,
        "locale": null,
        "male": true,
        "name": "initiator",
        "nickName": null,
        "resourceName": null,
        "title": null,
        "userFirstName": null,
        "userLastName": null,
        "userMidddleName": null,
        "userPortrait": null
    },
    ":_roleMapping_of_manager": {
        "assignParam1": null,
        "assignType": 0,
        "birthday": null,
        "companyId": null,
        "cursor": 0,
        "dispatchParam1": null,
        "dispatchingOption": 0,
        "dispatchingParameters": null,
        "emailAddress": null,
        "endpoint": "manager",
        "extendedProperties": null,
        "group": false,
        "groupId": null,
        "groupName": null,
        "instanceMessengerId": null,
        "isReferencer": null,
        "locale": null,
        "male": true,
        "name": null,
        "nickName": null,
        "resourceName": "manager",
        "title": null,
        "userFirstName": null,
        "userLastName": null,
        "userMidddleName": null,
        "userPortrait": null
    },
    ":_roleMapping_of_worker": {
        "assignParam1": null,
        "assignType": 0,
        "birthday": null,
        "companyId": null,
        "cursor": 0,
        "dispatchParam1": null,
        "dispatchingOption": 0,
        "dispatchingParameters": null,
        "emailAddress": null,
        "endpoint": "manager",
        "extendedProperties": null,
        "group": false,
        "groupId": null,
        "groupName": null,
        "instanceMessengerId": null,
        "isReferencer": null,
        "locale": null,
        "male": true,
        "name": null,
        "nickName": null,
        "resourceName": "manager",
        "title": null,
        "userFirstName": null,
        "userLastName": null,
        "userMidddleName": null,
        "userPortrait": null
    },
    ":_start_time:prop": 1726729203856,
    ":_status:prop": "Running",
    ":test-one": "aaa",
    "Activity_0bk0z80:_due date:prop": 1727161722796,
    "Activity_0bk0z80:_loopBackCnt:prop": 1,
    "Activity_0bk0z80:_previous:prop": "Activity_0tpln90",
    "Activity_0bk0z80:_start_time:prop": 1726729722796,
    "Activity_0bk0z80:_status:prop": "Running",
    "Activity_0bk0z80:_task id:prop": "24",
    "Activity_0bk0z80:tokenCount:prop": 1,
    "Activity_0tpln90:_completed rolemapping:prop": {
        "assignParam1": null,
        "assignType": 0,
        "birthday": null,
        "companyId": null,
        "cursor": 0,
        "dispatchParam1": null,
        "dispatchingOption": 0,
        "dispatchingParameters": null,
        "emailAddress": null,
        "endpoint": "manager",
        "extendedProperties": null,
        "group": false,
        "groupId": null,
        "groupName": null,
        "instanceMessengerId": null,
        "isReferencer": null,
        "locale": null,
        "male": true,
        "name": null,
        "nickName": null,
        "resourceName": "manager",
        "title": null,
        "userFirstName": null,
        "userLastName": null,
        "userMidddleName": null,
        "userPortrait": null
    },
    "Activity_0tpln90:_due date:prop": 1727161203865,
    "Activity_0tpln90:_end_time:prop": 1726729722795,
    "Activity_0tpln90:_loopBackCnt:prop": 1,
    "Activity_0tpln90:_start_time:prop": 1726729203864,
    "Activity_0tpln90:_status:prop": "Completed",
    "Activity_0tpln90:_task id:prop": "23",
    "Activity_0tpln90:tokenCount:prop": 0,
    "Event_045vefp:_end_time:prop": 1726729203862,
    "Event_045vefp:_start_time:prop": 1726729203862,
    "Event_045vefp:_status:prop": "Completed",
    "Event_045vefp:tokenCount:prop": 0,
    "Gateway_0p98188:_end_time:prop": 1726729722795,
    "Gateway_0p98188:_loopBackCnt:prop": 1,
    "Gateway_0p98188:_start_time:prop": 1726729722795,
    "Gateway_0p98188:_status:prop": "Completed",
    "Gateway_0p98188:tokenCount:prop": 0,
    "Gateway_1nd3ft6:_end_time:prop": 1726729722796,
    "Gateway_1nd3ft6:_loopBackCnt:prop": 1,
    "Gateway_1nd3ft6:_start_time:prop": 1726729722796,
    "Gateway_1nd3ft6:_status:prop": "Completed",
    "Gateway_1nd3ft6:tokenCount:prop": 0
}
```
### `/instance/{instanceId}/status`
- **Method**: GET
- **Description**: 각 Task 별 진행 상태
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET :9094/instance/22/status
```
- **결과**
```json
{
    "Activity_0bk0z80": "Ready",
    "Activity_0tpln90": "Running"
}
```
### `/instance/{instanceId}/running`
- **Method**: GET
- **Description**: 실행 중인 Task 목록
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET :9094/instance/22/running
```
- **결과**
```json
[
    {
        "absTrcTag": null,
        "actType": null,
        "defId": "test-woori",
        "defName": "test-woori",
        "defVerId": "2.0",
        "delegated": null,
        "description": null,
        "dispatchOption": 0,
        "dispatchParam1": null,
        "dueDate": 1727103600000,
        "endDate": null,
        "endpoint": "manager",
        "execScope": null,
        "ext1": null,
        "ext2": null,
        "ext3": null,
        "ext4": null,
        "ext5": null,
        "instId": 22,
        "parameter": null,
        "payload": null,
        "prevUserName": null,
        "priority": 1,
        "processInstance": null,
        "readDate": null,
        "refRoleName": "null",
        "resName": "manager",
        "roleName": "worker",
        "rootInstId": 22,
        "saveDate": null,
        "startDate": 1726671600000,
        "status": "NEW",
        "taskId": 24,
        "title": "setTwo",
        "tool": "defaultHandler",
        "trcTag": "Activity_0bk0z80",
        "urget": null
    }
]
```
### `/instance/{instanceId}/completed`
- **Method**: GET
- **Description**: 완료 된 Task 목록
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http GET :9094/instance/22/completed
```
- **결과**
```json
[
    {
        "absTrcTag": null,
        "actType": null,
        "defId": "test-woori",
        "defName": "test-woori",
        "defVerId": "2.0",
        "delegated": null,
        "description": null,
        "dispatchOption": 0,
        "dispatchParam1": null,
        "dueDate": 1727103600000,
        "endDate": 1726671600000,
        "endpoint": "manager",
        "execScope": null,
        "ext1": null,
        "ext2": null,
        "ext3": null,
        "ext4": null,
        "ext5": null,
        "instId": 22,
        "parameter": null,
        "payload": {
            "testone": "aaa"
        },
        "prevUserName": null,
        "priority": 1,
        "processInstance": null,
        "readDate": null,
        "refRoleName": "null",
        "resName": "manager",
        "roleName": "manager",
        "rootInstId": 22,
        "saveDate": null,
        "startDate": 1726671600000,
        "status": "COMPLETED",
        "taskId": 23,
        "title": "setOne",
        "tool": "defaultHandler",
        "trcTag": "Activity_0tpln90",
        "urget": null
    }
]
```
### `/instance/{instId}/variable/{varName}`
- **Method**: GET
- **Description**: 인스턴스의 프로세스 변수
- **호출**
```sh
http GET :9094/instance/22/variable/test-one
```
- **결과**
```json
aaa
```

### `/instance/{instId}/task/{taskId}/variable/{varName}`
- **Method**: GET
- **Description**: task에서 사용 된 변수 정보.
- **호출**
```sh
http GET :9094/instance/22/task/25/variable/test-one
```
- **결과**
```json
aaa
```

### `/instance/{instId}/role-mapping/{roleName}`
- **Method**: GET
- **Description**: Instance RoleMapping 정보.
- **호출**
```sh
http GET :9094/instance/22/role-mapping/manager
```
- **결과**
```json
{
    "assignParam1": null,
    "assignType": 0,
    "birthday": null,
    "companyId": null,
    "cursor": 0,
    "dispatchParam1": null,
    "dispatchingOption": 0,
    "dispatchingParameters": null,
    "emailAddress": null,
    "endpoint": "manager",
    "extendedProperties": null,
    "group": false,
    "groupId": null,
    "groupName": null,
    "instanceMessengerId": null,
    "isReferencer": null,
    "locale": null,
    "male": true,
    "name": null,
    "nickName": null,
    "resourceName": "manager",
    "title": null,
    "userFirstName": null,
    "userLastName": null,
    "userMidddleName": null,
    "userPortrait": null
}
```

### `/instance/{instanceId}/fire-message`
- **Method**: POST
- **Description**: instane에 메시지 발행.
- **호출**
```sh
http POST :9094/instance/22/fire-message message="message"
```
- **결과**
```json
```

### `/instance/shutdown`
- **Method**: POST
- **Description**: Process-service 종료 API
- **호출**
```sh
http GET :9094/instance/22/eventList
```

### `/dry-run/**`
- **Method**: GET
- **Description**: 드라이 런으로 인스턴스 실행.
- **Produces**: application/json;charset=UTF-8
- **호출**
```sh
http :9094/dry-run/test-woori
```
- **결과**
```json
{
    "activity": {
        "activityIcon": null,
        "allowAnonymous": true,
        "breakpoint": false,
        "checkPoint": null,
        "checked": false,
        "co2Emission": 0,
        "cost": 0,
        "description": "",
        "document": null,
        "duration": 5,
        "dynamicChangeAllowed": true,
        "elementView": null,
        "eventSynchronization": {
            "attributes": [
                {
                    "className": "String",
                    "isCorrKey": false,
                    "isKey": false,
                    "name": "testone"
                }
            ],
...
// 중략
```
