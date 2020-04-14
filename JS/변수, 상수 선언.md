#### console.log

: 특정 값을 출력하는 역할을 한다.

```
console.log("hello word!")

-> heloo word! 라고 출력됨.

console.log(1+2+3+4)

-> 10으로 출력됨.
```



#### let

: **<u>변수</u>**를 선언하는 방법 중의 하나이다.

###### 숫자선언 (그냥선언)

```
let value = 1 ;
```

###### 문자선언 (string[따옴표] 사용하여 선언)

```
let text = 'hellow';
let name = "hellow" ;
```

###### boolean 선언

```
let good = "true" ;
let loading = "false" ;
```

###### null vs undefined

1. null

: 값이 없을 때 사용.

```
let good = null ;
```

2. undefined

: 값이 아직 설정되지 않았을 때 사용.

```
let something = undefined ;
```



**let을 이용한 변수 선언 시 주의할 점** 

- 변수로 선언 해 준 값은 재 설정이 가능함.

```
let value = 1;

value =2 ; -> 재 설정이 가능.
```

- 한번 선언을 하면 해당 선언시와 똑같은 이름으로 재선언이 불가능하다.

  단, 새로운 함수나 조건문 내에서는 재 선언이 가능하니 주의한다.

```
/* 초기선언 */
let value = 1;

/* 추후선언 */
let value = 2;            -> 불가능함.
```



#### const

: **<u>상수</u>**를 선언하는 방법중의 하나이다.

**const를 이용한 상수 선언 시 주의할 점** 

- 변수와 다르게 재 설정이 불가능하다. 한번선언하게 되면 default 값이 됨.

```
const a = 1;

a = 2; -> 불가능
```

- let과 동일하게 한번 선언을 하면 해당 선언시와 똑같은 이름으로 재선언이 불가능하다.

  단, 새로운 함수나 조건문 내에서는 재 선언이 가능하니 주의한다.





