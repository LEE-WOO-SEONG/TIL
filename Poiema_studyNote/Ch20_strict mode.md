# strict mode

- Toc

1. [strict mode](#strict-mode)
2. [strict mode의 적용](#strict-mode의-적용)
3. [전역 strict mode의 문제점](#전역-strict-mode의-문제점)
4. [함수단위의 strict mode의 문제점](#함수단위의-strict-mode의-문제점)
5. [strict mode가 발생시키는 에러](#strict-mode가-발생시키는-에러)
6. [strict mode 적용에 의한 변화](#strict-mode-적용에-의한-변화)



<br>

<br>

## strict mode

```js
function foo() {
  x = 10;
}
foo();

console.log(x); // ?
```

- 위 예제의 자바스크립트 엔진의 검색순서

1. `foo` 함수 호출.

2. `foo` 함수 몸체 코드 실행 -> x = 10 이라는 코드를 만나 x라는 식별자를 스코프체인을 따라 검색하기 시작함.
3. `foo` 함수 스코프 내에는 x라는 식별자가 선언되어있지 않음 -> 상위스코프인 전역스코프에서 x 식별자를 검색.
4. 전역스코프에도 x 식별자가 없음 -> **암묵적전역**에 의해 전역객체(브라우저환경에서는 window)에 x라는 프로퍼티를 동적으로 생성.
5. x는 10이라는 값이 할당된 전역변수로써 동작이 가능하기 때문에 `console.log(x)` 의 값은 **10**이 나옴.

위와 같이 전역의 하위 스코프에서 선언키워드(var / let / const) 없이 식별자에 값을 할당할 경우 자바스크립트 엔진의 **암묵적전역** 현상으로 해당 식별자는 전역변수로써 인식된다. 

<strong>때문에 변수 선언 시, 꼭 키워드와 함께 사용하는 것이 좋다.  </strong>

하지만 개발자의 오타나 문법지식의 미비로 인한 실수는 언제나 발생할 수 있으므로 보다 근본적으로 오류를 발생시키기 어려운 개발환경을 만들고자 하여 탄생한 것이 strict mode 이다.

strict mode는 ES5부터 추가되었으며 자바스크립트 언어의 문법을 보다 엄격히 적용하여 기존에는 무시되던 오류 혹은 자바스크립트 엔진의 최적화 작업에 문제를 일으킬 수 있는 코드에 대해 <strong>명시적인 에러를 발생시킨다.</strong>

ESLint와 같은 린트도구를 통해 strict mode와 유사한 환경의 조성이 가능하다. 린트도구는 정적분석(static analysis) 기능을 통해 소스코드 실행 전, 소스코드를 스캔하여 문법적 오류혹은 잠재적 오류를 찾아내고 오류의 이유까지 리포팅 해준다. 또한 strict mode가 제한하는 오류는 물론 코딩 컨벤션을 설정 파일 형태로 정의하고 강제할 수 있기 때문에 보다 강력한 효과를 얻을 수 있다.

<br>

## strict mode의 적용

strict mode를 적요하고 싶으면 전역의 선두 또는 함수몸체의 선두에 `'use strict';` 를 추가한다.

```js
// 스크립트 전역에 strict mode 사용
'use strict';

function foo() {
  x = 10; // ReferenceError: x is not defined
}
foo();

// 함수내에서 strict mode 사용
function foo() {
  'use strict';

  x = 10; // ReferenceError: x is not defined
}
foo();
```

단, 코드의 선두에 strict mode를 위치시키지 않으면 제대로 동작하지 않으니 유의하자.

<br>

## 전역 strict mode의 문제점

전역에 적용한 strict mode는 스크립트 단위로 적용된다.

```js
<!DOCTYPE html>
<html>
<body>
  <script>
    'use strict';                            // strict mode 적용
  </script>
  <script>
    x = 1; // 에러가 발생하지 않는다.          // strict mode 미적용
    console.log(x); // 1
  </script>
  <script>
    'use strict';                            // strict mode 적용

    y = 1; // ReferenceError: y is not defined
    console.log(y);
  </script>
</body>
</html>
```

위 예제와 같이 스크립트 단위로 strict mode를 적용할 경우 strict mode 스크립트와 non-strict mode의 스크립트가 혼용될 수 있기 때문에 좋지 않다. <strong>때문에 즉시 실행함수로 스크립트 전체를 감싸서 스코프를 구분하고 즉시 실행함수의 선두에 strict mode를 적용하는 것이 좋겠다.</strong>

```js
// 즉시 실행 함수의 선두에 strict mode 적용
(function () {
  'use strict';

  // Do something...
}());
```

<br>

## 함수단위의 strict mode의 문제점

함수 단위로도 strict mode의 적용이 가능하나 모든 함수에 strict mode를 적용하지 않는 한 strict mode와 non-strict mode 함수가 혼용될 가능성이 크다. 또한 strict mode가 적용된 함수가 참조할 함수외부의 컨텍스트에 strict mode를 적용하지 않는 것도 문제가 된다.

```js
(function () {
  // non-strict mode
  var lеt = 10; // 에러가 발생하지 않는다.

  function foo() {
    'use strict';

    let = 20; // SyntaxError: Unexpected strict mode reserved word
  }
  foo();
}());
```

따라서 strict mode는 <strong>즉시 실행 함수로 감싼 스크립트 단위</strong>로 적용하는 것이 바람직하다.

<br>

## strict mode가 발생시키는 에러

### 암묵적 전역

선언하지 않은 변수에 값을 할당하면 Reference Error가 발생한다.

```js
(function () {
  'use strict';

  x = 1;
  console.log(x); // ReferenceError: x is not defined
}());
```

<br>

### 변수, 함수, 매개변수의 삭제

delete 연산자로 변수, 함수, 매개변수를 삭제하면 syntaxError가 발생한다.

```js
(function () {
  'use strict';

  var x = 1;
  delete x;
  // SyntaxError: Delete of an unqualified identifier in strict mode.

  function foo(a) {
    delete a;
    // SyntaxError: Delete of an unqualified identifier in strict mode.
  }
  delete foo;
  // SyntaxError: Delete of an unqualified identifier in strict mode.
}());
```

<br>

### 매개변수 이름의 중복

중복된 함수 매개변수 이름을 사용하면 SyntaxError가 발생한다.

```js
(function () {
  'use strict';

  //SyntaxError: Duplicate parameter name not allowed in this context
  function foo(x, x) {
    return x + x;
  }
  console.log(foo(1, 2));
}());
```

<br>

### with 문의 사용

with문을 사용하면 SyntaxError가 발생한다.

```js
(function() {
    'use strict';
    
    // SyntaxError: Strict mode code may not include a with statement
    with({ x : 1 }) {
        console.log(x);
    }
}());
```

<br>

## strict mode 적용에 의한 변화

### 일반함수의 this

strict mode에서 함수를 일반함수의 형태로 호출하면 <strong>this에 undefined</strong>가 바인딩 된다.

non-strict mode에서는 일반함수로 호출 시 this는 전역객체로 작용하는 것과는 차이가 있다.

```js
(function () {
    'use strict';
    
    function foo() {
        console.log(this);     // undefined
    }
    foo();
    
    function Foo() {
        console.log(this);      // Foo {}
    }
    new Foo();
})
```

<br>

### arguments 객체

strict mode에서는 매개변수에 전달된 인수를 재할당하여 변경하여도 arguments 객체에 반영되지 않는다.

```js
(function (a) {
  'use strict';
 
  a = 2;    // 매개변수에 전달된 인수를 재할당하여 변경  

  // 변경된 인수가 arguments 객체에 반영되지 않는다.
  console.log(arguments); // { 0: 1, length: 1 }
}(1)); // 인수
```

