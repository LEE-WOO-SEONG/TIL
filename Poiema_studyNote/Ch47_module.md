# module

- Toc

1. 

<br>

<br>

## 모듈의 일반적 의미

모듈(Module)이란 애플리케이션을 구성하는 **개별적요소**로서 <strong>재사용 가능한 코드조각</strong>을 말한다. 일반적으로 모듈은 기능을 기준으로 **파일** 단위로 분리되어 있다. 이 때 모듈이 성립하려면 모듈은 자신만의 <strong>파일 스코프</strong>를 가질 수 있어야 한다.

자신만의 파일 스코프를 갖는 모듈의 자산(모듈 내 변수, 함수, 객체 등..)은 기본적으로 비공개 상태이다. 즉, 자신만의 파일 스코프를 갖는 모듈의 모든자산은 **캡슐화**되어 다른 모듈에서 접근할 수 없다. 모듈은 개별적 존재로 애플리케이션과 분리되어 존재한다.

하지만 애플리케이션과 완전히 분리되어 개별적으로 존재하는 모듈은 재사용이 불가능하므로 존재의 의미가 없다. 모듈은 애플리케이션이나 다른 모듈에 의해 재사용되어야 의미가 있기 떄문에 모듈은 공개가 필요한 자산에 한정하여 명시적으로 선택적 공개가 가능하며 이를 **export**라 한다.

공개된 모듈의 자산은 다른 모듈에서 재사용할 수 있다. 이 떄 공개된 모듈의 자산을 사용하는 모듈을 모듈 사용자(Module consumer)라 한다. 모듈 사용자는 필요한 자산을 공개한 모듈을 선택해 자신의 스코프 내로 불러들여 재사용할 수 있다. 이를 **import**라 한다.

이처럼 모듈은 애플리케이션과 분리되어 개별적으로 존재하다가 필요에 따라 다른 모듈에 의해 재사용된다. 모듈은 기능별로 분리되어 개별적인 파일로 작성된다. 따라서 코드의 단위를 명확히 분리하여 애플리케이션을 구성할 수 있고, 재사용성이 좋아서 개발 효율성과 유지보수성을 높일 수 있다.

<br>

## 자바스크립트와 모듈

자바스크립트는 모듈이 성립하기 위해 필요한 파일 스코프와 import, export를 지원하지 않는다. 또한 파일마다 독립적인 파일 스코프를 갖지 않고 하나의 전역 객체(Global Object)를 공유한다. 즉, 자바스크립트 파일을 여러 개의 파일로 분리하여 script 태그로 로드하여도 분리된 자바스크립트 파일들이 결국 하나의 자바스크립트 파일 내에 있는 것처럼 하나의 전역 객체를 공유한다

이러한 문제를 해결하기 위해 자바스크립트는  [CommonJS](http://www.commonjs.org/)와 [AMD(Asynchronous Module Definition)](https://github.com/amdjs/amdjs-api/wiki/AMD) 2가지 모듈 시스템이 제안되었다.

<br>

## ES6 모듈

자바스크립트는 ES6부터 동작하는 모듈 기능을 추가하였다.

script 태그에 `type="module"` 어트리뷰트를 추가하면 로드된 자바스크립트 파일은 모듈로서 동작한다. 일반적인 자바스크립트 파일이 아닌 ES6 모듈임을 명확히 하기 위해 ES6 모듈의 파일 확장자는 mjs를 사용할 것을 권장한다.

```html
<script type="module" src="xxx.mjs"></script>
```

### 모듈 스코프

ES6 모듈을 사용하지 않으면 자바스크립트 파일을 분리해도 독자적인 스코프를 갖지 않고 하나의 전역을 공유한다.

```js
// foo.js
var x = 'foo';

// 변수 x는 전역 변수이다.
console.log(window.x); // foo
```

```html
<!DOCTYPE html>
<html>
<body>
  <script src="foo.js"></script>
</body>
</html>
```



ES6 모듈은 파일 자체의 독자적인 모듈 스코프를 제공한다. 따라서, 모듈 내에서 var 키워드로 선언한 변수는 더 이상 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.

```js
// foo.mjs
var x = 'foo';

console.log(x); // foo
// 변수 x는 전역 변수가 아니며 window 객체의 프로퍼티도 아니다.
console.log(window.x); // undefined
```

```html
<!DOCTYPE html>
<html>
<body>
  <script type="module" src="foo.mjs"></script>
</body>
</html>
```

모듈 내에서 선언한 변수는 모듈 외부에서 참조할 수 없다. 모듈 스코프가 다르기 때문이다.

<br>

### export 키워드

모듈은 독자적인 모듈 스코프를 갖는다. 따라서 모듈 안에 선언한 모든 식별자는 기본적으로 <strong>해당 모듈 내부에서만 참조할 수 있다.</strong>

만약 모듈 안에 선언한 식별자를 외부에 공개하여 다른 모듈들이 참조할 수 있게 하고 싶다면 **export** 키워드를 사용한다. 선언된 변수, 함수, 클래스 등 모든 식별자를 export할 수 있다. 모듈을 공개하려면 선언문 앞에 export 키워드를 사용한다. 복수의 식별자를 export할 수도 있다.

```js
// foo.mjs
export const num = 0;

export function add(x, y) {
    return x+ y;
}

export class Person {
    constructor(name) {
        this.name = name;
    }
}
```

선언문 앞에 매번 export 키워드를 붙이는 것이 싫다면 export 대상을 모아 하나의 객체로 구성하여 한번에 export할 수도 있다.

```js
// foo.mjs
const num = 0;

function add(x, y) {
    return x+ y;
}

class Person {
    constructor(name) {
        this.name = name;
    }
}

export { num, add, Person }
```

### import 키워드

다른 모듈에서 export 한 식별자를 자신의 모듈 스코프 내부로 로드하려면 **import** 키워드를 사용한다. 다른 모듈이 export한 식별자로 import하며 ES6 모듈의 파일 확장자를 생략할 수 없다.

```JS
// bar.mjs
import { num, add, Person } from './foo.mjs'

console.log(num); // 0
console.log(add(1, 2)); // 3
console.log(new Person('lee')) // Person { name: 'lee' }
```

```html
<!DOCTYPE html>
<html>
<body>
  <script type="module" src="lib.mjs"></script>
  <script type="module" src="app.mjs"></script>
</body>
</html>
```

모듈이 export한 식별자를 각각 지정하지 않고 하나의 이름으로 한꺼번에 import할 수도 있다. 이때 import되는 식별자는 as 뒤에 지정한 이름의 객체에 프로퍼티로 할당된다.

```js
// bar.mjs
import * as obj from './foo.mjs'

console.log(obj.num); // 0
console.log(obj.add(1, 2)); // 3
console.log(new obj.Person('lee')) // Person { name: 'lee' }
```

모듈이 export한 식별자 이름을 변경하여 import할 수도 있다.

```js
// bar.mjs
import { num as Num, add as Add, Person as P } from './foo.mjs'

console.log(obj.Num); // 0
console.log(obj.Add(1, 2)); // 3
console.log(new obj.P('lee')) // Person { name: 'lee' }
```

모듈에서 하나의 식별자 만을 export한다면 default 키워드를 사용할 수 있다.

```js
// foo.mjs
export default (x, y) => x + y;
```

default 키워드와 함께 export한 모듈은 {} 없이 임의의 이름으로 import한다.

```js
// bar.mjs
import square from './foo.mjs';

console.log(add(1, 2)); // 3
```

default 키워드를 사용하는 경우, var, let, const 키워드는 사용할 수 없다.

```js
// foo.mjs
export default const foo = () => {};
// => SyntaxError: Unexpected token 'const'
```

