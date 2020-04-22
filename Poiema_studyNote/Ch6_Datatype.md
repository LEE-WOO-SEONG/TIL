# Datatype

[toc]

<br>

<br>



데이터 타입이란 값의 **종류**를 나타내는 말이다. 자바스크립트에서 모든 값은 이러한 타입을 갖는다.

데이터 타입은 크게 2가지로 나누어진다.

<br>

Primitive type (원시타입)

- number type : 1,2,3 과 같은 **숫자**를 지칭하며 정수와 실수의 구분없이 하나의 숫자 타입만 존재한다.
- string type : 문자열 타입.

- bolean type : 논리적으로 참(true)과 거짓(false)과 같은 2가지 상태만 존재하는 타입.

- undefined type : var 키워드로 선언된 변수에 암묵적으로 할당되는 값.

- null type : 값이 **없다**는 것을 의도적의로 명시할 때 사용하는 값.

  (undefined는 값이 지정되지 않은 상태이며 null은 아예 값이 없는 상태이다.)

- symbol type : ES6에서 새롭게 추가된 타입. (상징)



Object / Reference type (객체타입)

<br>

## Primitive type

### Number type

자바스크립에서 숫자타입은 다른프로그래밍 언어와 다르게 정수,실수 등과 같은 구분 없이 모든 수를 **실수**로 처리한다. 숫자타입임을 명시하기 위한 조건은 특별히 없으며 할당된 값을 숫자로 입력하면 숫자타입으로 인식한다.

```
var integer = 10;       
var double = 10.12;     
var negative = -20;     // 모두 하나의 숫자타입.
```

<br>또한 자바스크립트는 2진수/8진수/16진수를 표현하기 위한 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 모두 10진수로 읽어드린다.

```
var binary = 0b01000001; // 2진수
var octal = 0o101;       // 8진수
var hex = 0x41;          // 16진수

console.log(binary); // 65
console.log(octal);  // 65
console.log(hex);    // 65
```

<br>

- 숫자 타입에서 추가적으로 표현가능한 특별값

1. infinity: 양의 무한대

2. -infinity : 음의 무한대

3. NaN : 산술 연산 불가(not a number) 

   (대소문자를 구별하는 자바스크립트는 NaN이라고 명시해야 인식한다. nan과 같은 값은 해당값으로 인식하지 못하니 주의한다.)

```
console.log(10 / 0);       // Infinity
console.log(10 / -0);      // -Infinity
console.log(1 * 'String'); // NaN
```

<br>

### String type

텍스트 데이터를 나타내는 데 사용하며 작은따옴표(' '), 큰따옴표(" "), 백틱(``)을 이용하여 표기 시 문자열 타입으로 인식한다. 일반적으로 작은따옴표를 많이 사용한다.

```
var string = '문자열';

var string = '작은 따옴표로 감싼 문자열 내의 "큰 따옴표"는 문자열로 인식된다.';
var string = "큰 따옴표로 감싼 문자열 내의 '작은 따옴표'는 문자열로 인식된다.";
```

또한, 따옴표 내에 따옴표를 하나 더 쓸경우는 상기와 같이 또다른 하나의 문자열로 구분이 되며 만약, 따옴표를 사용하지 않고 문자열을 써 주게 되면 자바스크립트는 이를 키워드나 식별자와 같은 토큰으로 인식할 수 있다.

```
var string = hello; // ReferenceError: hello is not defined
```

<br>

- 문자열은 변경 불가능한 값이다??