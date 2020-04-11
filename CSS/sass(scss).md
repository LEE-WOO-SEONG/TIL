

### CSS Preprocessor란?

---

Sass, Less , stylus등을 포함하는 개념.

css가 동작하기 전에 사용하는 기능. (css 전처리기)





### Sass(SCSS)

---



But, 웹에서는 표준 CSS만 작동할 수 있어서 바로 scss를 쓸수는 없고 컴파일 과정을 거치게 된다.



scss를 통해 쉬운문법으로 초기 작성을 하고 이후 css 변환하여 웹에 적용시키는 개념



##### sass와 scss의 차이점??

:sass의 3버전에서 새롭게 등장한 scss는 css 구문과 완전히 호환되도록 새로운 구문을 도입해 만든 sass의 모든기능을 지원하는 css의 상위집합 이다.



즉, css에서 작성한 문서를 그대로 scss로 가져와도 호환이 된다!

- sass

```
.list
  width: 100px
  float: left
  li
    color: red
    background: url("./image.jpg")
    &:last-child
      margin-right: -10px
```



- scss

```
.list {
  width: 100px;
  float: left;
  li {
    color: red;
    background: url("./image.jpg");
    &:last-child {
      margin-right: -10px;
    }
  }
}
```



또한, 재사용가능한 기능을 만드는 방식의 차이도 존재한다.

- sass (=선언 / +사용)

```
=border-radius($radius)
  -webkit-border-radius: $radius
  -moz-border-radius:    $radius
  -ms-border-radius:     $radius
  border-radius:         $radius

.box
  +border-radius(10px)
```

- scss(@mixin선언 / @include 사용)



##### 컴파일러

1. [SassMeister][https://www.sassmeister.com/]
2. [node-sass][https://github.com/sass/node-sass]



##### parcel?

컴파일러 중에 하나.