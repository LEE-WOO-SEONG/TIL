# 디스트럭처링 할당

- Toc

1. [배열 디스트럭처링 할당](#배열-디스트럭처링-할당)
2. [객체 디스트럭처링 할당](#객체-디스트럭처링-할당)

<br>

<br>
디스트럭처링 할당(구조분해 할당, Destructuring assignment)은 구조화된 배열 또는객체를 Destructuring(비구조화, 구조파괴)하여 1개 이상의 **변수**에 <strong>개별적으로 할당</strong>하는 것을 말한다. <strong>객체 리터럴에서 필요한 값만을 추출하여 변수에 할당할 때 유용하다.</strong>

## 배열 디스트럭처링 할당

```JS
// ES5
var arr = [1, 2, 3];

var one   = arr[0];
var two   = arr[1];
var three = arr[2];
console.log(one, two, three); // 1 2 3

// ES6
const arr = [1, 2, 3];

const [one, two, three] = arr;

console.log(one, two, three); // 1 2 3
```

ES5에서 구조화된 배열을 디스트럭처링하여 1개 이상의 변수에 할당하기 위해서는 배열의 인덱스에 접근해서 하나하나 일일히 변수에 할당하는 것이였다.

ES6의 배열 디스트럭처링 할당은 배열의 각 요소를 배열로부터 추출하여 <strong>1개 이상의 변수에 할당</strong>한다. 이 때 할당 기준은 배열의 인덱스이다. 즉, 순서대로 할당된다.

배열 디스트럭처링 할당을 위해서는 할당 연산자 **왼쪽**에 값을 할당 받을 **변수**를 선언해야 한다. 이 때 <strong>여러개의 변수</strong>를 <strong>배열 리터럴 형태</strong>로 선언한다.

```js
let x, y;
[x, y] = [1, 2];

// 위 코드와 아래 코드는 같은 역할을 함.
const [x, y] = [1, 2];
```

여러 개의 변수를 배열 형태로 선언하면 반드시 우변에 배열을 할당해야 한다.

```js
const [x, y];
// -> SyntaxError: Missing initializer in destructuring declaration
```

배열 디스트럭처링 할당의 기준은 배열의 인덱스이다. 즉, **순서대로** 할당된다. 이때 <strong>변수의 개수와 배열 요소의 개수가 반드시 일치할 필요는 없다.</strong>

```js
let x, y, z;

[x, y] = [1, 2];
console.log(x, y); // 1 2

[x, y] = [1];
console.log(x, y); // 1 undefined

[x, y] = [1, 2, 3];
console.log(x, y); // 1 2

[x, , z] = [1, 2, 3];
console.log(x, z); // 1 3
```

배열 디스트럭처링 할당을 위한 변수에 기본값을 설정할 수 있다. 단, 기본값보다 할당된 값이 우선된다.

```js
let x, y, z;

// 기본값
[x, y, z = 3] = [1, 2];
console.log(x, y, z); // 1 2 3

// 기본값보다 할당된 값이 우선된다.
[x, y = 10, z = 3] = [1, 2];
console.log(x, y, z); // 1 2 3
```

배열 디스트럭처링 할당은 배열에서 필요한 요소만 추출하여 변수에 할당하고 싶을 때 유용하다. 아래 예제는 Date 객체에서 년도/월/일을 추출하는 예제이다.

```js
const today = new Date();
console.log(today); // Sun Mar 22 2020 22:00:55 GMT+0900 (대한민국 표준시)

const formattedDate = today.toISOString().substring(0, 10);
console.log(formattedDate); // "2020-03-22"

// 문자열을 분리하여 배열로 변환한 후, 배열 디스트럭처링 할당을 통해 필요한 요소를 취득한다.
const [year, month, day] = formattedDate.split('-');
console.log([year, month, day]); // ["2020", "03", "22"]
```

배열 디스트럭처링 할당을 위한 변수에 Rest 파라미터와 유사하게 Rest 요소 `...` 를 사용할 수 있다. Rest 요소는 Rest 파라미터와 마찬가지로 반드시 마지막에 위치해야 한다.

```js
const [x, ...y] = [1, 2, 3];
console.log(x, y); // 1 [ 2, 3 ]
```

<br>

## 객체 디스트럭처링 할당

```JS
// ES5
var user = { firstName: 'Wooseong', lastName: 'Lee' };

var firstName = user.firstName;
var lastName  = user.lastName;

console.log(firstName, lastName); // Wooseong Lee

// ES6
const user = { firstName: 'Wooseong', lastName: 'Lee' };

const { lastName, firstName } = user;

console.log(firstName, lastName); // Wooseong Lee
```

ES5에서 객체의 각 프로퍼티를 객체로부터 디스트럭처링하여 변수에 할당하기 위해서는 프로퍼티 키를 사용해야 했다.

ES6의 객체 디스트럭처링 할당은 객체의 각 프로퍼티를 객체로부터 추출하여 1개 이상의 변수에 할당한다. 배열 디스트럭처링 할당과 마찬가지로 객체 디스트럭처링 할당을 위해서는 할당연산자 왼쪽에 값에 할당받을 변수를 선언해야 한다.

이를 위해 여러 개의 변수를 객체 리터럴 형태로 선언한다. 이 때 할당 기준은 프로퍼티 키이다. 즉, <strong>순서는 의미가 없으며 변수 이름과 프로퍼티 키가 일치하면 할당된다.</strong>

위 예제에서 객체 리터럴 형태로 선언한 변수는 firstName / lastName이다. 이는 <strong>프로퍼티 축약표현</strong>을 통해 선언한 것이다.

```js
const { lastName, firstName } = user;
// 위 코드와 아래 코드는 같은 역할을 한다.
const { lastName: lastName, firstName: firstName } = user;
```

만약 객체의 프로퍼티 키와 다른 변수이름으로 프로퍼티 값을 할당 받으려면 아래와 같이 변수를 선언해야 한다.

```js
const user = { firstName: 'Wooseong', lastName: 'Lee' };

// ES6 객체 디스트럭처링 할당
// 프로퍼티 키를 기준으로 디스트럭처링 할당이 이루어진다.
// 프로퍼티 키가 lastName인 프로퍼티 값을 ln에 할당한다.
// 프로퍼티 키가 firstName인 프로퍼티 값을 fn에 할당한다.
const { lastName: ln, firstName: fn } = user;

console.log(fn, ln); // Wooseong Lee
```

객체 디스트럭처링 할당을 위한 변수에 기본값을 설정할 수 있다.

```js
const { firstName = 'Wooseong', lastName } = { lastName: 'Lee' };
console.log(firstName, lastName); // Wooseong Lee

const { firstName: fn = 'Wooseong', lastName: ln } = { lastName: 'Lee' };
console.log(fn, ln); // Wooseong Lee
```

객체 디스트럭처링 할당은 프로퍼티 키로 객체에서 필요한 프로퍼티 값만을 추출할 수 있다.

```js
const todo = { id: 1, content: 'HTML', completed: true };

// todo 객체로부터 id 프로퍼티만을 추출한다.
const { id } = todo;
console.log(id); // 1
```

객체 디스트럭처링 할당은 객체를 인수로 전달받는 함수의 매개변수에도 사용할 수 있다.

```js
function printTodo(todo) {
  console.log(`할일 ${todo.content}은 ${todo.completed ? '완료' : '비완료'} 상태입니다.`);
}

printTodo({ id: 1, content: 'HTML', completed: true });
// 할일 HTML은 완료 상태입니다.


// 객체 디스트럭처링 할당
function printTodo({ content, completed }) {
  console.log(`할일 ${content}은 ${completed ? '완료' : '비완료'} 상태입니다.`);
}

printTodo({ id: 1, content: 'HTML', completed: true });
// 할일 HTML은 완료 상태입니다.
```

배열의 요소가 객체인 경우, 배열 디스트럭처링 할당과 객체 디스트럭처링 할당을 혼용할 수 있다.

```js
const todos = [
  { id: 1, content: 'HTML', completed: true },
  { id: 2, content: 'CSS', completed: false },
  { id: 3, content: 'JS', completed: false }
];

// todos 배열의 두번째 요소인 객체로부터 id 프로퍼티만을 추출한다.
const [, { id }] = todos;
console.log(id); // 2
```

중첩 객체의 경우는 아래와 같이 사용한다.

```js
const user = {
  name: 'Lee',
  address: {
    zipCode: '03068',
    city: 'Seoul'
  }
};

const { address: { city } } = user;
console.log(city); // 'Seoul'
```

객체 디스ㅡ럭처링 할당을 위한 변수에 Rest 파라미터와 유사하게 Rest 프로퍼티 `...` 를 사용할 수 있다. Rest 프로퍼티는 Rest 파라미터와 마찬가지로 반드시 마지막에 위치해야 한다.

```js
const { x, ...rest } = { x: 1, y: 2, z: 3 };
console.log(x, rest); // 1 { y: 2, z: 3 }
```

