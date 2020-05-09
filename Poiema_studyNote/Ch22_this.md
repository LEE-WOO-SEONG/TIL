# this

- Toc

1. [this 키워드](#this-키워드)

2. [함수호출 방식과 this 바인딩](#함수호출-방식과-this-바인딩)

   2-1. [일반함수로서 호출](#일반함수로서-호출)

   2-2. [메소드로서 호출](#메소드로서-호출)

   2-3. [생성자 함수로서 호출](#생성자-함수로서-호출)

   2-4. [Function.prototype.apply/call/bind 메소드에 의한 간접호출](#Functionprototypeapplycallbind-메소드에-의한-간접호출)

3. [함수호출 방식에 따른 this 바인딩 값](#함수호출-방식에-따른-this-바인딩-값)

<br>

<br>

## this 키워드

객체는 상태를 나타내는 프로퍼티와 동작을 나타내는 메소드를 하나의 논리적인 단위로 묶은 복합적인 자료구조이다.

동작을 나타내는 메소드는 자신이 속한 객체의 상태인 프로퍼티를 참조하고 변경할 수 있어야한다. <strong>메소드가 자신이 속한 객체의 프로퍼티를 참조하려면 먼저 자신이 속한 객체를 가리키는 식별자를 참조할 수 있어야한다.</strong>

- **객체리터럴** 방식으로 생성한 객체의 경우 메소드 내부에서 메소드 자신이 속한 객체를 가리키는 식별자를 재귀적으로 참조할 수 있다.

```js
const circle = {
    radius: 5,
    getDianmeter() {
        return 2 * circle.radius;
    }
};

console.log(circle.getDiameter());   // 10
```

위 예제를 보면 `getDiameter` 메소드 내에서 자신이 속한 객체를 가리키는 식별자인 `circle`을 참조하고 있다. 이것이 가능할까?

`{}`로 이루어진 객체리터럴은 circle이라는 식별자를 가진 변수에 '할당'되어져 있다. 때문에 해당 객체리터럴은 할당 되기 직전에 평가되어져 생성되며 이 때, 객체의 프로퍼티인 `radius` 와 메소드인 `getDiameter` 동시에 생성된다.

또한 객체 내의 메소드를 **호출**하는 시점은 언제나 해당 메소드가 생성된 다음이여야 할 것이다. 결국 메소드를 호출하는 시점이전에 항상 메소드가 생성되어져 있으며 해당 메소드를 포함하는 객체 또한 먼저 생성되어져 있다. 

<strong>그렇기 때문에 메소드 내에서 자신을 포함하고 있는 객체리터럴의 식별자의 참조가 가능하다.</strong> 하지만 자기자신이 속한 객체를 재귀적으로 참조하는 방식은 일반적이지 않으며 바람직 하지 않다. 

```js
function Circle(radius) {
// 생성자함수를 통해 생성할 인스턴스를 가리키는 식별자를 이시점에는 알 수 없다.
    ????.radius = radius;
}

Circle.prototype.getDiameter = function() {
// 생성자함수를 통해 생성할 인스턴스를 가리키는 식별자를 이시점에는 알 수 없다. 
    return 2 * ????.radius;
}

const circle = Circle(10);
```

생성자 함수 내부에서는 프로퍼티 혹은 메소드를 추가하기 위해 자신이 생성할 인스턴스를 참조할 수 있어야하나 생성자 함수에 의한 객체생성방식은 <strong>생성자함수를 먼저 정의한 이후</strong>, 인스턴스를 생성해야 하기 때문에 생성자함수를 생성하는 시점에서는 추후에 생성될 인스턴스를 가리키는 식별자를 알 수 없다. 

그렇기 때문에 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 특수한 식별자가 필요하다. 자바스크립트에서는 **this**라는 특수한 식별자가 바로 해당 역할을 제공한다. 

> this는 자신이 속한 객체 또는 자신이 생성할 인스턴스를 가리키는 자기참조변수이다. this를 통해 자신이 속한 객체 또는 자신이 생성할 인스턴스의 프로퍼티나 메소드의 참조가 가능하다.
>
> this는 자바스크립트 엔진에 의해 암묵적으로 생성되며 코드 어디에서든지 참조가 가능하다. 함수를 호출하면 arguments 객체와 this가 암묵적으로 함수 내부에 전달된다. 함수내부에서 arguments 객체를 지역변수처럼 사용할 수 있는 것처럼 this도 지역변수처럼 사용이 가능하다. 단, this가 가리키는 값, this 바인딩은 함수호출방식에 의해 동적으로 결정된다.

> > 바인딩 (binding)
> >
> > 바인딩이란 식별자와 값을 연결하는 과정을 말한다. 예를들면 변수는 할당에 의해 값이 바인딩된다.

this를 가지고 위에서 작성한 예제를 수정하면 다음과 같다.

```js
// 객체 리터럴
const circle = {
  radius: 5,
  getDiameter() {
    // this는 메소드를 호출한 객체를 가리킨다.
    return 2 * this.radius;
  }
};

console.log(circle.getDiameter()); // 10

// 생성자 함수
function Circle(radius) {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
}

Circle.prototype.getDiameter = function () {
  // this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  return 2 * this.radius;
};

// 인스턴스 생성
const circle = new Circle(5);
console.log(circle.getDiameter()); // 10
```

this는 상황에 따라 바인딩되는 값이 다르다.

| 함수 호출방식        | this가 가리키는 값                     |
| -------------------- | -------------------------------------- |
| 일반 함수로서 호출   | 전역 객체                              |
| 메소드로서 호출      | 메소드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스          |

Java, C++ 과 같은 **클래스** 기반언어에서 this는 언제나 클래스가 생성할 인스턴스를 가리킨다. 하지만 자바스크립트의 this는 함수가 호출되는 방식에 따라 this에 바인딩 될 값이 동적으로 결정된다.

또한 this는 자바스크립트에서 코드 어디서든지 참조가 가능하다.

```js
// 전역에서 this는 전역 객체 window를 가리킨다.
console.log(this); // window

function square(number) {
  // 일반 함수 내부에서 this는 전역 객체 window를 가리킨다.
  console.log(this); // window
  return number * number;
}
square(2);

const person = {
  name: 'Lee',
  getName() {
    // 메소드 내부에서 this는 메소드를 호출한 객체를 가리킨다.
    console.log(this); // {name: "Lee", getName: ƒ}
    return this.name;
  }
};
console.log(person.getName()); // Lee

function Person(name) {
  this.name = name;
  // 생성자 함수 내부에서 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  console.log(this); // Person {name: "Lee"}
}

const me = new Person('Lee');
```

하지만 this는 객체의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수이므로 일반적으로 객체의 메소드 내부 또는 생성자 함수 내부에서만 의미가 있다. 따라서 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다. 일반 함수 내부에서 this를 사용할 필요가 없기 때문이다.

<br>

## 함수호출 방식과 this 바인딩

this가 가리키는 값, 즉 this 바인딩은 함수의 호출방식에 따라 동적으로 결정된다.

> 렉시컬 스코프와 this 바인딩은 결정시기가 다르다.
>
> 함수의 상위스코프를 결정하는 방식인 렉시컬스코프(Lexical scope)는 <strong>함수정의가 평가되어 함수객체가 생성되는 시점</strong>에 상위스코프를 결정한다. this에 바인딩될 객체는 함수호출 시점에 결정된다.

- 함수호출 방식

1. 일반함수로서 호출
2. 메소드로서 호출
3. 생성자 함수로서 호출
4. Function.prototype.apply/call/bind 메소드에 의한 간접호출

<br>

### 일반함수로서 호출

기본적으로 this에는 전역객체(global object)가 바인딩된다.

브라우저 환경에서 전역객체는 window 이며 Node.js 환경에서는 global이 된다.

```js
function foo() {
  console.log("foo's this: ", this);  // window
  function bar() {
    console.log("bar's this: ", this); // window
  }
  bar();
}
foo();
```

![image](https://user-images.githubusercontent.com/62285872/81469829-34c39e00-9222-11ea-9f40-777d89d3c7da.png)

전역함수는 물론 중첩합수 또한 일반함수로 호출하면 함수 내부의 this에는 전역객체가 바인딩된다.  <strong>다만, this는 객체의 프로퍼티나 메소드를 참조하기 위한 자기 참조 변수이므로 객체를 생성하지 않는 일반 함수에서 this는 의미가 없다.</strong> 따라서 아래 예제처럼 strict mode가 적용된 일반 함수 내부의 this에는 undefined가 바인딩된다.

```js
function foo() {
  'use strict';

  console.log("foo's this: ", this);  // undefined
  function bar() {
    console.log("bar's this: ", this); // undefined
  }
  bar();
}
foo();
```

![image](https://user-images.githubusercontent.com/62285872/81469882-8a984600-9222-11ea-9fe4-7d34ddbaeeff.png)	

메소드 내에서 정의한 중첩함수 또한 일반함수로 호출되면 중첩함수 내부의 this에는 전역객체가 바인딩 된다.

```js
// var 키워드로 선언한 변수 value는 전역 객체의 프로퍼티이다.
var value = 1;
// const 키워드로 선언한 변수 value는 전역 객체의 프로퍼티가 아니다.
// const value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this);  // {value: 100, foo: ƒ}
    console.log("foo's this.value: ", this.value); // 100

    // 메소드 내에서 정의한 중첩 함수
    function bar() {
      console.log("bar's this: ", this); // window
      console.log("bar's this.value: ", this.value); // 1
    }

    // 메소드 내에서 정의한 중첩 함수도 일반 함수로 호출되면
    // 중첩 함수 내부의 this에는 전역 객체가 바인딩된다.
    bar();
  }
};

obj.foo();
```

콜백 함수 내부의 this에도 전역 객체가 바인딩된다. 어떠한 함수라도 일반 함수로 호출되면 this에 전역 객체가 바인딩된다.

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    console.log("foo's this: ", this); // {value: 100, foo: ƒ}
    // 콜백 함수 내부의 this에는 전역 객체가 바인딩된다.
    setTimeout(function () {
      console.log("callback's this: ", this); // window
      console.log("callback's this.value: ", this.value); // 1
    }, 100);
  }
};

obj.foo();
```

> setTimeout 함수
>
> setTimeout 함수는 두번째 매개변수에 전달한 시간(ms)만큼 대기한 다음, 첫번째 매개변수에 전달한 콜백 함수를 호출하는 타이머 함수이다. 위 예제의 경우, 100ms을 대기한 다음, 콜백 함수를 호출한다.

- 메소드 내부의 중첩 함수나 콜백 함수의 this 바인딩을 메소드의 this 바인딩과 일치시키기 위한 방법

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    // this 바인딩(obj)를 변수 that에 할당한다.
    const that = this;

    // 콜백 함수 내부에서 this 대신 that을 참조한다.
    setTimeout(function () {
      console.log(that.value); // 100
    }, 100);
  }
};

obj.foo();
```

- this를 명시적으로 바인딩할 수 있는 Function.prototype.apply / call / bind 를 사용한 방법

```js
var value = 1;

const obj = {
  value: 100,
  foo() {
    // 콜백 함수에 명시적으로 this를 바인딩한다.
    setTimeout(function () {
      console.log(this.value); // 100
    }.bind(this), 100);
  }
};

obj.foo();
```

<br>

### 메소드로서 호출

메소드 내부의 this는 메소드를 호출한 객체, 즉 메소드 이름 앞의 마침표 연산자 앞에 기술한 객체에 바인딩 된다.

여기서 주의할 것은 메소드를 **소유**한 객체가 아닌 **호출**한 객체에 바인딩 되는 점이다.

```js
// case 1
const person = {
  name: 'Lee',
  getName() {
    return this.name;
  }
};

console.log(person.getName()); // Lee


// case 2
const anotherPerson = {
  name: 'Kim'
};
// 메소드 getName을 anotherPerson 객체의 메소드로 할당
anotherPerson.getName = person.getName;

// 메소드 getName을 호출한 객체는 anotherPerson이다.
console.log(anotherPerson.getName()); // kim
```

![image](https://user-images.githubusercontent.com/62285872/81470719-465b7480-9227-11ea-9e32-a7800f44a666.png)	

일반 객체의 메소드 뿐 아니라 프로토타입의 메소드 내부에서 사용된 this도 해당 메소드를 호출한 객체에 바인딩 된다.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.getName = function () {
  return this.name;
};

const me = new Person('Lee');
// getName 메소드를 호출한 객체는 me이다.
console.log(me.getName()); // ① Lee

Person.prototype.name = 'Kim';
// getName 메소드를 호출한 객체는 Person.prototype이다.
console.log(Person.prototype.getName()); // ② Kim
```

![image](https://user-images.githubusercontent.com/62285872/81470811-d13c6f00-9227-11ea-9e7e-b8429a3ef50e.png)	

<br>

### 생성자 함수로서 호출

생성자 함수 내부의 this에는 생성자 함수가 미래에 생성할 인스턴스가 바인딩된다.

```js
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

const circle1 = new Circle(5);
const circle2 = new Circle(10);

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

<br>

### Function.prototype.apply/call/bind 메소드에 의한 간접호출

 Function.prototype.apply / Function.prototype.call 메소드는 인수로 this와 인수리스트를 전달받아 함수를 호출한다. apply와 call 메소드는 Function.prototype의 메소드이다.

![image](https://user-images.githubusercontent.com/62285872/81471404-c4ba1580-922b-11ea-804c-ecde251dba56.png)	

apply와 call 메소드는 Function 생성자함수를 constructor 프로퍼티로 가리키는 모든 함수가 상속받아 사용할 수 있다.



![image](https://user-images.githubusercontent.com/62285872/81471384-84f32e00-922b-11ea-9781-c0dc8de916fb.png)	

- apply, call 메소드의 사용법

```js
Function.prototype.apply(thisArg[, argsArray])
// 주어진 this 바인딩과 인수 리스트 배열을 사용하여 함수를 호출한다.
// thisArg - this로 사용될 객체
// argsArray - 함수에게 전달할 인수 리스트의 배열 또는 유사 배열 객체

Function.prototype.call (thisArg[, arg1[, arg2[, ...]]])
// 주어진 this 바인딩과 인수 리스트를 사용하여 함수를 호출한다.
// thisArg - this로 사용될 객체
// arg1, arg2, ... - 함수에게 전달할 인수 리스트
```

- 예제

```js
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

console.log(getThisBinding()); // window

// 함수(getThisBinding)를 호출하면서 인수로 전달한 객체를 호출한 함수의 this에 바인딩한다.
console.log(getThisBinding.apply(thisArg)); // { a: 1 }
console.log(getThisBinding.call(thisArg)); // { a: 1 }
```

apply오 call 메소드의 본직적인 기능은 함수를 호출하는 것이다. <strong>apply와 call 메소드는 특정함수를 호출하면서 첫번째 인수로 전달한 특정객체를 호출한 함수의 this에 바인딩한다.</strong>

apply와 call 메소드는 호출할 함수에 인수를 전달하는 방식만 다를 뿐 동일하게 동작한다. 위 예제는 호출할 함수인 `getThisBinding` 함수에 인수를 전달하지 않는다.

아래 예제를 통해 특정함수를 호출하면서 해당 함수에 인수를 전달하는 방법을 확인 해 보자

```js
function getThisBinding() {
  console.log(arguments);
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// 함수(getThisBinding)를 호출하면서 인수로 전달한 객체를 호출한 함수의 this에 바인딩한다.
// apply 메소드는 호출할 함수의 인수를 배열로 묶어 전달한다.
console.log(getThisBinding.apply(thisArg, [1, 2, 3]));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// { a: 1 }

// call 메소드는 호출할 함수의 인수를 쉼표로 구분한 리스트 형식으로 전달한다.
console.log(getThisBinding.call(thisArg, 1, 2, 3));
// Arguments(3) [1, 2, 3, callee: ƒ, Symbol(Symbol.iterator): ƒ]
// { a: 1 }
```

- apply, call 메소드의 공통점

  this로 사용할 객체를 첫번째 인수로 전달하면서 마침표 앞에 위치한 함수를 호출한다.

- apply, call 메소드의 차이점

  인수를 전달하는 방식이 다르다.

  - apply : 마침표 앞에 위치한 함수의 인수리스트를 배열형태로 전달한다.
  - call : 마침표 앞에 위치한 함수의 인수리스트를 쉼표로 구분한 형태로 전달한다.

- apply, call 메소드의 사용용도

  arguments 객체와 같은 **유사배열객체**에 **배열메소드**를 사용하는 경우.

  (유사배열 객체는 말 그대로 배열과 유사한 객체이지 배열은 아니므로 그 자체로는 배열에서 사용가능한 내장메소드의 사용이 불가능하다. 배열의 내장 메소드는 Array.prototype이 가지고 있는 메소드 들이다.)

  ![image](https://user-images.githubusercontent.com/62285872/81471689-cc7ab980-922d-11ea-9b10-94b0f4f55a1f.png)	

```js
function convertArgsToArray() {

  // arguments 객체를 배열로 변환
  // slice: 배열의 특정 부분에 대한 복사본을 생성한다.
  const arr = Array.prototype.slice.apply(arguments);
  // const arr = Array.prototype.slice.call(arguments);

  return arr;
}

convertArgsToArray(1, 2, 3); // [ 1, 2, 3 ]
```

<br>

Function.prototype.bind 메소드는 apply, call 메소드와 달리 함수를 호출하지 않고 this로 사용할 객체만을 전달한다.

```js
function getThisBinding() {
  return this;
}

// this로 사용할 객체
const thisArg = { a: 1 };

// bind 메소드는 함수에 this로 사용할 객체를 전달한다.
// bind 메소드는 함수를 호출하지는 않는다.
console.log(getThisBinding.bind(thisArg)); // getThisBinding
// bind 메소드는 함수를 호출하지는 않으므로 명시적으로 호출해야 한다.
console.log(getThisBinding.bind(thisArg)()); // {a: 1}
```

- bind 메소드의 사용용도

  메소드의 this와 메소드 내부의 중첨함수 / 콜백함수의 this가 불일치하는 문제를 해결하기 위해 유용하게 사용된다.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.doSomething = function (callback) {
  // ①
  callback();
};

function foo() {
  console.log(this.name); // ②
}

const person = new Person('Lee');

person.doSomething(foo); // ''
// =>  window.name은 브라우저 창의 이름을 나타내는 빌트인 프로퍼티이다. window.name의 기본값은 ''이다.
// 만약 Node.js 환경에서 실행하면 undefined가 출력된다.
```

콜백 함수 foo가 호출되기 이전인 ①의 시점에서 this는 doSomething 메소드를 호출한 객체, 즉 person 객체를 가리킨다. 그러나 콜백 함수 foo가 일반 함수로서 호출된 ②의 시점에서 this는 전역 객체 window를 가리킨다. 따라서 foo 함수 내부에서 참조한 this.name은 window.name과 같다.

이때 위 예제에서 콜백 함수 foo는 외부 함수 doSomething를 돕는 헬퍼 함수(보조 함수)의 역할을 하기 때문에 외부 함수 doSomething 내부의 this와 콜백 함수 내부의 this가 상이하면 문맥상 문제가 발생한다.

따라서 콜백 함수 내부의 this를 콜백 함수를 호출하는 외부 함수 내부의 this와 일치시켜 주어야 한다. 이때 bind 메소드를 사용하여 this를 일치시킬 수 있다. 물론 apply와 call 메소드를 사용할 수도 있다.

```js
function Person(name) {
  this.name = name;
}

Person.prototype.doSomething = function (callback) {
  // ①
  callback.bind(this)();
  // callback.apply(this);
  // callback.call(this);
};

function foo() {
  console.log(this.name); // ②
}

const person = new Person('Lee');

person.doSomehing(foo); // Lee
```

<br>

## 함수호출 방식에 따른 this 바인딩 값

| 함수 호출 방식                                             | this 바인딩                                                  |
| :--------------------------------------------------------- | :----------------------------------------------------------- |
| 일반 함수 호출                                             | 전역 객체                                                    |
| 메소드 호출                                                | 메소드를 호출한 객체                                         |
| 생성자 함수 호출                                           | 생성자 함수가 (미래에) 생성할 인스턴스                       |
| Function.prototype.apply/call/bind 메소드에 의한 간접 호출 | Function.prototype.apply/call/bind 메소드에 인자로 전달한 객체 |