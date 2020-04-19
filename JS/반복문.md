### 반복문

: 특정작업을 반복적으로 수행할 때 사용.

- 반복문 실행순서

1. 시작
2. 조건 : true -> 구문실행 -> 다시 조건 확인.
3. 조건 : false -> 끝



- for 반복문

: 변수 초기값 선언,  조건선언,  해당 조건이 true일 시 실행할 작업 으로 구성되어 선언한다.

###### for 반복문 실행 순서 

: a -> d -> c -> b -> d (b조건에 부합하지 않을때까지 루프) -> c -> b -> e

```
for(a; b; c){
	d
}
e
```



```
for (let i = 0; i < 10; i++)
      변수 초기값  조건  조건 true시 실행구문
```





- for 반복문 + 배열

```
const names = ["멍뭉이", "야옹이", "멍멍이"];

for (let i = 0; i < names.length; i++) {
  console.log(names[i])
}
```



- while 반복문

:  변수를 외부에 선언하고 while반복문에 조건을 선언한 뒤 그 내부에 실행할 작업을 선언한다.

   조건이 까다로운 경우에 주로 사용한다. 해당조건이 false가 될때까지 실행한다.

```
let i = 0;

while (i<10) {
	i++
}
```



- do while 반복문

 : 처음 1회 실행 시에는 조건을 확인하지 않고 우선 실행 후 2회째부터 조건이 거짓이 될때까지 실행하는 문.



- for of 반복문

: 배열을 다룰 때 주로 사용하는 반복문

```
const wooseong = [100,200,300,400,500]

for (let number of wooseong) {
  console.log(number);
}

결과값 
100
200
300
400
500
```



- for in 반복문

```
const doggy = {
  name: "멍멍이",
  age: "2살",
  sound: "멍멍"
};


for(let key in doggy) {
  console.log(key);
};

for(let key in doggy) {
console.log(`${key}: doggy[key]`)
};
```



//

**객체의 정보를 받아오는 방법**

1. key값 받아오기

```
console.log(Object.keys(객체이름))
```

2. value값 받아오기

```
console.log(Object.values(객체이름))
```

3. 배열형태로 받아오기

-> [ [key1], [value1] , [key2], [value2] ] 의형태로 출력됨.

```
console.log(Object.entries(객체이름))
```

//



- continue

: 특정조건이 만족되었을 때, 다음조건을 실행하라. (만족된 조건은 skip됨.)

- break

: 특정조건이 만족되었을 때, 해당 반복문을 끝내라.

```
for(let i = 0; i<10; i++) {
  console.log(i)
  if( i === 6) break;
};
```

- for 무한루프

: for 조건 안에 세미콜론 2개표시하여 무한루프를 표현할 수 있고 for문 내에 if 조건문 + break를 사용하여 해당 무한루프를 종료시키도록 설정한다.

```
for(;;) {
	console.log('안녕하세요');
	if(Math.random() * 100 >90) {
		break;
	}
}
```

