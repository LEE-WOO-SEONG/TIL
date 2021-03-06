#### 함수

:  특정코드를 하나의 명령어로  실행할 수 있게하는 기능이다.

   또한, parameter 가 주어졌을 때  그에 따른 결과를 만들어 내는데에도 사용된다.



- 함수 선언 방법

1. function 선언

2. 함수 이름 선언

3. parameter 설정 (여러개일 경우 쉼표[,]로 구분.)

4. 결과값을 나타내는 return 선언.



```
function add(a,b) {
  return a + b ;
}

const sum = add(1,2);
console.log(sum);                    -> 3 출력

//
```



- template Literal

```
function hello(name) {
  console.log(`babo ${name} !`);
}

hello("wooseong")                     -> babo wooseong! 출력
```



**함수 사용 시 주의사항**

: 반환값을 나타내 주는 return을 사용하는 순간 해당 함수는 종료됨을 의미하기 때문에 return이후에 적어주는 값은 무시될 수 있다.



- 화살표 함수

: function을 사용하지 않고 화살표를 이용하여 간결하게 함수작성이 가능.

  return을 선언하지 않고도 화살표를 이용하여 결과값에 대한 연산표시가 가능.

```
// 기존 함수 작성법

function add(a,b) {
  return a+b;
}

const sum = add(1,2);

console.log(sum);                   -> 3
console.log(add(1,2));              -> 3

// 화살표 함수

const add2 = (a,b) => a+b;

const sum2 = add2(1,2);    
console.log(sum2);                  -> 3
console.log(add2(1,2));             -> 3
```

​	

<img src="C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200415224049561.png"/>	