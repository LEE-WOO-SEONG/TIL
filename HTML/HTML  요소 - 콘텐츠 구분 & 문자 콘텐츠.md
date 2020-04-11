# HTML / 요소 - 콘텐츠 구분 & 문자 콘텐츠

###### header

-------------------------

: 소개나 탐색을 돕는것의 그룹을 나타내며 문서의 최상단에 위치한다.

큰 제목 / 로고나 구획의 제목 / 탐색 폼 과 같은것들을 포함하며 해당 요소는 후손으로 사용될 수 없다.



###### footer

--------------------

: 일반적으로 문서의 최 하단부에 위치하며 작성자 구획 / 저작권 데이터 / 관련된 문서의 링크에대한 정보를 포함한다. footer역시 후손으로 사용될 수 없다.



###### h1~h6

-----------------

: 제목을 나타내는 데 사용되는 요소로 H1>H2>H3 >>> H6 로 큰 제목을 나타내며 글자크기도 H1~H6 순으로 작아진다.

<div style="color : blue"> 주의사항 </div>

1. 해당 요소를 글자크기를 조절하는 용도로 사용하지 않도록 한다.
2. 제목은 언제나 <h1> , <h2> 등으로 순차적으로 기입하여 사용해야 한다.
3. Main header인 h1은 한페이지에 한번만 사용하도록 주의한다.



###### main

------

: 문서나 앱, body의 주요 콘텐츠를 나타내는데 사용한다. 주요 콘텐츠 구역은 핵심주제나 애플리케이션의 핵심 기능성에 대해 부연 혹은 직접적으로 연관된 것으로 이루어진다.



문서 전체에서 하나만 존재해야한다. 

main tag는 <span style="color:blue;">Internet Explorer </span>에서는 지원되지 않으며, block 요소이다.

```
main { display: block;}
```



###### article

------

: 독립적으로 구분되거나 재사용 가능한 영역을 설정. (매거진/신문 기사, 블로그 등)

h1~h6의 제목을 포함

```
article {display: block;}
```

````
<article>
    <h2>Google Chrome</h2>
	<p>Google Chrome is a web browser developed by Google.</p>
</article>
````



###### section

-----

: 문서의 일반적인 영역을 설정 

h1~h6의 제목을 포함.

```
section {display: block;}
```



<strong style="color: yellowgreen;">div와의 차이점</strong>

: 두 요소 모두 특정 영역을 구분지을 때 사용하나  제목을 포함하는 section은 의미적 영역을,  div는 단순 구역을 나누는데 사용한다.



###### aside

------

: 문서의 별도 콘텐츠를 설정

 (광고, banner, 기타링크 등의 사이드바를 설정)

```
aside {dsiplay: block;}
```



###### nav

-----

: 다른 페이지 링크를 제공하는 영역을 설정

  (Navigation, 보통 메뉴, 목차, 색인등을 설정)

```
nav {display: block;}
```

```
<body>
  <header>
    <nav>
      <ul>
        <li>Shots</li>
        <li>Designers</li>
        <li>Teams</li>
        <li>Community</li>
        <li>Jobs</li>
      </ul>
    </nav>
  </header>
</body>
```



###### adress

-----

: 연락처 또는 mail 정보를 제공하기 위해 사용

```
address {display: block;}
```



###### div

------

: 본질적으로 아무것도 나타내지 않는 콘텐츠 영역을 설정

  의미없이 사용되며 오직 영역설정(꾸미는목적)으로 사용한다.

```
div {display: block;}
```





###### ol (Odered list), ul (Unodered list), li (list)

-----

- ol은 정렬된 항목으로 나타낼 때 사용한다. 

- ul은 정렬되지 않은 목록으로 나타낼 때 사용한다. 
- li는 단독으로 사용할 수 없으며 ul 또는 ol의 자식으로 포함되어야 한다.
- 정렬된 목록 ol의 항목순서는 중요도를 의미할 수 있다.

```
ol,ul {display: block;}
li {display: list-item}
```

```
<ul>
	<li> item1 </li>
	<li> item2 </li>
	<li> item3 </li>
</ul>    
```

<ul>
    <li>item1</li>
    <li>item2</li>
    <li>item3</li>
</ul>

```
<ol>
	<li> item1 </li>
	<li> item2 </li>
	<li> item3 </li>
</ol>    
```

<ol>
	<li> item1 </li>
	<li> item2 </li>
	<li> item3 </li>
</ol>    

##### ol property

----

| 속성     | 의미                                   | 값           |
| -------- | -------------------------------------- | ------------ |
| start    | 항목에 매겨지는 번호의 시작값을 재설정 | 숫자(number) |
| type     | 항목에 매겨지는 번호의 유형을 설정     | a,A,I,II,1   |
| reversed | 항목의 순서가 역순이 됨                | 숫자 + 문자  |

```
<ol start="3">
	<li>item1</li>
	<li>item2</li>
	<li>item2</li>
</ol>
```

<ol start="3">
	<li>item1</li>
	<li>item2</li>
	<li>item2</li>
</ol>

```
<ol type="i">
	<li>item1</li>
	<li>item2</li>
	<li>item2</li>
</ol>
```

<ol type="i">
	<li>item1</li>
	<li>item2</li>
	<li>item2</li>
</ol>

```
<ol type="a" reversed>
	<li>item1</li>
	<li>item2</li>
	<li>item2</li>
</ol>
```

<ol type="a" reversed>
	<li>item1</li>
	<li>item2</li>
	<li>item2</li>
</ol>



##### li property

-----

| 속성  | 의미               | 값           | 특징                    |
| ----- | ------------------ | ------------ | ----------------------- |
| value | 항목의 순서를 설정 | 숫자(number) | 항목들의 순서를 재 지정 |

```
<ol>
	<li value="3">item1</li>
	<li>item2</li>
	<li>item2</li>
</ol>
```

<ol>
	<li value="3">item1</li>
	<li>item2</li>
	<li>item2</li>
</ol>

```
<ol>
	<li value="5">item1</li>
	<li value="11">item2</li>
	<li>item2</li>
</ol>	
```

<ol>
	<li value="5">item1</li>
	<li value="11">item2</li>
	<li>item2</li>
</ol>	




###### dl / dt / dd

-----

dt : 용어설정

dd: 용어의 정의

dl : 용어와 정의를 포함하는 tag.

- dl은 dd와 dt만을 포함해야 한다.
- 키(key)/ 값(value) 형태를 표시할 때 유용. ( 무엇 = 무엇이다

```
<dl>
	<dt>coffee</dt>
	<dd>coffee is a vrewed drink prepared from roasted coffee beans</dd>
	<dt>milk</dt>
	<dd>milk is a nutrient-rich, white liquid food produced by the mammary glands of mammals</dd>
</dl>
```

<dl>
	<dt>coffee</dt>
	<dd>coffee is a brewed drink prepared from roasted coffee beans</dd>
	<dt>milk</dt>
	<dd>milk is a nutrient-rich, white liquid food produced by the mammary glands of mammals</dd>
</dl>




하지만 dl 내부에 <span style="color:blue;">다른요소를 포함할 수 없기 때문에</span> 해당 요소 대신  ul로 자주 쓰인다.

```
<ul>
	<li>
		<dfn>coffee</dfn>
		<p>coffee is a vrewed drink prepared from roasted coffee beans</p>
	</li>
	<li>
		<dfn>milk</dfn>
		<p>milk is a nutrient-rich, white liquid food produced by the mammary glands 			of mammals</p>
	</li>
</ul>
```

<ul>
	<li>
		<dfn>coffee</dfn>
		<p>coffee is a vrewed drink prepared from roasted coffee beans</p>
	</li>
	<li>
		<dfn>milk</dfn>
		<p>milk is a nutrient-rich, white liquid food produced by the mammary glands 			of mammals</p>
	</li>
</ul>




###### p (Pharagraph)

----

:하나의 문단을 설정

일반적으로 정보통신보조기기 등은 다음문단으로 넘어갈 수 있는 단축기를 제공한다.

```
p {diplay: block;}
```



###### hr (Horizontal rule)

----

: 문단의 <span style="color : blue;">의미적 분리</span>를 위해 설정. 수평선으로 표시된다.

 Empty tag로 img 처럼 <hr ~ /> 로 사용한다.

```
hr {display: block;}
```

hr 요소는 높이가 0인 사각형을 나타내므로 border 설정 시, 

위, 아래 line이 겹쳐 설정하고자 하는 두께의 2배가 되므로 이에 주의하여 단축영역만 설정하도록 한다.

```
<hr style= "border: 1px solid red;"/>
```

<hr style= "border: 1px solid red;"/>

```
<hr style= "border-top: 1px solid red;"/>
```

<hr style= "border-top: 1px solid red;"/>



###### pre

---

: 서식이 미리 지정된 텍스트를 설정할 수 있다.

- 텍스트의 공백과 줄바꿈을 사용자가 입력한 대로 browser에 출력이 가능하다.

- 기본적으로 [Monospace 글꼴][https://ko.wikipedia.org/wiki/고정폭_글꼴]계열로 표시된다. 

  (Monospace는 각 글자가 동일한 수평공간을 차지하는 글꼴이다. )

```
<pre>I'm going under and this time ifear there's no one to save me.
this all or nothing really           got a way of driving me crazy.<pre>
```

<pre>I'm going under and this time ifear there's no one to save me.
this all or nothing really           got a way of driving me crazy.</pre>

<div style="color : blue"> 주의사항 </div>

상기처럼, 줄바꿈이나 빈칸이 그대로 적용되니 <PRE> Tag 적용 시 들어쓰기, 내어쓰기 와 같은 공간 또한 모두 그대로 출력되니 이에 유의하여 tag와 content와 빈공간이 없도록 작성해야 한다.



###### Blockquote

-----

: 일반적으로 인용문을 설정할 때 사용한다.

| 속성 | 의미              | 값   |
| ---- | ----------------- | ---- |
| cite | 인용된 정보의 url | url  |

```
<blockquote cite="http://www.worldwildlife.org/who/index.html">
For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.
</blockquote>
```

<blockquote cite="http://www.worldwildlife.org/who/index.html">
For 50 years, WWF has been protecting the future of nature. The world's leading conservation organization, WWF works in 100 countries and is supported by 1.2 million members in the United States and close to 5 million globally.
</blockquote>



cite 속성입력은 선택사항이며 browser에는 나타나지 않는다. 그러므로 cite를 쓰지 않아도 웹 표준을 어기는 것은 아니다.