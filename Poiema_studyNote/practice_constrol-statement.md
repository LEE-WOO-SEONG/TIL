```javascript
// 1. 변수 x가 10보다 크고 20보다 작을 때 변수 x를 출력하는 조건식을 완성하라
var x = 15;
if (10 < x < 20) console.log(x);
```

```javascript
// 2. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

for (var i = 0; i < 10; i++) {
  if (i % 2 === 0) console.log(i);
}
```

```javascript
// 3. for문을 사용하여 0부터 10미만의 정수 중에서 짝수만을 작은 수부터 문자열로 출력하시오.

var string = '';
for (var i = 0; i < 10; i++) {
  // var string = '';
  if (i % 2 === 0) string += i;
  // console.log(string);
}
console.log(string);
```

```javascript
// 4. for문을 사용하여 0부터 10미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

for (var i = 10; i > 0; i--) {
  if (i % 2 !== 0) console.log(i);
}
```

```javascript
// 5. while문을 사용하여 0 부터 10 미만의 정수 중에서 짝수만을 작은 수부터 출력하시오.

var y = 0;
while (y < 10) {
  if (y % 2 === 0) console.log(y);
  y++;
}
```

```javascript
// #6. while문을 사용하여 0 부터 10 미만의 정수 중에서 홀수만을 큰수부터 출력하시오.

var z = 10;
while (z > 0) {
  if (z % 2 !== 0) console.log(z);
  z--;
}
```

```javascript
// 7. for 문을 사용하여 0부터 10미만의 정수의 합을 출력하시오.

var sum = 0;
for (var i = 0; i < 10; i++) {
  sum += i;
}
console.log(sum);
```

```javascript
// 8. 1부터 20 미만의 정수 중에서 2 또는 3의 배수가 아닌 수의 총합을 구하시오.

var sum2 = 0;

for (var i = 1; i < 20; i++) {
  if (i % 2 === 0) {}
  else if (i % 3 !== 0) {
    sum2 += i;
  }
}
console.log(sum2);
```

```javascript
// 9. 1부터 20 미만의 정수 중에서 2 또는 3의 배수인 수의 총합을 구하시오.

// 2 또는 3의 배수가 아닌 수
var sum2 = 0;

for (var i = 1; i < 20; i++) {
  if (i % 2 === 0) {}
  else if (i % 3 !== 0) {
    sum2 += i;
  }
}

// 1 < < 20 인 정수들의 총합
var sum3 = 0;

for (var i = 1; i < 20; i++) {
  sum3 += i;
}

console.log(sum3 - sum2);
```

```javascript
// 10. 두 개의 주사위를 던졌을 때, 눈의 합이 6이 되는 모든 경우의 수를 출력하시오.

for (var i = 1; i <= 6; i++) {
  for (var j = 1; j <= 6; j++) {
    if(i + j === 6) console.log(`[ ${i}, ${j} ]`);
  }
}
```

```javascript
// 11. 삼각형 출력하기 - pattern 1

var star = '*****';
var tri = '';
for (var i = 0; i < star.length; i++) {
  tri += star[i];
  console.log(tri);
}
```

```javascript

```

