# 브라우저의 렌더링 과정

- Toc

1. [요청과 응답](#요청과-응답)
2. [HTTP1.1 / HTTP 2.0](#HTTP11--HTTP-20)
3. [HTML 파싱과 DOM 생성](#HTML-파싱과-DOM-생성)
4. [CSS 파싱과 CSSOM 생성](#CSS-파싱과-CSSOM-생성)
5. [렌더트리 생성](#렌더트리-생성)
6. [자바스크립트 파싱과 실행](#자바스크립트-파싱과-실행)
7. [리플로우&리페인트](#리플로우리페인트)
8. [자바스크립트 파싱에의한 HTML 파싱중단](#자바스크립트-파싱에의한-HTML-파싱중단)
9. [async, defer 어트리뷰트](#async-defer-어트리뷰트)

<br>

<br>

> 파싱(parsing)?
>
> 파싱의 사전적 의미는 구문분석(Syntax Analysis)이다. 파싱은 프로그래밍 언어의 문법에 맞게 작성된 텍스트 문서를 읽어들여 실행하기 위해 텍스트 문서의 문자열을 토큰(token, 문법적으로 더이상 나눌 수 업는 코드의 기본요소)으로 분해하고 토큰에 문법적 의미와 구조를 반영하여 트리구조의 자료구조인 parse tree를 생성하는 일련의 과정을 말한다. 일반적으로 파싱이 완료된 이후에는 파스트리를 기반으로 중간언어인 바이트코드(특정한 하드웨어가 아니라 가상머신에서 실행하도록 만든 Binary code)를 생성하고 실행한다.

> 렌더링(rendering)?
>
> HTML, CSS, JS로 작성된 문서를 파싱하여 브라우저에 시각적으로 출력하는 것.

- 브라우저의 렌더링 과정

1. 브라우저는 HTML, CSS, JS, 이미지, 폰트 파일 등의 렌더링에 필요한 리소스를 server에 요청하고 응답을 받는다.
2. 브라우저의 렌더링 엔진은 서버로부터 응답된 HTML, CSS를 파싱하여 DOM(Documnet Object Model)과 CSSOM(CSS Object Model)을 생성하고 이들을 결합하여 Render tree를 생성한다.
3. 브라우저의 자바스크립트 엔진은 서버로부터 응답된 자바스크립트를 파싱하여 AST(Abstract Syntax Tree)를 생성하고 바이트 코드로 변환하여 실행한다. 이 때, 자바스크립트는 DOM API를 통해 DOM, CSSOM을 변경할 수 있다. 변경된 DOM과 CSSOM은 다시 render tree로 결합된다.
4. render tree를 기반으로 HTML요소의 레이아웃을 계산하고 브라우저의 화면에 HTML요소를 페인팅 한다.

<br>

## 요청과 응답

브라우저의 핵심 기능은 필요한 리소스를 **서버**에 **요청**하고 서버의 **응답**을 받아 브라우저에 시각적으로 **렌더링**하는 것이다. 즉, 렌더링에 필요한 리소스는 모두 서버에 존재하므로 필요한 리소스를 서버에 요청하고 서버가 응답한 리소스를 파싱하여 렌더링 한다.

서버에 요청하기 위해 브라우저는 **주소창**을 제공한다. 브라우저의 주소창에 URL을 입력하고 엔터 키를 입력하면 URL의 호스트 이름은 [DNS(Domain Name System)](https://ko.wikipedia.org/wiki/도메인_네임_시스템)를 통해 IP주소로 변환되고 이 IP 주소를 갖는 서버에게 요청을 전송한다.

![image](https://user-images.githubusercontent.com/62285872/82540974-b3a5c880-9b8a-11ea-8622-677966f85c5a.png)

서버에게 요청하여 응답받은 리소스들은 브라우저의 Network 패널에서 확인이 가능하다.

![image](https://user-images.githubusercontent.com/62285872/82541648-c4a30980-9b8b-11ea-9050-5b31a8eddcc5.png)

위 그림을 살펴보면 index.html(poiemaweb.com)뿐만 아니라 CSS, 자바스크립트, 이미지, 폰트 파일들도 응답된 것을 확인할 수 있다. 요청도 하지 않은 이들 리소스가 왜 응답되었을까?

이는 브라우저의 렌더링 엔진이 HTML(index.html)을 파싱하는 도중에 외부 리소스를 로드하는 태그, 즉 CSS 파일을 로드하는 link 태그, 이미지 파일을 로드하는 이미지 태그, 자바스크립트를 로드하는 script 태그 등을 만나면 <strong>HTML의 파싱을 일시 중단하고 해당 리소스 파일을 서버로 요청</strong>하기 때문이다.

<br>

## HTTP1.1 / HTTP 2.0

HTTP(Hyper Text Trasfer Protocol)는 웹에서 브라우저와 서버가 통신을 하기 위한 프로토콜(규약)이다. 

- HTTP의 역사

1. 1989년 HTML, URL과 함께 팀 버너스리가 고안
2. 1991년 최초로 문서화
3. 1996년 HTTP/1.0 발표
4. 1999년 HTTP/1.1 발표
5. 2015년 HTTP/2 발표

<strong>HTTP/1.1은 기본적으로 커넥션 당 하나의 요청가 응답 만을 처리한다.</strong> 즉, 여러개의 요청을 한번에 전송할 수 없고 응답 또한 마찬가지이다. 따라서 HTML 문서 내에 포함된 여러개의 리소스 요청인 CSS 파일을 로드하는 link 태그 / 이미지 파일을 로드하는 image 태그 / 자바스크립트를 로드하는 script 태그 등에 의한 리소스 요청이 개별적으로 전송되고 응답 또한 개별적으로 전송되었다. 이처럼 HTTP/1.1은 리소스의 동시 전송이 불가능한 구조이므로 요청할 리소스의 개수에 비례하여 응답 시간도 증가하는 단점이 있다.

HTTP/2.0은 커넥션 당 여러개의 요청가 응답, 즉 다중 요청/응답이 가능하다. 따라서 HTTP/2.0은 여러개의 리소스의 동시전송이 가능하므로 HTTP/1.1에 비해 페이지 로드속도가 약 50% 정도 빠르다고 한다.

<br>

### HTML 파싱과 DOM 생성

브라우저의 요청에 의해 서버가 응답한 HTML 문서는 **문자열**로 이루어진 **순수한** **텍스트**이다. 순수한 텍스트인 HTML 문서를 브라우저에 시각적인 픽셀로 렌더링하려면 HTML 문서를 브라우저가 이해할 수 있는 자료구조(객체)로 변환하여 메모리에 저장해야 한다.

```HTML
<!-- HTML -->

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
```

서버로 부터 위와 같은 HTML 문서를 응답받았다면, 브라우저의 렌더링 엔진은 아래와 같은 과정을 통해 응답받은 HTML 문서를 파싱하여 DOM을 생성한다.

![image](https://user-images.githubusercontent.com/62285872/82542796-89a1d580-9b8d-11ea-8af6-01a9bfe5ab27.png)

1. 서버에 존재하던 HTML 파일이 브라우저의 요청에 의해 응답된다. 이 때, 서버는 요청된 HTML 파일을 읽어들여 메모리에 저장한 다음 메모리에 저장된 바이트(2진수)를 인터넷을 경유하여 응답한다.
2. 브라우저는 서버가 응답한 HTML 문서를 바이트의 형태로 응답받는다. 그리고 바이트 형태의 HTML 문서는 meta 태그의 charset 어트리뷰트에 의해 지정된 인코딩 방식(ex.UTF-8)을 기준으로 문자열로 변환된다.
3. 문자열로 변환된 HTML 문서를 읽어들여 문법적 의미를 갖는 코드의 최소단위인 토큰들로 분해한다.
4. 각 토큰들을 객체로 변환하여 노드(Node)들을 생성한다. 토큰의 내용에 따라 문서노드 / 요소노드 / 어트리뷰트 노드 / 텍스트 노드가 생성된다. 노드는 이후 DOM을 구성하는 기본요소가 된다.
5. HTML 문서는 HTML 요소들의 집합으로 이루어지며 HTML 요소는 **중첩관계**를 갖는다. 즉, HTML 요소의 컨텐츠영역 (시작태그와 종료태그 사이)에는 텍스트 뿐만 아니라 다른 HTML 요소도 포함될 수 있다. 이 때 HTML 요소 간에는 **중첩관계**에 의해 **부자관계**가 형성된다. 이러한 HTML 요소 간의 부자관계를 반영하여 모든 노드들을 트리 자료구조로 구성한다. 이 노드들로 구성된 트리자료구조를 **DOM**이라 부른다.

DOM은 HTML문서를 파싱한 결과물이다.

<br>

## CSS 파싱과 CSSOM 생성

렌더링 엔진은 HTML을 처음부터 **한줄씩** **순차적**으로 파싱하여 DOM을 생성해 나간다. 이처럼 렌더링 엔진은 DOM을 생성해 나가다가 CSS를 로드하는 link 태그나 style 태그를 만나면 DOM 생성을 일시 중단한다.

그리고 link 태그의 href 어트리뷰트에 정의된 CSS 파일을 서버에 요청하여 로드된 CSS나 style 태그 내의 CSS를 HTML과 동일한 파싱과정(바이트 -> 문자 -> 토큰 -> 노드 -> CSSOM)을 거치며 해석하여 CSSOM을 생성한다. 이후 CSS 파싱을 완료하면 HTML 파싱이 중단된 지점부터 다시 HTML을 파싱하기 시작하여 DOM 생성을 재개한다.

위에서 살펴본 index.html을 다시 살펴보자. index.html에는 CSS 파일을 로드하는 link 태그가 존재한다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
```

렌더링 엔진은 meta 태그까지 HTML을 순차적으로 해석한 다음, link 태그를 만나면 DOM 생성을 일시 중단하고 link 태그의 href 어트리뷰트에 정의된 CSS 파일을 서버에 요청한다.

예를들어 아래와 같은 style.css 파일이 서버로부터 응답되었다고 가정해보자.

```css
body {
    font-size: 18px;
}
ul {
    list-style-tpe: none;
}
```

서버로부터 CSS 파일이 응답되면 렌더링 엔진은 HTML과 동일한 해석과정을 거쳐 CSS를 파싱하여 CSSOM을 생성한다.

CSSOM은 CSS의 **상속**을 반영하여 생성된다. 위 예제에서 body 요소에 적용한 `font-size` 프로퍼티와 ul요소에 적용한 `list-style-type` 프로퍼티는 모든 li요소에 상속된다. 이러한 상속관계가 반영되어 CSSOM이 생성된다.

![image](https://user-images.githubusercontent.com/62285872/82550407-6ed55e00-9b99-11ea-8017-6c7fefea2cff.png)

<br>

## 렌더트리 생성

렌더링 엔진은 서버로부터 응답된 HTML과 CSS를 파싱하여 각각 DOM과 CSSOM을 생성한다. 그리고 DOM과 CSSOM은 렌더링을 위해 **렌더트리**(render tree)로 결합된다.

렌더트리는 렌더링을 위한 트리구조의 자료구조이다. 따라서 브라우저 화면에 렌더링되지 않는 노드(meta / srcript.. 등등의 태그)와 CSS에 의해 비표시(ex.display: none)되는 노드들을 포함하지 않는다. 다시 말해 렌더트리는 브라우저 화면에 렌더링 되는 노드들만 구성된다.

![image](https://user-images.githubusercontent.com/62285872/82550942-4a2db600-9b9a-11ea-9f79-670b60e3e636.png)

이후 완성된 렌더트리는 각 HTML 요소의 레이아웃 계산에 사용되며 브라우저 화면에 픽셀을 렌더링하는 페인팅처리에 입력된다.

![image](https://user-images.githubusercontent.com/62285872/82551069-806b3580-9b9a-11ea-98de-69b71472f481.png)

브라우저의 렌더링 과정은 반복해서 실행될 수 있다. 아래와 같은 경우에 반복해서 레이아웃 계산과 페인팅이 재차 실행된다.

- 자바스크립트에 의한 노드 **추가** 또는 **삭제**
- 브라우저 윈도우의 리사이징에 의한 Viewport 크기변경
- HTML 요소의 레이아웃에 변경을 발생시키는 width/height, margin, padding, border, display, position, top/right/bottom/left 등의 스타일 변경

레이아웃 계산과 페인팅이 다시 실행되는 리렌더링(리페인팅)은 비용이 많이드는, 렌더링 속도에 악영향을 주는 작업이므로 가급적 리렌더링이 발생하지 않도록 주의가 필요하다.

<br>

## 자바스크립트 파싱과 실행

HTML 문서를 파싱한 결과물로 생성된 DOM은 HTML 문서의 구조와 정보 뿐 아니라 HTML요소와 스타일 등을 변경할 수 있는 프로그래밍 인터페이스로서 <strong>DOM API</strong>를 제공한다. 자바스크립트 코드에서 DOM API를 사용하면 이미 생성된 DOM을 동적으로 조작할 수 있다.

CSS 파싱과정과 마찬가지로 렌더링 엔진은 HTML을 한줄씩 순차적으로 파싱하며 DOM을 생성해 나가다가 자바스크립트 파일을 로드하는 script 태그나 자바스크립트 코드를 컨텐츠로 갖는 script 태그를 만나면 DOM 생성을 일시 중단한다. 그리고 script 태그의 src 어트리뷰트에 정의된 자바스크립트 파일을 서버에 요청하여 로드한 자바스크립트 코드나 script 태그내의 자바스크립트 코드의 파싱을 위해 <strong>자바스크립트 엔진에 제어권을 넘긴다.</strong> 이후 자바스크립트 파싱과 실행이 종료되면 렌더링 엔진으로 다시 제어권을 넘겨 HTML 파싱이 중단된 지점부터 다시 HTML 파싱을 시작하여 DOM 생성을 재개한다.

> <strong>자바스크립트 파싱과 실행</strong>은 브라우저의 렌더링 엔진이 아닌 <strong>자바스크립트 엔진</strong>이 처리한다. 자바스크립트 엔진은 자바스크립트 코드를 CPU가 이해할 수 있는 저수준 언어로 변환하는 역할을 한다. 자바스크립트 엔진은 구글 크롬과 Node.js의 V8, 파이어폭스의 SpiderMonkey, 사파리의 JavaScriptCore 등 다양한 종류가 존재하며, 모든 자바스크립트 엔진은 ECMAScript 사양을 준수한다.

렌더링 엔진으로부터 제어권을 넘겨받은 자바스크립트 엔진은 자바스크립트 코드를 **파싱**하기 시작한다. 렌더링 엔진이 HTML과 CSS를 파싱하여 DOM과 CSSOM을 생성하듯이 자바스크립트 엔진은 자바스크립트를 해석하여 **AST**(추상적 구문트리)를 생성한다. 그리고 AST를 기반으로 인터프리터가 실행할 수 있는 중간코드인 **바이트 코드**를 생성하여 실행한다.

![image](https://user-images.githubusercontent.com/62285872/82552791-c4ac0500-9b9d-11ea-9f98-96577832817a.png)

- 토크나이징(tokenizing)

단순한 문자열인 소스코드를 어휘분석(Lexical analysis)하여 문법적의미를 갖는 코드의 최소 단위인 토큰들로 분해한다.

- 파싱(parsing)

토큰들의 집합을 구문분석(Syntactic analysis)하여 AST를 생성한다. AST는 토큰에 문법적 의미와 구조를 반영한 트리구조의 자료구조이다. AST는 인터프리터나 컴파일러만이 사용하는 것은 아니다. AST를 사용하면 Typescript, Babel, Prettier와 같은 트랜스파일러를 구현할 수도 있다.

- 바이트 코드 생성과 실행

파싱의 결과물로 생성된 AST는 인터프리터가 실행할 수 있는 중간코드인 바이트코드(Bytecode)로 변환되고 인터프리터에 의해 실행된다. 참고로 V8 엔진의 경우, 자주 사용되는 코드는 터보팬이라 불리는 컴파일러에 의해 최적화된 머신코드로 컴파일되어 성능을 최적화한다. 만약 코드의 사용빈도가 적어지면 다시 디옵티마이징(Deoptimizing)하기도 한다.

<br>

## 리플로우&리페인트

만약 자바스크립트 코드에 DOM이나 CSSOM을 변경하는 DOM API가 사용된 경우, DOM이나 CSSOM이 변경된다. 변경된 DOM과 CSSOM은 다시 렌더트리로 결합되고 변경된 렌더트리를 기반으로 레이아웃과 페인팅 과정을 거쳐 브라우저의 화면에 재 렌더링한다. 이를 리플로우(reflow) 혹은 리페인트(repaint)라 한다.

리플로우는 레이아웃 계산을 다시하는 것을 말하며 노드의 추가/삭제, 요소의 크기/위치 변경, 윈도우 리사이징 등 레이아웃에 영향을 주는 변경이 발생한 경우에 한하여 실행된다.

리페인트는 재결합된 렌더트리를 기반으로 다시 페인트칠을 하는 것을 말한다.

따라서 리플로우와 리페인트가 반드시 순차적으로 동시에 실행되는 것은 아니다. 레이아웃에 영향이 없는 변경은 리플로우 없이 리페인트만 실행된다.

<br>

## 자바스크립트 파싱에의한 HTML 파싱중단

렌더링 엔진과 자바스크립트 엔진은 병렬적이 아닌 <strong>직렬적으로 파싱을 수행한다.</strong>

브라우저는 동기적(Synchronous)으로 top-down 방향으로 순차적으로 HTML, CSS, JS를 파싱하고 실행한다. 이것은 script 태그의 위치에 따라 HTML 파싱이 블로킹되어 DOM 생성이 지연될 수 있다는 것을 의미한다. 따라서 <strong>script 태그의 위치</strong>는 중요한 의미를 갖는다.

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <link rel="stylesheet" href="style.css">
    <script>
      // DOM에서 id가 apple인 HTML 요소를 취득한다.
      // 아래 DOM API가 실행되는 시점에는 아직 apple 요소를 파싱하지 않았기 때문에
      // DOM에는 apple 요소가 포함되어 있지 않다.
      // 따라서 아래 코드는 정상적으로 apple 요소를 선택하지 못한다.
      const $apple = document.getElementById('apple');

      // apple 요소의 css color 프로퍼티 값을 변경한다.
      $apple.style.color = 'red'; // TypeError: Cannot read property 'style' of null
    </script>
  </head>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
  </body>
</html>
```

위 코드에서 DOM API `document.querySelector('#apple')`를 실행하는 시점에는 아직 DOM API가 참조하는 HTML요소(#apple)가 파싱되어 DOM에 포함되지 않은 상태이므로 위 예제는 정상적으로 동작하지 않는다. 이러한 문제를 회피하기 위해 body요소의 가장 아래에 스크립트 태그를 위치 시키기도 한다.

### 스크립트 태그를 이동하는 이유

- DOM이 완성되지 않은 상태에서 자바스크립트가 DOM을 조작하면 에러가 발생한다.
- 자바스크립트 스크립트의 로딩/파싱/실행으로 인해 HTML 요소들의 렌더링에 지장받는 일이 발생하지 않아 페이지 로딩시간이 단축된다.

<br>

## async, defer 어트리뷰트

자바스크립트 파싱에 의해 DOM 생성이 중단되는 문제를 근본적으로 해결하기 위해 HTML5부터 <strong>script 태그에 async와 defer 어트리뷰트가 추가되었다.</strong>

async와 defer 어트리뷰트는 src 어트리뷰트를 통해 외부 자바스크립트 파일을 로드하는 경우에만 사용한다. 즉, src 어트리뷰트가 없는 <strong>인라인 자바스크립트에는 사용할 수 없다.</strong>

```html
<script async src="extern.js"></script>
<script defer src="extern.js"></script>
```

async와 defer 어트리뷰트를 사용하면 HTML 파싱과 외부 자바스크립트 파일의 로드가 비동기적으로 동시에 진행된다. 하지만 자바스크립트의 실행시점에는 차이가 있다.

1. async 어트리뷰트

<strong>HTML 파싱</strong>과 외부 자바스크립트 파일의 **로드**가 비동기적으로 **동시에** 진행된다. <strong>단, 자바스크립트의 파싱과 실행은 자바스크립트 로드가 완료된 직후 진행되며 이 때, HTML의 파싱이 중단된다.</strong>

여러개의 script 태그에 async어트리뷰트를 지정하면 script 태그의 순서와는 상관없이 로드가 완료된 자바스크립트부터 먼저 실행되므로 <strong>순서가 보장되지 않는다.</strong> 따라서 순서보장이 필요한 script 태그에는 async 어트리뷰트를 지정하지 않아야 한다.

![image](https://user-images.githubusercontent.com/62285872/82556704-3b98cc00-9ba5-11ea-8eda-2f6a4ab3f8e9.png)

2. defer 어트리뷰트

HTML 파싱과 외부 자바스크립트 파일의 로드가 **비동기적**으로 동시에 진행된다. <strong>단, 자바스크립트의 파싱과 실행은 HTML파싱이 완료된 직 후, 즉 DOM 생성이 완료된 직 후 진행된다.</strong> 따라서 DOM 생성이 완료된 이후(이 때 DOMContentLoaded 이벤트가 발생.) 실행되어야 할 자바스크립트에 유용하다.

![image](https://user-images.githubusercontent.com/62285872/82556770-5e2ae500-9ba5-11ea-8e43-3ff151f6061b.png)