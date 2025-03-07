---
description: ''
sidebar: 'getting-started'
prev: ''
next: ''
---

# uEngine6 기반 프로젝트 만들기

**먼저, uEngine-default 프로젝트를 복제한다:**

```bash
git clone https://github.com/uengine-oss/uEngine6-bpm
```

**복제한 uEngine-default 프로젝트를 해당 사이트의 프로젝트 명으로 전환한다:**

```bash
mv uEngine6-default someproject
cd someproject
```

**pom.xml 내의 프로젝트에 대한 설명 정보도 바꿔 준다:**


```bash
<groupId>com.company</groupId>
<artifactId>bpm-project</artifactId>
```

**그런다음 빌드를 실시한다:**

```bash
mvn spring-boot:run
```


## 설정 변경과 커스터마이징

**WebConfig.java**

```java
package org.uengine.five;
...

@EnableWebMvc
@Configuration
public class WebConfig extends org.uengine.social.uEngine6WebConfig {


    /**
     * Uncomment and implement if you want to change default storage
     */
//    @Bean
//    @Override
//    public Storage storage() {
//        CLOBStorage storage = new CLOBStorage();
//        storage.setDataSource(dataSource());
//        storage.setTableName("bpm_def");
//
//        return storage;
//    }


    /**
     * Uncomment and add ActivityFilters like following example
     */
//    @Bean
//    public ActivityFilter exampleActivityFilter1() {
//        return new ExampleActivityFilter1();
//    }
//
//    @Bean
//    public ActivityFilter exampleActivityFilter2() {
//        return new ExampleActivityFilter2();
//    }
//

    /**
     * Uncomment and return an implementation of ProcessInstance. default is JPAProcessInstance
     */
//    @Bean
//    @Scope("prototype")
//    @Override
//    public ProcessInstance processInstance(ProcessDefinition procDefinition, String instanceId, Map options) throws Exception {
//        return new CustomProcessInstance(procDefinition, instanceId, options);
//    }

    /**
     * Uncomment and return an real datasource not the H2
     */

    @Bean
    public DataSource dataSource() {
        //In classpath from spring-boot-starter-web
        final Properties pool = new Properties();
        pool.put("driverClassName", "com.mysql.jdbc.Driver");
        pool.put("url", "jdbc:mysql://localhost:3306/uengine?useUnicode=true&characterEncoding=UTF8&useOldAliasMetadataBehavior=true");
        pool.put("username", "root");
        pool.put("password", "");
        pool.put("minIdle", 1);
        try {
            return new org.apache.tomcat.jdbc.pool.DataSourceFactory().createDataSource(pool);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

```
**위의 예제는 각각 저장 매체, 액티비티 필터 설치, 접속데이터베이스 (기본은 H2 DB) 변경에 대한 샘플이다.**

- 예를 들어, 저장매체를 변경한다면,

```java
    @Bean
    @Override
    public Storage storage() {
        AmazonS3Storage storage = new AmazonS3Storage();
        storage.setAmazonS3Bucket("bucketName");
        storage.setAwsAccessKey(ACCESS_KEY);
        storage.setAwsSecretAccessKey(SECRET);
        
        return storage;
    }
```

- 사용할 수 있는 저장매체로는 LocalFileStorage, AmazonS3Storage, CouchbaseStorage 등을 사용할 수 있고, 직접 구현하여 CLOB 기반 저장소, git 버전관리 기반 저장소 등을 만들어 쓰면 된다.

- 액티비티 필터는 하나 이상을 선언해서 쓰면 된다, 호출 순서는 Spring에서 알아서 정할 것이기 때문에 (리플랙션으로) 잘 모르겠다. (헐) :

```java
    @Bean
    public ActivityFilter exampleActivityFilter1() {
        return new ExampleActivityFilter1();
    }

    @Bean
    public ActivityFilter exampleActivityFilter2() {
        return new ExampleActivityFilter2();
    }
```

- 액티비티 필터가 뭐하는 거냐고 묻는다면 모든 프로세스와 액티비티 실행시 거쳐가는 리스너의 개념으로 (프로세스 실행에 제약을 줄 수 있는 권한은 없으므로 어째보면 정확히 필터는 아니고 리스너에 가깝다. 처음에 네이밍을 잘못했네 이사람아..)

```java
package org.uengine.kernel;


/**
 * @author Jinyoung Jang
 */
public interface ActivityFilter extends java.io.Serializable{
	//run-time
	void beforeExecute(Activity activity, ProcessInstance instance) throws Exception;
	void afterExecute(Activity activity, ProcessInstance instance) throws Exception;
	void afterComplete(Activity activity, ProcessInstance instance) throws Exception;
	void onPropertyChange(Activity activity, ProcessInstance instance, String propertyName, Object changedValue) throws Exception;
	
	//deploy time
	void onDeploy(ProcessDefinition definition) throws Exception;
}
```






