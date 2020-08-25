# 변수선언

<br>

### 스코프

- var : 함수 레벨 스코프
- let, const : 블록 레벨 스코프

<br>

### 호이스팅

- 호이스팅이란 : 런타임 이전, 코드 평가 시에 실행컨텍스트의 렉시컬 환경에 변수가 등록되어  해당 코드의 실행문을 만나기 이전에도 해당 변수를 참조할 수 있는 현상.
- var, let, const 로 선언한 변수는 모두 호이스팅이 발생.
- var의 경우 참조가 가능하나 let / const로 선언한 변수는 reference error를 발생시킴.

<br>

### 초기값

- var, let : 초기값을 설정하지 않아도 됨.
  1. var : undefined로 초기화
  2. let : 선언코드를 만나면 undefined로 초기화, 코드를 만나기 전에는 TDB에 빠져 참조가 불가한 상태가 됨.
  3. const : 변수 선언 시 초기화가 무조건 필요. 안할 시 error 발생.

- 초기값을 설정한 경우

```ts
function outer() {
    let score = 100;
    score = '30' // 초기값을 숫자로 설정한 경우 다른 타입으로 재할당이 불가
}
```

- 초기값을 설정하지 않은 경우

```ts
// 초기값 미 설정, 타입 미설정
function outer() {
	let score;   // 초기값을 설정하지 않은 경우 any type으로 아무타입으로나 재할당이 가능.
    score = 30;
    score = '30';
}
    
// 초기값은 미 설정, 타입 설정
function outer() {
	let score: number;  // 숫자타입만 재할당 가능.
    score = 30;
}
```


