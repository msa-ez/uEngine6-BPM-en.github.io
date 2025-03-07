---
description: ''
sidebar: 'getting-started'
prev: ''
next: ''
---

# uEngine6 BPM 배포 설정

## Docker
Docker 컨테이너 환경에서 uEngine6 BPM를 배포하는 설정 방법입니다. 기본적으로 kafka를 통해서 비동기식 통신방식으로 통신하는 방식으로 설정 합니다. 

### 각 서비스 war 패키징
```bash
cd /process-service
mvn install -DskipTests

cd /definition-service
mvn install -DskipTests
```

### 각 서비스 docker image 빌드 및 배포
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



FROM openjdk:11.0.11-jre-slim
COPY /target/*-SNAPSHOT.jar definition.jar
COPY src/main/resources/application.yml /app/application.yml
EXPOSE 9093
ENV JAVA_OPTS="-Xmx400M -Djava.security.egd=file:/dev/./urandom -Dserver.port=9093"
ENV SPRING_CLOUD_STREAM_KAFKA_BINDER_BROKERS="kafka:29092,localhost:9092"
ENV SERVICE_HOST="localhost"
ENV UENGINE_DEFINITION_BASEPATH="/app"
ENV SPRING_PROFILES_ACTIVE="docker"
ENV KAFKA_BOOTSTRAP_SERVERS="kafka:29092,localhost:9092"
ENTRYPOINT exec java $JAVA_OPTS -jar definition.jar --spring.config.location=/app/application.yml
```

### docker compose 실행
```bash
docker-compose up
```



## JEUS 8
JEUS 8 WAS에 uEngine6 BPM를 배포하려면 다음과 같은 설정이 필요합니다.

- JEUS 8 호환성: JEUS 8은 Java EE7과 호환되며, JDK 7 및 JDK 8을 지원합니다. 그러나 JDK 8 사용을 권장합니다.

- Spring Boot 버전: 현재 프론트엔드에서는 Spring Boot 2.3.1.RELEASE 버전을 사용하고 있습니다. 이 버전은 JDK 8 이상을 필요로 합니다.

이 설정을 통해 JEUS 8 환경에서 uEngine6 BPM를 효과적으로 배포할 수 있습니다. JDK 8을 사용하는 것이 최적의 성능과 호환성을 보장합니다.

우선 WAS에 배포 하기 위해서 war 형식으로 패키징을 합니다. 

### 각 서비스 war로 패키징 설정
```xml
<!-- /process-service/pom.xml -->
<project>
  <!-- 기존 소스 코드... -->
  <packaging>war</packaging>
  <!-- 기존 소스 코드... -->
</project>


<!-- /definition-service/pom.xml -->
<project>
  <!-- 기존 소스 코드... -->
  <packaging>war</packaging>
  <!-- 기존 소스 코드... -->
</project>
```
