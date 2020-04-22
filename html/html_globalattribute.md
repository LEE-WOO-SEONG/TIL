# HTML / 전역 속성, 기타



### 전역속성 

: 모든 HTML 요소에서 공통적으로 사용 가능한 속성.



#### CLASS

: 공백으로 구분하여 요소의 별칭을 지정할 때 사용.

CSS 혹은 JavaScript의 요소 선택자를 통해서 요소를 선택하거나 접근한다.



#### ID

: 문서에서 고유한 식별자를 정의한다. (동일 id name은 존재할 수 없음)

CSS 혹은 JavaScript의 요소 선택자를 통해서 요소를 선택하거나 접근한다.



#### style

: 요소에 적용할 CSS를 선언.



#### title

: 요소의 정보를 지정한다. title이 지정된 content에 마우스를 올려놓으면 title에 입력한 text가 나타난다.



#### lang

:요소의 언어(iso 639-1)를 지정.

```
<html lang="ko">
</html>
```



#### data

: 사용자 정의 데이터 속성을 지정한다.

<span style="color: blue;">HTML</span>에 JavaScript에서 이용할 수 있는 데이터를 <span style="color:blue;">저장</span>하는 용도로 사용한다.

```
<div data-my-name="이우성" data-my-age="29">이우성<div>
```

<div data-my-name="이우성" data-my-age="29">이우성<div>



#### draggable

:요소가  Drag and Drop API를 사용 가능한지 여부를 지정.

```
<div draggable="true"> ~ <div>
<div draggable="false"> ~ <div>

기본값
<div draggable="auto"> ~ <div>
```



#### hidden

: 요소를 숨길 때 사용

```
    <form id="hidden-form" action="/form-action" hidden>
        <input type="text" name="id" value="이우성">
    </form>
    <button form="hidden-form" type="submit">전송</button>
```



#### tabindex

: tab키를 이용해 요소를 순차적으로 포커스 탐색할 순서를 지정.

- [대화형콘텐츠][https://developer.mozilla.org/ko/docs/Web/Guide/HTML/Content_categories#대화형_콘텐츠)] 기본적으로 코드 순서대로 탭 포커싱이 지정된다.
- 비대화형 콘텐츠에 tabindex="0" 을 지정하여 대화형 콘텐츠와 같이 탭 순서를 사용할 수 있다.
- tabindex="-1" 을 통해 포커스는 가능하지만 탭 순서에서 제외 가능하게 만들 수 있다.
- tabindex="1" 이상의 양수 값은 논리적 흐름을 방해하기 때문에 사용을 추천하지는 않는다.

```
   <input type="text" value="1(2)" tabindex="2">
   <input type="text" value="2">
   <input type="text" value="3(3)" tabindex="3">
   <div tabindex="0">11</div>
   <input type="text" value="4(-1)" tabindex="-1">
   <input type="text" value="5(1)" tabindex="1">
```



#### 경로 

1. 상대경로

   ./: folder로 들어갈 때 사용. (생략가능)

   ../ : folder를 나갈 때 사용. 

2. 절대경로

   http //: ~~

   /  : 반복될 경우 앞의 http//:~~~ 를 baseline으로 사용가능.



#### 주석

: browser에 표기하고 싶지 않은 부분을 처리할 때 사용. cntrl+/

![image-20200313173638650](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200313173638650.png)	



#### 특수기호

###### &nbsp ;

html문서 내에서 browser에 여러번의 띄어쓰기를 적용하고 싶은 경우 사용한다.

```
<div>안녕하세요. 이우성     입니다.</div>
```

<div>안녕하세요. 이우성     입니다.</div>

```
<div>안녕하세요. 이우성&nbsp;&nbsp;&nbsp;&nbsp;입니다.</div>
```

<div>안녕하세요. 이우성&nbsp;&nbsp;&nbsp;&nbsp;입니다.</div>





###### &lt / &gt

tag자체를 browser에 나타내고 싶을 때 사용한다.

&lt:  < 을 나타낸다. 

&gt:  > 을 나타낸다.

```
<h1>
	&lt;div&gt;&lt;/div&gt;
</h1>
```

<h1>
	&lt;div&gt;&lt;/div&gt;
</h1>