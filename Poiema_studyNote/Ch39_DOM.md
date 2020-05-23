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

