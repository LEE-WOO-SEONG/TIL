## HTML이란?

HyperText- MarkupLanguage 의 약자.

HyperText : 기존의 순차적으로 콘텐츠에 접근하던 방식과 다르게, 특정 태그를 이용해서 다른페이지 혹은 같은 페이지 내의 다른 위치로의 이동이 가능하게 함.

Markup : HyperText를 가능하게 하기 위한 일종의 '표시'를 뜻함. (tag를 이용)

> tag란?
>
> tag는 꼬리표라는 의미로 tag를 이용하여 이 부분을 어떻게 나타내겠다 라는 마크업을 가능하게 한다.

Language: 컴퓨터와 소통하기 위한 언어.

## DOCTYPE 의 역할

document type의 약자로 문서의 타입을 정의할 때 사용한다.

doctype의 선언이 필요한 이유는 각각의 TYPE마다 브라우저에서 사용할 수 있는 tag와 속성이 다르기 때문이며, doctype을 선언하지 않았을 경우 브라우저가 **비표준모드**로 렌더링되어 크로스브라우징의 어려움을 겪게될 수 있음.

(브라우저가 비표준모드 (Quirk mode)로 렌더링 될 경우 이전 세대의 브라우저에 맞는 비표준적 방식의 css를 적용하게 된다.)

> 문서의 타입
>
> 1. Strict
>
> 엄격한 규격으로 css 사용을 장려하기 위해 단계적으로 사라질 표현에 관한 tag와 속성을 배제한 문서타입.
>
> 2. Transitional
>
> 과도기적 규격으로 표준이 정립되지 않은 때에 기존에 만들어진 문서들과의 호환성을 위해 사용한다.
>
> 3. Frameset
>
> 현재는 거의 사용하지 않는 프레임셋(html내에 html을 분리하는 것)을 구현하기 위해 사용한다.

또한, HTML5 이전의 doctyp은 SGML기반으로 DTD 참조를 위한 URL이 들어가며 doctype 선언은 tag가 아니기 때문에 닫는부분이 없다. ex)``<doctype>``

```HTML
HTML 4.01 Strict
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">

HTML 4.01 Transitional
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">

HTML 4.01 Frameset
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN" http://www.w3.org/TR/html4/frameset.dtd">

XHTML 1.0 Strict
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">

XHTML 1.0 Transitional
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">

XHTML 1.0 Frameset
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Frameset//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-frameset.dtd">

XHTML 1.1
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.1//EN" "http://www.w3.org/TR/xhtml11/DTD/xhtml11.dtd">

HTML5
<!DOCTYPE html>
```

## html lang 어트리뷰트 속성의 기능에 대해 아는대로 말하세요

한국형 웹 콘텐츠 접근성 지침(KWCAG) 2.1에는 웹페이지의 head 요소 안에 페이지의 기본 언어 선언을 규정하고 있으며, 화면 낭독 프로그램 (스크린 리더) 이 언어를 인식하여 자동으로 음성을 변환하거나, 해당 언어에 적합한 발음을 제공할 수 있도록 한다.



## 이미지 태그에 srcset 속성을 사용하는 이유는 무엇인가요? 이 속성의 컨텐츠를 평가할 때 브라우저가 사용하는 프로세스를 설명하세요.



## 다음과 같이 script 태그를 body tag의 마지막에 넣는 이유와 아래와 같이 하지 않아도 script가 정상적으로 적용되도록 하는 방법.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>html test 입니다.</title>
  <link rel="stylesheet" href="./exHTML5-master/css/main.css">
</head>
<body>
  <header>
    <h1>html 예제</h1>
  </header>
  <main class="example">
    <h2>본문</h2>
    <div>본문 블라블라</div>
  </main>
  <script>
    const $mainTag = document.querySelector('.example');
    $mainTag.setAttribute('background', 'blue');
  </script>
</body>
```

html 문서는 위에서부터 아래로 파싱되는 과정에서 script 태그를 만나면 html 파싱을 일시 중단하고 script 내부 코드를 모두 해석하면 다시 html 파싱을 이어서 하기 시작한다.

만약 script 코드가 body태그의 위쪽에 정의될 경우 html 파싱에 의해 dom tree 가 생성되기 전이므로 ``document.querySelector``와 같이 특정 dom을 선택하는 선택자는 해당 dom을 인식하지 못하여 error를 발생시킨다. 때문에 모든 dom이 생성된 이후인 body의 가장 마지막에 script 태그를 삽입하는게 올바르다.

상기와 같이 body tag 마지막에 script 태그를 위치시키는 것 외에 script 태그의 ``defer`` 어트리뷰트를 설정하게되면 자동으로 dom이 생성된 이후 해당 script 코드를 해석한다.

## 웹표준, 웹접근성, 크로스 브라우징에 대해 설명하시오

1. 웹표준

웹 표준은 말 그대로 **웹에서 사용되는 표준 기술이나 규칙**을 의미하며 특정 브라우저에서만 쓰이는 비표준적인 기술은 배제하고 **[W3C](https://www.w3.org/)의 토론을 통해 나온 권고안**을 사용하는 것을 말하며, 웹 문서의 구조와 표현 그리고 동작을 구분하여 사용하는 것을 말한다.

2. 웹 접근성

장애에 구애없이 모든사람들이 정보에 접근하고 이해할 수 있도록 보장하는 것.

3. 크로스 브라우징

크로스 브라우징은 W3C에서 권고된 표준 웹 기술을 이용하여 기종 또는 플랫폼에 따라 다르게 구현되는 기술을 비슷하게 만들고 어느 한쪽에 최적화되어 치우치지 않도록 공통 요소를 사용하여 웹 페이지를 제작하는 기법을 말한다.

## CSS 의 적용 우선순위에 대하여 설명.

cascading style sheet의 약자로 마크업 언어가 실제 표현되는 방법을 기술하는 언어.

1. important
2. 인라인 스타일링
3. id 선택자
4. 클래스 선택자
5. 태그 선택자
6. 상속에 의한 스타일링.

선택자 우선순위가 같은 경우 뒤에 선언한 스타일이 우선적용됨.

## CSS style 선언 방식을 아는대로 서술하시오

1. 태그 자체에 선언하는 인라인 선언방식
2. 파일을 분리하여 ``<link>`` 태그에 연결하는 방식.
3. html ``<head>`` 태그 내부에 선언하는 방식.

## 클리어링(Clearing) 기술에는 어떤 것들이 있으며, 어떠한 경우에 어떻게 사용하는 것이 적절한지 설명하세요.

1. 부모요소에 overflow: visible이 아닌 값.
2. 부모요소::after ``clear: both`` 적용.
3. float한 다음 요소에 ``clear: both`` 적용.
4. 부모요소에 ``float`` 적용.
5. 부모요소에 ``display: inline`` 적용.

## CSS 스프라이트(CSS Sprites)가 무엇인지 설명하고 해당 기법의 장점을 서술하시오.

페이지에서 사용되는 img와 같은 리소스들을 하나의 파일에 모아놓고 position만 바꾸어서 보여주는 방법.

장점: 이미지의 갯수만큼 .png 혹은 .jpg 파일들을 서버로부터 받아야 하는 기존의 방법 대신 하나의 파일만 받으면 되어 초기 리소스를 받아오는 속도에 장점이 있음.

## 컨텐츠를 안보이게 하는 기술들의 차이점을 설명하시오.(그리고 스크린 리더(Screen readers)에서 접근이 가능한 방법은?

1. display : none
2. opacity : 0;
3. visibility: hidden;
4. 

## 외부리소스를 받아오는 데에는 import와 link 방식이 있는데, 2방식의 차이점과 각 방식의 장단점을 서술하시오.

- link 방식 - html문서를 파싱하면서 **병렬적**으로 실행.
- import 방식 - css 파일 내부에서 **직렬적**으로 실행.

따라서, import 시키는 외부소스가 많아질수록 로딩이 느려질 수 있으며 edge 브라우저는 import방식이 적용되지 않는다.

##  css의 전처리 기법인 scss의 장점에 대하여 아는대로 서술하시오.

1. 부모-자식 중첩선언
2. 변수를 사용하여 반복되는 속성들을 재활용이 가능
3. @mixin - @include를 사용하여 공통된 속성의 묶음의 재활용이 가능
4. @if 를 사용하여 조건분기가 가능
5. @for 사용가능?