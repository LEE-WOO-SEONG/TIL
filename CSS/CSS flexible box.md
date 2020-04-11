# CSS flexible box

: Flex는 요소의 크기가 불분명하거나 동적인 경우에도, 각 요소를 정렬할 수 있는 효율적인 방법을 제공한다.



##### Flex container

----

| 속성            | 의미                                       |
| --------------- | ------------------------------------------ |
| display         | flex container를 정의                      |
| flex-flow       | flex-direction과 flex-wrap의 단축 속성     |
| flex-direction  | flex items의 주 축을 설정                  |
| flex-wrap       | flex items의 여러 줄 묶음(줄바꿈)을 설정   |
| justify-content | 주 축의 정렬 방법을 설정                   |
| align-content   | 교차 축의 정렬방법을 설정 (2 줄 이상)      |
| align-items     | 교차 축에서 items의 정렬 방법을 설정 (1줄) |



- display

| 값          | 의미                                | 기본값 |
| ----------- | ----------------------------------- | ------ |
| flex        | block 특성의 flex container를 정의  |        |
| inline-flex | inline 특성의 flex container를 정의 |        |

- flex-direction

| 값             | 의미                              | 기본값 |
| -------------- | --------------------------------- | ------ |
| row            | items를 수평축으로 표시           | row    |
| row-reverse    | items를 row의 반대 축으로 표시    |        |
| column         | items를 수직축으로 표시           |        |
| column-reverse | items를 column의 반대 축으로 표시 |        |



###### 주 축(main-axis), 교차 축(cross axis)



###### 시작점(flex-start) 끝점(flex-end)



- flex-wrap

| 값           | 의미                                           | 기본값 |
| ------------ | ---------------------------------------------- | ------ |
| nowrap       | 모든 items를 여러 줄로 묶지 않음(한 줄에 표시) | nowrap |
| wrap         | items를 여러 줄로 묶음                         |        |
| wrap-reverse | items를 wrap의 역 방향으로 여러 줄로 묶음      |        |

- justify-content

| 값            | 의미                                                         | 기본값     |
| ------------- | ------------------------------------------------------------ | ---------- |
| flex-start    | items를 시작점(flex-start)으로 정렬                          | flex-start |
| flex-end      | items를 끝점(flex-end)으로 정렬                              |            |
| center        | items를 가운데로 정렬                                        |            |
| space-between | 시작 item은 시작점에, 마지막 item은 끝점에 정렬되고 나머지 items는 사이에 고르게 정렬됨 |            |
| space-around  | items를 균등한 여백을 포함하여 정렬                          |            |

- align-content

: flex-wrap속성을 통해 items가 여러 줄이고 여백이 있을 경우만 사용할 수 있다.

<span style="color:blue;">items가 한 줄일 경우 align-items 속성을 사용한다.</span>

| 값            | 의미                                                         | 기본값  |
| ------------- | ------------------------------------------------------------ | ------- |
| stretch       | container의 교차 축을 채우기 위해 items를 늘림               | stretch |
| flex-start    | items를 시작점으로 정렬                                      |         |
| flex-end      | items를 끝점으로 정렬                                        |         |
| center        | items를 가운데 정렬                                          |         |
| space-between | 시작 item은 시작점에, 마지막 item은 끝점에 정렬되고 나머지 items는 사이에 고르게 정렬딤 |         |
| space-around  | items를 균등한 여백을 포함하여 정렬                          |         |

- align-items

: items가 flex-wrap을 통해 여러 줄 이상일 경우에는 align-content 속성이 우선된다. 따라서 align-items를 사용하려면 align-content 속성을 기본값(stretch)으로 설정해야 한다.

: align-content와 비슷한 속성을 사용하며 <u>문자열을 기준</u>으로 정렬하는 <strong>baseline</strong> 속성을 추가로 가진다.



##### flex items

| 속성        | 의미                                          |
| ----------- | --------------------------------------------- |
| order       | flex item의 순서를 설정                       |
| flex        | flex-grow, flex-shrink, flex-basis의 단축속성 |
| flex-grow   | flex item의 증가 너비 비율을 설정             |
| flex-shrink | flex item의 감소 너비 비울을 설정             |
| flex-basis  | flex item의 (공간 배분 전) 기본 너비 설정     |
| align-self  | 교차 축에서 item의 정렬 방법을 설정           |

- order (기본값: 0)

: item의 순서를 설정하는 속성으로 그 숫자가 클수록 순서가 밀린다!

  또한, 음수 사용이 가능하다.

  숫자가 동일하면 html의 구조적 순서를 따른다.

- flex-grow (기본값: 0)

: item이 가변너비가 아니거나, 값이 0일 경우 효과가 없다.

```
<div class="container">
	<div class="item1"></div>
	<div class="item2"></div>
	<div class="item3"></div>
</div>
```

```
.container {
	display: flex;
}
.container .item {
	width: 100px;
	height: 100px;
}
.item1 {
	flex-grow: 1;
}
.item2 {
	flex-grow: 2;
}
```

: item들의 기본 너비가 정해져 있을 경우 item들간의 크기가 완벽한 배수로는 표현되지는 않는다.

- flex-shrink (기본값:1)

: 숫자가 크면 더 많은 너비가 감소한다. flex-grow와 동일하게 item이 가변너비가 아니거나, 값이 0일 경우 효과가 없다.

: flex-basis * flex-shrink 를 비교하여 item들간 감소비율을 결정한다.

- flex-basis (기본값 : auto)

: 값이 auto일 경우 width, height등의 속성으로 item의 너비를 설정할 수 있으나 단위 값이 주어질 경우 설정할 수 없다. 



```
flex : 증가너비 감소너비 기본너비;
```

: flex 단축속성을 이용할때 flex-basis를 명시하지 않으면 그 값을 0으로 인식하니, 이를 유의해야 한다.



- align-self

: align-items는 container 내 모든 items의 정렬방법을 설정하는데 반해 self는 일부 item만 정렬방법을 변경하기 위해 사용한다.

align-self 값이 align-items 속성보다 우선순위가 높다.