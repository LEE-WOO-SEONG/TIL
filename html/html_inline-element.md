# HTML / 요소 - 인라인 텍스트 & 수정



###### a (anchor : 외부로 내보내기)

-----

: <strong>다른 페이지</strong>나 <strong>같은 페이지</strong> 내 파일, 이메일 주소 전화번호 등 다른 url로 연결할 수 있는 hyperlink를 설정할 때 사용한다.

| 속성     | 의미                              | 값                | 기본값 | 특징     |
| -------- | --------------------------------- | ----------------- | ------ | -------- |
| download | 다운로드하는 용도로 사용함을 의미 | 불린(boolean)     |        | 생략가능 |
| href     | 링크 URL                          | URL               |        | 생략가능 |
| hreflang | 링크 페이지 언어(ISO 639-1 참조)  | ko, en ...        |        | 생략가능 |
| rel      | 현재 문서와 링크 URL과의 관계     | license,prev,next |        | 생략가능 |
| target   | 링크 URL의 표시위치               | _self, _blank     | _self  | 생략가능 |
| type     | 링크 URL의 MIME타입               | text/html         |        | 생략가능 |

```
a { display: inline;}
```



<span style="color:blue;">  자주쓰이는 속성 </span>

##### 기존 tab에서 browser 열기

```
<a href="https://google.com">google</a>
```

<a href="https://google.com">google</a>

##### 새 tab에서 brower 열기

```
<a href="https://google.com" target="_blank">google</a>
```

<a href="https://google.com" target="_blank">google</a>

##### 특정 file download 하기

```
<a href="https://google.com" download="download">google</a>
```

<a href="https://google.com" download="download">google</a>



##### 같은 페이지 내 위치로 이동하기 

```
<a href="#id name">google</a>
```

<a href="#id">google</a>

해당 id의 name을 지닌 위치로 이동하게 된다.



###### abbr (Abbreviation)

-----

: 약어를 지정할 때 사용한다. 일반적으로 <span style="color: blue;"> title</span> 속성을 사용하여 전체 글자나 설명을 제공한다.

```
<p> Using <abbr title="Hyper Text Markup Language">Html</abbr> is easy and fun! <p>
```

<p> Using <abbr title="Hyper Text Markup Language">Html</abbr> is easy and fun! <p>

abbr tag를 이용한 단어에 마우스를 가져다 놓으면 title에 입력한 속성이 나타난다.



###### b

-----

: 문체가 다른 글자의 범위를 설정

- 특별한 의미를 가지지 않음.
- 읽기 흐름에 도움을 주는 용도로 사용.
- 다른 태그가 적합하지 않은 경우 마지막 수단으로 사용.
- 기본적으로 글자가 두껍게(Bold) 표시됨.

```
b { display:inline;}
```

```
<p> HTML stuying is very <b>fuuny~</b> </p>
```

<p> HTML stuying is very <b>fuuny~</b> </p>



###### mark

-----

: 사용자의 관심을 끌기 위해 사용되며 하이라이팅으로 표기된다. <시각적>

- 기본적으로 형광펜을 사용한 것 처럼 글자 배경이 노란색(Yellow)으로 표시된다.

```
mark { display: inline;}
```

```
<p> HTML stuying is very <mark>fuuny~</mark> </p>
```

<p> HTML stuying is very <mark>fuuny~</mark> </p>



###### em(emphasis)

----

: 해당 text가 가지는 <span style="color:blue;">의미를 강조</span>하기 위해 사용된다. 

- 중첩이 가능.
- 중첩될수록 강조의미가 강해진다.
- 정보통신보조기기 등에서 구두 강조로 발음됨. <span style="color:blue;"> (웹접근성)</span>
- 기본적으로 italic 체로 표시된다.

```
em { display: inline;}
```

```
<em> this is important </em>
```

<em> this is important </em>

```
<em> this is <em>important</em> </em>
```

<em> this is <em>important</em> </em>

2번 중첩사용 하여도 browser에 표시되는 효과는 같다. 하지만 정보통신 기기에서는 강조가 됨.



###### strong

----

: <span style="color:blue;">의미의 중요성</span>을 나타내기 위해 사용.

- 기본적으로 글자가 두껍게(Bold) 표시됨

```
strong { display: inline}
```

```
<p> This is <strong>important</strong></p>
```

<p> This is <strong>important</strong></p>





###### i

-----

: em / strong / mark / cite / dfn 등에서 표현할 수 있는 적합한 의미가 아닌경우 사용되며

  일반 text가 아닌 특수문자나 기호 등을 표현할 때 사용한다.

- 기본적으로 italic type으로 표시된다.

```
i { display : inline}
```

[fontawsome][https://fontawesome.com] 사이트를 이용하여 문자를 표현할 수 있다.



###### dfn

---

: 특정 용어를 정의할 때 사용.

``` 
dfn { display: inline;}
```

```
<p><dfn>HTML</dfn> is the standard markup language for creating web pages.</p>
```

<p><dfn>HTML </dfn> is the standard markup language for creating web pages.</p>



###### cite

---

: 창작물에 대한 참조를 설정할 때 사용한다.

(책, 논문, 영화, tv 프로그램등의 제목)

```
cite { display: inline;}
```

```
<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
```

<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>



###### q

---

: 짧은 인용문을 설정할 때 사용한다.



단, 인용물이 길 경우 blockquote를 사용한다.

cite 속성에 url을 사용하여 인용물의 출처를 표시할 수 있다.

```
cite {display: inline;}
```

```
<q cite="aa">The Scream by Edward Munch. Painted in 1893.</q>
```

<q cite="dd"> The scream by Edward Munch. painted in 1893.</q>

q tag 내에 text들은 자동으로 ""로 감싸진다.



###### u (underline)

---

: 밑줄이 있는 글자를 설정. 

- 순수하게 꾸미는 용도로 사용. 의미적 이용 x
- a tag와 헷갈릴 수 있는 위치에서 사용하지 않도록 주의한다. (두 요소 모두 밑줄쳐져 있음.)
- <span style="text-decoration: underline" > 을 활용할 수 있을 경우에는 사용을 권장하지 않음.

```
u {diplay: inline;}
```

```
<p> i like the <u>pizza</u> </p>
```

<p> i like the <u>pizza</u> </p>



###### code

---

: 컴퓨터 코드를 나타낼 때 사용한다.

- pre tag와 동일하게 monospace 글꼴 계열로 표시된다.

```
code {diplay: inline;}
```

 ```
<code>document.getElementById('id-value')</code> is a piece of computer code.
 ```

<code>document.getElementById('id-value')</code> is a piece of computer code.

 

###### kbd (keyboard)

---

: 텍스트 입력장치인 키보드의 명령어를 나타낼 때 사용한다.

```
kbd {diplay: inline;}
```

```
<p><kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>K</kbd></p>, <kbd>ESC</kbd>
```

<p><kbd>Ctrl</kbd> + <kbd>Alt</kbd> + <kbd>K</kbd></p>, <kbd>ESC</kbd>

실제 browser에서는 상기 처럼 kbd 형식으로 표현 되지는 않으며, 글자 체만 약간 변경된다.



###### sup(super scripted text), sub(sub scripted text)

---

sup: 윗 첨자

sub : 아랫 첨자를 나타낼 때 사용한다.

```
sup, sub {diplay: inline;}
```

```
X<sup>4</sup> + Y<sup>2</sup>, H<sub>2</sub>O
```

X<sup>4</sup> + Y<sup>2</sup>, H<sub>2</sub>O



###### time

---

:날짜나 시간을 나타내기 위한 목적으로 사용

datetime 속성을 이용하여 <span style="color:blue;">유효한 날짜문자</span>를 나타낸다.

- IE에서는 지원이 불가하니 이점에 주의하여야 한다.

```
time {display: inline;}
```

```
<p>The Cure will be celebrating their 40th anniversary on <time datetime="2018-07-07">July 7</time> in London's Hyde Park.</p>
```

<p>The Cure will be celebrating their 40th anniversary on <time datetime="2018-07-07">July 7</time> in London's Hyde Park.</p>



###### span

---

: 의미를 가지지 않는 콘텐츠 영역을 설정할 때 사용한다. 주로 css styling을 위해 사용한다.

div 과 비슷하게 사용되나 차이점은 <span style="color: green">inline 요소</span>라는 점이다.

```
span {display: inline;}
```

```
<p>My mother has <span style="color:blue">blue</span> eyes.</p>
```

- span 사용

<p>My mother has <span style="color: blue;"> blue </span> eyes. </p>

- div 사용 - block element 인 div 은 줄바꿈을 유도한다.

<p>My mother has <div style="color: blue;"> blue </div> eyes. </p>



###### br (break)

---

: 줄바꿈을 나타내고 싶을 때 사용한다.

empty tag로 close tag를 필요로 하지 않는다.

```
<p>To force<br> line breaks<br> in a text,<br> use the br<br> element.</p>
```

<p>To force<br> line breaks<br> in a text,<br> use the br<br> element.</p>

단, 상기와 같이 줄바꿈을 위해 br tag를 자주 사용하는 것은 <span style="text-decoration: underline; color: blue;">지양</span> 하는것이 좋다.



###### del

---

: 삭제(변경)된 텍스트의 범위를 나타낼 때 사용한다.

| 속성     | 의미                           | 값   |
| -------- | ------------------------------ | ---- |
| cite     | 변경을 설명하는 리소스의 URI   | URI  |
| datetime | 변경이 일어난 유효한 날짜 문자 | date |





###### ins 

---

: 새로 추가(변경)된 텍스트의 범위를 지정.

| 속성     | 의미                           | 값   |
| -------- | ------------------------------ | ---- |
| cite     | 변경을 설명하는 리소스의 URI   | URI  |
| datetime | 변경이 일어난 우효한 날짜 문자 | Date |



```
<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>
```

<p>My favorite color is <del>blue</del> <ins>red</ins>!</p>

