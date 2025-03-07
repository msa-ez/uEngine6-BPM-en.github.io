---
description: ''
sidebar: 'getting-started'
---

# 배포하기

## Docker
Docker 컨테이너 환경에서 uEngine6 BPM를 배포하는 설정 방법입니다. 기본적으로 kafka를 통해서 비동기식 통신방식으로 통신하는 방식으로 설정 합니다. 

### 서비스 빌드 및 설치
```bash
cd /process-service
mvn install -DskipTests

cd /definition-service
mvn install -DskipTests
```

### 서비스 docker image 빌드 및 배포
```bash
docker build -t process-service:latest .
docker tag process:latest {userId}/process-service:1.0.0
docker push {userId}/process-service:1.0.0

docker build -t definition-service:latest .
docker tag definition:latest {userId}/definition-service:1.0.0
docker push {userId}/definition-service:1.0.0
```

### docker compose 파일 작성
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

### docker compose 실행 및 중지
```bash
docker-compose up #실행
docker-compose down #중지
```



## JEUS 8
JEUS 8 WAS에 uEngine6 BPM를 배포하려면 다음과 같은 설정이 필요합니다.

- JEUS 8 호환성: JEUS 8은 Java EE7과 호환되며, JDK 7 및 JDK 8을 지원합니다. 그러나 JDK 8 사용을 권장합니다.

- Spring Boot 버전: 현재 프론트엔드에서는 Spring Boot 2.3.1.RELEASE 버전을 사용하고 있습니다. 이 버전은 JDK 8 이상을 필요로 합니다.

이 설정을 통해 JEUS 8 환경에서 uEngine6 BPM를 효과적으로 배포할 수 있습니다. JDK 8을 사용하는 것이 최적의 성능과 호환성을 보장합니다.

우선 WAS에 배포 하기 위해서 war 형식으로 패키징을 합니다. 

### 서비스 war로 패키징 설정
```xml
<!-- /process-service/pom.xml -->
<!-- /definition-service/pom.xml -->

<project>
  <!-- 기존 소스 코드... -->
  <packaging>war</packaging>
</project>
```

### 서비스 JAVA8 빌드 설정 및 의존성 추가
```xml
<!-- /pom.xml -->
<!-- /uengine-commons/pom.xml -->
<!-- /uengine-core/pom.xml -->
<!-- /uengine-five-api/pom.xml -->
<!-- /uengine-resource-manager/pom.xml -->
<!-- /process-service/pom.xml -->
<!-- /definition-service/pom.xml -->
<dependencies>
    <!-- 기존 소스 코드... -->
    <dependency>
        <groupId>javax.validation</groupId>
        <artifactId>validation-api</artifactId>
        <version>2.0.1.Final</version> <!-- 호환되는 버전을 사용 -->
        <scope>provided</scope> <!-- 런타임 시 JEUS8의 버전을 사용 -->
    </dependency>
    <dependency>
        <groupId>org.hibernate</groupId>
        <artifactId>hibernate-validator</artifactId>
        <version>6.0.13.Final</version> <!-- 호환되는 버전을 사용 -->
        <scope>provided</scope> <!-- 런타임 시 JEUS8의 버전을 사용 -->
    </dependency>

    <!-- process-service/pom.xml, definition-service/pom.xml 추가 -->
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
    <!-- 기존 소스 코드... -->
    <java.version>1.8</java.version>
    <maven.compiler.source>1.8</maven.compiler.source>
    <maven.compiler.target>1.8</maven.compiler.target>
  </properties>

  <build>
    <plugins>
        <!-- 기존 소스 코드... -->
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

### 서비스 web.xml 생성및 설정
```xml
<!-- /process-service/src/main/webapp/WEB-INF/web.xml -->
<!-- /definition-service/src/main/webapp/WEB-INF/web.xml -->

<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaee 
         http://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd"
         version="3.1">
    <!-- 서블릿 매핑 -->
    <servlet-mapping>
        <servlet-name>DefinitionServiceServlet</servlet-name>
        <url-pattern>/definition-service/*</url-pattern>
    </servlet-mapping>

    <!-- 환영 페이지 -->
    <welcome-file-list>
        <welcome-file>index.html</welcome-file>
    </welcome-file-list>
</web-app>
```

### 서비스 서블릿 설정
```java
// /process-service/src/main/java/com/uengine/process/ProcessServiceApplication.java
// /definition-service/src/main/java/com/uengine/definition/DefinitionServiceApplication.java

import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;

@ComponentScan(basePackages = "org.uengine.five") // 명시적 컴포넌트 스캔 추가
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