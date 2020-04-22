##### expression(표현식)

- 값을 만들어내는 간단한 코드.
- 표현식은 값을 만들어내기 때문에 함수의 인자르 사용할 수 있다.



##### statement(구문)

- 하나 혹은 여러개의 표현식이 모여 문장을 이루는 것.

- 보통 문장의 끝에는 세미콜론을 붙이는 것이 관례이나 붙이지 않아도 문법적 오류는 아니다.
- 단, 한 줄에 여러문장을 적을 경우에는 세미콜론으로 각 문장을 구분 해 주어야 한다.
- 조건문(if) / 반복문(for)과 같은 문에서는 마지막 } 뒤에 세미콜론을 붙이지 않는다.



> expression들이 모여서 statement가 되고 여러개의 statment가 모여서 프로그램이 된다.



##### keyword

- 자바스크립트에서 특정한 목적(?)을 위해 사용하는 단어.

- keyword 들은 예약어로 지정되어 있다.

```  
let a = 1;     (가능)   // let는 변수선언시 사용하는 keyword이며 reserved word이다.
let let = 2;   (불가능)  // 때문에 let과 같은 reserved word는 함수,변수의 이름으로 사용할 수 없다.
function let() (불가능)   // function 역시 함수선언 시 사용 keyword 이며 이름으로 사용 불가하다.
```



##### identifier(식별자)

- 코드내의 변수,함수 혹은 속성을 식별하는 문자열로 변수,함수,객체등의 `name`이라고 생각하면 된다.

```
let a = 1;        // a 는 identifier
function hello()  // hello는 identifier
const person = {}  // person 은 identifier
```

- 대소문자를 구분한다.

```
let myName = 1;   // myName과 myname은 다른 identifier로 인식한다.
ley myname = 2;
```

- 유니코드문자 , $ , _  , 숫자(0~9) 를 사용할 수 있지만, 숫자로 시작할 수는 없다.
- reserved word(keyword) 를 identifier로 사용할 수 없고 공백문자 또한 사용이 불가하다.

```
let name1 = 1;   // 가능
let $name = 2;   // 가능
let _name = 3;   // 가능
let 1name = 4;   // 불가능
let 한글 = 5;     // 가능
```

<a href="https://mothereff.in/js-variables">identifier validator</a> (identifier 참고사이트)



> identifier는 의미없는 이름을 사용하지 않고 역할에 맞는 적절한 네이밍을 할 수 있도록 하자.



##### comments(주석)

- 소스코드에서 프로그램에 영향을 전혀 주지 않고 무시되는 부분.
- 이해를 돕는 목적으로 사용한다.
- `// 내용 ` 혹은 `/* 내용 */` 으로 표현하다.

```
// 이것은 저의 이름을 명명하는 변수입니다.  -> comment

let name = 'wooseong'
```

<img src="C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200419132954935.png"/>	



##### variable(변수) & constant(상수)

<img src="C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200419134351124.png"/>	



##### scope (변수, 상수의 유효범위)

###### let, const의 scope = 블록 `{}` scope

- 블록 `{}` 내에서 선언된 변수는 해당 블록영역에서만 사용이 가능하며 바깥영역에서는 사용이 불가능하다.
- 반복문, 조건문과 같은 statement는 블록을 사용하여 조건 혹은 반복을 시행하므로 해당 statement 내에서 쓰인 변수는 바깥영역에서 사용이 불가능하다. 

- global 영역인 바깥영역에서 사용된 변수는 블록 내에서 사용이 가능하다.



###### var의 scope = 함수 `function() {}`  scope

var란? : ES5까지 변수선언 시 사용하였던 keyword로 ES6로 오면서 let과 const를 주로 사용하게 되었다.

- let, const와 다르게 블록의 영향을 받지 않고 오직 함수 범위에서만 영향을 받는다.

(블록 내에서 선언된 var는 바깥영역에서도 사용이 가능/ 함수 내에서 선언된 var는 바깥영역에서 사용 불가능.)

- global 영역에서 선언된 변수는 함수 및 블록 내에서 동일하게 사용이 가능하다.



##### var와 hoisting

hoisting이란?

: 앞서 선언되지 않은 변수가 마치 이미 선언되어있는 것처럼 출력이 되는 상태.

  변수에 할당 된 값은 초기화가 되어야 출력이 되며 오직 선언된 상태만 인식한다.

- var hoisting 발생

<img src="C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200419142436494.png"/>	



- let / const : hoisting 억제

<img src="C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200419142304399.png"/>	

<img src="C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200419142552754.png"/>	



> var만 hoisting 문제가 발생하는 이유?
>
> 변수는 `선언 단계` > `초기화 단계` > `할당 단계` 에 걸쳐 생성되는데 `var` 로 선언된 변수는 선언 단계와 초기화 단계가 한번에 이루어진다. 하지만, `let` 로 선언된 변수는 선언 단계와 초기화 단계가 분리되어 진행된다.
>
> 그렇기 떄문에 `var`로 변수 선언 시 호이스팅 문제가 발생하게 된다.

**이라는데.. 사실 잘 이해가 가지않아 추후 더 학습해야 할 것으로 보인다.**



#### javascript data type

- 동적타이핑

: 선언된 변수에 할당된 값에 따라 해당 변수의 type이 결정된다.



1. primitive values (기본타입)

   - Boolean           : true / false

   - Null                   : 값이 없는 상태.

   - Undefined       : 선언 후 값이 할당되지 않은상태.

   - Number           : 숫자열, NaN

   - String                : 문자열

   - Symbol             : 고유한 값을 의미하며 sybol() 괄호안의 값이 같다고 하여도 서로다른 고유한 값이 된다.

     ​                             또한 symbol은 `new`를 이용하여 생성자 함수로 사용할 수 없다.

     ```
     const c = symbol('mark');
     const d = symbol('mark');
     
     console.log(c === d)               -> false
     ```

     

2. objects (객체타입)

: 실행환경에서 기본적으로 제공해주는 표준 내장객체를 말함.



