# operator

- Toc

1. [연산자란?](#연산자란)
2. [산술 연산자](#산술-연산자)
3. [할당 연산자](#할당-연산자)
4. [비교연산자](#비교연산자)
5. [삼항조건 연산자](#삼항조건-연산자)
6. [논리연산자](#논리연산자)
7. [쉼표연산자](#쉼표연산자)
8. [그룹연산자](#그룹연산자)
9. [typeof 연산자](#typeof-연산자)
10. [지수연산자](#지수연산자)

<br>

<br>

## 연산자란?

연산자(operator)는 하나 이상의 표현식 들을 연산을 수행해 하나의 **값으로 만들 때** 사용한다. 이때, 연산의 대상을 피연산자(operand)라 한다.

**피연산자**는 값으로 평가될 수 있는 **표현식** 이여야 하며 피연산자와 연산자의 조합으로 이루어진 연산자 표현식도 값으로 평가될 수 있는 표현식이 된다. 

> 연산자는 피연산자를 연산하여 새로운 값을 만드는 역할을 한다. 값과 값으로 연산을 이루어야 값이 생성되므로 이런관점에서 피 연산자는 당연히 값이 되어야 한다. 



## 산술 연산자

산술연산자는 피연산자를 이용하여 **수학적 계산**을 수행 해 새로운 **숫자값**을 만든다. 산술연산이 불가능 한 경우에는 NaN이 결과값으로 참조된다.

피연산자의 개수에 따라 이항, 단항 산술연산자로 구분된다.

- 이항 산술 연산자

**2개의 피연산자**를 산술연산하여 언제나 새로운 **숫자 타입의 값**을 만든다.

| 이항 산술 연산자 | 의미   | 부수효과 |
| ---------------- | ------ | -------- |
| +                | 덧셈   | X        |
| -                | 뺼셈   | X        |
| *                | 곱셈   | X        |
| /                | 나눗셈 | X        |
| %                | 나머지 | X        |

- 단항 산술 연산자

**1개의 피연산자**를 산술연산하여 **숫자타입의 값** 을 만든다.

##### 단항 산술연산자는 피연산자의 값을 변경하는 부수효과가 있다.!! 즉, 연산의 결과값이 피연사자에게 암묵적으로 할당되어져 피연산자의 값이 바뀌게 된다.

| 단항산술 연산자 | 의미                                       | 부수효과 |
| --------------- | ------------------------------------------ | -------- |
| ++              | 증가                                       | O        |
| --              | 감소                                       | O        |
| +               | 효과 X                                     | X        |
| -               | 양수 -> 음수로 <br />음수 -> 양수로 반환함 | X        |

<br>

- 단항산술 연산자의 위치에 따른 의미.

1. 피연산자 **앞**에 위치한 전위 증가/감소 단항 산술 연산자는 **먼저 피연산자의 값을 증가/감소 시킨 후** 다른연산을 수행한다.

2. 피연산자 뒤에 위치한 후위 증가/감소 단항 산술 연산자는 **먼저 연산을 수행한 후**, 피연산자의 값을 증가/감소 시킨다.

- +/- 단항 산술 연산자 

> (+) 단항 연산자는 피연산자의 데이터 타입이 '숫자'이면 아무런 효과도 발생시키지 않는다. 하지만, 숫자타입이 아닌 피연산자에 사용한다면 해당 피연산자를 **숫자타입**으로 변환하여 반환한다.
>
> (-) 단항연산자는 숫자타입에 쓸 경우 음수/양수를 변환시키나 (+) 단항연산자와 같이 숫자타입이 아닌 값에 사용하면 해당 피연산자의 타입을 숫자타입으로 변환하여 반환한다.
>
> 이렇게 숫자타입으로 변환시키는 단항산술연산자의 특성때문에 숫자타입이 아닌값들을 숫자타입으로 변경하고자 할 때 **명시적**인 변경을 위해 일부러 사용하기도 한다.
>
> 이때, 피연산자를 '변경'하는것은 아니고 숫자타입으로 변환한 값을 새로 **생성**하여 반환하는 것이다. 따라서 <u>부수효과는 없다</u>고 표현한다. 

```javascript
console.log(+10);            // 1o
console.log(-10);            //-10
console.log(-'hello');       // NaN
console.log(+'hello');       // NaN
console.log(+true);          // +1
console.log(-true);          // -1
console.log(+false);         // 0
console.log(-false);         // 0
```

<del>숫자는 primitive type으로 immutable 한 값이다. 그렇기 때문에 데이터 타입상 애초에 '변경'할 수 없어 **변환하여 반환한다는 것은 재할당의 개념으로 이해하여야 한다.**<del> -> <ins>변경의 개념을 원시타입과 객체타입에서의 mutable로 이해하였으므로 여기서 다루는 내용과는 거리가 있다. 이 글에서 '변경한다' 는 '처음 할당되었던 값이 바뀌었다' 로 이해하여야 한다.</ins>

<br>

- 문자열 연결 연산자로써의 (+)

(+) 연산자는 피연산자 중 하나 이상이 문자열인 경우 **문자열 연결 연산자**로 동작이 가능하다. 만약 피연산자 중 문자열이 없다면 모두 덧셈연산자로 동작하게 된다.

```javascript
console.log(1+2);           //3
console.log('1'+2);         //12 (문자열)
console.log('1'+'2');       //12 (문자열)
console.log(1 + true);      //2    -> true는 1로 타입변환됨./ false는 0으로 타입변환
console.log('1' + true);    //1true (문자열)
console.log(1 + null);      //1    -> null은 0으로 타입변환된다.
console.log('1' + null);    //1null (문자열)
console.log(+undefined);    //NaN  -> undefined는 숫자로 타입변환되지 않는다.
console.log(1 + undefined); //NaN  -> undefined는 숫자로 타입변환되지 않는다.
```

위 결과값을 보면 undefined의 경우 숫자값으로 암묵적 변환이 불가능하다. undefined라는 값은 '아직 값이 할당되지 않은 상태'를 나타내기 위한 값이므로 이러한 맥락에서 생각 해 볼 때, undefined가 숫자값으로 평가되지 않는 것은 바람직 하다.

<hr>

###### Q) 암묵적 타입변환?(implicit coercion)

위 코드블럭에서 `1 + true` 의 결과값은 NaN이 나와야 할것으로 생각하지만 실제 출력값은 2인것이 확인되는데, 이는 아래 2가지 관점에서 생각 해 볼 수 있겠다.

1. 앞서 살펴본 단항 산술 연산자에서 +/- 는 숫자타입이 아닌 값에 사용되면 해당 피연산자를 숫자타입으려 변환하여 반환한다 라고하였었다. 이관점에서 보면 '+true' 라는 값이 숫자타입인 +1로 변환되어져 1+1 =2 의 결과로 출력되었다고 생각 할 수 있다.

   > (하지만 **단항**연산자의 개념자체가 피연산자가 하나여야 하므로 위의 내용은 확실하지 않다. 나의 개인적인 생각일 뿐이다.)

2. `1`은 숫자타입이고 `true`는 불리언 타입이다. 이렇게 다른 타입은 애초에 연산 자체가 불가능하다. (+/-) 연산자는 문자열 연결연산자가 아닐경우 에는 무조건 산술 연산자로 동작한다. 산술이 가능하려면 각 피연산자는 숫자타입 이여야 한다. 그렇기 때문에 숫자로써의 결과값을 생성하기 위한 연산이 가능하도록 **암묵적으로 true를 숫자타입으로 변환하여 준다.**

   > 종합적으로 1+ true가 NaN이 아닌 2가 나오는 것은 2번쨰 의견이 맞다고 생각되어지고 이러한 현상이 암묵적 타입변환이라고 생각된다.

<hr>

<br>

## 할당 연산자

할당연산자(assignment operator)는 우항의 표현식을 좌항의 변수에 **할당**하는 역할을 하며 한개의 (=) 연산자로 표현한다.

<hr>

Q) **할당연산자는 좌항의 변수에 값을 할당하므로 변수의 값이 <u>변하는</u> 부수효과가 있다??**

그렇다. 단항산술연산자에서 한번 언급하였었지만, 처음 할당되었었던 값이 다른 값이 변경된다는 맥락에서 변한다고 표현하였으므로 그 말은 맞는말이다.

<hr>

| 할당연산자 | 사례  | 동일표현 | 부수효과 |
| ---------- | ----- | -------- | -------- |
| =          | x =5  | x=5      | o        |
| +=         | x +=5 | x = x+5  | o        |
| -=         | x -=5 | x = x-5  | o        |
| *=         | x *=5 | x = x*5  | o        |
| /=         | x /=5 | x = x/5  | o        |
| %=         | x %=5 | x = x%5  | o        |

> 여기서 %란 나누기와는 다른 값이다. 예를들어 5%2 는 2의 배수로 5를 차지하고 남는 '나머지' 라는 개념으로 생각하자. 5%2는 1이다.

<br>

### 할당문은 값으로 평가되는 표현식인 문이다. 

아래 예제를 보면 `x=10` 이라는 할당문은 `10`으로 평가되어 출력되는것이 확인된다.  이처럼 할당문은 **할당된 값**으로 평가된다. 즉, 값으로 평가가 되니 표현식인 문이다.

```javascript
var x;                    // 변수선언문

console.log(x = 10);      // 10으로 출력. 값으로 평가됨.

var y = x=10;             // 변수할당 가능. 표현식인 문

console.log(y);           // 10으로 출력.
```

또한, 할당문을 통해 여러변수에 동일한 값을 **연쇄** 할당할 수도 있다.

```javascript
var a,b,c;

a = b = c = 0;

console.log(a,b,c);        // 0 0 0
```

<hr>

Q) 상기예제에서 `a=b=c=0` 의 할당과정은?

> c = 0이 최초로 할당되고 이후 a,와 b가 할당되는 과정은.. c 가 가리키는 메모리 공간에는 0이라는 값으로 채워져 있는데, 동일한 메모리 공간을 a와 b도 가리키고 있는것인가? 
>
> <del>나는 그렇다고 생각한다. 이유는 console.log (a === b)의 결과값은 true가 나오기 때문이다..</del> <ins> 앞서 a,b,c 가 동일한 메모리 공간을 가리키고 있다라고 표현하였다. 실제로 이말은 아예 틀린말은 아니나 이에대한 논의는 추후 뒷부분에서 나누기로 하고 지금은 c에 할당된 값과 같은 값과 데이터 타입을 갖는 값을 새로운 공간에 할당하여 갖는다고 이해하도록 하자.</ins>
>
> 그리고 사실 상기와 같이 3개의 변수를 쉼표 연산자를 이용해 동시에 선언하고 a=b=c=0 으로 동시에 할당하는 것은 좋은 변수 선언과 할당의 방식은 아니다. a=0, b=0, c=0 과 같이 따로 선언 해 주는것이 다른 개발자들로 하여금 오해의 소지를 없애주는 좋은 코드라고 생각된다.

<hr>

<br>

## 비교연산자

비교연산자(comparison operator)는 좌항과 우항의 피연산자를 비교하여 그 결과값을 불리언 값으로 반환한다.

비교연산자는 주로 if / for 문에서 조건문로 많이 사용된다.

### 동등/ 일치 비교연산자

동등 비교연산자와 일치 비교 연산자는 좌항과 우항의 피연산자가 같은 값을 갖는지 비교하는 동일한 성격을 지니나 비교하는 엄격성의 정도가 다르다. 이름에서 알 수 있듯 **일치비교연산자는 더 엄격한 비교를 한다.**

| 비교연산자 | 의미       | 사례    | 설명                     | 부수효과 |
| ---------- | ---------- | ------- | ------------------------ | -------- |
| ==         | 동등비교   | x == y  | x와 y의 값이 같음        | X        |
| ===        | 일치비교   | x === y | x와 y의 값과 타입이 같음 | X        |
| !=         | 부동등비교 | x != y  | x와 y의 값이 다름        | X        |
| !==        | 불일치비교 | x !== y | x와 y의 값과 타입이 다름 | X        |

> 동등비교 연산자는 좌항과 우항의 피연산자를 비교할 때 암묵적 타입변환을 통해 타입을 먼저 일치 시킨 후, 비교한다. 따라서 동등비교 연산자는 좌항과 우항의 피연산자의 타입이 다르더라도 true를 반환한다.
>
> 그렇기 때문에 동등비교보다는 일치 비교 연산자를 사용하는 것이 권장된다.

```javascript
// 일치비교 연산자
console.log(5 === '5')     // false
// 동등비교 연산자
console.log(5 == '5')      // true
```

<br>

##### 일치비교 연산자 사용 시 주의할 것은 NaN과 0 이다.

- NaN

```javascript
console.log(NaN === NaN)    // false
```

상기 결과값은 true로 출력된다. 따라서 NaN은 **자신과 일치하지 않는** 유일한 값임을 인지해야 한다.

해당 숫자가 NaN인지 알기 위해서는 isNaN 함수를 사용하도록 한다. NaN이면 true가, 아니면 false 가 출력된다.

```javascript
console.log(isNaN(NaN));   // true
console.log(isNaN(1));     // false
```

- 0

자바스크립트에서 0은 +0 / -0 2가지가 있는데, 이들을 비교하면 true가 반환된다.

```javascript
console.log(0 === 0);      // true
console.log(0 === -0);     // true
console.log(0 == 0);       // true
console.log(0 == -0);      // true
```

- ES6에서 새롭게 도입된 **Object.is 메소드**는 예측가능한 정확한 비교결과를 반환한다.

```javascript
console.log(Object.is(-0,+0));        // false
console.log(Object.is(NaN, NaN));     // true
```

<br>

### 대소 관계 비교 연산자

| 대소 관계 비교 연산자 | 예제 | 설명                  | 부수효과 |
| --------------------- | ---- | --------------------- | -------- |
| >                     | x>y  | x가 y보다 크다        | X        |
| <                     | x<y  | x가 y보다 작다        | X        |
| >=                    | x>=y | x가 y보다 같거나 크다 | X        |
| <=                    | x<=y | x가 y보다 같거나 작다 | X        |

<br>

## 삼항조건 연산자

삼항조건연산자는 조건식의 평가결과에 따라 변환할 값을 결정하는 연산자로 부수효과는 없다.

삼항조건 연산자는 다음과 같이 표현한다.

```
조건식 ? 조건식이 true일 때 반환할 값 : 조건식이 false일 때 반환할 값 
```

조건식에는 불리언 타입의 값으로 평가될 수 있는 **표현식**이 들어간다. <u>만약 조건식의 평가결과가 불리언 값이 아니면 불리언 값으로 **암묵적 타입변환**이 일어나니 이를 기억하자.</u>

```javascript
// 삼항조건 연산자

var x = 2;

// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
var result = x % 2 ? '홀수' : '짝수';

console.log(result);     // 짝수

// if 문

var x = 2, result;

// 2 % 2는 0이고 0은 false로 암묵적 타입 변환된다.
if (x % 2) {
    result = '홀수';
} else{
    result = '짝수';
}
console.log(result); // 짝수
```

삼항조건 연산자로 표현할 수 있는 것들은 if 문으로도 표현이 가능하다. 하지만 두 문은 차이점을 가지고 있다.

삼항조건 연산자는 값으로 평가될 수 있는 **표현식인 문** 이며, if문은 **표현식이 아닌 문** 이다. 때문에 삼항조건 연산자는 값이 들어갈 수 있는 자리에 쓰일 수 있어 매우 유용하다.

하지만 true 혹은 false 일 때 해야 할 작업이 길어진다면 if문으로 표현 해 주는것이 가독성측면에서 좋은 코드일 것이다.

```javascript
var x = 10;

// 삼항 연산자 표현식은 표현식인 문이다. 따라서 값처럼 사용할 수 있다.
var result = x % 2 ? '홀수' : '짝수';
console.log(result); // 짝수
```

<br>

## 논리연산자

논리연산자는 우항과 좌항의 피 연산자를 논리 연산한다.

| 논리연산자 | 의미        | 부수효과 |
| ---------- | ----------- | -------- |
| \|\|       | 논리합(OR)  | X        |
| &&         | 논리곱(AND) | X        |
| !          | 부정(NOT)   | X        |

```javascript
// 논리합(||) 연산자
true || true;   // -> true
true || false;  // -> true
false || true;  // -> true
false || false; // -> false

// 논리곱(&&) 연산자
true && true;   // -> true
true && false;  // -> false
false && true;  // -> false
false && false; // -> false

// 논리 부정(!) 연산자
!true;  // -> false
!false; // -> true
!!1;    // -> true
!1;     // -> false (1은 truthy 한 값이다.)
```

> 여기서 OR 연산자인 ||의 연산방식은 선두 값이 false 이면 해당 값을 반환하고 true면 뒷 값을 반환한다.
>
> And 연산자인 &&는 반대로 선두값이 false이면 뒷 값을 반환하고 true이면 해당 값을 반환한다. 이를 단축평가라 하는데 CH_9 단축평가에서 다루도록 한다.

논리부정(!) 연산자는 불리언 값을 반환한다. 단, 피연산자가 반드시 불리언 값일 필요는 없으며, 만약 불리언 값이 아니라면 불리언 타입으로 **암묵적 타입 변환**이 발생한다.

또한, 논리부정을 두번사용 (!!) 하게 되면 본래 해당 값이 가진 불리언 값으로 변환된다.

```javascript
var x = 1;

console.log(x)    // 1
console.log(!x)   // false
console.log(!!x)  // true   (1이라는 값은 truthy 한 값이다.)
```

<br>

###### 드 모르간 법칙?

논리학과 수학의 법칙 중 하나로 논리곱(합)의 부정은 각각 부정의 논리합(곱)과 같다는 법칙으로 논리부정을 하기와 같이 나타낼 수도 있다.

```javascript
!(x || y) === (!x && !y)
!(x && y) === (!x || !y)
```

<br>

## 쉼표연산자

쉼표`,`연산자는 왼쪽 피연산자부터 차례대로 피연산자를 평가하고 마지막 피연산자의 평가가 끝나면 **마지막 피연산자의 평가결과를 반환한다.**

```javascript
var x, y, z;
x =1, y =2, z =3; // 3
x,y,z             // 3
```

<br>

## 그룹연산자

그룹연산자`()` 는 자신의 피연산자인 표현식을 가장 먼저 평가한다. 즉 괄호안의 표현식의 평가 우선순위가 높아 먼저 평가한다.

```javascript
10 * 2 + 3; // -> 23       -> 10*2 연산 후 + 3

10 * (2 + 3); // -> 50     -> 2+3 연산 후 *10
```

<br>

## typeof 연산자

typeof 연산자는 **데이터 타입**을 **문자열로 반환**하며 하기 7가지 타입을 문자열로 반환한다.

- string
- number
- boolean
- undefined
- symbol
- object
- function?

null 또한 데이터 타입 중하나이나 typeof 연산자는 null을 반환하지는 않는 것과 함수의 경우 function을 반환하는 것이 특징이다.

```javascript
typeof ''              // -> "string"
typeof 1               // -> "number"
typeof NaN             // -> "number"
typeof true            // -> "boolean"
typeof undefined       // -> "undefined"
typeof Symbol()        // -> "symbol"
typeof null            // -> "object" null 값이 아닌 object를 반환한다. 주의!
typeof []              // -> "object"
typeof {}              // -> "object"
typeof new Date()      // -> "object"
typeof /test/gi        // -> "object"
typeof function () {}  // -> "function" 함수타입!!
```

null 타입을 반환하지 않는 것은 첫번째 버전의 '버그'이다. 그렇기 때문에 null 타입을 확인할 경우에는 typeof 연산자 대신 일치연산자를 사용하도록 한다.

```javascript
var foo = null;

typeof foo === null; // -> false
foo === null;        // -> true
```

> Q) 선언하지 않은 식별자에 typeof 연산자를 사용하면 reference error 가 발생하지 않고 undefined가 반환되는 이유는? 이부분은 추후 자료를 찾아보고 추가하도록 해야겠다. 사실 이유는 잘 모르겠다.

```javascript
// 식별자 undeclared는 선언한 적이 없다.
typeof undeclared; // -> undefined
```

<br>

## 지수연산자

ES7에서 새롭게 도입된 지수연산자는 `**` 를 사용하여 나타내며 우항의 피연산자를 좌항의 피연사자의 지수로 사용하여 숫자타입의 값을 반환한다.

```JAVASCRIPT
2 ** 2;   // -> 4
2 ** 2.5; // -> 5.65685424949238
2 ** 0;   // -> 1
2 ** -2;  // -> 0.25
```

지수 연산자 도입 이전에는 Math.pow 메소드를 사용하여 값을 계산하였다.

```javascript
Math.pow(2, 2);   // -> 4
Math.pow(2, 2.5); // -> 5.65685424949238
Math.pow(2, 0);   // -> 1
Math.pow(2, -2);  // -> 0.25
```

지수연산자와 Math.pow 메소드 둘다 같은 역할을 하나 피연산자의 개수가 많아질 수록 지수연산자를 사용한것이 가독성 측면에서 좋다.

```javascript
2 ** 2 ** 2 ** 2; 
Math.pow(Math.pow(Math.pow(2, 2), 2), 2);
```

음수를 밑값으로 사용하고 싶으면 괄호`()` 를사용해야 한다.

```javascript
(-5) ** 2;
```

지수연산자는 모든 이항연산자보다 우선순위가 높다.

```javascript
2 * 5 ** 2;    // 5**2 연산 후 *2 실행.
```

<br>

## 부수효과

부수효과란 초기 변수에 할당된 값이 특정 연산자에 의해 연산이 이루어 졌을 때 변화의 유무에 따라 결정되는데, 자바스크립트에서 부수효과가 있는 연산자는 다음과 같다.

1. 단항 산술 연산자 (++ / --)
2. 할당 연산자 (=)
3. delete 연산자 (이 장에서는 다루지 않았다. 하지만 객체에서 property를 삭제하는 부수효과를 가지고 있다. 이 내용은 10장에서 다루도록 하겠다.)
