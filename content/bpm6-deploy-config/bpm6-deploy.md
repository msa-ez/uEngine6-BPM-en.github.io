---
description: ''
sidebar: 'getting-started'
---

# Deployment

## Docker
This is the configuration method for deploying uEngine6 BPM in a Docker container environment. By default, it is configured to communicate asynchronously through Kafka.

### Service Build and Installation
```bash
cd /process-service
mvn install -DskipTests

cd /definition-service
mvn install -DskipTests
```

### Build and Deploy Service Docker Image
```bash
docker build -t process-service:latest .
docker tag process:latest {userId}/process-service:1.0.0
docker push {userId}/process-service:1.0.0

docker build -t definition-service:latest .
docker tag definition:latest {userId}/definition-service:1.0.0
docker push {userId}/definition-service:1.0.0
```

### Write Docker Compose File
```yaml
version: '3.8'
services:
  zookeeper:
    image: confluentinc/cp-zookeeper:latest
    environment:
      ZOOKEEPER_CLIENT_PORT: 2181
      ZOOKEEPER_TICK_TIME: 2000
    ports:
      - 22181:2181
    networks:
      - app-network
 
  kafka:
    image: confluentinc/cp-kafka:latest
    depends_on:
      - zookeeper
    ports:
      - 9092:9092
    environment:
      KAFKA_BROKER_ID: 1
      KAFKA_ZOOKEEPER_CONNECT: zookeeper:2181
      KAFKA_ADVERTISED_LISTENERS: PLAINTEXT://localhost:9092,PLAINTEXT_INTERNAL://kafka:29092
      KAFKA_LISTENER_SECURITY_PROTOCOL_MAP: PLAINTEXT:PLAINTEXT,PLAINTEXT_INTERNAL:PLAINTEXT
      KAFKA_INTER_BROKER_LISTENER_NAME: PLAINTEXT_INTERNAL
      KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR: 1
      KAFKA_AUTO_CREATE_TOPICS_ENABLE: 'true'
      KAFKA_CREATE_TOPICS: "bpm-topic:1:1"
    networks:
      - app-network


  process-service:
    image: {userId}/process-service:1.0.0
    depends_on:
      - kafka
    ports:
      - 9094:9094
    volumes:
      - ../archive:/app/archive
      - ../definitions:/app/definitions
      - ../instances:/app/instances
      - ../payloads:/app/payloads
      - ../test:/app/test
    networks:
    - app-network


  definition-service:
    image: {userId}/definition-service:1.0.0
    depends_on:
      - kafka
    ports:
      - 9093:9093
    volumes:
      - ../archive:/app/archive
      - ../definitions:/app/definitions
      - ../instances:/app/instances
      - ../payloads:/app/payloads
      - ../test:/app/test
    networks:
    - app-network


volumes:
  archive:
  definitions:
  instances:
  payloads:
  logs:
 
networks:
  app-network:
    driver: bridge
```

### Run and Stop Docker Compose
```bash
docker-compose up #run
docker-compose down #stop
```



## JEUS 8
To deploy uEngine6 BPM on JEUS 8 WAS, the following settings are required.

- JEUS 8 Compatibility: JEUS 8 is compatible with Java EE7 and supports JDK 7 and JDK 8. However, JDK 8 is recommended.

- Spring Boot Version: The frontend currently uses Spring Boot 2.3.1.RELEASE version. This version requires JDK 8 or higher.
With these settings, you can effectively deploy uEngine6 BPM in a JEUS 8 environment. Using JDK 8 ensures optimal performance and compatibility.
First, package it in war format for deployment to WAS.

### Service Packaging as WAR Configuration
```xml
<!-- /process-service/pom.xml -->
<!-- /definition-service/pom.xml -->

<project>
  <!-- Original source code... -->
  <packaging>war</packaging>
</project>
```

### Service JAVA8 Build Configuration and Dependency Addition
```xml
<!-- /pom.xml -->
<!-- /uengine-commons/pom.xml -->
<!-- /uengine-core/pom.xml -->
<!-- /uengine-five-api/pom.xml -->
<!-- /uengine-resource-manager/pom.xml -->
<!-- /process-service/pom.xml -->
<!-- /definition-service/pom.xml -->
<dependencies>
    <!-- Original source code... -->
    <dependency>
        <groupId>javax.validation</groupId>
        <artifactId>validation-api</artifactId>
        <version>2.0.1.Final</version> <!-- Use compatible version -->
        <scope>provided</scope> <!-- Use JEUS8 version at runtime -->
    </dependency>
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-validator</artifactId>
        <version>6.0.13.Final</version> <!-- Use compatible version -->
        <scope>provided</scope> <!-- Use JEUS8 version at runtime -->
    </dependency>

    <!-- Add to process-service/pom.xml, definition-service/pom.xml -->
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
        <exclusions>
            <exclusion>
                <groupId>org.hibernate.validator</groupId>
                <artifactId>hibernate-validator</artifactId>
            </exclusion>
        </exclusions>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-tomcat</artifactId>
        <version>2.3.12.RELEASE</version>
        <scope>provided</scope>
    </dependency>
</dependencies>

<properties>
    <!-- Original source code... -->
    <java.version>1.8</java.version>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>

  <build>
    <plugins>
        <!-- Original source code... -->
        <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.1</version>
            <configuration>
                <source>1.8</source>
                <target>1.8</target>
            </configuration>
        </plugin>
    </plugins>
  </build>
```

### Service web.xml Creation and Configuration
```xml
<!-- /process-service/src/main/webapp/WEB-INF/web.xml -->
<!-- /definition-service/src/main/webapp/WEB-INF/web.xml -->

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
         http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
    <!-- Servlet mapping -->
    <servlet-mapping>
        <servlet-name>DefinitionServiceServlet</servlet-name>
        <url-pattern>/definition-service/*</url-pattern>
    </servlet-mapping>

    <!-- Welcome page -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
</web-app>
```

### Service Servlet Configuration
```java
// /process-service/src/main/java/com/uengine/process/ProcessServiceApplication.java
// /definition-service/src/main/java/com/uengine/definition/DefinitionServiceApplication.java

import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "org.uengine.five") // Add explicit component scan
public class ServiceApplication extends SpringBootServletInitializer implements ApplicationContextAware {

    public static ApplicationContext applicationContext;

    public static ObjectMapper objectMapper = createTypedJsonObjectMapper();

    public static ApplicationContext getApplicationContext() {
        return applicationContext;
    }

    @Override
    public void setApplicationContext(ApplicationContext context) {
        applicationContext = context;
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder application) {        
        SpringApplicationBuilder builder = application.sources(ServiceApplication.class);
        super.configure(builder);
        GlobalContext.setComponentFactory(new SpringComponentFactory());
        return builder;
    }
    
    public static void main(String[] args) {
        applicationContext = SpringApplication.run(ServiceApplication.class, args);
        GlobalContext.setComponentFactory(new SpringComponentFactory());
    }
```