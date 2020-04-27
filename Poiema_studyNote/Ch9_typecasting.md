# typecasting

- Toc

1. [타입변환이란?](#타입변환이란)

2. [명시적 타입변환](#명시적-타입변환)

   2-1.[문자열 타입으로의 명시적 변환](#문자열-타입으로의-명시적-변환)

   2-2.[숫자 타입으로의 명시적 변환](#숫자-타입으로의-명시적-변환)

   2-3.[불리언 타입으로의 명시적 변환](#불리언-타입으로의-명시적-변환)

3. [암묵적 타입변환](#암묵적-타입변환)

   3-1.[문자열 타입으로의 암묵적 변환](#문자열-타입으로의-암묵적-변환)

   3-2.[숫자 타입으로의 암묵적 변환](#숫자-타입으로의-암묵적-변환)

   3-3.[불리언 타입으로의 암묵적변환](#불리언-타입으로의-암묵적변환)

4. [단축평가](#단축-평가)

<br>

<br>

## 타입변환이란?

자바스크립트는 할당된 '값'에 의해 타입이 변하는 동적언어이다.  여기서 타입은 데이터 타입을 의미하며 개발자는 의도적으로 값의 재할당을 통해 데이터 타입을 바꿀 수 있다.

이렇게 값의 데이터 타입을 변환하는 것을 타입변환이라 하며 자바스크립트에는 아래 2가지의 타입변환이 존재한다.

- 명시적 타입변환(explicit type casting)

- 암묵적 타입변환(implicit type casitng)

<br>

## 명시적 타입변환

개발자가 데이터 타입을 변경할 목적을 가지고 **의도적**으로 타입을 변환시키는 것.

```javascript
var x = 1;

var string = x.toString();
console.log(typeof string, string) // string 10

console.log(typeof x, x)  // number 10 
```

명시적 타입변환은 3가지로 나뉜다.

- 문자열 타입으로의 명시적 변환
- 숫자 타입으로의 명시적 변환
- 불리언 타입으로의 명시적 변환

<br>

### 문자열 타입으로의 명시적 변환

명시적인 문자열 타입변환 방법은 3가지가 있다.

1. String 생성자 함수를 new 연산자 없이 호출. (본연의 역할은 아님, 잘안씀.)
2. Object.prototype.toString 메소드를 사용. (특정값을 객체로 만들어야 함. 불편함.)
3. 문자열 연결 연산자를 사용. (추천방법)

```javascript
// 1번 방법
var a = String(1);
console.log(typeof a, a);         // string 1

var b = String(NaN);  
console.log(typeof b, b);         // string NaN

var c = String(true);
console.log(typeof c, c);         // string true

// 2번 방법
console.log((1).toString());      // '1'
console.log((NaN).toString());    // 'NaN'
console.log((true).toString());   // 'true'

// 3번 방법
console.log(1 + '');              // '1'
console.log(NaN + '');            // 'NaN'
console.log(true + '');           // 'true'
```

<br>

### 숫자 타입으로의 명시적 변환

명시적인 숫자 타입변환 방법 4가지

1. Number 생성자 함수를 new 연산자 없이 호출.
2. parseInt, parseFloat 함수를 사용.
3.  (+) 단항 산술 연산자를 이용.
4.  이항 산술 연산자 (*, /, %,-)를 이용.

```javascript
// 1번 방법
console.log(Number('hello'))     // NaN
console.log(Number('0'));        // 0
console.log(Number('9.8'));      // 9.8
console.log(Number(true));       // 1
console.log(Number(false));      // 0

// 2번 방법
console.log(parseInt('1'));      // 1
console.log(parseInt('hello'));  // NaN
console.log(parseInt('9.8'));    // 9      -> 정수로 나타냄. 소수점 버림
console.log(parseFloat('9.8'));  // 9.8    -> 실수로 나타냄. 소수점 명시
console.log(parseInt(true));     // NaN    -> 문자열만 변환가능.
console.log(parseFloat(true));   // NaN    -> 문자열만 변환가능

// 3번 방법
console.log(+'0');     // 0
console.log(+'-1');    // -1
console.log(+'9.8');   // 9.8
console.log(+true);    // 1
console.log(+false);   // 0

// 4번 방법
console.log('1' * 2);  // 2
console.log('2' / 2);  // 1
console.log('2' % 2);  // 0
```

위 예제에서 parseInt 함수와 parseFloat 함수는 **문자열** 타입만 숫자타입으로 변환이 가능하며 parseInt는 정수형태로, parseFloat은 실수 형태로 값을 반환한다.

<br>

### 불리언 타입으로의 명시적 변환

명시적 불리언 타입변환 방법 2가지

1. Boolean 생성자 함수를 new 연산자 없이 호출.
2. 부정논리연산자(!)를 두번 사용.

```javascript
// 1번 방법
console.log(Boolean(''));        // false
console.log(Boolean('1'))        // true
console.log(Boolean('false'));   // true
console.log(Boolean(false));     // false
console.log(Boolean(true));      // true

console.log(Boolean(1));         // true
console.log(Boolean(0));         // false
console.log(Boolean(NaN));       // false

console.log(Boolean(undefined)); // false

console.log(Boolean(null));      // false

console.log(Boolean({}));        // true
console.log(Boolean([]));        // true
```

<br>

```javascript
// false
console.log(!!(false));
console.log(!!(undefined));
console.log(!!(null));
console.log(!!(0));
console.log(!!(NaN));
console.log(!!(''));

// true
console.log(!!(true));
console.log(!!('0'));
console.log(!!({}));   // 객체 true
console.log(!!([]));   // 배열 true
```

위 예제에서 알 수 있듯 객체`{}` 와 배열`[]`은 true 값을 갖는다.

<br>

## 암묵적 타입변환

개발자의 의도와는 상관없이 표현식의 평가 도중 자바스크립트 엔진에 의해 **암묵적**으로 타입이 변환되는 것. 암묵적 타입변환은 **타입 강제변환** 이라고도 한다.

```javascript
var x = 1;

var y = x + '';
console.log(typeof y, y);  // string 1

console.log(typeof x, x);  // number 1 
```

**원시값의 경우 명시적 / 암묵적 타입변환은 기존 원시값 자체를 변경하는 것이 아니라 기존 원시값을 통해 다른 타입의 새로운 원시값을 '생성'하는 것이다.**

암묵적인 타입변환도 명시적 변환과 마찬가지로 다음과 같이 3가지가 있다. 

- 문자열 타입으로의 암묵적 변환
- 숫자 타입으로의 암묵적 변환
- 불리언 타입으로의 암묵적 변환

<br>

### 문자열 타입으로의 암묵적 변환

산술연산자 (+)는 피연산자 중 문자열 타입의 값이 하나라도 있으면 문자열 연결 연산자로 작용해 다른 피연산자 또한 문자열로 암묵적 타입변환시킨다.

```javascript
// 숫자 타입
0 + ''              // "0"
-0 + ''             // "0"
1 + ''              // "1"
-1 + ''             // "-1"
NaN + ''            // "NaN"
Infinity + ''       // "Infinity"
-Infinity + ''      // "-Infinity"

// 불리언 타입
true + ''           // "true"
false + ''          // "false"

// null 타입
null + ''           // "null"

// undefined 타입
undefined + ''      // "undefined"

// 심볼 타입
(Symbol()) + ''     // TypeError: Cannot convert a Symbol value to a string

// 객체 타입
({}) + ''           // "[object Object]"
Math + ''           // "[object Math]"
[] + ''             // ""
[10, 20] + ''       // "10,20"
(function(){}) + '' // "function(){}"
Array + ''          // "function Array() { [native code] }"
```

<br>

### 숫자 타입으로의 암묵적 변환

1. 문자열 연결 연산자로써의 (+)
2. 비교연산자
3. 단항산술연산자 (+ / -)

<br>

(+) 가 아닌 산술연산자를 이용하여 연산 시, 산술연산자는 피연산자로 숫자 타입의 값만 가질 수 있으므로 숫자타입으로 암묵적 타입변환을 시행한다.

이 때, 숫자 타입으로 변환할 수 없는 값의 경우 연산결과로 NaN을 반환한다.

```javascript
1 - '1'    // 0
1 * '10'   // 10
1 / 'one'  // NaN
```

비교연산자 는 결과값으로 불리언을 반환하지만, 숫자타입의 피연산자들을 비교하는 것이므로 산술연산자와 동일하게 피연산자를 암묵적으로 숫자타입으로 변환시킨다.

```javascript
var comp = '1' > 0;    // '1' -> 1의 숫자타입으로 암묵적변환

console.log(comp);     // true
```

또한, 단항산술연산자 (+) / (-) 는 숫자타입이 아닌 값의 앞에 붙여주면 해당 값을 암묵적으로 숫자타입으로 변환시킨다.

```javascript
// 문자열 타입
+''             // 0
+'0'            // 0
+'1'            // 1
+'string'       // NaN

// 불리언 타입
+true           // 1
+false          // 0

// null 타입
+null           // 0

// undefined 타입
+undefined      // NaN

// 심볼 타입
+Symbol()       // TypeError: Cannot convert a Symbol value to a number

// 객체 타입
+{}             // NaN
+[]             // 0       빈배열은 0으로 타입변환가능
+[10, 20]       // NaN
+(function(){}) // NaN
```

- 숫자타입 0 으로 변환되는 값 - '' / [] / null / false

- 숫자타입 1로 변환되는 값 - true
- 숫자타입으로 변환불가(NaN) - {} / 빈배열이 아닌 배열 / undefined

<br>

### 불리언 타입으로의 암묵적변환

주로 반복문 / 조건문 / 삼항연산자에 사용되는 조건식은 true / false 와 같은 불리언 값으로 평가된다. 때문에 **조건식에 들어가는 표현식**은 암묵적으로 불리언 값으로 타입변환 된다.

```javascript
if ('') {
  console.log('참');
} else {
  console.log('거짓');
}                             -> // 거짓으로 출력됨
```

- Falsy (false로 평가되는 값)한 값.

1. 0
2. null
3. undefined
4. ' ' (빈 문자열)
5. false
6. NaN

- Truthy (true로 평가되는 값)한 값.

Falsy 한 값을 제외한 모든값

<br>

> 객체, 배열 의 숫자/ 불리언 / 문자 타입은 반복적으로 보면서 익숙해지도록 하자.

<br>

## 단축 평가

논리합(||) 연산자와 논리곱(&&) 연산자 표현식의 평가결과는 불리언 값이 아닌 언제나 2개의 피 연산자 중 어느 한쪽으로 평가된다.

```javascript
'cat' && 'dog'   // dog
'cat' || 'dog'   // cat
```

위 예제의 결과값이 이해가 가는가?

- 논리곱 연산자

논리곱연산자의 평가는 **왼쪽 -> 오른쪽**으로 진행된다. 논리곱 연산자는 두개의 피연산자가 모두 true여야만 결과값으로 true를 반환한다. 

즉, 2개의 피연산자 중 첫번째 피연산자의 값이 true이면 두번째 피연산자의 값에 의해 해당 연산의 결과가 정해진다.

반대로 첫번째 피연산자의 값이 false이면 해당 문은 false가 되므로(실제로 false로 결과값이 반환되는것은 아니나 일단 이렇게 이해하자) 2번째 피연산자의 값은 중요치 않다.

그렇기 때문에 논리곱 연산자의 경우 하기와 같이 결과값이 정해진다.

> 논리곱 연산자에서 논리연산
>
> 1. 첫번째 피 연산자가 true인 경우 2번째 피 연산자를 반환
>
>    (true인 표현식 && ?) => 두번째 표현식 반환
>
> 2. 첫번째 피 연산자가 false 인 경우 첫번째 피 연산자를 그대로 반환.
>
>    (false인 표현식 && ?) => 첫번째 표현식 반환

- 논리 합 연산자

논리곱 연산자와 동일하게 **왼쪽 -> 오른쪽**으로 평가를 진행하며, 논리합 연산자는 두개의 피 연산자 중 하나만 true여도 결과값은 true를 반환한다.

그렇기 때문에 첫번째 피연산자 표현식의 값이 true 이면 두번째 피연산자의 값이 중요치 않게된다. (논리 곱 연산자와는 반대)

또, 첫번째 피연산자의 표현식의 값이 false인 겅우 두번째 피 연산자의 값에 의해 해당 문의 결과값이 정해진다.

> 논리합 연산자에서 논리연산
>
> 1. 첫번째 피 연산자가 false인 경우 2번째 피 연산자를 반환
>
>    (false인 표현식 && ?) => 두번째 표현식 반환
>
> 2. 첫번째 피 연산자가 false 인 경우 첫번째 피 연산자를 그대로 반환.
>
>    (true인 표현식 && ?) => 첫번째 표현식 반환

| 단축 평가 표현식    | 평가 결과 |
| ------------------- | --------- |
| true \|\| anything  | true      |
| false \|\| anything | anything  |
| true && anything    | anything  |
| false && anything   | false     |

```javascript
// 논리합(||) 연산자
'Cat' || 'Dog'  // 'Cat'
false || 'Dog'  // 'Dog'
'Cat' || false  // 'Cat'

// 논리곱(&&) 연산자
'Cat' && 'Dog'  // Dog
false && 'Dog'  // false
'Cat' && false  // false
```

**논리 연산의 결과를 결정한 피연산자의 타입을 변환하지 않고 그대로 반환하는 것이 단축평가의 특징이다. 단축평가는 표현식을 평가하는 도중 평가결과가 확정된 경우, 나머지 평가과정을 중단한다.**

<br>

- 단축평가를 통한 if문 대체

```javascript
var done = true;
var message = '';

// 논리곱 연산자
//if 문
if (true) message = '완료';

// 단축평가
message = true && '완료';

console.log(message);       // 완료
```

```javascript
var done = false;
var message = '';

// 논리합 연산자
// if문
if (true) message = '미완료';

// 단축평가
message = false || '미완료';

console.log(message);       // 미완료
```

<br>

> ETC )
>
> - 객체를 가리키는 변수가 null(또는 undefined)인지 확인하고 프로퍼티를 참조할 때
>
> ```javascript
> const elem = null;
> 
> // elem이 null 또는 undefined인 경우, 옵셔널 체이닝 문법은 undefined를 반환한다.
> const value = elem?.value; // undefined
> // 옵셔널 체이닝 문법은 아래와 같이 동작한다.
> // const value = (elem === null || elem === undefined) ? undefined : elem.value;
> ```
>
> 
>
> - 함수 매개변수에 기본값을 설정할 때
>
> ```javascript
> // 단축 평가를 사용한 매개변수의 기본값 설정
> function getStringLength(str) {
>   str = str || '';
>   return str.length;
> }
> 
> getStringLength();     // 0
> getStringLength('hi'); // 2
> 
> // ES6의 매개변수의 기본값 설정
> function getStringLength(str = '') {
>   return str.length;
> }
> 
> getStringLength();     // 0
> getStringLength('hi'); // 2
> ```
>
> 이 두 부분에 대해서는 추후 함수와 객체를 배운 후 복습해봐야 겠다. 지금은 무슨말인지 잘 모르겠다..