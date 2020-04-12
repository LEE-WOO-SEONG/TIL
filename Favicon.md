### Favicon

: 파비콘은 웹페이지에 접속했을 때, 상단 탭의 title 옆에 보여지는 아이콘을 나타낸다.

  파비콘은 웹사이트를 대표하는 로고의 개념과 비슷하며, 해당 아이콘은 즐겨찾기에 웹페이지를 등록할 때에도 사용된다.



#### favicon 입력방법

: 파비콘은 <u>아이콘(ico) 파일의 형태</u>로 도메인의 루트 디렉토리에 위치한다.



- IE에서는 `rel="shortcut icon"`처럼 rel 속성에 두가지 값을 모두 입력하면 IE6~10까지 이상없이 작동되고, 그 밖의 다른 브라우저는 `rel="icon"`처럼 icon 값만 입력해도 작동된다.

```
<!-- IE6-10 --> 
<link rel="shortcut icon" href=""> 

<!-- Everybody else --> 
<link rel="icon" href="">
```

- type 속성의 값은 <u>IE에서만</u> ICO 파일에 대한 서버의 MIME 값에 영향을 받고 다른 브라우저는 이 속성을 무시한다. 결국 type 속성은 무엇이든 값이 될 수 있고, 없어도 된다.

```
<!-- Still works in IE6+ --> 
<link rel="shortcut icon" href="" type="image/vnd.microsoft.icon">

<!-- Still works in IE6+ --> 
<link rel="shortcut icon" href="" type="image/x-icon">

<!-- Still works in IE6+ --> 
<link rel="shortcut icon" href="">
```



- iOS 2.0 이상과 Android 2.1 이상에서는 터치(Touch) 아이콘 지정이 가능하다. 고해상도 아이콘(152x152) 하나만 준비하면 저해상도에서는 알아서 아이콘의 크기가 변경된다. 다만, 기기의 홈스크린에 아이콘이 추가되면 성능에 부정적일 수는 있다.

```
<link rel="apple-touch-icon-precomposed" href="">
```

- IE10 매트로는 타일(tile) 아이콘이 추가되었는데(apple-touch-icon과 유사한) 방문자가 고정(pins)할 경우, 시작화면에 이를 표시한다. 타일 아이콘의 크기는 144x144 PNG 파일이며, 투명한 배경을 사용해야 최상의 결과를 얻을 수 있다.

```
<meta name="msapplication-TileColor" content="#FFFFFF"> 
<meta name="msapplication-TileImage" content="/path/to/favicon-144.png">
```



#### favicon 파일 ICO? PNG?

Chrome, Firefox, Opera 7+, 그리고 Safari 4+는 모두 PNG 파비콘을 지원하지만  **Chrome과 Safari는 ICO 파비콘이 함께 지정되어 있으면 선언된 순서에 상관없이 PNG 파비콘을 무시하고 ICO 파비콘을 사용한다.** 

즉, PNG 파비콘을 지원하지 않는 IE를 위해 ICO 파일을 사용하게 되는 순간, Chrome과 Safari는 PNG 파비콘을 무시하게 된다.

```
<!-- Chrome, Safari, IE -->
<link rel="shortcut icon" href="path/to/favicon.ico">

<!-- Firefox, Opera (Chrome and Safari say thanks but no thanks) --> 
<link rel="icon" href="path/to/favicon.png">
```



- PNG 파일은 각 사이즈별 이미지를 각각 선언해줘야한다.

ICO 파비콘은 multiple sizes를 지원하기에 하나의 ICO 파일에 여러 사이즈의 아이콘을 넣어 두고 이를 활용할 수 있지만 PNG 파비콘은 이것이 불가능하다. 그런 이유로 각각의 필요한 사이즈를 아래와 같이 모두 선언해야 한다.

```
<link rel="icon" href="favicon-16.png" sizes="16x16">
<link rel="icon" href="favicon-32.png" sizes="32x32"> 
<link rel="icon" href="favicon-48.png" sizes="48x48"> 
<link rel="icon" href="favicon-64.png" sizes="64x64">
<link rel="icon" href="favicon-128.png" sizes="128x128">
```



- PNG favicon 사용시 브라우저가 사용할 favicon 사이즈
  - Firefox와 Safari는 마지막에 제공되는 파비콘을 사용한다.
  - 맥(Mac) 용 Chrome은 ICO 포맷의 파비콘이 아니라면 32x32 파비콘을 사용한다.
  - 윈도우즈(Windows) 용 Chrome은 16x16이 먼저 선언되지 않는다면 ICO 파비콘이 사용된다.
  - 상기 옵션 중 아무것도 사용할 수 없는 경우, 양쪽 Chrome은 먼저 선언되는 파비콘을 사용하고 Firefox와 Safari는 마지막에 선언된 것이 사용된다. 사실 맥 용 Chrome은 16x16 파비콘을 무시하고 non-retina 기기에서 16x16으로 크기를 줄일때만 32x32 파비콘을 사용한다.
  - Opera는 사용가능한 아이콘 중에서 하나를 임의로 선택하게 된다.

### 



출처: https://webdir.tistory.com/337 [WEBDIR]