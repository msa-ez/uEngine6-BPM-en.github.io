---
description: ''
sidebar: 'getting-started'
---

# 실행하기

## 프로젝트 준비
- **프로젝트 클론**: GitHub에서 uEngine 프로젝트를 클론합니다.
```sh
git clone https://github.com/uengine-oss/uEngine6.git
```

## Local 실행하기
로컬 uEngine 실행하려면 기본적으로 비동기 통신을 위한 Kafka 서버가 필요합니다. 따라서 먼저 카프카 서버를 실행해야 합니다. 
- kafka 서버 설치및 실행
  - https://kafka.apache.org/ 접속하여 설치및 실행.

- uEngine 실행
```sh
# Process Service 실행(포트 9094)-프로세스 실행 서비스
cd /process-service
mvn spring-boot:run

# Definition Service 실행(포트 9093)-프로세스 정의 서비스
cd /definition-service
mvn spring-boot:run

# Gateway Service 실행(포트 8088)-API 게이트웨이
cd /gateway
mvn spring-boot:run
```


## Docker 실행하기

Docker에 uEngine을 올려서 실행하려면 다음 단계를 따르세요:

1. **디렉토리 이동**: 클론한 프로젝트의 루트 디렉토리로 이동합니다.
```sh
cd uengine
```
2. **Docker Compose 실행**: Docker Compose를 사용하여 uEngine을 실행합니다. 이때, `infra` 폴더에 있는 Docker Compose 파일을 사용합니다.
```sh
# Docker Compose
cd infra
docker compose up
```
    이 명령어는 `infra` 폴더에 정의된 모든 서비스를 시작합니다.

3. **실행 확인**:
실행이 완료되면 다음 이미지와 같이 uEngine과 관련된 docker image가 실행됩니다.

![](../../uengine-image/installation-1.png)

4. **uEngine 종료**: uEngine을 종료하려면 다음 명령어를 사용합니다.
```sh
docker compose down
```