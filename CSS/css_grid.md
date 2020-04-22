# CSS grid

: 2차원(행, 열)의 레이아웃 시스템을 제공한다.



##### grid container에 사용하는 속성

---

- display

| 값          | 의미                                |
| ----------- | ----------------------------------- |
| grid        | block특성의 grid container를 정의   |
| inline-grid | inline 특성의 grid container를 정의 |

- grid-template-rows / colums

: <span style="color:red;">명시적</span>으로 행, 열의 개수와 크기를 지정한다.

동시에 라인(Line)의 이름도 정의할 수 있으며
`fr`(fraction, 공간 비율) 단위와`repeat()` 함수를 사용할 수 있다.

```
grid-template-rows: 100px 100px;
grid-template-colums: 150px 150px 150px;
```

: 2행 3열 짜리 grid.

```
grid-template-rows: repeat(2,100px);
grid-template-columns: repeat(3,150px);
```

로 repeat 을 이용해 나타낼 수도 있다.

```
/* 각 행의 크기를 정의합니다. */
.container {
  grid-template-rows: 100px 200px;
}
/* 동시에 각 라인의 이름도 정의할 수 있습니다. */
.container {
  grid-template-rows: [first] 100px [second] 200px [third];
}
/* 라인에 중복된 이름을 지정할 수 있습니다. */
.container {
  grid-template-rows: [row1-start] 100px [row1-end row2-start] 200px [row2-end];
}
```

````
.container {
  display: grid;
  grid-template:
    "header header header" 80px    /* 행 너비 */
    "main main aside" 350px        /* 행 너비 */
    "footer footer footer" 130px   /* 행 너비 */
    / 2fr 100px 1fr;      /* 열 너비 */
}
header { grid-area: header; }
main   { grid-area: main; }
aside  { grid-area: aside; }
footer { grid-area: footer; }
````

: `grid-template-rows` / `grid-template-columns` /`grid-template-areas` 의 단축속성으로 `grid-template`를 사용한다.



- grid-column(row)-start / grid-column(row)-end

: grid 내에서 각 `item`들의 배치 및 차지하는 영역을 정의한다.

```
grid-column-start: 1;
grid-column-end: 3;
```

```
grid-column: 1/3;
```

```
grid-column: 1/span2;
```

: 1~3번 세로 줄 사이의 영역을 차지하겠다. (2칸)

```
grid-column: span2/3; => grid-column 1/3;
```

: 시작 점에 span이 있을 경우 endline부터 역으로 이동해서 영역을 표시한다.

  1~3 line의 열을 차지하겠다.



- grid-template-areas

: 지정된 그리드 영역이름(grid-area)을 참조해 그리드 템플릿을 생성한다.

```
.container {
  display: grid;
  grid-template-rows: repeat(3, 100px);
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "header header header"
    "main main aside"
    "footer footer footer";
}
header { grid-area: header; }
main   { grid-area: main;   }
aside  { grid-area: aside;  }
footer { grid-area: footer; }
```

![image-20200316232837999](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200316232837999.png)



- grid-area

`grid-row-start`, `grid-column-start` / `grid-row-end`, `grid-column-end`의 단축 속성으로 `grid-template-areas`가 참조할 영역(Area) 이름을 설정할 수도 있다.
영역 이름을 설정할 경우 `grid-row`와 `grid-column` 개념은 무시된다.

```
.item {
  grid-area: <grid-row-start> / <grid-column-start> / <grid-row-end> / <grid-column-end>;
  grid-area: 영역이름;
}
```



- grid-row(column)-gap

:  각 행과 행 사이의 간격 (Gutter)을 지정한다.

(명확하게는 각 grid 사이사이의 line의 크기를 지정하는 개념이다.)

```
grid-row-gap: 30px;
grid-column-gap: 20px;
```

![image-20200316233351658](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200316233351658.png)

단축 속성으로는 grid-gap: grid-row-gap grid-column gap 으로 사용할 수 있다.

```
grid-gap: 30px 20px;
```



- grid-auto-rows(columns)

 <span style="color:red;">암시적</span> 행/열의 크기를 정의한다.

암시적이란? 앞서 grid template 로 정의 해 놓은 명시적 행과 열의 범위를 벗어나 존재하는 것.

우리는 grid-auto-~로 이러한 암시적 행의 크기를 지정할 수 있는 것이다.

// grid는 배치 뿐 아니라 "정렬"의 특성도 가지며, 암시적 행의 크기를 지정한 순간 명시적 행과 암시적 행 사이에 존재하는 또다른 암시적 행의 크기 또한 정의된다.

```
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
</div>
```

```
.container {
  width: 300px;
  height: 200px;
  display: grid;
  grid-template-rows: 100px 100px; /* 명시적 2개 행 정의 */
  grid-template-columns: 150px 150px; /* 명시적 2개 열 정의 */
  grid-auto-rows: 100px; /* 그 외(암시적) 행의 크기 정의 */
}
.item:nth-child(3) {
  grid-row: 3 / 4;
}
```

![](https://heropy.blog/images/screenshot/css-grid/grid-auto-rows-1.jpg)

단, grid-row-start/end 로 각 item이 차지하는 영역을 지정할 수 있었는데, 암시적 영역에서 각 line은 음수를 쓸 수 없고 양수값만 사용할 수 있다.



- grid-auto-flow

: 배치하지 않은 item을 어떤 방식의 자동배치 알고리즘으로 처리할지 정의한다.

| 값           | 의미                                      | 기본값 |
| ------------ | ----------------------------------------- | ------ |
| row          | 각 행 축을 따라 차례로 배치               | row    |
| column       | 각 열 축을 따라 차례로 배치               |        |
| row dense    | 각행 축을 따라 차례로 배치, 빈 영역 메움! |        |
| column dense | 각열 축을 따라 차례로 배치, 빈 영역 메움! |        |

```
<div class="container">
  <div class="item">1</div>
  <div class="item">2</div>
  <div class="item">3</div>
  <div class="item">4</div>
</div>
```

```
.container {
  border: 1px solid;
  display: grid;
  grid-template-rows: repeat(3, 1fr);
  grid-template-columns: repeat(3, 1fr);
  grid-auto-flow: column dense;
}
.item{
  border: 1px dashed red;
}
.item:nth-child(1) {
  grid-column: 2 / span 2;
}
.item:nth-child(2) {
  grid-column: span 2;
}
```

![](https://heropy.blog/images/screenshot/css-grid/grid-auto-flow-2.jpg)

: row dense의 경우 row가 기본 값이기 때문에 dense라고 입력하여도 되나 column dense는 dense만 입력하면 row dense로 인식하므로 column dense라고 명시해 주어야 한다.



- grid

: grid-template-xxx / grid-auto-xxx 의 단축속성.

```
.container {
  grid: <grid-template>;
  grid: <grid-template-rows> / <grid-auto-flow> <grid-auto-columns>;
  grid: <grid-auto-flow> <grid-auto-rows> / <grid-template-columns>;
}
```

```
.container {
  grid: <grid-template-rows> / <grid-template-columns>;
}
.container {
  grid: 100px 200px / 1fr 2fr;
}
.container {
  grid-template-rows: 100px 200px;
  grid-template-columns: 1fr 2fr;
}
```

```
.container {
  grid: <grid-template>;
}
.container {
  grid:
    "header header header" 80px
    "main main aside" 350px
    "footer footer footer" 130px
    / 2fr 100px 1fr;
}
.container {
  grid-template:
    "header header header" 80px
    "main main aside" 350px
    "footer footer footer" 130px
    / 2fr 100px 1fr;
}
```



- align-content (전체 item을 정렬하는 방법) 

: 그리드 콘텐츠(Contents)를 수직(열 축) 정렬하는데 사용하며, 그리드 콘텐츠의 세로 너비가 그리드 컨테이너보다 작아야 한다.

| 값            | 의미                                                         | 기본값 |
| ------------- | ------------------------------------------------------------ | ------ |
| normal        | sterch와 같음                                                | normal |
| start         | 시작점(위쪽)정렬                                             |        |
| center        | 수직 가운데 정렬                                             |        |
| end           | 끝점(아래쪽)정렬                                             |        |
| space-around  | 각 행 위아래에 여백을 고르게 정렬                            |        |
| space-between | 첫행은 시작점에, 끝행은 끝점에 정렬되고 나머지 여백으로 고르게 정렬 |        |
| space-evenly  | 모든 여백을 고르게 정렬                                      |        |
| stretch       | 열 축을 채우기 위해 그리드 콘텐츠를 늘림                     |        |

- justify-content (전체 item을 정렬하는 방법)

: 그리드 콘텐츠를 수평(행 축) 정렬하는데 사용됨.

가질 수 있는 속성은 align-content와 동일하다.



- aling-items (grid-item내에서 콘텐츠의 수직정렬)

: 그리드 아이템들을 수직 정렬. 그리드 아이템으 ㅣ세로너비가 자신이 속한 그리드 행(trcak)의 크기보다 작아야 합니다.

| 값      | 의미                                     | 기본값 |
| ------- | ---------------------------------------- | ------ |
| normal  | stretch와 같다.                          | normal |
| start   | 시작점(위쪽) 정렬                        |        |
| center  | 수직 가운데 정렬                         |        |
| end     | 끝점(아래쪽) 정렬                        |        |
| stretch | 열 축을 채우기 위해 그리드 아이템을 늘림 |        |

- justify-items (grid item내에서 콘텐츠의 수평정렬)



##### grid item에 사용하는 속성

---



- align-self

:align-items와 동일한 개념이나 하나의 단일 아이템에 대한 수직정렬을 의미한다.

가질 수 있는 속성은 align-items와 동일하다.

- justify-self

: justify0items와 동일한 개념, 단일 아이템에 대한 수평정렬을 의미한다.



- order

: 그리드 아이템이 자동배치되는 순서를 정의함.

숫자가 작을수록 앞쪽에 먼저 배치됨. 기본값은 `order: 0` 이다. 따라서 0보다 작은 음수값을 크게 가질수록 배치 우선순위가 높다.



- z-index

: 아이템이 쌓이는 순서를 정의함. 큰 양수값을 가질수록 위쪽에 쌓임. 기본값은 `z-index:0`



##### grid functions

---

: 함수 `E ()`



- repeat

: 행,열의 크기 정의를 반복.

'반복되는 횟수'와 '1행/열의 크기정의'를 인수로 사용한다.

grid-template-rows와 grid-template-columns에서 사용한다.

```
.container {
	grid-template-rows: repeat(3,100px)
	grid-templat-colums: repeat(2, 100px 150px)
}
```



- minmax

: 행,열의 최소/최대 크기를 정의한다.

첫번쨰 인수는 최솟값 / 두번쨰 인수는 최댓값을 나타낸다.

일반요소에  min-width, max-width와 동일한 성격을 가짐

```
.container {
							첫번쨰 열           두번쨰 열
	grid-template-columns: minmax(100px,1fr) minmax(200px,1fr);
}
```



- fit-content

:행,열의 크기를 그리드 아이템이 포함하는 내용의 크기에 맞추어 준다. 

'내용의 최대 크기'를 인수로 사용한다.

<u>minmax(auto, max-content)와 유사하다.</u>

```
.container {
	grid-tomplate-columns: fit-content(300px) fit-content(300px)
}
```



##### grid units

---

그리드에서 사용하는 주요 단위



- fr(Fraction)

: 사용가능한 공간에 대한 비율을 의미한다.

단, 특정 단위를 이용하여 구체적인 크기를 지정한 아이템들의 크기를 제외하고 나머지 영역의 크기를 재정의 하는 개념이니 유의.

```
.container {
	grid-template-columns: 1fr 2fr 100px 25%;
}
```

![image-20200330104256843](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200330104256843.png)	

- min-content

: 그리드 아이템이 포함하는 내용의 최소 크기를 의미한다.

```
IM HTML

<div class="container">
  <div class="item">Hello HEROPY~</div>
  <!-- ... -->
</div>
```

```
IN CSS

.container {
  grid-template-columns: min-content 1fr;
}
```

![image-20200330104751759](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200330104751759.png)	 띄어쓰기한 공간이 줄바꿈 처리가 됨.

한글을 사용하는 경우 `word-break: keep-all;`를 설정하면 정상적으로 동작한다.

![image-20200330104859916](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200330104859916.png)		



- max-content

: min-content와는 반대로 그리드 아이템이 포함하는 내용의 최대 크기를 의미한다.

![image-20200330104917637](C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200330104917637.png)	띄어쓰기 한 구간도 줄바꿈 처리하지 않고 그대로 나타냄.



- auto-fill, auto-fit

: 행,열의 갯수를 그리드 컨테이너 및 행,열의 크기에 맞게 자동으로 조정한다.

repeat() 함수와 같이 사용하며 <mark>행,열과 아이템 개수가 명확하지 않은 경우 유용하다.</mark>



auto-fill / auto-fit 차이점

: 그리드 컨테이너가 하나의 행,열에 모든 아이템을 모든 아이템을 수용하고 남는 공간이 있을 때 발생한다.

**auto-fill** : 남는공간을 그대로 유지

**auto-fit**: 남는공간을 축소.

