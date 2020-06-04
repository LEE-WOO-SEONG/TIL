# 타이머

- Toc

1. [호출 스케줄링](#호출-스케줄링)
2. [타이머 함수](#타이머-함수)

<br>

<br>

## 호출 스케줄링

함수를 명시적으로 호출하면 즉시 실행되지만, 일정 시간이 경가된 이후 호출되도록 호출을 예약하려면 타이머 함수를 사용한다. 이렇게 호출을 **예약** 하는 것을 호출 스케줄링이라 한다.

- 자바스크립트 타이머 함수 종류

1. 타이머 생성 - setTimeOut / setInterval
2. 타이머 제거 - clearTimeOut / clearInterval

타이머 함수는 ECMAScript 사양에 정의된 빌트인 함수가 아닌 브라우저 혹은 Node.js 환경에서 전역객체의 메소드로서 제공되는 **호스트객체**이다.

자바스크립트 엔진은 단 하나의 실행 컨텍스트 스택을 갖기 때문에 두가지 이상의 태스크를 동시에 실행할 수 없다. 즉, 자바스크립트 엔진은 **싱글스레드**로 동작한다.

때문에 타이머 함수는 <strong>비동기적(asynchronous)</strong>으로 동작한다.

> 비동기적?
>
> 어떤 작업을 요청했을 때 작업이 끝날 때가지 기다리지 않고 다른작업을 수행하고 있다가 요청했던 작업이 종료되면 그 작업에 대한 추가작업을 수행하는 방식

<br>

## 타이머 함수

### setTimeout / setInterval

setTimeout 함수는 두번째 인수로 전달한 시간(ms, 1/1000초)이 경과한 이후에 첫번째 인수로 전달한 콜백함수를 <strong>단 한번 호출</strong>한다.

```js
const timeoutId = setTimeout(func|code[, delay, param1, param2, ...]);
```

- 매개변수

1. func

타이머가 **만료**된 이후 호출할 **콜백함수**를 전달한다. 콜백함수는 호출 스케줄링된다. 콜백함수 대신 코드를 **문자열**로 전달할 수 있다. 

이 때 코드 문자열은 타이머가 만료된 뒤 해석되고 실행된다. 이는 흡사 eval함수와 유사하며 권장하는 방식은 아니다.

2. delay

함수를 호출하기까지 지연할 시간을 밀리초(ms) 단위로 전달한다. 인수전달을 생략한 경우 기본값 **0** 이 지정된다.

delay에 전달한 지연시간이 정확히 보장되지는 않는다. 태스크 큐에 콜백함수를 등록하는 시간을 지연할 뿐이다. delay가 4ms 이하인 경우, 최소 지연시간 4ms가 지정된다.

3. param1, parma2, ...

호출 스케줄링된 콜백함수에 전달하여야 할 **인수**가 존재하는 경우 세번째 이후의 인수로 전달할 수 있다. 단, internet Explorer 9이하에서는 콜백함수에 인수를 전달할 수 없다.

```js
setTimeout(() => console.log('hi')), 1000);

setTimeout(name => console.log(`hi ${name}`), 1000, 'lee');

setTimeout(() => console.log('immediately'));
```

setTimeout 함수는 일정시간이 경과한 이후 전달받은 콜백함수를 호출하는 <strong>타이머를 생성하고 생성된 타이머를 식별할 수 있는 고유한 타이머 id값을 반환</strong>한다. setTimeout 함수가 반환하는 타이머 id 값은 브라우저 환경인 경우 **숫자** 이며 Node.js 환경인 경우 **객체**이다.

setTimeout 함수가 반환한 타이머 id를 clearTimeout 함수의 인수로 전달하여 타이머를 취소할 수 있다.

```js
const timeoutId = setTimeout(() => console.log('hi!'), 1000);

clearTimeout(timeoutId);
```

<br>

### setInterval / clearInterval

setInterval 함수는 두번째 인수로 전달한 시간(ms)이 경과할 때마다 첫번째 인수로 전달한 콜백함수를 타이머가 취소될 때 까지 **무한히** 호출한다.

setTimeout과 매개변수는 동일하다.

setInterval 함수가 반환한 타이머 id를  clearInterval 함수의 인수로 전달하여 타이머를 취소할 수 있다.

````js
let const = 1;

const timeoutId = setInterval(() => {
    console.log(count); // 1 2 3 4 5
    
    if (count++ === 5) clearInterval(timeoutId);
}, 1000);
````

