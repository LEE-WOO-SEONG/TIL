# 실행 컨텍스트

- Toc

1. [소스코드의 타입](#소스코드의-타입)

2. [소스코드의 평가와 실행](#소스코드의-평가와-실행)

3. [실행 컨텍스트의 역할](#실행-컨텍스트의-역할)

4. [실행컨텍스트 스택](#실행컨텍스트-스택)

5. [렉시컬 환경](#렉시컬-환경)

6. [실행컨텍스트의 생성 및 식별자 검색과정](#실행컨텍스트의-생성-및-식별자-검색과정)

   6-1. [전역객체 생성](#전역객체-생성)

   6-2. [전역코드 평가](#전역코드-평가)

   6-3. [전역코드 실행](#전역코드-실행)

   6-4. [foo 함수코드 평가](#foo-함수코드-평가)

   6-5. [foo 함수코드 실행](#foo-함수코드-실행)

   6-6. [bar 함수코드 평가](#bar-함수코드-평가)

   6-7. [bar 함수코드 실행](#bar-함수코드-실행)

   6-8. [bar 함수코드 실행종료](#bar-함수코드-실행종료)

   6-9. [foo 함수코드 실행종료](#foo-함수코드-실행종료)

   6-10. [전역코드 실행종료](#전역코드-실행종료)

7. [실행컨텍스트와 블록레벨 스코프](#실행컨텍스트와-블록레벨-스코프)



<br>

<br>

> 실행 컨텍스트? (Execution context)
>
> 실행컨텍스트는 자바스크립트의 동작원리를 담고 있는 핵심개념이다. 실행 컨텍스트를 바르게 이해하면 자바스크립트가 **스코프**를 기반으로 식별자와 식별자에 바인딩된 값을 관리하는 방식, 호이스팅이 발생하는 이유, 클로저의 동작방식 그리고 태스크 큐와 함께 동작하는 이벤트 핸들러와 비동기 처리의 동작방식에 대해 이해할 수 있다.

<br>

## 소스코드의 타입

ECMAScript에 명시된 소스코드의 4가지 타입은 아래와 같다.

| 소스코드의 타입               | 설명                                                         |
| ----------------------------- | ------------------------------------------------------------ |
| 전역코드<br />(global code)   | 전역에 존재하는 소스코드를 의미. <br />전역에 정의된 함수, 클래스등의 내부 코드는 포함되지 않는다. |
| 함수코드<br />(function code) | 함수내부에 존재하는 소스코드를 의미.<br />함수내부에 중첩된 함수, 클래스 등의 내부코드는 포함되지 않는다. |
| eval코드<br />(eval code)     | 빌트인 전역함수인 eval 함수에 인수로 전달되어 실행되는 소스코드를 의미. |
| 모듈코드<br />(module code)   | 모듈 내부에 존재하는 소스코드를 의미.<br />모듈 내부의 함수, 클래스 등의 내부코드는 포함되지 않는다. |

소스코드(실행가능한 코드, executable code)를 4가지 타입으로 구분하는 이유는 소스코드의 타입에 따라 실행 컨텍스트를 생성하는 과정과 관리내용이 다르기 때문이다.

- 전역코드

전역코드는 **전역변수**를 관리하기 위해 최상위 스코프인 **전역스코프**를 생성해야 한다. 그리고 var 키워드로 선언된 전역변수와 함수선언문으로 정의된 전역함수를 전역객체의 프로퍼티와 메소드로 바인딩하고 참조하기 위해 전역객체와 연결되어야 한다. 이를 위해 전역코드가 평가되면 전역 실행컨텍스트가 생성된다.

- 함수코드

함수코드는 **지역스코프**를 생성하고 **지역변수**와 **매개변수**를 관리해야 한다. 그리고 생성한 지역스코프를 전역스코프에서 시작하는 **스코프체인**의 일원으로 연결해야 한다. 이를 위해 함수코드가 평가되면 함수 실행컨텍스트가 생성된다.

- eval코드

eval 코드는 **엄격모드**(strict mode)에서 자신만의 <strong>독자적인 스코프를 생성</strong>한다. 이를 위해 eval 코드가 평가되면 eval 실행컨텍스트가 생성된다.

- 모듈코드

모듈코드는 **모듈별**로 <strong>독립적인 스코프를 생성</strong>한다. 이를 위해 모듈코드가 평가되면 모듈 실행컨텍스트가 생성된다.

![image](https://user-images.githubusercontent.com/62285872/81493346-a0694200-92da-11ea-836a-93a9253b2e9f.png)

<br>

## 소스코드의 평가와 실행

모든 소스코드는 실행에 앞서 **평가**과정을 거치며 코드실행을 위한 준비를 한다. 다시말해 자바스크립트는 소스코드를 2개의 과정인 소스코드의 **평가**와 소스코드의 **실행**으로 나누어 처리한다.

소스코드 **평가과정**에서는 <strong>실행컨텍스트를 생성</strong>하고 변수, 함수 등의 **선언문** 만을 먼저 실행하여 생성된 변수나 함수 식별자를 키로 실행컨텍스트가 관리하는 스코프(렉시컬 환경의 환경레코드)에 등록한다.

소스코드의 평가과정이 끝나면 비로소 <strong>선언문을 제외한 소스코드</strong>가 순차적으로 실행되기 시작한다. 이 때 소스코드 실행에 필요한 정보인 변수나 함수의 참조를 실행컨텍스트가 관리하는 스코프에서 취득한다. 그리고 변수 값의 변경과 같은 소스코드의 실행결과는 다시 실행컨텍스트가 관리하는 스코프에 등록된다.

![image](https://user-images.githubusercontent.com/62285872/81493551-16ba7400-92dc-11ea-99c6-5bcfa1d467d2.png)

```js
var x;
x = 1;
```

자바스크립트가 위 예제를 처리하는 과정은 다음과 같다.

1. 먼저 소스코드 **평가**과정에서 **변수선언문** `var x;`를 먼저 실행한다. 이 때 생성된 변수 x는 실행컨텍스트가 관리하는 스코프에 등록된다.

![image](https://user-images.githubusercontent.com/62285872/81493582-639e4a80-92dc-11ea-8081-53762298e03c.png)

2. 소스코드 평가과정이 끝나면 소스코드 실행과정이 시작된다. 변수선언문 `var x;`는 소스코드 평가과정에서 이미 실행이 완료되었다. <strong>따라서 소스코드 실행과정에서는 변수할당문 `x = 1'`만 실행된다.</strong> 이 때 변수 x에 값을 할당하려면 변수 x가 선언된 변수인지 확인해야 한다.
3. 실행컨텍스트가 관리하는 스코프에 변수 x가 등록되어 있는지 확인한다. 만약 변수 x가 등록되어 있다면 변수 x는 선언된 변수, 즉 소스코드 평가과정에서 선언문이 실행되어 등록된 변수이다. 변수 x가 선언된 변수라면 값을 할당하고 할당결과를 실행컨텍스트에 등록하여 관리한다.

![image](https://user-images.githubusercontent.com/62285872/81493649-2a1a0f00-92dd-11ea-9773-a11e99b9e628.png)

<br>

## 실행 컨텍스트의 역할

```js
// 전역 변수 선언
const x = 1;
const y = 2;

// 함수 정의
function foo(a) {
  // 지역 변수 선언
  const x = 10;
  const y = 20;

  // 메소드 호출
  console.log(a + x + y); 
}

// 함수 호출
foo(100);      // 130

// 메소드 호출
console.log(x + y); // 3
```

자바스크립트 엔진이 위 예제를 평가하고 실행하는 과정은 아래와 같다.

1. 전역코드 **평가**

먼저 전역코드를 **실행**하기에 앞서 전역코드 **평가**과정을 거치며 전역코드 실행을 위한 준비를 한다. 따라서 전역 코드의 변수 선언문과 함수 선언문이 먼저 실행되고 그 결과 생성된 전역변수와 전역함수가 실행 컨텍스트가 관리하는 <strong>전역 스코프에 등록</strong>된다. 또한 var 키워드로 선언된 전역변수와 함수 선언문으로 정의된 전역함수는 전역객체의 프로퍼티와 메소드가 된다.

2. 전역코드 **실행**

전역코드의 평가가 끝나면 전역코드가 순차적으로 실행되기 시작한다. 이 때 전역변수에 값이 **할당**되고 함수가 **호출** 된다. <strong>함수가 호출</strong>되면 **순차적**으로 실행되던 전역코드의 실행을 <strong>일시중단</strong>하고 코드실행순서를 **변경**하여 함수내부로 진입한다.

3. 함수코드 **평가**

코드 실행순서가 변경되어 함수내부로 진입하면 함수 내부의 문들을 실행하기에 앞서 함수코드 평가과정을 거치며 함수 코드실행을 위한 준비를 한다. 이 때 **매개변수**와 **지역변수**가 실행컨텍스트가 관리하는 **지역스코프**에 **등록**된다. 또한 함수 내부에서 지역변수처럼 사용할 수 있는 <em>`arguments`객체도 생성되어 지역스코프에 등록된다. </em>

4. 함수코드 **실행**

함수코드의 평가가 끝나면 함수코드가 순차적으로 실행되기 시작한다. 이 때 매개변수와 지역변수에 값이 **할당**되고 `console.log` 메소드가 호출된다. 

`console.log` 메소드를 호출하기 위해 먼저 **식별자** `console`을 <strong>스코프 체인을 통해 검색</strong>한다. 이를 위해 함수코드의 지역스코프는 상위 스코프인 전역스코프와 연결되어야 한다. 하지만 식별자 `console`은 스코프 체인에 등록되어 있지않고 전역객체의 프로퍼티로 존재한다. <strong>이는 전역객체의 프로퍼티가 마치 전역변수처럼 전역스코프에서 검색이 가능해야 한다는 것을 의미한다.</strong>

다음은 `log` 프로퍼티를 `console` 객체의 프로토타입 체인을 통해 검색한다. 그 후 `console.log` 메소드의 인수로 전달된 `a + x + y` 표현식이 평가된다. 식별자 a, x, y는 스코프 체인을 통해 검색한다. `console.log` 메소드의 실행이 종료되면 함수코드의 실행이 종료되고 함수호출 이전으로 되돌아가 전역코드 실행을 계속한다.

이처럼 코드가 실행되려면 스코프를 구분하여 식별자와 바인딩된 값을 관리할 수 있어야 한다. 그리고 중첩관계에 의해 스코프 체인을 형성하여 식별자를 검색할 수 있어야 하고, 전역객체의 프로퍼티도 전역변수처럼 검색할 수 있어야 한다.

또한 함수 호출이 종료되면 함수호출 이전으로 되돌아가기 위해 현재 실행중인 코드와 이전에 실행하던 코드를 구분하여 관리해야 한다. 이처럼 코드가 실행되려면 아래와 같이 스코프 / 식별자 / 코드 실행순서 등의 관리가 필요하다.

- 선언에 의해 생성된 모든 식별자(변수, 함수, 클래스 등)를 <strong>스코프를 구분하여 등록</strong>하고 **상태변화**(식별자에 바인딩된 값의 변화)를 지속적으로 관리할 수 있어야 한다.
- 스코프는 중첩관계에 의해 스코프 체인을 형성해야 한다. 즉, 스코프 체인을 통해 상위스코프로 이동하며 식별자를 검색할 수 있어야 한다.
- 현재 실행 중인 코드의 실행순서를 변경할 수 있어야 하며 다시 되돌아갈 수도 있어야 한다.

이 모든것을 관리하는 것이 바로 **실행컨텍스트**이다. <strong>실행컨텍스트는 소스코드를 실행하기 위해 필요한 환경을 제공하고 코드의 실행결과를 실제로 관리하는 영역이다.</strong>

즉 실행컨텍스는 식별자를 등록하고 관리하는 **스코프**와 <strong>코드 실행순서 관리를 구현한 내부 메커니즘</strong>으로 모든 코드는 실행컨텍스트를 통해 실행되고 관리된다.

식별자와 스코프는 실행 컨텍스트의 **렉시컬환경**으로 관리하고 <em>코드 실행순서</em>는 <strong>실행컨텍스트 스택</strong>으로 관리한다.

<br>

## 실행컨텍스트 스택

```js
const x = 1;

function foo () {
  const y = 2;

  function bar () {
    const z = 3;
    console.log(x + y + z);
  }
  bar();
}

foo(); // 6
```

자바스크립트 엔진이 위 코드를 만나면 먼저 전역코드를 평가하여 전역 실행컨텍스트를 생성한다. 그리고 함수가 호출되면 함수코드를 평가하여 함수 실행컨텍스트를 생성한다.

이 때 생성된 실행 컨텍스트는 **스택** 자료구조로 관리된다. 이를 실행컨텍스트 스택(Execution context stack)이라고 부른다. 실행컨텍스트 스택을 콜 스택(Call stack)이라 부르기도 한다.

위 코드를 실행하면 코드가 실행되는 시간의 흐름에 따라 실행컨텍스트 스택에는 아래와 같이 실행컨텍스트가 추가(push)되고 제거(pop)된다.

![image](https://user-images.githubusercontent.com/62285872/81494281-a4995d80-92e2-11ea-9836-6176592f5e4d.png)

1. 전역코드의 평가와 실행

자바스크립트 엔진은 먼저 전역코드를 **평가**하여 <strong>전역 실행컨텍스트를 생성</strong>하고 실행컨텍스트 스택에 **push**한다. 이 때 전역변수 x와 전역함수 foo는 전역 실행컨텍스트에 등록된다. 이 후, 전역코드가 실행되기 시작하여 전역변수 x에 값이 할당되고 전역함수 foo가 호출된다.

2. foo 함수코드의 평가와 실행

전역함수 foo가 호출되면 전역코드의 실행은 **일시중단**되고 코드의 **제어권**(control)이 foo 함수 내부로 이동한다. 자바스크립트 엔진은 foo 함수 내부의 함수코드를 평가하여 foo <strong>함수 실행컨텍스트를 생성</strong>하고 실행컨텍스트 스택에 **push**한다. 이 때 foo 함수의 지역변수 y와 중첩함수 bar가 foo 함수 실행컨텍스트에 등록된다. 이 후, foo 함수코드가 실행되기 시작하여 지역변수 y에 값이 할당되고 중첩함수 bar가 호출된다.

3. bar 함수코드의 평가와 실행

중첩함수 bar가 호출되면 함수 foo코드의 실행은 일시 중단되고 코드의 제어권이 bar 함수 내부로 이동한다. 자바스크립트 엔진은 bar 함수 내부의 함수코드를 평가하여 bar 함수 실행컨텍스트를 생성하고 실행컨텍스트 스택에 push한다. 이 때 bar 함수의 지역변수 z가 bar 함수 실행컨텍스트에 등록된다. 이 후, bar 함수코드가 실행되기 시작하여 지역변수 z에 값이 할당되고 `console.log` 메소드를 호출(console.log 메소드도 함수이므로 호출되면 실행 컨텍스트를 생성하고 실행 컨텍스트 스택에 푸시한다. 이는 그림에서 생략하였다.)한 이후 함수 bar는 종료된다.

4. foo 함수코드로 복귀

함수 bar가 종료되면 코드의 제어권은 다시 함수 foo로 이동한다. 이 때 자바스크립트 엔진은 bar 함수 실행컨텍스트를 실행컨텍스트 스택에서 **pop**하여 **제거**한다. 그리고 함수 foo는 더 이상 실행할 코드가 없으므로 종료된다.

5. 전역코드로 복귀

함수 foo가 종료되면 코드의 제어권은 다시 전역코드로 이동한다. 이 때 자바스크립트 엔진은 foo 함수 실행컨텍스트를 실행컨텍스트 스택에서 pop하여 제거한다. 그리고 더이상 실행할 전역코드가 남아있지 않으므로 전역 실행컨텍스트도 실행컨텍스트 스택에서 pop하여 제거한다. 이제 실행컨텍스트 스택에는 아무것도 남아있지 않게 된다.

<strong>이처럼 실행컨텍스트 스택은 코드의 실행순서를 관리한다.</strong> 소스코드가 평가되면 실행컨텍스트가 생성되고 실행컨텍스트 스택의 최상위에 쌓인다. 실행컨텍스트 스택의 **최상위**에 존재하는 실행컨텍스트는 언제나 <strong>현재 실행 중인 코드의 실행 컨텍스트</strong>이다.

따라서 실행컨텍스트 스택의 최상위에 존재하는 실행컨텍스트를 실행 중인 실행컨텍스트(running execution context)라 부른다.

<br>

## 렉시컬 환경

렉시컬 환경(Lexical environment)은 **식별자**와 <strong>식별자에 바인딩된 값</strong> 그리고 <strong>상위 스코프에 대한 참조</strong>를 기록하는 환경으로 실행 컨텍스트를 구성하는 컴포넌트이다. 

렉시컬 환경은 스코프와 식별자를 관리한다.

![image](https://user-images.githubusercontent.com/62285872/81494636-5cc80580-92e5-11ea-9af7-34c970944ebb.png)

렉시컬 환경은 객체 형태의 스코프(전역, 함수, 블록스코프)를 생성하여 식별자를 키로 등록하고 식별자에 바인딩된 값을 관리한다. 즉, 렉시컬 환경은 스코프를 구분하여 식별자를 등록하고 관리하는 **저장소** 역할을 하는 렉시컬 스코프의 실체이다.

실행컨텍스트는 LexicalEnvironment 컴포넌트와 VariableEnvironment 컴포넌트로 구성된다. 생성 초기의 실행 컨텍스트와 렉시컬 환경을 그림으로 표현하면 아래와 같다.

![image](https://user-images.githubusercontent.com/62285872/81494699-db24a780-92e5-11ea-98ea-a9ac0e551197.png)

생성 초기에 LexicalEnvironment 컴포넌트와 VariableEnvironment 컴포넌트는 <strong>하나의 동일한 렉시컬 환경을 참조</strong>한다. 이 후, 몇가지 상황을 만나면 VariableEnvironment 컴포넌트를 위한 새로운 렉시컬 환경을 생성하고 이때부터 VariableEnvironment 컴포넌트와 LexicalEnvironment 컴포넌트는 내용이 달라지는 경우도 있다. 하지만 여기서는 strict mode와 eval 코드, try/catch 문과 같은 특수한 상황은 제외하고, LexicalEnvironment 컴포넌트와 VariableEnvironment 컴포넌트를 구분하지 않고 렉시컬 환경으로 통일해 이해하기로 하자.

렉시컬 환경은 아래와 같이 두개의 컴포넌트로 구성된다.

1. 환경레코드(Environment Record)

   스코프에 포함된 식별자를 등록하고 등록된 식별자에 바인딩된 값을 관리하는 저장소이다. 환경레코드는 소스코드 타입에 따라 차이가 있다.

2. 외부 렉시컬 환경에 대한 참조(Outer Lexical Environment Reference) 

   외부 렉시컬 환경에 대한 참조는 <strong>상위 스코프</strong>를 가리킨다. 상위스코프란 해당 실행컨텍스트를 생성한 소스코드를 포함하는 상위코드의 렉시컬 환경을 말한다. 외부 렉시컬환경에 대한 참조를 통해 단방향 링크드 리스트인 <strong>스코프 체인</strong>을 구현한다.

<br>

## 실행컨텍스트의 생성 및 식별자 검색과정

### 전역객체 생성

전역객체는 전역코드가 평가되기 **이전**에 생성된다. 전역객체에는 전역 프로퍼티와 전역함수 / 표준 빌트인 객체가 추가되며 동작환경에 따라 호스트객체 또한 포함한다.

전역객체 또한 Object.prototype을 상속받는다. <strong>즉, 전역객체도 프로토타입 체인의 일원이다.</strong>

```js
window.toString(); // -> "[object Window]"

window.__proto__.__proto__.__proto__.__proto__ === Object.prototype; // -> true
```

![image](https://user-images.githubusercontent.com/62285872/81495127-ff35b800-92e8-11ea-8251-b9abdd93168e.png)

<br>

### 전역코드 평가

소스코드가 로드되면 자바스크립트 엔진은 전역코드를 평가한다.

- 전역코드의 평가 순서

1. 전역 실행컨텍스트 생성

2. 전역 렉시컬 환경 생성

   2-1. 전역 환경 레코드 생성

   ​	2-1-1. 객체 환경 레코드 생성

   ​	2-1-2. 선언적 환경 레코드 생성

   2-2. 외부 렉시컬 환경에 대한 참조 할당

   2-3. this 바인딩

   ![image](https://user-images.githubusercontent.com/62285872/81495213-a31f6380-92e9-11ea-9ff1-7dd35d6ca5e2.png)	

#### 1. 전역 실행컨텍스트 생성

먼저 전역 실행컨텍스트를 생성하여 실행컨텍스트 스택에 push한다. 이 때 전역 실행컨텍스트는 실행컨텍스트 스택의 최상위인 실행 중인 실행컨텍스트가 된다.

#### 2. 전역 렉시컬 환경 생성

전역 렉시컬 환경을 생성하고 전역 실행 컨텍스트의 LexicalEnvironment 컴포넌트와 VariavleEnvironment 컴포넌트에 바인딩한다.

##### 2-1. 전역 환경레코드 생성

전역렉시컬 환경을 구성하는 컴포넌트인 전역 환경레코드는 전역 변수를 관리하는 <strong>전역 스코프 / 전역객체의 빌트인 객체 / 전역 빌트인 프로퍼티 및 메소드</strong>를 제공한다.

모든 전역 변수가 전역 객체의 프로퍼티가 되는 <strong>ES6 이전</strong>에는 전역 객체가 전역 환경 레코드의 역할을 수행했다. 하지만 ES6의 let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되지 않고 <strong>개념적인 블록 내에 존재하게 된다.</strong>

이처럼 기존의 <strong>var 키워드로 선언한 전역변수와 ES6의 let, const 키워드로 선언한 전역변수를 구분하여 관리하기 위해</strong> 전역스코프 역할을 하는 전역 환경레코드는 객체 환경레코드(Object Environment Record)와 선언적 환경레코드(Declarative Environment Record)로 구성되어 있다.

- 객체 환경레코드의 관리영역

  var 키워드로 선언한 전역변수

  함수선언문으로 정의한 전역함수

  표준빌트인 객체

  전역 빌트인 프로퍼티 및 메소드

- 선언적 환경레코드의 관리영역

  let, const 키워드로 선언한 전역변수

<br>

##### 2-1-1. 객체 환경레코드 생성

전역 환경레코드를 구성하는 컴포넌트인 객체 환경레코드는 BindingObject라 불리는 객체와 연결된다. <strong>BindingObject는 전역객체 생성 시 생성된 전역객체이다.</strong>

전역코드 평가과정에서 var 키워드로 선언한 전역변수와 함수선언문으로 정의된 전역함수는 **전역 환경레코드**의 **객체 환경레코드**에 연결된 BindingObject를 통해 전역객체의 프로퍼티와 메소드가 된다. 그리고 이 때 등록된 식별자를 전역 환경레코드의 객체 환경레코드에서 검색하면 전역객체의 프로퍼티를 검색하여 반환한다.

이것이 var 키워드로 선언된 전역 변수와 함수 선언문으로 정의된 전역 함수가 전역 객체의 프로퍼티와 메소드가 되고 전역 객체의 식별자(window) 없이 전역 객체의 프로퍼티를 참조할 수 있는 메커니즘이다.

```js
var x = 1;
const y = 2;

function foo (a) {
  var x = 3;
  const y = 4;

  function bar (b) {
    const z = 5;
    console.log(a + b + x + y + z);
}
  bar(10);
}

foo(20); // 42
```

![image](https://user-images.githubusercontent.com/62285872/81495991-4a52c980-92ef-11ea-9b4d-6a2453be31b6.png)	

변수 x는 var 키워드로 선언한 변수이다. 따라서 “선언 단계”와 “초기화 단계”가 동시에 진행된다. 다시 말해, 전역 코드 **평가** 시점에 <strong>객체 환경 레코드에 바인딩된 BindingObject에 변수 식별자를 등록</strong>한 다음, 암묵적으로 undefined를 바인딩한다.

따라서 var 키워드로 선언한 변수는 코드 실행 단계(현 시점은 코드 실행 단계가 아니라 코드 평가 단계이다.)에서 변수 선언문 이전에도 참조할 수 있다. 단, 변수 선언문 이전에 참조한 변수의 값은 언제나 undefined이다. var 키워드로 선언한 변수에 할당한 함수 표현식도 이와 동일하게 동작한다. 이것이 변수 호이스팅이 발생하는 원인이다.

함수 선언문으로 정의한 함수가 평가되면 함수 이름과 동일한 이름의 **식별자**를 <strong>객체 환경 레코드에 바인딩된 BindingObject에 등록</strong>하고 생성된 함수 객체를 즉시 할당한다. 이것이 변수 호이스팅과 함수 호이스팅의 차이이다. 즉, 함수 선언문으로 정의한 함수는 함수 선언문 이전에 호출할 수 있다.

<br>

##### 2-1-2. 선언적 환경레코드 생성

var 키워드로 선언한 전역변수와 함수 선언문으로 정의한 전역함수 이외의 선언인 let, const로 선언한 전역변수/함수 는 선언적 환경레코드에 등록 및 관리된다.

![image](https://user-images.githubusercontent.com/62285872/81496088-eda3de80-92ef-11ea-9f68-06de73c72a15.png)	

ES6의 let, const 키워드로 선언한 전역 변수는 전역 객체의 프로퍼티가 되지 않고 개념적인 블록 내에 존재하게 된다고 했다. <strong>여기서 개념적인 블록이 바로 전역 환경 레코드의 선언적 환경 레코드이다.</strong>

let, const 키워드로 선언한 변수도 변수 호이스팅이 발생하는 것은 변함이 없다. 단, let, const 키워드로 선언한 변수는 변수 할당문이 실행되기 이전까지 일시적 사각지대에 빠지기 때문에 참조할 수 없다.

<br>

#### 2-2. 외부 렉시컬한경에 대한 참조할당

외부 렉시컬 환경에 대한 참조는 현재 평가 중인 코드를 포함하는 외부코드의 렉시컬 환경, 즉 상위스코프를 가리킨다. 이를 통해 단방향 링크드 리스트인 스코프 체인을 구현한다.

현재 평가 중인 코드는 전역 코드이다. 전역 코드를 포함하는 코드는 없으므로 전역 렉시컬 환경의 외부 렉시컬 환경에 대한 참조에는 null이 할당된다. <strong>이는 전역 렉시컬 환경이 스코프 체인의 최상위에 존재함을 의미한다.</strong>

<br>

#### 2-3. this 바인딩

<strong>전역환경 레코드</strong>의 [[GlobalThisValue]] 내부슬롯에 this가 바인딩 된다. 일반적으로 전역코드에서 this는 전역객체를 가리키므로 전역환경 레코드의 [[GlobalThisValue]] 내부슬롯에는 전역객체가 바인딩된다. 전역코드에서 this를 참조하면 전역 환경레코드의  [[GlobalThisValue]] 내부슬롯에 바인딩 되어있는 객체가 반환된다.

![image](https://user-images.githubusercontent.com/62285872/81496217-095bb480-92f1-11ea-8b25-d889a74aaa62.png)	

<br>

### 전역코드 실행

전역코드의 평가가 끝나면 전역코드가 순차적으로 실행되기 시작한다. 변수 할당문이 실행되어 전역변수 x, y에 값이 할당되며 함수 foo가 호출된다.

변수할당문 또는 함수호출문을 실행하려면 변수 또는 함수이름이 **선언된** 식별자인지 확인해야한다. 선언되지 않은 식별자는 참조할 수 없으므로 할당이나 호출 또한 불가능하기 때문이다. 또, 식별자는 선언 혹은 정의된 스코프가 다르면 같은 이름을 갖는 것이 가능하다. 따라서 식별자를 참조하기 위해서는 어느 스코프에서 선언된 식별자를 참조해야 하는지 결정이 필요하다. 이를 <strong>식별자 결정</strong>(identifier resolution)이라 한다.  

식별자 결정을 위해 식별자를 검색할 때, <strong>실행 중인 실행컨텍스트에서</strong> 식별자의 검색을 시작한다. 선언된 식별자는 실행컨텍스트의 렉시컬환경의 전역환경레코드에 등록되어 있다.

현재 실행 중인 실행 컨텍스트는 전역 실행 컨텍스트이므로 전역 렉시컬 환경에서 식별자 x, y, foo를 검색하기 시작한다. 만약 실행 중인 실행 컨텍스트의 렉시컬 환경에서 식별자를 검색할 수 없으면 외부 렉시컬 환경에 대한 참조가 가리키는 렉시컬 환경, 즉 상위 스코프로 이동하여 식별자를 검색한다.

이것이 바로 스코프 체인의 동작 원리이다. 하지만 전역 렉시컬 환경은 스코프 체인의 **종점**이므로 전역 렉시컬 환경에서 검색할 수 없는 식별자는 참조 에러(ReferenceError)를 발생시킨다. 식별자 결정에 실패하였기 때문이다.

![image](https://user-images.githubusercontent.com/62285872/81496471-d5818e80-92f2-11ea-9eac-2c6923ea3774.png)

<br>

### foo 함수코드 평가

```js
var x = 1;
const y = 2;

function foo (a) {
  var x = 3;
  const y = 4;

  function bar (b) {
    const z = 5;
    console.log(a + b + x + y + z);
}
  bar(10);
}

foo(20); // 42
```

위 코드에서 전역코드의 평가 및 실행이 완료된 후 foo함수가 **호출**되면 전역코드의 실행을 **일시중단**하고 foo 함수내부로 코드의 **제어권**이 이동하여 함수코드를 평가하기 시작한다.

- 함수코드 평가 순서

  1. 함수 실행컨텍스트 생성

  2. 함수 렉시컬환경 생성

     2-1. 함수 환경레코드 생성

     2-2. 외부 렉시컬 환경에 대한 참조할당

     2-3. this 바인딩

![image](https://user-images.githubusercontent.com/62285872/81496548-66f10080-92f3-11ea-83d0-d1e390da8be8.png)

#### 함수 실행컨텍스트 생성

함수의 평가가 시작되면서 먼저 foo 함수의 실행컨텍스트를 생성한다. 생성된 함수 실행컨텍스트는 <strong>함수 렉시컬 환경이 완성된 다음</strong> 실행컨텍스트 스택에 push된다. 마찬가지로 이 때 foo 함수 실행컨텍스트는 실행컨텍스트 스택의 최상위인 실행 중인 실행컨텍스트가 된다.

<br>

#### 함수 렉시컬환경 생성

foo 함수의 렉시컬환경을 생성하고 foo 함수 실행컨텍스트에 바인딩한다.

렉시컬환경은 환경레코드와 외부 렉시컬환경에 대한 참조로 구성된다.

<br>

##### 함수 환경레코드 생성

함수 렉시컬환경을 구성하는 컴포넌트 중 하나인 함수 환경레코드(Function Environment Record)는 <strong>매개변수 / arguments 객체 / 함수 내에서 선언한 지역변수 혹은 함수 정의를 등록하고 관리한다.</strong>

![image](https://user-images.githubusercontent.com/62285872/81497013-ab31d000-92f6-11ea-97bd-a8e217de7360.png)	

<br>

##### 외부 렉시컬환경에 대한 참조할당

외부 렉시컬환경에 대한 참조에는 <strong>foo 함수 정의가 평가된 시점에  실행 중인 실행 컨텍스트의 렉시컬 환경의 참조가 할당된다.</strong>

foo 함수는 전역코드에 정의된 전역 함수이다. 따라서 foo 함수정의는 전역코드 평가시점에 평가된다. 이 시점에 실행 중인 실행컨텍스트는 <strong>전역 실행컨텍스트</strong>이다. 따라서 외부 렉시컬 환경에 대한 참조에는 <strong>전역 렉시컬 환경의 참조가 할당된다.</strong>

![image](https://user-images.githubusercontent.com/62285872/81497248-3790c280-92f8-11ea-95cf-dd4fe3d11d75.png)	

렉시컬스코프에서 자바스크립트는 함수를 어디서 호출했는지가 아니라 어디에 **정의**했는지에 따라 상위 스코프를 결정한다고 했다. 그리고 함수객체는 자신이 정의된 스코프 즉, 상위스코프를 기억한다고 했다.

자바스크립트 엔진은 함수정의를 평가하여 함수객체를 생성할 때, 현재 실행 중인 실행 컨텍스트의 렉시컬환경, 즉 함수의 상위스코프를 함수 객체의 내부슬롯 [[Environment]]에 저장한다. 함수 렉시컬 환경의 <strong>외부 렉시컬환경에 대한 참조</strong>에 할당되는 것은 바로 함수의 상위 스코프를 가리키는 함수 객체의 내부슬롯 [[Environment]]에 저장된 렉시컬 환경의 참조이다.  즉, 함수 객체의 내부 슬롯 [[Environment]]이 바로 렉시컬 스코프를 구현하는 메커니즘이다.

<br>

#### this 바인딩

함수 환경레코드의 [[ThisValue]] 내부슬롯에 this가 바인딩된다. [[ThisValue]] 내부슬롯에 바인딩될 객체는 <strong>함수의 호출방식에 따라 결정된다.</strong>

위 예제에서 foo 함수는 일반함수로 호출되었으므로 this는 전역객체를 가리킨다. 따라서 함수 환경레코드의 [[ThisValue]] 내부슬롯에는 전역객체가 바인딩 된다. foo 함수내부에서 this를 참조하면 함수 환경레코드의 [[ThisValue]] 내부슬롯에 바인딩 되어있는 객체가 반환된다.

![image](https://user-images.githubusercontent.com/62285872/81497467-9d317e80-92f9-11ea-881a-af9edf645097.png)

<br>

### foo 함수코드 실행

foo 함수코드의 평가가 끝나고 foo 함수코드가 순차적으로 실행되기 시작한다. 매개변수에 인수가 할당되고 변수 할당문이 실행되어 지역변수 x, y에 값이 할당되며 지역함수 bar가 호출된다.

이 때 식별자 결정을 위해 <strong>실행 중인 실행컨텍스트의 렉시컬 환경</strong>에서 식별자를 검색하기 시작한다. 현재 실행 중인 실행 컨텍스트는 foo 함수 실행컨텍스트이므로 foo 함수 렉시컬환경에서 식별자 x, y를 검색하기 시작한다. 만약 실행 중인 실행컨텍스트의 렉시컬환경에서 식별자를 검색할 수 없으면 <strong>외부 렉시컬환경에 대한 참조가 가리키는 렉시컬 환경으로 이동</strong>하여 식별자를 검색한다. 위 예제에서는 현재 실행 중인 함수 실행컨텍스트의 함수 렉시컬환경의 함수 환경레코드에서 해당 변수들이 선언되어 있어 참조가 가능하다.

foo 함수코드의 실행 결과 지역변수 x, y 및 매개변수 a에 값이 할당되게 된다.

![image](https://user-images.githubusercontent.com/62285872/81497612-893a4c80-92fa-11ea-8757-2c9cd0a59697.png)

<br>

### bar 함수코드 평가

지금까지 전역 실행컨텍스트 및 foo 함수의 실행컨텍스트가 생성되어 실행컨텍스트 스택에 쌓여 있으며 foo 함수 코드가 실행되고 있다. foo 함수코드의 제일 마지막에 bar 함수의 호출문이 있는데, 해당 호출문이 실행되면 bar 함수내부로 코드의 제어권이 이동하면서 bar함수의 코드평가가 시작된다.

```js
var x = 1;
const y = 2;

function foo (a) {
  var x = 3;
  const y = 4;

  function bar (b) {
    const z = 5;
    console.log(a + b + x + y + z);
  }
  bar(10);
}

foo(20); // 42
```

bar 함수코드 평가에 의한 실행컨텍스트 및 렉시컬환경의 생성과정은 foo 함수코드와 동일하다.

![image](https://user-images.githubusercontent.com/62285872/81498479-3499d000-9300-11ea-9a94-7d7fcebb6ae1.png)

<br>

### bar 함수코드 실행

bar 함수코드가 실행되면서 매개변수, 지역변수에 값이 할당되게 된다.

![image](https://user-images.githubusercontent.com/62285872/81497796-c226f100-92fb-11ea-91ab-57a9fd61ced9.png)

그리고 `console.log` 메소드가 실행된다. 이코드의 실행순서는 아래와 같다.

1. 식별자 console 검색

제일 먼저 식별자 console을 **스코프체인**에서 검색한다. 스코프체인은 현재 실행 중인 실행 컨텍스트의 렉시컬환경에서 시작하여 외부 렉시컬 환경에 대한 참조로 이어지는 렉시컬 환경의 연속이다. 따라서 식별자를 검색할 때는 언제나 <strong>현재 실행 중인 실행 컨텍스트의 렉시컬환경에서 검색하기 시작한다.</strong>

현재 실행 중인 실행컨텍스트는 bar 함수 실행컨텍스트 이므로 bar 함수 실행컨텍스트의 함수 렉시컬 환경에서 console 식별자 검색을 시작한다. 

해당 렉시컬환경에는 console 식별자가 없으므로 스코프 체인상의 상위스코프인 외부 렉시컬환경에 대한 참조가 가리키는(내부슬롯 [[Environment]]의 참조값) foo 함수의 렉시컬 환경으로 이동하여 console 식별자를 검색한다. 

동일하게 foo 함수에도 console 식별자가 없으므로 foo 함수 렉시컬환경에서 외부 렉시컬환경에 대한 참조가 가리키는 전역 렉시컬 환경으로 이동하여 식별자를 검색한다.

전역 렉시컬환경은 객체 환경레코드와 선언적 환경레코드로 구성된 전역 환경레코드와 외부 렉시컬환경에 대한 참조 값으로 이루어져 있다. console 식별자는 객체 환경레코드의 BindingObject, 즉 전역객체에서 찾을 수 있다.

 <br>

2. log 메소드 검색

console 식별자를 찾았으니 console 객체의 프로토타입 체인에서 log 메소드를 검색한다. log 메소드는 상속된 프로퍼티가 아니라 console 객체가 직접 소유하는 프로퍼티 이다.

<br>

3. 표현식 a + b + x + y + z의 평가

이제 console.log 메소드에 전달할 인수, 즉 표현식 `a + b + x + y + z`를 평가하기 위해 식별자 a, b, x, y, z 검색한다. 식별자는 스코프 체인, 즉 현재 실행 중인 실행 컨텍스트의 렉시컬 환경에서 시작하여 외부 렉시컬 환경에 대한 참조로 이어지는 렉시컬 환경의 연속에서 검색한다.

식별자 a는 foo 함수 렉시컬 환경에서, 식별자 b는 bar 함수 렉시컬 환경에서, 식별자 x와 y는 foo 함수 렉시컬 환경에서, 식별자 z는 bar 함수 렉시컬 환경에서 검색된다.

<br>

4. console.log 메소드 호출

표현식 `a + b + x + y + z`가 평가되어 생성한 값 42(20 + 10 + 3 + 4 + 5)를 console.log 메소드에 전달하여 호출한다.

<br>

### bar 함수코드 실행종료

console.log 메소드가 호출되면 더 이상 실행할 코드가 없으므로 bar 함수코드의 실행이 종료된다. 이 때 실행컨텍스트 스택에서 bar 함수 실행컨텍스트가 pop되어 제거되고 foo 실행컨텍스트가 실행 중인 컨텍스트가 된다.(실행컨텍스트 스택의 최상위)

하지만, 실행컨텍스트 스택에서 bar 함수 실행컨텍스트가 제거되었다고 해서 bar 함수의 렉시컬 환경까지 즉시 소멸하는 것은 아니다. 렉시컬환경은 실행컨텍스트에 의해 참조되기는 하나 <strong>독립적인 객체</strong>이다. 객체를 포함한 모든 값은 누군가에 의해 참조되지 않을 때 비로소 가비지 컬렉터에 의해 '해제'되어 소멸된다.

<strong>bar 함수 실행 컨텍스트가 소멸되었다 하더라도 만약 bar 함수 렉시컬 환경을 누군가 참조하고 있다면 bar 함수 렉시컬 환경은 소멸하지 않는다.</strong>

<br>

### foo 함수코드 실행종료

foo 함수코드의 제일 마지막 문은 bar 함수 호출문으로 bar함수의 호출이 완료되면 foo 함수 역시 더 이상 실행할 코드가 없으므로 foo 함수코드의 실행이 종료된다.

이 때 실행컨텍스트 스택에서 foo 함수 실행컨텍스트가 pop되어 제거되고 전역 실행컨텍스트가 실행 중인 실행 컨텍스트가 된다.

<br>

### 전역코드 실행종료

foo 함수가 종료하면 더 이상 실행할 전역 코드가 없으므로 전역 코드의 실행이 종료되고 전역 실행 컨텍스트도 실행 컨텍스트 스택에서 pop되어 실행 컨텍스트 스택에는 아무것도 남아있지 않게 된다.

<br>

## 실행컨텍스트와 블록레벨 스코프

var 키워드로 선언한 변수는 오로지 <strong>함수의 코드 블록 만을 지역 스코프로 인정</strong>하는 함수 레벨 스코프를 따른다.

하지만 let 키워드로 선언한 변수는 <strong>모든 코드 블록(함수, if 문, for 문, while 문, try/catch 문 등) 을 지역 스코프로 인정</strong>하는 블록 레벨 스코프(Block-level scope)를 따른다.

```js
let x = 1;

if (true) {
  let x = 10;
  console.log(x); // 10
}

console.log(x); // 1
```

if 문의 코드 블록 내에서 let 키워드로 변수가 선언되었다. 따라서 if 문이 실행되면 if 문의 블록 레벨 스코프를 생성해야 한다. 이를 위해 if 문을 위한 선언적 환경 레코드를 갖는 <strong>렉시컬 환경을 새롭게 생성</strong>하여 기존의 전역 렉시컬 환경을 **교체**한다. 이때 새롭게 생성된 if 문을 위한 렉시컬 환경의 외부 렉시컬 환경에 대한 참조는 교체된 이전의 전역 렉시컬 환경을 가리킨다. 

![image](https://user-images.githubusercontent.com/62285872/81498300-05369380-92ff-11ea-8f7c-269dab7e9391.png)

<strong>if문이 실행이 종료되면 if 문이 실행되기 이전의 렉시컬 환경으로 되돌린다.</strong>

![image](https://user-images.githubusercontent.com/62285872/81641134-40e67000-945b-11ea-9c8f-25a3ee2c213e.png)

이는 if 문 뿐만이 아니라 모든 블록문에 적용된다.

<strong>for 문의 경우, 초기문에 let 키워드를 사용한 for 문은 반복될 때마다 새로운 렉시컬 환경을 생성한다.</strong> 만약 for 문 내에서 정의된 함수가 있다면 이 함수의 상위 스코프는 for 문이 생성한 렉시컬 환경이다. 이때 함수의 상위 스코프는 for 문이 반복될 때 마다 식별자(초기화 변수 및 for 문 내 지역 변수 등)의 값을 유지해야 한다. 이를 위해 for 문이 반복될 때마다 독립적인 렉시컬 환경을 생성하여 식별자의 값을 유지한다. 이에 대해서는 뒷 장인 클로저에서 자세히 살펴보도록 하자.