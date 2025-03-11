---
description: ''
sidebar: 'getting-started'
---

# Data Management - Files
---
uEngine6 BPM manages process definitions, definition versions, instance lists, payloads, and logs through files. While basic information is also managed in the database, more detailed information is stored in files. Process definition-related information is handled more importantly in files than in the database.


## Basic Structure
Process definitions, instances, logs, and payloads folders are managed as files, and detailed information about instances and the status of each task are managed as files.

```text
[Folder Structure]
/bpm
  /definitions (Process definition list)
  /archive     (Process definition versions)
  /instances   (Instance list)
  /logs        (logs management)
  /payloads    (payload management)
```

### Process Definition
  + The process defined by the user is saved as a file in bpmn format. This folder is used when running simulations, used for testing before the current process is deployed, and is an intermediate storage folder before version management.
```text
Example) Process definition folder structure
/definitions
	/service-process.bpmn (file)
```

### Process Definition Version
  + This is the folder where the process defined by the user is actually deployed and executed. When a user executes a process, the latest version of the file is always executed. For version management, a "{process name}.bpmn" folder is created under the "archive" folder, and files are stored by version under that folder.
```text
Example) Format of version storage when defining process
/archive (folder)
	/service-process.bpmn (folder)
		/0.1.bpmn (file)
```

### Instance List
  + When a process is executed, only basic data of the instance, which is the unit created during process execution, is stored in the database, and other data such as the status of the instance, stored data values, and the status of each task are stored in the corresponding file. Under the "instances" folder, files are created with the instance number, which is a unique number, and files are stored in xml format.
```text
Example) Instance list folder structure
/instances
	/1
	/... (file)
```

### Logs Management
  + During process execution, log information such as information, errors, and warnings are stored through logback according to the DEBUG level settings. When an error occurs during the process handling, it is saved as a file, and files are created and managed daily. Files are created under the "logs" folder, and files are created and managed with filenames by date with the current date.
```text
Example) Log folder structure
/logs
	/bpm_YYYYMMDD.log(file)
```

### Payload Management
  + This is a folder that stores values by instance units that users delivered during the process handling. It stores the values provided by users and is used to check for errors, identify causes, and verify values later. Files are created with the instance number under the "payloads" folder, and files are stored in xml format.
```text
Example) Payload folder structure
/payloads
	/{instance_id}(file)



