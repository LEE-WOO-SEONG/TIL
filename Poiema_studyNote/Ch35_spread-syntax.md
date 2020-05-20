# 스프레드 문법

- Toc

1. [함수 호출문의 인수 목록에서 사용하는 경우](#함수-호출문의-인수-목록에서-사용하는-경우)

2. [배열 리터럴 내부에서 사용하는 경우](#배열-리터럴-내부에서-사용하는-경우)

   2-1. [concat](#concat)

   2-2. [push](#push)

   2-3. [splice](#splice)

   2-4. [배열복사](#배열복사)

   2-5. [유사배열 객체를 배열로 변환](#유사배열-객체를-배열로-변환)

3. [객체 리터럴 내부에서 사용하는 경우](#객체-리터럴-내부에서-사용하는-경우)

<br>

<br>

ES6에서 새롭게 도입된 스프레드 문법(Spread syntax, 전개 문법) `...` 은 하나로 뭉쳐있는 여러 값들의 집합을 **펼쳐서** 개별적인 값들의 목록으로 만든다.

스프레드 문법을 사용할 수 있는 대상은 Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), Arguments와 같이 `for...of` 문으로 순회할 수 있는 **이터러블**에 한정된다.

```js
// ...[1, 2, 3]는 [1, 2, 3]을 개별 요소로 분리한다(→ 1, 2, 3)
console.log(...[1, 2, 3]) // 1 2 3

// 문자열은 이터러블이다.
console.log(...'Hello'); // H e l l o

// Map과 Set은 이터러블이다.
console.log(...new Map([['a', '1'], ['b', '2']])); // [ 'a', '1' ] [ 'b', '2' ]
console.log(...new Set([1, 2, 3])); // 1 2 3

// 이터러블이 아닌 일반 객체는 스프레드 문법의 대상이 될 수 없다.
console.log(...{ a: 1, b: 2 });
// TypeError: Found non-callable @@iterator
```

> 이터러블이란?
>
> - 이터러블 프로토콜(iterable protocol)
>
> Well-Known Symbol인 `Symbol.iterator`를 프로퍼티 키로 사용한 메소드를 **직접** 구현하거나 **프로토타입** 체인에 의한 상속을 통해 소유하고, Symbol.iterator 메소드를 호출하면 이터레이터 프로토콜을 준수한 이터레이터(iterator)를 반환한다. 이러한 규약을 이터러블 포로토콜이라 하며 이터러블 프로토콜을 준수한 객체를 **이터러블**(iterable)이라 한다. 이터러블은 `for...of` 문으로 순회할 수 있으며 <strong>스프레드 문법과 디스트럭처링 할당의 대상으로 사용할 수 있다.</strong>
>
> - 이터레이터 프로토콜(iterator protocol)
>
> 이터러블의 Symbol.iterator 메소드를 호출하면 이터레이터 프로토콜을 준수한 **이터레이터**를 반환한다. 이터레이터는 next 메소드를 소유하며 next 메소드를 호출하면 이터러블을 순회하며 value와 done 프로퍼티를 갖는 이터레이터 리절트 객체를 반환한다. 이러한 규약을 이터레이터 프로토콜이라 하며 이터레이터 프로토콜을 준수한 객체를 이터레이터 라 한다. 이터레이터는 이터러블의 요소를 탐색하기 위한 포인터 역할을 한다.

위 예제에서 `...[1, 2, 3]`은 이터러블인 배열을 펼쳐서 요소값을 개별적인 값들의 **목록** 1 2 3 으로 만든다. 이 때 1 2 3 은 값이 아니라 <strong>값들의 목록</strong>이다. <strong>즉, 스프레드 문법의 결과는 값이 아니다.</strong> 이는 스프레드 문법 `...` 이 피연산자를 연산하여 값을 생성하는 연산자가 아님을 의미한다. 따라서 스프레드 문법의 결과는 변수에 할당할 수 없다.

```js
const list = ...arr; // SyntaxError: Unexpected token ...
```

이처럼 스프레드 문법의 결과물은 단독으로 사용할 수 없고, 아래와 같이 쉼표로 구분한 값의 **목록**을 사용하는 문맥에서만 사용할 수 있다.

- 함수 호출문의 인수 목록
- 배열 리터럴의 요소 목록
- 객체 리터럴의 프로퍼티 목록

<br>

## 함수 호출문의 인수 목록에서 사용하는 경우

요소값들의 집합인 배열을 펼쳐서 개별적인 값들의 목록으로 만든 후, 이를 함수의 인수 목록으로 전달해야 하는 경우가 있다.

```js
const arr = [1, 2, 3];

const maxValue = Math.max(arr);

console.log(MaxValue);  // NaN
```

Math.max 메소드는 매개변수 개수를 확정할 수 없는 <strong>가변인자 함수</strong>이다. 아래와 같이 개수가 정해져 있지 않은 여러 개의 숫자를 인수로 전달받아 인수 중에서 최대값을 반환한다.

```js
Math.max(1, 2);        // 2
Math.max(1, 2, 3);     // 3
Math.max(1, 2, 3 ,4);  // 4
```

Math.max 메소드는 숫자들의 목록을 인수로 전달받는다. 위와 같이 배열로 목록을 전달하게 되면 암묵적으로 숫자 타입으로의 변환이 일어나는데, 이 때 빈 배열이 아닌 배열은 NaN을 나타내므로 Math.max(NaN)의 결과값은 NaN이 된다.

스프레드 문법을 사용하면 다음과 같다.

```js
const arr = [1, 2, 3];

const MaxValue = Math.max(...arr);

console.log(maxValue);    // 3
```

스프레드 문법은 Rest 파라미터와 형태가 동일하여 혼동할 수 있으므로 주의가 필요하다.

Rest 파라미터는 함수에 전달된 인수들의 목록을 배열로 전달받기 위해 매개변수 이름앞에 `...`을 붙이는 것이다. 스프레드 문법은 여러 개의 값이 하나로 뭉쳐있는 배열과 같은 이터러블을 **펼쳐서** 개별적인 값들의 목록을 만드는 것이다. <strong>따라서 Rest 파라미터와 스프레드 문법은 서로 반대의 개념이다.</strong>

```js
// Rest 파라미터는 인수들의 목록을 배열로 전달받는다.
function foo(param, ...rest) {
  console.log(param); // 1
  console.log(rest);  // [ 2, 3 ]
}

// 스프레드 문법은 배열과 같은 이터러블을 펼쳐서 개별적인 값들의 목록을 만든다.
// [1, 2, 3] -> 1, 2, 3
foo(...[1, 2, 3]);
```

<br>

## 배열 리터럴 내부에서 사용하는 경우

스프레드 문법을 배열 리터럴에서 사용하면 보다 간결하고 가독성이 좋게 표현할 수 있다.

### concat

ES5에서는 기존의 배열 요소들을 새로운 배열의 일부로 만들고 싶은 경우, 배열 리터럴만으로 해결할 수 없고 concat 메소드를 사용해야 했었다. 스프레드 문법과 비교 해 보자.

```js
// ES5
var arr = [1, 2].concat([3, 4]);
console.log(arr);  // [1, 2, 3, 4]

// 스프레드 문법

var arr = [...[1, 2], ...[3, 4]];
console.log(arr);  // [1, 2, 3, 4]
```

<br>

### push

ES5에서는 기존의 배열에 다른 배열의 요소들을 push 하려면 아래와 같은 방법을 사용해야 했다.스프레드 문법과 비교 해 보자.

```js
// ES5
var arr1 = [1, 2];
var arr2 = [3, 4];

Array.prototype.push.apply(arr1, arr2);

console.log(arr1);   //  [1, 2, 3, 4]

// ES6
const arr1 = [1, 2];
const arr2 = [3, 4];

arr1.push(...arr2);

console.log(arr1);   // [1, 2, 3, 4]
```

<br>

### splice

ES5에서 기존의 배열에 다른 배열의 요소들을 삽입하려면 splice를 사용했었다. 스프레드 문법과 비교 해 보자.

```js
// ES5
var arr1 = [1, 4];
var arr2 = [2, 3];
1 0 2 3
Array.prototype.splice.apply(arr1, [1, 0].concat(arr2));
// -> arr1.prototype.splice(1, 0, 2, 3);
console.log(arr1);  // [1, 2, 3, 4]

// ES6
const arr1 = [1, 4];
const arr2 = [2, 3];

arr1.splice(1, 0, ...arr2);
console.log(arr1);   // [1, 2, 3, 4]
```

<br>

### 배열복사

ES5에서 기존의 배열을 복하기 위해서 slice 메소드를 사용했었다. 스프레드 문법과 비교 해 보자.

```js
// ES5
var origin = [1, 2];
var copy = origin.slice();

console.log(copy);  // [1, 2]
console.log(copy === origin);  // false

// ES6
const origin = [1, 2];
const copy = [...origin];

console.log(copy);  // [1, 2]
console.log(copy === origin);  // false
```

스프레드 문법을 사용할 때에도 slice와 마찬가지로 배열의 각 요소를 얕은복사(shallow copy)하여 새로운 복사본을 생성한다.

<br>

### 유사배열 객체를 배열로 변환

유사배열 객체를 배열로 변환하려면 slice 메소드를 apply 함수로 호출하는 것이 일반적이다.

```js
// ES5
function sum() {
    var args = Array.prototype.slice.apply(arguments);
    // var args = Array.from(arguments);
    
    return args.reduce(function (pre, cur) {
        return pre + cur;
    }, 0)
}

console.log(sum(1, 2, 3));  // 6

// ES6
function sum() {
    let args = [...arguments];
    return args.reduce ((pre, cur) => pre + cur, 0);
}

console.log(sum(1, 2, 3)); // 6
```

<br>

## 객체 리터럴 내부에서 사용하는 경우

객체 리터럴의 프로퍼티 목록에서 스프레드 문법을 사용할 수 있는 스프레드 프로퍼티는 Rest 프로퍼티와 함께 현재 TC39 프로세스의 stage 4단계에 제안되어 있다.

<strong>스프레드 문법의 대상은 이터러블이어야 하지만 스프레드 프로퍼티 제안은 일반 객체를 대상으로도 스프레드 문법의 사용을 허용한다.</strong>

```js
const obj = { x: 1, y: 2};
const copy = { ...obj };
console.log(copy);  // { x: 1, y: 2 }
console.log(obj === copy); // false  (얕은복사)

const merge = { x: 1, y: 2, ...{ a: 3, b: 4} };
console.log(merged);  // { x: 1, y: 2, a: 3, b: 4 }
```

스프레드 프로퍼티가 제안되기 이전에는 ES6에서 도입된 Object.assign 메소드를 사용하여 여러개의 객체를 병합하거나 특정 프로퍼티를 변경 또는 추가하였다.

```js
// Object.assign
// 프로퍼티가 중복되는 경우, 뒤에 위치한 프로퍼티가 우선권을 갖는다.
const merge = Object.assgin({}, { x: 1, y: 2 }, { y: 10, z: 3 });
console.log(merge);  // { x: 1, y: 10, z: 3 }

// 특정 프로퍼티 변경
const changed = Object.assign({}, { x: 1, y: 2 }, { y: 100 });
console.log(changed); // { x: 1, y: 100 }

// 프로퍼티 추가
const added = Object.assign({}, { x: 1, y: 2 }, { z: 0 });
console.log(added); // { x: 1, y: 2, z: 0 }

// 스프레드 문법
const merge = {...{ x: 1, y: 2 }, ...{ y: 10, z: 3 }};
console.log(merge);  // { x: 1, y: 10, z: 3 }

const changed = { ...{ x: 1, y: 2 }, y: 100 };
console.log(changed); // { x: 1, y: 100 }

const added = { ...{ x: 1, y: 2 }, z: 0 };
console.log(added);  // { x: 1, y: 2, z: 0}
```



