# 제너레이터와 async/await

- Toc

1. [제너레이터 함수의 정의](#제너레이터-함수의-정의)
2. [제너레이터 함수의 호출과 제너레이터 객체](#제너레이터-함수의-호출과-제너레이터-객체)

<br>

<br>

ES6에서 도입된 제너레이터(generator) 함수는 이터러블을 생성하는 함수이다. 제너레이터 함수를 사용하면 이터레이터 프로토콜을 준수해 이터러블을 생성하는 방식보다 간편하게 이터러블을 구현할 수 있다. 또한 제너레이터 함수는 비동기 처리에 유용하게 사용된다.

- 이터레이션 프로토콜을 준수해 무한 이터러블을 생성하는 함수

```js
const createInfinityByIteration = function () {
    let i = 0;
    return {
        [Symbol.iterator]() { return this; },
        next() {
            return { value: ++i };
        }
    };
};

for (const n of createInfinityByIteration()) {
    if (n > 5) break;
    console.log(n); // 1, 2, 3, 4, 5
}
```

- 제너레이터 함수를 사용해 무한 이터러블을 생성하는 함수

```js
fucntion* createInfinityByGenerator() {
    let i = 0;
    while (true) { yield ++i; }
}

for (const n of createInfinityByGenerator()) {
    if (n > 5) break;
    console.log(n); // 1, 2, 3, 4, 5
}
```

제너레이터 함수는 일반 함수처럼 함수의 코드블록을 <strong>한 번에 실행하지 않는다.</strong> 제너레이터 함수는 함수코드 블록의 실행을 일시 중지했다가 필요한 시점에 재시작할 수 있는 특수한 함수이다.

```js
// 제너레이터 함수 정의
function* counter(n) {
  console.log('Point 1');
  yield ++n;              // 첫 번째 next 메서드 호출 시에 이 지점까지 실행된다.
  console.log('Point 2');
  yield ++n;              // 두 번째 next 메서드 호출 시에 이 지점까지 실행된다.
  console.log('Point 3');
  yield ++n;              // 세 번째 next 메서드 호출 시에 이 지점까지 실행된다.
  console.log('Point 4'); // 네 번째 next 메서드 호출 시에 이 지점까지 실행된다.
}

const generator = counter(0);

console.log(generator.next()); // Point 1 {value: 1, done: false}
console.log(generator.next()); // Point 2 {value: 2, done: false}
console.log(generator.next()); // Point 3 {value: 3, done: false}
console.log(generator.next()); // Point 4 {value: undefined, done: true}
```

일반함수를 호출하면 코드블록을 실행하고 return 키워드 뒤의 값을 반환한다. 하지만 제너레이터 함수를 호출하면 코드블록을 실행하는 것이 아니라 제너레이터를 생성해 반환한다. 이 제너레이터는 이터러블(iterable)이면서 동시에 이터레이터(iterator)인 객체이다. 다시말해, 제너레이터 함수가 생성해 반환한 제너레이터는 Symbol.iterator 메서드를 소유한 이터러블이면서 next 메서드를 소유하며 next 메서드를 호출하면 value / done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환하는 이터레이터 이다.

```js
function* counter() {
    for (const v of [1, 2, 3]) yield v;
}

let generator = counter();

console.log(Symbol.iterator in generator); // true

for (const i of generator) {
    console.log(i);    // 1 2 3
}

console.log([...generator]) // [1, 2, 3]

const [x, y, z] = generator;
console.log(x);   // 1
console.log(y);   // 2
console.log(z);   // 3

console.log('next' in generator);  // true

console.log(generator.next()); // {value: 1, done: false}
console.log(generator.next()); // {value: 2, done: false}
console.log(generator.next()); // {value: 3, done: false}
console.log(generator.next()); // {value: undefined, done: true}
```

<br>

## 제너레이터 함수의 정의

제너레이터 함수는 `function*` 키워드로 선언한다. 그리고 하나 이상의 `yield`문을 포함한다.

```js
// 제너레이터 함수 선언문
function* genDecFunc() {
    yield 1;
}

let generator = genDecFunc();

// 제너레이터 함수 표현식
const genExpFunc = function* () {
    yield 1;
};

generator = genExpFunc();

// 제너레이터 메서드
const obj = {
    * genObjMethod() {
        yield 1;
    }
};

generator = obj.genObjMethod();

// 제너레이터 클래스 메서드
class Myclass {
    * genClsMethod() {
        yield 1;
    }
}

const myClass = new MyClass();
generator = myClass.genClsMethod();
```

<strong>제너레이터 함수는 화살표 함수로 정의할 수 없다.</strong>

```js
const genArrowFunc = *() => {
    yield 1;
};
// SyntaxError: Unexpected token '*'
```

또한 제너레이터 함수는 생성자 함수로 호출할 수도 없다.

```js
function* genFunc() {
    yield 1;
}

new genFunc();
// Uncaught TypeError: genFunc is not a constructor
```

<br>

## 제너레이터 함수의 호출과 제너레이터 객체

제너레이터 함수를 호출하면 제너레이터 함수의 코드블럭이 실행되는 것이 아니라 제너레이터 객체를 반환한다. <strong>제너레이터 객체는 이터러블이면서 동시에 이터레이터이다.</strong> 따라서 next 메서드를 호출하기 위해 Symbol.iterator 메서드로 이터레이터를 별도 생성할 필요가 없다.

```js
function* counter() {
    console.log('Point 1');
    yield 1;
    console.log('Point 2');
    yield 2;
    console.log('Point 3');
    yield 3;
    console.log('Point 4');
}

const generator = counter();

console.log(generator.next());  // {value: 1, done: false}
console.log(generator.next());  // {value: 2, done: false}
console.log(generator.next());  // {value: 3, done: false}
console.log(generator.next());  // {value: undefined, done: true}
```

제너레이터 함수가 생성한 제너레이터 객체의 next 메서드를 처음 호출하면 첫번째 yield 문까지 실행되고 일시 중단(suspend)된다. 또 다시 next 메서드를 호출하면 중단된 위치에서 다시실행(resume) 하기 시작하여 두번째 yield 문까지 실행되고 또 다시 일시중단 된다.

```
start -> generator.next() -> yield1 -> genertor.next() -> yield2 -> ... -> end
```

이터러블이면서 동시에 이터레이터인 제너레이터 객체의 next 메서드는 value, done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. value 프로퍼티는 yield 문이 반환한 값이고 done 프로퍼티는 제너레이터 함수 내의 모든 yield 문이 실행되었는지를 나타내는 불리언 타입의 값이다. 마지막 yield 문까지 실행된 상태에서 next 메서드를 호출하면 done 프로퍼티 값은 true가 된다.

<br>

## 제너레이터의 활용

### 이터러블의 구현

제너레이터 함수를 사용하면 이터레이션 프로토콜을 준수해 이터러블을 생성하는 방식보다 간편하게 이터러블을 구현할 수 있다.

- 이터레이션 프로토콜을 준수한 무한 피보나치 수열을 생성하는 함수

```js
const infiniteFinbonacci = (function () {
    let [pre, cur] = [0, 1];
    
    return {
        [Symbol.iterator]() { return this; }
        next() {
            [pre, cur] = [cur, pre + cur];
            
            return { value: cur };
        }
    };
})();

for (const num of infiniteFibonacci) {
    if (num > 10000) break;
    console.log(num);  // 1 2 3 5 8 ...
}
```

- 제너레이터를 활용한 무한 피보나치 수열을 생성하는 함수

```js
const infiniteFibonacci = (function* () {
    let [pre, cur] = [0, 1];
    
    while (true) {
        [pre, cur] = [cur, pre + cur];
        yield cur;
    }
})();

for (const num of infiniteFibonacci) {
    if (num > 10000) break;
    console.log(num);
}
```

최대값을 인수로 전달

```js
const infiniteFibonacci = function* (max) {
    let [pre, cur] = [0, 1];
    
    while (true) {
        [prev, curr] = [curr, prev + curr];
        if (curr >= max) return;
        yield curr;
    }
};

for (const num of infiniteFibonacci(10000)) {
    console.log(num);
}
```

이터레이터의 next 메서드와 다르게 제너레이터 객체의 next 메서드에는 인수를 전달할 수도 있다. 이를 통해 제너레이터 객체에 데이터를 전달할 수 있다.

```js
function* gen(n) {
    let res;
    res = yield n;
    
    console.log(res);
    res = yield res;
    
    console.log(res);
    res = yield res;
    
    console.log(res);
    res = yield res;
}

const generator = gen(10);

console.log(generator.next());    // {value: 10, done: false}
console.log(generator.next(30));  // {value: 30, done: false}
console.log(generator.next(50));  // {value: 50, done: false}
console.log(generator.next(70));  // {value: 70, done: false}
console.log(generator.next(90));  // {value: undefined, done: true}
```

이터레이터의 next 메서드는 이터러블의 데이터를 **꺼내온다**. 반면 제너레이터의 netxt 메서드의 인수를 전달하면 제너레이터 객체에 데이터를 **밀어넣는다**. 제너레이터의 이런 특성은 동시성 프로그래밍을 가능하게 한다.

<br>

### 비동기처리

제너레이터를 사용해 비동기처리를 동기처럼 구현할 수 있다. 즉, 비동기 처리함수가 처리결과를 반환하도록 구현할 수 있다.

```js
// node-fetch는 node.js 환경에서 window.fetch 함수를 사용하기 위한 패키지다.
const fetch = require('node-fetch');

const getUser = (genObj, username) => {
    fetch(`http://api.github.com/users/${username}`)
    .then(res => res.json())
    .then(user => genObj.next(user.name));
};

const g = (function* () {
    let user;
    user = yield getUser(g, 'jeresig');    
    
    console.log(user);
    user = yield getUser(g, 'ahejlsberg');  // John Resig
    
    console.log(user);
    user = yield getUser(g, 'LEE-WOO-SEONG'); // Anders Hejlsberg
    
    console.log(user); // wooseong lee
})();

g.next();
```

<br>

## async/await

제너레이터를 통해 비동기 처리를 동기처럼 구현할 수 있게 되었지만 코드는 장황해 졌다. 따라서 좀 더 간편하게 비동기 처리를 동기처럼 구현할 수 있는 async/await 이 ES7에서 도입되었다.

async/await을 사용하면 프로미스의 then/catch/finally 후속 처리 메서드에 콜백함수를 전달해서 후속처리를 할 필요없이 마치 동기처리 처럼 프로미스를 사용할 수 있다.

``` js
const fetch = require('node-fetch');

function getUser(username) {
    return fetch(`https://api.github.com/users/${username}`)
    	.then(res => res.json())
    	.then(user => user.name);
}

async function getUserAll() {
    let user;
    user = await getUser('jeresig');
    console.log(user);
    
    user = await getUser('ahejlsberg');
    console.log(user);
    
    user = await getUser('LEE-WOO-SEONG');
    console.log(user);
}

getUserAll();
```

### async 함수

await 키워드는 반드시 <strong>async 함수 내부</strong>에서 사용해야 한다. async 함수는 async 키워드를 사용해 정의하며 언제나 <strong>프로미스를 반환</strong>한다. async 함수가 명시적으로 프로미스를 반환하지 않더라도 async 함수의 반환값을 프로미스로 래핑하여 반환한다.

```js
// async 함수 선언문
async function foo(n) { return n ; }
foo(1).then(v => console.log(v));  // 1

// async 함수 표현식
const bar = async function (n) { return n; }
bar(10).then(v => console.log(v));  // 10

// async 화살표 함수
const baz = async n => n;
baz(20).then(v => console.log(v));  // 20

// async 메서드
const obj = {
    async foo(n) { return n; }
};
obj.foo(30).then(v => console.log(v)); // 30

// async 클래스 메서드
class MyClass {
    async foo(n) { return n; }
}
const myclass = new MyClass();
myclass.foo(40).then(v => console.log(v));  // 40
```

### await 키워드

await 키워드는 프로미스가 setteld 상태(비동기 처리가 수행된 상태)가 될 때까지 대기하다가 settled 상태가 되면 resolve된 처리결과 또는 reject된 에러를 반환한다.

```js
const fetch = require('node-fetch');

const getGithubUserName = async id => {
    const res = await fetch(`https://api.github.com/users/${id}`);
    const { name } = await res.json();
    console.log(name);
}

getGithubUserName('LEE-WOO-SEONG');  // wooseong lee
```

### 에러처리

에러는 호출자(caller)방향으로 전파된다. 즉, 콜스택의 아래방향(현재 실행중인 실행컨텍스트에서 직전에 푸시된 실행컨텍스트 방향)으로 전파된다. 하지만 비동기 함수의 콜백함수를 호출한 것은 비동기함수가 아니기 때문에 try/catch문을 사용해 에러를 캐치할 수 없었다.

```js
try {
    setTimeout(() => { throw new Error('Error!'); }, 1000);
} catch (e) {
    console.error('캐치한 에러', e);
}
```

async/await에서 에러처리는 try / catch 문을 사용할 수 있다. 콜백함수를 인수로 전달받는 비동기 함수와는 달리, 프로미스를 반환하는 비동기함수는 명시적으로 호출할 수 있기 때문에 호출자가 명확하다.

```js
const fetch = require('node-fetch');

const getGithubUserName = async id => {
    try {
        const res = await fetch(`https://api.github.com/users/${id}`);
        const { name } = await res.json();
        console.log(name);
    } catch(err) {
        console.error(err);
    }
}

getGithubUserName('LEE-WOO-SEONG');  // wooseong lee
```

위 예제의 getGithubUserName 함수의 catch 문은 HTTP 통신에서 발생한 네트워크 에러뿐만 try 문 내부의 모든 문에서 발생한 일반적인 에러까지 모두 캐치할 수 있다.