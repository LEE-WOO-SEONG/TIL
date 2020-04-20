### 아스키코드(ASCII)

- 등장배경

전기적 신호에 의해 데이터를 전달하는 전자식 스위치(켜짐: 1, 꺼짐:0)인 컴퓨터는 모든 데이터를 0과1 (2진법)로 저장하고 인식한다.

그렇기 때문에 사람 혹은 다른객체가 컴퓨터와 통신하기 위해서는 각종 문자나 기호,숫자 등이 컴퓨터가 인식할 수 있는 2진법의 형태로 변환되어져 전달되어져야 한다.

이러한 필요성으로 1967년 컴퓨터에게 언어를 변환해 주는 인코딩방식을 표준화한 부호체계인  <mark>ASCII</mark>(American Standard Code for information interchange)가 개발되었다.



- 아스키코드 표

초기 아스키코드는 영어를 기준으로 제작되었고 0~127까지 총 128개(2<sup>7</sup>개, 7bit)의 숫자에 특정문자가 하기와 같이 할당되어져 있었다.

> 0~32 : 인쇄, 전송제어
>
> 33~127 : 숫자, 알파벳 소문자/대문자, 특수기호 등



<img src="https://t1.daumcdn.net/cfile/tistory/2366565058B9999205"/>	

- 등장이후 현재까지의 변화

128개의 문자열로 이루어진 아스키코드만으로는 영어외, 다른 모든국가들의 언어체계를 표현하는 것에 어려움을 느껴 1bit 가 확장되어 2<sup>8</sup> 개의 문자열의 조합으로 이루어진 <mark>ANSI code</mark> 가 등장하였다.

하지만, ANSI code의 등장에도 문자가 많은 한국,중국,일본과 같은 비유럽 국가들이 해당 방식을 사용하기에는 여전히 제한적이였고 이에따라 전 세계언어의 문자를 정의하기 위해 <mark>Unicode</mark>가 등장하게 되었다.

Unicode는 1byte를 사용하여 2<sup>7</sup> = 128가지를 표현할 수 있는 아스키코드와 달리 2byte 즉, 16bit를 사용하여 2<sup>16</sup> (= 65536개)가지를 표현할 수가 있다.



- 1Byte 가 8bit인 이유

전자식 스위치처럼 동작하는 컴퓨터는 모든 데이터를 0과1의 형태(2진수)로 변환하여 메모리에 저장하며 이렇게 저장된 메모리에 있는 2진수 한자리를 우리는 <u>bit</u>라 표현한다.

하나의 bit는 0과1 오직 두가지 정보만 구현가능하기 때문에 여러개의 bit를 묶어 몇자리의 2진수로 데이터를 표현할 수 있는 <u>Byte</u>라는 개념이 등장하게 되었다.

1Byte = 8bit로 나타낼 수 있는데 이렇게 정의된 이유는 7bit (2<sup>7</sup>)인 아스키코드와 통신에러 검출을 위한 parit Bit인 1bit(2<sup>1</sup>)의 조합에 의한 결과물이다.

<img src="http://postfiles5.naver.net/MjAxNjEyMjNfMTAz/MDAxNDgyNDU0NTk5MzM2.BKtYKdJzJvVe7ub7dJq6UhE_UFljBGuFJgxohejthgYg.t4LkNJDj3PrUSoecM8jwN0rWVIJwwoVnrjECnzYMhH4g.PNG.jamduino/image.png?type=w966"/>	

참조 블로그

<a href="https://minwan1.github.io/2018/06/09/2018-06-09-ASCII-Unicode/">아스키코드, 유니코드란?</a>

<a href="https://shaeod.tistory.com/228">ASCII Table - 아스키 코드표</a>

<a href="https://whatisthenext.tistory.com/103">아스키(ASCII)코드와 유니코드(Unicode)의 이해</a>