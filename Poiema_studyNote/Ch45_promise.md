# 프로미스

- Toc



<br>

<br>

## 비동기 처리를 위한 콜백패턴의 단점

### 콜백 헬





### 에러처리의 한계







## 프로미스 생성

프로미스는 Promise 생성자 함수를 통해 인스턴스화 한다. Promise 생성자 함수는 비동기 처리를 수행할 콜백함수를 인자로 전달받는데 이 콜백함수는 `resolve`와 `reject` 함수를 인수로 전달받는다.

```js
const promise = new Promise((resolve, reject) => {
    if (/* 비동기 처리 성공 */) {
      resolve('result');
    } else { /* 비동기 처리 실패 */
      reject('failure reason');  
    }
});
```

Promise 생성자 함수가 인수로 전달받은 콜백함수 내부에서 비동기 처리를 수행한다.

비동기 처리가 성공하면 콜백함수의 인수로 전달받은 resolve 함수를 호출하고, 실패하면 reject 함수를 호출한다. 앞서 살펴보았던 비동기 함수 get을 프로미스로 구현 해 보자.

```js
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        
        xhr.onload = () => {
            if(xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(xhr.status));
            }
        };
    });
};

promiseGet('https://jsonplaceholder.typicode.com/posts/1');
```

프로미스로 구현된 비동기 함수는 함수 내부에서 Promise 객체를 생성하고 반환한다. 비동기 처리는 Promise 생성자 함수가 인수로 전달받은 콜백함수 내부에서 수행한다.

만약 비동기 처리에 성공하면 비동기 처리 결과를 resolve 함수에 인수로 전달하면서 호출하고, 비동기 처리에 실패하면 에러를 reject 함수에 인수로 전달하면서 호출한다.

프로미스로 구현된 비동기 함수는 Promise 객체를 반환한다. 반환된 Promise 객체는 비동기 처리가 성공(fullfilled)했는지 또는 실패(rejected)했는지 등의 상태(state) 정보를 갖는다.

| 상태      | 의미                                                         | 구현                                              |
| --------- | ------------------------------------------------------------ | ------------------------------------------------- |
| pending   | 비동기 처리가 아직 수행되지 않은 상태                        | resolve 또는 reject 함수가 아직 호출되지 않은상태 |
| fulfilled | 비동기 처리가 수행된 상태 (성공)                             | resolve 함수가 호출된 상태                        |
| rejected  | 비동기 처리가 수행된 상태 (실패)                             | reject 함수가 호출된 상태                         |
| settled   | fullfilled 또는 rejected와 상관없이 pending 이 아닌 상태, 즉 비동기 처리가 수행된 상태 | resolve 또는 reject 함수가 호출된 상태            |

Promise 객체의 상태정보는 resolve 또는 reject 함수를 호출하는 것으로 결정된다. resolve 또는 reject 함수를 호출할 때 전달한 비동기 처리결과 또는 에러는 Promise 객체의 후속처리 메서드에게 전달된다. 

<br>

## 프로미스의 후속처리 메서드

프로미스로 구현된 비동기 함수는 Promise 객체를 반환해야 한다. 프로미스로 구현된 비동기 함수를 호출하는 측(promise consumer)에서는 Promise 객체의 후속처리 메서드인 `then`, `catch`, `finally`를 통해 비동기처리 결과 또는 에러 메시지를 전달받아 후속처리를 수행한다.

Promise 객체는 비동기처리가 성공(fullfilled)했는지 또는 실패(rejected)했는지 등의 상태정보를 갖는다고 했다. 이 상태정보에 따라 후속 처리 메서드를 <strong>체이닝 방식</strong>으로 호출한다.

- Promise.prototype.then

then 메서드는 **두개**의 콜백함수를 인수로 전달받는다. 첫번째 콜백함수는 프로미스가 fulfilled 된 상태(resolve 함수가 호출된 상태)일 때 호출되고, 두번쨰 콜백함수는 프로미스가 rejected 상태(reject 함수가 호출된 상태)일 때 호출된다. then 메서드는 언제나 Promise 객체를 반환한다. then 메서드의 콜백함수가 Promise 객체가 아닌 값을 반환하면 그 값을 resolve 또는 reject 하여 Promise 객체를 반환한다. 

```js
new Promise(resolve => resolve('fulfilled'))
	.then(v => console.log(v), e => console.error(e)); // fulfilled

new Promise((_, reject) => reject(new Error('rejected')))
	.then(v => console.log(v), e => console.error(e)); // Error: rejected
```

- Promise.prototype.catch

cath 메서드는 한 개의 콜백함수를 인수로 전달받는다. catch 메서드의 콜백함수는 예외(비동기 처리에서 발생한 에러, then 메서드에서 발생한 에러)가 발생하면 호출된다. catch 메서드는 then(undefined, onRejected)과 동일하게 동작한다. 따라서 then 메서드와 마찬가지로 언제나 Promise 객체를 반환한다.

```js
new Promise((_, reject) => reject(new Error('rejected'))
    .catch(e => console.log(e)); // Error: rejected
```

- Promise.prototype.finally

finally 메서드는 한 개의 콜백함수를 인수로 전달받는다. finally 메서드의 콜백함수는 프로미스의 성공 또는 실패와 상관없이 무조건 한 번 호출된다. finally 메서드는 프로미스의 상태와 상관없이 공통적으로 수행해야할 일을 처리해야할 때 유용하다. finally 메서드도 then, catch와 마찬가지로 Promise 객체를 반환한다. finally 메서드는 현재 TC39 staget 4에 제안되어 있으며 IE를 제외한 대부분의 브라우저에서 지원하고 있다.

```JS
new Promise(() => {})
	.finally(() => console.og('finally')); // finally
```

- 프로미스로 구현한 비동기함수의 후속처리 구현

```js
const promiseGet = url => {
    return new Promise((resolve, reject) => {
        const xhr = XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        
        xhr.onload = () => {
            if (xhr.status === 200) {
                resolve(JSON.parse(xhr.response));
            } else {
                reject(new Error(xhr.status));
            }
        }
    })
}

promiseGet('https://jsonplaceholder.typicode.com/posts/1')
	.then(res => console.log(res))
	.catch(err => console.error(err))
	.finally(() => console.log('bye'));
```

<br>

## 프로미스의 에러처리

위 예제의 비동기 함수 get은 Promise 객체를 반환한다. 비동기 처리 결과에 대한 후속처리는 Promise 객체가 제공하는 후속처리 메서드 then, catch, finally를 사용하여 수행한다.

```js
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

PromiseGet(wrongUrl)
	.then(res => console.log(res), err => console.error(err));
// Error: 404
```

비동기 처리 시, 발생한 에러는 Promise 객체의 후속처리 메서드 catch를 사용햇 처리할 수도 있다.

```js
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

PromiseGet(wrongUrl)
	.then((res) => console.err(res))
	.catch(err => console.err(err));
// Error: 404
```

catch 메서드를 호출하면 내부적으로 then 메서드를 호출한다.

```js
const wrongUrl = 'https://jsonplaceholder.typicode.com/XXX/1';

PromiseGet(wrongUrl)
	.catch(err => console.err(err));

// 위 표현은 아래와 같다.

PromiseGet(wrongUrl)
	.then((undefined, err) => console.err(err));
```

catch 메서드는 에러를 처리한다는 점에서 then 메서드의 두 번째 콜백함수와 동일하지만 미묘한 차이가 있다. then 메서드의 두 번째 콜백함수는 비동기 처리에서 발생한 에러(reject 함수가 호출된 상태)만을 캐치한다. 즉, then 메서드 내부의 에러를 캐리하지 못한다.

```js
promiseGet('https://jsonplaceholder.typicode.com/todos/1')
	.then(res => console.x(res), err => console.error(err));

// 두 번째 콜백함수는 첫 번째 콜백함수에서 발생한 에러를 캐치하지 못한다.
```

하지만 catch 메서드는 비동기 처리에서 발생한에러(reject 함수가 호출된 상태)뿐 아니라 then 메서드 내부에서 발생한 에러 또한 캐치할 수 있다.

```js
promiseGet('https://jsonplaceholder.typicode.com/todos/1')
	.then(res => console.x(res))
	.catch(e => console.error(e));
// TypeError: console.x is not a function
```

따라서 에러처리는 then의 2번째 인수 보다는 catch 메서드를 사용하는 것이 더 효율적이다.

<br>

## 프로미스 체이닝

비동기 함수의 처리결과를 가지고 다른 비동기 함수를 호출해야 하는 경우, 비동기 함수의 호출이 중첩되어 복잡도가 높아지는 콜백 헬이 발생한다. Promise 객체를 반환한 비동기 함수는 프로미스 후속처리 메서드인 then, catch, finally 메서드를 사용할 수 있다. 이 후속처리 메서드는 모두 Promise 객체를 반환한다. 따라서 후속 처리 메서드를 체이닝하여 호출이 가능하다.

```js
const url = 'https://jsonplaceholder.typicode.com';

promiseGet(`${url}/posts/1`)
	.then(({ userId }) => promiseGet(`${url}/users/${userId}`)
    .then(userInfo => console.log(userInfo))
    .catch(err => console.err(err));
```

<br>

## 프로미스의 정적 메서드

Promise는 주로 생성자 함수로 사용되지만 함수도 객체이므로 메서드를 가질 수 있다. Promise 객체는 5가지 정적 메서드를 제공한다.

### Promise.resolve / Promise.reject

Promise.resolve와 Promise.reject 메서드는 이미 존재하는 값을 래핑하여 Promise 객체를 생성하기 위해 사용한다.

정적 메서드 Promise.resolve 메서드는 인자로 전달된 값을 resolve 하는 Promise 객체를 생성한다.

```js
const resolvedPromise = promise.resolve([1, 2, 3]);
resolvedPromise.then(console.log); // [1, 2, 3]

// 아래와 위는 동일하다.

constresolvedPromise = new Promise(resolve => resolve([1, 2, 3]));
resolvedPromise.then(console.log) // [1, 2, 3]
```

Promise.reject 메서드는 인자로 전달된 값을 reject하는 Promise 객체를 생성한다.

```js
const rejectedPromise = Promise.reject(new Error('Error!'));
rejectedPromise.catch(console.log); // Error: Error!

// 아래와 위는 동일하다.

const rejectedPromise = new Promise((_, reject) => reject(new Error('Error!')));
rejectedPromise.catch(console.log); // Error: Error!
```

### Promise.all

Promise.all 메서드는 Promise 객체를 요소로 갖는 배열 등의 **이터러블**을 인자로 전달받는다. 전달받은 모든 Promise 객체를 모두 연속적으로 처리하고, 그 처리결과를 resolve 하는 새로운 프로미스를 반환한다.

```js
promise.all([
    new Promise(resolve => setTimeout(() => resolve(1), 3000)),
    new Promise(resolve => setTimeout(() => resolve(2), 2000)),
    new Promise(resolve => setTimeout(() => resolve(3), 1000))
]).then(console.log) // [1, 2, 3]
  .catch(console.error);
```

Promise.all 메서드는 3개의 Promise 객체를 요소로 갖는 배열을 전달받았다. 각각의 Promise 객체는 다음과 같이 동작한다.

- 첫 번째 Promise 객체는 3초 후에 1을 resolve하여 처리 결과를 반환한다.
- 두 번째 Promise 객체는 2초 후에 2을 resolve하여 처리 결과를 반환한다.
- 세 번째 Promise 객체는 1초 후에 3을 resolve하여 처리 결과를 반환한다.

Promise.all 메서드는 전달받은 모든 Promise 객체를 연속적으로 처리한다. <strong>Promise.all은 배열 내 모든 Promise 객체의 resolve 또는 첫 번째 reject를 기다린다.</strong>

모든 Promise 객체의 처리가 성공하면 모든 Promise 객체가 resolve한 처리 결과를 배열에 담아 resolve하는 새로운 Promise 객체를 반환한다. 이때 첫 번째 Promise 객체가 가장 나중에 처리되어도 Promise.all 메서드가 반환하는 Promise 객체는 첫 번째 Promise 객체가 resolve한 처리 결과부터 차례대로 배열에 담아 그 배열을 resolve하는 새로운 Promise 객체를 반환한다. 즉, <strong>처리 순서가 보장된다.</strong>

Promise 객체의 처리가 하나라도 실패하면 <strong>가장 먼저 실패한 Promise 객체가 reject한 에러를 reject하는 새로운 Promise 객체를 즉시 반환한다.</strong>

```js
Promise.all([
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error1')), 3000)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error2')), 2000)),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error3')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3
```

Promise.all 메서드는 인수로 전달받은 이터러블의 요소가 Promise 객체가 아닌 경우 Promise.resolve 메서드를 통해 Promise 객체로 래핑된다.

```js
Promise.all([
    1, // Promise.resolve(1)
    2, // Promise.resolve(2)
    3  // Promise.resolve(3)
]).then(console.log) // [1, 2, 3]
  .catch(console.log);
```

### Promise.race

Promise.race 메서드는 Promise.all 메서드와 동일하게 Promise 객체를 요소로 갖는 배열 등의 **이터러블**을 인자로 전달받는다. Promise.race 메서드는 Promise.all 메서드처럼 모든 Promise 객체를 연속적으로 처리하는 것이 아니라 <strong>가장 먼저 처리된</strong> Promise 객체가 resolve한 처리 결과를 resolve하는 <strong>새로운 Promise 객체를 반환한다.</strong>

```js
Promise.race([
    new Promise(resolve => setTimeout(() => resolve(1)), 3000),
    new Promise(resolve => setTimeout(() => resolve(2)), 2000),
    new Promise(resolve => setTimeout(() => resolve(3)), 1000)
]).then(console.log) // 3
  .catch(console.log);
```

에러가 발생한 경우는 Promise.all 메서드와 동일하게 처리된다. 즉, Promise.race 메서드에 전달된 Promise 객체의 처리가 하나라도 실패하면 가장 먼저 실패한 Promise 객체가 reject한 에러를 reject하는 새로운 Promise 객체를 즉시 반환한다.

```js
Promise.race([
  new Promise((_, reject) => setTimeout(() => reject(new Error('Error 1')), 3000)),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Error 2')), 2000)),
  new Promise((_, reject) => setTimeout(() => reject(new Error('Error 3')), 1000))
]).then(console.log)
  .catch(console.log); // Error: Error 3
```

### Promise.allSettled

Promise.allSettled 메서드는 Promise 객체를 요소로 갖는 배열 등의 이터러블을 인자로 전달받는다. 그리고 전달받은 모든 Promise 객체를 모두 연속적으로 처리하고 그 처리결과를 **배열**로 반환한다.

```js
Promise.allSettled([
    new Promise(resolve => setTimeout(() => resolve(1)), 2000),
    new Promise((_, reject) => setTimeout(() => reject(new Error('Error')), 1000)
]).then(console.log);
/*
[
  {status: "fulfilled", value: 1},
  {status: "rejected", reason: Error: Error! at <anonymous>:3:60}
]
*/
```

Promise.allSettled 메서드가 반환한 배열에는 fulfilled 또는 rejeted 상태와는 상관없이 Promise.allSettled 메서드가 인수로 전달받은 모든 Promise 객체들의 처리 결과가 담겨있다.

모든 Promise 객체의 처리결과를 나타내는 객체는 Promise 객체가 fulfilled 상태인 경우 처리상태를 나타내는 status 프로퍼티와 처리결과를 나타내는 value 프로퍼티를 갖는다. Promise 객체가 rejected 상태인 경우 처리상태를 나타내는 status 프로퍼티와 에러를 나타내는 reason 프로퍼티를 갖는다.

Promise.allSettled 메서드는 TC39 프로세스의 stage 4에 제안되어 있다. IE를 제외한 대부분의 브라우저에서 지원하고 있다.

<br>

## 마이크로 태스크 큐

```js
setTimeout(() => console.log(1), 0);

Promise.resolve()
	.then(() => console.log(2))
	.then(() => console.log(3));
```

프로미스의 후속처리 메서드의 콜백함수는 태스크 큐가 아닌 마이크로 태스크큐에 저장된다.

마이크로 태스크큐는 태스크큐와는 별도의 큐로 프로미스의 후속 처리 메서드의 콜백함수가 일시 저장된다. 그 외의 비동기 처리함수의 콜백함수나 이벤트 핸들러는 태스크 큐에 일시 저장된다. 

마이크로 태스크 큐는 콜백함수나 이벤트 핸들러를 일시 저장하는 점에서 태스크 큐와 동일하지만 <strong>마이크로 태스크 큐는 태스크 큐보다 우선순위가 높다.</strong>

즉, 이벤트 루프는 콜 스택이 비면 마이크로태스크 큐에서 대기하고 있는 콜백함수나 이벤트 핸들러를 가져와 실행한 후 태스크 큐에서 대기하고 있는 함수를 그 다음에 실행한다.

<br>

## fetch

fetch 함수는 XMLHttpRequest 객체와 마찬가지로 <strong>HTTP 요청 전송 기능</strong>을 제공하는 클라이언트 사이드 Web API이다. fetch 함수는 XMLHttpRequest 객체보다 사용법이 간단하고 <strong>프로미스를 지원</strong>하기 때문에 비동기 처리를 위한 콜백 패턴의 단점에서 자유롭다. fetch 함수는 비교적 최근에 추가된 Web API로서 IE를 제외한 대부분의 브라우저에서 제공된다.

fetch 함수에는 HTTP 요청을 전송할 **URL**과 HTTP 요청 **메서드**, HTTP 요청 **헤더**, **페이로드** 등을 설정한 **객체**를 전달한다.

```JS
const promise = fetch(url [, options])
```

fetch 함수는 HTTP 응답을 나타내는 Resopnse 객체를 래핑한 Promise 객체를 반환한다.

fetch 함수에 첫번쨰 인수로 HTTP 요청을 전송할 URL만을 전달하면 GET 요청을 전송한다.

```JS
fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => console.log(response));
```

fetch 함수는 HTTP 응답을 나타내는 Response 객체를 래핑한 프로미스를 반환하므로 후속 처리 메서드 then을 통해 프로미스가 resolve한 Response 객체를 전달받을 수 있다. Response 객체는 HTTP 응답을 나타내는 다양한 프로퍼티를 제공한다.

Response.prototype에는 Response 객체에 포함되어 있는 HTTP 응답 몸체(BODY)를 위한 다양한 메서드를 제공한다.  예를 들어, fetch 함수가 반환한 프로미스가 래핑하고 있는 HTTP 응답 몸체를 취득하려면 Response.prototype.json 메서드를 사용한다. `Response.prototype.json` 메서드는 Response 객체에서 HTTP 응답 몸체(response.body)를 취득하여 역직렬화 한다.

```JS
fetch('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => response.json())
	.then(json => console.log(json));
```

```js
const request = {
    get(url) {
        return fetch(url);
    }
  },
    post(url, payload) {
        return fetch(url, {
            method: 'POST',
            headers: { 'content-type' : 'application/json'}
            body: JSON.stringify(payload)
        });
  },
    patch(url, payload) {
        return fetch(url, {
            method: 'PATCH',
            header: { 'content-type' : 'application/json' }
            body: JSON.stringify(payload)
        });
  },
    delete(url) {
        return fetch(url, { method: 'DELETE' })
  }
};
```

1. get 요청

```js
request.get('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => response.json())
	.then(todos => console.log(todos))
	.catch(err => console.error(err));
```

2. post 요청

```js
request.post'(https://jsonplaceholder.typicode.com/todos/1', {
    userId: 1,
    title: 'JavaScript',
    completed: false
}).then(response => response.json())
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
```

3. patch 요청

```js
request.patch('https://jsonplaceholder.typicode.com/todos/1', {
    completed: true
}).then(response => response.json())
  .then(todos => console.log(todos))
  .catch(err => console.error(err));
```

4. DELETE 요청

```js
request.delete('https://jsonplaceholder.typicode.com/todos/1')
	.then(response => response.json());
	.then(todos => console.log(todos))
	.catch(err => console.error(err));
```

