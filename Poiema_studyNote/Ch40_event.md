# 이벤트

- Toc

1.

<br>

<br>

## 이벤트 드리븐 프로그래밍

브라우저는 처리해야 할 특정 사건이 발생하면 이를 감지하여 이벤트(event)를 발생(trigger)시킨다. 예를 들어 **클릭**, <strong>키보드 입력, 마우스 이동</strong> 등이 일어나면 브라우저는 이를 감지하여 특정한 타입의 이벤트를 발생시킨다.

만약 애플리케이션이 특정 타입의 이벤트에 대해 반응하여 어떤 일을 하고 싶다면 해당하는 타입의 이벤트가 발생했을 때 호출될 함수를 **브라우저**에게 알려 호출을 **위임**한다.

이벤트가 발생했을 때 호출될 함수를 **이벤트핸들러**(event handler)라 하고, 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 <strong>이벤트 핸들러 등록</strong>이라 한다.

Window, Document, HTMLElement 타입의 객체는 onclick과 같이 이벤트에 대응하는 다양한 <strong>이벤트 핸들러 프로퍼티</strong>를 가지고 있다. 이 이벤트 핸들러 프로퍼티에 함수를 할당하면 해당 이벤트가 발생했을 때 할당한 함수가 브라우저에 의해 호출된다.

이처럼 이벤트와 그에 대응하는 함수를 통해 사용자와 애플리케이션은 상호작용이 가능하게 되며 이와 같이 프로그램의 흐름을 이벤트 중심으로 제어하는 프로그래밍 방식을 이벤트 드리븐 프로그래밍이라 한다.

<br>

## 이벤트 타입

이벤트 타입(event type)은 이벤트의 종류를 나타내는 문자열이다. 이벤트에 대한 상세 목록은 [MDN의 Event reference](https://developer.mozilla.org/ko/docs/Web/Events)에서 확인할 수 있다.

### 마우스 이벤트

| 이벤트 타입 | 이벤트 발생 시점                    |
| :---------- | :---------------------------------- |
| click       | 마우스 버튼을 클릭했을 때           |
| dbclick     | 마우스 버튼을 더블 클릭했을 때      |
| mousedown   | 마우스 버튼을 눌렀을 때             |
| mouseup     | 누르고 있던 마우스 버튼을 놓았을 때 |
| mousemove   | 마우스를 움직였을 때                |
| mousenter   | 마우스를 요소 안으로 이동했을 때    |
| mouseleave  | 마우스를 요소 밖으로 이동했을 때    |

### 키보드 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                             |
| :---------- | :----------------------------------------------------------- |
| keydown     | 모든 키를 눌렀을 때 발생한다. * control, option, shift, tab, delete, 방향 키와 문자, 숫자, 특수 문자 키를 눌렀을 때 발생한다. 단, 문자, 숫자, 특수 문자 키를 눌렀을 때는 연속적으로 발생하지만 그 외의 키를 눌렸을 때는 한번만 발생한다. |
| keypress    | 문자 키를 눌렀을 때 연속적으로 발생한다. * control, option, shift, tab, delete, 방향 키 등을 눌렸을 때는 발생하지 않고 문자, 숫자, 특수 문자 키를 눌렸을 때만 발생한다. |
| keyup       | 누르고 있던 키를 놓았을 때 한번만 발생한다. * control, option, shift, tab, delete, 방향 키와 문자, 숫자, 특수 문자 키를 놓았을 때 발생한다. |

### 포커스 이벤트

| 이벤트 타입 | 이벤트 발생 시점                              |
| :---------- | :-------------------------------------------- |
| focus       | 요소가 포커스를 받았을 때 (버블링하지 않는다) |
| blur        | 요소가 포커스를 잃었을 때 (버블링하지 않는다) |

### 폼 이벤트

| 이벤트 타입 | 이벤트 발생 시점                              |
| :---------- | :-------------------------------------------- |
| submit      | submit 버튼을 클릭했을 때                     |
| reset       | reset 버튼을 클릭했을 때 (최근에는 사용 안함) |

### 값 변경 이벤트

| 이벤트 타입      | 이벤트 발생 시점                                             |
| :--------------- | :----------------------------------------------------------- |
| input            | input(text, checkbox, radio), select, textarea 요소의 값이 입력되었을 때 |
| change           | input(text, checkbox, radio), select, textarea 요소의 값이 변경되었을 때. * change 이벤트는 input 이벤트와는 달리 요소가 포커스를 잃었을 때 사용자 입력이 종료되었다고 인식하여 발생한다. 즉, 사용자가 입력을 하고 있을 때는 input 이벤트가 발생하고 사용자 입력이 종료되어 값이 변경되면 change 이벤트가 발생한다. |
| readystatechange | HTML 문서의 로드와 파싱 상태를 나타내는 readyState 프로퍼티 값(‘loading’, ‘interactive’, ‘complete’)이 변경될 때 |

### DOM 뮤테이션 이벤트

| 이벤트 타입      | 이벤트 발생 시점                                             |
| :--------------- | :----------------------------------------------------------- |
| DOMContentLoaded | HTML 문서의 로드와 파싱이 완료되어 DOM 및 CSSOM 생성이 완료되었을 때 |

### 뷰 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                             |
| :---------- | :----------------------------------------------------------- |
| resize      | 브라우저 윈도우(window)의 크기를 리사이즈할 때 연속적으로 발생한다. * 오직 window 객체에서만 발생한다. |
| scroll      | 웹페이지(document) 또는 요소를 스크롤할 때 연속적으로 발생한다. |

### 리소스 이벤트

| 이벤트 타입 | 이벤트 발생 시점                                             |
| :---------- | :----------------------------------------------------------- |
| load        | DOMContentLoaded 이벤트 이후, 모든 리소스(이미지, 폰트 등)의 로딩이 완료되었을 때 (주로 window 객체에서 발생) |
| unload      | 리소스가 언로드될 때(주로 새로운 페이지를 요청한 경우)       |
| abort       | 리소스 로딩이 중단되었을 때                                  |
| error       | 리소스 로딩이 실패했을 때                                    |

<br>

### 이벤트 핸들러 등록

이벤트 핸들러는 <strong>이벤트가 발생했을 때</strong> 브라우저에 **호출을** **위임**한 **함수**이다. 이벤트가 발생했을 때 브라우저에게 이벤트 핸들러의 호출을 위임하는 것을 이벤트 핸들러 등록이라 한다.

이벤트 핸들러를 등록하는 방법은 3가지이다.

### 이벤트 핸들러 어트리뷰트 방식

HTML 요소의 어트리뷰트에는 이벤트에 대응하는 이벤트 핸들러 어트리뷰트가 있다. 이벤트핸들러 어트리뷰트는 on 접두사와 이벤트의 종류는 나타내는 **이벤트타입**으로 이루어져 있다. HTML 요소의 이벤트 핸들러 어트리뷰트 값으로 문을 할당하면 이벤트 핸들러가 등록된다.

```HTML
<body>
  <button onclick="sayHi('Lee')">Click me!</button>
  <script>
    function sayHi(name) {
      console.log(`Hi! ${name}.`);
    }
  </script>
</body>
```

위 코드는 인벤트 핸들러 어트리뷰트 **값**으로 **함수참조**가 아닌 **함수호출문**을 할당했다.

이벤트 핸들러 등록이란 함수의 **호출**을 브라우저에게 **위임**하는 것으로 이벤트 핸들러를 **등록**할 때 콜백함수와 마찬가지로 함수참조를 등록해야 브라우저가 이벤트 핸들러를 이벤트가 발생하였을 때 호출할 수 있다. 때문에 함수를 반환하는 고차 함수 호출문이 아닌 특정 '값'을 반환하는 함수 호출문을 이벤트 핸들러로 등록한다면 브라우저가 이벤트 핸들러를 호출할 수 없다.

하지만, 사실 이벤트 핸들러 어트리뷰트의 값으로 함수 호출문을 할당하게 되면 이 때 이벤트 핸들러 어트리뷰트 값은 <strong>이벤트 핸들러의 함수 몸체를 의미</strong>하게 된다. 즉, 위코드에서 `onclick="sayHi('Lee')"` 는 아래와 같은 함수를 의미하게 된다.

```js
function onclick(event) {
    sayHi('Lee');
}
```

이처럼 동작하는 이유는 이벤트 핸들러 어트리뷰트 값으로 함수참조를 할당하면 이벤트 핸들러에 인수를 전달하기 곤란하기 때문이다. 결국 이벤트 핸들러 어트리뷰트 값으로 할당한 문자열은 암묵적으로 정의되는 이벤트 핸들러의 함수 몸체이다. 따라서 이벤트 핸들러 어트리뷰트 값으로 여러 개의 문을 할당할 수 있다.

이벤트 핸들러 **어트리뷰트** 방식은 사용하지 않는 것이 좋다. 단, CBD(Component Based Development) 방식의 Angular/React/Svelte/Vue.js와 같은 프레임워크/라이브러리에서는 이벤트 핸들러 어트리뷰트 방식으로 이벤트를 처리한다. CBD에서는 HTML, CSS, 자바스크립트 모두를 뷰를 구성하기 위한 구성 요소로 본다.

<br>

### 이벤트 핸들러 프로퍼티 방식

window 객체와 Document, HTMLElement 타입의 DOM 노드객체는 이벤트에 대응하는 이벤트 핸들러 **프로퍼티**를 가지고 있다. 이벤트 핸들러 프로퍼티는 이벤트 핸들러 어트리뷰트 처럼 ON 접두사와 이벤트 타입으로 이루어져 있다. 이벤트 핸들러 프로퍼티에 **함수**를 **바인딩**하면 이벤트 핸들러가 **등록** 된다.

```html
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // 이벤트 핸들러 프로퍼티에 이벤트 핸들러를 바인딩
    $button.onclick = function () {
      console.log('button click');
    };
  </script>
</body>
```

이벤트 핸들러를 등록하기 위해서는 이벤트를 발생시킬 객체인 이벤트 타겟(event target)과 이벤트의 종류를 나타내는 문자열인 이벤트 타입, 그리고 이벤트 핸들러를 지정할 필요가 있다.

![image](https://user-images.githubusercontent.com/62285872/82811078-e45b6a00-9eca-11ea-923a-965c0332f6de.png)

이벤트 핸들러는 대부분 이벤트를 발생시킬 이벤트 타깃에 바인딩한다. 하지만 반드시 이벤트 핸들러를 이벤트 타깃에 바인딩해야 하는 것은 아니다. <strong>이벤트 핸들러는 이벤트 타깃 또는 전파된 이벤트를 캐치할 DOM 노드 객체에 바인딩한다.</strong>

앞서 살펴본 이벤트 핸들러 어트리뷰트 방식도 결국 DOM 노드의 이벤트 핸들러 프로퍼티로 변환되므로 결과적으로 이벤트 핸들러 프로퍼티 방식과 동일하다고 할 수 있다. 이벤트 핸들러 프로퍼티 방식은 이벤트 핸들러 어트리뷰트 방식의 HTML과 자바스크립트가 뒤섞이는 문제를 해결할 수 있다. <strong>하지만 이벤트 핸들러 프로퍼티에 하나의 이벤트 핸들러 만을 바인딩할 수 있다는 단점이 있다.</strong>

만약 이벤트 핸들러 프로퍼티 방식으로 등록한 이벤트 핸들러를 제거하려면 이벤트 핸들러 프로퍼티에 **null**을 할당한다.

<br>

### addEventListener 메소드 방식

DOM Level 2에서 도입된 `EventTarget.prototype.addEventListener` 메소드 를 사용하여 이벤트 핸들러를 등록할 수 있다. 이벤트 핸들러 어트리뷰트 / 프로퍼티 방식은 DOM Level 0 부터 제공되었던 방식이다.

![image](https://user-images.githubusercontent.com/62285872/82811487-d9eda000-9ecb-11ea-956f-9fc07c42d439.png)

```html
EventTarget.addEventListener(이벤트타입, 이벤트핸들러, 캡쳐링 사용여부)
```

```html
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    // addEventListener 메소드 방식
    $button.addEventListener('click', function () {
      console.log('button click');
    });
  </script>
</body>
```

addEventListener 메소드 방식은 이벤트 핸들러 프로퍼티에 바인딩된 이벤트 핸들러에 <strong>아무런 영향을 주지 않는다.</strong>

2개 이상의 이벤트 핸들러를 바인딩 할 수 없는 이벤트 핸들러 프로퍼티 방식과 달리 <strong>addEventListener 메소드는 2개 이상의 이벤트 핸들러를 등록할 수 있다. </strong> 단, 여러개를 등록할 경우 이벤트 핸들러는 등록된 순서대로 호출되며 참조가 동일한 이벤트 핸들러를 중복 등록할 경우 하나의 이벤트 핸들러만 등록되게 된다.

<br>

## 이벤트 핸들러 제거

addEventListener 메소드로 등록한 이벤트 핸들러를 제거하려면 `EventTarget.prototype.removeEventListener` 메소드를 사용한다. removeEventListener 메소드에 전달할 인수는 addEventListener 메소드와 동일하다. <strong>단, addEventListener 메소드에 전달한 인수와 removeEventListener 메소드에 전달한 인수가 일치하지 않으면 이벤트 핸들러가 제거되지 않으니 유의하자.</strong>

- 무명 함수를 이벤트 핸들러로 등록한 경우, `removeEventListener` 메소드로는 제거할 수 없다. `removeEventListener` 메소드에 전달한 제거 대상 이벤트 핸들러는 `addEventListener` 메소드에 전달한 등록 이벤트 핸들러는 <strong>동일한 참조</strong>를 갖는 함수여야 하기 때문이다.

- 단, 이벤트 핸들러 **내부**에서 removeEventListener 메소드를 호출하여 자신을 제거하는 방법은 가능하다. 이때 이벤트 핸들러는 단 한번만 호출된다.

```js
$button.addEventListener('click', function foo() {
  console.log('button click');
  $button.removeEventListener('click', foo);
});
```

만약, 기명함수를 이벤트 핸들러로 등록할 수 없다면 호출된 함수, 즉 함수자신을 가리키는 `arguments.callee` 프로퍼티를 사용할 수도 있다. 단, arguments.callee는 strict mode에서는 사용이 금지된다. <strong>따라서 가급적 이벤트 핸들러의 참조를 변수나 자료 구조에 저장하여 제거하는 편이 좋다.</strong>

<br>

## 이벤트 객체

이벤트가 발생하면 이벤트에 관련한 다양한 정보를 담고 있는 <strong>이벤트 객체가 동적으로 생성된다.</strong> 생성된 이벤트 객체는 이벤트 핸들러의 첫번째 매개 변수에게 전달된다.

따라서 이벤트 객체를 전달받으려면 이벤트 핸들러를 정의할 때, 이벤트 객체를 전달받을 매개 변수를 명시적으로 선언하여야 한다.

```html
<body>
  <p>클릭하세요. 클릭한 곳의 좌표가 표시됩니다.</p>
  <em class="message"></em>
  <script>
    const $msg = document.querySelector('.message');
      // e -> 이벤트 객체
    function showCoords(e) {
      $msg.textContent = `clientX: ${e.clientX}, clientY: ${e.clientX}`;
    }

    window.onclick = showCoords;
  </script>
</body>
```

### 이벤트 객체의 상속구조

이벤트가 발생하면 발생한 이벤트의 **타입**에 따라 다양한 타입의 이벤트 객체가 생성된다.

![image](https://user-images.githubusercontent.com/62285872/82813066-4c13b400-9ecf-11ea-898b-3b630ab3691d.png)

위 그림의 Event, UIEvent, MouseEvent 등은 모두 <strong>생성자 함수</strong>이다. 따라서 이벤트 객체를 생성할 수 있다.

```html
<body>
  <script>
    let e = new Event('foo');
    console.log(e.type); // "foo"
    console.log(e instanceof Event); // true
    console.log(e instanceof Object); // true
  </script>
</body>
```

이처럼 이벤트가 발생하면 생성되는 이벤트 객체도 생성자 함수에 의해 생성되며 생성자 함수와 더불어 생성되는 프로토타입으로 구성된 프로토타입 체인의 일원이 된다.

![image](https://user-images.githubusercontent.com/62285872/82813503-29ce6600-9ed0-11ea-8eca-af6f31bb0906.png)

Event 인터페이스는 DOM 내에서 발생한 이벤트를 나타낸다. Event 인터페이스에는 모든 이벤트 객체의 공통 프로퍼티가 정의되어 있고 FocusEvent, MouseEvent, KeyboardEvent, WheelEvent과 같은 하위 인터페이스에는 이벤트 타입에 따라 고유한 프로퍼티가 정의되어 있다. 즉, 이벤트 객체의 프로퍼티는 발생한 이벤트의 타입에 따라 달라진다.

### 이벤트 객체의 공통 프로퍼티

Event 인터페이스, 즉 Event.prototype에 정의되어 있는 이벤트 관련 프로퍼티는 UIEvent, CustomEvent, MouseEvent 등 모든 파생 이벤트 객체에 상속된다. 즉, Event 인터페이스의 모든 이벤트 객체의 공통 프로퍼티를 파생 이벤트 객체에 상속한다. 이벤트 객체의 공통 프로퍼티는 아래와 같다.

| 프로퍼티         | 설명                                                         | 타입          |
| :--------------- | :----------------------------------------------------------- | :------------ |
| type             | 이벤트 타입                                                  | 문자열        |
| target           | 이벤트를 발생시킨 DOM 요소                                   | DOM 요소 노드 |
| currentTarget    | 이벤트 핸들러가 바인딩된 DOM 요소                            | DOM 요소 노드 |
| eventPhase       | 이벤트 전파 단계를 나타낸다. 0: 이벤트 없음, 1: 캡처링 단계, 2: 타깃 단계, 3: 버블링 단계 | 숫자          |
| bubbles          | 이벤트를 버블링으로 전파하는지 여부를 나타낸다. 아래 이벤트는 bubbles: false로 버블링하지 않는다. - 포커스 이벤트 focus/blur - 리소스 이벤트 load/unload/abort/error - 마우스 이벤트 mouseenter/mouseleave | 불리언        |
| cancelable       | preventDefault 메소드를 호출하여 이벤트의 기본 동작을 취소할 수 있는지 여부를 나타낸다. 아래 이벤트는 cancelable: false로 취소할 수 없다. - 포커스 이벤트 focus/blur - 리소스 이벤트 load/unload/abort/error - 마우스 이벤트 dbclick/mouseenter/mouseleave | 불리언        |
| defaultPrevented | preventDefault 메소드를 호출하여 이벤트를 취소하였는지 여부를 나타낸다. | 불리언        |
| isTrusted        | 사용자의 행위에 의해 발생한 이벤트인지 여부를 나타낸다. 자바스크립트 코드를 통해 인위적으로 발생시킨 이벤트, 예를 들어 click 메소드 또는 dispatchEvent 메소드를 통해 발생시킨 이벤트인 경우, isTrusted는 false이다.(“40.11. 커스텀 이벤트” 참고) | 불리언        |
| timeStamp        | 이벤트가 발생한 시각(1970/01/01/00:00:00부터 경과한 밀리초)  | 숫자          |

![image](https://user-images.githubusercontent.com/62285872/82814503-4370ad00-9ed2-11ea-836c-f3ac94f24eb9.png)

```html
<body>
  <button>Click me!</button>
  <script>
    const $button = document.querySelector('button');

    $button.onclick = function (e) {
      console.log(e);
    };
  </script>
</body>
```

- checkbox 예제

```html
<body>
  <input type="checkbox" checked>
  <em class="message">off</em>
  <script>
    const $checkbox = document.querySelector('[type="checkbox"]');
    const $msg = document.querySelector('.message');

    $checkbox.onchange = function (e) {
      console.log(e.currentTarget === $checkbox); // true
      console.log(e.target === $checkbox); // true
    }
  </script>
</body>
```

위 예제에서 이벤트를 발생시킨 DOM요소를 나타내는 `e.target` 과 이벤트 핸들러가 바인딩된 DOM요소를 나타내는 `e.currentTarget` 은 같다.

이처럼 일반적으로 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티는 동일한 DOM 요소를 가리키지만 나중에 살펴볼 이벤트 위임에서는 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티가 다른 DOM 요소를 가리킬 수 있다. 

### 마우스 정보 취득

click, dbclick, mousedown, mouseup, mousemove, mousenter, mouseleave 이벤트가 발생하면 생성되는 **MouseEvent** 타입의 이벤트 객체는 아래와 같은 고유의 프로퍼티를 갖는다.

- 마우스 포인터의 좌표정보를 나타내는 프로퍼티 

screenX/screenY, clientX/clientY, pageX/pageY, offsetX/offsetY

clientX/clientY는 뷰포트(Viewport), 즉 웹페이지의 가시 영역을 기준으로 마우스 포인터 좌표를 나타낸다.

- 버튼 정보를 나타내는 프로퍼티

altKey, ctrlKey, shiftKey, button

### 키보드 정보 취득

keydown, keyup, keypress 이벤트가 발생하면 생성되는 KeyboardEvent 타입의 이벤트 객체는 altKey, ctrlKey, shiftKey, metaKey, key, keyCode와 같은 고유의 프로퍼티를 갖는다.

- input 요소의 입력 필드에 엔터 키가 입력되면 현재까지 입력 필드에 입력된 값을 출력하는 예제

```html
<body>
  <input type="text">
  <em class="message"></em>
  <script>
    const $input = document.querySelector('[type="text"]');
    const $msg = document.querySelector('.message');

    $input.onkeyup = function (e) {
      if (e.keyCode !== 13) return;
      $msg.textContent = e.target.value;
      e.target.value = '';
    };
  </script>
</body>
```

<br>

## 이벤트 전파

DOM 트리 상에 존재하는 DOM 요소 노드에서 발생한 이벤트는 DOM 트리를 통해 **전파**된다. 이를 이벤트 전파(event propagation)라고 한다.

```html
<html>
    <body>
      <ul id="fruits">
        <li id="apple">Apple</li>
        <li id="banana">Banana</li>  <!-- 이벤트 발생 -->
        <li id="orange">Orange</li>
      </ul>
    </body> 
</html>
```

![image](https://user-images.githubusercontent.com/62285872/82817787-8d5c9180-9ed8-11ea-8a32-f3237a8594fb.png)

- 이벤트 전파 단계

1. 캡쳐링 단계(capturing phase): 이벤트가 상위요소에서 하위요소 방향으로 전파

2. 타깃 단계(target phase): 이벤트가 이벤트 타깃에 도달

3. 버블링 단계(bubbling phase): 이벤트가 하위요소에서 상위요소 방향으로 전파

이벤트 핸들러 어트리뷰트/프로퍼티 방식으로 등록한 이벤트 핸들러는 <strong>타깃 단계와 버블링 단계의 이벤트만을 캐치할 수 있다.</strong> 하지만 `addEventListener` 메소드 방식으로 등록한 이벤트 핸들러는 버블링 또는 캡처링 단계의 이벤트를 **선별적**으로 캐치할 수 있다. 

버블링 단계 또는 캡처링 단계의 모든 이벤트는 이벤트 패스(이벤트가 통과하는 DOM 트리 상의 경로)에 위치한 모든 DOM 요소에서 캐치할 수 있다. 이벤트 패스는 `Event.prototype.composedPath` 메소드로 확인할 수 있다.

- Event.prototype.compesedPath()

![image](https://user-images.githubusercontent.com/62285872/82819490-6c497000-9edb-11ea-8783-72a3d4892681.png)

<br>

## 이벤트 위임

```html
body>
  <nav>
    <ul id="fruits">
      <li id="apple" class="active">Apple</li>
      <li id="banana">Banana
        <a>click!</a>
      </li>
      <li id="orange">Orange</li>
    </ul>
  </nav>
  <div>선택된 네비게이션 아이템: <em class="msg">apple</em></div>
  <script>
    const $fruits = document.getElementById('fruits');
    const $msg = document.querySelector('.msg');

    function activate({ target }) {
      if (!target.matches('#fruits > li')) return;
    
      [...$fruits.children].forEach($fruit => {
        $fruit.classList.toggle('active', $fruit === target);
        $msg.textContent = target.id;
      });
    }

    $fruits.onclick = activate;
  </script>
</body>

```

일반적으로 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티는 동일한 DOM 요소를 가리키지만 이벤트 위임을 통해 상위 요소에 이벤트를 바인딩한 경우, 이벤트 객체의 target 프로퍼티와 currentTarget 프로퍼티가 다른 DOM 요소를 가리킬 수 있다. 위 예제에서는 아래와 같이 $fruits 요소에 이벤트를 바인딩하였다

이때 이벤트 객체의 currentTarget 프로퍼티는 언제나 변함없이 $fruits 요소를 가리키지만 이벤트 객체의 target 프로퍼티는 실제로 이벤트를 발생시킨 요소를 가리킨다. $fruits 요소도 클릭 이벤트를 발생시킬 수 있으므로 이 경우 이벤트 객체의 currentTarget 프로퍼티와 target 프로퍼티는 동일한 $fruits 요소를 가리키지만 $fruits 요소의 하위 요소에서 클릭 이벤트가 발생한 경우 이벤트 객체의 currentTarget 프로퍼티와 target 프로퍼티는 다른 요소를 가리킨다.

> 포커스 이벤트 focus, blur는 이벤트가 버블링되지 않는다. 따라서 하위 요소에서 focus, blur이벤트를 발생시키는 경우, 이벤트 위임을 사용할 수 없다.
>
> ```html
> <body>
>   <div class="container">
>     <input type="text">
>   </div>
> <script>
>   const $container = document.querySelector('.container');
> 
>   // input 이벤트는 버블링되므로 상위 요소에 이벤트 위임을 할 수 있다.
>   $container.addEventListener('input', e => {
>     console.log(e); // 버블링 o
>   });
> 
>   $container.addEventListener('focus', e => {
>     console.log(e); // 버블링 x
>   });
> 
>   $container.addEventListener('blur', e => {
>     console.log(e); // 캡쳐링 o
>   }, true);
> </script>
> </body>
> ```

<br>

## 기본 동작의 변경

### 기본 동작 중단

