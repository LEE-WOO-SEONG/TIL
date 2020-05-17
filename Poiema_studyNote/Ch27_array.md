        for( var i = 0; i  < this.length; i++) {
            callback.call(thisArg, this[i], i, this);
        }
    };
# 배열

- Toc

1. [배열이란?](#배열이란)

2. [자바스크립트 배열은 배열이 아니다](#자바스크립트-배열은-배열이-아니다)

3. [length 프로퍼티와 희소배열](#length-프로퍼티와-희소배열)

4. [배열생성](#배열생성)

   4-1. [배열 리터럴](#배열-리터럴)

   4-2. [Array 생성자 함수](#Array-생성자-함수)

   4-3. [Array.of](#Arrayof)

   4-4. [Array.from](#Arrayfrom)

5. [배열 요소의 참조](#배열-요소의-참조)

6. [배열요소의 추가와 갱신](#배열요소의-추가와-갱신)

7. [배열요소의 삭제](#배열요소의-삭제)

8. [배열 메소드](#배열-메소드)

9. [배열 고차함수](#배열-고차함수)

   9-1. [Array.prototype.sort](#Arrayprototypesort)

   9-2. [Array.prototype.forEach](#Arrayprototypeforeach)
   
   9-3. [Array.prototype.map](#Arrayprototypemap)
   
   9-4. [Array.prototype.filter](#Arrayprototypefilter)
   
   9-5. [Array.prototype.reduce](#Arrayprototypereduce)
   
   9-6. [Array.prototype.some](#Arrayprototypesome)
   
   9-7. [Array.prototype.every](#Arrayprototypeevery)
   
   9-8 .[Array.prototype.find](#Arrayprototypefind)
   
   9-9 .[Array.prototype.findIndex](#ArrayprototypefindIndex)
   
   9-10. [Array.prototype.flatMap](#ArrayprototypeflatMap)
   
   

<br>

<br>

## 배열이란?

배열(array)은 여러개의 값을 순차적으로 나열한 **자료구조**이다. 배열은 사용빈도가 매우 높은 가장 기본적인 자료구조이다. 자바스크립트는 배열을 다루기 위한 유용한 메소드를 다수 제공한다. 배열은 사용빈도가 높으므로 배열 메소드를 능숙하게 다룰 수 있따면 코딩에 매우 도움이 된다.

```js
// 배열리터럴
const arr = ['lee', 'kim', 'park'];
```

배열이 가지고 있는 값을 **요소**(element)라 부른다. 자바스크립트의 <strong>모든 값</strong>은 배열의 요소가 될 수 있다. 즉, 원시값은 물론 객체, 함수, 배열 또한 배열의 요소가 될 수 있다.

배열의 요소는 배열에서 자신의 위치를 나타내는 0 이상의 정수인 **인덱스**(index)를 갖는다. 이를통해 요소에 접근이 가능하며 대부분의 프로그래밍 언어에서 <strong>인덱스는 0부터 시작한다.</strong>

![image](https://user-images.githubusercontent.com/62285872/82113209-4a3f4780-978f-11ea-9a9c-4caf84617918.png)	

배열에서 요소에 접근할 때에는 대괄호 표기법을 사용한다. 대괄호 내에는 접근하고 싶은 요소의 인덱스를 지정한다.

```js
arr[0] // 'lee'
arr[1] // 'kim'
arr[2] // 'park'
```

배열은 요소의 개수, 즉 배열의 길이를 나타내는 length 프로퍼티를 갖는다.

그리고 자바스크립트에서 배열이라는 타입은 존재하지 않는다. 배열은 '객체'이다.

```js
typeof arr // Object
```

배열은 <strong>배열리터럴</strong> 또는 <strong>Array 생성자 함수</strong>로 생성할 수 있다. 배열의 생성자 함수는 `Array`이며 배열의 프로토타입 객체는 `Array.prototype` 이다. Array.prototype은 배열을 위한 빌트인 메소드 들을 제공한다.

```js
const arr = [1, 2, 3];

arr.constructor === Array // true
Object.getPrototypeOf(arr) === Array.prototype // true
```

배열은 '객체'이지만 일반객체와는 다른 독특한 특징이 있다.

| 구분            | 객체                      | 배열          |
| --------------- | ------------------------- | ------------- |
| 구조            | 프로퍼티 키 / 프로퍼티 값 | 인덱스 / 요소 |
| 값의 참조       | 프로퍼티 키               | 인덱스        |
| 값의 순서       | x                         | o             |
| length 프로퍼티 | x                         | o             |

일반객체와 배열을 구분하는 가장 명확한 차이는 <strong>값의 순서와 length 프로퍼티</strong>이다. 값의 순서와 length 프로퍼티를 갖는 배열은 <em>반복문</em>을 통해 순차적으로 값에 접근하기 적합한 자료구조이다.

```js
const arr = [1, 2, 3];

for(let i = 0; i < arr.length; i++) {
    console.log(i);      // 1, 2, 3
}
```

배열의 장점은 처음부터 순차적으로 요소에 접근할 수도 있고 마지막부터 거꾸로 요소에 접근할 수도 있으며 특정위치부터 순차적으로 요소에 접근할 수도 있다는 것이다. 이는 배열이 인덱스, 즉 값의 순서와 length 프로퍼티를 갖기 때문에 가능한 것이다.

<br>

## 자바스크립트 배열은 배열이 아니다

일반적으로 배열이라는 자료구조의 개념은 <strong>동일한 크기의 메모리 공간이 빈틈없이 연속적으로 나열된 자료구조</strong>를 말한다. 

즉, 배열의 요소는 하나의 타입으로 통일되어 있으며 서로 연속적으로 **인접**해 있다. 이러한 배열을 **밀집배열**(dense array)이라한다.

배열의 요소는 동일한 크기를 갖으며 빈틈없이 연속적으로 이어져 있으므로 인덱스를 통해 단 한번의 연산으로 임의의 요소에 접근할 수 있다. 

(임의 접근(random access), 시간 복잡도 O(1))

```
검색 대상요소의 메모리주소 = 배열의 시작 메모리주소 + 인덱스 * 요소의 바이트 수
```

이처럼 배열은 인덱스를 통해 효율적으로 요소에 접근할 수 있지만 정렬되지 않은 배열에서 특정한 값을 탐색하는 경우, 모든 배열요소를 처음부터 값을 발견할 때 까지 차례대로 탐색해야한다. (선형 탐색(linear search), 시간 복잡도 O(n))

또한 배열에 요소를 삽입하거나 삭제하는 경우, 배열요소를 연속적으로 유지하기 위해 요소를 이동시켜야하는 단점도 있다.

자바스크립트의 배열은 지금까지 살펴본 일반적인 의미의 배열과는 다르다. 배열의 요소를 위한 각각의 메모리 공간은 동일한 크기를 갖지 않아도 되며, 연속적으로 이어져 있지 않을 수도 있다. 배열의 요소가 연속적으로 이어져 있지 않은 배열을 **희소배열**(sparse array)이라 한다.

자바스크립트에서 배열은 엄밀히 말하면 일반적 의미의 배열과는 다르다. <strong>자바스크립트의 배열은 일반적 배열의 동작을 흉내낸 특수한 객체이다.</strong>

```js
console.log(Object.getOwnPropertyDescriptors([1, 2, 3]));
/*
{
'0': { value: 1, writable: true, enumerable: true, configurable: true},
'1': { value: 2, writable: true, enumerable: true, configurable: true},
'2': { value: 3, writable: true, enumerable: true, configurable: true},
length: { value: 3, writable: true, enumerable: false, configurable: false }
}
*/
```

자바스크립트의 배열은 인덱스를 프로퍼티 키로, 요소를 프로퍼티 값으로 가지며 length 프로퍼티를 갖는 특수한 객체이다. 자바스크립트에서 사용할 수 있는 모든 값은 프로퍼티 값이 될 수 있으므로 <strong>어떤 타입의 값이라도 배열의 요소가 될 수 있다.</strong>

```js
const arr = [
  'string',
  10,
  true,
  null,
  undefined,
  NaN,
  Infinity,
  [ ],
  { },
  function () {}
];
```

일반적 배열과 자바스크립트의 배열의 장단점.

- 일반적인 배열은 인덱스로 배열 요소에 빠르게 접근할 수 있다. 하지만 특정 요소를 탐색하거나 요소를 삽입 또는 삭제하는 경우에는 효율적이지 않다.
- 자바스크립트의 배열은 해시테이블로 구현된 객체이므로 인덱스로 배열요소에 접근하는 경우 일반적인 배열보다 성능적인 면에서 느릴 수 밖에 없는 구조적인 단점을 갖는다. 하지만 특정 요소를 탐색하거나 요소를 삽입 또는 삭제하는 경우에는 일반적인 배열보다 빠른 성능을 기대할 수 있다.

즉, 자바스크립트 배열은 인덱스로 배열요소에 접근하는 경우에는 일반적인 배열보다 느리지만 <strong>특정요소를 탐색하거나 요소를 삽입 또는 삭제하는 경우에는 일반적인 배열보다 빠르다. </strong>

이처럼 인덱스로 배열 요소에 접근할 때 일반적인 배열보다 느릴 수 밖에 없는 구조적인 단점을 보완하기 위해 대부분의 모던 자바스크립트 엔진은 배열을 일반 객체와 구별하여 보다 배열처럼 동작하도록 최적화하여 구현하였다.

![image](https://user-images.githubusercontent.com/62285872/82114213-4cf16b00-9796-11ea-9266-cf7c28412603.png)	

<br>

### length 프로퍼티와 희소배열

length 프로퍼티는 요소의 개수, 즉 배열의 길이를 나타내는 정수를 값으로 갖는다. length 프로퍼티의 값은 빈 배열일 경우 0이며 빈 배열이 아닐 경우, 가장 큰 인덱스에 1을 더한 것 과 같다.

![image](https://user-images.githubusercontent.com/62285872/82114243-8cb85280-9796-11ea-937e-8b349b72e6f0.png)	

length 프로퍼티의 값은 0과 2<sup>32</sup> - 1(4,294,967,296 - 1) 미만의 양의 정수이다. 즉 배열에서 사용할 수 있는 가장 작은 인덱스는 0이며 가장 큰 인덱스는 2<sup>32</sup> - 2 이다.

length 프로퍼티의 값은 배열에 요소를 추가하거나 삭제하면 자동 갱신된다.

![image](https://user-images.githubusercontent.com/62285872/82114321-11a36c00-9797-11ea-94e7-4488ee33b5a1.png)	

length 프로퍼티의 값은 요소의 개수 즉, 배열의 길이를 바탕으로 결정되지만 임의의 숫자 값을 명시적으로 할당할 수도 있다.

현재 length 프로퍼티 값보다 작은 숫자 값을 할당하면 배열의 길이가 줄어들고 요소들도 사라진다.

반대로 현재 length 프로퍼티 값보다 큰 숫자 값을 할당하는 경우에는 length 프로퍼티 값은 변경되지만 실제로 배열의 길이가 늘어나지는 않는다.

![image](https://user-images.githubusercontent.com/62285872/82114494-f422d200-9797-11ea-9f49-8d390b1748be.png)	

위 예제의 출력결과에서 <2 empty items> 는 실제로 추가된 배열의 요소가 아니다. 즉 arr[3] / arr[4] 에는 값이 존재하지 않는다. 또한 값이 없이 비어있는 요소를 위해 메모리 공간을 확보하지 않으며 빈 요소를 생성하지도 않는다.

![image](https://user-images.githubusercontent.com/62285872/82114617-bf634a80-9798-11ea-8aa9-a7e292c786f7.png)	

이처럼 <strong>배열의 요소가 연속적으로 위치하지 않고 일부가 비어있는 배열</strong>을 희소배열 이라한다. 자바스크립트는 희소배열을 문법적으로 허용한다.  위 예제는 배열의 뒷부분만이 비어있어서 요소가 연속적으로 위치하는 것처럼 보일 수 있으나 중간이나 앞 부분이 비어있을 수도 있다.

![image](https://user-images.githubusercontent.com/62285872/82114801-d0f92200-9799-11ea-9439-09436a11606f.png)	

일반적인 배열(밀집배열)의 length는 배열요소의 개수 즉 배열의 길이와 언제나 일치한다. 하지만 <strong>희소배열은 length와 배열 요소의 개수가 일치하지 않는다.</strong> 희소배열의 length는 배열의 실제 요소 개수보다 크거나 같다.

자바스크립트는 문법적으로 희소 배열을 허용하지만 희소배열은 사용하지 않는 것이 좋다. 의도적으로 희소배열을 만들어야 하는 상황은 발생하지 않는다. 희소배열은 연속적인 값의 집합이라는 배열의 기본적인 개념과 맞지 않으며 성능에도 좋지 않은 영향을 준다.

배열을 생성할 경우에는 희소배열을 생성하지 않도록 주의하자.

<br>

## 배열생성

### 배열 리터럴

가장 일반적이고 간편한 배열 생성방식은 배열 리터럴을 사용하는 것이다.

배열리터럴은 0개 이상의 요소를 쉼표로 구분하여 대괄호로 묶는다. 배열리터럴은 객체리터럴과 달리 <strong>프로퍼티 이름이 없고 값 만이 존재한다.</strong>

```js
const arr = [1, 2, 3];
console.log(arr.length); // 3
```

배열 리터럴에 요소를 하나도 추가하지 않으면 length가 0인 빈 배열이 된다.

또한 배열리터럴에 요소를 생략하면 희소 배열이 생성된다.

```js
const arr =[1, , 3];

console.log(arr.length); // 3
console.log(arr);        // [1, empty, 3]
console.log(arr[1]);     // undefined
```

<br>

### Array 생성자 함수

Object 생성자 함수를 통해 객체를 생성할 수 있듯이 Array 생성자 함수를 통해 배열을 생성할 수도 있다. Array 생성자 함수는 전달된 인수의 개수에 따라 다르게 동작한다.

- 전달된 인수가 **1개**이고 **숫자**인 경우, 인수를 length 프로퍼티의 값으로 갖는 배열을 생성한다.

```js
const arr = new Array(10);

console.log(arr); // <10 empty items>
console.log(arr.length); // 10
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  length: { value: 10, writable: true, enumerable: false, configurable: false }
}
*/
```

이 때 생성된 배열은 희소배열이다. length 프로퍼티의 값은 0이 아니지만 실제로 배열의 요소는 존재하지 않는다.

또한 전달된 인수는  0 ~ 2<sup>32</sup> - 1 사이의 정수여야 한다. 전달된 인수가 범위를 벗어나면 RangeError가 발생한다.

```js
// 전달된 인수가 음수이면 에러가 발생한다.
new Array(-1); // RangeError: Invalid array length

// 배열에는 요소를 최대 4294967295개 갖을 수 있다.
new Array(4294967296); // RangeError: Invalid array length
```

- 전달된 인수가 없는 경우 빈 배열을 생성한다. 즉, 배열리터럴 `[]` 과 같다.

```js
const empty = new Array();

console.log(empty); // []
```

- 전달된 인수가 2개 이상이거나 숫자가 아닌 경우, 인수를 요소로 갖는 배열을 생성한다.

```js
// 전달된 인수가 1개이지만 숫자가 아니면 인수를 요소로 갖는 배열을 생성한다.
const arr1 = new Array({});

console.log(arr1); // [{}]

// 전달된 인수가 2개 이상이면 인수를 요소로 갖는 배열을 생성한다.
const arr2 = new Array(1, 2, 3);

console.log(arr2); // [1, 2, 3]
```

Array 생성자 함수는 new 연산자와 함께 호출하지 않더라도 즉 <strong>일반함수로 호출</strong>하더라도 배열을 생성하는 생성자 함수로 동작한다. 이는 Array 생성자 함수 내부에서 `new.target`을 확인하기 때문이다.

```js
const arr = Array(1, 2, 3);
console.log(arr); // [1, 2, 3]
```

<br>

### Array.of

ES6에서 새롭게 도입된 `Array.of` 메소드는 <strong>전달된 인수를 요소로 갖는 배열</strong>을 생성한다.

Array.of는 Array 생성자 함수와 다르게 전달된 인수가 1개이고 숫자이더라도 인수를 요소로 갖는 배열을 생성한다.

```js
const arr1 = Array.of(1);
console.log(arr1);  // [1]

const arr2 = Array.of('lee');
console.log(arr2);  // ['lee']

const arr3 = Array.of(1, 2, 3);
console.log(arr3);  // [1, 2, 3]
```

<br>

### Array.from

ES6에서 새롭게 도입된 `Array.from` 메소드는 <strong>유사배열 객체 또는 이터러블 객체</strong>를 얕게복사하여 새로운 배열을 생성한다.

- 사용법

```js
// Array.from(arrayLike[, mapFn[, thisArg]])
arrayLike : 배열로 변환하고자 하는 유사배열 객체 혹은 반복가능한 객체
mapFn : 배열의 모든 요소에 대해 호출할 맵핑함수 (옵션)
thisArg : mapFn 실행 시에 this로 사용할 값.   (옵션)
```



```js
const arr1 = Array.from('Hello');
console.log(arr1);  // ['H', 'e', 'l', 'l', 'o']

const arr2 = Array.from({ length: 2, 0: 'a', 1: 'b' });
console.log(arr2);  // ['a', 'b']
```

Array.from을 사용하면 <strong>두번째 인수</strong>로 전달한 함수를 통해 값을 만들면서 요소를 채울 수 있다. 두번째 인수로 전달한 함수는 첫번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달받아 새로운 요소를 생성할 수 있다.

```js
let arr = Array.from({ length: 5 }, function (_, i) { return i; });
console.log(arr); // [ 0, 1, 2, 3, 4 ]

arr = Array.from([1, 2, 3], (_, i) => i);
console.log(arr); // [ 0, 1, 2, 3, 4 ]
```

> 유사배열 객체와 이터러블 객체
>
> 유사배열 객체(array-like object)는 마치 배열처럼 인덱스로 프로퍼티 값에 접근할 수 있으며 length 프로퍼티를 갖는 객체를 말한다. 유사배열 객체는 for문으로 순회할 수 있다.
>
> 이터러블 객체(iterable object)는 Symbol.iterator 메소드를 구현하여 for...of 문으로 순회할 수 있으며 스프레드 문법의 대상으로 사용할 수 있는 객체를 말한다. ES6에서 제공하는 빌트인 이터러블은 Array, String, Map, Set, DOM 컬렉션(NodeList, HTMLCollection), Arguments 등이 있다.

 <br>

## 배열 요소의 참조

배열 요소를 참조할 때에는 대괄호 표기법을 사용한다. 대괄호 안에는 인덱스가 와야하며, 정수로 평가되는 표현식이라면 인덱스로 사용할 수 있다. 인덱스는 값을 참조할 수 있다는 의미에서 <strong>객체의 프로퍼티 키와 같은 역할</strong>을 한다.

```js
const arr= [1, 2];

console.log(arr[0]);  // 1
console.log(arr[1]);  // 2
```

존재하지 않는 요소에 접근하면 undefined가 반환된다.

```js
const arr= [1, 2];

console.log(arr[2]);  // undefined
```

배열은 사실 **인덱스**를 **프로퍼티키**로 갖는 객체이다. 따라서 존재하지 않는 프로퍼티 키로 객체의 프로퍼티에 접근했을 때 undefined를 반환하는 것처럼 배열도 존재하지 않는 요소를 참조하면 undefined가 반환된다.

```js
// 희소 배열
const arr = [1, , 3];

// 배열 arr에는 인덱스가 1인 요소가 존재하지 않는다.
console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': { value: 1, writable: true, enumerable: true, configurable: true },
  '2': { value: 3, writable: true, enumerable: true, configurable: true },
  length: { value: 3, writable: true, enumerable: false, configurable: false }
*/

// 존재하지 않는 요소를 참조하면 undefined가 반환된다.
console.log(arr[1]); // undefined
console.log(arr[3]); // undefined
```

<br>

## 배열요소의 추가와 갱신

객체에 프로퍼티를 동적으로 추가할 수 있는 것처럼 배열에도 요소를 동적으로 추가할 수 있다. 요소가 존재하지 않는 인덱스의 배열요소에 값을 할당하면 새로운 요소가 추가된다.

이 때 length의 프로퍼티 값은 자동 갱신된다.

```js
const arr = [0];

// 배열 요소의 추가
arr[1] = 1;

console.log(arr); // [0, 1]
console.log(arr.length); // 2
```

만약 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.

```js
// 현재 배열의 length 프로퍼티 값보다 큰 인덱스로 새로운 요소를 추가하면 희소 배열이 된다.
arr[100] = 100;

console.log(arr); // [0, 1, empty × 98, 100]
console.log(arr.length); // 101

console.log(Object.getOwnPropertyDescriptors(arr));
/*
{
  '0': { value: 0, writable: true, enumerable: true, configurable: true },
  '1': { value: 1, writable: true, enumerable: true, configurable: true },
  '100': { value: 100, writable: true, enumerable: true, configurable: true },
  length: { value: 101, writable: true, enumerable: false, configurable: false }
*/
```

이미 요소가 존재하는 요소에 값을 재할당하면 요소값이 갱신된다.

```js
arr[1] = 10;

console.log(arr); // [0, 10, empty × 98, 100]
```

**인덱스**는 요소의 위치를 나타내므로 반드시 <strong>0 이상의 정수 또는 정수형태의 문자열</strong>을 사용하여야 한다. 만약 정수 이외의 값을 인덱스처럼 사용하면 요소가 생성되는 것이 아니라 **프로퍼티**가 생성된다. 이 때 추가된 프로퍼티는 length 프로퍼티 값에 영향을 주지 않는다.

```js
const arr = [];

// 배열 요소의 추가
arr[0] = 1;
arr['1'] = 2;

// 프로퍼티 추가
arr['foo'] = 3;
arr[1.1] = 4;
arr[-1] = 5;

console.log(arr); [1, 2, foo: 3, 1.1: 4, -1: 5]
```

<br>

## 배열요소의 삭제

배열 또한 객체이기 때문에 배열의 특정요소를 삭제하기 위해 `delete` 연산자를 사용할 수 있다.

```js
const arr= [1, 2, 3];

delete arr[1];
console.log(arr); // [ 1, <1 empty item>, 3 ]

console.log(arr.length) // 3
```

delete 연산자는 객체의 프로퍼티를 삭제한다. 따라서 위 예제의 delete arr[1]은 arr에서 프로퍼티 키가 ‘1’인 프로퍼티를 삭제한다. 이때 배열은 희소 배열이 되며 length 프로퍼티 값은 변하지 않는다. <strong>따라서 희소 배열을 만드는 delete 연산자는 사용하지 않는 것이 좋다.</strong>

희소배열을 만들지 않으면서 배열의 특정요소를 완전히 삭제하려면 `Array.prototype.splice` 메소드를 사용한다.

- Array.prototpye.splice 사용법

```js
// Array.prototype.splice(삭제를 시작할 인덱스, 삭제할 요소수)
```

```js
const arr = [1, 2, 3, 4, 5];

console.log(arr)          // 5

arr.splice(1, 1);

console.log(arr);         // [ 1, 3, 4, 5 ]
console.log(arr.length);  // 4
```

<br>

## 배열 메소드

배열의 프로토타입인 `Array.prototype`은 배열을 다룰 때 필요한 메소드를 제공한다.

배열 메소드는 결과물을 반환하는 패턴이 2가지이므로 주의가 필요하다.

- **원본배열**(배열 메소드를 호출한 배열, 즉 배열 메소드의 구현체 내부에서 this가 가리키는 객체)을 <strong>직접 변경</strong>하는 메소드(mutator method). 부수효과  O
- 원본배열을 직접 변경하지 않고 <strong>새로운 배열을 생성</strong>하여 반환하는 메소드(accessor method). 부수효과 X

```js
const arr = [1];

// 원본배열 직접 변경.
arr.push(2);
console.log(arr);      // [1, 2]

// 새로운 배열을 생성.
const result = arr.concat(3);
console.log(arr);      // [1, 2]
console.log(result);   // [1, 2, 3]
```

ES5부터 도입된 배열 메소드는 대부분 원본배열을 직접 변경하지 않지만, 초창기 배열 메소드는 원본배열을 직접 변경하는 경우가 많다. 원본 배열을 직접 변경하는 메소드는 외부상태를 직접 변경하는 **부수효과**가 있으므로 사용에 주의해야 한다. 따라서 가급적 원본배열을 직접 변경하지 않는 메소드를 사용하는 것이 좋다.

<br>

### Array.isArray

`Array.isArray`는 Array 생성자 함수의 **정적메소드**이다. 앞서 살펴보았던 `Array.of` / `Array.from` 또한 Array 생성자 함수의 정적 메소드이다.

Array.isArray는 주어진 인수가 배열이면 true, 배열이 아니면 false를 반환한다.

```js
Array.isArray([]); // true
Array.isArray([1, 2]); // true
Array.isArray(new Array()); // true

Array.isArray(); // false
Array.isArray({}); // false
Array.isArray(null); // false
Array.isArray(undefined);; // false
Array.isArray(1); // false
Array.isArray('Array'); // false
Array.isArray(true); // false
Array.isArray(false); // false
Array.isArray({ 0: 1, length: 1 }) // false
```

<br>

### Array.prototype.indexOf

`indexOf` 메소드는 **원본배열에서** 인수로 전달된 요소를 **검색**하여 <strong>인덱스를 반환</strong>한다.

- 사용법

```js
// Array.prototype.indexOf(검색할 요소 값 , [검색을 시작할 인덱스])
```

두번째 인수는 옵션이며 생략할 경우, 배열의 0번째 인덱스부터 검색을 시작한다.

- 중복되는 요소가 있는 경우 => **첫번째** 인덱스를 반환한다.
- 해당하는 요소가 없는 경우 => **-1**을 반환한다.

```js
const arr = [1, 2, 2, 3];

arr.indexOf(2);  // 1
arr.indexOf(4);  // -1
arr.indexOf(2, 2)  // 2
```

indexOf 메소드는 배열에 특정요소가 **존재하는지** 확인할 때 유용하다.

```js
const foods = ['apple', 'banana', 'orange'];

if (foods.indexOf('pineapple') === -1) {
  foods.push('pineapple');
}

console.log(foods); // [ 'apple', 'banana', 'orange', '  pineapple' ]
```

indexOf 메소드 대신 ES7에서 새롭게 도입된 `Array.prototype.includes` 메소드를 사용하면 보다 가독성이 좋다.

- 사용법

```js
// Array.prototype.includes(검색할 요소 값)
```

- 원본배열에 인수로 전달한 요소가 존재하면 => true,
- 원본배열에 인수로 전달한 요소가 존재하지 않으면 => false 를 반환한다.

```js
const foods = ['apple', 'banana', 'orange'];

if (!foods.includes('pineapple')) {
  foods.push('pineapple');
}

console.log(foods);  // [ 'apple', 'banana', 'orange', '  pineapple' ]
```

<br>

### Array.prototype.push

push 메소드는 인수로 전달받은 모든 값을 원본 배열의 **마지막**요소로 **추가**하고 변경된 <strong>length값을 반환</strong>한다. <strong>push 메소드는 원본 배열을 직접 변경한다.</strong>

- 사용법

```js
// Array.prototype.push(원본배열의 마지막요소에 추가하고 싶은 값...)
```



```js
const arr = [1, 2];

const result = arr.push(3, 4);

console.log(result);  // 4

console.log(arr);     // [1, 2, 3, 4]
```

push메소드는 성능면에서 좋지 않다. push 메소드는 배열의 마지막에 요소를 추가하므로 length 프로퍼티를 사용하여 직접 요소를 추가할 수도 있다. 이 방법이 push 메소드로 추가하는 것보다 빠르다.

```js
const arr = [1, 2];

arr[arr.length] = 3;

console.log(arr);  // [1, 2, 3]
```

push 메소드는 원본배열을 직접변경하는 **부수효과**가 있다. 따라서 push 메소드 보다는 ES6의 스프레드 문법을 사용하는 편이 좋다.

```JS
const arr = [1, 2];

// ES6 스프레드 문법
const newArr = [...arr, 3];

console.log(newArr); // [1, 2, 3]
console.log(arr); // [1, 2] 부수효과가 없음.
```

<br>

### Array.prototype.pop

pop 메소드는 원본배열에서 **마지막**요소를 **제거**하고 <strong>제거한 요소를 반환</strong>한다. 원본배열이 빈 배열이면 undefined를 반환한다.

- 사용법

```js
// Array.prototype.pop()
```

`Array.prototype.pop` 은 인수를 전달하지 않는다. 해당 메소드를 호출하는 순간 마지막 요소를 제거한다.

```js
const arr = [1, 2];

let result = arr.pop();
console.log(result); // 2

console.log(arr); // [1]
```

pop 메소드와 push 메소드를 사용하면 **스택**을 쉽게 구현할 수 있다.

스택(stack)은 데이터를 마지막에 밀어넣고, 마지막에 밀어넣은 데이터를 먼저 꺼내는 후입선출(Last In First Out / LIFO) 방식의 **자료구조**이다. 스택은 언제나 가장 마지막에 밀어넣은 최신데이터를 취득한다. 스택에 데이터를 밀어넣는 것을 push라 하고 스택에서 데이터를 꺼내는 것을 pop이라고 한다.

![image](https://user-images.githubusercontent.com/62285872/82120480-6825a000-97c1-11ea-8044-e15f87cc97b6.png)	

- 생성자 함수로 구현한 스택

```js
const Stack = (function () {
  function Stack(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an array.`);
    }
    this.array = array;
  }

  Stack.prototype = {
    constructor: Stack,

    push(value) {
      return this.array.push(value);
    },

    pop() {
      return this.array.pop();
    }
  };

  return Stack;
}());

const stack = new Stack([1, 2]);

console.log(stack); // Stack {array: [1, 2]}

stack.push(4);
console.log(stack); // Stack {array: [1, 2, 3]}

stack.pop();
console.log(stack); // Stack {array: [1, 2]}
```

- 클래스로 구현한 스택

```js
class Stack {
  constructor(array = []) {
    if (!Array.isArray(array)) {
      throw new TypeError(`${array} is not an anrray.`);
    }
    this.array = array;
  }

  push(value) {
    return this.array.push(value);
  }

  pop() {
    return this.array.pop();
  }
}

const stack = new Stack([1, 3]);

console.log(stack); // { array: [ 1, 3 ] }

stack.push(5);
console.log(stack); // { array: [ 1, 3, 5 ] }

stack.pop();
console.log(stack); // { array: [ 1, 3 ] }
```

<br>

### Array.prototype.unshift

unshift 메소드는 인수로 전달받은 모든 값을 원본배열의 **선두**에 요소로 **추가**하고 <strong>변경된 length값을 반환</strong>한다. unshift 메소드는 `push`, `pop`과 마찬가지로 원본배열을 **직접변경**한다.

- 사용법

```js
// Array.prototype.unshift(원본배열의 선두에 추가하고 싶은 값..)
```



```js
const arr = [1, 2];

let result = arr.unshift(3, 4);

console.log(result);   // 4

console.log(arr);      // [3, 4, 1, 2]
```

unshift 메소드는 원본배열을 직접변경하는 **부수효과**가 있다. 따라서 unshift 메소드보다는 ES6의 스프레드 문법을 사용하는 편이 좋다.

```JS
const arr = [1, 2];

const newArr = [3, ...arr];

console.log(newArr);  // [3, 1, 2]
console.log(arr);  // [1, 2]
```

<br>

### Array.prototype.shift

shift 메소드는 원본배열에서 **첫번째** 요소를 **제거**하고 <strong>제거한 요소를 반환</strong>한다. 원본배열이 빈 배열이면 undefined를 반환한다.

- 사용법

```js
// Array.prototype.shift(원본배열의 선두에서 제거하고 싶은 요소 값..)
```



```js
const arr = [1, 2];

const result = arr.shift();

console.log(result);  // 1

console.log(arr);   // [2]
```

shift 메소드와 push 메소드를 사용하면 **큐** 를 쉽게 구현할 수 있다.

큐(queue)는 데이터를 마지막에 밀어넣고 처음 데이터, 즉 가장 먼저 밀어넣은 데이터를 먼저 꺼내는 선입선출(First In First Out / FIFO)방식의 자료구조이다. 스택은 언제나 마지막에 밀어넣은 최신 데이터를 취득하지만, 큐는 언제나 데이터를 밀어넣은 순서대로 취득한다.

![image](https://user-images.githubusercontent.com/62285872/82120499-82f81480-97c1-11ea-837a-55287b95f0a4.png)

- 생성자 함수로 구현한 큐

```JS
const Queue = (function () {
    function Queue (array = []) {
    	if(!Array.isArray(array)) {
            throw new TypeError(`${array} is not an array.`);
        }
        this.array = array;
    }
    
    Queue.prototype = {
        constructor : Queue,
        
        enqueue(value) {
            return this.array.push(value);
        },
        
        dequeue() {
            return this.array.shift();
        }
    }
    return Queue;
}());

const queue = new Queue([1, 2]);

console.log(queue); // Queue { array: [ 1, 2 ] }

queue.enqueue(4);
console.log(queue); // Queue { array: [ 1, 2, 4 ] }

queue.dequeue();
console.log(queue); // Queue { array: [ 1, 2 ] }
```

- 클래스로 구현한 큐

```js
class Queue {
    constructor(array = []) {
        if(!Array.isArray(array)) {
            throw new TypeError(`${array} is not an array.`)
        }
        this.array = array;
    }
    
    enqueue(value) {
        return this.array.push(value);
    }
    
    dequeue() {
        return this.array.shift();
    }
}

const queue = new Queue([1, 2]);

console.log(queue); // Queue {array: [1, 2]}

queue.enqueue(3);
console.log(queue); // Queue {array: [1, 2, 3]}

queue.dequeue();
console.log(queue); // Queue {array: [2, 3]}
```

<br>

### Array.prototype.concat

concat 메소드는 인수로 전달된 값(배열 또는 값)을 원본배열의 **마지막** 요소로 **추가**한 <strong>새로운 배열을 반환</strong>한다. 인수로 전달한 값이 배열인 경우, 배열을 해체하여 새로운 배열의 요소로 추가한다. <strong>원본배열은 변경되지 않는다.</strong>

- 사용법

```js
// Array.prototype.concat(원본배열의 마지막 요소로 추가하고 싶은 값)
```



```js
const arr1 = [1, 2];
const arr2 = [3, 4];

let result = arr1.concat(arr2);
console.log(result);   // [ 1, 2, 3, 4 ]

result = arr1.concat(5);
console.log(result);   // [ 1, 2, 5 ]

result = arr1.concat(arr2, 5);
console.log(result);   // [ 1, 2, 3, 4, 5 ]

console.log(arr1);     // [ 1, 2 ]
console.log(arr2);     // [ 3, 4 ]
```

push와 unshift 메소드는 concat 메소드로 대체할 수 있다. push와 unshift 메소드는 concat 메소드와 유사하게 동작하지만 미묘한 차이가 있다.

- push와 unshift 메소드는 원본배열을 <strong>직접 변경</strong>하지만 concat 메소드는 원본배열을 <strong>변경하지 않고 새로운 배열을 반환</strong>한다. 따라서 push와 unshift 메소드를 사용할 경우, 원본 배열을 반드시 변수에 할당해야 하며 concat 메소드를 사용할 경우, 반환 값을 반드시 변수에 할당받아야 한다.

```js
// unshift, push
const arr1 = [3, 4];

arr1.unshift(1, 2);
console.log(arr1);  // [1, 2, 3, 4]

arr1.push(5, 6);
console.log(arr1);  // [1, 2, 3, 4, 5, 6]

// concat
const arr2 = [3, 4];

let result = [1, 2].concat(arr2);
console.log(result);  // [1, 2, 3, 4]

result = result.concat(5, 6);
console.log(result);  // [1, 2, 3, 4, 5, 6]
```

- 인수로 전달받은 값이 배열인 경우, push와 unshift 메소드는 배열을 그대로 원본배열의 마지막 / 첫번째 요소로 추가하지만 <strong>concat 메소드는 인수로 전달받은 <em>배열</em>을 '해체'하여 새로운 배열의 마지막 요소로 추가한다. </strong> 객체의 경우는 그대로 전달한다.

```js
const arr = [3, 4];

arr.unshift([1, 2]);
console.log(arr);   // [ [ 1, 2 ], 3, 4 ]

arr.push([5, 6]);
console.log(arr);   // [ [ 1, 2 ], 3, 4, [ 5, 6 ] ]

let result = [1, 2].concat([3, 4]);
console.log(result);  // [ 1, 2, 3, 4 ]

result = result.concat([5, 6]);
console.log(result);  // [ 1, 2, 3, 4, 5, 6 ]
```

>  concat 메소드는 ES6의 스프레드 문법으로 대체할 수 있다.

```JS
// concat
let result = [1, 2].concat([3, 4]);
console.log(result);  // [1, 2, 3, 4]

// 스프레드 문법
result = [...[1, 2], ...[3, 4]];
console.log(result);  // [1, 2, 3, 4]
```

<br>

### Array.prototype.splice

push / pop / unshift / shift 메소드는 모두 원본배열을 **직접변경**하는 메소드(mutator method)이며 원본배열의 처음이나 마지막에 요소를 추가하거나 제거한다.

원본배열의 **중간**의 요소를 추가하거나 제거하는 경우에는 `splice` 메소드를 사용한다. splice 메소드는 3개의 매개변수가 있으며 원본배열을 **직접변경**한다.

- 사용법

```js
// Array.prototype.splice(start[, deletCount[, items]])
```



- start

  원본배열의 요소를 제거하기 **시작할** **인덱스**이다. start만을 지정하면 원본배열의 start 부터 **모든요소**를 제거한다.

  start가 음수인 경우, 배열의 끝에서의 인덱스를 나타낸다. 만약 start가 -1이면 마지막 요소를 가리키고 -n이면 마지막에서 n번째 요소를 가리킨다.

- [deleteCount] (옵션)

  원본배열의 요소를 **제거**하기 **시작할** **인덱스**인 start부터 제거할 요소의 **개수**이다. deleteCount가 0인 경우, 아무런 요소도 제거되지 않는다.

- [items] (옵션) 

  제거한 위치에 삽입될 요소들의 목록이다. 생략할 경우 원본배열에서 지정된 요소들을 제거만 한다.

```js
const arr = [1, 2, 3, 4];

const result = arr.splice(1, 2, 20, 30);

console.(result); // [2, 3]

console.log(arr); // [1, 20, 30, 4]
```

splice 메소드에 3개의 인수를 빠짐없이 전달하면 첫번쨰 인수, 즉 시작 인덱스부터 두번째 인수, 즉 제거할 요소의 개수만큼 원본배열에서 요소를 제거한다. 그리고 세번쨰 인수, 즉 제거한 위치에 삽입할 요소들을 삽입한다.

splice 메소드의 두번째 인수, 즉 <strong>제거할 요소의 개수를 0</strong>으로 지정하면 아무런 요소도 제거하지 않고 새로운 요소들을 삽입한다.

```js
const arr = [1, 2, 3, 4];

const result = arr.splice(1, 0, 100);

console.log(result); // []
console.log(arr); // [1, 100, 2, 3, 4];
```

splice 메소드의 세번째 인수, 즉 제거한 위치에 추가할 요소들의 목록을 전달하지 않으면 원본 배열에서 지정된 요소만을 제거한다.

```js
const arr = [1, 2, 3, 4];

const result = arr.splice(1, 2);

console.log(result); // [2, 3]
console.log(arr); // [1, 4]
```

splice 메소드의 두번째 인수, 즉 제거할 요소의 개수를 **생략**하면 첫번째 인수로 전달된 시작 인덱스부터 <strong>모든 요소를 제거한다.</strong>

```js
const arr = [1, 2, 3, 4];

const result = arr.splice(1);

console.log(arr); // [1]
console.log(result); // [2, 3, 4]
```

배열에서 특정 요소를 제거하려면 `indexOf` 메소드를 통해 특정 요소의 위치를 취득한 다음 splice 메소드를 사용할 수 있다.

```js
const arr = [1, 2, 3, 1, 2];

function remove(array, v) {
    const index = array.indexOf(v);
    
    if(index !== -1) apply.splice(index,1);
    
    return array;
}

console.log(remove(arr, 2));   // [1, 3, 1, 2] 
console.log(remove(arr, 10));  // [1, 3, 1, 2] (위 결과에 의한 부수효과적용)
```

`filter` 메소드를 사용하여 특정요소를 제거할 수도 있다. 하지만 특정요소가 **중복**된 경우, <strong>모두 제거된다.</strong>

```js
const arr = [1, 2, 3, 1, 2];

function remove(array, item) {
    return array.filter(v => v !== item);
}

console.log(remove(arr, 2))
```

<br>

### Array.prototype.slice

slice 메소드는 인수로 전달된 범위의 요소들을 **복사**하여 반환한다. <strong>원본배열은 변경되지 않는다.</strong> 이름이 유사한 splice 메소드는 원본배열을 변경하므로 주의하기 바란다.

slice 메소드는 2개의 매개변수를 갖는다.

- 사용법

```js
// Array.prototype.slice(star[, end])
```



- start

  복사를 **시작할** **인덱스**이다. 음수인 경우, 배열의 끝에서의 인덱스를 나타낸다. 예를들어 slice(-2)는 배열의 마지막 2개의 요소를 반환한다.

- [end] (옵션)

  복사를 **종료**할 인덱스이다. 이 인덱스에 해당하는 요소는 복사되지 않는다. 옵션이며 <strong>기본값은 length 값</strong>이다.

```js
const arr = [1, 2, 3];

let result = arr.slice(0, 1);
console.log(result); // [1]

result = arr.slice(1, 2);
console.log(result); // [2]

console.log(arr);    // [1, 2, 3]
```

slice 메소드는 첫번째 매개변수 start에 해당하는 인덱스를 갖는 요소부터 매개변수 end에 해당하는 인덱스를 가진 요소 이전(end 미포함)까지 요소들을 **복사**하여 반환한다.

slice 메소드의 두번째 인수를 생락하면 첫번째 인수에 해당하는 인덱스부터 <strong>모든 요소를 복사하여 반환</strong>한다.

```js
const arr = [1, 2, 3];

const result = arr.slice(1);
console.log(result);   // [2, 3]

let result1 = arr.slice(-1);
console.log(result1);  // [3]

result1 = arr.slice(-2);
console.log(result);   // [2, 3]
```

slice 메소드의 <strong>인수를 모두 생략하면</strong> 원본배열의 새로운 복사본을 생성하여 반환한다.

```js
const arr = [1, 2, 3]

const copy = arr.slice();
console.log(copy);  // [1, 2, 3]
console.log(copy === arr);   // false


const todos = [
    { id: 1, content: 'html', completed: false },
    { id: 2, content: 'CSS', completed: true },
    { id: 3, content: 'Javascript', completed: false }   
];

const _todos = todos.slice();

console.log(_todos === todos);   // false

// 참조값을 복사, 완전한 복사는 아님 => 얕은복사
console.log(_todos[0] === todos[0]); // true;
```

> 얕은복사와 깊은복사
>
> 객체를 프로퍼티 값으로 갖는 객체의 경우, 얕은 복사는 한단계까지만 복사하는 것을 말하고 깊은복사는 객체에 중첩되어 있는 객체까지 모두 복사하는 것을 말한다.
>
> 얕은복사와 깊은복사로 생성된 객체는 원본과는 다른 객체이다. 즉 원본과 복사본은 참조값이 다른 **별개**의 객체이다. 하지만 얕은복사는 객체에 중첩되어 있는 객체의 경우, **참조값**을 복사하고 깊은복사는 객체에 중첩되어 있는 객체까지 모두 복사하여 원시값처럼 완전한 복사본을 만든다는 차이가 있다.
>
> 스프레드 문법과 Object.assign 메소드는 원본을 얕은복사한다.

slice 메소드가 복사본을 생성하는 것을 이용하여 arguments, HTMLCollection, NodeList와 같은 <strong>유사배열 객체를 배열로 변환할 수 있다.</strong>

```js
function sum() {
    var arr = Array.prototype.slice.call(arguments);
    console.log(arr);
    
    return arr.reduce((acc, cur) => acc + cur , 0);
}

console.log(sum(1, 2, 3,));  // 6
```

ES6의 스프레드 문법을 사용하면 보다 간단하게 유사배열 객체를 배열로 변환할 수 있다.

```JS
function sum() {
    const arr = [...arguments];
	console.log(arr);  // [1, 2, 3]
    
    return arr.reduce((acc, cur) => acc + cur, 0);
}

console.log(sum(1, 2, 3,));  // 6
```

<br>

### Array.prototype.join

join 메소드는 원본배열의 모든 요소를 <strong>문자열로 변환</strong>한 후 인수로 전달받은 구분자(seperator)로 연결한 문자열을 반환한다. 기본 구분자는 `','` 이며 생략이 가능하다.

원본배열은 변경하지 않는다. 즉, 부수효과가 없다.

- 사용법

```js
// Array.prototoype.join([구분자]);
구분자는 생략이 가능하며, 생략할 시 기본값 ','
```



```js
const arr = [1, 2, 3, 4];

let result = arr.join();
console.log(result);  // '1,2,3,4'

result = arr.join('');
console.log(result);  // '1234'

result = arr.join(':')  // '1:2:3:4'
```

<br>

### Array.prototype.reverse

reverse 메소드는 원본배열의 <strong>요소 순서를 반대로 변경</strong>한다. 이 때 원본배열이 변경된다. 즉, **부수효과**가 있으며 반환값은 변경된 배열이다.

- 사용법

```js
// Array.prototype.reverse()
```



```js
const arr = [1, 2, 3];
const result = arr.reverse();

console.log(arr);  // [3, 2, 1]
console.log(result);  // [3, 2, 1]

console.log(arr === result)  // true
```

<br>

### Array.prototype.fill

ES6에서 새롭게 도입된 fill 메소드는 인수로 전달받은 값을 요소로 <strong>배열의 처음부터 끝까지 채운다.</strong> 이 때 원본배열이 변경된다. 즉, **부수효과** 가 있다.

- 사용법

```js
// array.fill(v [,채우기 시작할 인덱스[, 채우기를 멈출 인덱스]])

array 배열의 length 취득 후 해당 length를 갖지며 모든 요소값을 v로 갖는 배열을 반환.
```



```js
const arr = [1, 2, 3];

arr.fill(0);
console.log(arr); // [0 ,0, 0]
```

두번째 인수로 <strong>채우기 시작할 인덱스</strong>를 전달할 수 있다. 옵션이다.

```js
const arr = [1, 2, 3];

arr.fill(0, 1);
console.log(arr);  // [1, 0, 0]
```

세번째 인수로 채우기를 멈출 인덱스를 전달할 수 있다. 해당 인덱스는 요소 채우기에 포함되지 않는다. 옵션이다.

```js
const arr = [1, 2, 3, 4, 5];

arr.fill(0, 1, 3);
console.log(arr);   // [1, 0, 0, 4, 5]
```

fill 메소드를 사용하면 배열을 생성하면서 특정 값으로 요소를 채울 수 있다.

```js
const arr = new Array(3);
console.log(arr);   // [ <3 empty items> ]

const result = arr.fill(1);
console.log(result); // [1, 1, 1]
console.log(arr); // [1, 1, 1]

console.log(result === arr) // true
```

fill 메소드로 요소를 채울 경우, 모든 요소를 하나의 값만으로 채울 수 밖에 없다는 단점이 있다. `Array.from` 정적메소드를 사용하면 두번째 인수로 전달한 함수를 통해 값을 만들면서 요소를 채울 수 있다. 두번째 인수로 전달한 함수는 첫번째 인수에 의해 생성된 배열의 요소값과 인덱스를 순차적으로 전달받아 새로운 요소를 생성할 수 있다.

```js
function generateSequences(length = 0) {
    return Array.from(new Array(length), (_, i) => i);
}

console.log(generateSequences(3));  // [0, 1, 2]
```

<br>

### Array.prototype.includes

ES7에서 새롭게 도입된 includes 메소드는 배열 내에 특정 요소가 포함되어 있는지 확인하여 true 또는 false를 반환한다. 첫번째 인수로 검색할 대상을 지정한다.

- 사용법

```js
// Array.prototype.includes(검색할 요소 값[, 검색을 시작할 인덱스])
```



```js
csont arr = [1, 2, 3];

let result = arr.includes(2);
console.log(result);  // true

result = arr.includes(100);
console.log(result);  // false
```

두번째 인수로 검색을 시작할 인덱스를 전달할 수 있다. 생략할 경우 기본값 0이 설정된다. 만약 음수를 전달하면 length와 음수인덱스를 합산하여 검색 시작 인덱스를 설정한다.

```js
const arr = [1, 2, 3];

result = arr.includes(1, 1);
console.log(result);  // false

// 3 -1 = 2번째 index 부터 탐색 시작.
result = arr.includes(3, -1); 
console.log(result);  // true
```

배열에서 인수로 전달된 요소를 검색하여 인덱스를 반환하는 `indexOf` 메소드를 사용하여도 배열내에 특정요소가 포함되어 있는지 확인할 수 있다. 하지만 **indexOf** 메소드는 결과값 -1을 비교해 보아야하고 <strong>배열에 NaN이 포함되어 있는 확인할 수 없는 문제가 있다.</strong>

```JS
console.log([NaN].indexOf(NaN) !== -1); // false
console.log([NaN].includes(NaN));   // true
```

### Array.prototype.flat

ES10에서 새롭게 도입된 flat 메소드는 인수로 전달한 깊이만큼 재귀적으로 배열을 평탄화한다?

- 사용법

```js
// Array.prototype.flat([평탄화할 깊이])
평탄화할 깊이를 생략할 경우 기본값은 1 이다.
```



```js
console.log([1, [2, 3, 4, 5]].flat());   // [1, 2, 3, 4, 5]
```

인수로 중첩배열을 평탄화할 깊이를 전달할 수 있다. 생략할 경우 기본값은 1이다. Infinity를 전달하면 중첩 배열 모두를 평탄화 한다.

```js
console.log([1, [2, [3, [4]]]]).flat();   // [1, 2, [3, [4]]]
console.log([1, [2, [3, [4]]]]).flat(1);  // [1, 2, [3, [4]]]

console.log([1, [2, [3, [4]]]]).flat(2);  // [1, 2, 3, [4]]
console.log([1, [2, [3, [4]]]]).flat().flat()); // [1, 2, 3, [4]]
console.log([1, [2, [3, [4]]]]).flat(Infinity)); // [1, 2, 3, 4]
```

<br>

## 배열 고차함수

<strong>고차함수는 함수를 인자로 전달받거나 함수를 반환하는 함수를 말한다.</strong> 자바스크립트의 함수는 **일급객체**이므로 값처럼 인자로 전달할 수 있으며 반환할 수도 있다. 고차함수는 외부 상태변경이나 가변데이터를 피하고 **불변성**(Immutability)을 지향하는 <strong>함수형 프로그래밍</strong>에 기반을 두고 있다.

> 함수형 프로그래밍?
>
> 함수형 프로그래밍은 순수함수와 보조함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태변경을 피하려는 프로그래밍 패러다임이다. 조건문이나 반복문은 로직의 흐름을 이해하기 어렵게하여 가독성을 해치고, 변수의 값은 누군가에 의해 언제든지 변경될 수 있어 오류 발생의 근본적 원이이 될 수 있기 때문이다. 함수형 프로그래밍은 결국 순수함수를 통해 <strong>부수효과를 최대한 억제</strong>하여 오류를 피하고 프로그램의 안정성을 높이려는 노력의 한 방법이라고 할 수 있다.

<br>

### Array.prototype.sort

sort메소드는 배열의 요소를 **정렬**한다. 원본배열을 **직접변경**하며 정렬된 배열을 반환한다. sort 메소드는 기본적으로 **오름차순**으로 요소를 정렬한다.

- 사용법

```js
// Array.prototype.sort()
```



```js
// 영문
const fruits = ['Banana', 'Orange', 'Apple'];

fruits.sort();

console.log(fruits); // ['Apple', 'Banana', 'Orange']

// 한글
const fruits = ['바나나', '오렌지', '사과'];

fruits.sort();

console.log(fruits); // ['바나나', '사과', '오렌지']
```

sort 메소드는 기본적으로 오름차순으로 요소를 정렬한다 . 따라서 내림차순으로 요소를 정렬하려면 먼저 sort메소드로 정렬한 후, `reverse` 메소드로 요소의 순서를 뒤집을 수 있다.

```js
const fruits = ['Banana', 'Orange', 'Apple'];

fruits.sort();
fruits.reverse();

console.log(fruits); // ['Orange', 'Banana', 'Apple']
```

문자열 요소들로 이루어진 배열의 정렬은 아무런 문제가 없다. 하지만 **숫자** 요소들로 이루어진 배열을 정렬할 때는 주의가 필요하다.

```js
const points = [40, 100, 1, 5, 2, 25, 10];

// 숫자의 가장 앞자리만 비교됨.
point.sort();

console.log(points); // [1, 10, 100, 2, 25, 40, 5]
```

sort 메소드의 기본정렬순서는 문자열 Unicode 코드 포인트순서에 따른다. <strong>배열의 요소가 숫자타입이라 할지라도 배열의 요소를 일시적으로 문자열로 변환한 후, 정렬한다.</strong>

예를 들어, 문자열 ‘1’의 Unicode 코드 포인트는 U+0031, 문자열 ‘2’의 Unicode 코드 포인트는 U+0032이다. 따라서 문자열 ‘1’의 Unicode 코드 포인트 순서가 문자열 ‘2’의 Unicode 코드 포인트 순서보다 앞서므로 1과 2를 sort 메소드로 정렬하면 1이 2보다 앞으로 정렬된다. 하지만 문자열 ‘10’의 Unicode 코드 포인트는 U+0031U+0030이므로 2와 10를 sort 메소드로 정렬하면 10이 2보다 앞으로 정렬된다.

따라서 숫자 요소를 정렬하기 위해서는 sort 메소드에 **정렬 순서를 정의하는 비교 함수를 인수로 전달**한다. 비교 함수를 생략하면 배열의 각 요소는 일시적으로 문자열로 변환되어 Unicode 코드 포인트 순서에 따라 정렬된다.

```js
const points = [40, 100, 1, 5, 2, 25, 10];

// 비교 함수의 반환값이 0보다 작은 경우, a를 우선하여 정렬한다
points.sort((a, b) => a - b);
console.log(points); // [1, 2, 5, 10, 25, 40, 100]

// 비교 함수의 반환값이 0보다 큰 경우, b를 우선하여 정렬한다.
points.sort((a, b) => b - a);
console.log(points); // [100, 40, 25, 10, 5, 2, 1]
```

객체를 요소로 갖는 배열을 정렬하는 예제는 아래와 같다.

```js
const todos = [
  { id: 4, content: 'JavaScript' },
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' }
];

function compare(key) {
    return (a,b => a[key] > b[key] ? 1 : (a[key] < b[key] ? -1 : 0));
}

todos.sort(compare('id'));
console.log(todos);

/*
[
  { id: 1, content: 'HTML' },
  { id: 2, content: 'CSS' },
  { id: 4, content: 'JavaScript' }
]
*/

todos.sort(compare('content'));
console.log(todos);
/*
[
  { id: 2, content: 'CSS' },
  { id: 1, content: 'HTML' },
  { id: 4, content: 'JavaScript' }
]
*/
```

<br>

### Array.prototype.forEach

앞서 살펴본 바와 같이 함수형 프로그래밍은 순수 함수(Pure function)와 보조 함수의 조합을 통해 로직 내에 존재하는 조건문과 반복문을 제거하여 복잡성을 해결하고 변수의 사용을 억제하여 상태 변경을 피하려는 프로그래밍 패러다임이다.

조건문이나 반복문은 로직의 흐름을 이해하기 어렵게 한다. 특히 for 문은 반복을 위한 변수를 선언해야 하며 증감식과 조건식으로 이루어져 있어서 함수형 프로그래밍이 추구하는 바와 맞지 않는다.

`forEach` 메소드는 for 문을 대체할 수 있는 메소드이다. <strong>배열을 순회하며 배열의 각 요소에 대하여 인수로 전달된 콜백함수를 실행한다.</strong>

- 사용법

```js
// arr.forEach(callback(currentvalue[, index[, array]])[, thisArg])
currnetValue : arr의 요소
index : arr의 인덱스
array : forEach()를 호출한 배열
thisArg : callback을 실행할 때 this로 사용할 값.
```



```js
const numbers = [1, 2, 3];
let pows = [];

fot(let i = 0; i < numbers.length; i++) {
    pows.push(numbers[i] ** 2);
}

console.log(pows);   // [1, 4, 9]

pows = []

numbers.forEach(item => pows.push(item ** 2));

console.log(pows);   // [1, 4, 9]
```

forEach 메소드의 콜백함수는 요소값, 인덱스, forEach 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.

```js
[1, 2, 3].forEach((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${arr}`);
});

/*
요소값: 1, 인덱스: 0, this: 1,2,3
요소값: 2, 인덱스: 1, this: 1,2,3
요소값: 3, 인덱스: 2, this: 1,2,3
*/

```

forEach 메소드는 원본배열을 변경하지 않는다. 하지만 콜백함수가 원본배열을 변경할 수는 있다?

```js
const numbers = [1, 2, 3];

numbers.forEach((item, index, arr) => { arr[index] = item ** 2; });

console.log(numbers);  // [1, 4, 9]
```

foreEach 메소드의 반환값은 언제나 undefined이다.

```js
const result = [1, 2, 3].forEach(console.log);

console.log(result); // undefined
```

forEach 메소드에 두번째 인수로 forEach 메소드 내부에서 this로 사용될 객체를 전달할 수 있다.

```js
class Numbers {
    numberArray = [];

	multiply(arr) {
        arr.forEach(function (item) {
            this.numberArray.push(item * item);
        });
    }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); 
```

forEach 메소드의 콜백 함수는 일반 함수로 호출되므로 콜백 함수 내부의 this는 undefined 를 가리킨다. 클래스 내부의 코드는 암묵적으로 strict mode가 적용되기 때문이다. 콜백 함수 내부의 this와 multiply 메소드 내부의 this를 일치시키려면 forEach 메소드에 두번째 인수로 forEach 메소드 내부에서 this로 사용될 객체를 전달한다.

```js
class Numbers {
  numberArray = [];

  multiply(arr) {
    arr.forEach(function (item) {
      this.numberArray.push(item * item);
    }, this);
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]
```

보다 나은 방법은 ES6의 화살표 함수를 사용하는 것이다.

```JS
class Numbers {
  numberArray = [];

  multiply(arr) {
    arr.forEach(item => this.numberArray.push(item * item));
  }
}

const numbers = new Numbers();
numbers.multiply([1, 2, 3]);
console.log(numbers.numberArray); // [1, 4, 9]
```

forEach 메소드 동작을 이해하기 위해 forEach 메소드의 폴리필을 살펴보자

```js
// 만약 Array.prototype에 forEach 메소드가 존재하지 않으면 폴리필을 추가한다.
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function (callback, thisArg) {
    // 전달받은 첫번째 인수가 함수가 아니면 TypeError를 발생시킨다.
    if (typeof callback !== 'function') {
      throw new TypeError(callback + ' is not a function');
    }

    // this로 사용할 두번째 인수를 전달받지 못하면 this로 전역 객체를 사용한다.
    thisArg = thisArg || window;

    // for 문으로 배열을 순회하면서 콜백 함수를 호출한다.
    for (var i = 0; i < this.length; i++) {
      // call 메소드를 통해 두번째 인수로 전달받은 thisArg를 전달하면서 콜백 함수를 호출한다.
      // 이때 콜백 함수의 인수로 배열 요소, 인덱스, 배열 자신을 전달한다.
      callback.call(thisArg, this[i], i, this);
    }
  };
}
```

이처럼 forEach 메소드도 내부에서는 반복문(for 문)을 통해 배열을 순회할 수 밖에 없다. 단, 반복문을 메소드 내부로 은닉하여 로직의 흐름을 이해하기 쉽게 하고 복잡성을 해결한다.

forEach 메소드는 for 문과는 달리 <strong>break, continue 문을 사용할 수 없다.</strong> 다시 말해, 배열의 모든 요소를 빠짐없이 모두 순회하며 중간에 순회를 중단할 수 없다.

```js
// forEach 메소드는 for 문과는 달리 break 문을 사용할 수 없다.
[1, 2, 3].forEach(item => {
  console.log(item);
  if (item > 1) break; // SyntaxError: Illegal break statement
});

// forEach 메소드는 for 문과는 달리 continue 문을 사용할 수 없다.
[1, 2, 3].forEach(item => {
  console.log(item);
  if (item > 1) continue;
  // SyntaxError: Illegal continue statement: no surrounding iteration statement
});
```

희소 배열의 존재하지 않는 요소는 순회 대상에서 제외된다. 이는 앞으로 살펴볼 배열을 순회하는 map, filter, reduce 메소드 등에서도 마찬가지이다.

```js
// 희소 배열
const arr = [1, , 3];

// for 문으로 희소 배열을 순회
for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]); // 1, undefined, 3
}

// forEach 메소드는 희소 배열의 존재하지 않는 요소를 순회 대상에서 제외한다.
arr.forEach(v => console.log(v)); // 1, 3
```

forEach 메소드는 for 문에 비해 성능이 좋지는 않지만 가독성은 좋다. 따라서 요소가 대단히 많은 배열을 순회하거나 시간이 많이 걸리는 복잡한 코드에서 높은 성능이 필요한 경우가 아니라면 for 문 대신 forEach 메소드의 사용을 권장한다.

<br>

### Array.prototype.map

map 메소드는 배열을 순회하며 배열의 각 요소에 대하여 인수로 전달될 콜백함수를 실행한다. 그리고 콜백함수의 반환값들로 구성된 새로운 <strong>배열을 반환</strong>한다. <strong>이 때 원본배열은 변경되지 않는다.</strong>

- 사용법

```js
// arr.map(callback(currentvalue[, index[, array]])[, thisArg])
currnetValue : arr의 요소
index : arr의 인덱스
array : map()를 호출한 배열
thisArg : callback을 실행할 때 this로 사용할 값.
```



```js
const numbers = [1, 4, 9];

const roots = numbers.map(item => Math.sqrt(item));

console.log(roots);  // [1, 2, 3]

console.log(numbers);  // [1, 4, 9]
```

> Math.sqrt
>
> Math.sqrt()는 인수로 전달된 값의 제곱근을 반환하는 메소드이다.

forEach 메소드는 배열을 순회하며 요소 값을 참조하여 무언가를 하기위한 함수이며 <strong>map 메소드는 배열을 순회하며 요소 값을 다른값으로 맵핑하기 위한 함수</strong>이다. 따라서 map 메소드가 생성하여 반환하는 새로운 배열의 length는 map 메소드를 호출한 배열 즉, this의 length와 반드시 일치한다. 즉, 1 : 1 매핑한다.

forEach 메솓와 마찬가지로 map 메소드의 콜백함수는 요소값, 인덱스, map 메소드를 호출한 배열 즉 this를 전달받을 수 있다.

```js
[1, 2, 3].map((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${arr}`);
    console.log(this);
	return item;
});

/*
요소값: 1, 인덱스: 0, this: 1,2,3
요소값: 2, 인덱스: 1, this: 1,2,3
요소값: 3, 인덱스: 2, this: 1,2,3
*/
```

forEach 메소드와 마찬가지로 map 메소드에 두번째 인자로 map 메소드 내부에서 this로 사용될 객체를 전달할 수 있다.

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  prefixArray(arr) {
    return arr.map(function (item) {
      // 외부에서 this를 전달하지 않으면 this는 전역 객체를 가리킨다.
      return this.prefix + item;
    }, this); // map 메소드 내부에서 this로 사용될 객체를 전달
  }
}

const pre = new Prefixer('-webkit-');
const preArr = pre.prefixArray(['linear-gradient', 'border-radius']);
console.log(preArr);
// ['-webkit-linear-gradient', '-webkit-border-radius']
```

보다 나은 방법은 ES6의 화살표 함수를 사용하는 것이다.

```js
class Prefixer {
  constructor(prefix) {
    this.prefix = prefix;
  }

  prefixArray(arr) {
    // 화살표 함수 내부에서 this를 참조하면 상위 컨텍스트,
    // 즉 multiply 메소드의 this를 그대로 참조한다.
    return arr.map(item => this.prefix + item);
  }
}

const pre = new Prefixer('-webkit-');
const preArr = pre.prefixArray(['linear-gradient', 'border-radius']);
console.log(preArr);
// ['-webkit-linear-gradient', '-webkit-border-radius']
```

<br>

### Array.prototype.filter

filter 메소드는 배열을 순회하며 배열의 각 요소에 대하여 인수로 전달된 콜백함수를 실행한다. <strong>그리고 콜백함수의 실행 결과가 true인 배열요소의 값만을 추출한 새로운 배열을 반환한다.</strong>

- 사용법

```js
// arr.filter(callback(currentvalue[, index[, array]])[, thisArg])
currnetValue : arr의 요소
index : arr의 인덱스
array : filter()를 호출한 배열
thisArg : callback을 실행할 때 this로 사용할 값.
```



```js
const numbers = [1, 2, 3, 4, 5];

const odds = numbers.filter(item => item % 2 !== 0);

console.log(odds);  // [ 1, 3, 5 ]
```

filter 메소드는 배열에서 <strong>특정 요소만을 필터링 조건으로 추출하여 새로운 배열을 만들고 싶을 때</strong> 사용한다. 따라서 filter 메소드가 생성하여 반환하는 새로운 배열의 length는 filter 메소드를 호출한 배열, 즉 this의 length와 같거나 작다.

forEach, map 메소드와 마찬가지로 filter 메소드의 콜백함수는 요소값, 인덱스, filter 메소드를 호출한 배열을 전달받을 수 있다.

```js
[1, 2, 3].filter((item, index, arr) => {
    console.log(`요소값: ${item}, 인덱스: ${index}, this: ${arr}`);
    return item % 2 !== 0 ;
});
/*
요소값: 1, 인덱스: 0, this: 1,2,3
요소값: 2, 인덱스: 1, this: 1,2,3
요소값: 3, 인덱스: 2, this: 1,2,3
*/
```

forEach, map 메소드와 마찬가지로 filter 메소드에 두번째 인자로 filter 메소드 내부에서 this로 사용될 객체를 전달할 수 있다. 보다 나은 방법은 화살표 함수를 사용하는 것이다.

filter 메소드는 배열의 특정 요소를 **추출**하기 위해 사용할 수 있지만 배열의 특정 요소를 **제거**하기 위해 사용할 수도 있다.

```js
class Users {
    constructor() {
        this.users = [
            { id: 1, name: 'lee'},
            { id: 2, name: 'kim'}
        ];
    }
    
    findById(id) {
        return this.users.filter(user => user.id === id);
    }
    
    remove(id) {
        this.users = this.users.filter(user => user.id !== id);
    }
}

const users = new Users();

let user = users.findById(1);
console.log(user  // [ { id: 1, name: 'lee' } ]

users.remove(1);

user = users.findById;
console.log(user);  // []
```

<br>

### Array.prototype.reduce

reduce 메소드는 배열을 순회하며 콜백함수의 이전 반환값과 배열의 각 요소에 대하여 인수로 전달된 콜백함수를 실행하여 하나의 결과값을 반환한다. <strong>이 때 원본배열은 변경되지 않는다.</strong>

reduce 메소드는 첫번째 인수로 콜백함수, 두번째 인수로 초기값을 전달받는다. reduce 메소드의 콜백함수에는 4개의 인수, 초기값 또는 콜백함수의 이전 반환값, 요소값, 인덱스, reduce메소드를 호출한 배열 즉, this가 전달된다.

- 사용법

```js
// arr.reduce(callback[, initialValue])
callback 함수는 네가지 인수를 받는다.

1. accumulator : 콜백의 반환값을 누적한다. 콜백의 이전 반환값 또는 콜백의 첫번째 호출이면서 initialValue를 제공한 경우에는 해당 값임.
2. currentValue : 처리할 현재 요소
3. currentIndex : 처리할 현재 요소의 인덱스. initialValue를 제공한 경우 0, 아니면 1부터 시작한다.
4. array : reduce를 호출한 배열

initialValue : callback의 최초 호출에서 첫번째 인수에 제공하는 초기값. 만약 초기값을 제공하지 않으면 배열의 첫번째 요소를 사용한다.
```

```js
const sum = [1, 2, 3, 4].reduce((accumulator, currentValue, index, array) => accumulator + currentValue, 0);

console.log(sum);  // 10
```

첫번째 인수로 전달받은 콜백함수는 4개의 인수를 전달받아 배열의 length 만큼 총 4회 호출한다. 이 때 콜백함수로 전달되는 인수와 반환값은 아래와 같다.	

![image-20200517210055931](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200517210055931.png)

이처럼 reduce 메소드는 초기값과 첫번째 요소값을 콜백함수에게 인수로 전달하면서 호출하고 다음순회에는 콜백함수의 반환값과 두번째 요소값을 콜백함수의 인수로 전달하면서 호출한다. 이러한 과정을 반복하여 reduce 메소드는 하나의 결과값을 반환한다.

- 평균구하기

```js
const values = [1, 2, 3, 4, 5, 6];

const average = values.reduce((acc, cur, i, { length }) => {
    return i === length - 1 ? (acc + cur) / length : acc + cur;
}, 0);

console.log(average);  // 3.5
```

- 최대값 구하기

```js
const values = [1, 2, 3, 4, 5];

const max = values.reduce((acc, cur) => (acc > cur ? acc : cur), 0);
console.log(max);   // 5
```

최대값을 구하는 것은 Math.max 메소드를 사용하는 것이 더 간편하다.

```js
const values = [1, 2, 3, 4, 5];

const max = Math.max(...values);

console.log(max);
```

- 중복된 요소의 개수 구하기

```js
const fruits = ['banana', 'apple', 'orange', 'orange', 'apple'];

const count = fruits.reduce((acc, cur) => {
    acc[cur] = (acc[cur] || 0) + 1;
    return acc;
}, {})

console.log(count); // { banana: 1, apple: 2, orange: 2 }
```

- 중첩 배열 평탄화

```js
const values = [1, [2, 3], 4, [5, 6]];

const flatten = values.reduce((acc, cur) => acc.concat[cur], []);

console.log(flatten); // [1, 2, 3, 4, 5, 6]
```

Array.prototype.flat을 이용한 평탄화

```js
csont values = [1, [2, 3], 4, [5, 6]];

values.flat(Infinity);  //  [1, 2, 3, 4, 5, 6]
```

- 중복요소 제거

```js
const values = [1, 2, 1, 3, 5, 4, 5, 3, 4, 4];

const result = values.reduce((acc, cur, i, arr) => {
    if (arr.indexOf(cur) === i)
}, []);
```

<br>

### Array.prototype.some

some 메소드는 배열을 순회하며 각 요소에 대하여 인수로 전달된 콜백함수를 실행하여 그 결과가 <strong>하나라도 참이면 true, 모두 거짓이면 false를 반환</strong>한다. 즉, 배열의 요소 중에 콜백함수를 통해 정의한 조건을 만족하는 요소가 1개 이상 존재하는지 확인하여 <strong>그 결과를 불리언 타입으로 반환한다.</strong>

forEach, map, filter 메소드와 마찬가지로 some 메소드의 콜백 함수는 요소값, 인덱스, 메소드를 호출한 배열, 즉 this를 전달 받을 수 있다.

- 사용법

```js
// arr.some(callback(currentvalue[, index[, array]])[, thisArg])
currnetValue : arr의 요소
index : arr의 인덱스
array : some()를 호출한 배열
thisArg : callback을 실행할 때 this로 사용할 값.
```



```js
[5, 10, 15].some(item => item > 10);  // true
[5, 10 ,15].some(item => item < 0);  // false
['apple', 'banana', 'mango'].some(item => item === 'banana'); // true
```

<br>

### Array.prototype.every

every 메소드는 배열을 순회하며 각 요소에 대하여 인수로 전달될 콜백함수를 실행하여 그 결과가 <strong>모두 참이라면 true, 하나라도 거짓이라면 false를 반환</strong>한다. 즉, 배열의 모든 요소가 콜백함수를 통해 정의한 조건을 모두 만족하는지 확인하여 그 결과를 <strong>불리언 타입으로 반환한다.</strong>

- 사용법

```js
// arr.every(callback(currentvalue[, index[, array]])[, thisArg])
currnetValue : arr의 요소
index : arr의 인덱스
array : every()를 호출한 배열
thisArg : callback을 실행할 때 this로 사용할 값.
```

```js 
// 배열의 모든 요소가 3보다 큰지 확인
[5, 10, 15].every(item => item > 3); // -> true

// 배열의 모든 요소가 10보다 큰지 확인
[5, 10, 15].every(item => item > 10); // -> false
```

<br>

### Array.prototype.find

ES6에서 새롭게 도입된 find 메소드는 배열을 순회하며 각 요소에 대하여 인수로 전달될 콜백함수를 실행하여 <strong>그 결과가 참인 첫번째 요소를 반환</strong>한다. 실행결과가 참인 요소가 존재하지 않는다면 undefined를 반환한다.

- 사용법

```js
// arr.find(callback(currentvalue[, index[, array]])[, thisArg])
currnetValue : arr의 요소
index : arr의 인덱스
array : find()를 호출한 배열
thisArg : callback을 실행할 때 this로 사용할 값.
```



```js
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

const result = users.find(item => item.id === 2);

console.log(result);   // {id: 2, name: 'Kim'}

const result2 = users.find(item => item.id === 4);

console.log(result2);   // undefined
```

filter 메소드는 콜백함수의 실행결과가 true인 요소만을 추출한 새로운 배열을 반환한다. <strong>따라서 filter 메소드의 반환값은 언제나 배열이다.</strong> 하지만 find 메소드는 콜백함수를 실행하여 그 결과가 참인 첫번째 요소를 반환하므로 <strong>find의 결과값은 해당요소의 값이다.</strong>

```js
// filter는 배열을 반환한다.
[1, 2, 2, 3].filter(item => item === 2); // -> [2, 2]

// find는 요소를 반환한다.
[1, 2, 2, 3].find(item => item === 2); // -> 2
```

<br>

### Array.prototype.findIndex

ES6에서 새롭게 도입된 findIndex 메소드는 배열을 순회하며 각 요소에 대하여 인수로 전달된 콜백함수를 실행하여 <strong>그 결과가 참인 첫번째 요소의 인덱스</strong>를 반환한다. 콜백함수의 실행 결과가 참인 요소가 존재하지 않는다면 -1을 반환한다.

- 사용법

```js
// arr.findIndex(callback(currentvalue[, index[, array]])[, thisArg])
currnetValue : arr의 요소
index : arr의 인덱스
array : findIndex()를 호출한 배열
thisArg : callback을 실행할 때 this로 사용할 값.
```

 

```js
const users = [
  { id: 1, name: 'Lee' },
  { id: 2, name: 'Kim' },
  { id: 2, name: 'Choi' },
  { id: 3, name: 'Park' }
];

users.findIndex(user => user.id === 2); // 1
users.findIndex(user => user.name === 'Park');  // 3

function predicate(key, value) {
    return item => item[key] === value;
}

users.findIndex(predicate('id', 2)); // 1
users.findIndex(predicate('name', 'Park')) // 3
```

<br>

### Array.prototype.flatMap

ES10에서 새롭게 도입된 flatMap 메소드는 <strong>map을 통해 생성된 새로운 배열을 평탄화한다.</strong> 즉, map 메소드와 flat 메소드를 순차적으로 실행하는 효과가 있다.

```js
let arr = ['hello', 'world'];

console.log(arr.map(str => str.split('')).flat());
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

console.log(arr.flatMap(str => str.split('')));
// ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']
```

단, flat 메소드처럼 인수를 전달하여 평탄화 깊이를 지정할 수는 없고 1단계만 평탄화 한다. map을 통해 생성된 중첩 배열의 평탄화깊이를 지정해야 하는 경우, flayMap 메소드 대신 map과 flat을 각각 호출해야한다.

```js
const arr = ['hello', 'world'];

console.log(arr.flatMap((str, index) => [index, [str, str.length]]));
// [[0, ['hello', 5]], [1, ['wolrd', 5]]] => [0, ['hello', 5], 1, ['world', 5]]

console.log(arr.map((str, index) => [index, [str, str.length]]).flat(2));
// [[0, ['hello', 5]], [1, ['wolrd', 5]]] => [0, 'hello', 5, 1, 'world', 5]
```



