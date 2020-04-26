# object

- Toc

1. [객체](#객체)
2. [객체 리터럴에 의한 객체생성](#객체-리터럴에-의한-객체생성)
3. [프로퍼티](#프로퍼티property)
4. [메소드](#메소드method)
5. [프로퍼티 접근](#프로퍼티-접근)
6. [프로퍼티 값 갱신](#프로퍼티-값-갱신)
7. [프로퍼티 동적 생성](#프로퍼티-동적-생성)
8. [프로퍼티 삭제](#프로퍼티-삭제)
9. [ES6에 추가된 객체 리터럴의 확장기능](#ES6에-추가된-객체-리터럴의-확장기능)

<br>

<br>

## 객체

객체기반 언어인 자바스크립트는 원시값을 제외한 나머지 값들은 모두 '객체'이다.

단 하나의 값만을 나타내는 원시타입과 달리, 객체타입은 **다양한 타입의 값**들을 하나의 단위로 구성한 복합적인 자료구조이다.

객체(object)는 **property의 집합**이며 property는 key(키)와 value(값)으로 구성된다.

```javascript
var person = {
    name: 'lee',
    age: 29
};
```

위 예제에서 person은 객체이며 해당 객체는 `name: 'lee'` 와 `age: 29` 라는 2개의 property로 구성되어 있다. 또한 객체 내의 key는 `name` 과 `age` 이며 value는 `lee`와 `29` 이다.

-  객체 : person이라는 식별자를 가진 객체.
- property: name: 'lee' / age: 29
- key : name / age
- value: 'lee' / 29

> 자바스크립트에서 사용할 수 있는 모든 '값'은 property가 될 수 있다. 함수(function) 또한 **일급객체** 이므로 값으로 취급되어 property가 될 수 있다.
>
> 만약, property 값이 함수(function)일 경우, 일반함수와 구분짓기 위해 **메소드(method)**라 부르니 참고하도록 하자.

```javascript
var counter = {
    num : 0,
    increase: function() {
        this.num ++;
    }
};
```

위 예제에서 method는 increase 함수이다.

- property와 method의 역할

1. property : 객체의 **상태**를 나타내는 값(데이터).
2. method : property(상태 데이터)를  참조하고 조작할 수 있는 동작?

객체는 상태를 나타내는 값(property)과 property를 참조하고 조작할 수 있는 동작(method)를 모두 포함할 수 있어 상태와 동작을 **하나의 단위로 구조화** 할 수 있기 때문에 용이하다.?

> 객체와 함수
>
> 자바스크립트에서 객체는 함수와 밀접한 관련이 있다. 함수로도 객체생성이 가능하며 함수 자체가 객체이기 때문이다. 하지만 현 시점에서 함수와 객체는 아직 상세하게 배우지 않았기 때문에 지금은 이정도만 알고 넘어가자.

<br>

## 객체 리터럴에 의한 객체생성

C++과 java와 같은 클래스 기반 객체지향 언어들은 클래스를 사전에 정의하고, 필요한 시점에 new 연산자와 함께 생성자(constructor)를 호출하여 **인스턴스**(instance)를 생성하는 방식으로 객체를 생성한다.

자바스크립트는 프로토타입(prototype) 기반의 객체지향 언어로 클래스 기반 객체지향 언어와는 다른 다양한 객체 생성 방법이 존재한다.

> 인스턴스란? (instance)
>
> 인스턴스란 클래스에 의해 생성되어 메모리에 저장된 '실체' 를 의미한다. 객체지향 프로그래밍에서 객체는 클래스와 인스턴스를 포함한 개념이다. 클래스는 인스턴스를 생성하기 위한 템플릿의 역할을 한다. 인스턴스는 **객체가 메모리에 저장되어 실제로 존재하는 것**에 초점을 맞춘 용어이다.

<br>

- 자바스크립트의 객체 생성 방법

1. 객체 리터럴
2. object 생성자 함수
3. 생성자 함수
4. object.create 메소드
5. 클래스 (ES6)

<BR>

### 객체리터럴을 이용한 객체생성

객체 리터럴은 중괄호`{}` 내에 **0개 이상**의 property를 정의한다. **변수에 할당이 이루어지는 시점**에 자바스크립트 엔진은 객체 리터럴을 해석하여 객체를 생성한다.

```javascript
// 객체리터럴

var person = {
    name: 'lee',
    sayHello: function () {
        console.log(`hello! my name is ${this.name}.`)
    }
};
console.log(typeof person);    // object

// 객체리터럴 property 0개
var empty = {};
console.log(empty);            // object
```

> 여기서 한가지 이상한 점이 있다. 지금까지 코드블럭 `{}` 은 self closing 으로인해 세미콜론을 붙이지 않아도 된다고 하였지만 상기 예제들에서는 객체가 끝나는 시점에 세미콜론을 사용하는 것을 볼 수 있다.

>  **객체리터럴은 값으로 평가되는 표현식이다. 그렇기 때문에 객체에서 중괄호는 코드블럭을 의미하지 않아 세미콜론의 생략이 불가능하다.** => 아직 이말이 완벽하게 이해되지 않는다.. 조금 더 생각해 봐야 겠다.

<br>

## 프로퍼티(property)

객체는 0개이상의 프로퍼티로 구성된다. 이러한 프로퍼티들을 나열할 때에는 쉼표`,` 로 구분한다. 일반적으로 마지막 프로퍼티 뒤에는 쉼표를 사용하지 않으나 사용해도 문제는 없다.

- 프로퍼티의 key와 value로 사용할 수 있는 값

1. key : 빈 문자열을 포함하는 모든 **문자열** 또는 **symbol값**

2. value : 자바스크립트에서 사용할 수 있는 모든 값. 

<br>

프로퍼티 key는 프로터피 값에 접근할 수 있는 이름으로 **식별자** 역할을 한다.

> Q) 그렇다면 변수(CH_4)에서 배웠던 식별자 네이밍 규칙을 프로퍼티 key도 따라야 하는가?
>
> 답은 그래도 되고 안그래도 된다.
>
> 프로퍼티 key는 문자열 혹은 symbol값으로 표현 가능하다고 했다. 문자열은 따옴표(' ')로 묶어서 표기해야 한다. 하지만 식별자 네이밍 규칙을 준수하는 이름들은 따옴표를 생략할 수 있으며 반대로 식별자 네이밍 규칙을 **준수하지 않는** 이름에는 반드시 따옴표를 사용해야 한다.

- 객체 프로퍼티 정적 선언방식

```javascript
var person = {
    firstName : 'wooseong',        // 유효한 이름
    'last-name' : 'lee'            // 유효하지 않은 이름
}
```

만약 식별자 네이밍 규칙을 지키지 않은 이름에 따옴표(' ') 를 붙이지 않게되면 위 예제에서 자바스크립트 엔진은 `last-name` 에서의 하이픈(-) 을 산술연산자로 이해하게 된다.

```javascript
var person = {
  firstName: 'Ung-mo',
  last-name: 'Lee' // SyntaxError: Unexpected token -
};
```

- 객체 프로퍼티 동적 선언방식

객체 프로퍼티를 동적으로 선언할 때 사용할 표현식을 대괄호`[]` 를 이용하여 묶어야 한다. 이를 '계산된 프로퍼티 이름' 이라 부른다.

 앞장에서 한번 설명하였지만 대괄호는 변수를 호출할 수 있는 표현방식이다. (ch_6 symbol 부분 참고)

```javascript
var obj = {};
var key = 'hello';

// ES5 식 프로퍼티 key 동적 생성법
obj[key] = 'world';


console.log(obj);                     // Object {hello: "world"}

// ES6 식 프로퍼티 key 동적 생성법
var obj = { [key] : 'world'};

console.log(obj);                     // Object {hello: "world"}
```

> 만약 프로퍼티 키에 문자열이나 symbol값이 아닌 타입의 값을 사용하게 되면 **암묵적 타입변환**을 통해 문자열이 된다. 이점은 알아두도록 하자. ( 따옴표를 써서 선언해도 되고 안써서 해도 문자열로 인식함.)
>
> 또한, 앞서 변수에서 **예약어**는 식별자로 선언할 수 없었으나 프로퍼티 key로써는 아무런 제약이 없다. 하지만 예약어는 혼란의 여지가 있으니 가급적 사용하지 않는것이 좋겠다.

- 이미 존재하는 프로퍼티 key의 중복선언

특정 객체에 존재하는 프로퍼티 키와 동일한 이름으로 선언 시 나중에 선언한 프로퍼티가 먼저 선언한 프로퍼티를 덮어 쓰게 된며 에러가 발생하지는 않는다.

```javascript
var naming = {
    name : 'lee',
    name : 'wooseong'
};

console.log(naming.name);    // wooseong
```

<br>

## 메소드(method)

객체내에 선언된 함수를 메소드라 부른다. 즉, 메소드란 용어는 객체에 제한되어 있는 함수로 일반적인 함수와는 조금 다른의미가 있다.

```javascript
var circle = {
  radius: 5, // ← 프로퍼티

  // 원의 지름
  getDiameter: function () { // ← 메소드
    return 2 * this.radius; // this는 circle를 가리킨다.
  }
};

console.log(circle.getDiameter());  // 10
```

위 예제에서 getDiameter라는 method 내에 'this' 라는 키워드를 사용한 것을 볼 수 있는데, 이는 객체 자신을 가리키는 참조변수이다. 위 예제에서는 circle이라는 식별자를 가진 객체를 의미한다.

<br>

## 프로퍼티 접근

객체의 프로퍼티에 접근하는 방법은 2가지가 있다.

1. 마침표 표기법 `.` (dot notation)
2. 대괄호 표기법 `[]` (bracket notation)

- 프로퍼티 key가 식별자 네이밍 규칙을 따르는 이름일 경우

  마침표 표기법과 대괄호 표기법을 모두 사용하여 접근할 수 있다.

마침표 혹은 대괄호의 좌측에는 객체로 평가할 수 있는 표현식을, 마침표 우측 혹은 대괄호 내부에는 프로퍼티 키를 지정한다.

```javascript
var person = {
  name: 'Lee'
};

// 마침표 표기법에 의한 프로퍼티 접근
console.log(person.name); // Lee

// 대괄호 표기법에 의한 프로퍼티 접근
console.log(person['name']); // Lee
```

> 대괄호를 이용한 프로퍼티 접근 시 대괄호 내부의 프로퍼티 key는 반드시 따옴표로 감싸주어야 함을 명심한다.
>
> ```javascript
> var obj = {
>   hello : 'world'
> };
> 
> console.log(obj['hello']);   // world
> console.log(obj[hello])      // ReferenceError: hello is not defined
> ```
>
> 상기와 같은 경우는 에러를 발생시키나, 객체에 존재하지 않는 프로퍼티에 접근시에는 undefined를 반환한다.
>
> ```javascript
> var person = {
>   name: 'Lee'
> };
> 
> console.log(person.age); // undefined 
> ```

<br>

- 프로퍼티 key가 식별자 네이밍 규칙을 따르지 않는 이름일 경우

  대괄호 표기법만 사용가능하다. 마침표 표기법은 사용할 수 없다. 앞서 언급하였듯 대괄호 표기법 내부는 따옴표를 필요로 하나, 프로퍼티 key가 **숫자**로 이루어진 문자열일 경우에는 따옴표의 생략이 가능하다.

  > Q) 여기서 한가지 의문이 든다.
  >
  > 프토퍼티 키 가 '숫자만'으로 이루어지게 되면 이 자체가 벌써 식별자 네이밍규칙 중 '숫자로 시작하지 않는다'라는 항목을 어기게 되는 것이 아닌가? 숫자로만 이루어져 있다는 것은 결국 숫자로 시작하고 숫자로 끝나게 될것이니까..
  >
  > 그럼 숫자도 따옴표로 감싸서 선언해야 하지 않을까?
  >
  > 아니면 문자열 타입이 아닌 타입이므로 암묵적으로 문자열 타입으로 변환되는 것인가?
  >
  > 모르겠다. 하지만 결론적으로 숫자타입의 프로퍼티 키는 암묵적으로 문자열 타입으로 형변환이 되는것으로 생각되고 대괄호를 이용한 프로퍼티 접근 시 따옴표를 사용하지 않아도 된다고 일단 알고있겠다.

```javascript
var person = {
  'last-name': 'Lee',
  1: 10
};

// 프로퍼티 키가 숫자로 이루어진 문자열인 경우, 따옴표를 생략 가능하다.
person.1;     // -> SyntaxError: Unexpected token, expected ","
person.'1';   // -> SyntaxError: Unexpected string
person[1];    // -> 10
person['1'];  // -> 10
```

<br>

## 프로퍼티 값 갱신

이미 존재하는 프토퍼티의 key값에 value를 할당하면 해당 값은 마지막에 할당한 값으로 갱신된다.

```javascript
var person = {
  name: 'Lee'
};

person.name = 'Kim';

console.log(person['name']);  // Kim
```

<br>

## 프로퍼티 동적 생성

존재하지 않는 프로퍼티에 값을 할당하면 프로퍼티가 동적으로 생성된다.

```javascript
var person = {
  name: 'Lee'
};

person.age = 20;

console.log(person['age']); // 20
```

<br>

## 프로퍼티 삭제

프로퍼티 삭제는 delete 연산자를 이용한다. 이 때 delete 연산자의 **피연산자**는 프로퍼티 값에 접근할 수 있는 **표현식** 이어야 한다. 

만약 존재하지 않는 프로퍼티를 삭제하면 무시된다. (에러발생하지 않음.)

```javascript
var person = {
  name: 'Lee'
};

person.age = 20;

delete person.age;

delete person.address;  // address 키가 없으나 에러 미발생, 무시됨.

console.log(person); // {name: "Lee"}
```

<br>

## ES6에 추가된 객체 리터럴의 확장기능

### 프로퍼티 축약표현

객체 리터럴의 프로퍼티는 프로퍼티 key와 프로퍼티 value로 구성된다. 여기서 value는 값 즉, 표현식이기 때문에 프로퍼티 value에는 표현식의 사용이 가능하다.

**ES6에서는 이렇게 프로퍼티 value로 표현식을 사용하는 경우, 식별자와 프로퍼티 key가 동일할 때, 프로퍼티 key를 생략하여 표현할 수 있다.**

```javascript
// ES5 식 표현
var x = 1, y = 2;

var obj = {
  x: x,           // x 식별자
  y: y            // y 식별자
};

console.log(obj); // {x: 1, y: 2}

// ES6식 표현
var x = 1, y = 2;

const obj = { x, y };        // 축약표현 식별자 = 프로퍼티 key

console.log(obj); // {x: 1, y: 2}
```

<br>

### 프로퍼티 key의 동적 생성

**문자열 혹은 문자열로 변환 가능한 값을 반환하는 표현식**을 사용해 프로퍼티 key를 동적으로 생성할 수 있다. 단, 프로퍼티 키로 사용할 표현식을 대괄호로 묶어야 한다.

ES6에서는 새롭게 추가된 **템플릿 리터럴**을 사용한 표현식의 삽입 기능으로 프로퍼티 key의 동적생성이 가능하다.

```javascript
var prefix = 'prop';
var i = 0;

var obj = {};

// ES5 식 표현

obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;
obj[prefix + '-' + ++i] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}

// ES6 식 표현

obj[`${prefix}-${++i}`] = i;
obj[`${prefix}-${++i}`] = i;
obj[`${prefix}-${++i}`] = i;

console.log(obj); // {prop-1: 1, prop-2: 2, prop-3: 3}

```

<br>

### 메소드 축약표현

ES5에서 메소드 정의 시 프로퍼티 값으로 함수를 할당한다.

ES6에서는 메소드를 정의할 때, **function 키워드를 생략한** 축약표현의 사용이 가능하다.

```javascript
// ES5 식 표현
var obj = {
  name: 'Lee',
  sayHi: function() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee

// ES6 식 표현
const obj = {
  name: 'Lee',
  sayHi() {
    console.log('Hi! ' + this.name);
  }
};

obj.sayHi(); // Hi! Lee
```

> ES6의 메소드 축약표현으로 정의한 메소드는 프로퍼티에 할당한 함수와는 다르게 동작하는데.. 이는 26장에서 다루도록 한다.