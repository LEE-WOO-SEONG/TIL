### 비동기 처리



##### 동기적이란? (synchronous)

: 특정 코드의 연산이 끝날때까지 기다린 후 다음 코드를 순차적으로 실행하는 방식을 의미한다.

##### 비동기적이란?(asynchronous)

: 자바스크립트에서 비동기 처리란, 특정 코드의 연산이 끝날 때 까지 코드의 실행을 멈추지 않고 다음 코드를 먼저 실행하는 자바스크립트의 특성을 의미한다.



##### 비동기 처리가 필요한 이유

: 많은 연산이 필요하거나 서버로 data를 요청해서 받아오는 시간이 오래걸리는 특정코드의 경우 해당코드의 진행이 완료되기까지 기다린 후 다음코드를 진행한다면 어플리케이션 실행관점에서 큰 loss가 생길것이므로, 비동기처리를 실행하게 된다.



##### 비동기처리  방법

- setTimeout() 함수 사용.

  : setTimeout( a , b ) 로 표현할 때 b의 값은 몇 초후 실행될 것인가에 대한 숫자를 입력한다. 

```
// #1

console.log('Hello');

// #2

setTimeout(function() {
	console.log('Bye');
}, 3000);

// #3

console.log('Hello Again');
```

상기와 같은 코드는 hello -> hello Again -> 3000ms(3초) 후 bye 순으로 실행된다.



- promise 사용

: 비동기 작업을 조금 더 편하게 처리하기 위해 ES6에 도입된 문법으로 콜백함수로 구현하는 것보다 코드가 난잡하지 않다.

new Promise라는 함수를 새로 정의하고 정상적으로 이행 시 resolve 값을 반환, 및 .then을 이용하여 해당 resolve 값을 받아오는 방식과  정상적으로 이행되지 않을 시 .catch를 이용하여 reject값을 받아오는 방식이다.



이부분은 아직 말로설명하기 부족한 부분이 많아 다시한번 정리가 필요할 것 같다..

```
function delay(sec) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(new Date().toISOString());
    }, sec*1000);
  });
}

delay(1).then((result) => {
  console.log(1, result);
  return delay(1);
}).then((result) => {
  console.log(2, result);
  return delay(1);
}).then((result) => {
  console.log(3, result);
  return delay(1);
});
```







- async/await 

: promise를 더 쉽게 사용할 수 있는 방법. 

```
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function process() {
  console.log('안녕하세요!');
  await sleep(1000); // 1초쉬고
  console.log('반갑습니다!');
}

process().then(() => {
  console.log('작업이 끝났어요!');
});
```

```
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function makeError() {
  await sleep(1000);
  const error = new Error();
  throw error;
}

async function process() {
  try {
    await makeError();
  } catch (e) {
    console.error(e);
  }
}

process();
```

