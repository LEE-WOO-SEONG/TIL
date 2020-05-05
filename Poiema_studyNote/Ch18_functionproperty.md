# 함수와 일급객체

- Toc

1. [일급객체](#일급객체)

2. [함수객체의 프로퍼티](#함수객체의-프로퍼티)

   2-1. [arguments 프로퍼티](#arguments-프로퍼티)

   2-2. [caller 프로퍼티](#caller-프로퍼티)
   
   2-3. [length 프로퍼티](#length-프로퍼티)
   
   2-4. [name 프로퍼티](#name-프로퍼티)
   
   2-5. [proto 접근자 프로퍼티](#_ _ proto _ _-접근자 프로퍼티)
   
   2-6. [prototype 프로퍼티](#prototype-프로퍼티)

<br>

<br>

## 일급객체

### 일급객체의 특징

- 무명의 리터럴로 생성할 수 있다. 즉, 런타임에 생성이 가능하다.
- 변수나 자료구조(객체, 배열 등)에 저장할 수 있다.
- 함수의 매개변수에게 전달할 수 있다.(인수로)
- 함수의 결과값으로 반환할 수 있다.(return 문)

<br>

자바스크립트의 함수는 위 조건을 모두 만족하는 **일급객체**이다.

```javascript
// 1. 함수는 무명의 리터럴로 생성할 수 있다.
// 2. 함수는 변수에 저장할 수 있다.
// 런타임(할당 단계)에 함수 리터럴이 평가되어 함수 객체가 생성되고 변수에 할당된다.
const increase = function (num) {
  return ++num;
};

const decrease = function (num) {
  return --num;
};

// 2. 함수는 객체에 저장할 수 있다.
const predicates = { increase, decrease };

// 3. 함수의 매개 변수에게 전달할 수 있다.
// 4. 함수의 반환값으로 사용할 수 있다.
function makeCounter(predicate) {
  let num = 0;

  return function () {
    num = predicate(num);
    return num;
  };
}

// 3. 함수는 매개 변수에게 함수를 전달할 수 있다.
const increaser = makeCounter(predicates.increase);
console.log(increaser()); // 1
console.log(increaser()); // 2

// 3. 함수는 매개 변수에게 함수를 전달할 수 있다.
const decreaser = makeCounter(predicates.decrease);
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

함수는 **일급객체**이므로 함수를 객체와 동일하게 사용할 수 있다. 객체는 값이므로 <strong>함수는 값과 동일하게 취급할 수 있다.</strong> 따라서 함수는 값을 사용할 수 있는 곳(변수 할당문 / 객체의 프로퍼티 값 / 배열의 요소 / <em>함수 호출의 인수</em> / <em>함수 반환문</em>)이라면 어디서든지 리터럴로 정의할 수 있으며 <strong>런타임</strong>에 함수 객체로 평가된다.

일급객체인 함수와 일반객체와의 차이는 **호출가능여부**에 있다. 또한 함수 객체는 일반객체에는 없는 함수 고유의 프로퍼티를 가지고 있다.

<br>

## 함수객체의 프로퍼티

- console.dir 메소드를 사용하여 함수내부 확인.

```javascript
function square(number) {
  return number * number;
}

console.dir(square);
```

![image](https://user-images.githubusercontent.com/62285872/80973644-9f5b8f00-8e5a-11ea-9cb3-ddbc56df22fb.png)	

- Object.getOwnPropertyDescriptors 메소드 이용하여 프로퍼티 어트리뷰트 확인.

![image](https://user-images.githubusercontent.com/62285872/80974923-63c1c480-8e5c-11ea-8405-12de9e040c56.png)	

```javascript
console.log(Object.getOwnPropertyDescriptor(square, '__proto__'))
// undefined -> 자신의 프로퍼티가 아니거나 상속에 의한 프로퍼티이다.

console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__')); 
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

arguments, caller, length, name, prototype 프로퍼티는 모두 함수객체의 데이터 프로퍼티이다. 하지만 _ _ proto _ _ 는 접근자 프로퍼티이며 함수 객체의 프로퍼티가 아닌 Object.prototype 객체의 프로퍼티를 **상속**받은 것을 알 수 있다.

<br>

### arguments 프로퍼티

함수객체의 arguments 프로퍼티 값은 arguments **객체**이다. arguments 객체는 함수호출 시 전달된 인수들의 정보를 담고 있는 순회가능한(iterable) 유사 배열객체이며 함수 내부에서 지역변수처럼 사용된다. 함수외부에서는 참조할 수 없다.

> arguments 프로퍼티
>
> 함수객체의 arguments 프로퍼티는 현재 일부 브라우저에서 지원하고 있으나 ES3부터 표준에서 폐지되었다. 따라서 Function.arguments와 같은 사용방법은 권장되지 않으며 함수 내부에서 지역변수처럼 사용할 수 있는 arguments 객체를 참조하도록 한다.

![image](https://user-images.githubusercontent.com/62285872/80979804-c6b65a00-8e62-11ea-8ba2-3e79d86fd966.png)

함수에 전달된 인수는 암묵적으로 arguments 객체의 프로퍼티로 보관된다. arguments 객체는 함수에 전달된 **인수**를 <strong>프로퍼티 값</strong>으로 소유하며 <strong>프로퍼티 키</strong>는 인수의 <strong>순서</strong>를 나타낸다.

arguments 객체의 **callee** 프로퍼티는 호출되어 arguments 객체를 생성한 함수, 즉 함수자신을 가리키고 arguments 객체의 length 프로퍼티는 인수의 개수를 가리킨다.

> - arguments 객체의 Symbol(Symbole.iterator) 프로퍼티
>
> arguments 객체의 Symbol(Symbol.iterator) 프로퍼티는 arguments 객체를 **순회가능한** 자료구조인 이터러블(iterable)로 만들기 위한 프로퍼티이다?
>
> Symbol.iterator를 프로퍼티 키로 사용한 메소드를 구현하는 것에 의해 이터러블이 된다.
>
> ```javascript
> function multiply(x, y) {
>   // 이터레이터
>   const iterator = arguments[Symbol.iterator]();
> 
>   // 이터레이터의 next 메소드를 호출하여 이터러블 객체 arguments를 순회
>   console.log(iterator.next()); // {value: 1, done: false}
>   console.log(iterator.next()); // {value: 2, done: false}
>   console.log(iterator.next()); // {value: 3, done: false}
>   console.log(iterator.next()); // {value: undefined, done: true}
> 
>   return x * y;
> }
> 
> multiply(1, 2, 3);
> ```

arguments 객체는 배열의 형태로 인자정보를 담고 있지만 실제 배열이 아닌 유사배열객체 이다. <em>유사배열 객체란 배열처럼 index로 프로퍼티 값에 접근할 수 있고 length 프로퍼티를 가진 객체를 말한다.</em>

> 유사배열객체와 이터러블
>
> ES6에서 도입된 이터레이션 프로토콜을 준수하면 순회가능한 자료구조인 이터러블이 된다. 이터러블의 개념이 없었던 ES5에서 arguments 객체는 유사배열 객체로 구분되었다. 하지만 이터러블이 도입된 ES6부터 arguments 객체는 유사배열객체 이면서 동시에 이터러블이 되었다.

유사배열 객체는 말 그대로 '유사'배열이지 배열객체가 아니다. 때문에 배열 메소드를 사용할 경우 에러가 발생하므로, 배열의 형태로 바꿔주어야 한다.

이 경우 `Function.prototype.call` 혹은 `Function.prototype.apply`를 통해 배열의 형태로 간접호출이 가능하다.

```javascript
function sum() {
  // arguments 객체를 배열로 변환
  const array = Array.prototype.slice.call(arguments);
  return array.reduce(function (pre, cur) {
    return pre + cur;
  }, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

ES6 문법에서는 배열의 형태로 바꿔주는 Rest (...) 파라미터가 도입되었다.

```javascript
function sum(...args) {
  return args.reduce((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2));          // 3
console.log(sum(1, 2, 3, 4, 5)); // 15
```

<br>

### caller 프로퍼티

caller 프로퍼티는 ECMAScript 스펙에 포함되지 않은 비표준 프로퍼티이다. 이후 표준화될 예정도 없는 프로퍼티 이므로 참고로만 알아두자.

<strong>caller 프로퍼티는 함수 자신을 호출한 다른 함수를 가리킨다.</strong>

```javascript
function foo(func) {
  return func();
}

function bar() {
  return 'caller : ' + bar.caller;
}

// 브라우저에서의 실행한 결과
console.log(foo(bar)); // caller : function foo(func) {...}
console.log(bar());    // caller : null
```

함수 호출 foo(bar)의 경우, bar 함수를 foo 함수 내에서 호출했다. 이때 caller 프로퍼티는 bar 함수를 호출한 foo 함수를 가리킨다. 함수 호출 bar()의 경우, bar 함수를 호출한 함수는 없다. 따라서 caller 프로퍼티는 null을 가리킨다.

<br>

### length 프로퍼티

함수 객체의 length 프로퍼티는 함수 정의시 선언한 **매개변수**의 개수를 가리킨다.

```javascript
function foo() {}
console.log(foo.length); // 0

function bar(x) {
  return x;
}
console.log(bar.length); // 1

function baz(x, y) {
  return x * y;
}
console.log(baz.length); // 2
```

혼동하지 말아야 할 것이, arguments 객체 내부에도 length 프로퍼티가 존재하며, 함수 내부에도 length 프로퍼티가 존재한다.

arguments 내부에 존재하는 length 프로퍼티는 함수 호출 시 전달된 인자의 개수이고, 함수 내부의 length 프로퍼티는 매개변수의 개수임을 잊지말자.

<br>

### name 프로퍼티

함수 객체의 name 프로퍼티는 **함수이름**을 나타낸다. name 프로퍼티는 ES6이전까지는 비표준이었지만 ES6에서 정식 표준이 되었다.

name 프로퍼티는 ES5와 ES6에서 동작을 달리 하므로 주의가 필요하다.

- 익명함수 표현식

1. ES5 : name 프로퍼티는 빈 문자열
2. ES6 : name 프로퍼티는 함수 객체를 가리키는 변수의 이름 즉, 식별자.

```javascript
// 기명 함수 표현식
var namedFunc = function foo() {};
console.log(namedFunc.name); // foo

// 익명 함수 표현식
var anonymousFunc = function() {};
// ES5: name 프로퍼티는 빈 문자열을 값으로 갖는다.
// ES6: name 프로퍼티는 함수 객체를 가리키는 변수 이름을 값으로 갖는다.
console.log(anonymousFunc.name); // anonymousFunc

// 함수 선언문(Function declaration)
function bar() {}
console.log(bar.name); // bar
```

<br>

### _ _ proto _ _ 접근자 프로퍼티

모든 객체는 [[Prototype]] 이라는 내부슬롯을 갖는다. [[Prototype]] 내부슬롯은 객체 지향 프로그래밍의 **상속**을 구현하는 <strong>프로토타입 객체</strong>를 가리킨다.

> 프로토타입 객체?
>
> 프로토타입은 어떤 객체의 상위(부모) 역할을 하는 객체를 가리킨다. 프로토타입은 하위 객체에게 자신의 프로퍼티와 메소드를 **상속**한다. 프로토타입 객체의 프로퍼티나 메소드를 상속받은 하위객체는 자신의 프로퍼티 또는 메소드인 것 '처럼' 자유롭게 사용이 가능하다.

_ _ proto _ _ 프로퍼티는 [[Prototype]] 내부 슬롯이 가리키는 프로토타입 객체에 접근하기 위해 사용하는 <strong>접근자 프로퍼티</strong>이다. 내부 슬롯에는 직접 접근할 수 없고 간접적인 접근 방법을 제공하는 경우에 한하여 접근이 가능하다. [[Prototype]] 내부 슬롯에도 직접 접근할 수 없으며 _ _ proto_ _ 접근자 프 로퍼티를 통해 간접적으로 프로토타입 객체에 접근할 수 있다.

```javascript
const obj = { a: 1 };

// 객체 리터럴 방식으로 생성한 객체의 프로토타입 객체는 Object.prototype이다.
console.log(obj.__proto__ === Object.prototype); // true

// 객체 리터럴 방식으로 생성한 객체는 프로토타입 객체인 Object.prototype의 프로퍼티를 상속받는다.
// hasOwnProperty 메소드는 Object.prototype의 메소드이다.
console.log(obj.hasOwnProperty('a'));         // true
console.log(obj.hasOwnProperty('__proto__')); // false
```

<br>

### prototype 프로퍼티

<strong><em>prototype 프로퍼티는 함수 객체만이 소유하는 프로퍼티이다.</em></strong> 일반객체에는 prototype 프로퍼티가 없다.

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log((function() {}).hasOwnProperty('prototype')); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log(({}).hasOwnProperty('prototype')); // false
```

prototype 프로퍼티는 함수가 객체를 생성하는 **생성자함수**로 사용될 때, 생성자 함수가 생성할 **인스턴스**의 프로토타입 객체를 가리킨다. 즉, 생성자함수를 가리킨다.