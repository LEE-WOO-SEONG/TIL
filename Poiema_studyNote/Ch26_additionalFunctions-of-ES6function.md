# ES6 함수의 추가기능

- Toc

1. [함수의 구분](#함수의-구분)

2. [메소드](#메소드)

3. [화살표 함수](#화살표-함수)

   3-1. [화살표 함수정의](#화살표-함수정의)

   3-2. [화살표 함수와 일반함수의 차이](#화살표-함수와-일반함수의-차이)

   3-3. [this](#this)

   3-4. [super](#super)

   3-5. [arguments](#arguments)

4. [Rest 파라미터](#Rest-파라미터)

5. [매개변수 기본값](#매개변수-기본값)



<br>

<br>

## 함수의 구분

ES6 이전까지 자바스크립트의 함수는 다른 프로그래밍 언어와는 다르게 별다른 구분없이 다양한 목적으로 사용되었다. 예를들면 함수는 일반함수 / 생성자 함수 / 객체의 메소드로 호출이 가능하다. 

```JS
var foo = function () {
    return 1;
};

// 일반함수
foo(); // 1

// 생성자함수
new foo(); // foo{}

var obj = { a : foo };

// 메소드
obj.a(); // 1
```

ES6이전의 모드함수는 일반함수 / 생성자 함수로서 호출이 가능하다. 즉 ES6 이전의 모든 함수는 callable이며 constructor 이다. 또한 객체 내에 위치한 메소드도 일반 함수와 생성자 함수 모두로 호출이 가능하다. 

이처럼 ES6 이전의 함수는 사용목적에 따라 명확한 구분이 없으므로 호출방식에 특별한 제약이 없고 생성자 함수로 호출되지 않아도 프로토타입 객체를 생성한다. 이는 혼란스러우며 실수를 유발시킬 가능성이 있고 성능에도 좋지 않다.

이러한 문제를 해결하기 위해 ES6에서는 사용목적에 따라 함수를 3가지 종류로 명확히 구분하였다.

| ES6 함수구분                      | constructor | prototype | super | arguments |
| --------------------------------- | ----------- | --------- | ----- | --------- |
| 일반함수<br />(Normal function)   | O           | O         | X     | O         |
| 메소드<br />(Method function)     | X           | X         | O     | O         |
| 화살표 함수<br />(Arrow function) | X           | X         | X     | X         |

<br>

## 메소드

ES6 이전 사양에는 메소드에 대한 명확한 정의가 없었다. 일반적으로 메소드는 객체에 바인딩된 함수를 일컫는 의미로 사용되었다.

하지만 ES6 사양에서는 메소드에 대한 정의가 명확하게 규정되었다. ES6사양에서 메소드는 <strong>메소드 축약표현으로 정의된 함수</strong>만을 의미한다.

```js
const obj = {
    x : 1,
    // ES6식 메소드 축약표현
    foo() { return this.x; },
    // 일반함수
    bar: function() {return this.x ;}
};
```

ES6 사양에서 정의한 메소드는 인스턴스를 생성할 필요가 없는 non-constructor이다. 따라서 <strong>ES6에서 메소드는 생성자 함수로서 호출할 수 없다. </strong> prototype 프로퍼티 또한 갖지 않는다.

```js
new foo(); // TypeError: obj.foo is not a constructor
new bar(); // -> bar {}

obj.foo.hasOwnProperty('prototype'); // false
obj.bar.hasOwnProperty('prototype'); // true
```

![image-20200514174324169](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200514174324169.png)	

표준 빌트인 객체의 메소드도 모두 non-constructor이다.

```js
console.log(String.prototype.toUpperCase.prototype); // undefined
console.log(Number.prototype.toFixed.prototype); // undefined
console.log(Array.prototype.map.prototype); // undefined
```

ES6 메소드는 메소드가 바인딩된 객체를 가리키는 내부슬롯 [[HomeObject]]를 갖는다. super 참조는 내부슬롯[[HomeObject]]를 사용하여 수퍼 클래스의 메소드를 참조하므로 내부슬롯 [[HomeObject]]를 갖는 ES6 메소드 만이 `super` 키워드를 사용할 수 있다.

```js
const base = {
    name : 'lee',
    sayHi() {
        return `hi, ${this.name}`;
    }
};

const derived = {
    __proto__ : base,
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
};

console.log(derived.sayHi()); // hi, lee. how are you doing?
```

ES6 메소드가 아니면 `super` 키워드를 사용할 수 없다. 내부슬롯 [[HomeObject]]를 갖지 않기 때문이다.

```js
const derived = {
    __proto__ : base,
    sayHi: function () {
        // SyntaxError: 'super' keyword unexpected here
        return `${super.sayHi()}. how are you doing?`;
    }
}
```

<br>

## 화살표 함수

화살표 함수는 `function` 키워드 대신 화살표 `=>` 를 사용하여 기존의 함수정의 방식보다 간략하게 함수를 정의할 수 있다. 화살표 함수는 표현만 간략한 것이 아니라 내부 동작도 기존의 함수보다 간략하다. <strong>특히, 화살표 함수는 콜백함수 내부에서 this가 전역객체를 가리키는 문제를 해결하기 위한 대안으로 유용하다.</strong>

<br>

### 화살표 함수정의

- 화살표 함수의 정의 문법

1. 매개변수 선언

매개변수가 여러개인 경우, 소괄호 안에 매개변수를 선언한다.

```js
(x, y) => { ... }
```

매개변수가 한 개인 경우, 소괄호의 생략이 가능하다.

```js
x => { ... }
```

매개변수가 없는 경우 소괄호를 생략할 수 없다.

```js
() => { ... }
```

<br>

2. 함수몸체 정의

함수 몸체가 한 줄의 문으로 구성된다면 함수 몸체를 감싸는 중괄호 {}를 생략할 수 있다. 이 때 문은 암묵적으로 반환된다.

```js
x = > x * x;

x => { return x * x };

// 매개변수가 없는 화살표 함수
const now => () => Date.now();

// 매개변수가 한 개인 화살표 함수
const name = a => a;

// 매개변수가 여러 개인 화살표 함수
const add = (x, y) => x + y;
```

함수 몸체가 여러 줄의 문으로 구성된다면 함수 몸체를 감싸는 중괄호를 생략할 수 없다. 이 때 반환값이 있따면 명시적으로 반환해야 한다.

```js
const add = (x, y) => {
    const result = x + y;
    return result;
}
```

객체 리터럴을 반환하는 경우, 객체 리터럴을 **소괄호**로 감싸 주어야 한다.

```js
() => ({ a : 1 });

const create = (id, content) => ({ id, content });
```

화살표 함수도 즉시실행함수(IIFE)로 사용할 수 있다.

```js
const person = (name = > ({
    sayHi() { return `hi, my name is ${name}`; }
}))('lee');

console.log(person); // { sayHi : f }
```

화살표 함수도 일급객체이므로 Array.prototype.map / Array.prototype.filter / Array.prototype.reduce와 같은 고차함수(Higher Order Function / HOF)에 인수로 전달할 수 있다. 이 경우 일반적인 함수 표현식보다 표현이 간결하다.

```JS
// ES5
[1, 2, 3].map(function (v) {
    return v * 2;
});

// ES6 화살표 함수
[1, 2, 3].map(v => v * 2);
```

<br>

### 화살표 함수와 일반함수의 차이

- 화살표 함수는 인스턴스를 생성할 수 없는 non-constructor 이다.

때문에 new 연산자와 함께 호출할 수 없고 prototype 프로퍼티 또한 가지고 있지 않으며 프로토타입도 생성하지 않는다.

- 중복된 매개변수 이름을 선언할 수 없다.

일반함수는 중복된 매개변수이름을 선언해도 에러가 발생하지 않는다. 하지만 결과값은 좀 이상하다. 의도한대로 동작하지는 않음.

```js
function normal(a, a) { return a + a; }
console.log(normal(1, 2)) //4
```

화살표 함수는 중복된 매개변수 이름을 선언할 수 없다.

```js
const arrow = (a, a) => a + a;
// SyntaxError: Duplicate parameter name not allowed in this context
```

- 화살표 함수는 함수 자체의 this / arguments / super / new.target 바인딩을 갖지 않는다.

화살표 함수 내부에서 this / arguments / super / new.target을 참조하면 스코프 체인을 통해 상위 컨텍스트의 값을 참조한다.

화살표 함수가 화살표 함수의 중첩 함수인 경우, 부모 화살표 함수에도 this, arguments, super, new.target 바인딩이 없으므로 부모 화살표 함수의 상위 컨텍스트의 this, arguments, super, new.target를 참조한다. 즉, 화살표 함수가 중첩 함수인 경우, 상위 스코프에 존재하는 가장 가까운 함수 중에서 <strong>화살표 함수가 아닌 부모 함수의 this, arguments, super, new.target를 참조한다.</strong>

<br>

### this

화살표 함수가 일반함수와 구별되는 가장 큰 특징은 바로 this이다. 또한 화살표 함수는 다른 함수의 **인수**로 전달되어 **콜백함수**로 사용되는 경우가 많다.

화살표 함수의 this는 일반 함수의 this와 다르게 동작하는데, <strong>이는 콜백함수 내부의 this문제, 즉 콜백함수 내부의 this가 외부함수의 this와 다르기 때문에 발생하는 문제를 해결하기 위해 의도적으로 설계된 것이다.</strong>

특히 일반함수로 호출되는 콜백함수의 경우는 주의가 필요하다. 어떤 함수의 인수로 전달되어 함수 내부에서 호출되는 콜백함수도 중첩함수라고 할 수 있다.

```js
// 주어진 배열의 각 요소에 접두어를 추가하는 예제
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }
    
    preFixArray(arr) {
        // ①
  // 인수로 전달된 배열 arr을 순회하며 배열의 모든 요소에 prefix를 추가한다.
        return arr.map(function (item) {
            return this.prefix + ' ' + item; // ②
      // -> TypeError: Cannot read property 'prefix' of undefined
        });
    }
}

const prefixer = new Prefixer('hi');
console.log(prefixer.prefixArray(['lee', 'kim']));
```

예제를 실행했을 때 기대하는 결과는 `['Hi Lee', 'Hi Kim']`이다. 하지만 TypeError가 발생한다.

프로토타입 메소드 내부인 ①에서 this는 메소드를 호출한 객체(위 예제의 경우 prefixer 객체)를 가리킨다. 그런데 Array.prototype.map의 인수로 전달한 콜백 함수의 내부인 ②에서 this는 전역 객체를 가리킨다. 이는 콜백함수가 일반함수로 호출되기 때문이다.

생성자 함수 또는 메소드로서 호출되지 않고 일반함수로서 호출되는 모든 함수내부의 this는 전역객체를 가리킨다. 하지만 클래스 내부코드는 모두 **strict** 모드가 적용되고 strict 모드에서 함수를 <strong>일반함수로서 호출하면 this에 undefined가 바인딩 된다.</strong>

이때 발생하는 문제가 바로 “콜백 함수 내부의 this 문제”이다. 즉, 콜백 함수의 this(②)와 외부 함수의 this(①)가 서로 다른 객체를 가리키고 있기 때문에 TypeError가 발생한 것이다

ES6이전에는 이와같은 "콜백 함수 내부의 this 문제"를 해결하기 위해 아래와 같은 방법을 사용했다.

- 메소드를 호출한 prefixer 객체를 가리키는 this를 일단 회피시킨 다음 콜백함수 내부에서 사용한다.

```js
prefixArray(arr) {
    const that = this;
    return arr.map(function (item) {
        return that.prefix + ' ' + item;
    });
}
```

- Array.prototype.map의 <strong>두번째 매개변수</strong>에 메소드를 호출한 prefixer 객체를 가리키는 this를 전달한다.

  ES5에서 도입된 Array.prototype.map은 “콜백 함수 내부의 this 문제”를 해결하기 위해 두번째 매개 변수에 this로 사용할 객체를 전달할 수 있다.

```js
prefixArray(arr) {
    return arr.map(function (item) {
        return that.prefix + ' ' + item;
    }, this);
}
```

- Function.prototype.bind 메소드를 사용하여 메소드를 호출한 prefixer 객체를 가리키는 this를 바인딩한다. 

```js
prefixArray(arr) {
    return arr.map(function (item) {
        return that.prefix + ' ' + item;
    }.bind(this));
}
```

ES6에서는 화살표 함수를 사용하여 "콜백 함수 내부의 this 문제"를 해결할 수 있다.

```js
class Prefixer {
    constructor(prefix) {
        this.prefix = prefix;
    }
    
    prefixArray(arr) {
        return arr.map(item => `${this.prefix} ${item}`);
    }
}
const prefixer = new Prefixer('hi');
prefixer.prefixArray(['lee', 'kim']); // -> ['Hi Lee', 'Hi Kim']
```

화살표 함수는 함수 자체의 this 바인딩이 **없다**. 화살표 함수 내부에서 this를 참조하면 <strong>상위컨텍스트</strong>의 this를 그대로 참조한다. 이를 Lexical this라 한다. 이는 마치 렉시컬 스코프와 같이 <strong>화살표 함수의 this가 함수가 정의된 위치에 의해 결정된다는 것을 의미한다.</strong>

화살표 함수를 제외한 모든 컨텍스트에는 this 바인딩이 반드시 존재한다. 따라서 일반적인 식별자와는 다르게 this는 스코프 체인을 통해 탐색하지 않는다. 하지만 화살표 함수 내부에는 this가 없기 때문에 화살표 함수 내부에서 this를 참조하면 스코프 체인을 통해 this의 값을 탐색한다. 화살표 함수를 Function.prototype.bind를 사용하여 표현하면 아래와 같다.

```js
() => this.x;

(function () {return this.x}).bind(this)
```

만약 화살표 함수가 화살표 함수의 중첩함수인 경우, 부모 화살표 함수가 참조하는 상위 컨텍스트의 this를 참조한다. 죽, 화살표 함수가 중첩함수인 경우, 상위 스코프에 존재하는 가장 가까운 함수 중에서 <strong>화살표 함수가 아닌 부모 함수의 this를 참조한다.</strong> 만약 화살표 함수가 **전역함수**라면 화살표 함수의 this는 **전역객체**를 가리킨다.

``` js
const foo = () => console.log(this);
foo(); // window

(function () {
    const foo = () => console.log(this);
    foo();
}).call({ a : 1 }); // { a : 1 }

(function () {
    const foo = () => () => console.log(this);
    foo()();
}).call({ a : 1 }); // { a : 1 }

const counter = {
    num : 1,
    increase: () => ++this.num
};

console.log(counter.incrase()); NaN
```

화살표 함수 내부의 this는 Function.prototype.call / apply / bind 메소드를 사용하여 변경할 수 없다.

````js
window.x = 1;

const normal = function () { return this.x};
const arrow = () => this.x;

console.log(normal.call({ x : 10 }));   // 10
console.log(arrow.call({ x : 10 }));    // 1
````

화살표 함수가 Function.prototype.call / apply / bind 메소드를 사용할 수 없다는 의미는 아니다. <strong>단지 화살표 함수의 this는 일단 결정된 이후 변경할 수 없고 언제나 유지된다.</strong>

```js
const add = (a, b) => a + b;

console.log(add.call(null, 1, 2)) // 3
console.log(add.apply(null, [1, 2])) // 3
console.log(add.bind(null, 1, 2)()) // 3
```

메소드를 화살표 함수로 정의하는 것은 피해야 한다.

```js
const person = {
    name : 'lee',
    sayHi : () => console.log(`hi ${this.name};`)
};

person.sayHi(); // Hi
```

위 예제으 경우 `sayHi` 프로퍼티에 할당한 화살표 함수내부의 this는 메소드를 호출한 객체를 가리키지 않고 <strong>상위 컨텍스트</strong>인 전역객체를 가리킨다. 따라서 화살표 함수로 메소드를 정의하는 것은 의도치 않은 결과를 가져올 수 있어 바람직 하지 않다. 메소드는 ES6 메소드 정의를 사용하는 것이 좋다.

프로토타입 객체에 화살표 함수를 할당하는 경우도 동일한 문제가 발생한다.

```js
function Person(name) {
    this.name = name;
}

Person.prototype.sayHi = () => console.log(`hi ${this.name}`);

const person = new Person('Lee');

person.sayHi();  // hi
```

프로토타입 객체에는 ES6 메소드 정의를 사용할 수 없으므로 일반함수를 할당한다.

```JS
function Person() {
    this.name = name;
}

Person.prototype.sayHi = function() { console.log(`hi ${this.name}`)};
                                     
const person = new Person('lee');
person.sayHi(); // hi lee
```

클래스 필드 정의 제안을 사용하여 클래스 필드에 화살표 함수를 할당할 수도 있다.

```js
class Person {
    name = 'lee';
	sayHi = () => console.log(`hi ${this.name}`);
}

const person = new Person();
person.sayHi(); // hi lee
```

이 때 `sayHi` 클래스 필드에 할당한 화살표 함수내부에서 this를 참조하면 상위 컨텍스트의 this를 그대로 가리킨다. 그렇다면 sayHi 클래스 필드에 할당한 화살표 함수의 상위 컨텍스트는 무엇일까? <strong>sayHi 클래스 필드는 인스턴스 프로퍼티</strong> 이므로 아래와 같은 의미이다.

```js
class Person {
    constructor() {
        this.name = 'lee';
        this.sayHi = () => console.log(`hi ${this.name}`);
    }
}
```

따라서 sayHi 클래스 필드에 할당한 <strong>화살표 함수의 상위 컨텍스트는 constructor</strong>이며 화살표 함수의 this는 constructor의 this와 같다. constructor에서의 this는 클래스가 생성한 인스턴스를 가리키므로 `sayHi` 클래스 필드에 할당한 화살표 함수내부의 this 또한 클래스가 생성한 인스턴스를 가리킨다.

하지만 클래스 필드에 할당한 화살표 함수는 프로토타입 메소드가 아니라 인스턴스 메소드가 된다. <strong>따라서 ES6 메소드 정의를 사용하는 것이 좋다.</strong>

<br>

### super

화살표 함수는 함수자체의 super 바인딩이 없다. 따라서 화살표 함수 내부에서 super를 참조하면 상위 컨텍스트의 super를 참조한다.

```js
class Base {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        return `hi ${this.name}`;
    }
}

class Derived extends Base {
    sayHi = () => `${super.sayHi()} how are you doing?`;
}

const derived = new Derived('lee');
console.log(derived.sayHi());
```

super는 내부 슬롯 [[HomeObject]]를 갖는 ES6 메소드만이 사용할 수 있는 키워드이다. 위 예제의 sayHi 클래스 필드에 할당한 화살표 함수는 ES6 메소드가 아니지만 상위 컨텍스트의 super를 그대로 참조하기 때문에 super 참조가 가능하다.

sayHi 클래스 필드에 할당한 화살표 함수의 상위 컨텍스트는 constructor이며 화살표 함수의 super는 constructor의 super와 같다.

<br>

### arguments

화살표 함수는 함수 자체의 arguments 바인딩이 없다. 따라서 화살표 함수내부에서 arguments를 참조하면 상위 컨텍스트의 arguments를 참조한다.

```js
(function () {
    const foo = () => console.log(arguments);
    foo(3, 4);
}(1, 2));       // [Arguments] { '0': 1, '1': 2 }

const foo = () => console.log(arguments);
foo(1, 2); // ReferenceError: arguments is not defined
```

arguments 객체는 매개변수의 개수를 확정할 수 없는 가변인자 함수를 구현할 때 유용하다. 하지만 화살표 함수에서는 arguments 객체를 사용할 수 없다. 상위 컨텍스트의 arguments 객체를 참조할 수는 있지만 화살표 함수자신에게 전달된 인수 목록을 확인할 수 없으므로 그다지 도움이 되지 않는다.
<br>

## Rest 파라미터

### 기본문법

Rest 파라미터는 매개변수의 이름 앞에 세개의 점 `...`을 붙여서 정의한 **매개변수**를 의미한다. Rest 파라미터는 함수에 전달된 인수들의 목록을 **배열**로 전달받는다.

```js
function foo(...rest) {
    console.log(rest);  // [1, 2, 3, 4, 5]
    
    console.log(Array.isArray(rest)) // true
}

foo(1, 2, 3, 4, 5);
```

함수에 전달된 인수들은 순차적으로 매개변수와 Rest 파라미터에 할당된다.

```js
function foo(param, ...rest) {
    console.log(param);  // 1
    console.log(rest);   // [2, 3, 4, 5]
}

foo(1, 2, 3, 4, 5);

function bar(param1, param2, ...rest) {
    console.log(param1); // 1
    console.log(param2); // 2
    console.log(rest);   // [3, 4, 5]
}

bar(1, 2, 3, 4, 5);
```

Rest 파라미터는 먼저 선언된 매개변수에 할당된 인수를 제외한 나머지 인수들이 모두 배열에 담겨 할당된다. <strong>따라서 Rest 파라미터는 반드시 매개변수의 마지막 이어야 한다.</strong>

```js
function foo(...rest, param1, param2) {}

foo (1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

Rest 파라미터는 <strong>단 하나만 선언할 수 있다.</strong>

```js
function foo(...rest1, ...rest2) {}

foo(1, 2, 3, 4, 5);
// SyntaxError: Rest parameter must be last formal parameter
```

Rest 파라미터는 함수정의 시 선언한 매개변수 개수를 나타내는 함수객체의 length 프로퍼티에 영향을 주지 않는다.

```js
function foo(...rest) {}
console.log(foo.length);  // 0

function bar(x, ...rest) {}
console.log(bar.length);  // 1

function baz(x, y, ...rest) {}
console.log(baz.length);  // 2
```

<br>

### Rest 파라미터와 arguments 객체

ES5에서는 인자의 개수를 사전에 알 수 없는 가변인자 함수의 경우 arguments 객체를 통해 인수를 확인한다. arguments 객체는 함수 호출 시 전달된 인수들의 정보를 담고 있는 순회가능한(iterable) 유사배열 객체이며 함수 내부에서 지역변수처럼 사용할 수 있다.

```js
function sum() {
    console.log(arguments);
}

sum(1, 2);  // {'0': 1, '1': 2, length: 2}
```

가변인자 함수는 매개변수를 통해 인수를 전달받는 것이 불가능하므로 arguments 객체를 활용하여 인수를 전달받는다. 하지만 arguments 객체는 유사배열 객체이므로 배열 메소드를 사용하려면 Function.prototype.call 메소드를 통해 this를 변경하여 배열 메소드를 호출해야 하는 번거로움이 있다.

```js
function sum() {
    var array = Array.prototype.slice.call(arguments);
    
    return array.reduce(function (pre, cur) {
        return pre + cure;
    }, 0);
}

console.log(sum(1, 2, 3, 4, 5)); // 15
```

ES6 에서는 rest 파라미터를 사용하여 가변인자의 목록을 배열로 직접 전달받을 수 있다. 이를 통해 유사배열인 arguments 객체를 배열로 변환하는 번거로움을 피할 수 있다.

```js
function sum(...args) {
    return args.reduce((pre, cur) => pre + cur, 0)
}
console.log(sum(1, 2, 3, 4, 5));  // 15
```

일반함수와 메소드는 rest 파라미터와 arguments 객체를 모두 사용할 수 있다. 하지만 화살표 함수는 함수자체의 arguments 객체를 갖지 않는다. 따라서 화살표 함수로 가변인자 함수를 구현해야 할 때는 반드시 rest 파라미터를 사용해야 한다.

```js
var normal = function () {}
console.log(normal.hasOwnProperty('arguments')); // true

var arrow = () => {};
console.log(arrow.hasOwnProperty('arguments'));  // false
```

<br>

## 매개변수 기본값

함수를 호출할 때 매개변수의 개수만큼 인수를 전달하는 것이 바람직 하지만 그렇지 않은 경우에도 에러가 발생하지는 않는다. 이는 자바스크립트 엔진이 함수의 매개변수의 개수와 인수의 개수를 체크하지 않기 때문이다. 인수가 부족한 경우 매개변수의 값은 undefined 이다.

```js 
function sum(x, y) {
    return x + y;
}

console.log(sum(1));  // NaN
```

따라서 매개변수에 적절한 인수가 전달되었는지 함수 내부에서 확인할 필요가 있다.

```JS
function sum(x, y) {
    x = x || 0;
    y = y || 0;
    
    return x + y;
}

console.log(sum(1, 2));  // 3
console.log(sum(1));   // 1
```

ES6에서는 매개변수 기본값을 사용하여 함수 내에서 수행하던 인수 체크 및 초기화를 간소화 할 수 있다.

```JS
function sum(x = 0, y = 0) {
    return x + y;
}

console.log(sum(1, 2)); // 3
console.log(sum(1));    // 1
```

매개변수 기본값은 매개변수에 <strong>인수를 전달하지 않았을 경우와 undefined를 전달한 경우</strong>에만 유효하다.

```js
function logName(name = 'lee') {
    console.log(name);
}

logName();          // lee
logName(undefined); // lee
logName(null);      // null
```

앞서 살펴본 <strong>rest 파라미터에는 기본값을 지정할 수 없다.</strong>

```js
function foo(...rest = []) {
    console.log(rest);
}
// SyntaxError: Rest parameter may not have a default initializer
```

매개변수 기본값은 함수 정의 시 선언한 매개변수 개수를 나타내는 함수 객체의 length 프로퍼티와 arguments 객체에 영향을 주지 않는다.

```js
function sum(x, y = 0) {
    console.log(arguments);
}

console.log(sum.length);  // 1

sum(1) // Argumetns { '0' : 1 }
sum(1, 2) // Arguments { '0' : 1, '1' : 2 }
```

