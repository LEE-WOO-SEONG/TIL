# 생성자 함수에 의한 객체생성

- Toc

1. [Object 생성자 함수](#Object-생성자-함수)

2. [생성자 함수](#생성자-함수)

   2-1.[객체 리터럴에 의한 객체 생성방식의 단점](#객체-리터럴에-의한-객체-생성방식의-단점)

   2-2.[생성자 함수에 의한 객체 생성방식의 장점](#생성자-함수에-의한-객체-생성방식의-장점)

   2-3.[생성자 함수의 인스턴스 생성과정](#생성자-함수의-인스턴스-생성과정)

   2-4.[내부 메소드 Call과 Construct](#내부-메소드-call과-construct)

   2-5.[constructor와 non-constructor의 구분](#constructor와-non-constructor의-구분)

   2-6.[new 연산자](#new-연산자)

   2-7.[new.target](#newtarget)



<br>

<br>

## Object 생성자 함수

new 연산자와 함께 Object 생성자 함수를 호출하면 빈 객체를 생성하여 반환한다. 빈 객체를 생성한 이후 프로퍼티 또는 메소드를 추가하여 객체를 완성할 수 있다.

```javascript
// 빈 객체의 생성
const person = new Object();

// 프로퍼티 추가
person.name = 'Lee';
person.sayHello = function () {
  console.log('Hi! My name is ' + this.name);
};

console.log(person); // {name: "Lee", sayHello: ƒ}
person.sayHello(); // Hi! My name is Lee
```

> 생성자 함수?
>
> 생성자(constructor) 함수란 new 연산자와 함께 호출하여 객체를 생성하는 함수를 말한다. 생성자 함수에 의해 생성된 객체를 **인스턴스**(instance) 라 한다.
>
> 자바스크립트는 Object 생성자 함수 이외에도 String / Number / Boolean / Function / Array / Date / RegExp 등의 내장(bulit-in) 생성자 함수를 제공한다.
>
> ```javascript
> // String 생성자 함수에 의한 String 객체 생성
> const strObj = new String('Lee');
> console.log(typeof strObj); // object
> console.log(strObj);        // String {"Lee"}
> 
> // Number 생성자 함수에 의한 Number 객체 생성
> const numObj = new Number(123);
> console.log(typeof numObj); // object
> console.log(numObj);        // Number {123}
> 
> // Boolean 생성자 함수에 의한 Boolean 객체 생성
> const boolObj= new Boolean(true);
> console.log(typeof boolObj); // object
> console.log(boolObj);        // Boolean {true}
> 
> // Function 생성자 함수에 의한 Function 객체(함수) 생성
> const func = new Function('x', 'return x * x');
> console.log(typeof func); // function
> console.dir(func);        // ƒ anonymous(x)
> 
> // Array 생성자 함수에 의한 Array 객체(배열) 생성
> const arr = new Array(1, 2, 3);
> console.log(typeof arr); // object
> console.log(arr);        // [1, 2, 3]
> 
> // RegExp 생성자 함수에 의한 RegExp 객체(정규 표현식) 생성
> const regExp = new RegExp(/ab+c/i);
> console.log(typeof regExp); // object
> console.log(regExp);        // /ab+c/i
> 
> // Date 생성자 함수에 의한 Date 객체 생성
> const date = new Date();
> console.log(typeof date); // object
> console.log(date);        // Fri Feb 14 2020 17:17:59 GMT+0900 (대한민국 표준시)
> ```

<br>

## 생성자 함수

### 객체 리터럴에 의한 객체 생성방식의 단점

객체 리터럴에 의한 객체 생성방식은 직관적이고 간편하다.

하지만 객체 리터럴에 의한 객체 생성방식은 **단 하나**의 객체만을 생성한다. 따라서 동일한 프로퍼티를 갖는 객체를 **여러 개** 생성해야 하는 경우에는 효율적이지 않다.

```javascript
const circle1 = {
  radius: 5,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle1.getDiameter()); // 10

const circle2 = {
  radius: 10,
  getDiameter() {
    return 2 * this.radius;
  }
};

console.log(circle2.getDiameter()); // 20
```

객체는 프로퍼티를 통해 객체 고유의 상태(state)를 표현한다. 그리고 메소드를 통해 상태 데이터인 프로퍼티를 참조하고 조작하는 동작(behavior)을 표현한다.

따라서 상태를 표현하는 프로퍼티는 객체마다 다를 수 있으나 메소드는 내용이 동일한 경우가 많다. 위예제 또한 메소드는 동일한데, 각 프로퍼티만 다르다.

<br>

### 생성자 함수에 의한 객체 생성방식의 장점

생성자 함수에 의한 객체 생성방식 프로퍼티 구조가 동일한 객체 여러 개를 간편하게 생성할 수 있다.

> 생성자 함수 = 템플릿(클래스)
>
> 생성된 객체 = 객체(인스턴스)

```javascript
// 생성자 함수
function Circle(radius) {
  // 생성자 함수 내부의 this는 생성자 함수가 생성할 인스턴스를 가리킨다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}
const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
const circle2 = new Circle(10); // 반지름이 10인 Circle 객체를 생성

console.log(circle1.getDiameter()); // 10
console.log(circle2.getDiameter()); // 20
```

- this

this는 객체 자신의 프로퍼티나 메소드를 참조하기 위한 자기참조변수(self-referencing variable)이다.

this가 가리키는 값, 즉 this 바인딩은 **함수 호출방식에 따라 동적으로 결정된다.**

| 함수 호출방식        | this가 가리키는 값                     |
| -------------------- | -------------------------------------- |
| 일반 함수로서 호출   | 전역 객체                              |
| 메소드로서 호출      | 메소드를 호출한 객체(마침표 앞의 객체) |
| 생성자 함수로서 호출 | 생성자 함수가 생성할 인스턴스          |

```javascript
// 일반 함수로서 호출
function foo() {
  console.log(this);
}

foo(); // 브라우저 환경에서의 전역객체인 window 호출

// 메소드로서 호출
const obj = {
  foo() {
    console.log(this);
  }
}; 
obj.foo(); // obj

// 생성자 함수로서 호출
const inst = new foo(); // inst
```

생성자 함수는 객체(인스턴스)를 생성하는 함수이다. 하지만 자바와 같은 클래스 기반 객체지향 언어의 **생성자**(constructor)와는 다르게 그 형식이 정해져 있는 것이 아니라 **일반 함수와 동일한 방법**으로 생성자 함수를 정의하고 new 연산자와 함께 호출하면 해당 함수는 생성자 함수로 동작하게 된다.

-  new 연산자가 없을 경우의 호출

```javascript
function add(x, y) {
  return x + y;
}
// 생성자 함수
const add2 = new add(1,2);
// 일반 함수
const add3 = add(1,2);

console.log(add2) // add {constructor: Object}
console.log(add3) // 3
```

<br>

### 생성자 함수의 인스턴스 생성과정

생성자 함수의 역할

- 인스턴스를 생성하기 위한 템플릿(클래스)으로 동작하여 인스턴스 생성 - **필수**
- 생성된 인스턴스의 초기화(인스턴스 프로퍼티 추가 및 초기값 할당) - **옵션**

```javascript
// 생성자 함수
function Circle(radius) {
    
  // 인스턴스 초기화
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// 인스턴스 생성
const circle1 = new Circle(5);  // 반지름이 5인 Circle 객체를 생성
```

<br>

#### 생성자 함수에 의한 인스턴스 생성과정

1. 인스턴스 생성과 this 바인딩

   new 연산자와 함께 생성자 함수를 호출하면 자바스크립트 엔진은 암묵적으로 빈 객체를 먼저 생성한다. 이 빈 객체를 **인스턴스**라 하며 생성된 인스턴스는 this에 **바인딩** 된다. 

   인스턴스 생성 및 this 바인딩은 **런타임 이전에 실행된다.**

   >  바인딩이란?(Binding)
   >
   > 바인딩이란 식별자와 값을 **연결**하는 과정을 의미한다. 예를 들어 변수는 할당에 의해 값이 바인딩 된다.

2. 인스턴스 초기화

   생성자 함수의 몸체에 있는 코드가 한줄 씩 실행되어 this에 바인딩 되어있는 인스턴스를 초기화 한다. 즉, this에 바인딩 되어 있는 인스턴스에 프로퍼티나 메소드를 추가하고 생성자 함수가 **인수로 전달받은 초기값**을 인스턴스 프로퍼티에 할당하거나 **고정값**을 할당한다. 

3. 인스턴스 반환

   생성자 함수 내부의 모든 처리가 끝나면 완성된 인스턴스에 바인딩된 this가 암묵적으로 반환된다. 

   만약, thist가 아닌 다른객체를 명시적으로 반환하면 this가 반환되지 못하고 return문에 명시한 객체가 반환된다.

   하지만 명시적으로 원시값을 반환하면 원시값의 반환은 **무시**되고 암묵적으로 this가 반환된다.

   <strong><em>생성자 함수 내부에서 명시적으로 this가 아닌 값을 반환하는 것은 생성자 함수의 기본동작을 훼손하는 행위이므로 생성자 함수 내부에서 return 문은 반드시 생략해야 한다.</em></strong>

```javascript
function Circle(radius) {
  // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.

  // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
  // 3 
  // case 1 - 암묵적으로 this를 반환한다. 
    
  // case 2 - 명시적으로 객체를 반환하면 암묵적인 this 반환이 무시된다.
  return {}; 
  // case 3 - 명시적으로 원시값을 반환하면 원시값 반환은 무시되고 암묵적으로 this가 반환된다.
  return 100;  
}

const circle = new Circle(1);

// case 1, 3
console.log(circle); // Circle {radius: 1, getDiameter: ƒ}

// case 2
console.log(circle); // {}
```

<br>

### 내부 메소드 Call과 Construct

**함수선언문** 또는 **함수표현식**으로 정의한 함수는 일반적인 함수 뿐 아니라 **생성자함수**로서도 호출이 가능하다. 생성자 함수로서 호출한다는 것은 new 연산자와 함께 호출하여 객체를 생성하는 것을 의미한다.

함수는 객체이므로 일반객체와 동일하게 동작할 수 있다. 다시말해 함수객체는 일반객체가 가지고 있는 **내부슬롯**과 **내부메소드**를 모두 가지고 있다.

```javascript
// 함수는 객체이다.
function foo() {}

// 함수는 객체이므로 프로퍼티를 소유할 수 있다.
foo.prop = 10;

// 함수는 객체이므로 메소드를 소유할 수 있다.
foo.method = function () {
  console.log(this.prop);
};

foo.method(); // 10
```

함수 객체는 일반 객체가 가지고 있는 내부 슬롯과 내부 메소드는 물론, 함수로서 동작하기 위해 함수 객체만을 위한 [[Environment\]], [[FormalParameters]] 등의 내부 슬롯과 [[Call]], [[Construct]]와 같은 내부 메소드를 추가적으로 가지고 있다.

<em>함수가  **일반함수**로서 호출되면 함수 객체의 내부메소드 [[Call]]이 호출되고 new 연산자와 함께 **생성자 함수**로서 호출되면 내부메소드 [[Construct]]가 호출된다.</em>

```javascript
function foo() {}

// 일반적인 함수로서 호출: [[Call]]이 호출된다.
foo();

// 생성자 함수로서 호출: [[Construct]]가 호출된다.
new foo();
```

내부 메소드 [[Call]]을 갖는 함수 객체를 callable이라 하며, [[Construct]]를 갖는 함수객체를 constructor, [[Construct]]를 갖지 않는 함수객체를 non-constructor라고 부른다.

callable은 호출할 수 있는 객체, 즉 함수를 말하며 constructor는 생성자 함수로서 호출할 수 있는 객체를 의미한다.

모든 함수는 호출이 가능한 객체이므로 내부 메소드 [[Call]]을 가진 callable이며 생성자함수가 가능한 constructor 혹은 불가능한 non-constructor로 구성된다.

![image](https://user-images.githubusercontent.com/62285872/80907984-a7caa180-8d56-11ea-83ad-4379057c8d5d.png)

<br>

### constructor와 non-constructor의 구분

자바스크립트 엔진이 함수정의를 평가하여 함수객체를 생성할 때, 함수 정의방식에 따라 함수를 constructor와 non-constructor로 구분한다.

- constructor : 함수선언문, 함수표현식, 클래스
- non-constructor : 메소드(ES6 메소드 축약표현), 화살표 함수

```javascript
// 일반 함수 정의: 함수 선언문, 함수 표현식
function foo() {}
const bar = function () {};
// 프로퍼티 x의 값으로 할당된 것은 일반 함수 정의에 의해 생성된 함수 객체이다.
// 이는 메소드로 인정하지 않는다.
const baz = {
  x: function () {}
};

// 일반 함수로 정의된 함수만이 constructor이다.
new foo(); // OK
new bar(); // OK
new baz.x(); // OK

// 화살표 함수 정의
const arrow = () => {};

new arrow(); // TypeError: arrow is not a constructor

// 메소드 정의: ES6의 메소드 축약 표현만을 메소드로 인정한다.
const obj = {
  x() {}
};

new obj.x(); // TypeError: obj.x is not a constructor
```

함수를 일반 함수로서 호출하면 함수 객체의 내부 메소드 [[Call]]가 호출되고 new 연산자와 함께 생성자 함수로서 호출하면 내부 메소드 [[Construct]]가 호출된다.

non-constructor인 함수 객체는 내부 메소드 [[Construct]]를 갖지 않는다. 따라서 non-constructor인 함수 객체를 생성자 함수로서 호출하면 에러가 발생한다.

<br>

### new 연산자

일반함수와 생성자 함수에 외부적인 형식의 차이는 없다. 다만 new 연산자와 함께 함수를 호출하면 해당함수는 생성자 함수로 동작할 뿐이다.

즉, new 연산자와 함께 함수를 호출하면 함수 객체의 내부메소드 [[Call]]이 아니라 [[Construct]]가 호출된다.

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수 호출하면 일반 함수로서 호출된다.
const circle = Circle(5);
console.log(circle); // undefined

// 일반 함수 내부의 this는 전역 객체 window를 가리킨다.
console.log(radius); // 5
console.log(getDiameter()); // 10

circle.getDiameter();
// TypeError: Cannot read property 'getDiameter' of undefined
```

위 예제에서 함수선언문으로 정의된 Circle함수를 new 연산자 없이 호출할 경우 일반함수처럼 호출이 된다. 이 경우 일반함수 내의 this는 전역객체(브라우져일 경우 window)가 되어 `window.radius = 5` / `window.getDiameter = function() {return 2 * window.radius}` 가 된다.

<strong>일반 함수와 생성자 함수에 특별한 형식적 차이는 없다. 따라서 생성자 함수는 일반적으로 첫문자를 대문자로 기술하는 파스칼 케이스로 명명하여 일반 함수와 구별할 수 있도록 노력한다.</strong>

<br>

### new.target

만약 실수로 생성자 함수로 호출해야 할 경우 new 연산자를 누락하여 일반함수로 호출하게 된다면 위에서 확인했던 것처럼 의도한 결과가 나오지 않을것이다.

ES6에서는 일반함수로 호출했다 할지라도 생성자함수로 호출할 수 있는 방식인 `new.target`을 지원한다. `new.target`은 this와 유사하게 모든 함수내부에서 암묵적인 지역변수와 같이 사용되며 메타 프로퍼티라고 부른다. 단, **IE** 에서는 `new.target`을 지원하지 않으니 주의하여야 한다.

함수 내부에서 `new.target`을 사용하면 new 연산자와 함께 함수가 호출되었는지 확인이 가능하다.

- new 연산자와 함께 호출된 함수 내부의 new.target 값 : 함수 자신
- new 연산자 없이 호출된 함수 내부의 new.target 값 : undefined

```javascript
// 생성자 함수
function Circle(radius) {
  // 이 함수가 new 연산자와 함께 호출되지 않았다면 new.target은 undefined이다.
  if (!new.target) {
    // new 연산자와 함께 생성자 함수를 재귀 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 new.target을 통해 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter());
```

만약 new.target을 사용할 수 없는 상황이라면, 스코프 세이프 생성자(ScopeSafe Constructor) 패턴을 사용할 수 있다.

new 연산자와 함께 생성자 함수에 의해 생성된 객체(인스턴스)는 **프로토타입**에 의해 생성자 함수와 연결된다. 이를 이용해 new 연산자와 함께 호출되었는지 확인이 가능하다.

```javascript
// Scope-Safe Constructor Pattern
function Circle(radius) {
  // 생성자 함수가 new 연산자와 함께 호출되면 함수의 선두에서 빈 객체를 생성하고
  // this에 바인딩한다. 이때 this와 Circle은 프로토타입에 의해 연결된다.

  // 이 함수가 new 연산자와 함께 호출되지 않았다면 이 시점의 this는 전역 객체 window를 가리킨다.
  // 즉, this와 Circle은 프로토타입에 의해 연결되지 않는다.
  if (!(this instanceof Circle)) {
    // new 연산자와 함께 호출하여 생성된 인스턴스를 반환한다.
    return new Circle(radius);
  }

  this.radius = radius;
  this.getDiameter = function () {
    return 2 * this.radius;
  };
}

// new 연산자 없이 생성자 함수를 호출하여도 생성자 함수로서 호출된다.
const circle = Circle(5);
console.log(circle.getDiameter()); // 10
```

내장 생성자 함수 중 Object 또는 Function 생성자 함수는 new 연산자 없이 호출해도 new 연산자와 함께 호출했을 때와 <strong>동일하게 동작한다.</strong>

```javascript
let obj = new Object();
console.log(obj); // {}

obj = Object();
console.log(obj); // {}

let f = new Function('x', 'return x ** x');
console.log(f); // ƒ anonymous(x) { return x ** x }

f = Function('x', 'return x ** x');
console.log(f); // ƒ anonymous(x) { return x ** x }
```

하지만 String, Number, Boolean 생성자 함수는 new 연산자와 함께 호출했을 때 String 객체를 생성하여 반환하지만, new 연산자 없이 호출하면 문자열, 숫자, 불리언 값을 반환한다.

```javascript
// new 연산자 없이 호출
let v = String('hello');

console.log(v);               // hello
console.log(typeof v);        // string

v = Number(123);

console.log(v);               // 123
console.log(typeof v);        // number

v = Boolean(true); 

console.log(v);                // true
console.log(typeof v);         // boolean

// new 연산자와 함께 호출
let a = new String('world');

console.log(a);         // String {"world"}
console.log(typeof a);  // object

a = new Number(123);

console.log(a);         // Number {123}
console.log(typeof a);  // object

a = new Boolean(false);

console.log(a);         // Boolean {false}
console.log(typeof a);  // object
```

