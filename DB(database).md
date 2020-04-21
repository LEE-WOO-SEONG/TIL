## DB



Database(DB)란?

: 데이터를 통합하여 관리하는 데이터의 집합.

  데이터베이스란 다수의 사용자가 사용하는 데이터들의 공유와 운영을 위해 저장해 놓는 공간이다.



DBMS(Database Management System)

: 데이터 베이스를 관리하는 미들웨어 시스템으로 데이터 베이스를 관리하는 **관리시스템**이다.



RDBMS(Relational Database Management System)

ex) orcle, mysql, postgresql, sqlite

: 데이터의 테이블 사이에 키값으로 관계를 가지고 있는 데이터 베이스.

- data 저장속도가 느리다. 
- insert가 느리고 select가 빠르다.



#### SQL이란?

: Structured Query Language의 약자로 **RDBMS** 의 데이터를 관리하기 위해 설계된 특수 목적의 프로그래밍 언어이다.

관계형 데이터 베이스 관리 시스템에서 자료의 검색과 관리, 데이터베이스 스키마 생성과 수정,
데이터 베이스 객체 접근 조정 관리를 위해 고안되었다.
많은 수의 데이터베이스 관련 프로그램들이 SQL을 표준으로 채택하고 있다.



##### Query?

**Query**는 ‘문의, 의문’이라는 뜻으로  IT용어로서 Query는 **파일의 내용 등을 알기 위해 몇 개의 코드(code)나 키(key)를 기초로 질의하는 것**을 의미한다.



Query language란 **특수한 응용 프로그램의 도움 없이 데이터베이스를 쉽게 이용할 수 있도록 만든 고수준 언어**를 뜻한다.

 전문적 프로그램 작성자가 아닌 사용자가 데이터베이스를 사용할 수 있도록 한 언어로서 자체적인 질의를 할 수 있는 언어이기에 비절차적이고 독립적이라는 특징을 가지고 있다.

이러한 query language들이 구조적으로 체계화 되어 만들어진 것이 바로 **SQL**이다.



NoSQL

ex) mongodb, hbase, cassandra

: 데이터 테이블 사이의 <u>관계가 없이</u> 데이터를 저장하는 데이터 베이스로 데이터사이의 관계가 없으므로 복잡성이 작고 많은 데이터의 저장이 가능하다.

- insert가 빠르고 select가 느리다.
- 빅데이터의 등장으로 뜨기시작함.



MySQL

- 오픈소스, 다중 사용자와 다중 스레드를 지원.
- 표준 SQL을 사용
- 다양한 프로그래밍 언어 지원
- 작고 강력하며 가격이 저렴하다.



##### URL이란? (Uniform Resource Locators)

: URL은 인터넷에서의 자원의 위치를 일컫는 용어로 웹에 게시된 어떤 자원을 찾기 위해서 browser에 의해 사용되는 메카니즘이다 .



- url의 기본구조

```
http://www.example.com:80/path/to/myfile.html?key1=value1&key2=value2#SomewhereInTheDocument
```

1. http(hypertext transfer protocol)

: http는 프로토콜(통신규약)을 나타내는 용어로 browser가 어떤 규약을 사용해야 하는 지를 나타낸다.

2. domain name

   -> 상기 url에서 `www.example.com` 에 해당하는 부분 

: 어떤 웹 서버가 요구되는 것인지를 가리킨다.

3. port

   -> 상기 url에서 `:80` 에 해당하는 부분

: port는 기술적으로 웹서버에서 자원을 접근하기 위해 사용하는 "관문"을 나타내는 용어이다.

  만약 웹 서버가 자원에 접급하기 위해 표준 port(http :80 / https :443)를 사용한다면 포트 번호는 보통 생략된다. 하지만 해당 경우가 아니라면 포트 번호는 명시해 주어야 한다.

4. path to the file?

   -> 상기 url에서 /path/to/myfile.html

: 웹서버에서 자원에 대한 경로를 나타낸다. 과거에는 물리적 파일위치를 나타냈으나 현재는 서버에서 추상화하여 보여준다,

5. parameter

   -> 상기 url에서 ?key1=value1&key2=value2

: 웹 서버에 제공하는 추가 파라미터로 해당 파라미터들은 `&`기호로 구분된 키/값으로 짝을 이룬 리스트이다.

6. anchor

   -> 상기 url에서 #SomewhereInTheDocument

: 자원 자체의 다른 부분에 대한 anchor(닺)을 나타낸다. 자원 내에서 해당 지점에 위치된 내용을 보여주기 위해 browser에게 방향을 알려주는 역할.



데이터베이스 모델링

1. 개념적 모델링
2. 논리적 모델링
3. 물리적 모델링



SQL 문의 종류

- DML(Data Manipulation Language)

  : 데이터를 직접적으로 조작하는 언어로 데이터의 검색과 수정등을 처리한다.

  ```
  INSERT : 데이터베이스 객체에 데이터를 입력
  UPDATE : 데이터베이스 객체에 데이터를 삭제
  DELETE : 데이터베이스 객체에 데이터를 수정
  SELECT : 데이터베이스 객체에 데이터를 검색
  ```

- DDL(Data Definition Language)

  : 데이터와 그 구조를 정의하는 언어.

  ```
  CREATE 	: 데이터베이스 객체를 생성
  ALTER  	: 데이터베이스 객체를 재정의
  DROP   	: 데이터베이스 객체를 삭제
  RENAME
  TRUNCATE
  COMMENT
  ```

- DCL(Data Control Language)

  : 데이터베이스 사용자의 권한을 제어하는 언어

  ```
  GRANT   : 데이터베이스 객체에 권한을 부여
  REVOKE  : 데이터베이스 객체의 권한을 제거
  ```

  

### Mysql 함수



- join

: 2가지 이상의 테이블을 하나의 새로운 테이블로 모아줄 때 사용한다

1. inner join

2. left join

3. right join

   ![image-20200421131752753](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200421131752753.png)	

- union

: select문의 결과 데이터를 하나로 합쳐서 출력할 때 사용한다. union은 자동으로 중복되는 항목을 제거하여 주는데, 원치 않을 시 union all을 사용하면 된다.

또한 union 사용 시 full outer join을 구현할 수 있다.

- subquery

: query문 안에 있는 query문을 뜻한다.



- view

: 가상테이블 데이터를 보고자 할 때만 사용. 실제로는 데이터를 저장하지 않음.



- index

: 테이블에서 데이터를 검색할 때 빠르게 찾을 수 있게 해주는 기능.

단, 테이블의 저장공간의 10%정도를 더 사용한다는 것과 insert/update/delte 시 쿼리속도가 늦어진다는 단점이 있다.