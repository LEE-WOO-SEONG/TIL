# BOX MODEL



##### width, height

---

| 값   | 의미                     | 기본값 |
| ---- | ------------------------ | ------ |
| auto | 브라우저가 너비를 계산   | auto   |
| 단위 | px,em,cm등의 단위로 지정 |        |

block 요소는 width, height의 값을 지정할 수 있지만,

inline요소는 content에 따라 auto로 box 크기가 지정되며 임의 지정은 불가능하다.



min-width / max-width / min-height / max-height 처럼 최대,최소값을 지정할 수 있다.



##### margin

---

| 값   | 의미                                                         | 기본값 |
| ---- | ------------------------------------------------------------ | ------ |
| 단위 | autopx, em, cm 등 단위로지정                                 | 0      |
| auto | 브라우저가 너비를 계산                                       |        |
| %    | 부모 요소의 <span style="color:red;" text-decoration="underline;">width</span>에 대한 비율로 지정!@! |        |

```
margin: top right bottom left 
margin: [top=bottom] [right=left]
margin: top [right=left] bottom
```

```
.box {
	margin : 10px 20px 30px 40px;
	margin : 10px 20px 30px;
	margin : 10px 20px;
}
```

- margin-top / margin-bottom / margin-left / margin-left 으로도 단축속성만을 지정할 수도 있다.



###### 마진 중복

1. 형제 요소들의 margin-top <-> margin-bottom 간 중복
2. 부모요소의 margin-top <-> 자식요소의 margin-top 간 중복
3. 부모요소의 margin-bottom <-> 자식요소의 margin-bottom 간 중복



###### 마진중복 계산법

| 조건             | 요소a마진 | 요소b마진 | 계산법              | 중복 값 |
| ---------------- | --------- | --------- | ------------------- | ------- |
| 둘다 양수        | 30px      | 10px      | 더 큰 값으로 중복   | 30px    |
| 둘다 음수        | -30px     | -10px     | 더 작은 값으로 중복 | -30px   |
| 각각 양수와 음수 | -30px     | 10px      | 두 값의 합          | -20px   |





##### padding

---

: margin과 동일하게 부모의 width를 기준으로 크기를 지정하며 top / right / bottom / left순으로 표기한다.



###### 크기증가

: 추가된 padding 값만큼 요소의 크기가 커짐. (이를 방지하기 위해 추후에 box-sizing을 border-box로 설정한다.)





##### border

---

: 요소가 포함된 테두리를 나타낸다.

| 값           | 의미           | 기본값 |
| ------------ | -------------- | ------ |
| border-width | 선의두께(너비) | medium |
| border-style | 선의종류       | none   |
| border-color | 선의색상       | black  |

```
border: 두께 종류 색상;
```

```
border: 1px solid red;
```



- border style 종류

| 값     | 의미                    | 기본값 |
| ------ | ----------------------- | ------ |
| none   | 선없음                  | none   |
| hidden | 선없음과 동일           |        |
| solid  | 실선                    |        |
| dotted | 점선                    |        |
| dashed | 파선                    |        |
| double | 두 줄선                 |        |
| groove | 홈이 파여있는 선        |        |
| ridge  | 솟은모양                |        |
| inset  | 요소 전체가 들어간 모양 |        |
| outset | 요소 전체가 나온 모양   |        |



###### 크기증가

: border의 선의 두께만큼 요소의 크기가 증가한다. (padding과 동일, 역시 box-sizing을 border-box로 입력하여 해소가능.)



###### box-sizing

---

| 값          | 의미                                                         |
| ----------- | ------------------------------------------------------------ |
| content-box | width, height만으로 요소의 크기를 계산                       |
| border-box  | width,height + padding + border를 포함하여 요소의 크기를 계산 |

​	



##### display

---

: 요소의 box type을 설정

| 값           | 의미                            | 기본값 |
| ------------ | ------------------------------- | ------ |
| block        | 블록요소                        |        |
| inline       | 인라인요소                      |        |
| inline-block | 인라인-블록요소                 |        |
| 기타         | table, table-cell,list ,flex 등 |        |
| none         | 요소의 박스 타입이 없음         |        |

- block-element

  : 해당 line의 전체 width를 default로 사용하여 1줄에 1개의 요소만 표현이 가능하며 width, height를 임의 지정이 가능하다.

- inline-element
  : content의 값이 요소의 크기를 지정하며, 1줄에 여러개의 요소들이 나열될 수 있으며 width,height의 크기의 임의지정이 불가능하다.

- inline-block element
  : inline과 block의 특성을 모두 가진다. (크기 지정이 가능하며 1줄에 병렬로 나열 또한 가능.)





##### overflow

---

: 요소의 크기 이상의로 내용이 넘쳤을 때, 내용의 보여짐을 제어한다.

| 값      | 의미                                                         | 기본값  |
| ------- | ------------------------------------------------------------ | ------- |
| visible | 넘친 부분을 자르지 않고 그대로 보여줌                        | visible |
| hidden  | 넘친 부분을 잘라내고, 보이지 않도록 함                       |         |
| scroll  | 넘친 부분을 잘라내고, 스크롤바를 이용하여 볼 수 있도록 함    |         |
| auto    | 넘친 부분이 있는 경우만 잘라내고, 스크롤바를 이용하여 볼 수 있도록 함 |         |





##### opacity

---

요소의 투명도를 지정할 때 사용하며 0~1 사이의 값을 사용한다. (0에 가까울 수록 투명하다.)

```
div {
	opacity: 0.5; /* 50% 투명도 */
	opacity: 1;   /* 0% 투명도 */
}
```



- opacity와 display: none의 차이점

###### opacity 

###### : 화면에 있지만 안보이는 것. 

###### (내부의 요소들은 투명도에 의해 안보이나 요소가 차지하는 공간은 그대로 남아있다.)



###### display: none 

###### 화면에서 아예 사라져 안보이게 하는 것. (내부 요소 및 그 공간 자체가 browser 상에서 사라진다.)