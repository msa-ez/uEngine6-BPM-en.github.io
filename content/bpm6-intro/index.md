---
description: ''
sidebar: 'getting-started'
---

# introduction

## Overview of uEngine6 BPM
uEngine6 is a platform that supports everything from BPM-based architecture analysis to operational automation, achieving SOA MM Level 7 compliance.

uEngine6 BPM is a Business Process Management System (BPMS) based on the latest cloud-native architecture. It features an AI-powered version called "Process GPT," which automates process definition, form generation, and application integration. This AI capability handles complex processes automatically, enabling complete automation up to the execution stage without user intervention.

By utilizing an Event-Driven Architecture (EDA), uEngine6 minimizes service dependencies, synchronizes application states, and manages processes without propagating failures. Additionally, it offers built-in features for automated retries, compensation handling, and timeouts through process modeling, ensuring stable transaction processing in microservice architectures, where such tasks are typically complex.

Leveraging Large Language Model (LLM) AI technology, uEngine6 automates process modeling and form generation through natural language processing. This enables seamless system integration and effectively meets various business requirements. As a result, uEngine6 BPM is an ideal solution for enterprises transitioning to cloud-native and microservice architectures.

## Key Features and Characteristics
- **BPMN 2.0 Support**
  + uEngine6 fully supports the OMG BPMN 2.0 specification, allowing efficient process orchestration of microservices exposed as REST APIs on the OCE. Additionally, simple process-based REST microservices can be created using a pure BPMN-based approach. The intuitive interface enables easy modeling of complex business processes.
- **Multi-Instance Support**
  + Multi-instance processing is available using subprocesses. A multi-instance (MI) process allows for dynamic execution of sections where the number of instances is determined at runtime. To specify MI execution, a subprocess is used, and by setting a process variable (array value) as an MI-generating parameter, multiple instances are dynamically created in parallel or loop mode, depending on the number of values in the array.
- **Complex Branching Handling**
  + Process branching is possible using gateways. Gateways allow modeling of conditional branches and the definition of business rules. Complex rules involving simple process variable comparisons and And/Or combinations can be defined.
- **Form Mapping Functionality**
  + Data transfer between activities can be performed using a Data Mapper. This tool enables integration with various systems (e.g., legacy systems) by mapping and transforming data between different schemas during process execution.
- **Various System Integration Options**
  + uEngine6 supports various methods for BPM and system integration methods, including Message Brokers, Message Event Notation, and REST APIs.
- **Integration and Scalability**
  + uEngine6 provides control over security, integration, and performance when accessing external microservices. New APIs required for business operations can be created by mashing up existing microservice assets.
- **Process Simulation, Debugging, and Execution**
  + Processes can be tested through simulation before deployment. Users can also test process execution by verifying the parameters used in API calls. In case of errors, functionalities such as restarting from the failure point or recovering from the previous stage are provided.
- **Task Assignment Functionality**
  + During process execution, tasks can be automatically assigned to designated roles based on predefined settings.


## Version Compatibility
- uEngine6 BPM is recommended and supported on the following versions.
  + Java 8
  + Apache Maven 3.6.1
  + Spring Boot 2.3.1.RELEASE
- uEngine6 Frontend is recommended and supported on.
  + NodeJS 16 or later




