### 배열

: 배열안의 모든 요소들이 똑같은 형태일 필요는 없다.

예를들면, 첫번째- 숫자 / 두번째 - 문자 / 세번째 - 객체.. 와 같아도 상관이 없다.

배열을 선언할 때에는 대괄호[] 를 사용하며 배열안의 요소들 끼리 구분을 위해 각 요소들 사이에는 쉼표(,) 를사용한다.

```
const array = [1,2,3,4];
```

- 배열의 n번째 요소 확인하는 법

: 배열중 가장 첫번째 요소는 1번쨰가 아니라 0번쨰이다.

```
console.log(array[n])

console.log(array[0])      -> 1
console.log(array[1])      -> 2
console.log(array[2])      -> 3
console.log(array[3])      -> 4
```

- 배열에 새로운 항목을 추가하는 방법

: push라는 함수를 사용한다.

```
console.log(array.push('값'));
```

- 배열 내부의 요소 갯수를 알아내는 방법

: length를 사용한다.

```
console.log(array.length);
```



- 배열 내장함수

1. foreach

   : 배열 안에 있는 모든 원소들을 모두 출력해야 할 때 사용한다.

     for 반복문을 통해서도 구현은 가능하나 내장함수를 통하면 훨씬 간단하다.

```
superheroes.forEach( n => {
  console.log(n);
});
```

2. map

   : 배열안의 원소를 변환할 때 사용되며, 이 과정에서 새로운 배열이 만들어진다.

```
 const array = [1, 2, 3, 4, 5, 6, 7, 8];

const square = n => n * n;
const squared = array.map(square);
console.log(squared);
|
|
const squared = array.map(n => n*n);
console.log(squared);
```



> 객체배열에서 원하는 parameter만 뽑아서 배열형태로 만드는 법

```
const items = [
  {
    id: 1,
    age: "2살"
  },
  {
    id: 2,
    age: "3살"
  }
];

const ages = items.map( n => n.ages);

console.log(ages);
```



3. indexOf

: 배열에서 원하는 항목이 몇번째 원소인지 확인할 때 사용.

  배열의 원소가 숫자 / 문자 / boolea일 경우에 주로 사용하며 만약 일치하는 결과값이 없을경우 "-1" 을 반환한다.

```
const heroes = ['토르', '캡틴아메리카', '헐크', '닥터스트레인지'];

const a = heroes.indexOf('토르');

console.log(a);                                  -> 0 반환

const b = heroes.indexOf('닥터스트레인지');

console.log(b);                                  -> 3 반환
```

4. findIndex

: 배열의 원소가 <u>객체</u>이거나 <u>특정조건</u>으로 원하는 항목이 몇번째 원소인지 찾는 경우에 사용한다.

```
const dogs = [
  {
    name: '멍멍이',
    age: 2,
    type: '치와와'
  },
  {
    name: '야옹이',
    age: 2,
    type: '고양이'
  },
  {
    name: '뭉뭉이',
    age: 4,
    type: '불독'
  },
  {
    name: '뿡뿡이',
    age: 10,
    type: '포메라니안'
  }
];


const type = dogs.findIndex(n => n.type==='포메라니안');

console.log(type);                                        -> 3반환
```

5. find

: findIndex와 동일하게 사용되나, find 함수는 해당원소 순번이 아닌 <u>"값"</u> 을 반환 해 준다.

```
const type = dogs.find(n => n.type==='포메라니안');

console.log(type);          -> Object{name: '뿡뿡이', age: 10, type: '포메라니안'} 반환.
```



6. filter

: 특정 조건(함수)을 만족하는 원소들을 찾아서 해당 원소들로 <u>새로운 배열을 만들 때</u> 사용한다.

  filter.length로 원소의 갯수 또한 구할 수 있다.

```
const type = dogs.filter(n => n.age === 2);

console.log(type);          -> [Object, Object]
							   0: Object{name: '멍멍이', age: 2, type: '치와와'}
						       1: Object{name: '야옹이', age: 2, type: '고양이'} 반환.
```



7. splice

: 배열에서 특정항목을 "제거"할 때 사용한다.

- 사용법

```
E.splice(n,m)   => n: 순번(indexOf를 통해 함수형태로 나타낼 수도 있음.) / m: 해당순번으로부터 몇개의 값을 지울것인가.
```

```
const index = dogs.splice(1,2);                  -> 1번째 배열부터 2개의 값을 지우겠다.

console.log(index);                              -> 지운 2개의 값을 새로운 배열의 형태로 반환.
console.log(dogs);                               -> 남은 값들을 새로운 배열의 형태로 반환.
```



8. slice

: 배열에서 특정항목을 "가져올 때" 사용되나, **기존의 배열에서 가져온 값들은 삭제되지 않고 그대로 유지된다.**

- 사용법

```
const index = dogs.slice(n,m);    => n: 가져올 시작순번 / m-1: 가져올 마지막 순번

n ~ m-1까지의 배열 순번을 가진 값들을 가져오게됨.
```

```
const index = dogs.slice(0,3);

console.log(index);                          -> 0~2 번째 배열 순번을 가진 값들을 가져옴.
console.log(dogs);                           -> 기존 배열 그대로 유지.
```



9. shift

: 배열의 **첫번째 원소**를 "값"의 형태로 추출할 때 사용되며, shift 함수로 인해 추출된 원소는 기존 배열에서 이탈되게 된다.

```
const array = [10,20,30,40,50];

const shift = array.shift();               

console.log(shift);                        -> 10반환
console.log(array);                        ->[20,30,40,50]
```



10. pop

: 배열의 **마지막 원소**를 "값"의 형태로 추출할 때 사용되며, shift 함수로 인해 추출된 원소는 기존 배열에서 이탈되게 된다.

```
const array = [10,20,30,40,50];

const pop = array.pop();               

console.log(pop);                          -> 50반환
console.log(array);                        ->[10,20,30,40]
```



11. unshift

: 배열의 **첫번째 원소**에  특정값을 추가할 때 사용된다.

```
const array = [10,20,30,40];

array.unshift(5);
console.log(array);                 -> [5,10,20,30,40]
```



- shift <-> unshift 

  push <-> pop

|        | 추가    | 제거  |
| ------ | ------- | ----- |
| 첫번째 | unshift | shift |
| 마지막 | push    | pop   |



12. concat

: 서로다른 배열들을 하나의 배열로 합칠 때 사용한다.

  concat은 기존의 배열에 영향을 미치지 않고  새로운 배열을 생성한다.

  새로 추가한 함수는 뒤쪽순번으로 배치된다.

```
const arr1 = [1,2,3];
const arr2 = [5,6,7];

const concat1 = arr1.concat(arr2);
const concat2 = arr2.concat(arr1);

console.log(concat1);			-> [1,2,3,5,6,7]         
console.log(concat2);			-> [5,6,7,1,2,3]
```



13. join

: 배열형태를 문자열로 변환할 때 사용한다.

- 사용법

```
join() -> 문자와 문자사이에 쉼표로 구분됨
join('') -> 문자와 문자사이가 '' 사이의 것으로 대체됨 
```

```
const arr1 = [1,2,3];
const arr2 = [5,6,7];

console.log(arr1.join());           -> 1,2,3 반환
```



14. reduce &&

: 주어진 배열들을 이용하여 연산을 해야할 경우에 사용한다.

```
// 배열의 합 구하기

const array = [1,2,3,4,5];

const reduce = array.reduce((accumulator, current) => accumulator + current ,0);

console.log(reduce);

// 배열의 평균 구하기

const array1 = [1,2,3,4,5];

const reduce = array1.reduce((accumulator ,current, index, array) => {
  if(index === array.length-1) {
    return (accumulator + current) / array.length;
  } 
  else {
    return accumulator + current; 
  }
},0);

console.log(reduce);
```

14. includes

: 주어진 배열이 특정 값을 포함하고 있는지를 판별할 때 사용한다.

  해당 함수에 의한 값은 다음과 같이 나타난다.

포함     => true

미포함 => false

```
function isAnimal(text) {
	const array = [1,2,3,4,5]
	return array.includes(text);
}
```

