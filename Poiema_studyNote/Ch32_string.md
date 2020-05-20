# String

- Toc

1. [String 생성자 함수](#string-생성자-함수)

2. [length 프로퍼티](#length-프로퍼티)

3. [String 메소드](#string-메소드)

   3-1 .[String.prototype.indexOf](#stringprototypeindexof)

   3-2. [String.prototype.include](#stringprototypeincludes)

   3-3. [String.prototype.startsWith](#stringprototypestartswith)

   3-4. [String.prototype.endsWith](#stringprototypeendswith)

   3-5. [String.prototype.charAt](#stringprototypecharat)

   3-6. [String.prototype.substring](#stringprototypesubstring)

   3-7. [String.prototype.slice](#stringprototypeslice)

   3-8. [String.prototype.toUpperCase](#stringprototypetouppercase)

   3-9. [String.prototype.toLowerCase](#stringprototypetolowercase)

   3-10. [String.prototype.repeat](#stringprototyperepeat)

   3-11. [String.prototype.replace](#stringprototypereplace)

   3-12. [String.prototype.split](#stringprototypesplit)

   <br>

<br>

## String 생성자 함수

표준빌트인 객체인 String 객체는 <strong>생성자 함수 객체</strong>이다. 따라서 new 연산자와 함께 호출하여 String 인스턴스를 생성할 수 있다.

String 생성자 함수에 인수를 전달하지 않고 new 연산자와 함께 호출하면 [[StringData]] 내부슬롯에 빈 문자열을 할당한 String 래퍼객체를 생성한다.

```js
const str = new String();
console.log(str);  // String {""}
```

![image](https://user-images.githubusercontent.com/62285872/82327882-09a72e80-9a1a-11ea-91c5-6f717036d525.png)	

> 위 예제를 크롬 부라우저의 개발자 도구에서 실행 해 보면 [[PrimitiveValue]]라는 프로퍼티가 보인다. 이는 [[StringData]] 내부슬롯을 가리킨다. ES5에서는 [[StringData]]를 [[PrimitiveValue]]라 불렀다.

String 생성자 함수에 문자열을 인수로 전달하면 [[StringData]] 내부슬롯에 인수로 전달받은 문자열을 할당한 String 래퍼객체를 생성한다.

```js
const str = new String('Lee');
console.log(str);   // String {"Lee"}
```

![image](https://user-images.githubusercontent.com/62285872/82328155-76bac400-9a1a-11ea-8e71-b03a0295ed0c.png)	

문자열은 유사배열 객체이면서 이터러블이다. 따라서 배열과 유사하게 인덱스를 사용하여 각 문자에 접근이 가능하다.

```js
console.log(str[0]); // L
console.log(str[1]); // e
console.log(str[2]); // e
```

String 생성자 함수에 <strong>문자열이 아닌 값을 인수로 전달하면 전달받은 인수를 문자열로 강제 변환</strong> 후, [[StringData]] 내부슬롯에 변환한 문자열을 할당한 String 래퍼객체를 생성한다.

만약 new 연산자를 사용하지 않고 String 생성자 함수를 호출하면 String 인스턴스가 아닌 **문자열**을 반환한다. 이를 이용하여 명시적으로 타입을 변환하기도 한다.

```js
// 숫자 타입 => 문자열 타입
String(1);        // -> "1"
String(NaN);      // -> "NaN"
String(Infinity); // -> "Infinity"

// 불리언 타입 => 문자열 타입
String(true);  // -> "true"
String(false); // -> "false"
```

<br>

## length 프로퍼티

length 프로퍼티는 문자열의 **문자개수**를 반환한다.

String 래퍼객체는 배열과 마찬가지로 length 프로퍼티를 갖으며 인덱스를 나타내는 숫자를 프로퍼티 키로, 각 문자를 프로퍼티 값으로 가진다. (유사배열 객체이다.)

```JS
'Hello'.length;    // -> 5
'안녕하세요!'.length; // -> 6
```

<br>

## String 메소드

String 객체의 모든 메소드는 <strong>언제나 새로운 문자열을 반환한다.</strong> 문자열은 **변경불가능**(immutable)한 원시 값이기 때문이다.

### String.prototype.indexOf

indexOf 메소드는 문자열에서 인수로 전달한 문자열을 검색하여 첫번째 인덱스를 반환한다. 검색에 실패하면 -1을 반환한다.

```js
const str = 'Hello World';

// 문자열 str에서 'l'을 검색하여 첫번째 인덱스를 반환한다.
str.indexOf('l'); // -> 2

str.indexOf('or'); // -> 7

// 검색에 실패하면 -1을 반환한다.
str.indexOf('x'); // -> -1
```

indexOf 메소드의 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다. 2번째 인수는 옵션이다. (배열의 Array.prototype.indexOf와 동일)

```js
// 문자열 str의 인덱스 3부터 'l'을 검색하여 첫번째 인덱스를 반환한다.
str.indexOf('l', 3); // -> 3
```

문자열에 특정 문자열이 존재하는지 확인 할 떄 유용하다.

```js
// indexOf
if (str.indexOf('Hello') !== -1) {
  // 문자열 str에 'Hello'가 포함되어 있는 경우에 처리할 내용
}

// includes
if (str.includes('Hello')) {
  // 문자열 str에 'Hello'가 포함되어 있는 경우에 처리할 내용
}
```

ES6에서 새롭게 도입된 String.prototype.includes 메소드를 사용하여 특정 문자열의 존재 유무 또한 확인이 가능하다. (Array.prototype.includes 처럼 존재하면 true / 없으면 false를 반환)

<br>

### String.prototype.includes

ES6에서 새롭게 도입된 includes 메소드는 문자열에 인수로 전달한 문자열이 포함되어 있는지 확인하여 그 결과를 true 또는 false로 반환한다.

```js
const str = 'hello world';

str.includes('hello');  // true
str.includes('');   // true
str.includes('x');  // false
str.includes();  // false .. ??
```

includes 메소드의 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다. 2번쨰 인수는 옵션이다.

```js
const str = 'Hello world';

str.includes('l', 3); // -> true
str.includes('H', 3); // -> false
```

<br>

### String.prototype.startsWith

ES6에서 새롭게 도입된 startsWith 메소드는 <strong>문자열이 인수로 전달한 문자열로 시작</strong>되는지 확인하여 그 결과를 true 또는 false로 반환한다.

```js
const str = 'Hello world';

// 문자열 str이 'He'로 시작하는지 확인
str.startsWith('He'); // -> true
// 문자열 str이 'x'로 시작하는지 확인
str.startsWith('x'); // -> false
```

startWith 메소드의 2번째 인수로 검색을 시작할 인덱스를 전달할 수 있다.

```js
// 문자열 str의 인덱스 5부터 시작하는 문자열이 ' '로 시작하는지 확인
str.startsWith(' ', 5); // -> true
```

<br>

- String.prototype.endsWith

```js
// 문자열 str의 인덱스 5부터 시작하는 문자열이 ' '로 시작하는지 확인
str.startsWith(' ', 5); // -> true
```

<br>

### String.prototype.endsWith

ES6에서 새롭게 도입된 endsWith 메소드는 메소드는 <strong>문자열이 인수로 전달한 문자열로 끝나는지 확인</strong>하여 그 결과를 true 또는 false로 반환한다.

```js
const str = 'Hello world';

// 문자열 str이 'ld'로 끝나는지 확인
str.endsWith('ld'); // -> true
// 문자열 str이 'x'로 끝나는지 확인
str.endsWith('x'); // -> false
```

endsWith 메소드의 2번째 인수로 검색할 문자열의 **길이**를 전달할 수 있다.

```js
// 문자열 str의 처음부터 5자리까지('Hello')가 'lo'로 끝나는지 확인
str.endsWith('lo', 5); // -> true
```

<br>

### String.prototype.charAt

charAt 메소드는 인수로 전달한 인덱스에 위치한 <strong>문자를 반환</strong>한다.

```js
const str = 'Hello';

for (let i = 0; i < str.length; i++) {
  console.log(str.charAt(i)); // H e l l o
}
```

인덱스는 문자열의 범위, 즉 0 ~ (문자열 길이 - 1) 사이의 정수여야한다. 인덱스가 문자열의 범위를 벗어난 정수인 경우, 빈 문자열을 반환한다.

```js
// 인덱스가 문자열의 범위(0 ~ str.length-1)를 벗어난 경우 빈문자열을 반환한다.
str.charAt(5); // -> ''
```

charAt 메소드와 유사한 문자열 메소드는 String.prototype.charCodeAt과 String.prototype.codePointsAt이 있다.

> - String.prototype.charCodeAt
>
> **`charCodeAt()`** 메서드는 주어진 인덱스에 대한 UTF-16 코드를 나타내는 0부터 65535 사이의 정수를 반환한다.
>
> ```js
> 'ABC'.charCodeAt(0); // returns 65
> ```
>
> - String.prototype.codePointsAt
>
> **`charCodeAt()`** 메서드는 주어진 인덱스에 대해 음이 아닌 정수의 유니코드 값을 반환한다.
>
> ```js
> 'ABC'.codePointAt(1)           // 66
> '\uD800\uDC00'.codePointAt(0)  // 65536
> 
> 'XYZ'.codePointAt(42)          // undefined
> ```

<br>

### String.prototype.substring

substring 메소드는 첫번째 인수로 전달한 인덱스에 위치하는 문자부터 두번째 인수로 전달한 인덱스에 위치하는 문자의 바로 이전 문자까지 <strong>문자열의 부분 문자열을 반환</strong>한다.

```js
const str = 'hello world';

str.substring(2, 6);  // 'llo '
```

substring 메소드의 두번째 인수는 생략할 수 있다. 단, 두번째 인수를 생략하게 되면 첫번째 인수로 전달한 인덱스에 위치하는 문자부터 마지막 문자까지 부분 문자열을 반환한다.

substring 메소드의 첫번째 인수는 두번째 인수보다 큰 정수이어야 정상이다. 하지만 아래와 같이 인수를 전달하여도 정상 동작한다.

- 첫번째 인수 > 두번째 인수인 경우, 두 인수는 교환된다.
- 인수 < 0 또는 NaN인 경우, 0으로 취급된다.
- 인수 > 문자열의 길이(str.length)인 경우, 인수는 문자열의 길이(str.length)으로 취급된다.

```js
const str = 'hello world';

str.substring(2);  // 'llo world'

// 첫번째 인수 > 두번째 인수인 경우, 두 인수는 교환된다.
str.substring(4, 1); // -> 'ell'

// 인수 < 0 또는 NaN인 경우, 0으로 취급된다.
str.substring(-2); // -> 'Hello World'

// 인수 > 문자열의 길이(str.length)인 경우, 인수는 문자열의 길이(str.length)으로 취급된다.
str.substring(1, 100); // -> 'ello World'
str.substring(20); // -> ''
```

Stirng.prototype.indexOf 메소드와 함께 사용하면 특정 문자열을 기준으로 앞뒤에 위치한 부분 문자열을 취득할 수 있다.

```js
const str = 'Hello World';

// 스페이스를 기준으로 앞에 있는 부분 문자열 취득
str.substring(0, str.indexOf(' ')); // -> 'Hello'
// 스페이스를 기준으로 뒤에 있는 부분 문자열 취득
str.substring(str.indexOf(' ') + 1, str.length); // -> 'World'
```

<br>

### String.prototype.slice

slice 메소드는 substring 메소드와 동일하게 동작한다. 단, slice 메소드에는 음수인 인수를 전달할 수 있다. 음수인 인수를 전달하면 뒤에서부터 시작하여 문자열을 잘라내어 반환한다.

```js
const str = 'hello world';

// substring과 slice 메소드는 동일하게 동작한다.
// 0번째부터 5번째 이전 문자까지 잘라내어 반환
str.substring(0, 5); // -> 'hello'
str.slice(0, 5); // -> 'hello'

// 인덱스가 2인 문자부터 마지막 문자까지 잘라내어 반환
str.substring(2); // -> 'llo world'
str.slice(2); // -> 'llo world'

// slice 메소드는 음수인 인수를 전달할 수 있다.
// 인수 < 0 또는 NaN인 경우, 0으로 취급된다.
str.substring(-5); // -> 'hello world'
// 뒤에서 5자리를 잘라내어 반환한다.
str.slice(-5); // ⟶ 'world'
```

<br>

### String.prototype.toUpperCase

toUpperCase 메소드는 문자열의 모든 문자를 대문자로 변경하여 반환한다.

```js
const str = 'Hello World!';

str.toUpperCase(); // -> 'HELLO WORLD!'
```

<br>

### String.prototype.toLowerCase

toLowerCase 메소드는 문자열의 모든 문자를 소문자로 변경하여 반환한다.

```js
const str = 'Hello World!';

str.toLowerCase(); // -> 'hello world!'
```

<b>

String.prototype.trim

trim 메소드는 문자열 앞뒤에 공백 문자가 있을 경우, 이를 제거한 문자열을 반환한다.

```js
const str = '   foo  ';

str.trim(); // -> 'foo'
```

현재 제안 stage 3에 있는 String.prototype.trimStart, String.prototype.trimEnd를 사용하면 문자열 앞 또는 뒤에 공백 문자가 있을 경우, 이를 제거한 문자열을 반환한다.

```js
const str = '   foo  ';

// String.prototype.{trimStart,trimEnd} : Proposal stage 3
str.trimStart(); // -> 'foo  '
str.trimEnd();   // -> '   foo'
```

String.prototype.replace 메소드에 정규표현식을 인수로 전달하여 공백문자를 제거할 수도 있다.

```js
const str = '   foo  ';

// String.prototype.replace
str.replace(/\s/g, '');   // -> 'foo'
str.replace(/^\s+/g, ''); // -> 'foo  '
str.replace(/\s+$/g, ''); // -> '   foo'
```

<br>

### String.prototype.repeat

ES6에서 새롭게 도입된 repeat 메소드는 인수로 전달한 **정수**만큼 **반복**해 연결한 새로운 문자열을 반환한다. 인수로 전달한 정수가 0이면 빈 문자열을 반환하고 음수이면 RangeError를 발생시킨다.

```js
const str = 'abc';

str.repeat(0);   // -> ''
str.repeat(1);   // -> 'abc'
str.repeat(2);   // -> 'abcabc'
str.repeat(2.5); // -> 'abcabc' (2.5 → 2)
str.repeat(-1);  // -> RangeError: Invalid count value
```

<br>

### String.prototype.replace

replace 메소드는 첫번째 인수로 전달한 문자열 또는 정규표현식을 대상 문자열에서 검색하여 두번째 인수로 전달한 문자열로 **치환**하여 결과가 반영된 새로운 문자열을 반환한다.

```js
const str = 'Hello world';

// str에서 첫번째 인수 'world'를 검색하여 두번째 인수 'Lee'로 치환한다.
str.replace('world', 'Lee'); // -> 'Hello Lee'
```

검색된 문자열이 여럿 존재할 경우 <strong>첫번째로 검색된 문자열만 치환</strong>한다.

```js
const str = 'Hello world world';

str.replace('world', 'Lee'); // -> 'Hello Lee world'
```

replace 메소드의 첫번째 인수로 정규 표현식을 전달할 수도 있다.

```js
const str = 'Hello Hello';

// /hello/gi은 정규 표현식이다.
// 'hello'를 대소문자를 구별하지 않고 문자열 내의 모든 패턴을 검색한다.
str.replace(/hello/gi, 'Lee'); // -> 'Lee Lee'
```

replace 메소드의 두번째 인수로 치환 함수를 전달할 수 있다. 예를 들어 카멜 케이스를 스네이크 케이스로, 스네이크 케이스를 카멜 케이스로 변경하는 함수를 replace 메소드로 구현할 수 있다.

```js
// camelCase => snake_case
function camelToSnake(camelCase) {
  return camelCase.replace(/.[A-Z]/g, match => {
    console.log(match); // 'oW'
    return match[0] + '_' + match[1].toLowerCase();
  });
}

const camelCase = 'helloWorld';
camelToSnake(camelCase); // -> 'hello_world'

// snake_case => camelCase
function snakeToCamel(snakeCase) {
  return snakeCase.replace(/_[a-z]]/g, match => {
    console.log(match); // '_w'
    return match[1].toUpperCase();
  }); // helloWorld
}

const snakeCase = 'hello_world';
snakeToCamel(snakeCase); // -> 'helloWorld'
```

<br>

### String.prototype.split

첫번째 인수로 전달한 문자열 또는 정규표현식을 대상 문자열에서 검색하여 문자열을 구분한 후 분리된 각 문자열로 이루어진 **배열**을 반환한다. 원본문자열은 변경되지 않는다.

인수가 없는 경우, 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.

- 사용법

```js
/**
 * @param {string | RegExp} [separator] - 구분 대상 문자열 또는 정규표현식
 * @param {number} [limit] - 구분 대상수의 한계를 나타내는 정수
 * @return {string[]}
 */
str.split([separator[, limit]])
```

```js
const str = 'How are you doing?';

// 공백으로 구분(단어로 구분)하여 배열로 반환한다
str.split(' '); // -> ["How", "are", "you", "doing?"]

// 정규 표현식
str.split(/\s/); // -> ["How", "are", "you", "doing?"]

// 인수가 없는 경우, 대상 문자열 전체를 단일 요소로 하는 배열을 반환한다.
str.split(); // -> ["How are you doing?"]

// 각 문자를 모두 분리한다
str.split(''); // -> ["H", "o", "w", " ", "a", "r", "e", " ", "y", "o", "u", " ", "d", "o", "i", "n", "g", "?"]

// 공백으로 구분하여 배열로 반환한다. 단 요소수는 3개까지만 허용한다
str.split(' ', 3); // -> ["How", "are", "you"]

// 'o'으로 구분하여 배열로 반환한다.
str.split('o'); // -> ["H", "w are y", "u d", "ing?"]
```

