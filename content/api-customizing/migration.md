---
description: ''
sidebar: 'getting-started'
prev: ''
next: ''
---

# uEngine3.x 마이그래이션

<h3>Migrating uEngine 3 or 4 Process Definitions to uEngine6</h3>

- **Using the migrator**
```java
package org.uengine.migrator;

import org.uengine.components.serializers.ActivityRepositoryConverter;
import org.uengine.kernel.*;
import org.uengine.kernel.bpmn.CallActivity;
import org.uengine.modeling.resource.Serializer;
import org.uengine.processpublisher.MigUtils;
import org.uengine.processpublisher.uengine3.importer.ProcessDefinitionAdapter;
import org.uengine.util.ActivityFor;
import org.uengine.util.UEngineUtil;

import java.io.*;
import java.util.Hashtable;

/**
 * Created by uengine on 2017. 6. 16..
 */
public class UEngine3Converter {

    public static void main(String... args) throws Exception {

        if(args.length == 0) args = new String[]{"example.3upd"};
        FileInputStream inputFileStream = new FileInputStream(args[0]);
        ByteArrayOutputStream bao = new ByteArrayOutputStream();

        UEngineUtil.copyStream(inputFileStream, bao);

        String inputString = bao.toString();
        //LGD 추가
        inputString = inputString.replace("org.uengine.kernel.OCAPProcessDefinition", "org.uengine.kernel.ProcessDefinition");
        inputString = inputString.replace("org.uengine.kernel.EndActivity", "org.uengine.kernel.DefaultActivity");
        inputString = inputString.replace("com.lgdisplay.activity.OCAPBackActivity", "org.uengine.kernel.DefaultActivity");

        inputString = inputString.replace("org.uengine.kernel.ActivityRepository", "java.util.ArrayList");
        inputString = inputString.replace("kitech.apr.activity.KitechHumanActivity", "org.uengine.kernel.HumanActivity");
        inputString = inputString.replace(SubProcessActivity.class.getName(), CallActivity.class.getName());

        ProcessDefinition processDefinition3 = (ProcessDefinition) Serializer.deserialize(inputString);
         //set max tracing tag value
        MigUtils.setMaxTracingTag(processDefinition3);

        ProcessDefinitionAdapter processDefinitionAdapter = new ProcessDefinitionAdapter();

        Hashtable hashtable = new Hashtable();
        processDefinitionAdapter.convert(processDefinition3, hashtable);

        ProcessDefinition processDefinition5 = (ProcessDefinition) hashtable.get("root");

        Serializer.serialize(processDefinition5, new FileOutputStream(args[0]+".5.process"));
    }
}
```

```
java org.uengine.migrator.UEngine3Converter uengine3.process
```
- Then, you can get uengine3.process.5.process for the converted version of input file.


<h3>기존 uEngine 3.x 대의 프로세스 정의 모델 (블록 기반) 을 이해하고 싶다면 다음을 참고</h3>

<div style = "height:400px; object-fit: cover;">
<iframe style = "width:100%; height:100%;" src="https://www.youtube.com/embed/pjzQtRa7nNQ" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<br><br>
<div style = "height:400px; object-fit: cover;">
<iframe style = "width:100%; height:100%;" src="https://www.youtube.com/embed/mGJ8CAnzc6Q" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</div>

<br><br>

<h3>신규 uEngine6 의 프로세스 정의 모델 (그래프 기반) 을 이해하고 싶다면 다음을 참고</h3>
<div style = "height:400px; object-fit: cover;">
<iframe style = "width:100%; height:100%;" src="https://www.facebook.com/plugins/video.php?height=420&href=https%3A%2F%2Fwww.facebook.com%2F1401720840%2Fvideos%2F10204571371469880%2F&show_text=false&width=560&t=0" width="560" height="420" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share" allowFullScreen="true"></iframe>
</div>







