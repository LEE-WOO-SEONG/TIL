#### 조건문

- if 

  : 특정조건이 만족될 때에만 특정 구문이 실행됨.

```
const a = 1;

if (a + 1 === 2) {
	console.log("a+1이 2입니다.");                -> 실행
}
```



- if else 

  : 특정조건이 만족될 때에는 '이것' 을 실행하고, 만족되지 않을 때에는 'else'에 있는것을 실행해라.

```
const a = 10;

if (a > 15) {
	console.log("a가 15보다 큽니다.");
} else {
	console.log("a가 15보다 크지 않습니다.");       -> 실행
}
```



- if else if

  : 이 조건이 만족되었을 때에는 '이것'을 실행하고, 저 조건이 만족되었을 때에는 '저것'을 실행하고 이도 저도 만족하지 않으면 'else'에 있는것을 실행하라

```
const a = 3;

if (a === 5) {
  console.log("a는 5입니다.");
} else if (a > 5) {
  console.log("a는 5보다 큽니다.")
} else {
  console.log("a는 5보다 작은 값입니다.")           -> 실행
}
```



- switch case

  : 특정값이 무엇이냐에 따라  다른 작업을 하고싶을 때 사용.

  조건을 끝내고 싶을 때 **break**를 선언하며, 선언한 case에 부합하는게 없을 시 

  **default** 선언에 있는 값을 실행한다.

  switch case에서 default는 무조건 선언 해 줘야 한다.

  

  1. switch + (특정값) 선언

  2. case 조건 :

  3. 출력값

  4. break
  5. default

```
const device = "iphone"

switch (device) {
	case "iphone" :
		console.log ("아이폰");
	break;
	case "ipad" :
		console.log ("아이패드");
	break;
	default:
		console.log("모르겠네요..");
}
```

