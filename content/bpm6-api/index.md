---
description: ''
sidebar: 'getting-started'
---

# API Reference

- **[All APIs of uEngine6 comply with the REST MM 3 Hateoas(HAL) level](https://en.wikipedia.org/wiki/HATEOAS)**

## Definition Management

### `/definition`
- **Method**: GET
- **Description**: You can check the list of saved Definitions.
- **Produces**: application/json;charset=UTF-8
- **Call**

```sh
http GET http://localhost:8088/definition
```
- **Result**
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
- **Description**: Version list of Definitio.
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET http://localhost:8088/versions/test/test.bpmn
```
- **Result**
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
- **Description**: Folder rename and move
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http PUT :9093/definition/new%20folder name="new folder2" path="new folder2"
```
- **Result**
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
- **Description**: Folder creation.
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http POST localhost:9093/definition name="new folder" directory=true
```
- **Result**
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
- **Description**: definition deletion
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http DELETE localhost:9093/definition/new%20folder
```

### `/definition/raw/**`
- **Method**: POST, PUT
- **Description**: Save and modify Definition definition
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
# @After that is the bpmn file path
http POST :9093/definition/raw/test.bpmn definition=@test-origin.bpmn
http PUT :9093/definition/raw/test.bpmn definition=@test-origin.bpmn
```

- **Result**
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
- **Description**: Receive Definition definition.
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET :9093/definition/raw/test.bpmn 
```

- **Result**
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
          <!-- Omitted below -->
```
### `/definition/system/**`
- **Method**: POST, PUT
- **Description**: External system registration.
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http PUT localhost:9093/definition/system/test name="test" description="test" spec="test" url="test"
http POST localhost:9093/definition/system/test name="test" description="test" spec="test" url="test"
```

- **Result**
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
- **Description**: Receive external system list.
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET localhost:9093/definition/system
```
- **Result**
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
- **Description**: Process Definition Map registration and modification.
- **Produces**: application/json;charset=UTF-8
- **Call**
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
- **Result**
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
- **Description**: Receive Process Definition Map
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET localhost:9093/definition/map
```
- **Result**
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
- **Description**: Version release and download the version - Can work in browser
- **Produces**: application/json;charset=UTF-8
- **실행** 
```sh
http GET localhost:9093/definition/release/v1.0
```
- **Result**
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
- **Description**:  Upload released version file
- **Consumes**: multipart/form-data
- **Produces**: application/json;charset=UTF-8

## Instance 관리

### `/instance`
- **Method**: POST, PUT
- **Description**: Instance execution.
- **Consumes**: application/json;charset=UTF-8
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http POST :9094/instance 'processDefinitionId=test/troubleTicket' 'roleMappings[0][name]=initiator' 'roleMappings[0][endpoints][0]=manager' 'roleMappings[0][resourceNames][0]=Initiator'
```

- **Result**
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
- **Description**: Receive instance information
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET :9094/instance/22
```

- **Result**
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
- **Description**: List of events available to the instance
- **Call**
```sh
http GET :9094/instance/22/eventList
```

- **Result**
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
- **Description**: RollBack to the activity
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http POST :9094/instance/22/activity/Activity_0tpln90/backToHerehttp POST :9094/instance/22/activity/Activity_0tpln90/backToHere
```
- **Result**
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
- **Description**: Instance variable list
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET :9094/instance/22/variables
```
- **Result**
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
- **Description**: Progress status by Task
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET :9094/instance/22/status
```
- **Result**
```json
{
    "Activity_0bk0z80": "Ready",
    "Activity_0tpln90": "Running"
}
```
### `/instance/{instanceId}/running`
- **Method**: GET
- **Description**: List of running Tasks
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET :9094/instance/22/running
```
- **Result**
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
- **Description**: List of completed Tasks
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http GET :9094/instance/22/completed
```
- **Result**
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
- **Description**: Process variable of the instance
- **Call**
```sh
http GET :9094/instance/22/variable/test-one
```
- **Result**
```json
aaa
```

### `/instance/{instId}/task/{taskId}/variable/{varName}`
- **Method**: GET
- **Description**: Variable information used in task.
- **Call**
```sh
http GET :9094/instance/22/task/25/variable/test-one
```
- **Result**
```json
aaa
```

### `/instance/{instId}/role-mapping/{roleName}`
- **Method**: GET
- **Description**: Instance RoleMapping information.
- **Call**
```sh
http GET :9094/instance/22/role-mapping/manager
```
- **Result**
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
- **Description**: Publish message to instance.
- **Call**
```sh
http POST :9094/instance/22/fire-message message="message"
```
- **Result**
```json
```

### `/instance/shutdown`
- **Method**: POST
- **Description**: Process-service shutdown API
- **Call**
```sh
http GET :9094/instance/22/eventList
```

### `/dry-run/**`
- **Method**: GET
- **Description**: Run instance as dry run.
- **Produces**: application/json;charset=UTF-8
- **Call**
```sh
http :9094/dry-run/test-woori
```
- **Result**
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
// Omitted
```
