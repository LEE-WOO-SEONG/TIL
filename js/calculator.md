#### 연산자

- 산술 연산자

  : 사칙연산 작업을 하는 연산자.

  ```
  let a = 1 + 2;       -> + 는 산술연산자
  
  console.log(a)    -> 1
  console.log(a++)  -> 1
  console.log(a)    -> 2
  console.log(++a)  -> 3
  ```

  

- 대입 연산자

  :  00는 00다 라고 정의하듯,  =(등호)를 사용하는 연산자.

  ```
  let a = 1             -> = 는 대입 연산자
  a +=3;      -> 4
  a -=3;      -> -2
  a *=3;      -> 3
  a /=3;      -> 1/3
  ```

  

- 논리 연산자

  : boolean을 처리하기 위한 연산자

  1. NOT (!) 

  ```
  const a = true;      -> true
  
  const a = !true;     -> false
  ```

  2. AND (&&)  : 두가지 모두 true 여야 true.

  ```
  const a = true;
  
  const a = true && true   -> true
  const a = true && false  -> false
  const a = false && false -> false
  ```

  3. OR   (||) : 둘 중 하나만 true 여도 true.

  ```
  const a = true;
  
  const a = true || true   -> true
  const a = true || false  -> true
  const a = false || false -> false
  ```

  

  **논리연산자의 처리 순서는 NOT -> AND -> OR 순이다.**



- 비교 연산자

  : 값을 비교할 때 사용하는 연산자로 `===` 처럼 equal sign을 <u>3번</u> 사용한다.

  ```
  const a = 1;
  const b = 1;
  
  const equals = a === b;         -> true
  
  const a = "a";
  const b = "b";
  
  const notEquals = a !== b;      -> true      
  ```

  **비교연산자는  `==` 와 같이 equal sign을 <u>2번</u> 사용할 수도 있으나 해당 경우는 변수 혹은 상수가 "문자" 인지 "숫자"인지와 같은 type을 구분하지 않고 연산이 이루어지기 때문에 주의한다.** 

  

- 문자열 붙이기

  ```
  const a = "안녕";
  const b = "하세요";
  
  console.log(a + b)       -> 안녕하세요
  ```

  