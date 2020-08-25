# 타입

### 타입설정

초기값 설정 시 `: type` 과 같은 type annotation을 통해 미리 타입을 지정할 수 있으며, 하위 타입을 제외한 다른 타입으로 재할당이 불가능하다.

> 하위타입?
>
> 타입스크립트에서 자바스크립트의 타입은 상위, 하위 타입으로 나뉘는데 하위타입은 타입이 다르더라도 상위타입에 재할당이 가능하다.
>
> 또한 any 타입은 모든 타입의 최상위 타입으로 어떠한 타입도 재할당이 가능하다.
>
> undefined와 null은 하위 타입으로 다른 상위타입들에게 재할당이 가능하며 서로의 타입끼리도 재할당이 가능하다.
>
> - 최상위타입
>
>   any
>
> - 상위타입
>
>   number / string / boolean
>
> - 하위타입
>
>   undefined / null

```ts
// 자바스크립트의 7가지 타입
let numValue: number;
let stringValue: string;
let booleanValue: boolean;
let undefinedValue: undefined;
let nullValue: null;
let objValue: object;
let symbolValue: symbol;

// 리터럴타입
let age: 36;
let name: 'lee';
let isMale: true;
let array: ['apple', 'banana', 'watermelon'];

numValue = 3;
numValue = undefined;
numValue = null;
stringValue = '3';
stringValue = `3 {1 + 1}`
booleaValue = true;
undefinedValue = null;
undefinedValue = undefined;
nullValue = undefined;
nullValue = null;

objValue = {};
objValue = new String('3');

symbolValue = Symbol();

// 배열 타입 설정
let nameList: string[];  // 배열의 요소로 문자열만 가능.
nameList = ['1', '3'];
nameList.push('5');

let array: Array<string>; // 배열의 요소로 문자열만 가능.


// 튜플 타입
let tuple2: [number, string];
tuple2 = [1, 'lee'];    // length 2

let tuple3: [boolean, bolean, number];
tuple3 = [true, false, 3];  // length 3

// 객체 타입 설정
let user1: { name: string, score: number }; // 정의된 프로퍼티만 가지는 객체만이 재할당이 가능함.

user1 = {
  name: 'lee',
  score: 10
};
```

> type guard?
>
> 런타임에 사용하는 연산자인 typeof / instanceof / in / literal type / custom type guard를 이용하면 컴파일 타임에 인식을 한다.
>
> type guard를 사용하면 조건문 블록 스코프 내에서 타입을 좁힐 수 있다.
>
> ```ts
> interface User {
>   name: string;
> }
> interface Action {
>   do(): boolean;
> }
> 
> // custom type guard
> /* v is Action : type predicate 로 만약 isAction 함수의 return 값이 true 라면 매개변수 v의 type은 Action으로 간주하게 됨.
> 단, isAction 함수를 사용한 if문의 코드블럭 내에서만 해당 타입이 유효하며 매process 함수의 매개변수 v의 타입이 User 혹은 Action 이기 때문에 else문에서는 Action이 아닌 User 타입으로 자동으로 인식된다.*/
> function isAction(v: User | Action): v is Action {
>   return (v as Action).do !== undefined
> }
> 
> function process(v: User | Action) {
>   if (isAction(v)) {
>     v.do();
>   } else {
>     v.name
>   }
> }
> ```

- interface 타입 정의

  : interface 끼리는 `extends` 키워드를 통한 상속이 가능.

  : interface의 type을 class에 줄때에는 `implements` 키워드를 사용.

```ts
interface SignUp {
    email: string;
    id: string;
    password: string;
}

function ajaxSignup(data: SignUp) {
    
}

ajaxSignup({
    email: 'akak@google.com',
    id: 'akak',
    password: 'lee'
})
```

- Type Alias

  : interface와 비슷해 보임.

  : `type [name] = '특정type'` 으로 사용함.

  > interface와 type alias의 차이점
  >
  > - interface : 새로운 타입을 정의하는 방식.
  > - type alias : 기존에 존재하는 타입들을 이용하여 새로운 별명을 네이밍 하는 것.
  >
  > 1. interface에 type alias를 extends 할 수 있다.
  > 2. interface 끼리는 extends가 가능하나, type alias 끼리는 extends 불가.
  > 3. type alias는 union type의 사용이 가능하나 interface는 union type 사용 불가.
  > 4. interface와 동일하게 class에 implements로 type alias를 사용할 수 있다.
  > 5. interface와 동일하게 class에 extends type alias 불가.
  > 6. interface는 중복을 허용하나 type alias는 중복을 허용하지 않고 재할당의 개념이 됨.

  ```ts
  // primitive type
  type MyStringType = string;
  let str: myStringType;
  str = 'hello';
  
  // union type
  type StringOrNumber = string | number;
  let another: StringOrNumber;
  another = 0;
  another = 'lee';
  
  // Tuple type
  type PersonTuple = [string, number];
  let person: PersonTuple = ['lee', 29];
  ```

- indexable type

  : 인덱스를 설정해서 어떤 값을 넣어줄 수 있는 스타일??

  : 인덱스의 타입은 string, number 2가지만 가능함.

  : indexable type을 interface에 정의 해 주지 않으면 해당 interface에 초기에 정의된 프로퍼티 외에 프로퍼티는 가질 수 없음.

```ts
interface Person {
    name: string;
    age: number;
    [index: string]: any;
}

const person1: Person = {
    name: 'lee',
    age: 29,
    gender: 'male'
}
```

- 함수 타입정의

```ts
// 함수 선언문
function add(x: number, y: number): number {
    return x + y;
}

const result = add(1, 2);

// 화살표함수
const add2 = (x: number, y: number): number =>  x + y ;

// 함수 시그니쳐: 함수 이름, 인수 타입, 반환타입 만 정의하는 것.
// 함수 시그니쳐 오버로딩 : 동일한 함수의 함수 시그니쳐를 여러개 사용하는 것.
interface Storage {
  a: string;
}
interface ColdStorage {
  b: string;
}

function store(type: "통조림"): Storage;
function store(type: "아이스크림"): ColdStorage;

// 유니온 표현법 ( | )
function store(type: "통조림" | "아이스크림") {
  if (type === "통조림") {
    return { a: "통조림" };
  } else if (type === "아이스크림") {
    return { b: "아이스크림" };
  } else {
    throw new Error('unsupported type');
  }
}
```

- enum (열거형)

  - 상수들의 집합을 정의할 때 사용한다.

  - enum은 그자체로 객체이며, 객체내의 프로퍼티 들은 숫자 혹은 문자열 타입만 가질 수 있다.

  - 기본값(초기화)을 넣어주지 않으면 아래와 같은 객체를 생성한다.

  > {
  >
  > '0': 프로퍼티1,
  >
  > '1': 프로퍼티2,
  >
  > 프로퍼티1 = 0,
  >
  > 프로퍼티2= 1
  >
  > }

  - enum 객체 내의 상수값을 초기화하지 않았을 경우

    : 첫번쨰 상수의 값은 '0' 부터 시작하여 다음 상수값들은 +1의 형태로 증가함.

  - enum 객체 내의 상수값을 숫자로 초기화 하였을 경우

    : 모든 상수를 숫자값으로 초기화 시켰을 경우 해당 숫자를 값으로 가지며 만약 일부만 초기화 하였을 경우 이전 상수의 값에 + 1의 형태로 값을 할당함.

  - enum 객체 내의 상수값을 문자로 초기화 하였을 경우

    : 모든 상수를 문자값으로 초기화 시켜야 한다.
    
  - `const enum {}` 의 형태로 enum 앞에 변수 선언 키워드를 사용하게 되면 enum 자체는 참조할 수 없고 enum 객체의 프로퍼티 만 참조할 수가 있다.

```ts
// 기본값 미 설정
enum StarbucksGrade {
    WELCOME,
    GREEN,
    GOLD
}

console.log(StarbucksGrade);
/*
{
  '0': 'WELCOME',
  '1': 'GREEN',
  '2': 'GOLD',
  WELCOME: 0,
  GREEN: 1,
  GOLD: 2
}
*/

// 기본값 숫자 설정

enum StarbucksGrade {
    WELCOME = 10,
    GREEN,
    GOLD
}

console.log(StarbucksGrade);

/*
{
  '10': 'WELCOME',
  '11': 'GREEN',
  '12': 'GOLD',
  WELCOME: 10,
  GREEN: 11,
  GOLD: 12
}
*/

// 기본값 문자설정
enum StarbucksGrade {
    WELCOME = 'lee',
    GREEN = 'woo',
    GOLD = 'seong',
}

console.log(StarbucksGrade);
// { WELCOME: 'lee', GREEN: 'woo', GOLD: 'seong' }
```
