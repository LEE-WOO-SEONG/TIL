# Ajax

- Toc

1. [Ajax 란?](#ajax-란)
2. [JSON](#json)
3. [XMLHttpRequest](#xmlhttprequest)
4. [HTTP 응답처리](#http-응답처리)

<br>

<br>

## Ajax 란?

Asynchronous Javascript and xml 의 약자로 비동기적 방식으로 브라우저가 가지고있는 wep API인 XMLHttpRequset 객체를 이용해서 전체 페이지를 새로 고치지 않고도 페이지의 일부만을 위한 데이터를 로드하는 기법을 말한다.

이전의 웹페이지는 서버로부터 완전한 HTML을 전송받아 웹 페이지 전체를 처음부터 다시 렌더링하는 방식으로 동작하였었다.

- 전통적 웹페이지 통신방법의 단점

1. 변경이 없는 부분까지 포함된 HTML을 서버로부터 매번 다시 전송받기 때문에 불필요한 데이터 통신이 발생한다.
2. 변경이 필요없는 부분까지 처음부터 다시 렌더링해야한다.
3. 클라이언트와 서버와의 통신이 <strong>동기적 방식</strong>으로 동작하여 서버로부터 응답이 있을 때까지 다음처리가 **블로킹**된다.

ajax는 서버로부터 웹페이지의 변경에 <strong>필요한 데이터만</strong>을 **비동기적** 방식으로 전송받아 웹 페이지의 변경이 필요없는 부분은 다시 렌더링하지 않고, 변경이 필요한 부분만을 한정적으로 렌더링한다. 때문에 웹 브라우저 또한 데스크톱 애플리케이션과 유사한 빠른 퍼포먼스와 부드러운 화면전환이 가능해졌다.

- ajax 통신방법의 장점

1. 변경이 필요한 부분만을 갱신하기위한 데이터만 전송받아 불필요한 데이터 통신이 발생하지 않음.
2. 변경이 필요없는 부분은 다시 렌더링하지 않는다.(화면 깜빡임 없음.)
3. 클라이언트와 서버와의 통신이 비동기적 방식으로 동작하여 서버에게 요청을 보낸 후 다른처리를 수행할 수 있다.

<br>

## JSON

Javascript object nodation의 약자로 클라이언트와 서버간의 통신을 위한 텍스트 데이터 포맷을 지칭한다. 자바스크립트에 종속되지 않는 언어 독립형 데이터 포맷으로 대부분의 프로그래밍 언어에서 사용이 가능하다.

### JSON 표기방식

JSON의 자바스크립트의 객체 리터럴과 유사하게 키, 값으로 구성된 순수한 텍스트이다.

```JS
{
    "name": "lee",
    "age": 20,
    "hobby": ["Listening", "studying"]
}
```

JSON의 키는 반드시 <strong>큰 따옴표</strong>로 묶어야한다. 값은 객체리터럴과 같은 표기법을 그대로 사용할 수 있다. 하지만 문자열은 반드시 **큰따옴표**로 묶어야 한다.

### JSON.stringify

객체를 JSON 포맷의 문자열로 변환하는 메소드이다. 클라이언트가 서버로 객체를 전송하려면 객체를 문자열화 하여야 하는데 이를 직렬화(Serializing)라 한다.

직렬화는 객체를 전송가능한 형태로 변형하는 것을 말한다.

```js
const obj = {
    name: "lee",
    age: 20,
    hobby: ['Listening', 'studying']
};

const json = JSON.stringify(obj);
console.log(typeof json, json)
// string "{"name":"lee","age":20,"hobby":["Listening","studying"]}"

const prettyJson = JSON.stringify(obj, null, 2);
console.log(typeof prettyJson, prettyJson);
/*
string {
  "name": "Lee",
  "age": 20,
  "alive": true,
  "hobby": [
    "traveling",
    "tennis"
  ]
}
*/

function filter(key, value) {
  return typeof value === 'number' ? undefined : value;
}

// 객체 => JSON 형식의 문자열 + replacer + prettify
const strFilteredObject = JSON.stringify(obj, filter, 2);
console.log(typeof strFilteredObject, strFilteredObject);
/*
string {
  "name": "Lee",
  "alive": true,
  "hobby": [
    "traveling",
    "tennis"
  ]
}
*/
```

JSON.stringify 메소드는 객체 뿐아니라 배열도 JSON 포맷의 문자열로 변환한다.

```js
const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

const json = JSON.stringify(todos, null, 2);
"[
  {
    "id": 1,
    "content": "HTML",
    "completed": false
  },
  {
    "id": 2,
    "content": "CSS",
    "completed": true
  },
  {
    "id": 3,
    "content": "Javascript",
    "completed": false
  }
]"
```

### JSON.parse

JSON 포맷의 문자열을 객체로 변환한다. 서버로부터 클라이언트에게 전송된 JSON 데이터는 문자열이다. 문자열을 객체로 사용하려면 JSON 포맷의 문자열을 객체화하여야 하는데, 이를 역직렬화(deserializing)이라 한다. 역직렬화는 전송된 문자열을 다시 객체로 복원하는 것을 의미한다.

```js
const obj = {
  name: 'Lee',
  age: 20,
  alive: true,
  hobby: ['traveling', 'tennis']
};

const json = JSON.stringify(obj);

const parsed = JSON.parse(json);
console.log(typeof parsed, parsed);

// object {name: "Lee", age: 20, alive: true, hobby: ["traveling", "tennis"]}
```

배열이 JSON 포맷의 문자열로 변환되어 있는 경우, JSON.parse는 문자열을 배열 객체로 변환한다. 배열의 요소가 객체인 경우, 배열의 요소까지 객체로 변환한다.

```js
const todos = [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
];

const json = JSON.stringify(todos);

const parsed = JSON.parse(json);
console.log(typeof parsed, parsed);

/*
 object [
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
]
*/
```

<br>

## XMLHttpRequest

브라우저는 주소창이나 HTML의 form 태그 또는 a 태그를 통해 HTTP 요청전송기능을 기본제공한다. 자바스크립트를 사용하여 HTTP 요청을 전송하려면 XMLHttpRequest 객체를 사용한다.

Web API인 XMLHttpRequest 객체는 HTTP 요청 전송과 HTTP 응답 수신을 위한 다양한 메소드와 프로퍼티를 제공한다.

### XMLHttpRequest 객체생성

XMLHttpReuqest 객체는 XMLHttpRequest 생성자함수를 호출하여 생성한다.

```js
const xhr = new XMLHttpRequest();
```

- XMLHttpRequest의 프로퍼티와 메소드

| 프로토타입 프로퍼티 | 설명                                                         |
| ------------------- | ------------------------------------------------------------ |
| readyState          | 요청의 현상태를 나타내는 정수. 이하의 XMLHttpRequest의 정적프로퍼티를 값으로 갖는다.<br />UNSET: 0<br />OPENED: 1<br />HEADERS_RECEIVED: 2<br />LOADING: 3<br />DONE: 4 |
| status              | 요청에 대한 응답상태를 나타내는 정수                         |
| statusText          | 요청에 대한 응답메시지를 나타내는 문자열                     |
| responseType        | 응답타입 (ex. document, json, blob...)                       |
| response            | 요청에 대한 응답 몸체로 response Type에 따라 다르다.         |
| responseText        | 서버가 전송한 요청에 대한 응답 문자열                        |

| 이벤트 핸들러 프로퍼티 | 설명                                               |
| ---------------------- | -------------------------------------------------- |
| onreadystatechange     | readyState 프로퍼티 값이 변경된 경우               |
| onloadstart            | 요청에대한 응답을 받기 시작한 경우                 |
| onabort                | abort 메소드에 의해 요청이 중단되었을 경우         |
| onerror                | 요청에 에러가 발생한 경우                          |
| onprogress             | 요청에 대한 응답을 받는 도중 주기적으로 발생       |
| onload                 | 요청이 성공적으로 완료된 경우                      |
| ontimeout              | 요청시간이 초과한 경우                             |
| onloadend              | 요청이 완료된 경우, 요청이 성고 또는 실패하면 발생 |

| 메소드            | 설명                                       |
| ----------------- | ------------------------------------------ |
| open              | HTTP 요청 초기화                           |
| send              | HTTP 요청 전송                             |
| abort             | 이미 전송된 HTTP 요청 중단                 |
| setRequestHeader  | HTTP 요청헤더의 값을 설정                  |
| getResponseHeader | 지정한 HTTP 요청 헤더의 값을 문자열로 반환 |

| 정적프로퍼티     | 값   | 설명                  |
| ---------------- | ---- | --------------------- |
| UNSET            | 0    | open 메소드 호출 이전 |
| OPENED           | 1    | open 메소드 호출 이후 |
| HEADERS_RECEIVED | 2    | send 메소드 호출 이후 |
| LOADING          | 3    | 서버 응답 중          |
| DONE             | 4    | 서버 응답 완료        |

<br>

### HTTP 요청 전송

HTTP 요청을 전송하는 경우, 아래 순서를 따른다.

1. XMLHttpRequest.prototype.open 메소드로 HTTP 요청 초기화
2. 필요에 따라 XMLHttpRequest.prototype.setRequestHeader 메소드로 HTTP 요청의 헤더값 설정
3. XMLHttpRequest.prototype.send 메소드로 HTTP 요청 전송

````JS
const xhr = new XMLHttpRequest();

xhr.open('GET', '/users');

xhr.setRequestHeader('content-type', 'application/json');

xhr.send();
````

#### XMLHttpRequest.prototype.open

open 메소드는 서버에게 전송할 HTTP 요청을 초기화한다. open 메소드의 호출방법은 아래와 같다.

````js
xhr.open(method, url[, async])
````

| 매개변수 | 설명                                                         |
| -------- | ------------------------------------------------------------ |
| method   | HTTP 요청 메소드('GET', 'POST', 'PUT', 'DELETE' 등)          |
| url      | HTTP 요청을 전송할 URL                                       |
| async    | 비동기 요청여부, 옵션으로 기본값은 true이며 비동기 방식으로 동작한다. |

HTTP 요청 메소드는 클라이언트가 서버에게 요청의 종류와 목적(리소스에 대한 행위)을 알리는 방법으로 주로 5가지의 요청메소드(GET/POST/PUT/PATCH/DELETE)를 사용하여 CRUD를 구현한다.

| HTTP 요청 메소드 | 종류           | 목적                  | 페이로드 |
| ---------------- | -------------- | --------------------- | :------: |
| GET              | index/retrieve | 모든/특정 리소스 취득 |    x     |
| POST             | create         | 리소스 생성           |    o     |
| PUT              | replace        | 리소스 전체 교체      |    o     |
| PATCH            | modify         | 리소스 일부 수정      |    o     |
| DELETE           | delete         | 모든/특정 리소스 삭제 |    x     |

> 페이로드란?(payload)
>
> payload란 전송되는 **데이터**를 의미한다. 데이터를 전송할 때, 헤더와 메타데이터/ 에러체크비트 등과 같은 다양한요소들을 함께 보내어 데이터 전송의 효율과 안정성을 높히게 되는데, 이 때 보내고자 하는 **데이터자체**를 의미하는 것이 페이로드이다.

#### XMLHttpRequest.prototype.send

send 메소드는 open 메소드로 초기화된 HTTP 요청을 서버에 전송한다. 기본적으로 서버로 전송하는 데이터는 GET, POST 요청 메소드에 따라 그 전송방식에 차이가 있다.

- GET 요청메소드의 경우, 데이터를 URL의 일부분인 쿼리 문자열로 서버로 전송한다.
- POST 요청 메소드의 경우, 데이터(페이로드)를 요청 몸체에 담아 전송한다.

send 메소드에는 요청몸체에 담아 전송할 데이터(페이로드)를 인수로 전달할 수 있다. 페이로드가 객체인 경우, 반드시 JSON.stringify 메소드를 사용하여 직렬화한 다음 전달해야 한다.

```js
xhr.send(JSON.stringify([
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
]))
```

단, HTTP 요청메소드가 GET인 경우, send 메소드에 페이로드로 전달한 인수는 무시되고 요청 몸체는 null로 설정된다.

#### XMLHttpRequest.prototype.setRequestHeader

setRequestHeader 메소드는 HTTP 요청의 헤더 값을 설정한다. setRequestHeader 메소드는 반드시 open 메소드 호출 이후에 호출해야 한다.

- content-type은 요청몸체에 담아 전송할 데이터의 MIME-type의 정보를 표현한다.

| MIME-type   | 서브타입                                            |
| ----------- | --------------------------------------------------- |
| text        | text/plain, text/html, text/css, text/javascript    |
| application | application/json, application/x-www-form-url-encode |
| multipart   | multipart/formed-data                               |

```js
const xhr = new XMLHttpRequest();

xhr.open('POST', '/users');

xhr.setRequestHeader('content-type', 'application/json');

xhr.send(JSON.stringify([
  { id: 1, content: 'HTML', completed: false },
  { id: 2, content: 'CSS', completed: true },
  { id: 3, content: 'Javascript', completed: false }
]));
```

HTTP 클라이언트가 서버에 요청할 때 서버가 센드백할 데이터의 MIME-type을 Accept로 지정할 수 있다.

````js
xhr.setRequestHeader('accept', 'appication/json');
````

<br>

## HTTP 응답처리

서버가 전송한 응답을 처리하려면 XMLHttpRequest 객체가 발생시키는 이벤트를 캐치해야 한다. XMLHttpRequest 객체가 가진 이벤트 핸들러 프로퍼티 중 readyState 프로퍼티 값이 변경된 경우 발생하는 readystatechange 이벤트를 개키하려 http 응답을 처리할 수 있다.

```js
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1')

xhr.send();

xhr.onreadystatechange = () => {
    if (xhr.readyState !== XMLHttpRequest.DONE) return;
    
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response))
    } else {
        console.log('Error', xhr.satus, xhr.statusText)
    }
}
```

readystatechange 이벤트 대신 load 이벤트를 캐치하여 사용할 수도 있다. load 이벤트는 요청이 성공적으로 **완료**된 경우에만 발생한다. 따라서 load 이벤트를 캐치하는 경우 xhr.readyState가 XMLHttpRequest.DONE인지 확인할 필요가 없다.

```JS
const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://jsonplaceholder.typicode.com/todos/1')

xhr.send();

xhr.onload = () => {
    if (xhr.status === 200) {
        console.log(JSON.parse(xhr.response));
    } else {
        console.error('Error', xhr.status, xhr.statusText)
    }
};
```



