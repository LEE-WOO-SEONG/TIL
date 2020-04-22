# Datatype

- Toc

1. [Primitive type](#primitive-type)

   1-1. [Number type](#number-type)

   1-2. [String type](#string-type)
   
   1-3.[Template literal](#template-literal)
   
   1-4.[boolean type](#boolean-type)

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

자바스크립에서 숫자타입은 다른프로그래밍 언어와 다르게 정수,실수 등과 같은 구분 없이 모든 수를 **실수**(소숫점 이하가 있는 숫자)로 처리한다. 숫자타입임을 명시하기 위한 조건은 특별히 없으며 할당된 값을 아라비아 숫자로 입력하면 숫자타입으로 인식한다.

```javascript
var integer = 10;       
var double = 10.12;     
var negative = -20;     // 모두 하나의 숫자타입.
```

<br>또한 자바스크립트는 정수, 실수, 2진수, 8진수, 16진수 리터럴은 모두 메모리에 **배정밀도 64비트 부동소수점 형식**의 2진수로 저장하며 2진수/8진수/16진수를 표현하기 위한 데이터 타입을 제공하지 않기 때문에 이들 값을 참조하면 모두 10진수로 읽어드린다.

```javascript
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

```javascript
console.log(10 / 0);       // Infinity
console.log(10 / -0);      // -Infinity
console.log(1 * 'String'); // NaN
```

<br>

### String type

텍스트 데이터를 나타내는 데 사용하며 작은따옴표(' '), 큰따옴표(" "), 백틱(``)을 이용하여 표기 시 문자열 타입으로 인식한다. 

이렇게 문자열을 따옴표로 감싸는 이유는 '키워드'나 '식별자'와 같은 토큰과 구분할 목적과 스페이스와 같은 공백문자를 포함시키기 위함이다. 일반적으로 작은따옴표를 많이 사용한다.

문자열은 0개이상의 **16bit 유니코드 문자(UTF-16)** 들의 집합으로 표현된다.

```javascript
var string = '문자열';

var string = '작은 따옴표로 감싼 문자열 내의 "큰 따옴표"는 문자열로 인식된다.';
var string = "큰 따옴표로 감싼 문자열 내의 '작은 따옴표'는 문자열로 인식된다.";
```

또한, 따옴표 내에 따옴표를 하나 더 쓸경우는 상기와 같이 또다른 하나의 문자열로 구분이 되며 만약, 따옴표를 사용하지 않고 문자열을 써 주게 되면 자바스크립트는 이를 키워드나 식별자와 같은 토큰으로 인식할 수 있다.

```javascript
var string = hello; // ReferenceError: hello is not defined
```

<br>

#### 문자열은 변경 불가능한(immutable) 값으로 한번 생성되면 초기값을 변경할 수 없다.

<br>

## Template literal

ES6부터 도입된 새로운 문자열 표기법으로 템플릿 리터럴은 멀티라인 문자열 / 표현식 삽입 / 태그드 템플릿 등 편리한 문자열 처리기능을 제공한다. 템플릿 리터럴은 런타임에 일반 문자열로 변환되어 처리된다.

템플릿 리터럴은 일반 문자열과 다르게 백틱(``)을 사용하여 표현한다.



### 멀티라인 문자열

일반 문자열 내에서는 줄바꿈이 허용되지 않지만 템플릿 리터럴에서는 줄바꿈 및 공백 모두 포현이 가능하다.

``` javascript
//일반 문자열
var str = 'hello
		   world';          //SyntaxError: Unterminated string constant

//템플릿 리터털
var str2 = `hello
			world`;			//hello
							  world//
```

일반 문자열 내에서 줄바꿈을 하려면 백슬래시 `\` 로 시작하는 이스케이프 시퀀스(escape sequence)를 사용하여야 한다.)

| 이스케이프 시퀀스 | 의미                                                         |
| :---------------- | :----------------------------------------------------------- |
| \0                | Null                                                         |
| \b                | 백스페이스                                                   |
| \f                | 폼 피드(Form Feed): 프린트 출력시 다음 페이지의 시작으로 이동한다. |
| \n                | 개행(LF, Line Feed): 다음 행으로 이동                        |
| \r                | 개행(CR, Carriage Return): 커서를 처음으로 이동              |
| \t                | 탭(수평)                                                     |
| \v                | 탭(수직)                                                     |
| \uXXXX            | 유니코드. 예를 들어 ‘\u0041’은 ‘A’, ‘\uD55C’는 ‘한’, ‘\u{1F600}’는 😀이다. |
| \’                | 작은 따옴표                                                  |
| \”                | 큰 따옴표                                                    |
| \\                | 백슬래시                                                     |

```javascript
//일반 문자열

var str = `hello\r\n\tworld`;

console.log(str);                     //hello
									    	  world//
```

<br>

### 표현식 삽입

문자열을 덧셈(?)해 줄수도 있는데 이는 덧셈연산자(+)를 사용하여 가능하다. 

(+)연산자는 피연산자 중 하나 이상이 문자열인 경우에 문자열을 연결하는 **연결 연산자**로 동작한다. 

```javascript
// 일반 문자열

var lastName = 'lee'
var firstName = 'wooseong'

console.log('my name is '+lastName+' '+firstName+'.');

// my name is lee wooseong.

// 템플릿 리터럴

console.log(`my name is ${lastName} ${firstName}.`);

// my name is lee wooseong.
```

일반 문자열은 따옴표('')내에서만 공백, 문자열이 유효하며 연결연산자로 연결시 사이사이의 공백은 또다른 따옴표로 처리 해 주어야 한다.

템플릿 리터럴의 경우 `${}`를 이용하여 표현식을 대입할 수 있다. 

이때, 표현식의 평가 결과가 문자열이 아니더라도 문자열로 **강제 타입변환**되어 삽입된다.

```javascript
// 일반 문자열
console.log('1+2 = ${1+2}');        // 1+2 = ${1+2} 

// 템플릿 리터럴
console.log(`1+2 = ${1+2}`);        // 1+2 = 3 
```

또한 위 결과와 같이 표현식 삽입은 반드시 템플릿 리터럴 내에서만 사용해야 한다. 템플릿 리터럴이 아닌 일반 문자열에서 표현식 삽입은 문자열 취급을 받는다.

<br>

## boolean type

불리언 타입 값은 논리적 참, 거짓만을 나타내므로 true / false의 값만 나타낸다.

불리언 타입 값은 조건문에서 참, 거짓 시 특정동작을 실행하도록 하는 연산에 주로 사용된다.

<br>

### undefined type

undefined 타입은 undefined 값만 가진다.

undefined는 의도적으로 할당하기 위한 값이 아닌 자바스크립트 엔진이 변수를 초기화 할 때 사용하는 값이다.

예를 들면 하기와 같이 var 키워드로 변수 선언 시 특정값을 할당하지 않으면 메모리 공간 확보 후 초기화 시 할당 받은 undefined값을 출력하게 된다.

```javascript
var foo;
console.log(foo); // undefined
```

undefined는 할당이 불가능 한 값은 아니나, 본래 사용목적(초기화)와 다르므로 **의도적으로 해당값을 할당하는것은 바람직하지 않다.**

```javascript
const a = undefined;

console.log(a);   // undefined
```

<br>

undefined의 뜻은 '정의되지 않은'이다. 그렇다면 정의한다라는 것은 무엇인가?

정의란 어떤 대상을 **명확하게 규정하는 것**을 의미한다. 자바스크립트에서 정의는 변수에 값을 할당하여 **변수의 실체를 명확히 하는 것**이다. 

그렇기 때문에 undefined라는 값의 의미는 선언으로 메모리 공간을 확보 해 놓았으나 아직 특정값이 할당되지 않은 변수의 실체가 없는 상태를 규정하기 위해 할당한 값인 것이다.

<br>

### null type

null 타입도 null의 값만 가진다.  null은 변수에 **값이 없는** 상태를 의도적으로 명시하기 위해 사용하며 대소문자를 구분하는 자바스크립트에서는 null과 Null,NULL과 다르다는 것을 한번더 인지하자.

> undefined는 추후에 특정 값을 할당할 의도를 가졌으나 '아직' 할당이 되지 않은상태를 나타내는 것이고 null은 이전에 해당 변수가 참조하던 값을 더이상 참조하지 않겠다는 의미이니 혼동하지 않도록 한다.

null을 이용하여 더이상 참조되지 않는 data는 garbage collector에 의해 '해제' 될 것이다.

또한, 하기와 같이 함수가 유효한 값을 반환할 수 없는 경우 명시적으로 null을 반환하기도 한다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    var element = document.querySelector('.myClass');

    // HTML 문서에 myClass 클래스를 갖는 요소가 없다면 null을 반환한다.
    console.log(element); // null
  </script>
</body>
</html>
```

- null 이 사용되는 경우

1. 변수가 이전에 참조하였던 값을 더이상 참조하고 싶지 않을 때
2. 변수를 선언하고 값을 할당할 계획이나 할당하지 않는다고 명시하고 싶을경우
3. 특정동작 수행 후 유효한 값이 없을경우 null을 반환

<br>

### symbol type

ES6에서 새롭게 추가된 타입으로 **변경이 불가능한 원시 타입의 값이다.** 



- 심볼은 주로 이름의 충돌 위험이 없는 객체의 유일한 프로퍼티 키(property key)를 만들기 위해 사용한다?

  > -> 개인적으로 이해가 쉽사리 가지 않는다.. 좀 더 생각해 보는 시간이 필요할 듯하다.

- 리터럴을 통해 생성되는 다른 primitive type과 달리 symbol은 symbol 함수를 호출해 생성한다. 이렇게 생성된 심볼값은 노출되지 않으며 다른값과 중복되지 않는 유일무이한 값이다.

<br>

## object type

객체 기반의 언어인 자바스크립트는 primitive 타입을 제외한 값은 모두 객체 타입이다.



## 데이터 타입의 필요성

### 데이터 타입에 의한 메모리공간의 확보와 참조

