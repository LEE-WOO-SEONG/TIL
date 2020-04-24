# Datatype

- Toc

1. [Primitive type](#primitive-type)

   1-1. [Number type](#number-type)

   1-2. [String type](#string-type)
   
   1-3.[Template literal](#template-literal)
   
   1-4.[boolean type](#boolean-type)
   
   1-5.[undefined type](#undefined-type)
   
   1-6.[null type](#null-type)
   
   1.7[symbol type](#symbol-type)
   
2. [object type](#object-type)

3. [데이터 타입의 필요성](#데이터-타입의-필요성)

4. [동적 타이핑](#동적-타이핑)

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

var str = `hello\n\ttworld`;

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

### boolean type

불리언 타입 값은 논리적 참, 거짓만을 나타내므로 true / false의 값만 나타낸다.

불리언 타입 값은 조건문에서 참, 거짓 시 특정동작을 실행하도록 하는 연산에 주로 사용된다.

```javascript
var x = 1;

console.log(x > 0);        //true
console.log(x === 1);      //true
console.log(x > 1);        //false
```

<br>

### undefined type

undefined 타입은 undefined 값만 가진다.

undefined는 의도적으로 할당하기 위한 값이 아닌 자바스크립트 엔진이 변수를 초기화 할 때 사용하는 값이다.

예를들면 var 키워드로 변수 선언 시 특정값을 할당하지 않으면 메모리 공간 확보 후 초기화 시 할당 받은 undefined값을 출력하게 된다.

```javascript
var foo;
console.log(foo); // undefined
```

undefined는 할당이 불가능 한 값은 아니나, 본래 사용목적(초기화)과 다르므로 **의도적으로 해당값을 할당하는것은 바람직하지 않다.**

```javascript
const a = undefined;

console.log(a);   // undefined출력, 바람직하지 않음.
```

<br>

undefined의 뜻은 '정의되지 않은'이다. 그렇다면 **정의한다**라는 것은 무엇인가?

정의란 어떤 대상을 **명확하게 규정하는 것**을 의미한다. 자바스크립트에서 정의는 변수에 값을 할당하여 **변수의 실체를 명확히 하는 것**이다. 

그렇기 때문에 undefined라는 값의 의미는 선언으로 메모리 공간을 확보 해 놓았으나 아직 특정값이 할당되지 않은 변수의 실체가 없는 상태를 규정하기 위한 값인 것이다.

<br>

### null type

null 타입도 null의 값만 가진다.  null은 변수에 **값이 없는** 상태를 의도적으로 명시하기 위해 사용하며 대소문자를 구분하는 자바스크립트에서는 null과 Null,NULL과 다르다는 것을 한번더 인지하자.

> undefined는 추후에 특정 값을 할당할 의도를 가졌으나 '아직' 할당이 되지 않은상태를 나타내는 것이고 null은 이전에 해당 변수가 참조하던 값을 더이상 참조하지 않겠다 혹은 값의 할당하지 않겠다는 의미이니 혼동하지 않도록 한다.

null을 이용하여 더이상 참조되지 않는 data는 garbage collector에 의해 '해제' 될 것이다.

또한, 하기와 같이 함수가 유효한 값을 반환할 수 없는 경우 명시적으로 null을 반환하기도 한다.

```javascript
<!DOCTYPE html>
<html>
<body>
  <script>
    var element = document.querySelector('.myClass');

    // HTML 문서에 myClas 라는s 클래스명을 갖는 요소가 없다면 null을 반환한다.
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

```javascript
// 심볼 값 생성
var key = Symbol('key');
console.log(typeof key); // symbol
console.log(key);        // null   -> 함수에 의해 생성된 symbol값은 노출되지 않는다.

// 객체 생성
var obj = {};

// 심볼 key를 이름의 충돌 위험이 없는 유일한 프로퍼티 키로 사용한다.
obj[key] = 'value';
console.log(obj[key]); // value
```

> 위 예제를 보면 obj[key] 라고 선언한 것을 볼 수 있다. obj는 객체로 선언되어져 있으며 해당 객체 특정 키값을 넣는 방식은 2가지가 있다.
>
> 1. obj.key 
> 2. obj[key] 
>
> 위 두가지 방식은 모두 객체 내에 key와 value 값을 넣어주기 위한 표현식이나 차이를 보인다.
>
> ```javascript
> var key = Symbol('key');
> var obj = {};
> 
> // obj.key = value1
> 
> obj = {
>     key = value1
> }
> 
> // obj[key] = value2
> 
> obj = {
>     symbole('key') = value2
> }
> ```
>
> .key를 이용해 키를 생성시 'key'라는 이름을 가진 키가 생성된다. 하지만 [key]를 이용하면 key라는 **변수**를 이용하는 것이다. 이 내용은 추후 객체를 다룰 때 더 자세하게 배울것이니 이정도만 알아놓기로 하자.



<br>

## object type

객체 기반의 언어인 자바스크립트는 primitive 타입을 제외한 값은 모두 객체 타입이다. 객체타입을 참조타입이라고 부르기도 하며 object 타입은 값을 변경할 수 없는, 즉immutable한 primitive 타입과 달리 **값의 변경이 가능하다. **이러한 객체 타입에는 배열 / 함수 / 정규표현식이 있다.

<br>

## 데이터 타입의 필요성

### 데이터 타입에 의한 메모리공간의 확보와 참조

모든값은 메모리에 저장하고 참조할 수 있어야 한다. 또한 메모리에 값을 저장하기 위해서는 먼저 **확보해야 할 메모리 공간의 크기를 알아야 한다.**

그렇다면 어떤 방식으로 메모리 공간에 확보할 크기를 결정할까? 바로 '데이터 타입'이다.

자바스크립트 엔진은 데이터타입(값의종류)에 따라 정해진 크기의 메모리 공간을 확보한다. 예를들면 number type의 경우 **8byte(64bit)**를 이용하여 값을 저장하기 때문에 참조할 값이 numbertype이면 8byte만큼의 공간을 확보하는 것이다. 다음 예제를 보자.

```javascript
var scroe = 100;        //numbertype
```

![image](https://user-images.githubusercontent.com/62285872/80050493-b47a1900-8550-11ea-8ebc-c55c6393ffc2.png)	

위의 경우 score라는 식별자를 통해 8byte의 저장공간을 차지하는 메모리 셀의 **선두주소**를 찾아갈 수 있으며 해당 메모리셀의 정보를 참조하며 100이라는 값을 출력할 수 있다.

<br>

##### 데이터타입에 따라 확보되는 메모리공간의 크기

ECMAScript의 사양은 string과 number type이외의 데이터 타입의 크기를 명시적으로 규정하고 있지는 않다. 따라서 문자열과 숫자타입을 제외하고 데이터 타입에 따라 확보되는 메모리 공간의 크기는 브라우저 제조사의 구현에 따라 다를 수 있다. 단, number type은 배정밀도 64비트 부동소수점 포맷을 사용한다고 명시되어 있고, 해당 포맷은 8byte로 숫자를 표현하므로 numbertype의 저장공간을 8byte라고 표현하는 것이다.

<br>

### 데이터 타입에 의한 값의 해석

지금까지 메모리에 모든 값은 2진법의 형태로 저장된 다는것을 학습하였다. 그렇다면 2진법의 형태로 저장된 값은 어떻게 해석될 수 있을까? 

데이터 저장 시 데이터 타입의 영향을 받듯, **해석시에도 데이터 타입에 따라 다르게 읽어드린다.** 예를들면 메모리에 저장된 값 0100 0001를 2진법의 숫자로 해석하면 20 이지만 문자열로 해석하면 ‘’이다.

```javascript
console.log(parseInt('10100', 10));      //10100
console.log(parseInt('10100', 2));       // 20

console.log(String.fromCharCode(parseInt('10100', 2)))  // 
```

<br>

여기까지의 내용으로 생각 해 보았을 때 <u>데이터 타입의 필요성</u>은 하기와 같다.

1. 값의 저장 시 **확보해야 하는** 메모리 공간의 크기를 결정하기 위함

2. 값의 참조 시 **한번에 읽어들어야 할** 메모리 공간의 크기를 결정하기 위함.

3. 메모리에서 읽어들인 2진수를 **어떻게 해석할 지**를 결정하기 위함.

<br>

## 동적 타이핑

### 정적타입언어(static type language)

C나 Java와 같은 **정적타입**언어는 변수를 선언할 때 변수에 할당할 수 있는 데이터 타입을 사전에 선언한다. 이를 **명시적 타입선언**(explicit type declaration)이라 한다.

C에서 변수선언의 예를 보자

```c
char c;   //변수 c에는 1byte 정수 타입의 값(-128 ~ 127)만을 할당할 수 있다.

int num;  //변수 num에는 4byte 정수 타입의 값(-2,124,483,648 ~ 2,124,483,647)만을 할당할 수 있다.
```

이러한 정적타입의 언어는 변수 타입의 변경이 불가능하며 변수 선언 시 키워드 값으로 데이터 타입을 지정하면서 해당 타입에 맞는 값만 할당할 수 있다.

정적타입언어는 컴파일(compile)시점에 타입체크를 수행하며 이 때 데이터 타입에 맞게 값이 할당되어 있지 않으면 에러를 발생시켜 프로그램의 실행 자체를 막는다. 이러한 방식으로 런타임 시 발생하는 에러를 줄이게 된다.

<br>

### 동적타입언어(dynamic type language)

자바스크립트는 **동적타입** 언어로 정적타입 과 다르게 변수 선언 시 타입을 선언하지 않는다. 단지 `var, let ,const`와 같은 keyword들을 통해 변수를 선언할 뿐이다.

때문에 동적타입 언어는 자유롭게 모든 데이터 타입의 값을 할당할 수 있으며, 이 때 할당되는 값에 따라 해당 변수의 데이터 타입이 결정되는 것이다. 이렇게 값의 할당에 따라 자유롭게 데이터 타입을 변경할 수 있는 특징을 **동적타이핑**이라 부른다.

```javascript
var Lee;
console.log(typeof Lee);  // undefined

Lee = 3;
console.log(typeof Lee);  // number

Lee = 'Hello';
console.log(typeof Lee);  // string

Lee = true;
console.log(typeof Lee);  // boolean

Lee = null;
console.log(typeof Lee);  // object

Lee = Symbol(); 
console.log(typeof Lee);  // symbol

Lee = {};
console.log(typeof Lee);  // object

Lee = []; 
console.log(typeof Lee);  // object

Lee = function () {}; 
console.log(typeof Lee);  // function
```

##### 동적타입과 정적타입의 차이점

- 정적 타입

1. 변수 선언 시 데이터 타입이 결정된다.
2. 한번 선언한 데이터 타입은 변경할 수 없다.
3. **변수**가 데이터 타입을 가진다.



- 동적 타입

1. 값의 할당 시점에 변수의 데이터 타입이 결정된다.
2. 이후 값의 재할당에 따라 변수 타입의 변경이 가능하다.
3. 변수에 할당된 **값**이 데이터 타입을 가진다.

<br>

### 동적타입 언어와 변수

##### 동적타입 언어의 단점

- 동적타입 언어의 변수는 값을 확인하기 전까지는 변수 타입을 알 수 없다.
- 변수값의 자유로운 변경이 가능하기 떄문에 변화하는 **변수값의 추적이 어려울 수 있다.**

##### 변수 사용시 주의 사항

- 변수는 꼭 필요한 경우에 한해 제한적으로 사용할 것.
- 변수의 유효범위(스코프)는 최대한 좁게 만들어 변수의 부작용을 억제할 것.
- 전역변수의 사용은 최대한 자제할 것.
- 값의 재할당이 꼭 필요한 경우가 아니라면 변수보다는 상수를 사용하여 값의 변경을 억제할 것.
- 변수명 (식별자)은 변수의 목적이나 의미를 파악할 수 있도록 네이밍할 것.

> 코드는 잘 동작하는 것도 중요하지만 유지보수, 협업 관점에서 개발자들이 이해할 수 있도록 가독성이 좋은 것이 좋은 코드라 할 수 있다.