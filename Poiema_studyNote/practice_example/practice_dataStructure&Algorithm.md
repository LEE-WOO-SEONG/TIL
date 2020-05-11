# 자료구조&알고리즘 연습문제

```js
// 선형검색
// 선형 검색을 통해 주어진 배열(array)에 주어진 값(target)이 요소로 존재하는지 확인하여 존재하는 경우 해당 인덱스를 반환하고 존재하지 않는 경우 -1을 반환하는 함수를 구현하라. 단, 어떠한 빌트인 함수도 사용하지 않고 for 문을 사용하여 구현하여야 한다.

function linearSearch(array = [], target) {
  let index = -1;  // return여러번 사용하는게 불편해서 변수 만들어줌.
  const length = array.length;   // 조건식 변수 선언.
  for (let i = 0; i < length; i++) { // 조건식이 배열의 길이만큼 반복됨.
    if (array[i] === target) index = i;
  }
  return index;
}

console.log(linearSearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(linearSearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(linearSearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(linearSearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(linearSearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(linearSearch([1, 2, 3, 4, 5, 6], 7)); // -1
```

```js
// 이진검색
// 이진 검색을 통해 주어진 배열(array)에 주어진 값(target)이 요소로 존재하는지 확인하여 존재하는 경우 해당 인덱스를 반환하고 존재하지 않는 경우 -1을 반환하는 함수를 구현하라. 단, 아래의 빌트인 함수 이외에는 어떤 빌트인 함수도 사용하지 않아야 하며, while 문을 사용하여 구현하여야 한다.

function binarySearch(array, target) {
  let start = 0;
  let end = array.length - 1;
  // let mid = Math.floor((start + end) / 2);
  let index = -1;

  // if (array.find(n => n === target)) {
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (target === array[mid]) {
      index = mid;
      break;
    } else if (target > array[mid]) start = mid + 1;
    else end = mid - 1;
  }
  // }
  return index;
}

console.log(binarySearch([1, 2, 3, 4, 5, 6], 1)); // 0
console.log(binarySearch([1, 2, 3, 4, 5, 6], 3)); // 2
console.log(binarySearch([1, 2, 3, 4, 5, 6], 5)); // 4
console.log(binarySearch([1, 2, 3, 4, 5, 6], 6)); // 5
console.log(binarySearch([1, 2, 3, 4, 5, 6], -1)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 0)); // -1
console.log(binarySearch([1, 2, 3, 4, 5, 6], 7)); // -1


```
