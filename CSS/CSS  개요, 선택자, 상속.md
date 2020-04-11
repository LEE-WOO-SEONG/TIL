# CSS / 개요, 선택자, 상속



###### @import 방식

---

: @import를 이용하여 외부문서로 css를 불러와 적용하는 방식.

기존에 사용하던 link 와 비교하면 직렬 형태로 데이터를 불러오기 때문에 로딩 시간이 더 오래걸릴 수가 있다.

```
<head>
	<link rel="stylesheet" href="css/common1.css">
</head>
<body>
	<div>HELLO</div>
</body>
```

```
in common1. css

@import url(" ./commom2.css")
```

```
in commom2. css

div {
	color: red;
	font-size: 20px;
	font-weight: bold;
}
```



#### selector

---

<span style="color: tomato;"> 단독 선택자</span>

1.  전체 선택자 (Universal Selector)

: *를 이용하여 문서 내 전체 text를 선택.

```
* {
	color: red;
}
```

2. 태그 선택자 ( Type Selector)

: 특정 태그 전체를 선택.

```
li {
	color: red;
}
```

3. 클래스 선택자(Class Seletor)

: html class의 특정 속성값을 선택 (동일 class 모두)

```
.orange {
	color: red;
}
```

4.  아이디 선택자(ID Selector)

: html의 특정 id 값인 요소를 선택. (고유하게만 사용)

```
#orange {
	color: red;
}
```



<span style="color: tomato;"> 다중 선택자</span>

###### 1. 일치선택자

---

: 띄어쓰기 없이 선택자들을 붙여 사용.

```
span.orange {
	color: red;
}
```

###### 2. 자식선택자

---

: >를 이용함.

```
span > .orange {
	color: red;
}
```

###### 3. 후손(하위) 선택자

---

: 선택자와 선택자 사이에 띄어쓰기가 있음.

  <em> 후손은 자식을 포함하는 개념이니 유의하도록 하자. </em>

```
div .orange {
	color: red;
}
```

###### 4. 인접형제 선택자 (Adjacent Sivling Combinator)

---

: 특정 요소 <span style="color: red;">다음</span> 형제요소를 선택한다.

```
.orange + li{
	color: red;
}
```

###### 5. 일반형제 선택자 (General Sibling Combinator)

---

: 특정 요소 <span style="color: red;">다음</span> 형제요소 <strong>모두</strong>를 선택한다.

```
.orange ~ li {
	color: red;
}
```





#### 상속 (inheritance)

---

: 조상에 적용된 특성이 후손(하위) 속성들에게 모두 적용이 되는 것.

 

- 상속되는 속성들 (properties)

1. font (size, weight, family..)
2. color
3. text-align
4. text-indent
5. text-decoration
6. latter-spacing
7. opacity

등등.. text를 다루는 특성들.



###### 강제상속

: 자식의 상속을 원하는 특성값을 inherit으로 설정한다.

```
.parent {
	position: absolute;
}
.child {
	position: inherit: <<
}
```





#### 우선순위 (priority)

-----

1. 명시도 점수가 높은 선언이 우선 <span style="color: blue;">(명시도)</span>
2. 점수가 같은경우, 가장 마지막에 해석(늦게 작성한)되는 선언이 우선 <span style="color: blue;">(선언순서)</span>
3. 명시도는 ' 상속' 규칙보다 우선 <span style="color: blue;">(중요도)</span>
4. !important 가 적용된 선언방식은 다른 모든방식보다 우선 <span style="color: blue;">(중요도)</span>



- ! important

: 다른 모든선언 무시. 점수는 무한대.

```
div {
	color: red !important;
}
```

- 인라인 선언방식 

: html에서 style 속성을 사용. 점수는 1000점.

```
<div style="color: orange;"> HELLO WORLD </div>
```

- ID

: 점수 100점

 ```
# color yellow {
	color: yellow;
}
 ```

- class

: 점수 10점

- tag

: 점수 1점

- 전체선택자

: 점수 0점

- 상속선택자

: 점수 없음.

<STRONG> !important > inline style > id > class > tag > * > 상속 </strong>순이 된다.

![	](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200313211353994.png)



##### 가상 클래스 선택자 (Pseudo-class-selector)

---

= : (콜론)기호가 1개 붙어있는 선택자.



- hovor 

: 마우스 포인터가 올라가 있는 동안에만 동작하는 선택자.

- Active 

: 마우스로 클릭하는 동안에만 동작하는 선택자

- Focus

: 포커스 된 동안에만 동작하는 선택자. 

<strong>focus는 [대화형콘텐츠][https://developer.mozilla.org/ko/docs/Web/Guide/HTML/Content_categories#대화형_콘텐츠)] 에서만 사용 가능하니 주의한다. </strong>

- first child

: 특정한 요소가 형제요소 중 첫번째 요소이면 선택한다.

- last child

: 특정한 요소가 형제요소 중 마지막 요소이면 선택한다.

- Nth-child

: 특정한 요소가 형제요소 중 n번째 요소이면 선택한다.

(n 키워드 사용시 0부터 해석.)

```
E :nth-child(n)
```

: 0~n 까지 모든 요소 선택

```
E: nth-child(2n)
```

: 0,2,4,... 짝수 요소 선택

```
E: nth-child(n+3)
```

:3,4,5....n+3까지 모든 요소 선택.



- nth-of-type

: 특정요소의 타입(tag)과 동일한 타입(tag)인 형제요소중 n번째 요소라면 선택한다.



##### 부정선택자 (Nagative Selector)

---

```
E : not(S)
```

E요소 중 S선택자만 제외하고 찾겠다.



##### 가상요소 선택자 (Pseudo-Element Selector)

---

= :: (콜론)기호가 2개 붙어있는 선택자.

- before

```
E :: before
```

E요소 내부의 앞에, 특정내용 삽입을 의미한다.

```
ul li:before {
	content: "숫자";
}
```

: ul 태그의 후손인 li 태그의 내부 맨 앞에 "숫자" 라는 content를 추가한다를 의미한다.



- after

```
E :: after
```

E요소 내부의 맨 뒤에, 특정내용 삽입을 의미한다.



##### 속성선택자

---

- ATTR

: 특정한 속성 [attr] 을 포함한 요소 선택.

```
[attr]
```

````
[disabled] {
	opacity: 0,2;
	color: red;
}
````

: dsabled라는 속성을 가진 요소들의 text에 해당 css속성과 값을 적용한다.



- ATTR=VALUE

: 특정한 속성 [attr]을 포함하며 속성 값이 [value] 인 요소를 선택.

```
[attr=value]
```

````
[type="password"	] {
	opacity: 0,5;
	color: red;
}
````



- ATTR^=VALUE

: 특정한 속성 [attr]을 포함하며 속성값이 [value]로 시작하는 요소를 선택.

```
[attr^=value]
```

```
[class^="btn-""] {
	font-weight: bold;
	border-radius: 50%;
}
```



- ATTR$=VALUE

: 특정한 속성 [attr]을 포함하며 속성값이 [VALUE] 로 끝나는 요소를 선택.

```
[attr$=value]
```

```
[class$="sucess"] {
	font-weight: bold;
	border-radius: 50%;
}
```

