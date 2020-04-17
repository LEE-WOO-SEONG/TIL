### js 문법



#### 삼항연산자

```
condition ? true : false
(특정조건) ? (true일 때 나타날 값) : (false일 때 나타날 값)
```

```
const array = [];

// if 문

let text = '';

if(array.length === 0) {
  text = '배열이 비어있습니다.'
}
else {
  text = '배열이 비어있지 않습니다.'
}
console.log(text);

// 삼항연산자

let value = array.length === 0
  ? '배열이 비어있습니다.'
  : '배열이 비어있지 않습니다.'

  console.log(value);
```



#### Truthy and Falsy

- Falsy한 값 (false와 비슷한 느낌.)

1. undefined
2. null
3. 0
4. NaN
5. ' ' (비어있는 값)
6. false

```
console.log(!undefined);            => true
console.log(!null);
console.log(!0);
console.log(!'');
console.log(!NaN);
console.log(!false);
```



- truthy한 값

: 상기 언급한 falsy한 값들을 제외하고는 대부분 truthy 한 값이다. 



- 특정 값을 true or false로 출력하는 방법

```

const value = '';                 -> falsy 한 값

//if 문

if(value) {                        -> // value가 truthy 한 값이면,,
  console.log('값이 있습니다.')
}
else {
  console.log('값이 없습니다.')
}

// 삼항연산자
 
const a = !value ? true : false;   -> true
const a = !!value ? true : false;  -> false
```



#### 단축평가 논리 계산법

: 논리연산자를 이용한 계산법.

1. && 연산자를 이용. (AND)

- 법칙

```
// 연산의 시작점이
// truthy한 값이면 뒷값을 출력

true && true => true
true && false => false

// falsy한 값이면 해당 false값을 출력

false && false => false
false && true => false

```

2. || 연산자를 이용.(OR)

- 법칙

```
// 연산의 시작점이
// truthy한 값이면 해당 true값을 출력

true || true => true
true || false => true

// falsy한 값이면 뒷 값을 출력

false && false => false
false && true => true

```



#### 함수의 기본 파라미터

: 함수 호출 시, 파라미터가 없었을 때 **기본값**으로 사용할 것을 지정하기위해 사용.

```
// 일반사용법

function print(r = 1)   
  return r * r;
}

const a = print();

console.log(a);          -> 1



// or 문 사용

function print(r) {
  return r * r || 4;
}

const a = print();

console.log(a);           -> 16

// 화살표 함수 사용


const print = (r = 2) => r * r;

const a = print();

console.log(a);            ->4
```



#### 비구조화 할당

- 객체 기본값 정의

: 함수 기본 파라미터와 마찬가지로 객체에서도 파라미터가 없을 때 출력될 기본값을 동일한 방법으로 정의할 수 있다.

```
const object = {
  a: 1,
 
};

const {a,b = 5} = object

console.log(a);                -> 1 
console.log(b);                -> 5
```

- 객체 key 명 바꾸기

: 비구조화할당 방식으로 객체의 key 명을 바꿀 수 있다.

  비구조화 할당으로 바꾼 key명은 정상적으로 동작하나 기존의 객체의 key명은 바뀌지 않고 그대로 유지된다.

```
onst animal = {
  name: '강아지',
  sound: '멍멍'
};

const {name: nickname} = animal;
const {sound: noise} = animal;

console.log(nickname);               -> 강아지
console.log(noise);                  -> 멍멍
```



- 배열 비구조화 할당 및 기본값 정의

```
const array = [1,2,3];

const [one, name, three=5] = array;

console.log(one);                -> 1
console.log(name);               -> 2
console.log(three);              -> 3
```



#### spread

: 기존의 객체 혹은 배열을 복사해올 때 사용하며  `...` 를 이용하여 나타낸다.

- 객체에서 spread 사용

```
const dog = {
  name: '멍멍이'
};

const bigDog = {
  ... dog,
  type: '불독',
  size: '보통'
}

const veryBigDog = {
  size: '매우큼',
  ...bigDog
}

```

- spread 선언순서

```
// 선언 순서보다 앞쪽에 동일한 내용이 있을 시 덮어씌워짐
const veryBigDog = {
  size: '매우큼',
  ...bigDog
}
// 먼저 선언 후 동일한 내용이 뒤에 선언되면 선언된 내용이 최종값이 됨.
const veryBigDog = {
   ...bigDog,
  size: '매우큼'
}
```

- 배열에서 spread 사용

```
const array = [1,2,3,4,5];

const array2 = [...array, '비둘기'];

console.log(array2);        -> [1,2,3,4,5,비둘기]
```



#### rest

:  정해지지 않은 나머지 인수를 가져올 때? 사용한다.

- 사용법

: 배열 혹은 객체에서 마지막에 `...`을 이용하여 선언된다. 보통 `...rest` 로 많이 쓰이나 다른 단어를 써도 동일하게 구현된다.

```
// 배열
const array = [1,2,3,4,5];

const [one,two, ...rest] = array;

console.log(one);             -> 1
console.log(two);             -> 2
console.log(rest);             -> [3,4,5]

// 객체
const dog = {
  name: '멍멍이',
  age: 2,
  type: '불독'
};

const animal = {
  ...dog,
  sound: '짹쨱'
}

const {name, ...rest} = animal;

console.log(name);                  -> '멍멍이'
console.log(rest);                  -> {age: 2, type: '불독', sound: '쨱짹'}

console.log(animal);
```



##### 함수에서의 spread, rest 사용

```
function sum(...rest) {
return rest.reduce((acc,current) => acc+current,0);
}

console.log(sum(1,2,3,4,5));
```

-> `sum(1,2,3,4,5)`의 값을 `...rest`를 통해서 배열의 형태로 가져오게 되어 reduce함수로 연산 구현.



#### scope

: 선언한 변수 혹은 함수가 어디까지 유효한가에 대한 범위를 의미한다.

- global scope

- function scope
- block scope

```
const value = 'hello!';                       -> global scope.

function myFunction() {
  const value = 'bye!';                       -> function scope.
  if (true) {
    const value = 'world';                    -> block scope.
    console.log('block scope: ');
    console.log(value);
  }
  console.log('function scope: ');
  console.log(value);
}

myFunction();
console.log('global scope: ');
console.log(value);
```

: scope는 상기와 같이 선언한 함수 혹은 블록 내에서의 범위를 지닌다.

  여기서 주의할 점은 변수 선언 시 `let` 대신 `var`을 쓰게되면 상기 스코프 영역이 먹지 않을 수 있으니 주의한다. 



#### hoisting

: 아직 선언되지 않은 함수 또는 변수 출력시 error가 발생되어져야 하나, 마치 선언 후 출력한 것과 같은 결과값이 나타나는 것.

  `const`, `let`은 `var`와 변수 생성과정이 달라 .