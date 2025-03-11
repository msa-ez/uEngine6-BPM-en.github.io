---
description: '데이터 관리'
sidebar: 'getting-started'
---

# Data Management - Database
---
uEngine6 BPM uses JPA (Java Persistence API) to use the database, and this document includes DDL for the two tables used and descriptions of the tables and columns. The database stores basic information necessary for process execution. Compared to files, the database manages information in a more structured way.

## BPM_PROCINST
### Table Description
This is a table that stores information about instances, which are the units for executing processes in uEngine6 BPM.

### DDL
<details>
  <summary>View BPM_PROCINST DDL statement</summary>

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

### Column Description
| Column name           | Description               |
|------------------|--------------------|
| inst_id          | Instance ID        |
| abs_trc_path     | ???     |
| adhoc            | Temporary flag         |
| archive          | Archive flag      |
| corr_key         | Correlation key     |
| curr_ep          | Current endpoint    |
| curr_rs_nm       | Current resource name     |
| def_id           | Process Definition ID            |
| def_mod_date     | Process Definition modification date     |
| def_name         | Process Definition name          |
| def_path         | Process Definition path          |
| def_ver_id       | Process Definition version ID       |
| deleted          | Deletion flag          |
| dont_return      | No return flag |
| due_date         | Due date             |
| event_handler    | Event handler flag |
| ext1             | Extension field 1        |
| ext2             | Extension field 2        |
| ext3             | Extension field 3        |
| ext4             | Extension field 4        |
| ext5             | Extension field 5        |
| finished_date    | Instance end date          |
| info             | Instance information               |
| init_com_cd      | Execution company code     |
| init_ep          | Execution endpoint    |
| init_rs_nm       | Execution resource name     |
| main_act_trc_tag | ?? |
| main_def_ver_id  | Main Process Definition version ID  |
| main_exec_scope  | Main ExecutionScope     |
| main_inst_id     | Main Instance ID   |
| mod_date         | Modification date          |
| name             | Instance name               |
| prev_curr_ep     | Previous endpoint|
| prev_curr_rs_nm  | Previous resource name|
| root_inst_id     | Root instance ID   |
| started_date     | Instance start date          |
| status           | Instance status               |
| sub_process      | Subprocess flag |
| var_lob          | Lob variable     |


## BPM_WORKLIST
### Table Description
The BPM_WORKLIST table is a table that stores task list information.

### DDL
<details>
  <summary>View BPM_WORKLIST DDL statement</summary>

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


### Column Description
| Column name | Description |
|--------|------|
| task_id | Task ID |
| abs_trc_tag | Absolute tracking tag |
| act_type | Activity type |
| def_id | Definition ID |
| def_name | Definition name |
| def_ver_id | Definition version ID |
| delegated | Delegation flag |
| description | Description |
| dispatch_option | Dispatch option |
| dispatch_param1 | Dispatch parameter 1 |
| due_date | Due date |
| end_date | End date |
| endpoint | Endpoint |
| exec_scope | Execution scope |
| ext1 | Extension field 1 |
| ext2 | Extension field 2 |
| ext3 | Extension field 3 |
| ext4 | Extension field 4 |
| ext5 | Extension field 5 |
| inst_id | Instance ID |
| parameter | Parameter |
| prev_user_name | Previous username |
| priority | Priority |
| read_date | Read date |
| ref_role_name | Reference role name |
| res_name | Resource name |
| role_name | Role name |
| root_inst_id | Root instance ID |
| save_date | Save date |
| start_date | Start date |
| status | Status |
| title | Title |
| tool | Tool |
| trc_tag | Tracking tag |
| urget | Urgency flag |
| process_instance_inst_id | Process Instance ID |