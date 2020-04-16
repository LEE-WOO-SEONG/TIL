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

