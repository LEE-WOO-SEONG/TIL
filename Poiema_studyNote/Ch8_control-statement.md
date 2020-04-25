# 제어문

Toc

1. [제어문](#제어문)

2. [블록문](#블록문)

3. [조건문](#조건문)

   3-1.[if...else문](#ifelse-문)

   3-2.[switch문](#switch-문)

4. [반복문](#반복문)

   4-1.[for 문](#for-문)

   4-2.[while 문](#while-문)

   4-3.[do...while 문](#dowhile-문)

5. [break 문](#break-문)

6. [continue 문](#continue-문)

<br>

<br>

## 제어문

주어진 조건에 따라 코드블록 `{}` 을 실행 (조건문) 하거나 반복실행 (반복문) 할 때 사용한다.  자바스크립트는 위부터 코드를 순차적으로 실행한다. 즉, top-down 방식이다.

하지만 특정 문 내에서의 코드 실행 방식을 특정 조건 등을 사용하여 '제어' 할 수 있는데 이러한 제어 방식을 코드블럭을 통해  구현하는 문을 **제어문** 이라 한다.

- 제어문의 종류

1. 블록문
2. 조건문
3. 반복문
4. break 문
5. continue 문

<br>

## 블록문

0개 이상의 문을 중괄호 `{}` 로 묶은 것으로 **코드블럭 혹은 블록**이라 부른다. 자바스크립트에서 블록문은 하나의 **실행단위**로 취급된다.

블록문은 단독으로 사용이 가능하나 일반적으로 제어문 또는 함수를 정의할 때 본문으로 사용되며 self closing statement 로 문의 끝에 세미콜론을 붙이지 않는다.

블록문은 영문으로 block statement 혹은 compound statement로 표기한다.

```javascript
// 블록문
{
 var a = 1;
 console.log(foo); 
}

{}

// 제어문 - 반복문
for(let i = 0; i < 10; i++) {
  console.log(i);                  
}

// 제어문 - 조건문
var x = 1;

if(x < 10) {
  x++ ;
}

// 함수 선언문
function add(a,b) {
    return a + b;
}
```

<br>

## 조건문

불리언 값으로 표현되는 조건식의 평가 결과에 따라 블록문(코드블럭)의 실행을 결정한다.

조건은 소괄호 `()` 내에 표현되며 블록문은 해당 불리언 값이 true 혹은 false 일 때 실행할 값들을 정의하는 용도로 사용한다.  

조건문은 영문으로 conditional statement로 표기한다.

- 조건문의 종류

1. if...else 문
2. switch 문

<br>

### if...else 문

주어진 조건식의 평가가 참일 경우 if문의 코드블럭 내에 있는 문을 실행하고 false일 경우 else문의 코드블럭 내의 문을 실행한다. 코드블럭 내의 문들은 세미콜론으로 마친다.

```javascript
if(조건식) {
   조건식이 true 일 경우 실행 될 문;
} else {
   조건식이 false 일 경우 실행 될 문;
}
```

여기서 조건식은 불리언 값(true or false)으로 평가되어야한다. 만약 조건식의 데이터 타입이 불리언 값이 아닐경우, **암묵적**으로 해당 조건식을 불리언 타입의 값으로 **강제 변환**하여 표현한다.

조건에 따라 실행될 코드블럭을 늘리고 싶을 경우 else if 문을 추가한다.

```javascript
if (조건식1) {
    조건식1이 true 일 경우 실행될 문
} else if (조건식2) {
    조건식1이 false 이며 조건식2가 true 일 경우 실행될 문;
} else {
    조건식1과 조건식2 모두 false 일 경우 실행될 문;
}
```

if 조건문에서 else 문의 사용은 선택적이다. 즉 사용하지 않는다고 하여 문법적인 에러가 발생하는 것은아니다. 단, else 문을 설정 해 주지 않을 경우 조건식이 false일 때 아무런 동작이 실행되지 않는다.

또한, if 혹은 esle문의 실행문이 하나라면 중괄호 `{}` 를 생략하고 해당 문만 적어주어도 된다.

```javascript
var x = 1;
var result = '';

if(x < 10) result = 'x는 10보다 작다.';
else result = 'x는 10보다 크다.';

console.log(result);    // x는 10보다 작다.
```

if else 문은 **삼항연산자**로 바꾸어서 쓸 수도 있다. 단, 실행문이 많아질 경우 삼항연산자로 표현하면 가독성이 떨어지니 경우에 따라 if조건문과 삼항연산자를 잘 사용하도록 하자.

```javascript
// if문을 삼항연산자로 표현

var x = 1;

var result = x < 10 ? 'x는 10보다 작다.' : 'x는 10보다 크다.';

console.log(result);    // x는 10보다 작다.

// else if 문을 삼한연산자로 표현

var x = 11;

var result = x < 10 ? 'x는 10보다 작다.' : x < 12 ? 'x는 11이다' : 'x는 12보다 크다.';

console.log(result);     // x는 11이다.

// else if 문

var x = 11;
var result = '';

if (x < 10) {
    result = 'x는 10보다 작다.';
} else if (x < 12) {
    result = 'x는 11이다.';
} else {
    result = 'x는 12보다 크다.';
}

console.log(result)      // x는 11이다.
```

삼항조건 연산자는 표현식인 문으로 변수 result트에 할당하여 표현하였다.

if..else문은 표혁식이 아닌 문이다.

<br>

### switch 문

주어진 표현식을 **평가**하여 그 **값과 일치하는** 표현식을 갖는 case 문을 실행한다. case문은 상황을 의미하는 표현식을 지정하고 문의 끝을 세미콜론으로 마친다.

만약, 일치하는 표현식이 없다면 default문을 실행한다. 

> Q) default문은 옵션으로 사용한다??
>
> 아니다. switch 문에서 default문이 명시되어 있지 않다면, 문법적 오류가 발생한다. 일치값이 없을 경우 실행되는 default문을 빠뜨리지 않도록 주의하자.

```javascript
switch (표현식) {
    case 표현식1 :
        switch 문의 표현식과 표현식1이 일치할 경우 실행될 문;
        break;
    case 표현식2 :
        switch 문의 표현식과 표현식2가 일치할 경우 실행될 문;
    	break;
    default:
        switch 문의 표현식과 일치하는 표현식이 없을경우 실행될 문;
}
```

if else 문의 조건식이 불리언 값으로 평가되는것과 달리 switch 문의 표현식은 불리언 값보다는 **문자열**, **숫자 값**인 경우가 많다. 따라서 if else문 보다 다양한 상황에 따라 실행할 코드블럭을 결정할 때 사용한다.

```javascript
var month = 1;
var monthName;

switch (month) {
  case 1:
    monthName = 'January';
  case 2:
    monthName = 'February';
  case 3:
    monthName = 'March';
  default :
    monthName = 'invalid'
}

console.log(monthName); // Invalid
```

상기예제를 보면 표현식 month의 값은 1이므로 'january' 가 출력되어야 할 것으로 보이나 invalid가 출력된 것을 볼 수 있다. 

이는 switch문의 끝을 의미하는 `break`문이 사용되지 않아 case1 의 문을 실행 후 switch문을 빠져나오지 못하고 case 2 ~ default 의 문을 모두 실행한 결과이다. monthName은 'january' -> 'February' -> 'March' -> 'Invalid' 순으로 값을 할당받아 마지막 할당값인 Invalid를 출력한 것이다. 이러한 현상을 **fall through** 라 한다.

상기와 같은 문제가 발생하지 않도록 switch문에서는 각 case의 끝에 `break` 문을 사용하는 것을 잊지 말아야 한다. (default문은 가장 끝에 위치하여 break 문 없이도 해당 문 실행 후 switch문을 빠져나가게 되므로 default문에는 break문을 굳이 써주지 않아도 된다.) 

<br>

## 반복문

 반복문은 주어진 조건식의 평가결과가 **true일 경우만** 코드블럭 내의 문을 실행한다. 즉, 주어진 조건식의 평가결과가 false가 되면 문의 실행을 멈추게 된며 false가 될때까지 해당 문을 계속적으로 실행한다.

영문으로는 Loop statement라 표기한다.

- for 문
- while 문
- do...while 문

<br>

### for 문

for문은 조건식의 평가결과가 false 일 때까지 코드블럭을 반복실행한다. for문의 문법은 아래와 같으며 변수 선언 시 식별자는 iteration을 의미하는 i를 사용한다.

```javascript
// for 문 문법
for(변수선언; 조건식; 변수 값에 대한 증감식) {
    조건식이 true일 경우 실행될 문;
}

// for 문 실제사용
for (var i = 0; i < 10; i++) {
    console.log(i);             // 0,1,2,3,4,5,6,7,8,9 출력.
}
```

#### for문의 실행순서

```javascript
for (a; b; c) {
    d
}
```

위 예제에서 for문의 실행순서는 a -> b -> d -> c  ->  b -> d -> c -> ... b가 false가 될 때까지 (b -> d -> c)를 반복하며 false가 되면 해당문은 끝나게 된다. 

1. 첫번 째 실행되는 a는 변수선언문으로 가장 처음, 단 한번만 실행된다.
2. 두번쨰로 선언한 변수의 값이 b의 조건에 부합하는지 비교하는 연산을 실행한다.
3. b의 조건이 true인 경우 코드블럭내의 구문인 d 를 실행한다.
4. 구문 실행 후 c 를 실행한다. c는 일반적으로 선언한 변수 값에 대한 증감식이다.
5. c의 실행으로 값의 변화가 이루어지면 해당 값을 다시 b 의 조건식과 비교한다.
6. true일 경우 3~5번의 과정이 반복되며 b의 조건이 false가 될 때까지 해당과정을 반복한다. 조건식과의 비교 결과가 false가 되면 문 d의 실행이 이루어지지 않고 그 즉시 for문은 멈추게 된다.

<br>

for문 내에서 선언문(a) ,조건식(b), 증감식(c)는 모두 옵션이다. 그러므로 반드시 사용해야 하는것은 아니다. 하지만 사용하지 않으면 for문은 무한 반복한다.

```javascript
for () {...}
```

또한 for문 내에 for 문을 중첩하여 사용할 수 있다.

```javascript
// 주사위 2개를 던졌을 때, 2 눈의 합의 6이 되는 모든 경우의 수

for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if (i + j === 6) console.log(`${i},${j}`);  // 1,5 2,4 3,3 4,2 5,1
  }
}
```

위 예제의 경우 i에 초기값 1이 할당되며 해당 값은 6보다 작으므로 코드블럭 내의 if문을 실행한다. 이 때, 실행된 2번 째 if문이 false가 되어 해당 문의 실행이 **끝나면** 증감식 i++를 실행한다. 

for 문 내에 for 문이 들어있을 경우 실행 순서에 유의하도록 하자.

<br>

### while 문

while 문도 for 문과 동일하게 주어진 조건식이 false가 될 때 까지 코드블럭 내의 문을 반복 실행한다. 단, for문과 문을 선언하는 방식이 다르다.

```javascript
// while 문 문법

변수선언
while (조건식) {
    조건이 true일 시 실행할 문;
    변수값에 대한 증감식;
}
// while 문 사용
var i = 0;
while (i <= 2){
    console.log(i);
    i++;
}
```

조건식의 평가결과가 언제나 참이면 무한루프가 된다.

```javascript
while (true) {...}
```

#### while 문 무한루프 탈출법

while 문에서 무한루프를 탈출하기 위해서는 코드블럭내에 if문으로 탈출조건을 만든 후 break문을 이용하는 방법이 있다.

```javascript
var count = 0;

// 무한루프
while (true) {
  console.log(count);
  count++;
  // count가 3이면 코드 블록을 탈출한다.
  if (count === 3) break;
} // 0 1 2
```

<br>

### do...while 문

do while문은 코드블럭 문을 먼저 실행 하는 `do` 문을 실행 후 while 문을 실행한다. 그렇기 때문에 while의 조건식이 false여도 코드블럭은 최소 1회 실행된다.

```javascript
var i = 0;
do {
    console.log(i);
    i++;
} while (i<3);           // 0 1 2
```

<br>

## break 문

break문은 일반적으로 레이블 문, 반복문이나 switch 조건문에서 코드블럭을 탈출하는데 사용한다. 레이블 문, 반복문, switch 조건문의 코드블럭 이외에 breqk문을 사용하면 syntaxError 가 발생한다. 

> Q) 레이블 문이란?
>
> 레이블 문(label statement) 은 식별자가 붙은 문을 말한다. 레이블문은 일반적으로 중첩된 for문에서 외부로 탈출할 때에를 제외하고는 유용하지 않다. 레이블문은 오히려 코드의 가독성을 떨어뜨린다.
>
> ```javascript
> // foo라는 식별자가 붙은 레이블 문
> Lee : console.log('Lee')
> 
> // 레이블 블록문
> Lee : {
>     console.log(1);
>     break Lee;                // 레이블 블록문 탈출 -> 1 만 출력.
>     consoel.log(2);
> }
> ```

- for 문 중첩 시 break 사용

```javascript
// 내부 for문 탈출

for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {
    if (i + j === 2) break               // 내부 for문 탈출
    console.log('inner ' + j);
  }
}

-> 결과값
inner 0 (i = 0)
inner 1 (i = 0)
inner 0 (i = 1)

// 외부 for문 탈출
outer: for (var i = 0; i < 3; i++) {
  for (var j = 0; j < 3; j++) {.
    if (i + j === 3) break outer;         // outer 레이블 블록문 탈출
    console.log('inner ' + j);
  }
}

-> 결과값
inner 0 (i = 0)
inner 1 (i = 0)
```

```javascript
// 특정 문자열의 위치검색 예제.

var string = 'Hello World.';
var search = 'l';
var index;

for (var i = 0; i < string.length; i++) {
  // 문자열의 개별 문자가 'l'이면
  if (string[i] === search) {
    index = i;
    break;                                  // 반복문 탈출.
  }
}

console.log(index);                         // 2

// String.prototype.indexOf 메소드를 통한 문자열 위치 검색.
console.log(string.indexOf(search)); // 2
```

> 위 예제에서 indexOf 함수는 원하는 항목이 몇번째 원소인지를 숫자값으로 출력하는 함수이다. String이라는 내장객체? 내에 들어있는 indexOf 함수를 이용해서도 값을 찾을 수 있다.

<br>

## continue 문

continue 문은 반복문의 **코드블록 문의 실행을 현 지점에서 중단**하고 반복문의 **증감식**으로 이동시킬 때 사용한다.

반복문을 탈출할 때 사용하는 break문과는 명확하게 다르다. break문은 현 상태에서 해당 반복문 바깥으로 탈출할 때 사용하는 것이고 continue 문은 반복문 내 코드블럭 실행문을 중단하는 것이며 반복문을 탈출하지는 않고 해당 반복문 내에서 작업을 계속적으로 수행한다.

- for문에서의 continue 문

```javascript
// l의 문자열이 몇개인지 count하는 예제.

var string = 'Hello World.';
var search = 'l';
var count = 0;

// continue 문 미사용
for (var i = 0; i < string.length; i++) {
  // 'l'이면 카운트를 증가시킨다.
  if (string[i] === search) {
    count++;
  }
}

// continue 문 사용
for (var i = 0; i < string.length; i++) {
  // 'l'이 아니면 카운트를 증가시키지 않는다.
  if (string[i] !== search) continue;
  count++;
}
```