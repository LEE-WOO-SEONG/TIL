### Promise

: 비동기 작업에 쓰이는 함수.

프로미스가 생성될 때 꼭 알 수 있지는 않은 값을 위한 대리자로, 비동기 연산이 종료된 이후의 결과값이나 실패 이유를 처리하기 위한 처리기를 연결할 수 있도록 합니다. 프로미스를 사용하면 비동기 메서드에서 마치 동기 메서드처럼 값을 반환할 수 있습니다. <u>다만 최종 결과를 반환하지는 않고, 대신 프로미스를 반환해서 미래의 어떤 시점에 결과를 제공합니다.</u>

<a href="https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Promise">출처 : MDN</a>



##### Promise 함수의 3가지 상태

- pending(대기) : 이행하거나 거부되지 않은 초기상태
- fullfilled(이행) : 연산이 성공적으로 완료된 상태
- rejected(거부) : 연산이 실패한 상태.



> pending:  생성자를 통해 객체를 만드는 순간 pending 상태가 된다.

```
new Promise((//executor()) => {})
```

​	executor 함수.

```
function executor(resolve.reject) {}
executor = (resolve.reject) => {}

// promise 함수

new Promise((resolve,reject) => {}) // pending 상태.
```



> fullfilled: executor 함수 인자 중 하나인 resolve 함수를 실행하면,  fullfilled 상태가 된다.

```
new Promise((resolve,reject) => {
	...
	...
	resolve();                       // fullfilled 상태.
})
```



>  rejected: executor 함수 인자 중 하나인 reject 함수를 실행하면,  rejected 상태가 된다.

```
new Promise((resolve,reject) => {
	...
	...
	reject();                        // rejected 상태.
})
```



###### 연산이 성공적으로 완료된 상태인 resolve 함수를 호출하는 함수는 then이다.

```

function p() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      resolve();                                // fulfilled
    },1000);
  });
}

p().then(() => {
  console.log('1초 후 fulfilled 됩니다.');        // resolve 함수 호출
})
```



###### 연산이 실패한 상태인 reject 함수를 호출하는 함수는 catch이다.

```

function p() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      reject();                                   // rejected
    },1000);
  });
}

p().then(() => {
  console.log('1초 후 fulfilled 됩니다.');
}).catch(() => {
  console.log('1초 후 rejected 됩니다.')            // reject함수 호출
});
```



###### fulfilled 되거나 rejected 된 후에 최종적으로 실행할 것이 있다면, finally 함수를 설정한다.

```

function p() {
  return new Promise((resolve,reject) => {
    setTimeout(() => {
      reject(new Error('bad'));
    },1000);
  });
}

p().then(() => {
  console.log('1초 후 fulfilled 됩니다.');
}).catch((error) => {
  console.log('1초 후 rejected 됩니다.', error);
}).finally(() => {                                   // finally 함수 
  console.log('end');
});
```



promise chaining