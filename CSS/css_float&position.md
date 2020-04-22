# CSS / 속성 - 띄움(정렬),위치



##### float

---

: 요소를 좌우 방향으로 띄움(수평정렬)

| 값    | 의미            | 기본값 |
| ----- | --------------- | ------ |
| none  | 요소 띄움 없음  | none   |
| left  | 왼쪽으로 띄움   |        |
| right | 오른쪽으로 띄움 |        |

- float 해제

: float 속성이 적용된 요소의 주위로 다른 요소들이 흐르게 되어 이를 방지하기 위해 해제를 시켜주어야함

1. 형제요소에 clear: (left,right,both) 추가하여 해제
2. 부모요소에 overflow: (hidden,auto) 추가하여 해제
3. <span style="text-decoration: underline; color:red;">부모요소에 clearfix 클래스를 추가하여 해제</span>

```
<div class="clearfix">
	<div class="float-left"></div>
	<div class="float-left"></div>
</div>
<div class="next"><div/>
```

```
.float-left {
  width: 100px;
  height: 100px;
  background-color: tomato;
  margin: 10px;
  float: left;
}
.next {
  width: 500px;
  height: 500px;
  background-color: green;
  display: block;
  clear: both;
}
.clearfix::after {
	content:"";
	!!!display: block; !!!!!!
	clear: both;
}
```

- display 수정

: float 속성이 추가된 요소는 display 속성값이 대부분 block으로 수정됨.



##### clear

---

: float의 적용을 해제하는 것. (none, left, right, both)



##### position

---

: 요소의 위치 지정방법의 유형(기준)을 설정.

| 값       | 의미                             | 기본값 |
| -------- | -------------------------------- | ------ |
| static   | 유형없음 / 배치불가능            | static |
| relative | 요소 자신을 기준으로 배치        |        |
| absolute | 위치 상 부모요소를 기준으로 배치 |        |
| fixed    | 뷰포트를 기준으로 배치           |        |
| sticky   | 스크롤 영역 기준으로 배치        |        |

- top: 요소의 position 기준에 맞는 '위쪽'에서의 거리(위치)를 설정
- bottom:  '아래쪽'
- right: '오른쪽'
- left: '왼쪽'

top / bottom : %로 값을 입력 시 부모의 <strong>width</strong>의 percentage로 계산된다.

right / left : %로 값을 입력 시 부모의 <strong>height</strong>의 percentage로 계산된다.



###### relative

: 요소 자신이 존재하던 위치를 기준으로 재 배치되는 것을 말하며, fixed나 absolute와 달리

기존에 차지했던 자리는 그대로 유지하면서 움직인다.

###### absolute

: 의미상 부모요소를 기준으로 위치를 재배치 한다.

의미상 부모의 요건을 갖추기 위해서는 static을 제외한 특정 position을 가져야 한다.

만약, 특정 position을 상위 부모가 존재하지 않는다면 absolute를 적용한 요소는 viewport를 기준으로 재배치 된다.

###### fixed

: viewport를 기준으로 특정 위치에 재배치되어 scroll을 통해 화면을 상하 좌우로 움직일 시, 

동일 위치에 고정되어 같이 움직인다.

<span style="color: red; text-decoration: underline;"> absolute와 fixed의 경우에는 포지션을 지정한 순간 기존위치에서 탈락되어 재배치 된다는 점이 relative 와는 차이가 있다.</span> 

###### sticky

: <mark>자신이 속한 부모 요소의 범위 내에서 viewport를 기준으로 특정위치에 재배치 되는것.</mark>

fixed와 유사하게 scroll을 움직이면 따라서 움직이지만 부모요소의 범위를 지키면서 움직인다는 점이 flex와는 다르며, relative처럼 기존 위치는 그대로 남겨진 상태이다.



##### 요소 쌓임 순서

---

: 요소가 쌓여 있는 순서를 통해 어떤 요소가 사용자와 가깝게 있는지를 결정 (z-축)

- static을 제외한 position 속성의 값이 있을 경우 가장 위에 쌓인다. (값은 무관)
- position이 모두 존재한다면 z-index 속성의 숫자 값이 높을수록 위에 쌓여 brower에 보인다.
- position 속성의 값이 있고, z-index 속성의 숫자 값이 같다면 HTML의 마지막 코드일 수록 위에 쌓인다.
- z-index는 position 속성의 값이 있어야 적용된다.



##### display 수정

---

: position 값에 absoulte, fixed 속성값이 적용된 요소는 display 속성값이 대부분 block으로 수정된다.

단, flex / inline-flex 속성을 지니고 있는 요소들은 display 속성값이 변화가 없다.

