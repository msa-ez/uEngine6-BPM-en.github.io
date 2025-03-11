---
description: ''
sidebar: 'getting-started'
prev: ''
next: ''
---

# uEngine3.x Migration

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
        //Add LGD
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


<h3>To understand the process definition model (block-based) of the existing uEngine 3.x series, refer to the following</h3>

<div style="position: relative; padding-bottom: 56.25%; padding-top: 0px; height: 0; overflow: hidden;">
	<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/pjzQtRa7nNQ" 
        frameborder="0" crolling="no" frameborder="none" allowfullscreen="">
    </iframe>
</div>
<br><br>

<div style="position: relative; padding-bottom: 56.25%; padding-top: 0px; height: 0; overflow: hidden;">
	<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.youtube.com/embed/mGJ8CAnzc6Q" 
        frameborder="0" crolling="no" frameborder="none" allowfullscreen="">
    </iframe>
</div>
<br><br>

<h3>To understand the process definition model (graph-based) of the new uEngine6, refer to the following</h3>
<div style="position: relative; padding-bottom: 56.25%; padding-top: 0px; height: 0; overflow: hidden;">
	<iframe style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" 
        src="https://www.facebook.com/plugins/video.php?height=420&href=https%3A%2F%2Fwww.facebook.com%2F1401720840%2Fvideos%2F10204571371469880%2F&show_text=false&width=560&t=0" 
        frameborder="0" crolling="no" frameborder="none" allowfullscreen="">
    </iframe>
</div>






