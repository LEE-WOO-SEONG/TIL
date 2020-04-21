CSS / 속성 - 애니메이션 &다단



##### animation

---

: 요소에 애니메이션을 설정 및 제어하는 속성.

실제 애니메이션을 선언하는 속성은 @keyframes 이다.

| 값                        | 의미                              | 기본값   |
| ------------------------- | --------------------------------- | -------- |
| animation-name            | @keyframes 규칙의 이름을 지정     | none     |
| animation-duration        | 애니메이션의 지속 시간 설정       | 0s       |
| animation-timing-function | 타이밍 함수 지정                  | ease     |
| animation-delay           | 애니메이션 대기 시간 설정         | 0s       |
| animation-iteration-count | 애니메이션의 반복 횟수 설정       | 1        |
| animation-direction       | 애니메이션의 반복 방향 설정       | normal   |
| animation-fill-mode       | 애니메이션의 전후 상태(위치) 설정 | none     |
| animation-play-state      | 애니메이션의 재생과 정지 설정     | runnuing |

```
animation: 애니메이션이름 지속시간 [타이밍함수 대기시간 반복횟수 반복방향 전후상태 재생/정지];
```

```
.box {
	animation: hello 2s linear infinite both;
}

@keyframes hello {
	0% { width: 200px; }
	100% { width: 50px;}
}
```



###### keyframes

: 2개 이상의 애니메이션 중간 상태(프레임)을 지정.

```
@keyframes 애니메이션 이름 {
	0% {속성:값}
	50% {속성:값}
	100% {속성:값}
}
```



- animation-delay

  : 음수의 값도 설정이 가능하다. 음수값 설정 시 duration time이 delay를 상쇄하고 남은 시간부터 시작된다.

  ```
  .box {
  	animation hello {
  	animation-duration: 3s
  	animation-delay: -1s
  	}
  }
  .box:hover {
  	animation: hello 
  	animation-duration: 3s;
  	animation-delay: -1s;
  }
  
  @keyframes hello {
  	0% { width: 200px; }
  	100% { width: 50px;}
  }
  ```

  : box 에 마우스를 올려놓으면 0s 부터가 아닌 1s시점일 때의 효과부터 시작한다.

- animation-iteration-count

| 값       | 의미             | 기본값 |
| -------- | ---------------- | ------ |
| 숫자     | 반복 횟수를 설정 | 1      |
| infinite | 무한반복         |        |

: 왕복의 경우 iteration count는 1회가 아니라 2회이다.

- animation-direction

| 값                | 의미                                | 기본값 |
| ----------------- | ----------------------------------- | ------ |
| normal            | 정방향만 반복                       | normal |
| reverse           | 역방향만 반복                       |        |
| alternate         | 정방향 -> 역방향 -> 정방향으로 왕복 |        |
| alternate-reverse | 역방향 -> 정방향 -> 역방향으로 왕복 |        |



- animation-fill-mode

| 값        | 의미                                                         | 기본값 |
| --------- | ------------------------------------------------------------ | ------ |
| none      | 기존 위치 -> 애니메이션 시작 위치 -> 동작 -> 기존위치        | none   |
| forwards  | 기존 위치 -> 애니메이션 시작 위치 -> 동작 -> 애니메이션 끝 위치 |        |
| backwards | 애니메이션 시작 위치 -> 동작 -> 기존위치                     |        |
| both      | 애니메이션 시작 위치 -> 동작 -> 애니메이션 끝 위치           |        |

- animation-play-state

| 값      | 의미                   | 기본값  |
| ------- | ---------------------- | ------- |
| running | 애니메이션을 동작      | running |
| paused  | 애니메이션 동작을 정지 |         |



##### multi-columns

: 일반 블록 레이아웃을 확장하여 여러 텍스트 다단으로 쉽게 정리하며, 가독성을 확보할 수 있다.

- column-width 

  :단의 최적 너비를 설정한다. 

  각 단이 줄어 들 수 있는 최적 너비를 설정하며, 요소의 너비가 가변하여 하나의 단이 최적너비보다 줄어들 경우 단의 개수가 조정된다.

- column-count : 단의 개수를 설정

- column-gap : 단과 단 사이의 간격을 설정.

- column-rule : { width style color} (단축속성- border와 동일함)

1. column-width : 선의 두께를 지정
2. column-style : 선의 종류를 지정
3. column-color : 선의 색상을 지정, 특정 색상을 지정하지 않을 시 text의 컬러와 동일하게 적용된다.

<u> 구분선은 column-gap 의 중간에 위치한다.</u>

```
<div class="newspaper" style="column-count:3 column-rule: 2px dahsed red;">
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.
</div>
```

<div class="newspaper" style="column-count:3; column-rule: 2px dahsed red;">
Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Nam liber tempor cum soluta nobis eleifend option congue nihil imperdiet doming id quod mazim placerat facer possim assum.
</div>

