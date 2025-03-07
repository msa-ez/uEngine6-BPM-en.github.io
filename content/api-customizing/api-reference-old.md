---
description: ''
sidebar: 'api-customizing'
prev: ''
next: ''
---

# uEngine6 API Reference

<h3>원칙</h3>

- **[uEngine6 의 모든 API 들은 REST MM 3 인 Hateoas(HAL) 수준을 준수한다](https://en.wikipedia.org/wiki/HATEOAS)**
- 따라서 hybind 와 같은 Javascript binding library 를 통해 쉽게 UI 와 인터랙션 하도록 한다.


## 프로세스 폴더 관리

**/definition**


- 폴더의 생성
```java
http PUT localhost:8080/definition/folder
http POST localhost:8080/definition/folder/folder2
http POST localhost:8080/definition name="new folder" directory=true
```


- 정의의 저장: (raw 가 꼭 들어가야 한다)
```java
http POST localhost:8080/definition/raw/folder/object1.json definition="Hello"
http POST localhost:8080/definition/raw/folder/object2.json definition="Hello this is object 2"
```


- 정의의 인출: (raw 가 꼭 들어가야 한다)
```java
http GET localhost:8080/definition/raw/folder/object1.json
http GET localhost:8080/definition/raw/folder/object1.json unwrap==true # definition wrapping 을 하지 않음
```

- 파일의 리스팅

```java
http GET localhost:8080/definition
http GET localhost:8080/definition/folder
```

<h3>결과</h3>

```java
{
    "_embedded": {
        "definitions": [
            {
                "_links": {
                    "self": {
                        "href": "http://localhost:8080/definition/folder/folder2"
                    }
                }, 
                "directory": true, 
                "name": "folder2", 
                "path": "folder/folder2"
            }, 
            {
                "_links": {
                    "raw": {
                        "href": "http://localhost:8080/definition/raw/folder/object1.json"
                    }, 
                    "self": {
                        "href": "http://localhost:8080/definition/folder/object1.json"
                    }
                }, 
                "directory": false, 
                "name": "object1.json", 
                "path": "folder/object1.json"
            }, 
            {
                "_links": {
                    "raw": {
                        "href": "http://localhost:8080/definition/raw/folder/object2.json"
                    }, 
                    "self": {
                        "href": "http://localhost:8080/definition/folder/object2.json"
                    }
                }, 
                "directory": false, 
                "name": "object2.json", 
                "path": "folder/object2.json"
            }
        ]
    }
}
```


- 파일명의 변경
```java
http PATCH localhost:8080/definition/folder/object1.json path="folder/object_one.json"
```


- 파일위치의 변경
```java
http PATCH localhost:8080/definition/folder/object2.json path="folder/folder2/object2.json"
```


- 폴더명의 변경
```java
http PATCH localhost:8080/definition/folder/folder2 path="folder/folder_two"
```


- 파일/폴더의 삭제
```java
http DELETE localhost:8080/definition/folder/folder_two
http DELETE localhost:8080/definition/folder/object2.json
```


- 프로세스 정의 디플로이
    - 다음을 body 로 하여, localhost:8080/definition/raw/process.json 으로 POST 한다:
```java
vi process.json
http localhost:8080/definition/raw/process.json < process.json
```

## 프로세스 정의 관리

<details>
<summary>프로세스 정의 JSON Code</summary>
<div markdown="1">

```java
{
    "definition": {
        "_type": "org.uengine.kernel.ProcessDefinition", 
        "adhoc": true, 
        "archive": true, 
        "childActivities": [
            "java.util.ArrayList", 
            [
                {
                    "_type": "org.uengine.kernel.bpmn.StartEvent", 
                    "description": {}, 
                    "dynamicChangeAllowed": true, 
                    "elementView": {
                        "_type": "org.uengine.kernel.view.DefaultActivityView", 
                        "height": 30.0, 
                        "id": "2", 
                        "parent": "d2852bad-5291-5ca4-aaf5-b61eac1d3aa7", 
                        "shapeId": "OG.shape.bpmn.A_Task", 
                        "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"white\",\"fill-opacity\":0,\"label-position\":\"bottom\",\"stroke-width\":1.5,\"cursor\":\"move\"}", 
                        "width": 30.0, 
                        "x": 263.0, 
                        "y": 187.0
                    }, 
                    "isDynamicChangeAllowed": true, 
                    "name": {}, 
                    "retryDelay": 60, 
                    "tracingTag": "2"
                }, 
                {
                    "_type": "org.uengine.kernel.bpmn.EndEvent", 
                    "description": {}, 
                    "dynamicChangeAllowed": true, 
                    "elementView": {
                        "_type": "org.uengine.kernel.view.DefaultActivityView", 
                        "height": 30.0, 
                        "id": "3", 
                        "parent": "d2852bad-5291-5ca4-aaf5-b61eac1d3aa7", 
                        "shapeId": "OG.shape.bpmn.A_Task", 
                        "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"white\",\"fill-opacity\":0,\"label-position\":\"bottom\",\"stroke-width\":3,\"cursor\":\"move\"}", 
                        "width": 30.0, 
                        "x": 767.0, 
                        "y": 188.0
                    }, 
                    "isDynamicChangeAllowed": true, 
                    "name": {}, 
                    "retryDelay": 60, 
                    "tracingTag": "3"
                }, 
                {
                    "_type": "org.uengine.kernel.bpmn.CallActivity", 
                    "definitionId": "new-process-definition4", 
                    "description": {}, 
                    "dynamicChangeAllowed": true, 
                    "elementView": {
                        "_type": "org.uengine.kernel.view.DefaultActivityView", 
                        "height": 100.0, 
                        "id": "6", 
                        "parent": "d2852bad-5291-5ca4-aaf5-b61eac1d3aa7", 
                        "shapeId": "OG.shape.bpmn.A_Task", 
                        "style": "{\"stroke\":\"black\",\"fill-r\":1,\"fill-cx\":0.1,\"fill-cy\":0.1,\"fill\":\"#FFFFFF\",\"fill-opacity\":0,\"label-position\":\"center\",\"stroke-width\":3,\"r\":\"10\",\"cursor\":\"move\"}", 
                        "width": 100.0, 
                        "x": 531.0, 
                        "y": 371.0
                    }, 
                    "instanceId": "<%=Instance.Name%>", 
                    "isDynamicChangeAllowed": true, 
                    "multipleInstanceLabel": {}, 
                    "name": {
                        "text": "????"
                    }, 
                    "retryDelay": 60, 
                    "roleBindings": [
                        {
                            "argument": "role1", 
                            "direction": "IN-OUT", 
                            "role": {
                                "askWhenInit": true, 
                                "displayName": {}, 
                                "name": "role1"
                            }
                        }, 
                        {
                            "argument": "role2", 
                            "direction": "IN-OUT", 
                            "role": {
                                "askWhenInit": true, 
                                "displayName": {}, 
                                "name": "role2"
                            }
                        }
                    ], 
                    "tracingTag": "6", 
                    "variableBindings": [
                        {
                            "argument": {
                                "text": "aaa"
                            }, 
                            "direction": "IN-OUT", 
                            "variable": {
                                "defaultValue": "", 
                                "displayName": {}, 
                                "name": "aaa", 
                                "type": "java.lang.String", 
                                "typeClassName": "java.lang.String"
                            }
                        }, 
                        {
                            "argument": {
                                "text": "bbb"
                            }, 
                            "direction": "IN-OUT", 
                            "variable": {
                                "defaultValue": "", 
                                "displayName": {}, 
                                "name": "bbb", 
                                "type": "java.lang.String", 
                                "typeClassName": "java.lang.String"
                            }
                        }
                    ]
                }, 
                {
                    "_type": "org.uengine.kernel.HumanActivity", 
                    "allowAnonymous": true, 
                    "description": {}, 
                    "duration": 5, 
                    "dynamicChangeAllowed": true, 
                    "elementView": {
                        "_type": "org.uengine.kernel.view.DefaultActivityView", 
                        "height": 100.0, 
                        "id": "4", 
                        "parent": "d2852bad-5291-5ca4-aaf5-b61eac1d3aa7", 
                        "shapeId": "OG.shape.bpmn.A_Task", 
                        "style": "{\"stroke\":\"black\",\"fill-r\":1,\"fill-cx\":0.1,\"fill-cy\":0.1,\"fill\":\"#FFFFFF\",\"fill-opacity\":0,\"label-position\":\"center\",\"stroke-width\":1.2,\"r\":\"10\",\"cursor\":\"move\"}", 
                        "width": 100.0, 
                        "x": 431.0, 
                        "y": 187.0
                    }, 
                    "instruction": {}, 
                    "isAllowAnonymous": true, 
                    "isDynamicChangeAllowed": true, 
                    "isSendEmailWorkitem": true, 
                    "keyword": {}, 
                    "name": {
                        "text": "??2"
                    }, 
                    "parameters": [
                        {
                            "argument": {
                                "text": "arg"
                            }, 
                            "direction": "OUT", 
                            "multipleInput": true, 
                            "variable": {
                                "defaultValue": "", 
                                "displayName": {}, 
                                "name": "aaa", 
                                "type": "java.lang.String", 
                                "typeClassName": "java.lang.String"
                            }
                        }, 
                        {
                            "argument": {
                                "text": "arg2"
                            }, 
                            "direction": "OUT", 
                            "variable": {
                                "defaultValue": "", 
                                "displayName": {}, 
                                "name": "bbb", 
                                "type": "java.lang.String", 
                                "typeClassName": "java.lang.String"
                            }
                        }
                    ], 
                    "retryDelay": 60, 
                    "role": {
                        "askWhenInit": true, 
                        "displayName": {}, 
                        "elementView": {
                            "_type": "org.uengine.kernel.view.DefaultActivityView", 
                            "height": 218.0, 
                            "id": "OG_3580_88", 
                            "parent": "d2852bad-5291-5ca4-aaf5-b61eac1d3aa7", 
                            "shapeId": "OG.shape.bpmn.A_Task", 
                            "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"#ffffff\",\"fill-opacity\":0,\"label-position\":\"center\",\"label-direction\":\"vertical\",\"vertical-align\":\"top\",\"cursor\":\"move\"}", 
                            "width": 690.0, 
                            "x": 528.0, 
                            "y": 187.0
                        }, 
                        "name": "role1"
                    }, 
                    "sendEmailWorkitem": true, 
                    "tool": "defaultHandler", 
                    "tracingTag": "4"
                }
            ]
        ], 
        "defaultFlowchartViewOption": "vertical", 
        "defaultFlowchartViewType": "swimlane", 
        "duration": 10, 
        "dynamicChangeAllowed": true, 
        "id": "codi/new-process-definition4.json", 
        "initiateByFirstWorkitem": true, 
        "isAdhoc": true, 
        "isDynamicChangeAllowed": true, 
        "name": {
            "text": "codi/new-process-definition4.json"
        }, 
        "processVariableDescriptors": [
            {
                "defaultValue": "", 
                "displayName": {}, 
                "name": "aaa", 
                "type": "java.lang.String", 
                "typeClassName": "java.lang.String"
            }, 
            {
                "defaultValue": "", 
                "displayName": {}, 
                "name": "bbb", 
                "type": "java.lang.String", 
                "typeClassName": "java.lang.String"
            }
        ], 
        "retryDelay": 60, 
        "roles": [
            {
                "askWhenInit": true, 
                "displayName": {}, 
                "elementView": {
                    "_type": "org.uengine.kernel.view.DefaultActivityView", 
                    "height": 370.0, 
                    "id": "d2852bad-5291-5ca4-aaf5-b61eac1d3aa7", 
                    "shapeId": "OG.shape.bpmn.A_Task", 
                    "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"#ffffff\",\"fill-opacity\":0,\"label-position\":\"center\",\"label-direction\":\"vertical\",\"vertical-align\":\"top\",\"cursor\":\"move\"}", 
                    "width": 710.0, 
                    "x": 518.0, 
                    "y": 263.0
                }, 
                "name": "team"
            }, 
            {
                "askWhenInit": true, 
                "displayName": {}, 
                "elementView": {
                    "_type": "org.uengine.kernel.view.DefaultActivityView", 
                    "height": 218.0, 
                    "id": "OG_3580_88", 
                    "parent": "d2852bad-5291-5ca4-aaf5-b61eac1d3aa7", 
                    "shapeId": "OG.shape.bpmn.A_Task", 
                    "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"#ffffff\",\"fill-opacity\":0,\"label-position\":\"center\",\"label-direction\":\"vertical\",\"vertical-align\":\"top\",\"cursor\":\"move\"}", 
                    "width": 690.0, 
                    "x": 528.0, 
                    "y": 187.0
                }, 
                "name": "role1"
            }, 
            {
                "askWhenInit": true, 
                "displayName": {}, 
                "elementView": {
                    "_type": "org.uengine.kernel.view.DefaultActivityView", 
                    "height": 152.0, 
                    "id": "OG_3580_92", 
                    "parent": "d2852bad-5291-5ca4-aaf5-b61eac1d3aa7", 
                    "shapeId": "OG.shape.bpmn.A_Task", 
                    "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"#ffffff\",\"fill-opacity\":0,\"label-position\":\"center\",\"label-direction\":\"vertical\",\"vertical-align\":\"top\",\"cursor\":\"move\"}", 
                    "width": 690.0, 
                    "x": 528.0, 
                    "y": 372.0
                }, 
                "name": "role2"
            }
        ], 
        "sequenceFlows": [
            {
                "condition": {
                    "_type": "org.uengine.kernel.ExpressionEvaluateCondition", 
                    "description": {}
                }, 
                "relationView": {
                    "TERMINAL_IN_OUT": "_TERMINAL_C_INOUT_0", 
                    "shapeId": "OG.shape.bpmn.C_Flow", 
                    "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"none\",\"fill-opacity\":0,\"label-position\":\"center\",\"stroke-width\":1.5,\"stroke-opacity\":1,\"edge-type\":\"plain\",\"arrow-start\":\"none\",\"arrow-end\":\"block\",\"stroke-dasharray\":\"\",\"stroke-linejoin\":\"round\",\"cursor\":\"pointer\"}", 
                    "value": "[[278,188],[381,188]]"
                }, 
                "sourceRef": "2", 
                "targetRef": "4"
            }, 
            {
                "condition": {
                    "_type": "org.uengine.kernel.ExpressionEvaluateCondition", 
                    "description": {}
                }, 
                "relationView": {
                    "TERMINAL_IN_OUT": "_TERMINAL_C_INOUT_0", 
                    "shapeId": "OG.shape.bpmn.C_Flow", 
                    "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"none\",\"fill-opacity\":0,\"label-position\":\"center\",\"stroke-width\":1.5,\"stroke-opacity\":1,\"edge-type\":\"plain\",\"arrow-start\":\"none\",\"arrow-end\":\"block\",\"stroke-dasharray\":\"\",\"stroke-linejoin\":\"round\",\"cursor\":\"pointer\"}", 
                    "value": "[[432,237],[432,268],[532,268],[532,321]]"
                }, 
                "sourceRef": "4", 
                "targetRef": "6"
            }, 
            {
                "condition": {
                    "_type": "org.uengine.kernel.ExpressionEvaluateCondition", 
                    "description": {}
                }, 
                "relationView": {
                    "TERMINAL_IN_OUT": "_TERMINAL_C_INOUT_0", 
                    "shapeId": "OG.shape.bpmn.C_Flow", 
                    "style": "{\"stroke\":\"black\",\"fill-r\":\".5\",\"fill-cx\":\".5\",\"fill-cy\":\".5\",\"fill\":\"none\",\"fill-opacity\":0,\"label-position\":\"center\",\"stroke-width\":1.5,\"stroke-opacity\":1,\"edge-type\":\"plain\",\"arrow-start\":\"none\",\"arrow-end\":\"block\",\"stroke-dasharray\":\"\",\"stroke-linejoin\":\"round\",\"cursor\":\"pointer\"}", 
                    "value": "[[581,372],[668,372],[668,188],[752,188]]"
                }, 
                "sourceRef": "6", 
                "targetRef": "3"
            }
        ], 
        "simulationInputFrequency": 10, 
        "simulationInstanceCount": 10
    }
}
```
</div>
</details>


- 디플로이 결과:
```java
{
    "_links": {
        "instantiation": {
            "href": "http://localhost:8080/definition/instance/process.json"
        }, 
        "raw": {
            "href": "http://localhost:8080/definition/raw/process.json"
        }, 
        "self": {
            "href": "http://localhost:8080/definition/process.json"
        }
    }, 
    "directory": false, 
    "name": "process.json", 
    "path": "process.json"
}
```

## 프로세스 instantiation 생성
```java
http POST localhost:8080/definition/instance/process.json
```

**결과**
```java
{
    "_links": {
        "definition": {
            "href": "http://localhost:8080/definition/process.json"
        }, 
        "role-mapping": {
            "href": "http://localhost:8080/instance/3451/role-mapping/{roleName}", 
            "templated": true
        }, 
        "self": {
            "href": "http://localhost:8080/instance/3451"
        }, 
        "stop": {
            "href": "http://localhost:8080/instance/3451/stop"
        }, 
        "suspend": {
            "href": "http://localhost:8080/instance/3451/stop"
        }, 
        "variables": {
            "href": "http://localhost:8080/instance/3451/variables"
        }
    }, 
    "name": "Volatile_0"
}
```

- 변수값 링크를 따라가본다:
```java
http localhost:8080/instance/3451/variables
```
- 결과
    - 변수 값들이 리스팅 된다.

- 이렇듯 HATEOAS 에서는 stop, suspend 등 액션을 취할 수 있는 링크를 POST 로 전송하여 액션을 취할 수 있다.


## Hybind example
<details>
<summary>Hybind example Code</summary>
<div markdown="1">

```java
<script src="https://code.jquery.com/jquery-3.1.0.min.js"></script>
<script src="https://unpkg.com/hybind@latest/index.js"></script>

<script src="https://unpkg.com/vue"></script>

<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-material@0.7.1"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.3/require.js"></script>
<link rel="stylesheet" href="https://unpkg.com/vue-material@0.7.1/dist/vue-material.css">
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">




<script>
      var backend = hybind("http://localhost:8080");
      var definitions = [];

      backend.$bind("definition", definitions);


      //creating a new folder
      definitions.$create({name:"new folder", directory: true}).then(function(folder){
          folder.$load().then(function(thefolder){

              console.log("The folder has been created:", thefolder);

             thefolder.$delete();
          });
      });

//      $.post({
//        url: "http://localhost:8080/definition/folder",
//        async: false
//      });

//      $.post({
//        url: "http://localhost:8080/definition/folder/folder2",
//        async: false
//      });

      var process;

      definitions.$load().then(function(definitions){

          if(definitions){

              definitions.forEach(function(definition){
                console.log(definition.name);

                if(definition.directory){

                  //drill down all the directories only for the first level.
                  definition.$load().then(function(directory){
                     console.log(directory);
                  });
                }

                if(definition.name == "process.json") process = definition;

              });

              process.raw.$load().then(function(raw_definition){
                 console.log("definition", raw_definition);
              });

            //invoke the instantiation:  this invoke the GET: definition (list definition) again.
            //  it may be a try for adding a list to the first bound variable (definitions).
            //  maybe there's any sort of option to disable this.

              process.instantiation.$create().then(function(instance, r1, r2, r3){

                  console.log("instance", instance);

                //we need to load again for adding the _links as properties. this looks dummy action.
                  instance.$load().then(function(instance_detail){

                    instance_detail.variables.$load().then(function(variables){
                      console.log("variables", variables);
                    });

                  });

              });

          }

      });


</script>
```
</div>
</details>

## 프로세스 버전관리
**/version**
- 버전 리스팅
```java
http localhost:8080/version
```

**결과**
```java
{
    "_embedded": {
        "versions": [
            {
                "_links": {
                    "definitions": {
                        "href": "http://localhost:8080/version/1.0/definition/"
                    }, 
                    "makeProduction": {
                        "href": "http://localhost:8080/version/1.0/production"
                    }, 
                    "self": {
                        "href": "http://localhost:8080/version/1.0"
                    }
                }, 
                "version": {
                    "date": null, 
                    "description": null, 
                    "major": 1, 
                    "minor": 0, 
                    "production": false
                }
            }, 

```

- 버전업 (편집중이 버전의 snapshot 을 뜨는 일종의 tagging)
```java
# 마이너 버전업 v1.0 -> v1.1
http POST localhost:8080/version

# 메이저 버전업 v1.0 -> v2.0
http POST localhost:8080/version?major=true
```


- 프로덕션 설정
```java
http POST localhost:8080/version/1.0/production
```


- 혹은 hateoas (hybind) 에 의해
```java
//hybind
version.makeProduction.$create()

//jquery
$.post(version._links.makeProduction.href)
```


- 프로덕션 버전 정보 얻기
```java
http localhost:8080/version/production
```


- 프로덕션 버전의 프로세스 정의 얻기 (현재 xml 만 지원함)
```java
http localhost:8080/definition/xml/process.json?production=true
```



























