# DOM(Documents Of Model)

- Toc

1. [노드](#노드)

   1-1. [HTML 요소와 노드객체](#HTML-요소와-노드객체)

   1-2. [노드 객체의 타입](#노드-객체의-타입)

   1-3. [노드객체의 상속구조](#노드객체의-상속구조)

2. [요소 노드 취득](#요소-노드-취득)

   2-1. [id로 요소 노드 취득](#id로-요소-노드-취득])

   2-2. [태그 이름으로 요소노드 취득](#태그-이름으로-요소노드-취득)

   2-3. [class로 요소노드 취득](#class로-요소노드-취득)

   2-4. [CSS 선택자로 요소노드 취득](#CSS-선택자로-요소노드-취득)

   2-5. [탐색 가능여부 확인](#탐색-가능여부-확인)

   2-6. [HTMLCollection과 NodeList](#HTMLCollection과-NodeList)

3. [노드탐색](#노드탐색)

   3-1. [공백 텍스트노드](#공백-텍스트노드)

   3-2. [자식노드 탐색](#자식노드-탐색)
   
   3-3. [자식노드 존재확인](#자식노드-존재확인)
   
   3-4. [텍스트 노드 탐색](#텍스트-노드-탐색)
   
   3-5. [형제 노드 탐색](#형제-노드-탐색)
   
4. [노드 정보 취득](#노드-정보-취득)

5. [요소 노드의 텍스트 조작](#요소-노드의-텍스트-조작)

   5-1. [nodeValue](#nodevalue)

   5-2. [textContent](#textcontent)

6. [DOM 조작](#dom-조작)

   6-1. [innerHTML](#innerhtml)

   6-2. [insertAdjacentHTML 메소드](#insertadjacenthtml-메소드)

   6-3. [노드 생성과 추가](#노드-생성과-추가)

   6-4. [복수 노드 생성과 추가](#복수-노드-생성과-추가)

   6-5. [노드 삽입](#노드-삽입)

   6-6. [노드 이동](#노드-이동)

   6-7. [노드 복사](#노드-복사)

   6-8. [노드 교체](#노드-교체)

   6-9. [노드 삭제](#노드-삭제)

7. [어트리뷰트](#어트리뷰트)

   7-1. [어트리뷰트 노드와 attribute 프로퍼티](#어트리뷰트-노드와-attribute-프로퍼티)

   7-2. [HTML 어트리뷰트 조작](#html-어트리뷰트-조작)

   7-3. [HTML 어트리뷰트 & DOM 프로퍼티](#html-어트리뷰트--DOM-프로퍼티)

8. [스타일](#스타일)

   8-1. [인라인 스타일 조작](#인라인-스타일-조작)
   
   8-2. [클래스 조작](#클래스-조작)
   
   8-3. [요소에 적용되어 있는 CSS 스타일 참조](#요소에-적용되어-있는-CSS-스타일-참조)
   
9. [DOM 표준](#DOM-표준)

<br>

<br>

DOM은 HTML문서의 <strong>계층적 구조와 정보</strong>를 표현하며 이를 제어할 수 있는 API, 즉 프로퍼티와 메소드를 제공하는 트리 자료구조이다.

## 노드

### HTML 요소와 노드객체

HTML요소는 HTML 문서를 구성하는 개별적인 요소를 의미한다. HTML요소는 렌더링 엔진에 의해 파싱되어 DOM을 구성하는 요소 노드 **객체**로 변환된다. 이 때 HTML요소의 어트리뷰트는 <strong>어트리뷰트 노드</strong>로, HTML요소의 텍스트 컨텐츠는 <strong>텍스트 노드</strong>로 변환된다.

![image](https://user-images.githubusercontent.com/62285872/82722813-e96ebc80-9d04-11ea-844f-58f27edd5e76.png)

HTML문서는 HTML 요소들의 집합으로 이루어지며 HTML요소는 중첩관계를 갖는다. 즉, HTML요소간에는 중첩관계에 의해 계층적인 부자관계가 형성된다. 이러한 HTML요소간의 부자관계를 반영하여 HTML 문서의 구성요소인 HTML요소를 객체화한 모든 노드 객체들을 트리자료 구조로 구성한다.

> 트리자료구조
>
> 트리자료구조(tree data structure)는 노드들의 계층구조로 이루어진다. 즉, 트리자료구조는 부모노드와 자식노드로 구성되어 노드간의 계층적 부자관계를 표현하는 비선형 자료구조를 말한다. 트리자료 구조는 하나의 최상위 노드에서 시작한다. 최상위 노드는 부모노드가 없으며 루트노드(root node)라 한다. 루트노드는 0개이상의 자식노드를 갖는다. 자식노드가 없는 노드를 리프노드(leaf node)라 한다.
>
> ![image](https://user-images.githubusercontent.com/62285872/82722820-fa1f3280-9d04-11ea-8488-18909381bec7.png)	

이 노드객체들로 구성된 트리자료구조를 DOM이라 한다. 노드객체의 트리로 구조화되어 있기 때문에 DOM을 DOM트리 라고 부르기도 한다.

<br>

### 노드 객체의 타입

```html
<!DOCTYPE html>
<html lang="kor">

<head>
  <meta charset="UTF-8">
  <meta name="author" content="Lee woo seong">
  <meta name="description" content="자바스크립트 연습용 예제 페이지 입니다.">
  <meta name="keyword" content="자바스크립트, javascript, practice">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>java script practice</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>
  <div class="greeting">Hello</div>
  <ul>
    <li id="apple">Apple</li>
    <li id="banana">Banana</li>
    <li id="orange">Orange</li>
  </ul>
  <script src="app.js" ></script>
</html>
```

렌더링 엔진은 위 HTML 문서를 파싱하여 아래와 같이 DOM을 생성한다.

![image](https://user-images.githubusercontent.com/62285872/82722988-3acb7b80-9d06-11ea-86d0-94582a2da92d.png)

> 공백 텍스트노드
>
> 위 그림에는 공백 텍스트노드가 제외되어 있다. <strong>HTML요소사이의 개행이나 공백</strong>은 텍스트 노드가 된다.

이처럼 DOM은 노드객체의 계층적인 구조로 구성된다. 노드객체는 종류가 있고 상속구조를 갖는다. 노드객체는 총 12개의 종류가 있다. 그 중 중요한 노드타입 4가지는 아래와 같다.

- 문서노드

문서노드(Documents node)는 DOM 트리의 최상위에 존재하는 **루트노드**로 **document객체**를 가리킨다. document 객체는 브라우저가 렌더링한 HTML 문서 전체를 가리키는 객체로 전역객체 window의 document 프로퍼티에 바인딩 되어있다. 따라서 window.document 또는 document로 참조할 수 있다.

브라우저 환경의 모든 자바스크립트 코드는 script 태그에 의해 분리되어 있어도 하나의 전역객체(window)를 공유한다. 따라서 모든 자바스크립트 코드는 전역객체 window의 document프로퍼티에 바인딩되어있는 하나의 document객체를 바라본다. 즉, HTML 문서 당 document 객체는 유일하다.

문서노드인 document 객체는 DOM 트리의 루트노드이므로 DOM 트리의 노드들에 접근하기 위한 **진입점**(entry point)역할을 담당한다. <strong>다시말해 요소 / 어트리뷰트 / 텍스트 노드에 접근하려면 문서노드를 통해야 한다.</strong>

- 요소노드

요소노드(Element node)는 HTML 요소를 가리키는 객체이다. 요소노드는 HTML 요소간의 중첩에 의해 **부자관계**를 가지며 이 부자관계를 통해 정보를 구조화한다. 따라서 요소노드는 <strong>문서의 구조</strong>를 표현한다고 할 수 있다.

- 어트리뷰트 노드

어트리뷰트노드(Attribute node)는 HTML 요소의 어트리뷰트를 가리키는 객체이다. <strong>어트리뷰트 노드는 어트리뷰트가 지정된 HTML 요소의 요소노드와 형제관계를 갖는다.</strong> 따라서 요소노드에 접근하면 어트리뷰트 노드에 접근하여 어트리뷰트를 참조하거나 변경할 수 있다.

- 텍스트노드

텍스트노드(Text node)는 HTML 요소의 텍스트를 가리키는 객체이다. 텍스트 노드는 <strong>요소노드의 자식노드</strong>이며 자신의 자식노드를 가질 수 없는 **리프노드**(leaf node)이다. 리프노드인 <strong>텍스트노드는 DOM 트리의 최종단이다.</strong>

<br>

### 노드객체의 상속구조

DOM은 HTML 문서의 계층적 구조와 정보를 표현하며 이를 제어할 수 있는 **API**, 즉 프로퍼티와 메소드를 제공하는 트리 자료구조이다. DOM을 구성하는 노드객체는 자신의 구조와 정보를 제어할 수 있는 DOM API를 사용할 수 있다. 이를 통해 노드객체는 자신의 부모 또는 자식을 탐색할 수 있으며 자신의 컨텐츠를 조작할 수도 있다.

DOM을 구성하는 노드객체는 ECMAScript 사양에 정의된 표준 빌트인 객체가 아니라 브라우저 환경에서 추가적으로 제공하는 호스트객체이다. 하지만 노드 객체도 자바스크립트의 객체이므로 프로토타입에 의한 상속구조를 갖는다.

![image](https://user-images.githubusercontent.com/62285872/82723750-2f7b4e80-9d0c-11ea-9755-e83f7b4b257d.png)

모든 노드객체는 Object / EventTarget / Node 인터페이스를 상속받는다. 추가적으로 문서노드는 Document / HTMLDocument 인터페이스를 상속받고 어트리뷰트 노드는 Attr, 텍스트노드는 CharacterData 인터페이스를 각각 상속받는다.

요소노드는 Element 인터페이스를 상속받는다. 또한 요소노드는 추가적으로 HTMLElement와 태그의 종류별로 세분화된 HTMLHeadElement / HTMLBodyElement등의 인터페이스를 상속받는다. 

이를 프로토타입 체인 관점으로 살펴보도록 하자. 예를 들어 input 요소를 파싱하여 객체화한 input 요소 노드 객체는 HTMLInputElement, HTMLElement, Element, Node, EventTarget, Object의 prototype에 바인딩되어 있는 프로토타입 객체를 상속받는다. 즉, input 요소 노드 객체는 프로토타입 체인에 있는 모든 프로토타입의 프로퍼티나 메소드를 상속받아 사용할 수 있다.

![image](https://user-images.githubusercontent.com/62285872/82723694-a6fcae00-9d0b-11ea-9a59-c62053a9597c.png)

배열이 객체인 동시에 배열인 것처럼 input 요소 노드 객체도 아래와 같이 다양한 특성을 갖는 객체이며 이러한 특성을 나타내는 기능을 상속 관계를 통해 구분하여 제공한다.

| input 요소 노드 객체의 특성                                  | 프로토타입을 제공하는 객체 |
| :----------------------------------------------------------- | :------------------------- |
| 객체                                                         | Object                     |
| 이벤트를 발생시키는 객체                                     | EventTarget                |
| 트리 자료 구조의 노드 객체                                   | Node                       |
| 브라우저가 렌더링할 수 있는 웹 문서의 요소(HTML, XML, SVG)를 표현하는 객체 | Element                    |
| 웹 문서의 요소 중에서 HTML 요소를 표현하는 객체              | HTMLElement                |
| HTML 요소 중에서 input 요소를 표현하는 객체                  | HTMLInputElement           |

노드객체는 공통적인 기능도 있지만 노드객체의 종류에 따라 고유한 기능도 갖는다. 예를들어 모든 노드객체는 공통적으로 이벤트를 발생시킨다. 이벤트에 관련된 기능(EventTarget.addEventListner, EventTarget.removeEventListener 등)은 EventTarget 인터페이스가 제공한다.

또한 모든 노드객체는 트리 자료구조의 노드로서 공통적으로 트리탐색기능(Node.parentNode, Node.childNodes, Node.previousSibling, Node.nextSibling 등)이나 노드 정보제공기능(Node.nodeType, Node.nodeName 등)이 필요하다. 이 같은 노드 관련기능은 Node 인터페이스가 제공한다.

HTML요소가 객체화된 요소 노드 객체는 HTML 요소가 갖는 공통적인 기능도 있다. 예를 들어 input 요소 노드 객체와 div 요소 노드 객체는 모두 HTML 요소의 스타일을 나타내는 style 프로퍼티가 있다. <strong>이같이 HTML 요소가 갖는 공통적인 기능은 HTMLElement 인터페이스가 제공한다.</strong>

하지만 요소 노드 객체는 HTML 요소의 종류에 따라 고유한 기능도 있다. 예를 들어 input 요소 노드 객체는 value 프로퍼티가 필요하지만 div 요소 노드 객체는 value 프로퍼티가 필요하지 않다. 따라서 필요한 기능을 제공하는 인터페이스(HTMLInputElement, HTMLDivElement 등)가 HTML 요소의 종류에 따라 각각 다르다.

이처럼 노드객체는 공통된 기능일수록 프로토타입 체인의 상위에, 개별적인 고유 기능일수록 프로토타입 체인의 하위에 프로토타입 체인을 구축하여 노드객체에 필요하는 기능, 즉 프로퍼티와 메소드를 제공하는 상속구조를 갖는다.

DOM은 HTML 문서의 계층적 구조와 정보를 표현하는것은 물론, 노드 객체의 종류에 따라 상속을 통해 자신에 필요한 기능, 즉 프로퍼티와 메소드의 집합인 DOM API를 제공한다. DOM API를 통해 HTML의 구조나 내용 또는 스타일을 동적으로 조작할 수 있다.

<br>

## 요소 노드 취득

HTML의 구조나 내용 또는 스타일 등을 동적으로 조작하려면 먼저 요소노드를 취득하여야 한다. 텍스트 노드는 요소노드의 자식노드이고 어트리뷰트 노드는 요소노드의 형제노드이기 때문에 텍스트노드나 어트리뷰트 노드를 조작하고자 할 때에도 요소노드의 취득이 필요하다.

요소노드의 취득은 HTML요소를 조작하는 시작점이다. 이를 위해 DOM은 요소노드를 취득할 수 있는 다양한 메소드를 제공한다.

<br>

### id로 요소 노드 취득

`Document.prototype.getElementById` 메소드는 인수로 전달한 id 어트리뷰트 값을 갖는 하나의 요소노드를 탐색하여 반환한다. `getElementById` 메소드는 Document.prototype의 프로퍼티이다. 따라서 반드시 문서노드 documents를 통해 호출해야 한다.

```html
<!-- id 고유 -->
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      // id 값이 'banana'인 요소 노드를 탐색하여 반환한다.
      // 두번째 li 요소가 반환된다.
      const $elem = document.getElementById('banana');

      // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
      $elem.style.color = 'red';
    </script>
  </body>
</html>

<!-- id 중복 -->
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="banana">Apple</li>
      <li id="banana">Banana</li>
      <li id="banana">Orange</li>
    </ul>
    <script>
      // id 값이 'banana'인 요소 노드를 탐색하여 반환한다.
      // 첫번째 li 요소 노드가 반환된다.
      const $elem = document.getElementById('banana');

      // 취득한 요소 노드의 style.color 프로퍼티 값을 변경한다.
      $elem.style.color = 'red';
    </script>
  </body>
</html>
```

- id 고유

  ![image](https://user-images.githubusercontent.com/62285872/82725757-2abd9700-9d1a-11ea-8ace-debfef46805c.png)	

- id 중복

  ![image](https://user-images.githubusercontent.com/62285872/82725747-19748a80-9d1a-11ea-8b89-c2a4a4c44dd7.png)	

id 값은 HTML 문서 내에서 유일한 값이어야 하며 class 어트리뷰트와는 달리 공백문자로 구분하여 여러개의 값을 가질 수 없다. 단, HTML 문서 내에 중복된 id값을 갖는 요소가 여러 개 존재하더라도 어떠한 에러도 발생하지 않는다. 즉, HTML문서 내에는 중복된 id 값을 갖는 요소가 여러개 존재 할 가능성이 있다.

이러한 경우, getElementById 메소드는 인수로 전달된 id 값을 갖는 **첫번째** 요소 노드만을 반환한다. 즉, getElementById 메소드는 언제나 단 하나의 요소 노드를 반환한다.

만약, 인수로 전달된 id 값을 갖는 <strong>요소가 존재하지 않는 경우</strong>, getElementById 메소드는 **null**을 반환한다.

HTML 요소에 id 어트리뷰트를 부여하면 id 값과 동일한 이름의 전역 변수가 암묵적으로 선언(암묵적전역)되고 해당 노드 객체가 할당되는 부수 효과(side effect)가 있다. 암묵적 전역으로 생성된 프로퍼티는 delete 연산자로 삭제가 가능하다.

```html
<!DOCTYPE html>
<html>
  <body>
    <div id="foo"></div>
    <script>
      // id 값과 동일한 이름의 전역 변수가 암묵적으로 선언되고 해당 노드 객체가 할당된다.
      console.log(foo === document.getElementById('foo')); // true

      // 암묵적 전역으로 생성된 전역 프로퍼티는 삭제되지만 전역 변수는 삭제되지 않는다.
      delete foo;
      console.log(foo); // <div id="foo"></div>
    </script>
  </body>
</html>
```

단, id 값과 동일한 이름의 전역 변수가 <strong>이미 선언</strong>되어 있으면 이 전역 변수에 노드 객체가 재할당되지 않는다.

> id로 요소노드 취득 요약
>
> - `Document.prototype`의 메소드인 `getElementById`로 해당 id값을 갖는 노드객체 취득
> - `Documentprototype`의 상속을 받는 `document` 객체를 이용하여 `document.getElementById`로 요소노드 객체 취득 가능.
> - html의 id 어트리뷰트의 값은 암묵적으로 자바스크립트의 전역변수로 취급되며 해당 변수에 id값을 갖는 요소노드 객체를 할당함. 단, 자바스크립트에 html에 선언된 id 어트리뷰트의 값과 동일한 식별자를 가진 변수가 이미 선언되어 있으면 위와 같은 상황은 일어나지 않음.
> - html에서 id 어트리뷰트 값은 중복 사용이 가능함, 만약 id를 중복선언 할 경우 동일 id를 갖는 요소들 중 첫번째 요소노드 객체를 취득함.

<br>

### 태그 이름으로 요소노드 취득

`Document.prototype` / `Element.prototype.getElementsByTagName` 메소드는 인수로 전달할 태그이름을 갖는 모든 요소노드들을 탐색하여 반환한다. 메소드 이름에 포함된 Elements가 복수형인 것에서 알 수 있듯이 `getElementsByTagName` 메소드는 여러개의 요소노드 객체를 갖는 DOM 컬렉션 객체인 **HTMLCollection** 객체를 반환한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li id="apple">Apple</li>
      <li id="banana">Banana</li>
      <li id="orange">Orange</li>
    </ul>
    <script>
      // 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
      // 탐색된 요소 노드 들은 HTMLCollection 객체에 담겨 반환된다.
      // HTMLCollection 객체는 유사 배열 객체이며 이터러블이다.
      const $elems = document.getElementsByTagName('li');

      // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
      // HTMLCollection 객체를 배열로 변환하여 순회하며 color 프로퍼티 값을 변경한다.
      [...$elems].forEach(elem => elem.style.color = 'red');
    </script>
  </body>
</html>
```

![image](https://user-images.githubusercontent.com/62285872/82726516-a9690300-9d1f-11ea-8728-2e050e51118b.png)

함수는 하나의 값만을 반환할 수 있으므로 여러 개의 값을 반환하려면 배열이나 객체와 같은 자료구조에 담아 반환해야 한다. `getElementsByTagName` 메소드가 반환하는 DOM 컬렉션 객체인 HTMLCollection 객체는 **유사배열객체**이자 **이터러블**이다.

`getElementsByTagName` 메소드는 `Document.prototype` 에 정의된 메소드와 `Element.prototype`에 정의된 메소드가 있다. `Document.prototype.getElementsByTagName` 메소드는 DOM의 루트 노드인 문서 노드 즉, document를 통해 호출하며 <strong>HTML 문서 전체에서 요소 노드를 탐색</strong>하여 반환한다. `Element.prototype.getElementsByTagName` 메소드는 특정 요소 노드 객체를 통해 호출하며 <strong>특정 요소 노드부터 시작하여 요소 노드를 탐색</strong>하여 반환한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </ul>
    <ul>
      <li>HTML</li>
    </ul>
    <script>
      // HTML 문서 전체에서 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
      const $lisFromDcoument = document.getElementsByTagName('li');

      // ul#fruits 요소부터 시작하여 태그 이름이 li인 요소 노드를 모두 탐색하여 반환한다.
      const $fruits = document.getElementById('fruits');
      const $lisFromFruits = $fruits.getElementsByTagName('li');

      console.log($lisFromDcoument); // HTMLCollection(4) [li, li, li, li]
      console.log($lisFromFruits);   // HTMLCollection(3) [li, li, li]
    </script>
  </body>
</html>
```

만약 인수로 전달된 태그 이름을 갖는 요소가 존재하지 않는 경우, `getElementsByTagName` 메소드는 빈 HTMLCollection 객체를 반환한다.

<br>

### class로 요소노드 취득

`Document.prototype` / `Element.prototype.getElementsByClassName` 메소드는 인수로 전달한 class 어트리뷰트 값을 갖는 모든 요소노드들을 탐색하여 반환한다. <strong>인수로 전달할 class 값은 공백으로 구분하여 여러개의 class를 지정할 수 있다.</strong> `getElementsByTagName` 메소드와 마찬가지로 `getElementsByClassName` 메소드는 여러개의 요소노드 객체를 갖는 DOM 컬렉션 객체인 **HTMLCollection** 객체를 반환한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li class="fruit apple">Apple</li>
      <li class="fruit banana">Banana</li>
      <li class="fruit orange">Orange</li>
    </ul>
    <script>
      // class 값이 'fruit'인 요소 노드를 모두 탐색하여 반환한다.
      // 취득한 요소 노드 들은 HTMLCollection 객체에 담겨 반환된다.
      const $elems = document.getElementsByClassName('fruit');

      // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
      [...$elems].forEach(elem => elem.style.color = 'red');

      // class 어트리뷰트 값이 'fruit apple'인 요소 노드를 모두 탐색하여 반환한다.
      // 취득한 요소 노드 들은 HTMLCollection 객체에 담겨 반환된다.
      const $apples = document.getElementsByClassName('fruit apple');

      // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
      [...$apples].forEach(elem => elem.style.color = 'blue');
    </script>
  </body>
</html>
```

`getElementsByTagName` 메소드와 마찬가지로 `getElementsByClassName` 메소드는 `Document.prototype`에 정의된 메소드와 `Element.prototype`에 정의된 메소드가 있다. `Document.prototype.getElementsByClassName` 메소드는 DOM의 루트 노드인 문서 노드 즉, document를 통해 호출하며 <strong>HTML 문서 전체에서 요소 노드를 탐색</strong>하여 반환하고 `Element.prototype.getElementsByClassName` 메소드는 <strong>특정 요소 노드를 통해 호출하며 특정 요소 노드부터 시작하여 요소 노드를 탐색</strong>하여 반환한다.

만약 인수로 전달된 class 값을 갖는 요소가 존재하지 않는 경우, `getElementsByClassName` 메소드는 빈 HTMLCollection 객체를 반환한다.

> `document.getElementsByClassName` 또는 `document.getElementsByTagName` 을 통해 생성된 객체는 유사배열/이터러블 이며 해당 객체의 prototype은 `HTMLCollection.prototype` 이다. `HTMLCollection.prototype`의 프로토타입은 `Object.prototype` 이다.

<br>

### CSS 선택자로 요소노드 취득

CSS 선택자(selector)는 스타일을 적용하고자 하는 HTML 요소를 특정할 때 사용하는 문법이다.

```CSS
* {...} /* 전체 선택자 */
P {...} /* 태그 선택자(P 태그) */
#foo {...} /* id 선택자 */
.foo {...} /* class 선택자 */
input[type=text] {...} /* 어트리뷰트 선택자 */
div p {...} /* 후손 선택자 */
div > p {...} /* 자식 선택자 */
p + ul {...} /* 인접 형제 선택자 : p 요소의 형제 요소 중에 p 요소 바로 뒤에 위치하는 ul 요소를 선택 */
p ~ ul {...} /* 일반 형제 선택자 : p 요소의 형제 요소 중에 p 요소 뒤에 위치하는 ul 요소를 모두 선택 */
a:hover {...} /* 가상 클래스 선택자 */
```

`Document.prototype` / `Element.prototype.querySelector` 메소드는 인수로 전달한 css 선택자를 만족시키는 **하나**의 요소노드를 탐색하여 반환한다. 만약 인수로 전달한 css 선택자를 만족시키는 요소노드가 여러개인 경우, 첫번째 요소 노드만 반환한다. 인수로 전달된 css 선택자를 만족시키는 요소가 존재하지 않는경우 **nul**l을 반환한다.

`Document.prototype` / `Element.prototype.querySelectorAll` 메소드는 인수로 전달한 CSS 선택자를 만족시키는 **모든** 요소노드를 탐색하여 반환한다. `querySelectorAll` 메소드는 여러개의 요소노드 객체를 갖는 DOM 컬렉션 객체인 **NodeList** 객체를 반환한다. 인수로 전달된 css 선택자를 만족시키는 요소가 존재하지 않는 경우 빈 NodeList 객체를 반환한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul>
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
    <script>
      // ul 요소의 자식 요소인 li 요소를 모두 탐색하여 반환한다.
      const $elems = document.querySelectorAll('ul > li');
      // 취득한 요소 노드 들은 NodeList 객체에 담겨 반환된다.
      console.log($elems); // NodeList(3) [li.apple, li.banana, li.orange]

      // 취득한 모든 요소 노드의 style.color 프로퍼티 값을 변경한다.
      // NodeList는 forEach 메소드를 제공한다.
      $elems.forEach(elem => elem.style.color = 'red');
    </script>
  </body>
</html>
```

인수로 전달한 css 선택자가 문법에 맞지 않는 경우, DOMException 에러가 발생한다.

`getElementById` / `getElementsByClassName` 메소드와 마찬가지로 `querySelector` / `querySelectorAll` 메소드는 `Document.prototype`에 정의된 메소드와 `Element.prototype`에 정의된 메소가 존재한다. Document.prototype에 정의된 메소드는 DOM의 루트 노드인 문서 노드 즉, document 를 통해 호출하며 HTML 문서 전체에서 요소 노드를 탐색하여 반환한다. Element.prototype에 정의된 메소드는 특정 요소 노드를 통해 호출하며 특정 요소 노드부터 시작하여 요소 노드를 탐색하여 반환한다.

CSS 선택자 문법을 사용하는 `querySelector`, `querySelectorAll` 메소드는 `getElementById`, `getElementsBy~` 메소드보다 다소 느린 것으로 알려져 있다. 하지만 CSS 선택자 문법으로 보다 구체적인 조건으로 요소 노드를 취득할 수 있고 일관된 방식으로 요소 노드를 취득할 수 있다는 장점이 있다. 따라서 id가 있는 요소를 취득하는 경우에는 `getElementById` 메소드를 사용하고 그 외의 경우에는 `querySelector`, `querySelectorAll` 메소드를 사용하는 것을 추천한다.

<br>

### 탐색 가능여부 확인

`Element.prototype.matches` 메소드는 인수로 전달된 선택자에 의해 특정노드를 탐색 가능한지 확인한다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
  </body>
  <script>
    const $apple = document.querySelector('.apple');

    console.log($apple.matches('#fruits > li.apple'));  // true
    console.log($apple.matches('#fruits > li.banana')); // false
  </script>
</html>
```

`Element.prototype.matches` 메소드는 이벤트 위임을 사용할 경우 유용하다.

<br>

### HTMLCollection과 NodeList

HTMLCollection과 NodeList는 DOM API가 <strong>여러 개의 결과값을 반환</strong>하기 위한 DOM 컬렉션 객체이다. HTMLCollection과 NodeList는 모두 <strong><em>유사 배열 객체이자 이터러블</em></strong>이다. 따라서 두 객체 모두 `for...of` 문으로 순회할 수 있으며 스프레드 문법을 사용하여 배열로 변환할 수 있다.

#### HTMLCollection

`getElementsByTagName`, `getElementsByClassName` 메소드가 반환하는 HTMLCollection 객체는 노드 <strong>객체의 상태 변화를 실시간으로 반영하는</strong> 살아 있는(live) DOM 컬렉션 객체이다. 따라서 HTMLCollection 객체를 살아 있는(live) 객체라고 부르기도 한다.

이처럼 HTMLCollection은 실시간으로 노드 객체의 상태 변경을 반영하기 때문에 HTMLCollection 객체를 for 문으로 순회하면서 노드 객체의 상태를 변경해야 할 때 주의가 필요하다. <strong>이 문제는 for 문을 역방향으로 순회하는 방법으로 회피할 수 있다.</strong>

이러한 회피책 대신, 근본적인 해결방법은 부작용을 발생시키는 원인인 HTMLCollection을 사용하지 않는 것이다. 유사 배열 객체이면서 이터러블인 HTMLCollection을 배열로 변환하면 더이상 HTMLCollection을 사용할 필요가 없고 유용한 배열의 고차 함수(forEach, map, filter, reduce 등)를 사용할 수 있다.

```js
[...HTMLCollection객체].forEach(elem => elem.className = 'blue');
```

#### NodeList

HTMLCollection이 실시간 상태변화를 반영하여 생기는 부작용에 대한 해결책으로 앞서 말한 역순 for문 / while 문 / 배열변환 이외에 `querySelectorAll` 을 사용하는 방법도 있다. 해당 메소드는 HTMLCollection대신 또다른 DOM 컬렉션 객체인 NodeList 객체를 반환한다. NodeList 객체는 실시간으로 노드객체의 상태 변경을 반영하지 않는 객체이다.

```html
<script>
	const $elems = document.querySelectorAll('.red');
    $elems.forEach(elem => elem.className = 'blue');
</script>    
```

querySelectorAll가 반환하는 노드 객체는 `NodeList.prototype.forEach` 메소드를 상속받아 사용할 수 있다. `NodeList.prototype.forEach` 메소드는 `Array.prototype.forEach` 메소드와 사용 방법이 동일하며 `NodeList.prototype`은 forEach 이외에도 item, entries, keys, values 메소드를 제공한다.

NodeList 객체는 대부분의 경우, 노드 객체의 상태 변경을 실시간으로 반영하지 않고 과거의 정적 상태를 유지하는 non-live 객체로 동작한다. 하지만 경우에 따라 HTMLCollection과 같이 실시간으로 노드 객체의 상태 변경을 반영하는 live 객체로 동작할 때가 있다. 

<strong>childNodes 프로퍼티가 반환한 NodeList 객체는 live 객체로 동작하므로 주의가 필요하다.</strong>

따라서 노드객체의 상태변경과 상관없이 안전하게 DOM 컬렉션을 사용하려면 HTMLCollection이나 NodeList 객체를 <strong>배열로 변환하여 사용하는 것이 좋다.</strong>

<br>

## 노드탐색

요소노드 객체를 **취득**한 다음, 취득한 요소노드를 기점으로 DOM 트리의 노드를 옮겨다니며 부모, 형제. 자식 등을 탐색해야할 때가 있다.

```html
<ul id="fruits">
  <li class="apple">Apple</li>
  <li class="banana">Banana</li>
  <li class="orange">Orange</li>
</ul>
```

ul#fruits 요소는 3개의 자식 요소를 갖는다. 이때 먼저 ul#fruits 요소 노드를 취득한 다음, 자식 노드를 모두 탐색하거나 첫번째 자식 노드 또는 마지막 자식 노드 만을 탐색할 수 있다.

li.banana 요소는 2개의 형제 요소와 부모 요소를 갖는다. 이때 먼저 li.banana 요소 노드를 취득한 다음, 형제 노드를 탐색하거나 부모 노드를 탐색할 수 있다.

이처럼 DOM 트리 상의 노드를 탐색할 수 있도록 Node, Element 인터페이스는 트리 탐색 프로퍼티를 제공한다.

<img src="https://user-images.githubusercontent.com/62285872/82733095-81dc5f80-9d4c-11ea-9ea0-0780fe3257a9.png" alt="image" style="zoom:80%;" />

DOM 트리를 구성하는 노드로서 갖추어야 할 트리 노드 탐색을 위한 프로퍼티인 parentNode, previousSlibling, firstChild, childNodes 등은 <strong>Node.prototype</strong>이 제공하고 previousElementSlibling, nextElementSlibling과 children은 <strong>Element.prototype</strong>이 제공하는 프로퍼티이다.

노드탐색 프로퍼티는 모두 <strong>접근자 프로퍼티</strong>이다. 단, setter없이 getter만 존재하여 참조만 가능한 **읽기전용** 프로퍼티이다. 읽기전용 접근자 프로퍼티에 값을 할당하면 아무런 에러없이 무시된다.

### 공백 텍스트노드

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
  </body>
</html>
```

텍스트 에디터에서 HTML 문서에 엔터 키를 입력하면 개행 문자가 추가된다. 위 HTML 문서에도 개행 문자가 포함되어 있다. 위 HTML 문서는 파싱되어 아래와 같은 DOM을 생성한다.

![image](https://user-images.githubusercontent.com/62285872/82734111-85271980-9d53-11ea-8f0e-484cfdd394bf.png)

이처럼 개행이나 공백은 **텍스트노드**를 생성한다. 따라서 노드 탐색시, 개행 혹은 공백문자가 생성한 텍스트노드에 주의하도록 하자.

### 자식노드 탐색

| 프로퍼티                            | 설명                                                         |
| :---------------------------------- | :----------------------------------------------------------- |
| Node.prototype.childNodes           | 자식 노드를 모두 탐색하여 DOM 컬렉션 객체인 **NodeList**에 담아 반환한다. |
| childNodes                          | 프로퍼티가 반환한 NodeList에는 텍스트 노드 또는 요소 노드가 포함되어 있다. |
| Element.prototype.children          | 자식 요소 노드 만을 모두 탐색하여 DOM 컬렉션 객체인 **HTMLCollection**에 담아 반환한다. children 프로퍼티가 반환한 HTMLCollection에는 텍스트 노드는 포함되지 않고 요소 노드만이 포함되어 있다. |
| Node.prototype.firstChild           | 첫번째 자식 노드를 반환한다. firstChild 프로퍼티가 반환한 노드는 텍스트 노드 또는 요소 노드이다. |
| Node.prototype.lastChild            | 마지막 자식 노드를 반환한다. lastChild 프로퍼티가 반환한 노드는 텍스트 노드 또는 요소 노드이다. |
| Element.prototype.firstElementChild | 첫번째 자식 노드를 반환한다. firstElementChild 프로퍼티는 요소 노드 만을 반환한다. |
| Element.prototype.lastElementChild  | 마지막 자식 노드를 반환한다. lastElementChild 프로퍼티는 요소 노드 만을 반환한다. |

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
  </body>
  <script>
    // 기점이 되는 노드 탐색
    const $fruits = document.getElementById('fruits');

    console.log($fruits.childNodes);
      // NodeList(7) [text, li.apple, text, li.banana, text, li.orange, text]
    console.log($fruits.children);
      // HTMLCollection(3) [li.apple, li.banana, li.orange]
    console.log($fruits.firstChild);
      // #text (공백)
    console.log($fruits.lastChild);
      // #text (공백)
    console.log($fruits.firstElementChild);
      // <li class="apple">Apple</li>
    console.log($fruits.lastElementChild);
      // <li class="orange">Orange</li>
  </script>
</html>
      
```

### 자식노드 존재확인

자식 노드의 존재 여부는 불리언 값을 반환하는 `Node.prototype.hasChildNodes` 메소드로 확인할 수 있다. 단, `hasChildNodes` 메소드는 `childNodes` 프로퍼티와 마찬가지로 <strong>텍스트 노드를 포함하여</strong> 자식노드의 존재를 확인한다.

**요소노드**인 자식 노드가 존재하는지는 확인하고 싶은 경우에는 `hasChildNodes` 메소드 대신 `children.length` 또는 Element 인터페이스의 `childElementCount` 프로퍼티를 사용한다.

```html
<script>
    console.log($fruits.hasChildNodes());   // true
    console.log($fruits.children.length);   // 3
    console.log($fruits.childElementCount); // 3
</script>
```

### 텍스트 노드 탐색

요소노드의 **텍스트노드**는 요소노드의 **자식노드**이다. 따라서 요소노드의 텍스트노드는 `firstChild` 프로퍼티로 접근할 수 있다.

```html
<!DOCTYPE html>
<html>
<body>
  <div id="foo">Hello</div>
  <script>
    // 요소 노드의 텍스트 노드는 firstChild 프로퍼티로 접근할 수 있다.
    console.log(document.getElementById('foo').firstChild); // "hello"
  </script>
</body>
</html>
```

### 부모 노드 탐색

부모노드를 탐색하기 위해서는 `Node.prototype.parentNode` 프로퍼티를 사용한다. 텍스트노드는 DOM 트리의 최종단 노드인 리프노드이므로 탐색한 부모노드가 텍스트 노드인 경우는 없다.

```html
<!DOCTYPE html>
<html>
  <body>
    <ul id="fruits">
      <li class="apple">Apple</li>
      <li class="banana">Banana</li>
      <li class="orange">Orange</li>
    </ul>
  </body>
  <script>
    // 노드 탐색의 기점이 되는 요소 노드 취득
    const $banana = document.querySelector('.banana');

    // li.banana 요소의 부모 노드를 탐색한다.
    console.log($banana.parentNode); // ul#fruits
  </script>
</html>
```

### 형제 노드 탐색

같은 부모노드를 갖는 형제노드를 탐색하기 위해서는 아래와 같은 노드탐색 프로퍼티를 사용한다. <strong>단, 어트리뷰트 노드는 요소노드의 형제노드이지만 같은 부모노드를 갖는 형제노드가 아니기 때문에 반환되지 않는다.</strong> 때문에 아래 프로퍼티는 텍스트노드 혹은 요소노드만을 반환한다.

| 프로퍼티                                 | 설명                                                         |
| :--------------------------------------- | :----------------------------------------------------------- |
| Node.prototype.previousSibling           | 같은 부모 노드를 갖는 형제 노드에서 이전 형제 노드를 탐색하여 반환한다. 텍스트 노드 또는 요소 노드가 반환된다. |
| Node.prototype.nextSibling               | 같은 부모 노드를 갖는 형제 노드에서 다음 형제 노드를 탐색하여 반환한다. 텍스트 노드 또는 요소 노드가 반환된다. |
| Element.prototype.previousElementSibling | 같은 부모 노드를 갖는 형제 요소 노드에서 이전 형제 요소 노드를 탐색하여 반환한다. 요소 노드만 반환된다. |
| Element.prototype.nextElementSibling     | 같은 부모 노드를 갖는 형제 요소 노드에서 다음 형제 요소 노드를 탐색하여 반환한다. 요소 노드만 반환된다. |

````html
<body>
  <ul id="fruits">
    <li class="apple">Apple</li>
    <li class="banana">Banana</li>
    <li class="orange">Orange</li>
  </ul>
  <script>
    const $elems = document.querySelector('.banana');

    console.log($elems.previousSibling); // #text
    console.log($elems.previousElementSibling); // <li class="apple">Apple</li>
    console.log($elems.nextSibling); // #text
    console.log($elems.nextElementSibling);  // <li class="orange">Orange</li>
  </script>
</body>
````

<br>

## 노드 정보 취득

노드 객체에 대한 **정보**를 확인하려면 아래와 같은 노드정보 프로퍼티를 사용한다.

| 프로퍼티                | 설명                                                         |
| :---------------------- | :----------------------------------------------------------- |
| Node.prototype.nodeType | 노드 객체의 종류를 나타내는 **상수**를 반환한다. 노드 객체의 종류를 나타내는 노드 타입 상수는 Node에 정의되어 있다.<br>- 요소 노드: 상수 Node.ELEMENT_NODE, 즉 숫자 1을 반환<br> - 텍스트 노드: 상수 Node.TEXT_NODE, 즉 숫자 3을 반환. <br>- 문서 노드: 상수 Node.DOCUMENT_NODE, 즉 숫자 9를 반환 |
| Node.prototype.nodeName | 노드의 **이름**을 **문자열**로 반환한다.<br>- 요소 노드: 대문자 문자열로 태그 이름("UL", "LI" 등)을 반환.<br>- 텍스트 노드: 문자열 "#text"를 반환.<br>- 문서 노드: 문자열 "#document"를 반환 |

```html
<body>
  <div id="foo">Hello1</div>
  <div id="foo">Hello2</div>
  <div id="foo">Hello3</div>
<script>
    console.log(document.nodeType);  // 9
    console.log(document.nodeName);  // #document

    const $elem = document.querySelector('#foo');
    console.log($elem.nodeType);  // 1
    console.log($elem.nodeName);  // DIV

    console.log($elem.firstChild.nodeType);  // 3
    console.log($elem.firstChild.nodeName);  // #text
  </script>
</body>
```

<br>

## 요소 노드의 텍스트 조작

### nodeValue

지금까지 살펴본 노드탐색, 노드정보 프로퍼티는 모두 **읽기전용** **접근자** 프로퍼티이다. 하지만 `Node.prototype.nodeValue` 프로퍼티는 seeter와 getter가 모두 존재하는 접근자 프로퍼티로 참조와 할당이 모두 가능하다.

노드의 nodeValue 프로퍼티를 참조하면 <strong>노드의 값</strong>을 반환한다. 이 때 <strong>텍스트 노드</strong>가 아닌 노드인 문서노드나 요소노드의 nodeValue 프로퍼티를 참조하면 null을 반환한다.

```html
<body>
  <div id="foo">Hello1</div>
  <script>
    console.log(document.nodeValue); // null (문서노드)

    const $elem = document.querySelector('#foo');
    console.log($elem.nodeValue); // null  (요소노드)

    console.log($elem.firstChild.nodeValue); // Hello1  (텍스트노드)
  </script>
</body>
```

텍스트노드의 nodeValue 프로퍼티에 값을 할당하면 텍스트 노드의 값, 즉 텍스트를 변경할 수 있다.

- 텍스트 변경방법

1. 텍스트를 변경할 요소노드를 **취득**한 다음, 취득한 요소노드의 **텍스트노드**를 **탐색**한다. 텍스트노드는 요소노드의 자식노드이므로 firstChild 프로퍼티를 사용하여 탐색한다.
2. nodeValue 프로퍼티를 사용하여 탐색한 텍스트노드의 **값**을 변경한다.

```html
<body>
  <div id="foo">Hello1</div>
  <script>
    const $textNode = document.querySelector('#foo').firstChild;
    $textNode.nodeValue = 'transform Text NodeValue';
  </script>
</body>
```

![image](https://user-images.githubusercontent.com/62285872/82746485-3b7a1580-9dcb-11ea-9346-b1a5c51f56cb.png)	

<br>

### textContent

`Node.prototype.textContent` 는 setter와 getter가 모두 존재하는 접근자 프로퍼티로 요소노드의 <strong>텍스트와 모든 자손노드의 텍스트</strong>를 **모두** 취득하거나 변경한다.

```html
<body>
  <div id="foo">Hello <span>world!</span></div>
  <script>
    const $elem = document.querySelector('#foo');
    console.log($elem); // div#foo
 
    console.log($elem.firstChild); // "hello "
    console.log($elem.lastChild); // <span>world!</span>
    console.log($elem.lastChild.firstChild); // "world!"
    console.log($elem.childNodes); // NodeList(2) [#text, span]

    console.log($elem.textContent); // hello world!
  </script>
</body>
```

요소노드의 textContent 프로퍼티에 문자열을 할당하면 요소노드의 모든 자식노드가 제거되고 할당한 문자열이 텍스트로 추가된다. 이 때 할당한 문자열에 HTML 마크업이 포함되어 있더라도 문자열 그대로 인식되어 텍스트로 취급된다. <strong>즉, HTML 마크업이 파싱되지 않는다.</strong>

```html
console.log($elem.textContent); // hello world!
    $elem.textContent = 'lee wooseong!<span>hello</span>';
    console.log($elem.firstChild); <!-- "lee wooseong!<span>hello</span>" -->
    console.log($elem.lastChild.firstChild); <!-- null -->
    console.log($elem.textContent); <!-- lee wooseong!<span>hello</span> -->
```

<br>

## DOM 조작

DOM조작 (DOM Manipulation)은 새로운 노드를 **생성**하여 DOM에 추가하거나 기존노드를 **삭제** 또는 **교체**하는것을 말한다. DOM 조작에 의해 DOM에 새로운 노드가 추가되거나 삭제되면 리플로우와 리페인트가 발생하는 원인이 되므로 성능에 악영향을 준다. 따라서 복잡한 컨텐츠를 다루는 DOM 조작은 성능 최적화를 위해 주의해서 다루어야 한다.

### innerHTML

`Element.prototype.innerHTML` 프로퍼티는 setter / getter 함수가 모두 존재하는 접근자 프로퍼티로 요소노드의 **HTML마크업**을 취득하거나 변경한다. 요소노드의 innerHTML 프로퍼티를 참조하면 요소노드의 <strong>컨텐츠영역 내에 포함된 모든 HTML 마크업을 문자열로 반환</strong>한다.

```HTML
<body>
  <div id="foo">Hello <span>world!</span></div>
  <script>
    const $elem = document.querySelector('#foo');
    console.log($elem.innerHTML); // Hello <span>world!</span>
  </script>
</body>
```

요소 노드의 innerHTML 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열에 포함되어 있는 HTML 마크업이 파싱되어 요소 노드의 자식 노드로 DOM에 반영된다.

```HTML
<body>
  <div id="foo">Hello <span>world!</span></div>
  <script>
    const $elem = document.querySelector('#foo');
    console.log($elem.innerHTML); // Hello <span>world!</span>
    $elem.innerHTML = 'Hi <a>Click!</a>';
  </script>
</body>
```

![image](https://user-images.githubusercontent.com/62285872/82747071-c1e52600-9dd0-11ea-8863-3cc78a85bfb2.png)	

- innerHTML 프로퍼티를 사용한 DOM 조작의 단점

1. 크로스 사이트 스크립팅 공격에 취약.

요소 노드의 innerHTML 프로퍼티에 할당한 HTML 마크업 문자열은 렌더링 엔진에 의해 파싱되어 요소 노드의 자식으로 DOM에 반영된다. 이때 사용자로부터 입력 받은 데이터(untrusted input data)를 그대로 innerHTML 프로퍼티에 할당하는 것은 **크로스 사이트 스크립팅 공격(XSS: Cross-Site Scripting Attacks)**에 취약하므로 위험하다. HTML 마크업 내에 자바스크립트 악성 코드가 포함되어 있다면 파싱 과정에서 그대로 실행될 가능성이 있기 때문이다.

> HTML 새니티제이션
>
> HTML 새니티제이션(HTML sanitization)은 사용자로부터 입력받은 데이터에 의해 발생할 수 있는 크로스 사이트 스크립팅 공격을 예방하기 위해 잠재적 위험을 제거하는 기능을 말한다.  [DOMPurify](https://github.com/cure53/DOMPurify) 라이브러리를 사용하여 구현이 가능하다.
>
> DOMPurify는 아래와 같이 잠재적 위험을 내포한 HTML 마크업을 새니티제이션(살균)하여 잠재적 위험을 제거한다.
> `DOMPurify.sanitize('<img src=x onerror=alert(1)//>'); // => <img src="x">`

2. 기존의 노드를 제거하고 다시 파싱과정을 수행하여 DOM을 변경.

innerHTML의 프로퍼티에 HTML 마크업 문자열을 할당하면, 유지되어도 좋은 **기존**의 자식노드까지 <strong>모두 제거하고 다시 처음부터 자식노드를 생성</strong>하여 DOM에 반영한다.

3. 새로운 요소를 삽입할 위치를 지정할 수 없음.

```html
<ul id="fruits">
<li class="apple">Apple</li>
  <li class="orange">Orange</li>
</ul>
```

li.apple 요소와 li.orange 요소 사이에 새로운 요소를 삽입하고 싶은 경우, innerHTML 프로퍼티를 사용하면 위치를 지정할 수 없다. 이처럼 innerHTML 프로퍼티는 복잡하지 않은 요소를 새롭게 추가할 때 유용하지만 <strong>기존 요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입해야 할 때는 사용하지 않는 것이 좋다.</strong>

<br>

### insertAdjacentHTML 메소드

`Element.prototype.insertAdjacentHTML` 메소드는 기존요소를 제거하지 않으면서 위치를 지정해 새로운 요소를 삽입할 수 있다.

```JS
Element.prototype.insertAdjacentHTML(position, DOMString)
```

insertAdjacentHTML 메소드는 두번째 인수로 전달한 HTML 마크업 문자열(DOMstring)을 파싱하고 그 결과로 생성된 노드를 첫번째 인수로 전달할 위치(position)에 삽입하여 DOM에 반영한다. 첫번째 인수로 전달할 수 있는 문자열은 beforebegin / afterbegin / beforeend / afterend 4가지이다.

![image](https://user-images.githubusercontent.com/62285872/82747573-45a11180-9dd5-11ea-8dbc-920b13870257.png)

```html
<body>
  <!-- beforebegin -->
  <div id="foo">
    <!-- afterbegin -->
    text
    <!-- beforeend -->
  </div>
  <!-- afterend -->
</body>
<script>
  const $foo = document.getElementById('foo');
  $foo.style.color = 'red';
  $foo.insertAdjacentHTML('beforebegin', '<p>Click!1</p>');
  $foo.insertAdjacentHTML('afterbegin', '<p>Click!2</p>');
  $foo.insertAdjacentHTML('beforeend', '<p>Click!3</p>');
  $foo.insertAdjacentHTML('afterend', '<p>Click!4</p>');
</script>
```

![image](https://user-images.githubusercontent.com/62285872/82747640-248cf080-9dd6-11ea-806b-e4b675146ef9.png)	

`insertAdjacentHTML` 메소드는 기존 요소에는 영향을 주지 않고 새롭게 삽입될 요소만을 파싱하여 DOM에 반영하므로 기존의 자식 노드를 모두 제거하고 다시 처음부터 자식 노드를 생성하여 DOM에 반영하는` innerHTML` 프로퍼티보다 효율적이고 빠르다.

단, innerHTML 프로퍼티와 마찬가지로 insertAdjacentHTML 메소드는 HTML 마크업 문자열을 파싱하므로 크로스 사이트 스크립팅 공격에 취약하다는 점은 동일하다.

<br>

### 노드 생성과 추가

앞서 살펴본 `innerHTML` 프로퍼티와 `insertAdjacentHTML` 메소드는 HTML 마크업 문자열을 파싱하여 노드를 생성하고 DOM에 반영한다. DOM은 노드를 직접 생성/삽입/삭제/치환하는 메소드 또한 제공한다.

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
  </ul>
</body>
<script>
    const $foo = document.getElementById('fruits');
</script>
```

#### 요소 노드 생성

`Document.prototype.createElement` 메소드는 요소노드를 생성하여 반환한다. 메소드의 매개변수에는 태그이름을 나타내는 **문자열**을 전달한다.

```html
<script>
	const $li = document.createElement('li');
</script>
```

`document.createElement` 메소드로 생성된 요소 노드는 기존 DOM에 추가되지 않고 홀로 존재하는 상태로 생성된 요소 노드를 DOM에 추가해 주는 작업이 추가로 필요하다.

또한 해당 메소드로 생성된 요소 노드는 자식노드를 가지고 있지 않다. 즉, 텍스트 노드 또한 없는 상태이다.

```HTML
<script>
	const $li = document.createElement('li');
	console.log($li.childNodes); // NodeList []
</script>
```

#### 텍스트 노드 생성

`Document.prototype.createTextNode` 메소드는 텍스트 노드를 생성하여 반환한다. 메소드의 매개변수에는 텍스트노드의 값으로 사용될 **문자열**을 전달한다.

```html
<script>
	const $text = document.createTextNode('Banana');
</script>
```

텍스트 노드는 요소 노드의 자식 노드이다. 하지만 createTextNode 메소드로 생성된 텍스트 노드는 요소 노드의 자식 노드로 추가되지 않고 홀로 존재하는 상태이다. 즉, createElement 메소드와 마찬가지로 createTextNode 메소드는 텍스트 노드를 생성할 뿐 요소 노드에 추가하지는 않는다. 따라서 이후에 생성된 텍스트 노드를 요소 노드에 추가하는 처리가 별도로 필요하다.

#### 텍스트 노드를 요소 노드의 자식 노드로 추가

`Node.prototpye.appendChild` 메소드는 매개변수에 전달된 노드를 appendChild 메소드를 호출한 노드의 **마지막** 자식노드로 추가한다.

위 예제처럼 요소노드에 자식노드가 하나도 없을 경우에는 `Node.prototype.appendChild` 메소드 대신 `Node.prototype.textContent` 프로퍼티를 사용하는 것이 더 간편하다.

```html
<script>
	$li.appendChild($text); // li 요소노드에 자식노드로 텍스트노드 추가
    // $li.appendChild(document.createTextNode('Banana'));
    // $li.textContent = 'Banana';
</script>
```

단, 요소 노드의 textContent 프로퍼티에 문자열을 할당하면 요소 노드의 모든 자식 노드가 제거되고 할당한 문자열이 텍스트로 추가되므로 주의가 필요하다.

#### 요소 노드를 DOM에 추가

`Node.prototype.appendChild` 메소드를 사용하여 텍스트노드와 연결한 요소 노드를 상위 요소노드의 마지막 요소로 추가한다.

```html
<script>
	$foo.appendChild($li);
</script>
```

<br>

## 복수 노드 생성과 추가

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
  </ul>
</body>
<script>
  const $fruits = document.getElementById('fruits');

  ['grape', 'banana', 'orange'].forEach(text => {
    const $li = document.createElement('li');
    const $texts = document.createTextNode(text);
    $li.appendChild($texts);
    $fruits.appendChild($li);
  });
</script>
```

위와 같은 방법으로 DOM에 요소노드 추가 시, 총 3번의 DOM 추가&변경이 일어나게 된다. DOM 변경 시 마다 리플로우와 리페인팅이 일어나므로 가급적 DOM은 적은횟수로 변경되는것이 효율적이다.

DOM의 변경을 최소화하기 위한 방법으로 컨테이너 요소를 사용하는 방법이 있다. 먼저 컨테이너요소를 생성하여 DOM에 추가해야할 요소 노드를 컨테이너 요소에 자식노드로 추가하고, 컨테이너 요소를 DOM에 추가한다.

```HTML
<script>
  const $fruits = document.getElementById('fruits');
  const $container = document.createElement('div');
    
  ['grape', 'banana', 'orange'].forEach(text => {
    const $li = document.createElement('li');
    const $texts = document.createTextNode(text);
    $li.appendChild($texts);
    $container.appendChild($li);
  });
    
  $fruits.appendChild($container);
</script>
```

컨테이너 요소를 사용하면 1번의 DOM 변경만 일어나지만 불필요한 요소가 DOM에 추가되는 부작용이 있다.

![image](https://user-images.githubusercontent.com/62285872/82748794-a6354c00-9ddf-11ea-9c48-a2145563f1d4.png)	

이런 부작용은 DocumentFragment 노드를 통해 해결이 가능하다. DocumentFragment 노드는 문서/요소/어트리뷰트/텍스트 노드와 같은 노드객체의 일종으로 <strong>부모노드가 없으며 기존 DOM과는 별도로 존재</strong>한다는 특징이 있다. DocumentFragment 노드는 컨테이너 요소와 같이 자식 노드들의 부모 노드로서 별도의 <strong>서브 DOM</strong>을 구성하여 기존 DOM에 추가하기 위한 용도로 사용한다.

![image](https://user-images.githubusercontent.com/62285872/82748862-1c39b300-9de0-11ea-903b-4903dfb872f7.png)

DocumentFragment 노드를 생성하기 위해 `Document.prototype.createDocumentFragment` 메소드를 사용한다.

```html
<script>
  const $fruits = document.getElementById('fruits');
  const $fragment = document.createDocumentFragment();
    
  ['grape', 'banana', 'orange'].forEach(text => {
    const $li = document.createElement('li');
    const $texts = document.createTextNode(text);
    $li.appendChild($texts);
    $fragment.appendChild($li);
  });
    
  $fruits.appendChild($fragment);
</script>
```

![image](https://user-images.githubusercontent.com/62285872/82748921-aeda5200-9de0-11ea-9c29-5209d20d91d0.png)	

따라서 여러개의 노드를 DOM에 추가하려면 DocumnetFragment 노드를 사용하는 것이 좋다.

<br>

### 노드 삽입

#### 마지막 노드로 추가

`Node.prototype.appenChild` 메소드는 인수로 전달받은 노드를 자신을 호출한 노드의 **마지막** 자식노드로 DOM에 추가한다. 이 때 노드를 추가할 위치를 지정할 수 없고 언제나 마지막으로만 추가 한다.

#### 지정한 위치에 노드 삽입

`Node.prototype.insertBefore(newNode, childNode)` 메소드는 첫번째 인수로 전달받은 노드를 두번째 인수로 전달받은 노드 **앞**에 삽입한다.

 ```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
  </ul>
</body>
<script>
  const $fruits = document.getElementById('fruits');
  const $li = document.createElement('li');

  $li.textContent = 'orange';
  $fruits.insertBefore($li, $fruits.lastElementChild);
</script>
 ```

주의할 점은, 두점째 인수로 전달받은 노드는 반드시 insertBefore 메소드를 호출한 노드의 **자식노드**여야 한다. 그렇지 않으면 DOMException 에러가 발생한다.

또, 두번째 인수로 전달받은 노드가 null이면 insertBefore 메소드를 호출한 노드의 마지막 자식노드로 추가된다. 즉, appendChild와 같게 동작한다.

<br>

### 노드 이동

DOM에 이미 존재하는 노드를 appendChild 또는 insertBefore 메소드를 사용하여 DOM에 추가하면 현재 위치에서 노드를 제거하고 새로운 위치에 노드를 추가한다. (노드의 이동)

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
</body>
<script>
  const $fruits = document.getElementById('fruits');
    
  $fruits.insertBefore($fruits.lastElementChild, $fruits.firstElementChild);
</script>
```

<br>

### 노드 복사

`Node.prototype.cloneNode([deep: true] | false])` 메소드는 노드 자신의 사본을 생성하여 반환한다. 매개변수 deep에 true를 전달하면 노드 자신을 깊은복사하여 모든 자손노드가 포함된 사본을 생성하고 false를 전달하거나 생략하면 노드 자신을 **얕은복사**하여 노드 자신만의 사본을 생성한다. <strong>얕은 복사로 생성된 요소노드는 자손노드를 복사하지 않으므로 텍스트 노드도 없다.</strong>

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
</body>
<script>
  const $fruits = document.getElementById('fruits');

  console.log($fruits.cloneNode());
  console.log($fruits.cloneNode(true));
</script>
```

![image](https://user-images.githubusercontent.com/62285872/82750205-712df700-9de9-11ea-9c1c-51497073df33.png)	

<br>

### 노드 교체

``Node.prototype.replaceChild(newChild, oldChild)`` 메소드는 <strong>자신을 호출한 노드의 자식노드를 다른노드로 교체</strong>한다. 첫번째 매개변수에는 교체할 새로운 노드를 전달하고 두번째 매개변수에는 이미 존재하는 교체 될 노드를 전달한다. 두번째 매개변수에 전달한 노드는 replaceChild 메소드를 호출한 노드의 자식노드여야만 한다.

즉, replaceChild 메소드는 부모 노드의 자식인 oldChild 노드를 newChild 노드로 교체한다. 이때 oldChild 노드는 DOM에서 제거된다.

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
</body>
<script>
  const $fruits = document.getElementById('fruits');
  const $li = document.createElement('p');
  $li.textContent = 'replace element';
  $fruits.replaceChild($li, $fruits.lastElementChild);
</script>
```

두번째 인수로 전달받은 노드가 null이면 insertBefore 메소드를 호출한 노드의 마지막 자식 노드로 추가된다. 즉, appendChild 메소드처럼 동작한다.

<br>

### 노드 삭제

`Node.prototype.removeChild` 메소드는 매개변수에 전달한 노드를 DOM에서 삭제한다. 매개변수에 전달한 노드는 removeChild 메소드를 호출한 노드의 자식노드여야 한다.

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
</body>
<script>
  const $fruits = document.getElementById('fruits');

  $fruits.removeChild($fruits.lastElementChild);
</script>
```

<br>

## 어트리뷰트

### 어트리뷰트 노드와 attribute 프로퍼티

HTML 문서가 파싱될 때, HTML 요소의 어트리뷰트(HTML 어트리뷰트)는 어트리뷰트 노드로 변환되어 요소 노드 객체의 형제 노드로 추가된다. 이때 HTML 어트리뷰트 당 하나의 어트리뷰트 노드가 생성된다.

이때 모든 어트리뷰트 노드의 참조는 <strong>유사 배열 객체이자 이터러블인 NamedNodeMap 객체</strong>에 담겨서 요소 노드의 arrtibutes 프로퍼티에 저장된다.

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
  <input id="user" type="text" value="입력하세요">
</body>
```

![image](https://user-images.githubusercontent.com/62285872/82751018-4cd51900-9def-11ea-81a8-11fbe45c7e9e.png)

요소노드의 모든 어트리뷰트 노드는 요소노드의 `Element.prototype.attributes` 프로퍼티로 취득할 수 있다. attributes 프로퍼티는 getter만 존재하는 <strong>읽기전용 접근자 프로퍼티</strong>이며 요소노드의 모든 어트리뷰트 노드의 참조가 담긴 NamedNodeMap 객체를 반환한다.

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
  <input id="user" type="text" value="입력하세요">
</body>
<script>
  const { attributes } = document.getElementById('user');
  console.log(attributes);

  console.log(attributes.id.value); // user
  console.log(attributes.type.value);  // text 
  console.log(attributes.value.value);  // 입력하세요
</script>
```

![image](https://user-images.githubusercontent.com/62285872/82751309-3fb92980-9df1-11ea-86de-f64c5c1e5a2e.png)

### HTML 어트리뷰트 조작

`Element.prototype.getAttribute` 메소드를 사용하면 attributes 프로퍼티를 통하지 않고 요소노드에서 메소드를 통해 직접 HTML 어트리뷰트 값을 **취득**하거나 **변경**이 가능하다.

- HTML 어트리뷰트 값을 참조하려면 `Element.prototype.getAttribute(attributeName)` 메소드 사용
- HTML 어트리뷰트 값을 변경하려면 `Element.prototype.setAttribute(attributeName, attributeValue)` 메소드를 사용한다.

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
  <input id="user" type="text" value="입력하세요">
</body>
<script>
  const $user = document.getElementById('user');

  console.log($user.getAttribute('id'));  // user
  $user.setAttribute('id', 'wooseong');
  console.log($user.getAttribute('id'));  // wooseong
```

- HTML 어트리뷰트의 존재여부를 확인하려면 `Element.prototype.hasAttribute` 메소드 사용.
- HTML 어트리뷰트를 삭제하려면  `Element.prototype.removeAttribute` 메소드 사용.

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
  <input id="user" type="text" value="입력하세요">
</body>
<script>
  const $user = document.getElementById('user');

  console.log($user.hasAttribute('id')); // true
  $user.removeAttribute('id');
  console.log($user.hasAttribute('id')); // false
</script>
```

<br>

### HTML 어트리뷰트 & DOM 프로퍼티

요소노드 객체에는 HTML 어트리뷰트에 대응하는 프로퍼티(DOM 프로퍼티)가 존재한다. 이 DOM 프로퍼티들은 HTML 어트리뷰트 값을 초기값으로 가지고 있다.

```html
<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
  <input id="user" type="text" value="입력하세요">
</body>
<script>
  const $user = document.getElementById('user');
	// Element.prototype.attributes 프로퍼티로 접근
  console.log($user.attributes.id.value); // user
	// getter 함수로 접근
  console.log($user.getAttribute('id')); // user
	// DOM 프로퍼티로 접근
  console.log($user.id); // user
</script>
```

<strong>DOM 프로퍼티는 setter / getter가 모두 존재하는 접근자프로퍼티이다.</strong> 따라서 DOM 프로퍼티는 참조와 변경이 가능하다.

HTML 어트리뷰트는 아래와 같이 중복 관리되고 있는 것처럼 보인다.

1. 요소 노드의 arrtibutes 프로퍼티에서 관리하는 어트리뷰트 노드
2. HTML 어트리뷰트에 대응하는 요소 노드의 프로퍼티(DOM 프로퍼티)

하지만 실제로 어트리뷰트는 중복관리되고 있지 않다.

- HTML 어트리뷰트

HTML 어트리뷰트의 역할을 HTML 요소의 **초기상태**를 지정하는 것이다. 즉, HTML 어트리뷰트값은 HTML 요소의 초기 상태를 의미하며 이는 변하지 않는다.

<strong>요소 노드는 상태(state)를 가지고 있다.</strong> 예를 들어 input 요소는 사용자가 입력 필드에 입력한 값을 상태로 가지고 있으며, checkbox 요소는 사용자가 입력 필드에 입력한 체크 여부를 상태로 가지고 있다. input 요소나 checkbox 요소가 가지고 있는 상태는 사용자의 입력에 의해 변화하는 살아있는 것이다.

### 어트리뷰트 노드는 초기 상태를 관리한다

HTML 어트리뷰트로 지정한 HTML 요소의 초기상태는 <strong>어트리뷰트 노드</strong>에서 관리한다.  어트리뷰트 노드에서 관리하는 어트리뷰트 값은 사용자의 입력에 의해 상태가 변경되어도 변하지 않고 HTML 어트리뷰트로 지정한 HTML 요소의 초기 상태를 그대로 유지한다.

어트리뷰트 노드가 관리하는 초기 상태 값을 취득하거나 변경하려면 getAttribute/setAttribute 메소드를 사용한다. getAttribute 메소드로 취득한 값은 어트리뷰트 노드에서 관리하는 HTML 요소에 지정한 어트리뷰트 값, 즉 초기 상태 값이다. HTML 요소에 지정한 어트리뷰트 값은 사용자의 입력에 의해 변하지 않으므로 결과는 언제나 동일하다

```html

<body>
  <ul id="fruits">
    <li>Apple</li>
    <li>Banana</li>
    <li>Orange</li>
  </ul>
  <input id="user" type="text" value="입력하세요">
</body>
<script>
  const $user = document.getElementById('user');

  console.log($user.value);
  console.log($user.getAttribute('value'));
  console.log($user.attributes.value.value);
</script>
```

![image](https://user-images.githubusercontent.com/62285872/82752213-68dcb880-9df7-11ea-9e1d-9de4f7484d06.png)	

<br>

### DOM 프로퍼티는 최신 상태를 관리한다

사용자가 입력한 최신 상태는 HTML 어트리뷰트에 대응하는 요소 노드의 DOM 프로퍼티가 관리한다. DOM 프로퍼티는 사용자의 입력에 의한 상태 변화에 반응하여 언제나 최신 상태를 유지한다.

<strong>DOM 프로퍼티로 취득한 값</strong>은 HTML 요소의 <strong>최신 상태 값</strong>을 의미한다. 이 최신 상태 값은 사용자의 입력에 의해 언제든지 <strong>동적으로 변경되어 최신 상태를 유지</strong>한다. 이에 반해, getAttribute 메소드로 취득한 HTML 어트리뷰트 값, 즉 초기 상태 값은 변하지 않고 유지된다.

이처럼 HTML 어트리뷰트는 HTML 요소의 초기 상태 값을 관리하고 DOM 프로퍼티는 사용자의 입력에 의해 변경되는 최신 상태를 관리한다. 단, 모든 DOM 프로퍼티가 사용자의 입력에 의해 변경되는 최신 상태를 관리하는 것은 아니다.

예를 들어, id 어트리뷰트에 대응하는 id 프로퍼티는 사용자의 입력과 아무런 관계가 없다. input 요소의 사용자 입력에 의한 상태 변화는 value 프로퍼티가 관리하고 checkbox 요소의 사용자 입력에 의한 상태 변화는 checked 프로퍼티가 관리한다. 즉, id 프로퍼티는 사용자의 입력과 아무런 관계가 없다.

따라서 <strong>사용자 입력에 의한 상태 변화와 관계없는 id 어트리뷰트와 id 프로퍼티는 사용자 입력과 관계없이 항상 동일한 값을 유지한다. 즉, id 어트리뷰트 값이 변하면 id 프로퍼티 값도 변하고 그 반대도 마찬가지다.</strong>

이처럼 사용자 입력에 의한 상태 변화와 관계있는 DOM 프로퍼티만 최신 상태 값을 관리한다. 그 외의 사용자 입력에 의한 상태 변화와 관계없는 어트리뷰트와 DOM 프로퍼티는 항상 동일한 값으로 연동한다.

<br>

### HTML 어트리뷰트와 DOM 프로퍼티의 대응관계

대부분의 HTML 어트리뷰트 값은 HTML 어트리뷰트 이름과 동일한 DOM 프로퍼티 키로 참조할 수 있다. 단, 아래와 같이 HTML 어트리뷰트와 DOM 프로퍼티가 언제나 1:1로 대응하는 것은 아니며 HTML 어트리뷰트 이름과 DOM 프로퍼티 키가 반드시 일치하는 것도 아니다.

- id 어트리뷰트와 id 프로퍼티는 1:1 대응하며 동일한 값으로 연동한다.
- input 요소의 value 어트리뷰트는 value 프로퍼티와 1:1 대응한다. 하지만 value 어트리뷰트는 초기상태를, value 프로퍼티는 최신상태를 갖는다.
- class 어트리뷰트는 className, classList 프로퍼티와 대응한다.
- for 어트리뷰트는 htmlFor 프로퍼티와 대응한다.
- td 요소의 colspan 어트리뷰트는 대응하는 프로퍼티가 **존재하지** **않는다.**
- textContent 프로퍼티는 대응하는 어트리뷰트가 <strong>존재하지 않는다.</strong>
- 어트리뷰트의 이름은 대소문자를 구별하지 않지만 <strong>대응하는 프로퍼티 키는 카멜케이스</strong>를 따른다.

<br>

### DOM 프로퍼티 값의 타입

getAttribute 메소드로 취득한 어트리뷰트 값은 언제나 **문자열**이다. 하지만 DOM 프로퍼티로 취득한 상태 값은 문자열이 아닐 수도 있다. 예를 들어, checkbox 요소의 checked 어트리뷰트 값은 문자열이지만 checked 프로퍼티 값은 불리언 타입이다.

```html
<body>
  <input type="checkbox" checked>
</body>
<script>
  const $checkbox = document.querySelector('input[type$="checkbox"]');
  console.log($checkbox.getAttribute('checked')); // ""
  console.log($checkbox.checked); // true
</script>
```

<br>

## 스타일

### 인라인 스타일 조작

`HTMLElement.prototype.style` 프로퍼티는 setter와 getter 모두 존재하는 접근자 프로퍼티로 요소노드의 인라인 스타일을 **취득**하거나 **변경**한다.

style 프로퍼티는 CSSStyleDeclaration 타입의 객체를 반환한다. CSSStyleDeclaration 객체는 다양한 CSS 프로퍼티에 대응하는 프로퍼티를 가지고 있으며 이 프로퍼티에 값을 할당하면 해당 프로퍼티가 <strong>인라인 스타일</strong>로 HTML요소에 추가된다.

```html
<body>
  <div style="color: red">Hello World</div>
</body>
<script>
  const $div = document.querySelector('div');

  console.log($div.style);

  $div.style.color = 'blue';
  $div.style.display = 'block';
  $div.style.backgroundColor = 'orange';
  $div.style.width = '200px';
  $div.style.height = '200px';
</script>
```

CSS 프로퍼티는 <strong>케밥 케이스</strong>를 따른다. 이에 대응하는 CSSStyleDeclaration 객체의 프로퍼티는 **카멜케이스**를 따른다. 예를 들어 CSS 프로퍼티 background-color에 대응하는 CSSStyleDeclaration 객체의 프로퍼티 backgroundColor이다.

```js
// 객체의 프로퍼티 - 카멜케이스
$div.style.backgroundColor = 'yellow';

// 대괄호 표기법을 사용한 케밥케이스 사용 (CSS 프로퍼티처럼)
$div.style['background-color'] = 'yellow';
```

단위 지정이 필요한 CSS 프로퍼티의 값은 반드시 **단위**를 **지정**하여야 한다. 예를 들어 px, em, % 등의 크기 단위가 필요한 width 프로퍼티에 값을 할당할 때 단위를 생략하면 해당 CSS 프로퍼티는 적용되지 않는다.

```JS
$div.style.width = '100px';
```

<br>

### 클래스 조작

스타일 시트(CSS 파일) 또는 style 요소에 class로 스타일을 미리 정의한 다음, HTML 요소의 class 어트리뷰트 값을 변경하여 HTML 요소의 스타일을 변경할 수도 있다.

이 때 HTML 요소의 class 어트리뷰트를 조작하려면 해당 어트리뷰트에 대응하는 요소노드의 프로퍼티를 사용한다. class 어트리뷰트에 대응하는 요소노드의 프로퍼티는 `className`과 `classList`이다. (자바스크립트에서 class는 예약어이다.)

#### className

`Element.prototype.className` 프로퍼티는 setter/ getter 모두 존재하는 접근자 프로퍼티로 요소노드의 class 어트리뷰트 값을 취득하거나 변경한다.

요소노드의 className 프로퍼티를 참조하면 class 어트리뷰트를 **문자열**로 반환한고, 요소노드의 className프로퍼티에 문자열을 할당하면 class 어트리뷰트 값을 변경한다.

```html
<head>
  <style>
    .box {
      width: 100px; height: 100px;
      background-color: antiquewhite;
    }
    .red { color: red; }
    .blue { color: blue; }
  </style>
</head>

<body>
  <div class="box red">Hello World</div>
</body>
<script>
  const $box = document.querySelector('.box');
  console.log($box.className);

  // String.prototype.replace 메소드 사용하여 변경
  $box.className = $box.className.replace('red', 'blue'); 
  console.log($box.className);
</script>
```

<br>

#### classList

`Element.prototype.classList` 프로퍼티는 class 어트리뷰트 값을 담은 DOMTokemList 객체를 반환한다. DOMTokenList 객체는 공백문자로 구분된 토큰들로 구성된 컬렉션 객체로 **유사배열객체**이자 **이터러블**이다.

DOMTokenList 객체는 아래와 같은 메소드들을 제공한다.

- add(...className)

인수로 전달한 1개 이상의 **문자열**을 class 어트리뷰트에 **추가**한다.

- remove(...className)

인수로 전달한 1개 이상의 **문자열**을 class 어트리뷰트에서 **삭제**한다.

- item(index)

인수로 전달한 **index**에 해당하는 문자열을 class 어트리뷰트에서 **반환**한다.

- contains(className)

인수로 전달한 **문자열**에 해당하는 클래스가 class 어트리뷰트에 포함되어 있는지 확인한다.

- replace(oldClassName, newClassName)

class 어트리뷰트에서 첫번째 인수로 전달한 문자열을 두번째 인수로 전달한 문자열로 **변경**

- toggle(className[, 조건식])

class 어트리뷰트에 인수로 전달한 문자열이 존재하면 **삭제**하고, 존재하지 않으면 **추가**한다.

2번째 인수로 조건식을 전달할 수 있다. 이 때 조건식의 평가결과가 true이면 class 어트리뷰트에 첫번째 인수로 전달받은 문자열을 추가하고, false이면 강제로 제거한다.

이외에도, DOMTokenList 객체는 forEach / entries / keys / values / supports 메소드를 제공한다.

<br>

### 요소에 적용되어 있는 CSS 스타일 참조

style 프로퍼티는 인라인 스타일만을 반환한다. 때문에 클래스를 적용한 스타일이나 상속을 통해 암묵적으로 적용된 스타일은 style 프로퍼티로 참조할 수 없다.

HTML 요소에 적용되어 있는 모든 CSS 스타일을 참조해야할 경우, `getComputedStyle` 메소드를 사용한다. 평가된 스타일(computed style)이란 요소 노드에 적용되어 있는 모든 스타일, 즉 링크 스타일, 임베딩 스타일, 인라인 스타일, 자바스크립트에서 적용한 스타일, 상속된 스타일, 기본(user agent) 스타일 등 모든 스타일이 조합되어 최종적으로 적용된 스타일을 말한다.

```html
<body>
  <div class="box red">Hello World</div>
</body>
<script>
  const $box = document.querySelector('.box');
  console.log($box.style.display);
  const computedStyle = window.getComputedStyle($box);
  console.log(computedStyle.display); // block
  console.log(computedStyle.width); // 100px
  console.log($box.style.display); // ''
  console.log($box.style.width); // ''
</script>
```

<br>

## DOM 표준

HTML과 DOM 표준은 W3C(World Wide Web Consortium)와 WHATWG(Web Hypertext Application Technology Working Group) 두 단체가 나름대로 협력하면서 공통된 표준을 만들어왔다.

그런데 두 단체가 서로 다른 결과물을 내놓기 시작하면서 2018년 4월 네 주류 브라우저 벤더사인 구글 / 애플 / 마이크로소프트 / 모질라 가 주도하는 WHATWG이 단일표준을 내놓기로 두 단체가 합의했다.

- DOM 레벨

| 레벨        | 표준 문서 URL                          |
| :---------- | :------------------------------------- |
| DOM Level 1 | https://www.w3.org/TR/REC-DOM-Level-1  |
| DOM Level 2 | https://www.w3.org/TR/DOM-Level-2-Core |
| DOM Level 3 | https://www.w3.org/TR/DOM-Level-3-Core |
| DOM Level 4 | https://dom.spec.whatwg.org            |