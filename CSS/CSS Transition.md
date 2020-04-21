# CSS 속성 - 전환 & 변환



##### 	transition

: css 속성의 전환 효과를 설정.

: css 속성의 시작과 끝을 지정하여 중간 값에 애니메이션을 적용한다.

| 값                         | 의미                         | 기본값 |
| -------------------------- | ---------------------------- | ------ |
| transition-property        | 전환 효과를 사용할 속성 이름 | all    |
| transition-duration        | 전환 효과의 지속시간 설정    | 0s     |
| transition-timing-function | 타이밍 함수 지정             | ease   |
| transition-delay           | 전환 효과의 대기시간 설정    | 0s     |

transition-duration은 바뀌기 전 상태의 선택자에 입력 해 준다.



##### transform

:요소의 변환효과를 설정.

```
transform: 변환함수1 변환함수2 변환함수3 ...
transform: 원근법 이동 크기 회전 기울임..;
```

###### transform 2d 변환함수

| 값(변환함수)         | 의미             | 단위       |
| -------------------- | ---------------- | ---------- |
| translate(x, y)      | 이동(x축, y축)   | 단위       |
| translatex (x)       | 이동(x축)        | 단위       |
| translatey (y)       | 이동(y축)        | 단위       |
| scale (x, y)         | 크기(x축, y축)   | 없음(배수) |
| scalex (x)           | 크기(x축)        | 없음(배수) |
| scaley (y)           | 크기(y축)        | 없음(배수) |
| rotate (degree)      | 회전(각도)       | deg        |
| skew (x-deg, y-deg)  | 기울임(x축, y축) | deg        |
| skewx (x-deg)        | 기울임(x축)      | deg        |
| skewy (y-deg)        | 기울임(y축)      | deg        |
| matrix (n,n,n,n,n,n) | 2차원 변환 효과  | 없음       |



###### transform 3d 변환함수

| 값(변환함수)                                | 의미           | 단위 |
| ------------------------------------------- | -------------- | ---- |
| translate3d(x,y,z)                          | 이동           | 단위 |
| translatez(z)                               | 이동(z축)      | 단위 |
| scale3d(x,y,z)                              | 크기           | 배수 |
| scalez(z)                                   | 크기(z축)      | 배수 |
| rotate3d(x,y,z)                             | 회전           | deg  |
| rotatex(x)                                  | 회전(x축)      | deg  |
| rotatey(y)                                  | 회전(y축)      | deg  |
| rotatez(z)                                  | 회전(z축)      | deg  |
| perspective(n)                              | 원근법(거리)   | 단위 |
| matrix3d(n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n,n) | 3차원 변환효과 | 없음 |



###### transform 변환속성

| 속성                | 의미                                         |
| ------------------- | -------------------------------------------- |
| transform-origin    | 요소 변환의 기준점을 설정                    |
| transform-style     | 3d 변환요소의 자식요소도 3d 변환을 할지 설정 |
| perspective         | 하위 요소를 관찰하는 원근거리를 설정         |
| perspective-origin  | 원근거리의 기준점을 설정                     |
| backface-visibility | 3d 변환으로 회전된 요소의 뒷면 숨김을 설정   |

- transform-origin

| 값   | 의미                   | 기본값 |
| ---- | ---------------------- | ------ |
| x축  | left, right, center, % | 50%    |
| y축  | top, bottom, center, % | 50%    |
| z축  | 단위                   | 0      |

- transform-style

| 값          | 의미                               | 기보값 |
| ----------- | ---------------------------------- | ------ |
| flat        | 자식요소의 3d 변환을 사용하지 않음 | flat   |
| preserve-3d | 자식요소의 3d 변환을 사용함        |        |

해당 속성은 바로 아래 자식의 3d 변환요소 사용을 설정하는 것으로 그 후손들의 변환요소를 control 하기 위해서는 지속적으로 해당속성을 부모 tag에 입력 해 주어야 한다.



###### perspective

| 값   | 의미                      | 기본값 |
| ---- | ------------------------- | ------ |
| 단위 | px, em, cm 등 단위로 지정 |        |

- perspective 속성과 함수의 차이점

| 속성 / 함수              | 적용대상            | 기준점 설정        |
| ------------------------ | ------------------- | ------------------ |
| perspective              | 관찰대상의 부모요소 | perspective-origin |
| transform: perspective() | 관찰대상            | transform-origin   |



###### backface-visibilty

| 값      | 의미            | 기본값  |
| ------- | --------------- | ------- |
| visible | 뒷면 숨기지않음 | visible |
| hidden  | 뒷면숨김        |         |



###### matrix(a,b,c,d,e,f)

: 요소의 2차원 변환 설정

scale() / skew() / translate () / rotate () 를 지정



  