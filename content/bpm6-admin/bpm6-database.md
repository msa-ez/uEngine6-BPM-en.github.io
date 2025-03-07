---
description: '데이터 관리'
sidebar: 'getting-started'
---

# 데이터 관리 - 데이터베이스
---
uEngine6 BPM은 JPA(Java Persistence API)를 사용하여 데이터베이스를 사용하며, 이 문서에서는 사용하는 2개의 테이블에 대한 DDL과 테이블 및 컬럼에 대한 설명을 포함하고 있습니다. 데이터베이스는 프로세스 실행에 필요한 기본적인 정보를 저장합니다. 파일과 비교하여 데이터베이스는 보다 구조화된 방식으로 정보를 관리합니다.

## BPM_PROCINST
### 테이블 설명
uEngine6 BPM에서 프로세스를 실행하는 하나의 단위인 인스턴스에 대한 정보를 저장하는 테이블 입니다.

### DDL
<details>
  <summary>BPM_PROCINST DDL 문 보기</summary>

```sql
create table bpm_procinst (
    inst_id bigint not null,
    abs_trc_path varchar(255),
    adhoc boolean not null,
    archive boolean not null,
    corr_key varchar(255),
    curr_ep varchar(255),
    curr_rs_nm varchar(255),
    def_id varchar(255),
    def_mod_date timestamp,
    def_name varchar(255),
    def_path varchar(255),
    def_ver_id varchar(255),
    deleted boolean not null,
    dont_return boolean not null,
    due_date timestamp,
    event_handler boolean not null,
    ext1 varchar(255),
    ext2 varchar(255),
    ext3 varchar(255),
    ext4 varchar(255),
    ext5 varchar(255),
    finished_date timestamp,
    info varchar(255),
    init_com_cd varchar(255),
    init_ep varchar(255),
    init_rs_nm varchar(255),
    main_act_trc_tag varchar(255),
    main_def_ver_id bigint,
    main_exec_scope varchar(255),
    main_inst_id bigint,
    mod_date timestamp,
    name varchar(255),
    prev_curr_ep varchar(255),
    prev_curr_rs_nm varchar(255),
    root_inst_id bigint,
    started_date timestamp,
    status varchar(255),
    sub_process boolean not null,
    var_lob blob,
    primary key (inst_id)
)

```

</details>

### 컬럼 설명
| 컬럼명           | 설명               |
|------------------|--------------------|
| inst_id          | 인스턴스 ID        |
| abs_trc_path     | ???     |
| adhoc            | 임시 여부          |
| archive          | 아카이브 여부      |
| corr_key         | 상관 관계 키       |
| curr_ep          | 현재 엔드포인트    |
| curr_rs_nm       | 현재 자원 이름     |
| def_id           | Process Definition ID            |
| def_mod_date     | Process Definition 수정 날짜     |
| def_name         | Process Definition 이름          |
| def_path         | Process Definition 경로          |
| def_ver_id       | Process Definition 버전 ID       |
| deleted          | 삭제 여부          |
| dont_return      | 반환하지 않음 여부 |
| due_date         | 마감일             |
| event_handler    | 이벤트 핸들러 여부 |
| ext1             | 확장 필드 1        |
| ext2             | 확장 필드 2        |
| ext3             | 확장 필드 3        |
| ext4             | 확장 필드 4        |
| ext5             | 확장 필드 5        |
| finished_date    | 인스턴스 종료 날짜          |
| info             | 인스턴스 정보               |
| init_com_cd      | 실행 회사 코드     |
| init_ep          | 실행 엔드포인트    |
| init_rs_nm       | 실행 리소스 네임     |
| main_act_trc_tag | ?? |
| main_def_ver_id  | 메인 Process Definition 버전 ID  |
| main_exec_scope  | 메인 ExecutionScope     |
| main_inst_id     | 메인 인스턴스 ID   |
| mod_date         | 수정 날짜          |
| name             | 인스턴스 명               |
| prev_curr_ep     | 이전 엔드포인트|
| prev_curr_rs_nm  | 이전 리소스 네임|
| root_inst_id     | 루트 인스턴스 ID   |
| started_date     | 인스턴스 시작 날짜          |
| status           | 인스턴스 상태               |
| sub_process      | 서브 프로세스 여부 |
| var_lob          | Lob 변수     |


## BPM_WORKLIST
### 테이블 설명
BPM_WORKLIST 테이블은 업무 목록 정보를 저장하는 테이블입니다.

### DDL
<details>
  <summary>BPM_WORKLIST DDL 문 보기</summary>

```sql
create table bpm_worklist (
    task_id bigint not null,
    abs_trc_tag varchar(255),
    act_type varchar(255),
    def_id varchar(255),
    def_name varchar(255),
    def_ver_id varchar(255),
    delegated boolean,
    description varchar(255),
    dispatch_option integer not null,
    dispatch_param1 varchar(255),
    due_date date,
    end_date date,
    endpoint varchar(255),
    exec_scope varchar(255),
    ext1 varchar(255),
    ext2 varchar(255),
    ext3 varchar(255),
    ext4 varchar(255),
    ext5 varchar(255),
    inst_id bigint,
    parameter varchar(255),
    prev_user_name varchar(255),
    priority binary(255),
    read_date date,
    ref_role_name varchar(255),
    res_name varchar(255),
    role_name varchar(255),
    root_inst_id binary(255),
    save_date date,
    start_date date,
    status varchar(255),
    title varchar(255),
    tool varchar(255),
    trc_tag varchar(255),
    urget boolean,
    process_instance_inst_id bigint,
    primary key (task_id)
)
```
</details>


### 컬럼 설명
| 컬럼명 | 설명 |
|--------|------|
| task_id | 작업 ID |
| abs_trc_tag | 절대 추적 태그 |
| act_type | 활동 유형 |
| def_id | 정의 ID |
| def_name | 정의 이름 |
| def_ver_id | 정의 버전 ID |
| delegated | 위임 여부 |
| description | 설명 |
| dispatch_option | 디스패치 옵션 |
| dispatch_param1 | 디스패치 매개변수 1 |
| due_date | 마감일 |
| end_date | 종료일 |
| endpoint | 엔드포인트 |
| exec_scope | 실행 범위 |
| ext1 | 확장 필드 1 |
| ext2 | 확장 필드 2 |
| ext3 | 확장 필드 3 |
| ext4 | 확장 필드 4 |
| ext5 | 확장 필드 5 |
| inst_id | 인스턴스 ID |
| parameter | 매개변수 |
| prev_user_name | 이전 사용자 이름 |
| priority | 우선 순위 |
| read_date | 읽은 날짜 |
| ref_role_name | 참조 역할 이름 |
| res_name | 자원 이름 |
| role_name | 역할 이름 |
| root_inst_id | 루트 인스턴스 ID |
| save_date | 저장 날짜 |
| start_date | 시작 날짜 |
| status | 상태 |
| title | 제목 |
| tool | 도구 |
| trc_tag | 추적 태그 |
| urget | 긴급 여부 |
| process_instance_inst_id | 프로세스 인스턴스 ID |