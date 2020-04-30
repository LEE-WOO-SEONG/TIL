# let,const와 블록레벨 스코프

- Toc

1. [var 키워드로 선언한 변수의 문제점](#var-키워드로-선언한-변수의-문제점)
2. [let 키워드](#let-키워드)
3. [const 키워드](#const-키워드)
4. [Var vs Let vs Const](#Var-vs-Let-vs-Const)



<br>

<br>

## var 키워드로 선언한 변수의 문제점

### 변수 중복 선언 허용

```javascript
var x = 1;
var y = 1;

var x = 100;
// 초기화문이 없는 변수 선언문은 무시된다.
var y;

console.log(x); // 100
console.log(y); // 1
```

var 키워드로 선언한 변수는 중복선언이 가능하다. 초기화 문이 없는 변수 선언문의 경우 무시되며, 초기화 문이 있는 변수 선언문은 자바스크립트 엔진에 의해 var 키워드가 없는 **재할당문 처럼** 동작하게 된다.

코드가 길어지게 되어 동일변수가 사전에 선언되었던 사실을 모른체 중복선언이 가능하다면 의도치 않게 먼저 선언된 변수값을 바꾸게 되는 부작용이 발생할 수 있다.

<br>

### 함수레벨 스코프

var 키워드로 선언한 변수는 오직 함수의 코드블럭만을 지역스코프로 인정한다. 따라서 함수 외부에서 var 키워드로 선언한 변수는 코드블록 내에서 선언하여도 **전역변수**가 되기 때문에 의도치 않은 결과물을 발생시킬 수 있다.

```javascript
// 코드블럭 내 var 변수선언
var z = 1;
console.log(z);   // 1
{
  var z = 4;
  console.log(z); // 4
}

console.log(z);   // 4

// 반복문의 조건식내에서 var 변수선언
var i = 10;

for (var i = 0; i < 5; i++) {
  console.log(i); // 0 1 2 3 4
}

console.log(i); // 5
```

<br>

### 변수 호이스팅

 var 키워드로 변수를 선언하면 변수 호이스팅에 의해 변수 선언문이 스코프의 선두로 끌어 올려진 것처럼 동작한다. 즉, 변수 호이스팅에 의해 var 키워드로 선언한 변수는 변수 선언문 이전에 참조할 수 있다. 단, 할당문 이전에 변수를 참조하면 언제나 **undefined**를 반환한다.

```javascript
console.log(foo); // undefined

foo = 123;

console.log(foo); // 123

var foo;
```

변수 선언문 이전에 변수를 참조하는 것은 변수 호이스팅에 의해 에러를 발생시키지는 않지만 프로그램의 흐름 상 맞지 않을 뿐더러 가독성을 떨어뜨리고 오류를 발생시킬 여지를 남긴다.

<br>

## let 키워드

var 키워드의 문제점을 보완하기 위해 ES6에서는 새로운 변수선언 키워드인 let,const가 도입되었다.

### 변수 중복선언 금지

var 키워드와는 다르게 let 키워드를 사용하여 변수를 중복선언하게 되면 에러가 발생한다.

단, let 키워드 없이 할당연산자를 이용한 재할당은 가능하다.

```javascript
var foo = 123;

var foo = 456; // error 미발생

let bar = 123;

bar = 1;       // 가능

let bar = 456; // SyntaxError: Identifier 'bar' has already been declared
```

<br>

### 블록레벨 스코프

함수레벨 스코프만 가지는 var 키워드와는 다르게 let 키워드는 모든 코드블럭(if문 / for문 / 일반코드블럭 / while문 등..)을 지역스코프로 인정하는 블록레벨(block-level scope) 스코프를 따른다.

```javascript
// 전역변수
let foo = 1; 

// 지역변수
{
  let foo = 2; 
  let bar = 3; 
}

console.log(foo); // 1
console.log(bar); // ReferenceError: bar is not defined
```

함수도 함수몸체를 표현하는 코드블럭을 가진다. 이떄 블록레벨 스코프는 함수레벨 스코프에 중첩된다.

![image](https://user-images.githubusercontent.com/62285872/80692691-ebca6600-8b0c-11ea-811c-1578c160a2c0.png)	

<br>

### 변수호이스팅

let 키워드로 선언한 변수는 변수호이스팅이 **발생하지 않는것**처럼 동작한다. (실제로는 발생함.)

```javascript
console.log(foo); // ReferenceError: foo is not defined
let foo;
```

- var 키워드의 변수선언

var 키워드로 선언한 변수는 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 '선언단계'와 '초기화 단계'가 한번에 진행된다.

그렇기 때문에 변수선언문 이전에도 undefined로 '참조'가 **가능하다**

![image](https://user-images.githubusercontent.com/62285872/80693349-d4d84380-8b0d-11ea-8af1-6cdfb5581785.png)

- let 키워드의 변수선언

let 키워드로 선언한 변수는 '선언단계'와 '초기화 단계'가 분리되어 진행된다. 즉, 런타임 이전에 자바스크립트 엔진에 의해 암묵적으로 선언단계가 먼저 실행되지만 **초기화 단계는 변수 선언문에 도달했을 때 실행된다.**

let 키워드로 선언한 변수는 스코프의 시작지점부터 초기화 단계 시작지점(변수선언문)까지 변수를 참조할 수 없다. 이렇게 변수를 참조할 수 없는 구간을 **일시적 사각지대**(Temporal Dead Zone/ TDZ)라 부른다.

```javascript
// 런타임 이전에 선언 단계가 실행된다. 아직 변수가 초기화되지 않았다.
console.log(foo); // Cannot access 'foo' before initialization

let foo; // 변수 선언문에서 초기화 단계가 실행된다.
console.log(foo); // undefined

foo = 1; // 할당문에서 할당 단계가 실행된다.
console.log(foo); // 1
```

![image](https://user-images.githubusercontent.com/62285872/80693774-7bbcdf80-8b0e-11ea-9b5d-02a491288c2d.png)

그렇기 때문에 호이스팅으로 인해 let 키워드에 의한 식별자 foo라는 이름으로 변수 선언은 런타임 이전에 실행되지만 초기화가 되지 않아 선언이전에 해당 식별자를 참조하면 error가 발생하게 된다.

<br>

### 전역객체와 let

전역객체(global obejct)는 코드가 실행되기 **이전단계**에 자바스크립트 엔진에 의해 **어떤 객체보다도 먼저 생성**되는 특수한 객체이며 어떤 객체에도 속하지 않는 **최상위 객체**이다.

전역객체는 client side 환경인 브라우저 에서는 **window**이며 server side 환경(Node.js)에서는 **global** 객체를 가리킨다.

- 전역객체의 프로퍼티

1. **var** 키워드로 선언한 전역변수
2. 전역함수
3. 선언하지 않은 변수에 값을 할당한(키워드 없이 할당문만 있을 시) **암묵적 전역**은 전역객체의 프로퍼티가 된다.

>  전역객체의 프로퍼티를 참조할 때 window를 생략할 수 있어 마치 전역변수처럼 사용할 수 있다.

```javascript
// 이 예제는 브라우저 환경에서 실행시켜야 한다.

// 전역 변수
var x = 1;
// 암묵적 전역
y = 2;
// 전역 함수
function foo() {}

// var 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티이다.
console.log(window.x); // 1
// 전역 객체의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(x); // 1

// 암묵적 전역은 전역 객체의 프로퍼티이다.
console.log(window.y); // 2
console.log(y); // 2

// 함수 선언문으로 정의한 전역 함수는 전역 객체의 프로퍼티이다.
console.log(window.foo); // ƒ foo() {}
// 전역 객체의 프로퍼티는 전역 변수처럼 사용할 수 있다.
console.log(foo); // ƒ foo() {}
```

> let 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 **아니다**. 즉, window.foo와 같이 접근할 수 없다. let 전역 변수는 보이지 않는 개념적인 블록(전역 렉시컬 환경의 선언적 환경 레코드. 이에 대해서는 “23. 실행 컨텍스트”에서 자세히 살펴볼 것이다.) 내에 존재하게 된다.

```javascript
// 이 예제는 브라우저 환경에서 실행시켜야 한다.
let x = 1;

// let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 아니다.
console.log(window.x); // undefined
console.log(x); // 1
```

<br>

## const 키워드

const 키워드는 상수(constant)를 선언하기 위해 사용한다. **하지만 반드시 상수만을 위해 사용하지는 않는다.**

### 선언과 초기화

- **const 키워드로 선언한 변수는 반드시 선언과 동시에 초기화가 이루어져야 한다.**

- const 키워드로 선언한 변수는 let 키워드로 선언한 변수와 마찬가지로 **블록레벨 스코프**를 가지며 변수호이스팅이 일어나지만 발생하지 않는 것 **처럼** 보인다.

```javascript
const foo = 1;  // const 선언은 할당까지 해야함.(초기화)
const foo;     // SyntaxError: Missing initializer in const declaration

// 블록 레벨 스코프를 갖으며 호이스팅이 발생한다.
{
  console.log(foo); 
  // ReferenceError: Cannot access 'foo' before initialization
  const foo = 1;
  console.log(foo); // 1
}

console.log(foo); 
// ReferenceError: foo is not defined
```

<br>

### 재할당 금지

var 또는 let 키워드로 선언한 변수는 재할당이 자유로우나 **const 키워드로 선언한 변수는 재할당이 금지된다.**

```javascript
const foo = 1;
foo = 2; // TypeError: Assignment to constant variable.
```

<br>

### 상수

const 키워드로 선언한 변수에 **원시값을 할당한 경우**, 변수**값**을 변경할 수 **없다**. 재할당이 불가능하기 때문에 원시값을 변경할 수 있는 방법이 없다.

변수의 상대 개념인 **상수는 재할당이 금지된 변수를 말한다.** 상수도 값을 저장하기 위한 메모리 공간이 필요하므로 변수라고 할 수 있다. 단, 변수는 언제든지 재할당을 통해 변수값을 변경할 수 있지만 상수는 재할당이 금지된다.

> 상수는 (const 키워드를 이용한 변수선언) 상태유지와 가독성, 유지보수의 편의를 위해 적극적으로 사용해야 한다!!

```javascript
// 세후 가격 예제.
let preTaxPrice = 100;

let afterTaxPrice = preTaxPrice + (preTaxPrice * 0.1);

console.log(afterTaxPrice); // 110

// 세율인 0.1이 무엇을 의미하는지 명확히 하기위함 + 재할당의 금지로 값의 변경을 불가하게 하기 위하여 const 키워드를 통해 식별자를 대문자로 선언.
const TAX_RATE = 0.1;

let preTaxPrice = 100;

let afterTaxPrice = preTaxPrice + (preTaxPrice * TAX_RATE);

console.log(afterTaxPrice); // 110
```

<br>

### const 키워드와 객체

const키워드로 선언한 변수에 객체값을 할당할 경우 원시값처럼 재할당은 불가능하다. 단, **객체 프로퍼티에 접근하여 값을 변경하는 것**은 **가능**하다.

```javascript
const person = {
  name: 'lee',
  age: 20
}

console.log(person.age);  //20

person.age = 29;

console.log(person.age);  // 29
```

여기서 알 수 있듯, const 키워드는 **재할당을 금지할 뿐**, 불변(immutable)을 의미하지는 않는다. 다시말해 프로퍼티의 동적생성, 삭제, 프로퍼티 값의 변경을 통해 객체를 변경하는 것은 가능하다는 말이다.

<br>

## Var vs Let vs Const



- 변수선언은 기본적으로 const를 사용한다.
- 단, 재할당이 필요한 경우에 한해 let으로 변수를 선언한다. 이때, 변수의 스코프는 최대한 **좁게** 만든다.
- 원시값을 할당하는 변수 선언은 const를 사용하는 것이 좋다.
- 객체 또한 객체 자체를 재할당하는 경우는 흔치 않으니 const로 변수선언 하는것이 좋다.

- ES6이상의 문법에서는 var 키워드를 사용하지 않는것이 좋다.

> 사실 변수를 처음 선언하는 시점에서는 재할당을 할지말지 모르는 경우가 많다. 그러나 안전한 변수의 사용을 위해 , 값의 추적을 원활히 하기위해 일단 const로 변수를 선언하고 나중에 재할당이 필요할 시 해당선언문의 키워드만 let으로 바꾸어 주도록 하자.