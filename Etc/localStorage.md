# local storage



## local storage?

**영구적**으로 값을 저장하고 싶은 경우 사용할 수 있는 브라우저 내장형 저장소를 뜻한다.

HTML5에서 추가된 저장소이며 서버가 아닌 클라이언트단에 데이터를 보관하는 형식으로 데이터의 저장 / 갱신 / 삭제등을 자바스크립트로 control이 가능하며 모바일에서도 사용이 가능하다.

<br>

- local stroage 기본구성

key와 value을 하나의 세트로 저장한다.

값은 반드시 **문자열**의 형태로 저장된다.

`window.localStorage` 혹은 `localStorage`로 참조가 가능하다.

```js
// 데이터 취득
localStorage.getItem('key');

// 데이터 저장, 갱신
localStorage.setItem('key', 'value');

// 데이터 삭제
localStorage.removeItem('key');

// 모든 데이터 삭제
localStorage.clear();
```

로컬스토리지에 데이터 저장 시, 문자열의 형태로 저장하기 때문에 `toString()` 메소드가 호출된 형태로 저장이 된다. 때문에, 객체를 그대로 저장하게 되면 `({...}).toString()` 의 형태로 저장되게 되어 [Object Object] 의 형태로 저장이 된다.

- 로컬스토리지에 객체를 저장하는 방식

1. 객체 내부의 프로퍼티 키와 값을 각각의 형태로 하나하나 따로 저장. 

2. `JSON.stringify` 메소드로 객체를 통채로 저장.

   단,  JSON.stringify로 객체를 저장할 경우 객체를 통째로 문자열의 형태로 저장한다. 또한 해당 객체를 가져올 경우 `JSON.parse`를 이용한다.

```js
// 객체 데이터 저장
localStorage.setItem('key', JSON.stringify({...}));
                     
// 객체 데이터 취득
JSON.parse(localStorage.getItem('key'));
```

<br>

## session storage?

local storage와 같이 HTML5에서 추가된 저장소이나 localstorage와 다르게 데이터가 영구보존되지 않는다. 윈도우 혹은 브라우저의 탭을 닫을 경우 session storage에 저장된 데이터는 제거된다.

주로 일회성 정보를 저장하는데 사용된다.

<br>

## 쿠키?

만료 기한이 있는 키-값의 저장소로 `document.cookie` 로 정보를 확인할 수 있다.

쿠키는 4kb의 용량제한이 있고 <strong>매 서버 요청 시 마다 서버로 쿠키가 함께 전송된다.</strong> 

쿠키가 매번 전송되는 이유는 서버로 요청을 보낸 클라이언트의 정보를 나타내기 위함이다. 예를 들어, 브라우저에서 서버로 정보를 요청하면 서버는 해당 정보를 요청한 당사자에게 응답의 결과로 해당 정보를 보내준다. 이 때, 요청자의 정보를 쿠키에 담아 전송하면 서버는 쿠키를 읽어서 요청자를 파악한다. 쿠키는 기본적으로 서버와 클라이언트간의 지속적인 데이터 교환을 위해 만들어졌다. 



## 업로드한 file을 localStorage에 데이터 저장

1. `<input type="file">` 를 활용하여 data 업로드

```html
<!-- html -->
<input type="file" accept="image/jpg,jpeg,png" multiple name="image">
```

2. 업로드한 data를 받아와 로컬 스토리지에 저장

```js
// js
$input.onchange = e => {
	const reader = new FileReader();
     reader.readAsDataURL(e.target.files[0];);

     reader.onload = evt => {
       localStorage.setItem('path', evt.target.result);
};
```