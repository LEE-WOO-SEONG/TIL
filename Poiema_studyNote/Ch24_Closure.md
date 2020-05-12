# 클로저

- Toc

1. [렉시컬 스코프](#렉시컬-스코프)
2. [함수객체의 내부슬롯 Environment](#함수객체의-내부슬롯-Environment)
3. [클로저와 렉시컬환경](#클로저와-렉시컬환경)
4. [클로저의 활용](#클로저의-활용)
5. [자주 발생하는 실수](#자주-발생하는-실수)

<br>

<br>



클로저(Closure)는 자바스크립트의 고유한 개념이 아닌 함수를 **일급객체**로 취급하는 함수형 프로그래밍 언어에서 사용되는 중요한 특성이다.

클로저는 자바스크립트의 고유한 개념이 아니기 때문에 ECMASript 사양에 등장하지 않는다. 대신 [클로저](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Closures)에 대한 MDN의 정의를 살펴보자

> 클로저는 <strong>함수와 함수가 선언된 어휘적 환경의 조합</strong>이다. 클로저를 이해하려면 자바스크립트가 어떻게 변수의 유효범위를 지정하는지(Lexical scoping)를 먼저 이해해야 한다.

```js
// innerFunc 함수의 상위스코프는 outerFunc 함수의 렉시컬 환경이다.
const x = 1;

function outerFunc() {
  const x = 10;

  function innerFunc() {
    console.log(x); // 10
  }

  innerFunc();
}

outerFunc();

// innerFunc 함수는 전역에서 정의되었으므로 상위스코프는 null(없음) 이다.
const x = 1;

function outerFunc() {
  const x = 10;
  innerFunc();
}

function innerFunc() {
  console.log(x); // 1
}

outerFunc();
```

위 예제르 보면 함수 outerFunc 내부에서 중첩 함수 innerFunc가 정의되고 호출되었다. 이때 중첩 함수 innerFunc의 <strong>상위 스코프</strong>는 외부 함수 outerFunc의 스코프이다. 따라서 중첩 함수 innerFunc 내부에서 자신을 포함하고 있는 외부 함수 outerFunc의 변수 x에 **접근**할 수 있다.

만약 함수 innerFunc가 함수 outerFunc의 내부에서 정의된 중첩 함수가 아니라면 함수 innerFunc를 함수 outerFunc의 내부에서 **호출**한다 하더라도 함수 outerFunc의 변수에 접근할 수 없다.

<br>

## 렉시컬 스코프

정적스코프라 불리는 렉시컬스코프는 함수의 호출위치가 아니라 함수의 정의 위치에 따라 자신의 상위스코프를 결정하는 방식을 말한다.

```js
const x = 1;

function foo() {
  const x = 10;
  bar();
}

function bar() {
  console.log(x);
}

foo(); // ? 1
bar(); // ? 1
```

스코프의 실체는 실행 컨텍스트의 <strong>렉시컬 환경</strong>(Lexical environment)이다. 이 렉시컬 환경은 자신의 “외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference)”를 통해 상위 렉시컬 환경과 연결된다. 이것이 바로 스코프 체인이다.

따라서 “함수의 상위 스코프를 결정한다”는 것은 <strong>“렉시컬 환경의 외부 렉시컬 환경에 대한 참조에 저장할 참조값을 결정한다”</strong>는 것과 같다. 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 저장할 참조값이 바로 상위 렉시컬 환경에 대한 참조이며 이것이 상위 스코프이기 때문이다. 

즉, 렉시컬 환경의 “외부 렉시컬 환경에 대한 참조”에 저장할 참조값인 상위 스코프에 대한 참조는 <strong>함수 정의가 평가되는 시점에 함수가 정의된 환경(위치)에 의해 결정</strong>된다. 이것이 바로 렉시컬 스코프이다.

<br>

## 함수객체의 내부슬롯 Environment

함수가 **정의**된 환경과 **호출**되는 환경은 다를 수 있다. 따라서 렉시컬 스코프가 가능하려면 함수는 자신이 호출되는 환경과는 상관없이 자신이 정의된 환경을 기억해야 한다. 이를 위해 <strong>함수는 자신의 내부슬롯인 [[Environment]]에 자신이 정의된 환경인 상위스코프의 참조를 저장한다.</strong>

함수 정의가 평가되어 함수객체를 생성할 때 자신이 정의된 환경에 의해 결정된 상위스코프의 참조를 함수객체 자신의 내부슬롯에 저장한다고 했다. 이 때 자신의 내부슬롯에 저장된 상위 스코프의 참조는 현재 실행 중인 실행컨텍스트의 **렉시컬환경**을 가리킨다.

함수 객체의 내부 슬롯 [[Environment]]에 저장한 현재 실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 바로 상위 스코프이다. 또한 자신이 호출되었을 때 생성될 함수 렉시컬 환경의 <strong>“외부 렉시컬 환경에 대한 참조”에 저장될 참조값</strong>이다. 함수 객체는 내부 슬롯 [[Environment]]에 저장한 렉시컬 환경의 참조, 즉 상위 스코프를 자신이 존재하는 한 **기억**한다.

```js
const x = 1;

function foo() {
  const x = 10;

  // 상위 스코프는 함수 정의 환경(위치)에 따라 결정된다.
  // 함수 호출 위치와 상위 스코프는 아무런 관계가 없다.
  bar();
}

// 함수 bar는 자신의 상위 스코프, 즉 전역 렉시컬 환경을 기억한다.
function bar() {
  console.log(x);
}

foo(); // 1
bar(); // 1
```

위 예제의 실행컨텍스트의 렉시컬환경은 아래와 같다.

![image](https://user-images.githubusercontent.com/62285872/81644545-e81ad580-9462-11ea-84dc-99c71a36def5.png)	

함수 foo와 함수 bar는 모두 전역에서 함수 선언문으로 정의되었다. 따라서 함수 foo와 함수 bar는 모두 전역 코드가 평가되는 시점에 평가되어 함수 객체를 생성하고 전역 객체 window의 프로퍼티가 된다. 이 때 생성된 함수 객체의 내부 슬롯 [[Environment]]에는 함수 정의가 평가된 시점, 즉 전역 코드 평가 시점에 실행 중인 실행 컨텍스트의 렉시컬 환경인 전역 렉시컬 환경의 참조가 저장된다.

<br>

## 클로저와 렉시컬환경

```js
const x = 1;

// ①
function outer() {
  const x = 10;
  const inner = function () { console.log(x); }; // ②
  return inner;
}

// 함수 outer를 호출하면 중첩 함수 inner를 반환한다.
// 그리고 함수 outer의 실행 컨텍스트는 실행 컨텍스트 스택에서 pop된다.
const innerFunc = outer(); // ③
innerFunc(); // ④ 10
```

위 예제에서 함수 outer를 호출 (3번)하면 함수 outer는 중첩함수 inner를 반환하고 생명주기를 마친다. 즉, 함수 outer의 호출이 종료되면 함수 outer의 실행 컨텍스트는 실행컨텍스트 스택에서 pop된다. 이 때 함수 outer의 지역변수 `x` 또한 생명주기를 마감한다. 이 시간 이후로는 함수를 다시 호출하지 않는 한 지역변수 `x`에 접근할 수 없다.

outer 함수가 평가되어 함수 객체를 생성할 때(①) 현재 실행 중인 실행 컨텍스트의 렉시컬 환경, 즉 전역 렉시컬 환경을 outer 함수 객체의 [[Environment]] 내부 슬롯에 상위 스코프로서 저장한다.

outer 함수를 호출하면 outer 함수의 렉시컬환경이 생성되고 앞서 outer 함수객체의 [[Environment]] 내부슬롯에 저장된 전역 렉시컬활경을 outer 함수 렉시컬환경의 '외부 렉시컬 환경에 대한 참조'에 할당한다. 이후 중첩함수 inner가 평가된다.(중첩함수 inner는 함수 표현식으로 정의되었기에 런타임에 함수정의가 평가된다.) 이 때 inner함수도 동일하게 자신의 [[Environment]] 내부슬롯에 현재 실행 중이 실행컨텍스트의 렉시컬환경인 outer 함수의 렉시컬환경을 상위스코프로 저장한다.

![image](https://user-images.githubusercontent.com/62285872/81646416-282f8780-9466-11ea-9ebd-892664e48531.png)	

outer 함수의 호출이 종료되면 inner 함수를 반환하면서 outer 함수의 생명주기는 종료됨과 동시에 실행컨텍스트 스택에서 pop된다. <strong>이 때 outer 함수의 실행 컨텍스트는 실행컨텍스트 스택에서 제거되지만 outer 함수의 렉시컬 환경까지 소멸하는 것은 아니다. outer 함수의 렉시컬 환경은 inner 함수의 [[Environment]] 내부슬롯에 의해 참조되고 있고 inner 함수는 전역변수 innerFunc에 의해 참조되고 있으므로 가비지 컬렉션의 대상이 되지 않기 때문이다.</strong> 

![image](https://user-images.githubusercontent.com/62285872/81646871-fb2fa480-9466-11ea-85c2-2400bad529c1.png)	

outer 함수가 반환한 inner 함수를 호출(4번)하면 inner 함수의 실행컨텍스트가 생성되고 실행컨텍스트 스택에 push된다. 그리고 렉시컬 환경의 외부 렉시컬환경에 대한 참조에는 inner 함수객체의 [[Environment]] 내부슬롯에 저장되어 있는 참조값이 할당된다.

![image](https://user-images.githubusercontent.com/62285872/81647156-83ae4500-9467-11ea-8559-3572d1ac260b.png)	

중첩 함수 inner는 외부 함수 outer보다 더 오래 생존하였다. 이때 함수는 외부 함수의 생존 여부(실행 컨텍스트의 생존 여부)와 상관없이 자신이 정의된 위치에 의해 결정된 상위 스코프를 **기억**한다.

중첩 함수 inner의 내부에서는 상위 스코프를 참조할 수 있으므로 상위 스코프의 식별자를 참조할 수 있고 식별자의 값을 변경할 수도 있다. 

<strong>이처럼 자신을 포함하고 있는 외부 함수보다 중첩 함수가 더 오래 유지되는 경우, 외부 함수 밖에서 중첩 함수를 호출하더라도 외부 함수의 지역 변수에 접근할 수 있는데 이러한 함수를 클로저(closure)라고 부른다.</strong>

자바스크립트의 모든 함수는 상위 스코프를 기억하므로 이론적으로 모든 함수는 클로저이지만 일반적으로 모든 함수를 클로저라고 하지는 않는다.

```JS
function foo() {
      const x = 1;
      const y = 2;

      // 일반적으로 클로저라고 하지 않는다.
      function bar() {
        const z = 3;
        // 상위 스코프의 식별자를 참조하지 않다.
        console.log(z);
      }

  return bar;
}

const bar = foo();
bar();
```

위 예제의 중첩 함수 bar는 상위 스코프의 어떤 식별자도 참조하지 않는다. 이처럼 <strong>상위 스코프의 어떤 식별자도 참조하지 않는 경우</strong>, 대부분의 모던 브라우저는 최적화를 통해 아래와 같이 <strong>상위 스코프를 기억하지 않는다.</strong> 참조하지도 않는 식별자를 기억하는 것은 메모리 낭비이기 때문이다. 따라서 bar 함수는 클로저라고 할 수 없다.

```JS
 function foo() {
      const x = 1;

      // 일반적으로 클로저라고 하지 않는다.
      // bar 함수는 클로저였지만 곧바로 소멸한다.
      function bar() {
        // 상위 스코프의 식별자를 참조한다.
        console.log(x);
      }
      bar();
    }

    foo();
```

위 예제의 중첩 함수 bar는 상위 스코프의 식별자를 참조하고 있으므로 **클로저**이다. 하지만 외부 함수로부터 <strong>외부로 반환되지 않는다.</strong> 즉, 외부 함수와 생명 주기가 같다. 이러한 경우, 중첩 함수 bar는 클로저였지만 외부 함수와 더불어 소멸되기 때문에 호출 위치에 상관없이 상위 스코프를 기억하고 참조할 수 있다는 클로저의 본질에 부합하지 않는다. 따라서 중첩 함수 inner는 일반적으로 <strong>클로저라고 하지 않는다.</strong>

```js
function foo() {
  const x = 1;
  const y = 2;

  // 클로저
  function bar() {
    // 상위 스코프의 식별자 x만을 참조한다.
    console.log(x);
  }
 return bar;
}

const bar = foo();
bar();
```

위 예제의 중첩 함수 bar는 상위 스코프의 식별자를 참조하고 있으므로 클로저이다. 그리고 외부 함수로부터 외부로 반환되어 외부 함수보다 더 오래 살아 남는다.

<strong>이처럼 자신을 포함하고 있는 외부 함수보다 중첩 함수가 더 오래 유지되는 경우, 외부 함수 밖에서 중첩 함수가 호출되더라도 외부 함수의 식별자에 접근할 수 있는 함수를 일반적으로 클로저(closure)라고 부른다.</strong>

클로저에 의해 참조되는 상위스코프의 변수를 **자유변수**(Free variable)라 부른다.

클로저(closure)란 ''함수가 자유변수에 대해 닫혀있다''라는 의미이다. 즉 ''자유변수와 묵여있는 함수''인 것이다.

이론적으로 클로저는 상위 스코프를 기억해야 하므로 불필요한 메모리의 점유를 걱정할 수도 있겠다. 하지만 모던 자바스크립트 엔진은 최적화가 잘 되어 있어서 클로저가 참조하고 있지 않는 식별자는 기억하지 않는다. 즉, 상위 스코프의 식별자 중에서 기억해야 할 식별자만 기억한다. 기억해야 할 식별자를 기억하는 것은 낭비라고 볼 수 없다. 따라서 클로저의 메모리 낭비는 걱정하지 않아도 된다.

클로저는 자바스크립트의 강력한 기능으로 적극적으로 사용해야 한다. 클로저가 유용하게 사용되는 상황에 대해 살펴보자.

<br>

## 클로저의 활용

클로저는 상태를 안전하게 **유지**하기 위해 사용한다. 즉, 상태가 의도치 않게 변경되지 않도록 안전하게 **은닉**(Information hiding)한다. 그리고 이전상태를 기억하다가 상태가 변경되면 <strong>최신상태를 유지한다.</strong>

```js
// 함수를 인수로 전달받고 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 카운트 상태를 유지하기 위한 자유 변수 counter을 기억하는 클로저다.
function makeCounter(predicate) {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 클로저를 반환
  return function () {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 함수로 함수를 생성한다.
// makeCounter 함수는 보조 함수를 인수로 전달받아 함수를 반환한다
const increaser = makeCounter(increase); // ①
console.log(increaser()); // 1
console.log(increaser()); // 2

// increaser 함수와는 별개의 독립된 렉시컬 환경을 갖기 때문에 카운터 상태가 연동하지 않는다.
const decreaser = makeCounter(decrease); // ②
console.log(decreaser()); // -1
console.log(decreaser()); // -2
```

함수 makeCounter는 보조함수를 인수로 전달받고 또 다른 함수를 반환하는 고차함수이다. 함수 makeCounter가 <strong>반환하는 함수</strong>는 자신이 생성됐을 때의 렉시컬 환경인 makeCounter함수의 렉시컬환경의 환경레코드에 속한 변수 `counter`를 기억하는 **클로저**이다.

고차함수 makeCounter의 인수로 전달되는 보조함수는 고차함수가 반환하는 함수의 동작을 변경할 수 있다.  <strong>여기서 함수 makeCounter를 호출해 함수를 반환할 때 반환된 함수는 자신만의 독립된 렉시컬 환경을 갖는다는 사실을 기억하자.</strong>

①에서 makeCounter 함수를 호출하면 makeCounter 함수의 실행 컨텍스트가 생성된다. 그리고 makeCounter 함수는 인수로 전달받은 보조 함수를 사용하여 함수 객체를 생성하여 반환한 후 소멸된다. makeCounter 함수가 반환한 함수는 변수 increaser에 할당된다. 이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 <strong>소멸되지 않는다.</strong>

![image](https://user-images.githubusercontent.com/62285872/81671761-4906d580-9484-11ea-9b01-512a15141510.png)	

②에서 makeCounter 함수를 호출하면 새로운 makeCounter 함수의 실행 컨텍스트가 생성된다. 그리고 makeCounter 함수는 인수로 전달받은 보조 함수를 사용하여 함수 객체를 생성하여 반환한 후 소멸된다. makeCounter 함수가 반환한 함수는 변수 decreaser에 할당된다. 이때 makeCounter 함수의 실행 컨텍스트는 소멸되지만 makeCounter 함수 실행 컨텍스트의 렉시컬 환경은 makeCounter 함수가 반환한 함수의 [[Environment]] 내부 슬롯에 의해 참조되고 있기 때문에 소멸되지 않는다.

![image](https://user-images.githubusercontent.com/62285872/81672009-853a3600-9484-11ea-81db-0567f6d16951.png)	

위 예제에서 변수 increaser와 변수 decreaser에 할당된 함수는 각각 자신만의 독립된 렉시컬 환경을 갖기 때문에 카운트를 유지하기 위한 자유 변수 counter를 공유하지 않아 카운터의 증감이 연동하지 않는다. 따라서 독립된 카운터가 아니라 연동하여 증감이 가능한 카운터를 만들려면 <strong>렉시컬 환경을 공유하는 클로저를 만들어야 한다.</strong> 이를 위해서는 makeCounter 함수를 <strong>두번 호출하지 말아야 한다.</strong>

```js
// 함수를 반환하는 고차 함수
// 이 함수가 반환하는 함수는 카운트 상태를 유지하기 위한 자유 변수 counter을 기억하는 클로저다.
const counter = (function () {
  // 카운트 상태를 유지하기 위한 자유 변수
  let counter = 0;

  // 함수를 인수로 전달받는 클로저를 반환
  return function (predicate) {
    // 인수로 전달 받은 보조 함수에 상태 변경을 위임한다.
    counter = predicate(counter);
    return counter;
  };
}());

// 보조 함수
function increase(n) {
  return ++n;
}

// 보조 함수
function decrease(n) {
  return --n;
}

// 보조 함수를 전달하여 호출
console.log(counter(increase)); // 1
console.log(counter(increase)); // 2

// 자유 변수를 공유한다.
console.log(counter(decrease)); // 1
console.log(counter(decrease)); // 0
```

<br>

## 자주 발생하는 실수

```js
var arr = [];

for (var i = 0; i < 5; i++) {
  arr[i] = function () { // ①
    return i;
  };
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]()); // 5,5,5,5,5
}
```

①에서 배열 funcs에는 3개의 함수가 요소로 추가된다. 그리고 ②에서 배열 funcs에 요소로 추가된 3개의 함수는 순차적 호출된다. 이때 배열 funcs에 요소로 추가된 3개의 함수가 0, 1, 2를 반환할 것으로 기대했다면 아쉽지만 결과는 그렇지 않다.

for 문의 초기화 문에서 var 키워드로 선언한 변수 i는 블록 레벨이 아닌 함수 레벨 스코프를 갖기 때문에 전역 변수가 되며 변수 i에는 0, 1, 2, 3, 4, 5가 순차적으로 할당된다. 따라서 배열 funcs에 요소로 추가된 함수를 호출하면 전역 변수 i를 참조하여 i의 값 5가 출력된다.

클로저를 사용해 위 예제를 바르게 동작하는 코드로 만들어보자.

```js
var arr = [];

for (var i = 0; i < 5; i++){
  arr[i] = (function (id) { // ①
    return function () {
      return id;
    };
  }(i));
}

for (var j = 0; j < arr.length; j++) {
  console.log(arr[j]());
}
```

①에서 즉시 실행 함수는 전역 변수 i에 현재 할당되어 있는 값을 인수로 전달받아 매개 변수 id에 할당한 후 중첩 함수를 반환하고 종료된다. 즉시 실행 함수가 반환한 함수는 배열 funcs에 순차적으로 저장된다.

이때 즉시 실행 함수의 매개 변수 id는 즉시 실행 함수가 반환한 함수의 상위 스코프에 존재하며 즉시 실행 함수가 반환한 함수에 의해 참조되므로 자유 변수가 되어 즉시 실행 함수가 반환한 함수에 의해 그 값이 유지된다.

위 예제는 자바스크립트의 함수 레벨 스코프 특성으로 인해 for 문의 초기화 문에서 var 키워드로 선언한 변수가 전역 변수가 되기 때문에 발생하는 현상이다. ES6의 let 키워드를 사용하면 이와 같은 번거로움이 깔끔하게 해결된다.

```js
const arr = [];

for (let i = 0; i < 3; i++) {
  arr[i] = () => i;
}

for (let i = 0; i < arr.length; i++) {
  console.log(arr[i]()); // 0 1 2
}
```

초기화 문에서 let 키워드로 선언한 변수를 사용하면 for 문이 반복될 때마다 for 문 코드 블록의 새로운 렉시컬 환경이 생성된다. 만약 for 문 내에서 정의된 함수가 있다면 이 함수의 상위 스코프는 for 문이 반복될 때마다 생성된 for 문 코드 블록의 새로운 렉시컬 환경이다.

이때 함수의 상위 스코프는 for 문이 반복될 때 마다 식별자(초기화 변수 및 for 문 내 지역 변수 등)의 값을 유지해야 한다. 이를 위해 for 문이 반복될 때마다 독립적인 렉시컬 환경을 생성하여 식별자의 값을 유지한다.

![image](https://user-images.githubusercontent.com/62285872/81683969-89208500-9491-11ea-9684-dddfae2d8d29.png)	

① 초기화 문에 let 키워드로 선언한 변수를 사용한 for 문이 평가되면 먼저 새로운 렉시컬 환경(LOOP Lexical Environment)을 생성하고 초기화 문의 식별자와 값을 등록한다. 그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체한다.

②, ③, ④ for 문의 반복이 시작되면 새로운 렉시컬 환경(PER-ITERATION Lexical Environment)을 생성하고 반복 시의 for 문 코드 블록 내의 식별자와 값(증감문 반영 이전)을 등록한다. 그리고 새롭게 생성된 렉시컬 환경을 현재 실행 중인 실행 컨텍스트의 렉시컬 환경으로 교체한다.

⑤ for 문의 반복이 모두 종료되면 for 문이 실행되기 이전의 렉시컬 환경을 실행 중인 실행 컨텍스트의 렉시컬 환경으로 되돌린다.

이처럼 var 키워드로 사용하지 않은 ES6의 반복문(for…in 문, for…of 문, while 문 등)은 반복할 때마다 새로운 렉시컬 환경을 생성하여 반복할 당시의 상태를 마치 스냅샷을 찍는 것처럼 저장한다. <strong>단, 이는 반복문 내부에서 함수 정의가 존재할 때 의미가 있다.</strong> 반복문 내부에 함수 정의가 없는 반복문이 생성하는 새로운 렉시컬 환경은 반복 직후, 아무도 참조하지 않기 때문에 가비지 컬렉션의 대상이 된다.