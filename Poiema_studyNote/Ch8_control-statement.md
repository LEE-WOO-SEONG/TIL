# 제어문

Toc

1. [제어문](#제어문)

2. [블록문](#블록문)

3. [조건문](#조건문)

   3-1.[if...else문](#ifelse-문)

   3-2.[switch문](#switch-문)

4. [반복문](#반복문)

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

 