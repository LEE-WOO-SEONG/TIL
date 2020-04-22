# HTML / 요소 - 멀티미디어 & 내장 콘텐츠 & 스크



###### img(image)

----

: 이미지를 삽입할 때 사용.

```
img {display: inline;}
```



| 속성   | 의미                                                         | 값   |
| ------ | ------------------------------------------------------------ | ---- |
| src    | 이미지의 URL                                                 | URL  |
| alt    | 이미지의 대체텍스트                                          |      |
| width  | 이미지의 가로 너비                                           |      |
| height | 이미지의 세로 너비                                           |      |
| srcset | 브라우저에게 제시할 이미지 URL과 원복 크기의 목록을 정의     | w,x  |
| sizes  | 미디어 조건과 해당 조건일 때 이미지 최적화 크기의 목록을 정의 |      |



- srcset

Viewport의 크기에 따라 browser에 보여지는 img의 원본크기를 조절하여 보여주기 위해 사용한다.

srcset값을 사용할 수 없을 경우 src에 있는 img가 brower에 나타난다.

```
<img 
    srcset="./images/heropy_small.png 400w,
            ./images/heropy_medium.png 700w,
            ./images/heropy_large.png 1000w"
    src="./images/heropy.png"
    alt="샘플이미지" /> 
```

상기와 같이 입력 할 경우 w(너비)에 따라서 img 원본파일은 하기처럼 나타나게 된다.

w > 400            small. png 

700>w>400     medium. png 

1000>w>700   large.png



- sizes

미디어의 조건과 그 조건에 해당하는 이미지의 <strong>최적화 출력크기</strong>를 지정한다.

```
    <img 
    srcset="./images/heropy_small.png 400w,
            ./images/heropy_medium.png 700w,
            ./images/heropy_large.png 1000w"
    sizes="(min-width:1000px) 700px"
    src="./images/heropy.png"
    alt="샘플이미지" /> 
```

min-width :1000px 이기 때문에 width가 1000px을 넘어가게 되면 medium img로 출력된다.

width를 특정 크기로 지정하게 되면 고정된 img의 크기를 가진 상태에서

view port의 크기에 따라 다른 원본 img 값이 출력된다.



따라서, width는 <span style="color: blue;">출력크기</span>만을 설정하는 반면에 sizes는  <span style="color: green;"><strong>출력+최적크기</strong></span> 모두 설정 가능하다.

- w

w(width)는 img 원본의 가로 너비를 의미한다. ex) 400px * 300px 의 w는 400w

- x

device pixel ratio descriptor를 나타내며 기본이 되는 img로 부터의 배율을 나타낸다.

상기 코드의 w값을 x로 변형하면 하기와 같다.

```
<img 
    srcset="./images/heropy_small.png 400w,
            ./images/heropy_medium.png 700w,
            ./images/heropy_large.png 1000w"
    src="./images/heropy.png"
    alt="샘플이미지" /> 
```

하지만, 대부분의 경우 w단위를 사용한다.



###### audio

-----

: 소리 콘텐츠(mp3)를 삽입하기 위해 사용.

<div style="color: blue;">autolay가 지정된 경우, preload는 무시된다.   
</div>

| 속성     | 의미                                      | 값                                                           | 기본값   |
| -------- | ----------------------------------------- | ------------------------------------------------------------ | -------- |
| autoplay | 컨트롤없이 바로재생                       | boolean                                                      |          |
| controls | 제어 메뉴를 표시                          | boolean                                                      |          |
| loop     | 재생 끝나면 다시 처음부터 재생            | boolean                                                      |          |
| preload  | 페이지가 로드될 때 파일을 로드할지의 지정 | none:로드하지 않음<br />metadata: 메타데이터만 <br />auto: 전체 로드 | metadata |
| src      | 콘텐츠 URL                                | URL                                                          |          |
| muted    | 음소거 여부                               | boolean                                                      |          |

```
audio {display: inline;}
```



###### video

---

: 동영상 콘텐츠(mp4)를 삽입

```
video {display: inline;}
```

| 속성     | 의미                                      | 값                                                         | 기본값   |
| -------- | ----------------------------------------- | ---------------------------------------------------------- | -------- |
| autoplay | 컨트롤없이 바로재생                       | boolean                                                    |          |
| controls | 제어 메뉴를 표시                          | boolean                                                    |          |
| loop     | 재생 끝나면 다시 처음부터 재생            | boolean                                                    |          |
| preload  | 페이지가 로드될 때 파일을 로드할지의 지정 | none:로드하지 않음 metadata: 메타데이터만  auto: 전체 로드 | metadata |
| src      | 콘텐츠 URL                                | URL                                                        |          |
| muted    | 음소거 여부                               | boolean                                                    |          |
| poster   | 동영상 썸네임 이미지 URL                  | URL                                                        |          |
| width    | 동영상 가로 너비                          |                                                            |          |
| height   | 동영상 세로너비                           |                                                            |          |

```
<video prepload="auto" controls muted>
        <source src="https://www.youtube.com/watch?v=YfrW2D766YA&list=RDcFXAVrmRf8o&index=6" type="video/mp4"/>
        your browser does not support the video tag
</video>
```

상기 영상이 재생되지 않을 경우  comment 가 browser에 나타난다.



###### figure, figcaption

----

figure: 이미지나 삽화, 도표등의 영역을 설정할 때 사용.

figcaption: fig에 포함되어 이미지나 삽화등의 설명을 표시.

특정 이미지가 있는 구간과 그에 대한 설명을 나타내줌으로써 접근성을 높혀준다.

````
figure {display: block;}
figcaption {display: inline;}
````

```
<figure>
	<figcaption>Milk is a nutrient-rich, white liquid food produced by the mammary glands mammals </figcaption>
</figure>
```



###### iframe

---

:다른 HTML 페이지를 현재 페이지에 삽입할 때 사용.

```
iframe {diplay: inline;}
```

| 속성            | 의미                          | 값                                                           | 기본값 |
| --------------- | ----------------------------- | ------------------------------------------------------------ | ------ |
| name            | 프레임의 이름                 |                                                              |        |
| src             | 포함할 문서의 URL             | URL                                                          |        |
| width           | 프레임의 가로너비             |                                                              |        |
| height          | 프레임의 세로너비             |                                                              |        |
| allowfullscreen | 전체화면 모드 사용여부        | boolean                                                      |        |
| frameborder     | 프레임 테두리 사용여부        | 0,1                                                          |        |
| sandbox         | 보안을 위해 읽기전용으로 삽입 | allow-form: 양식제출가능<br />allow-script: 스크립트 실행 가능<br />allow-same-origin: 같은출처의 리소스 사용가능<br /> 또는 boolean |        |

```
<iframe width="1280" height="720" src="https://www.youtube.com/embed/Q9yn1DpZkHQ" frameborder="0" allowfullscreen></iframe>
```



###### canvas

---

: canvas API이나 webGL API를 이용하여 그래픽이나 애니메이션을 렌더링.

[API란?][[https://medium.com/@dydrlaks/api-%EB%9E%80-c0fd6222d34c]

````
canvas {diplay: inline;}
````



###### script

---

: 스크립트 코드를 문서에 포함하거나 참조할 때 사용 (외부 스크립트)

| 속성  | 의미                           | 값              | 특징         |
| ----- | ------------------------------ | --------------- | ------------ |
| async | 스크립의 비동기적 실행여부설정 | boolean         | src 속성필수 |
| defer | 문서 parsing 후 작동여부       | boolean         | src 속성필수 |
| src   | 참조할 외부 스크립트 URL       | URL             |              |
| type  | mime 타입                      | text/javascript |              |

```
srcript {display: none;}
```

```
<head>
    <meta charset="UTF-8">
    <title>콘텐츠 구분 예제</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="./main.css">
    <srcipt src="./main.js" type="text/javascript"></srcipt>
</head>
<body>
	<script>
document.getElementById("demo").innerHTML = "Hello JavaScript!";
</script>
<body>
```



###### noscript

---

: 스크립트를 지원하지 않는 경우에 삽입할 HTML을 정의

```
noscript {diplay: inline;}
```

````
<noscript>
  <p>Your browser does not support JavaScript!</p>
</noscript>
````

****  ******Your browser does not support JavaScript!****** ****



[[https://medium.com/@dydrlaks/api-%EB%9E%80-c0fd6222d34c]: 