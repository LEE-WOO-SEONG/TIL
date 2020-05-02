```javascript
// 1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라
const x = 15;
if(10 < x && x < 20) {
  console.log(x);
}
```

```javascript
// 2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) console.log(i);
}
```

```javascript
// 3. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.

let string = '';
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) string += i;
}
console.log(string);
```

```javascript
// 4. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

for (let i = 10; i > 0; i--) {
  if (i % 2 !== 0) console.log(i);
}
```

```javascript
// 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

let i = 0;
while (i < 10) {
  if (i % 2 === 0) console.log(i);
  i++;
}
```

```javascript
// #6. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

let i = 10;
while (i > 0) {
  if (i % 2 !== 0) console.log(i);
  i--;
}
```

```javascript
// 7. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오.

let sum = 0;
for (let i = 0; i < 10; i++) {
  sum += i;
}
console.log(sum);
```

```javascript
// 8. 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.

let sum = 0;
for (let i = 1; i < 20; i++) {
  if (i % 2 !== 0 && i % 3 !== 0) {
    sum += i;
  }
}
console.log(sum);
```

```javascript
// 9. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오.

let sum = 0;
for (let i = 1; i < 20; i++) {
  if (i % 2 === 0 || i % 3 === 0) {
    sum += i;
  }
}
console.log(sum);
```

```javascript
// 10. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.

for (let i = 1; i < 6; i++ ) {
  for (let j = 1; j < 6; j++) {
    if (i + j === 6) console.log(`[ ${i}, ${j} ]`);
  }
}
```

```javascript
// 11. 삼각형 출력하기 - pattern 1

for (let i = 0; i < 5; i++) {
  let tri = '';
  const star = '*';
  for (let j = 0; j < 5; j++) {
    if (j <= i) tri += star;
  }
  tri += '';
  console.log(tri);
}
```

```javascript
// 12. 삼각형 출력하기 - pattern 2

for (let i = 0; i < 5; i++) {
  let tri = '';
  const star = '*';
  for (let j = 0; j < 5; j++) {
    if (j < i) {
      tri += ' ';
    } else {
      tri += star;
    }
  }
  console.log(tri);
}
```

```javascript
// 13. 삼각형 출력하기 - pattern 3

for (let i = 5; i > 0; i--) {
  let tri = '';
  const star = '*';
  for (let j = 0; j < 5; j++) {
    if (j < i) {
      tri += star;
    } else {
      tri += ' ';
    }
  }
  console.log(tri);
}
```

```javascript
// 14. 삼각형 출력하기 - pattern 4

for (let i = 5; i > 0; i--) {
  let tri = '';
  const star = '*';
  for (let j = 1; j <= 5; j++) {
    if (j < i) {
      tri += ' ';
    } else {
      tri += star;
    }
  }
  console.log(tri);
}
```

```javascript
// 15. 정삼각형 출력하기

for (let i = 0; i < 5; i++) {
  let tri = '';
  const star = '*';
  for (let j = 0; j < 9; j++) {
    if (j < 4 - i || j > 4 + i) {
      tri += ' ';
    } else {
      tri += star;
    }
  }
  console.log(tri);
}
```

```javascript
// 16. 역정삼각형 출력하기

for (let i = 0; i < 5; i++) {
  let tri = '';
  const star = '*';
  for (let j = 0; j < 9; j++) {
    if (j >= 0 + i && j <= 8 - i) {
      tri += star;
    } else {
      tri += ' ';
    }
  }
  console.log(tri);
}
```

