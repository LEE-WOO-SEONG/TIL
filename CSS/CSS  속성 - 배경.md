# CSS / 속성 - 배경



##### 	background

---

: 배경 속성을 지정.

| 값                    | 의미                     | 기본값      |
| --------------------- | ------------------------ | ----------- |
| background-color      | 배경색상                 | transparent |
| background-image      | 하나 이상의 배경이미지   | none        |
| background-repeat     | 배경이미지의 반복        | repeat      |
| background-position   | 배경이미지의 위치        | 0 0         |
| background-attachment | 배경이미지의 스크롤 여부 | scroll      |

- 사용법

```
background: 색상 이미지경로 반복 위치 스크롤특성;
```

```
div {
	background: red url("") no-repeat top scroll;
}
```

: 상기 값들은 누락해서 써도 입력에는 상관이 없다.

ex) background: red; -> 색상인식 가능

​	  background: repeat -> 반복입력 인식가능



###### background-color

```
background-color: red;
```



###### background-image

```
background-img: url("경로");
width: 120px;
height: 80px;
```

: <u>background image 삽입 시, 요소의 크기가 설정되어 있어야 한다!</u>

```
div {
	*/ 개별속성 */
	background-image: url("경로1"),
	url("경로2"),
	url("경로3");
}

div {
	background-image: url("경로1") no-repeat,
	url("경로2") norepeat 100px 50px,
	url("경로3") repeat ; 
}
```

: <u>하나 이상의 배경 이미지를 삽입할 경우 comma(,)로 구분한다.  <span style="color: blue;">먼저 작성된</span> 이미지가 위에 쌓이며 다중 배경이미지는 IE8이하 버전에 사용할 수 없다.</u>



###### background-repeat

| 값        | 의미                             | 기본값 |
| --------- | -------------------------------- | ------ |
| repeat    | 배경이미지를 수직, 수평으로 반복 | repeat |
| repeat-x  | 수평으로 반복                    |        |
| repeat-y  | 수직으로 반복                    |        |
| no-repeat | 반복없음                         |        |



###### background-position

| 값   | 의미                                                         | 기본값 |
| ---- | ------------------------------------------------------------ | ------ |
| %    | 왼쪽 상단 모서리 0% 0%<br /> 오른쪽 하단 모서리는 100% 100%  | 0% 0%  |
| 방향 | 방향을 입력하여 위치 설정<br /> top, bottom, left, right, center |        |
| 단위 | px, em, cm 등 단위로 지정                                    |        |

- 사용법

```
background-position: 방향1 방향2;
```

: 값이 방향일 경우 표기법이며 방향1과 2의 순서가 뒤바뀌어도 상관 없음.

(top,bottom : y축 속성 / left, right: x축 속성)

```
background-position: x축 y축;
```

: 값이 단위일 경우 순서대로 x,y축이 된다.

```
background-position: 50px top;
background-position: left 50px;
```

: 방향과 단위를 같이 사용해도 되나 top-bottom은 y축 속성을, left-right는 x 축속성을 나타내므로 순서는 상기처럼 나타내야 함을 유의한다.



###### background-attachment !!

: 요소가 스크롤 될 때 배경 이미지의 스크롤 여부설정.

| 값     | 의미                                                         | 기본값 |
| ------ | ------------------------------------------------------------ | ------ |
| scroll | 배경 이미지가 요소를 따라 같이 스크롤 됨                     | scroll |
| fixed  | 배경 이미지가 viewport에 고정되어 요소와 같이 스크롤 되지 않음 |        |
| local  | 요소 내 스크롤 시 배경 이미지가 같이 스크롤 됨               |        |

**background-attachment: local의 경우 background-image를 가진 자식요소의 크기가 부모영역의 크기보다 클 때 사용될 수 있음.**





###### background-size

: 배경이미지의 크기를 설정

| 값      | 의미                                                         | 기본값 |
| ------- | ------------------------------------------------------------ | ------ |
| auto    | 배경이미지가 원래의 크기로 표시됨                            | auto   |
| 단위    | - px, em, %등 단위로 지정<br />- width height 형태로 입력가능<br />- width만 입력하면 비율에 맞게 지정됨 |        |
| cover   | - 배경 이미지의 크기 비율을 유지하며, width/height 중 요소의 더 넓은 너비에 맞춰짐<br />- 이미지가 잘릴 수 있다. |        |
| contain | - 배경 이미지의 크기 비율을 유지하며, width/height 중 요소의 더 짧은 너비에 맞춰짐      - 이미지가 잘리지 않는다. |        |

