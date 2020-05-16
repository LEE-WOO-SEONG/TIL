# 클래스

- Toc

1. [클래스는 프로토타입의 문법적 설탕인가?](#클래스는-프로토타입의-문법적-설탕인가)

2. [클래스 정의](#클래스-정의)

3. [클래스 호이스팅](#클래스-호이스팅)

4. [인스턴스 생성](#인스턴스-생성)

5. [메소드](#메소드)

   5-1. [constructor](#constructor)

   5-2. [프로토타입 메소드](#프로토타입-메소드)

   5-3. [정적 메소드](#정적-메소드)

   5-4. [정적 메소드와 프로포토타입 메소드의 차이](#정적-메소드와-프로포토타입-메소드의-차이)

   5-5. [클래스에서 정의한 메소드의 특징](#클래스에서-정의한-메소드의-특징)

6. [클래스의 인스턴스 생성과정](#클래스의-인스턴스-생성과정)

7. [프로퍼티](#프로퍼티)

   7-1. [인스턴스 프로퍼티](#인스턴스-프로퍼티)

   7-2. [접근자 프로퍼티](#접근자-프로퍼티)

   7-3. [클래스 필드 정의제안](#클래스-필드-정의제안)

   7-4. [private 필드 정의제안](#private-필드-정의제안)

   7-5. [static 필드 정의제안](#static-필드-정의제안)

8. [상속에 의한 클래스 확장](#상속에-의한-클래스-확장)

   8-1. [클래스 상속과 생성자 함수 상속](#클래스-상속과-생성자-함수-상속)

   8-2. [extends 키워드](#extends-키워드)

   8-3. [동적 상속](#동적-상속)

   8-4. [서브 클래스의 constructor](#서브-클래스의-constructor)

   8-5. [super 키워드](#super-키워드)

   8-6. [상속 클래스의 인스턴스 생성과정](#상속-클래스의-인스턴스-생성과정)

   8-7. [표준 빌트인 생성자 함수 확장](#표준-빌트인-생성자-함수-확장)

<br>

<br>

## 클래스는 프로토타입의 문법적 설탕인가?

자바스크립트는 프로토타입 기반의 객체지향 언어이다.

프로토타입 기반 객체지향 언어는 클래스가 필요없는 객체지향 프로그래밍 언어이다. ES5에서는 클래스 없이도 아래와 같이 생성자 함수와 프로토타입 체인, 클로저를 사용하여 객체지향 언어의 상속, 캡슐화등의 개념을 구현할 수 있다.

```JS
var Person = (function() {
  var _name = '';
    
  function Person(name) { _name = name; }
    
  Person.prototype.sayHi = function () {
      console.log('hi! my name is ' + _name)
  };
    
    return Person;
}());

var me = new Person('lee');

me._name = 'kim';
me.sayHi(); // hi! my name is lee
```

하지만 클래스기반 언어에 익숙한 프로그래머들은 프로토타입 기반 프로그래밍 방식에 혼란을 느낄 수 있어 이를 위해 ES6에서는 클래스를 도입하였다. 클래스는 JAVA나 C#과 같은 클래스기반 객체지향 프로그래밍 언어와 매우 흡사한 새로운 객체생성 메커니즘을 제시한다.

그렇다고 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새롭게 클래스 기반 객체지향 모델을 제공하는 것은 아니며 클래스는 함수로 기존 프로토타입 기반 패턴을 클래스 기반 패턴처럼 사용할 수 있도록 하는 <strong>문법적 설탕</strong>이라고도 볼 수 있다. 

단, 클래스와 생성자 함수는 모두 <strong>프로토타입 기반</strong>의 인스턴스를 생성하지만 차이가 있다.

- 클래스는 new 연산자를 사용하지 않고 호출하면 에러가 발생한다.

  생성자 함수는 new 연산자를 사용하지 않고 호출하면 일반함수로서 호출된다.

- 클래스는 상속을 지원하는 **extends**와 **super** 키워드를 제공한다.

- 클래스는 <strong>호이스팅이 발생하지 않는 것 처럼 동작</strong>한다.

- 클래스 내의 모든 코드에는 <strong>암묵적으로 strict 모드가 지정되어 실행되며 strict 모드를 해지할 수 없다.</strong>

- 클래스의 constructor, 프로토타입 메소드, 정적 메소드는 모두 프로퍼티 어트리뷰트 중<strong>[[Enumerable]]의 값이 false</strong>이다.

> 클래스는 생성자 함수를 기반으로 한 객체 생성방식보다 견고하면서 명료하다. 특히 생성자 함수에서는 지원하지 않는 extends와 super 키워드는 상속관계 구현을 보다 간결하고 명료하게 한다.
>
> 따라서 클래스를 프로토타입 기반 객체생성 패턴의 단순한 문법적 설탕이라고 보기보다는 <strong>새로운 객체생성 메커니즘</strong>으로 보는것이 합당하다.

<br>

## 클래스 정의

클래스는 `class` 키워드를 사용하여 정의하며 생성자 함수와 마찬가지로 <strong>파스칼 케이스</strong>로 이름을 생성한다. 단, 파스칼 케이스를 사용하지 않더라도 에러가 발생하지는 않는다. 

```js
// 클래스 선언문
class Person {}

// 익명 클래스 표현식
const Person = class {};

// 기명 클래스 표현식
const Person = class People {};
```

클래스는 함수이므로 선언문이 아닌 표현식으로도 정의할 수 있다. 이는 클래스가 값으로 사용할 수 있는 **일급객체**라는 것을 의미한다. 즉 클래스는 일급객체로서 아래와 같은 특징을 가진다.

- 무명의 리터럴로 생성할 수 있다. 런타임에 생성이 가능하다.
- 변수나 자료구조(객체 /배열)에 저장할 수 있다.
- 함수의 매개변수에 전달이 가능하다.
- 함수의 반환값으로 사용할 수 있다.

<br>

클래스 몸체에는 0개 이상의 메소드만을 정의할 수 있다. 클래스 몸체에서 정의할 수 있는 메소드는 constructor / 프로토타입 메소드 / 정적메소드 3가지가 있다.

```js
class Person {
    constructor(name) {          // 생성자
        this.name = name;        
    }
    sayHi() {                    // 프로토타입 메소드
        console.log(`hi, my name is ${this.name}`);
    }
    static sayHello() {          // 정적메소드
        console.log('Hello!');
    }
}

const me = new Person('lee');

console.log(me.name);  // lee
me.sayHi(); // hi, my name is lee
Person.sayHello();  // Hello!
```

> 클래스와 생성자 함수의 정의방식 비교

![image](https://user-images.githubusercontent.com/62285872/81818941-a032a600-9569-11ea-9b8c-35b733deab66.png)	

<br>

## 클래스 호이스팅

클래스는 클래스 정의 이전에 참조가 불가능하다.

```js
console.log(Person);
// Uncaught ReferenceError: Person is not defined

class Person {}
```

클래스 선언문은 호이스팅이 발생하지 않는 것처럼 보이나 실제로는 그렇지 않다.

```js
const Person = '';
{
    // 호이스팅이 발생하지 않는다면 ''가 출력되어야 한다.
    console.log(Person);
    // uncaught ReferenceError: Cannot access 'Person' before initialization
    
    class Person {}
}
```

클래스 선언문도 변수 선언 / 함수 정의와 마찬가지로 호이스팅이 발생한다. 단, 클래스는 let / const 키워드로 선언한 변수처럼 호이스팅된다. 따라서 클래스 선언문 이전에  일시적 사각지대(TDZ)에 빠지기 때문에 <strong>호이스팅이 발생하지 않는 것 처럼 동작한다.</strong>

var / let / const / function / class 키워드를 사용하여 선언된 모든 식별자는 호이스팅 된다. 모든 선언문은 런타임 이전에 평가 단계에서 먼저 실행되기 때문이다.

<br>

## 인스턴스 생성

<strong>클래스는 함수로 평가된다.</strong>

```js
class Person {}

console.log(typeof Person) // function
```

클래스는 생성자 함수이며 new 연산자와 함께 호출되어 인스턴스를 생성한다.

```js
class Person {}

const me = new Person();

console.log(me); // Person {}
```

함수는 new 연산자의 사용여부에 따라 일반함수로 호출되거나 인스턴스 생성을 위한 생성자 함수로 호출되지만 클래스는 인스턴스를 생성하는 것이 유일한 존재 이유이므로 <strong>반드시 new 연산자와 함께 호출하여야 한다.</strong>

```js
class Person {}

const me = Person();
// TypeError: Class constructor Person cannot be invoked without 'new'
```

표현식으로 정의된 클래스의 경우 클래스를 가리키는 식별자를 사용하여 인스턴스를 생성하지 않고, 기명 클래스 표현식의 클래스 이름을 사용해 인스턴스를 생성하면 에러가 난다.

```js
const Person = class MyClass {};

const me = new Person();

console.log(MyClass);

const you = new MyClass();
```

함수 표현식과 마찬가지로 클래스를 가리키는 식별자로 인스턴스를 생성해야 하며, 클래스 이름은 클래스 몸체 내부에서만 유효하다. (함수와 동일)

때문에 클래스 표현식에서 사용한 클래스 이름은 <strong>외부코드에서 접근이 불가능하다.</strong>

<br>

## 메소드

### constructor

constructor는 <strong>인스턴스를 생성하고 초기화</strong>하기 위한 특수한 메소드이다. constructor는 이름을 변경할 수 없다.

```js
class Person {
    constructor(name) {
        this.name = name;
    }
}
```

![image](https://user-images.githubusercontent.com/62285872/81883752-0272c180-95d1-11ea-8adf-6f0de4dd9428.png)		

클래스는 평가되어 **함수객체**가 된다.  위 콘솔창을 확인 해 보면 클래도 함수 객체의 고유 프로퍼티를 모두 가지고 있다. 또한 함수와 동일하게 프로토타입과 연결되어 있으며 자신의 스코프 체인을 구성한다.

constuctor로 사용할 수 있는 함수객체가 가지고 있는 prototype 프로퍼티가 가리키는 프로토타입 객체의 constructor 프로퍼티가 클래스 자신을 가리키고 있다. 이는 클래스가 인스턴스를 생성하는 <strong>생성자 함수</strong>라는 것을 의미한다. 즉, new 연산자와 함께 클래스를 호출하면 클래스는 인스턴스를 생성한다.

> 클래스의 constructor 메소드와 Person.prototype.constructor는 다르다.
>
> 클래스 내부의 constructor 메소드는 미래에 생성될 인스턴스에 관한 정보를 담고 있으며 Person.prototype의 constructor 프로퍼티는 생성자 함수인 클래스 자신을 가리키니 혼동하지 않도록 한다.

constructor는 메소드로 해석되는 것이 아니라 클래스가 평가되어 생성한 **함수객체** 코드의 일부가 된다. 즉, 클래스 정의가 평가되면 constructor의 기술된 동작을 하는 함수객체가 생성된다.

클래스의 constructor는 생성자 함수와 유사하지만 차이가 있다.

- 클래스 내에 construcor는 최대 1개만 존재할 수 있다.

- constructor는 생략 할 수 있다. 만약 생략할 경우 클래스에는 default constructor 가 암묵적으로 정의된다.

  ```js
  class Person {
      constuctor() {}
  }
  
  const me = new Person();
  console.log(me);   // Person {}
  ```

- 프로퍼티가 추가되어 초기화된 인스턴스를 생성하려면 constructor 내부에서 this에 인스턴스 프로퍼티를 추가해야 한다.

  ```js
  class Person {
      constructor(name, age) {
          this.name = name;
          this.age = age;
      }
  }
  
  const me = new Person('lee', 20);
  console.log(me);   // Person { name : 'lee', age : 20 }
  ```

<br>

constructor는 생략이 가능하나, 생략할 경우 암묵적으로 생성된 default constructor로 인스턴스를 생성 시 초기화가 불가능한 빈 객체만 생성하게 된다. 때문에 인스턴스를 초기화 하려면 constructor를 생략해서는 안된다.

- constructor는 생성자함수와 동일하게 암묵적으로 빈 객체를 생성 후 해당 객체를 this에 바인딩한다. 명시적 return 문이 없을 경우 this를 암묵적으로 반환하나, return문이 존재하게 되면 명시된 반환값을 반환하게 된다. 이는 인스턴스를 생성할 목적인 클래스의 의도와 맞지 않는다. 때문에 <strong>constructor에 반환문을 사용하지 않도록 한다.</strong>

<br>

### 프로토타입 메소드

생성자 함수로 인스턴스를 생성하는 경우, 프로토타입 메소드를 생성하기 위해서는 명시적으로 프로토타입에 메소드를 추가하여야 했다.

<strong>클래스는 이와다르게 클래스 몸체에 정의된 메소드가 프로토타입 메소드가 된다.</strong>

```js
// 생성자 함수
function Person(name) {
    this.name = name;
}
Person.prototype.sayHi = function () {
    console.log(`hi, my name is ${this.name}`)
};

// 클래스
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log(`hi, my name is ${this.name}`)
    }
}
```

또한 생성자 함수와 마찬가지로 클래스가 생성한 인스턴스는 프로토타입 체인의 일원이 된다.

```js
class Person {
    constructor(name) {
        this.name = name;
    }
    sayHi() {
        console.log(`hi, my name is ${this.name}`)
    }
}

const me = new Person('lee');

me.sayHi(); // Hi! My name is lee

Object.getPrototypeOf(me) === Person.prototype // true
me instanceof Person // true

Object.getPrototypeOf(Person.prototype) === Object.prototype // true
me instanceof Object // true

me.constructor === Person // true
```

![image](https://user-images.githubusercontent.com/62285872/81887196-8af56000-95d9-11ea-95cd-cbc00cfb5a94.png)

이처럼 클래스를 통해 생성한 인스턴스에도 프로토타입 체인이 적용된다. 결국 클래스도 생성자 함수처럼 프로토타입 기반의 객체 생성 메커니즘 인 것이다.

<br>

### 정적 메소드

정적 메소드란 인스턴스를 생성하지 않아도 호출할 수 있는 메소드를 말한다.

생성자 함수는 자기자신인 생성자 함수에 대한 프로퍼티의 추가로 정적메소드의 생성이 가능하다.

<strong>반면 클래스는 클래스 몸체에서 `static` 키워드를 붙여 정의된 메소드가 정적메소드가 된다.</strong>

```js
// 생성자 함수
function Person(name) {
    this.name = name;
}
Person.sayHi = function () {
    console.log(`hi, my name is ${this.name}.`)
};

// 클래스
class Person {
    constructor(name) {
        this.name = name;
    }
    static sayHi() {
        console.log(`hi.`)
    }
}
```

![image](https://user-images.githubusercontent.com/62285872/81887851-04da1900-95db-11ea-99c7-e2c135a864d4.png)

클래스는 **함수객체**로 평가되므로 자신의 프로퍼티, 메소드를 소유할 수 있으며, 정적 메소드는 클래스 자신의 메소드가 된다. 이러한 정적 메소드는 클래스가 가지는 프로퍼티 이므로 인스턴스를 생성하지 않아도 참조가 가능하다.

정적 메소드는 클래스로 호출한다.

```js
Person.sayHi();  // hi.
```

<br>

### 정적 메소드와 프로포토타입 메소드의 차이

정적 메소드와 프로토타입 메소드의 차이점

- 정적 메소드와 프로토타입 메소드는 자신이 속해 있는 <strong>프로토타입 체인</strong>이 다르다.
- 정적 메소드는 **클래스**로, 프로토타입 메소드는 **인스턴스**로 호출이 가능하다.
- 정적 메소드는 <strong>인스턴스의 프로퍼티를 참조할 수 없지만</strong> 프로토타입 메소드는 가능하다.

```js
class Square {
    static area(width, height) {
        return width * height;
    }
}
console.log(Square.area(10,10)); // 100

const square = new Square();
square.area() // TypeError: square.area is not a function
```

정적 메소드인 `area`는 인스턴스의 프로퍼티를 인수로 참조하지 않는다. 이럴 경우 정적메소드를 사용하며, 만약 인스턴스의 프로퍼티를 사용해야 한다면 프로토타입 메소드를 사용해야 한다.

```js
class Square {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    
    area() {
        return this.width * this.height;
    }
}

const square = new Square(10, 10);
console.log(square.area());  // 100
```

메소드 내부에서 인스턴스 프로퍼티의 참조가 필요하면 this를 사용해야 하며 이러한 경우, 프로토타입 메소드로 정의해야 한다. 물론 메소드 내부에서 this를 사용하지 않더라도 프로토타입 메소드로 정의가 가능하나, 프로토타입 메소드는 반드시 인스턴스를 생성한 다음 인스턴스로 호출해야 하므로 this를 사용하지 않는 메소드는 정적 메소드로 정의하는 것이 좋다.

표준 빌트인 객체인 Math/ Number / JSON / Object / Reflect 등은 다양한 정적 메소드를 가지고 있다. 이들 정적 메소드는 애플리케이션의 전역에서 사용할 유틸리티함수이다.

프로토타입 메소드는 평가하고싶은 객체를 호출하여 메소드를 사용하는 데 반해 정적 메소드는 평가하고 싶은 값를 인수로 준다.

```js
// 정적 메소드
Math.max(1, 2, 3);  // 3
Number.isNaN(NaN);  // true
JSON.stringify({ a: 1 }) // "{"a": 1 }"
Object.is({}, {});  // false
Reflect.has({ a : 1}, 'a') // true

// 프로토타입 메소드
me.hasOwnProperty('name');
```



이처럼 클래스 또는 생성자 함수를 하나의 [네임스페이스](https://ko.wikipedia.org/wiki/이름공간)(Namespace)로 사용하여 정적 메소드를 모아 놓으면 이름충돌 가능성을 줄여주고 관련있는 함수들을 구조화 할 수 있는 효과가 있다.

이 같은 이유로 애플리케이션 전역에서 사용할 유틸리티 함수를 전역함수로 정의하지 않고 정적메소드로 구조화 한다.

> ES6에 추가된 표준빌트인 객체 Number의 정적 메소드
>
> ES6에서는 빌트인 전역함수인 isFinite / isNaN / parseInt / parseFloat 등을 표준 빌트인 객체인 Number의 정적메소드로 추가 구현하였다. Number의 정적메소드는 빌트인 전역함수보다 엄격하다.
>
> ![image](https://user-images.githubusercontent.com/62285872/81895397-0ca2b900-95ed-11ea-882c-6acd75801a67.png)

<br>

### 클래스에서 정의한 메소드의 특징

1. function 키워드를 생략한 <strong>메소드 축약표현</strong>을 사용한다.
2. 객체 리터럴과는 다르게 클래스에 메소드를 정의할 때는 콤마가 필요없다.
3. 암묵적으로 <strong>strict모드로 실행된다.</strong>
4. for...in 문이나 Object.keys 메소드 등으로 열거할 수 없다. 즉, 프로퍼티의 어트리뷰트 중 [[Enumerable]] 내부슬롯의 값이 false 이다.
5. 내부메소드 [[Construct]]를 갖지 않는 non-constructor이다.(일반함수가 아닌 메소드이기 때문.) 따라서 new 연산자와 함께 호출할 수 없다.

<br>

## 클래스의 인스턴스 생성과정

new 연산자와 함께 클래스를 호출하면 클래스 내부 메소드인 [[Construct]]가 호출된다. 클래스는 new 연산자 없이 호출할 수 없다.

- 인스턴스 생성과 this 바인딩

new 연산자와 함께 클래스를 호출하면 construct의 내부코드가 실행되기에 앞서 암묵적으로 빈 객체가 생성된다. 동시에 클래스가 생성한 빈 객체인 인스턴스는 프로토타입으로 클래스의 prototype 프로퍼티에 바인딩된 객체가 설정된다. 마지막으로 인스턴스는 this에 바인딩된다. 따라서 construct 내부의 this는 클래스가 생성한 인스턴스를 가리킨다.

- 인스턴스 초기화

constructor의 내부코드가 실행되어 this에 바인딩 되어있는 인스턴스를 초기화한다. 즉, this에 바인딩 되어있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티 값을 초기화 한다.

- 프로토타입 / 정적 메소드 추가

클래스 몸체에 정의한 프로토타입 메소드가 존재하면 클래스의 prototype 프로퍼티가 가리키는 프로토타입에 추가한다. 동일하게 클래스 몸체에 정의한 정적 메소드가 존재하면 클래스에 추가한다.

- 인스턴스 반환

마지막으로 클래스의 모든 처리가 끝나면 완성된 인스터가 바인딩된 this가 암묵적으로 반환된다.

```js
class Person {
  // 생성자
  constructor(name) {
    // 1. 암묵적으로 인스턴스가 생성되고 this에 바인딩된다.
console.log(this); // Person {}
    console.log(Object.getPrototypeOf(this) === Person.prototype); // true

    // 2. this에 바인딩되어 있는 인스턴스를 초기화한다.
    this.name = name;

    // 4. 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.
  }

  // 3. 프로토타입 메소드는 클래스의 prototype에 메소드로 추가된다.
  sayHi() {
    console.log(`Hi! My name is ${this.name}`);
  }

  // 3. 정적 메소드는 클래스에 메소드로 추가된다.
  static sayHello() {
    console.log('Hello!');
  }
}
```

<br>

## 프로퍼티

### 인스턴스 프로퍼티

인스턴스 프로퍼티는 constructor 내부에서 정의해야 한다.

```js
class Person {
    constructor(name) {
        this.name = name;
    }
}
```

constructor 내부에서 this에 추가한 프로퍼티는 언제나 클래스가 생성한 인스턴스의 프로퍼티가 된다. ES6의 클래스는 다른 객체지향언어 처럼 private / public / protected 키워드와 같은 **접근제한자**를 지원하지 않는다. 따라서 인스턴스 프로퍼티는 언제나 **public**하다.

<br>

### 접근자 프로퍼티

접근자 프로퍼티는 자체적으로는 값([[Value]] 내부슬롯)을 갖지않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 접근자함수(getter / setter)로 구성된 프로퍼티이다.

```js
class Person {
    constructor(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    get fullName() {
        return `${this.firstName} ${this.lastName}`
    }
    set fullName(name) {
        [this.firstName, this.lastName] = name.split(' ');
    }
}

const me = Person('wooseong', 'lee');
console.log(me) = {firstName : 'wooseong', lastName : 'lee'}
me. fullName = ahah kim;

console.log(me) = {firstName : 'ahah', lastName : 'kim'}

console.log(Object.getOwnPropertyDescriptor(Person.prototype, 'fullName'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}
```

클래스에서 접근자 프로퍼티는 위 처럼 constructor 메소드 외부에 정의한다.

앞서 클래스에 아무런 키워드 없이 정의한 메소드는 프로토타입 메소드가 된다고 했다. <strong>그렇기 때문에 클래스의 접근자 프로퍼티 또한 인스턴스 프로퍼티가 아닌 프로토타입의 프로퍼티가 된다.</strong>

```js
// Object.getOwnPropertyNames는 비열거형을 포함한 모든 프로퍼티의 이름을 반환함.

console.log(Object.getOwnPropertyNames(me))
// ['firstName', 'lastName']
console.log(Object.getOwnPropertynames(Object.getPrototypeOf(me)))
// ['constructor', 'fullName']
```

![image](https://user-images.githubusercontent.com/62285872/81900388-a8d1bd80-95f7-11ea-9128-ef22500acdbc.png)	

![image](https://user-images.githubusercontent.com/62285872/81900415-b8e99d00-95f7-11ea-82cd-9c1940b1bf0c.png)	

<br>

### 클래스 필드 정의제안

> 클래스필드란?(class field)
>
> 클래스필드는 클래스 기반 객체지향 언어에서 클래스가 생성할 <strong>인스턴스의 프로퍼티</strong>를 가리키는 용어이다.

```java
public class Person {
    private String firstName = "";
    private String lastName = "";
    
    Person(String firstName, String lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
    }
    
    public String getFullName() {
        return firstName + " " + lastName;
    }
}
```

위 예제는 자바에서 사용하는 코드이다.

인스턴스의 프로퍼티를 선언하고 초기화하려면 반드시 생성자 함수의 몸체 또는 클래스의 constructor 내부에서 this에 프로퍼티를 추가해야하는 자바스크립트와는 달리 클래스 기반 객체지향 언어에서는 위와 같이 클래스가 생성할 인스턴스의 프로퍼티인 **클래스필드**를 마치 변수처럼 클래스 몸체에 this 없이 선언해야 한다.

또한 자바스크립트의 경우 인스턴스 프로퍼티를 참조할 때 반드시 **this**를 사용해야 하나, <strong>클래스 기반 객체지향 언어에서는 this의 생략이 가능하다.</strong>

클래스 기반 객체지향 언어에서의 **this**는 언제나 <strong>인스턴스 자신</strong>을 의미한다. 또한 this는 주로 클래스필드가 생성자 또는 메소드의 매개변수 이름과 동일할 때 클래스 필드임을 명확히 하기위해 사용한다.

자바스크립트의 경우 아래처럼 클래스 몸체에 메소드가 아닌 클래스 필드를 선언하면 문법에러가 발생한다.

```js
class Person {
    name = 'lee';
}
```

하지만 위 예제를 최신 브라우저(Chrome 72 이상) 또는 최신 Node.js(버전 12 이상)에서 실행하면 정상 동작한다. 그 이유는 자바스크립트 에서도 인스턴스 프로퍼티를 마치 클래스 기반 객체지향 언어의 클래스 필드처럼 정의할 수 있는 새로운 표준사양인 <strong>"Class field declarations"</strong>가 [TC39프로세스](https://tc39.es/process-document/)의 stage3 (candidate)에 제안되어 있기 때문이다.

> TC39란? (Technical Committee 39)
>
> ECMA 인터내셔널은 ECMAScript 이외에도 다양한 기술의 사양을 관리하고 있고 이들 사양을 관리하는 주체인 기술위원회도 여럿 존재한다. 여러 사양 중에서 ECMA-262 사양(ECMAScript)의 관리를 담당하는 위원회가 바로 TC39이다.
>
> TC39는 Google, Apple, Microsoft, Mozilla 등 브라우저 벤더와 Facebook, Twitter와 같이 ECMA-262 사양(ECMAScript)를 제대로 준수해야 하는 기업으로 구성되어 있다.

> TC39 프로세스?
>
> TC39 프로세스는 <strong>ECMA-262 사양에 새로운 표준사양을 추가</strong>하기 위해 공식적으로 명문화 해 놓은 과정을 말한다. TC39 프로세스는 0단계부터 4단계 까지 총 5단계로 구성되어 있고 상위 단계로 승급하기 위한 명시적인 조건들이 존재한다. 승급 조건을 충족시킨 제안은 TC39의 동의를 통해 다음단계로 승급된다. 
>
> stage 0: strawman => stage 1: proposal => stage 2: draft => stage 3: candidate => stage 4: finished

클래스 몸체에서 클래스 필드를 정의할 수 있는 클래스 필드 정의(Class field definitions) 제안은 아직 ECMAScript의 정식 표준 사양으로 승급 되지 않았다. 하지만 최신 브라우저(Chrome 72 이상)와 최신 Node.js(버전 12 이상)는 표준 사양으로 승급이 확실시되는 이 제안을 미리 구현해 놓았다. 따라서 최신 브라우저와 최신 Node.js에서는 아래 예제와 같이 클래스 필드를 클래스 몸체에 정의할 수 있다.

```js
class Person {
  // 클래스 필드 정의
  name = 'Lee';
}

const me = new Person();
console.log(me); // Person {name: "Lee"}
```

클래스 몸체에서 클래스 필드를 정의하는 경우 this에 클래스 필드를 바인딩해서는 안된다. <strong>this는 클래스의 constructor와 메소드 내에서만 유효하다.</strong>

```js
class Person {
  // this에 클래스 필드를 바인딩해서는 안된다.
  this.name = ''; // SyntaxError: Unexpected token .
}
```

또한 클래스 필드를 참조하는 경우 자바스크립트에서는 this를 반드시 사용해야 한다.

```js
class Person {
  // 클래스 필드
  name = 'Lee';

  constructor() {
    console.log(name); // ReferenceError: name is not defined
  }
}

new Person();
```

클래스 필드에 초기값을 할당하지 않으면 undefined를 갖는다.

```js
class Person {
  // 클래스 필드를 초기화하지 않으면 undefined를 갖는다.
  name;
}

const me = new Person();
console.log(me); // Person {name: undefined}
```

인스턴스를 생성할 때, <strong>외부의 초기값으로 클래스 필드를 초기화 해야할 필요가 있다면</strong> **constructor**에서 클래스 필드를 초기화 해야한다.

```js
class Person {
  name;

  constructor(name) {
    // 클래스 필드 초기화.
    this.name = name;
  }
}

const me = new Person('Lee');
console.log(me); // Person {name: "Lee"}
```

하지만, 위 예제처럼 인스턴스를 생성할 때 클래스 필드를 초기화 할 필요가 있다면 굳이constructor 밖에서 클래스 필드를 정의할 필요가 없다. 어차피 constructor 내부에서 정의된 값으로 인스턴스의 프로퍼티가 생성될 것이기 때문이다.

또한 함수는 값으로 사용될 수 있는 **일급객체** 이므로 클래스 필드에는 함수의 할당이 가능하다.

```js
class Person {
    name = 'lee';
	getName = function() {
        return this.name;
    }
 	// 화살표 함수로 정의할 수도 있다.
    // getName = () => this.name;
}
```

이처럼 클래스 필드에 함수를 할당하는 경우, 이 함수는 프로토타입 메소드가 아닌 <strong>인스턴스 메소드</strong>가 된다. 따라서 클래스 필드에 함수를 할당하는 것은 권장하지 않는다.

클래스 필드에 화살표 함수를 할당하여 화살표 함수 내부의 this가 인스턴스를 가리키도록 하는 경우도 있다.

??? => 아래 예제는 잘 모르겠음.

```js
<!DOCTYPE html>
<html>
<body>
  <button class="btn">0</button>
  <script>
    class App {
      constructor() {
        this.$button = document.querySelector('.btn');
        this.count = 0;

        // increase 메소드를 이벤트 핸들러로 등록
        // 이벤트 핸들러 increase 내부의 this는 DOM 요소(this.$button)를 가리킨다.
        // 하지만 increase는 화살표 함수로 정의되어 있으므로
        // increase 내부의 this는 인스턴스를 가리킨다.
        this.$button.onclick = this.increase;

        // 만약 increase가 화살표 함수가 아니라면 bind 메소드를 사용하여야 한다.
        // $button.onclick = this.increase.bind(this);
      }

      // 인스턴스 메소드
      // 화살표 함수 내부의 this는 언제나 상위 컨텍스트의 this를 가리킨다.
      increase = () => this.$button.textContent = ++this.count;
    }
    new App();
  </script>
</body>
</html>
```

결론적으로 자바스크립트의 클래스에서 인스턴스 프로퍼티를 정의하는 방식은 2가지 이다.

1. 외부 초기값으로 클래스 필드를 초기화할 필요가 있는 경우

   constructor 메소드 내에서 인스턴스 프로퍼티를 정의.

2. 외부 초기값으로 클래스 필드를 초기화할 필요가 없는 경우

   constructor 메소드 내에서 인스턴스 프로퍼티를 정의.

   클래스 필드를 사용한 인스턴스 프로퍼티 정의.

<br>

### private 필드 정의제안

constructor 내부에서 this를 통해 정의한 인스턴스 프로퍼티는 인스턴스를 통해 클래스 외부에서 언제나 참조할 수 있다. 즉 **public**하다.

ES6의 클래스는 다른 객체지향 언어처럼 private, public, protected 키워드와 같은 접근 제한자(access modifier)를 지원하지 않는다.

생성자 함수에서는 클로저를 사용하여 private한 프로퍼티를 흉내낼 수 있었다. 단 private한 프로퍼티를 흉내낸 자유 변수에 접근하면 에러가 발생하지 않고 **undefined**를 반환하므로 아쉬움이 남는다.

```js
// ES5
var Person = (function(){
    	var _name = '';
    
    function Person() {_name = name;}
    
    Person.prototype.sayHi = function() {
        console.log(`hi, my name is _name`);
    };
    
    return Person;
}());

var me = new Person('lee');
```

몸체에 변수를 선언할 수 없는 클래스는 위와 같은 방식으로는 private한 프로퍼티를 흉내낼 수 없다.

```js
class Person {
    let name = ''; // SyntaxError: Unexpected identifier
}
```

클래스 필드 정의제안을 사용하더라도 클래스 필드는 기본적으로 public 하기 때문에 외부에 그대로 노출된다.

```js
class Person {
    name = '';
}
```

현재 TC39 프로세스의 stage3에 private 필드를 정의할 수 있는 새로운 표준사양이 제안되어있다. 표준 사양으로 승급이 확실시 되는 이 제안도 최신 브라우저(Chrome 74 이상)과 최신 최신 Node.js(버전 12 이상)에 이미 구현되어 있다.

<strong>private 필드의 선두에는 `#`을 붙여준다. private 필드를 참조할 때도 #을 붙어주어야 한다.</strong>

```js
class Person {
    #name = '';
    constructor(name) {
        this.#name = name;
    }
}

console.log(new Person('lee')) // 
console.log(new Person('lee').#name);
// Uncaught SyntaxError: Private field '#name' must be declared in an enclosing class
```

> TypeScript
>
> C# 의 창시자인 Anders Hejlsberg 가 개발을 주도한 자바스크립트의 Superset인 TypeScript는 클래스 기반 객체지향 언어가 지원하는 접근 제한자인 public / private / protected를 모두 지원한다.

public 필드는 어디서든지 참조할 수 있지만 private 필드는 클래스 내부에서만 참조가 가능하다.

| 접근가능성                  | public | private |
| --------------------------- | ------ | ------- |
| 클래스 내부                 | O      | O       |
| 자식 클래스 내부            | O      | X       |
| 클래스 인스턴스를 통한 접근 | O      | X       |

부모 클래스를 포함한 클래스 외부에서 private 필드에 직접 접근할 수 있는 방법은 없다. 다만 <strong>접근자 프로퍼티</strong>를 통해 간접적으로 접근하는 방법은 유효하다.

```js
class Person {
    #name = '';
    
    constructor(name) {
        this.#name = name;
    }
	get name() {
        return this.#name.trim() // trim??
    }
}

console.log(new Person('lee').name); // 'lee'
```

<strong>private 필드는 반드시 클래스 몸체에 정의해야 한다.</strong> private 필드를 직접 constructor에 정의하면 에러가 발생한다.

```js
class Person {
    constructor(name) {
        this.#name = name;
        // SyntaxError: Private field '#name' must be declared in an enclosing class
    }
}
```

<br>

### static 필드 정의제안

자바스크립트의 클래스에는 `static` 키워드를 사용하여 정적메소드를 정의할 수 있다. 하지만 static키워드를 사용하여 정적필드를 정의할 수는 없었다.

하지만 static public 필드, static private 필드, static 메소드를 정의할 수 있는 새로운 표준사양인 "Static class features"가 현재 TC39 프로세서의 stage3에 제안되어 있다. 이 제안 중에 static public / private 필드는 현재 최신브라우저(Chrome 72 이상)과 최신 Node.js(버전 12 이상)에 이미 구현되어 있다.

```js
class MyMath {
    // static public 필드 정의
    static PI = 22 / 7;
	// static private 필드 정의
	static #num = 10;
    // static 메소드
    static increment() {
        return ++myMath.#num;
    }
}

console.log(MyMath.PI); // 3.14
console.log(MyMath.increment()); // 11

```

<br>

## 상속에 의한 클래스 확장

### 클래스 상속과 생성자 함수 상속

상속에 의한 클래스 확장은 지금까지 살펴본 프로토타입 기반의 상속과는 다른 개념이다.

- 프로토타입 기반 상속

: <strong>프로토타입 체인</strong>에 의해 다른 객체의 자산을 상속받는 개념.

- 상속에 의한 클래스 확장

: 기존의 **클래스**를 상속받아 새로운 클래스를 확장(extends)하여 정의하는 것.

![image](https://user-images.githubusercontent.com/62285872/82052067-f9c7db80-96f5-11ea-9948-7115c77d167e.png)	

클래스와 생성자 함수는 인스턴스를 생성할 수 있는 함수라는 점에서 매우 유사하다. 하지만 클래스는 상속을 통해 <strong>기존의 클래스를 확장</strong>할 수 있는 문법이 기본적으로 제공되지만 생성자 함수는 그렇지 않다.

아래는 동물을 **추상화**한 Animal 클래스와 새와 사자를 추상화한 Bird, Lion 클래스를 정의하는 예제이다. 새와 사자는 동물에 속하므로 동물의 속성을 갖는다. 하지만 새와 사자는 자신만의 고유한 속성도 가진다. 이 때, Animal 클래스는 동물의 속성을 표현하고 Bird, Lion 클래스는 상속을 통해 동물 클래스의 속성을 그대로 사용하고 자신만의 고유한 속성만을 추가하여 확장할 수 있다.

이는 기존에 존재하는 클래스를 이용한 것으로 코드의 재사용 관점에서 유용하다.

```js
class Animal {
    constructor(age, weight) {
        this.age = age;
        this.weight = weight;
    }
    
    eat() { return 'eat'; }
    
    move() { return 'move'; }
}

class Bird extends Animal {
    fly() { return 'fly'; }
}

const bird = new Bird(1, 5);

console.log(bird);  // Bird { age: 1, weight: 5 }
console.log(bird instanceof Bird); // true
console.log(bird instanceof Animal); // true

console.log(bird.eat());  // eat
console.log(bird.move()); // move
console.log(bird.fly());  // fly
```

클래스는 상속을 통해 다른 클래스를 확장할 수 있는 문법인 **extends** 키워드가 기본적으로 제공된다. extends 키워드를 사용한 클래스 확장은 간편하고 직관적이다. 하지만 생성자 함수는 클래스와 같이 상속을 통해 다른 생성자 함수를 확장할 수 있는 문법이 제공되지 않는다.

자바스크립트는 클래스 기반 언어가 아니므로 생성자 함수를 사용하여 클래스를 흉내 내려는 시도를 권장하지는 않지만 의사 클래스 상속(pseudo classical inheritance) 패턴을 사용하여 상속에 의한 클래스 확장을 흉내 내기도 했다. 클래스의 등장으로 아래 예제와 같은 의사 클래스 상속 패턴은 더 이상 필요하지 않다. 참고로만 살펴보기 바란다.

```js
var Animal = (function () {
    function Animal(age, weight) {
        this.age = age;
        this.weight = weight;
    }
    
    Animal.prototype.eat = function () {
        return 'eat';
    };
    Animal.prototype.move = function () {
        return 'move';
    };
    
    return Animal;
}());

// 클래스 상속에 의한 확장

var Bird = (function() {
    function Bird() {
        Animal.apply(this, arguments);
    }
    
    Bird.prototype = Object.create(Animal.prototype);
    Bird.prototype.constructor = Bird;
    Bird.prototype.fly = function () {
        return 'fly';
    };
    
    return Bird;
}());

var bird = new Bird(1, 5);

console.log(bird); // Bird {age: 1, weight: 5}
console.log(bird.eat());  // eat
console.log(bird.move()); // move
console.log(bird.fly());  // fly
```

<br>

### extends 키워드

상속을 통해 클래스를 확장하려면 extends 키워드를 사용하여 상속받을 클래스를 정의한다.

```js
// 수퍼 클래스
class Base {}

// 서브 클래스
class Derived extends Base {}
```

상속을 통해 확장된 클래스를 **서브클래스** (sub class)라 부르고, 서브 클래스에게 상속된 클래스를 **수퍼클래스** (super class)라 부른다. 서브클래스를 파생클래스(derived class) 또는 자식클래스 (child class), 수퍼클래스를 베이스클래스(base class) 또는 부모클래스(parent class)라고 부르기도 한다.

extends 키워드의 역할은 수퍼 클래스와 서브 클래스 간의 상속관계를 설정하는 것이다. 클래스도 **프로토타입**을 통해 상속관계를 구현한다.

![image](https://user-images.githubusercontent.com/62285872/82052028-ea489280-96f5-11ea-8a62-950927af7fdf.png)	

<strong>수퍼클래스와 서브클래스는 인스턴스의 프로토타입 체인 뿐 아니라, 클래스 간의 프로토타입 체인도 생성한다. 이를통해 프로토타입 메소드, 정적메소드 모두 상속이 가능하다.</strong>

<br>

### 동적 상속

extends 키워드는 <strong>생성자 함수</strong>를 상속받아 클래스를 확장할 수도 있다. 단 extends 키워드 앞에는 반드시 **클래스**가 와야한다.

```js
function Base(a) {
    this.a = a;
}

class Derived extends Base {}

const derived - new Derived(1);
console.log(derived); // Derived {a: 1}
```

extends 키워드 다음에는 클래스뿐만이 아니라 <strong>[[Construct]] 내부 메소드를 갖는 함수 객체를 반환하는 모든 표현식</strong>을 사용할 수 있다. 이를 통해 동적으로 상속받을 대상을 결정할 수 있다.

```js
function Base1() {}

class Base2 {}

let condition = true;

class Derived extends (condition ? Base1 : Base2) {}

const derived = new Derived();
console.log(derived); // Derived {}

console.log(derived instanceof Base1); // true
console.log(derived instanceof Base2); // false
```

<br>

### 서브 클래스의 constructor

앞서 클래스에 constructor를 생략하면 default constructor가 암묵적으로 정의된다고 하였다. 이를 기억해 놓자.

> Rest 파라미터
>
> 매개변수에 ...을 붙이면 Rest 파라미터가 된다. Rest 파라미터는 함수에 전달된 인수들의 목록을 **배열**로 전달받는다.

`super()`는 <strong>수퍼 클래스의 constructor(super-constructor)를 호출하여 인스턴스를 생성한다.</strong>

```js
constructor(...args) { super(...args); }
```

```js
// 수퍼클래스
class Base {}

// 서브클래스
class Derived extends Base {}
```

위 예제는 아래와 같이 암묵적으로 default constructor가 정의된다.

```js
// 수퍼클래스
class Base {
    constructor() {}
}

// 서브클래스
class Derived extends Base {
    constructor() { super(); }
}

const derived = new Derived();
console.log(dervied); // Derived {}
```

위 예제와 같이 수퍼클래스와 서브클래스 모두 constructor를 생략하면 빈 객체가 생성된다. 프로퍼티를 소유하는 인스턴스를 생성하려면 constructor 내부에서 인스턴승 ㅔ프로퍼티를 추가해야 한다.

<br>

### super 키워드

super 키워드는 함수처럼 호출할 수도 있고 this와 같이 식별자처럼 참조할 수 있는 특수한 키워드이다. super는 아래와 같이 동작한다.

- super를 호출하면 수퍼 클래스의 constructor를 호출한다.
- super를 참조하면 수퍼 클래스의 메소드를 호출할 수 있다.

#### super 호출

super를 호출하면 수퍼클래스의 constructor를 호출한다.

만약 수퍼클래스의 constructor 내부에서 추가한 프로퍼티를 그대로 갖는 인스턴스를 생성한다면 서브 클래스의 constructor를 생략할 수 있다. <strong>이 때 new 연산자와 함께 서브 클래스를 호출하면서 전달한 인수는 모두 서브클래스에 암묵적으로 정의된 default constructor의 super 호출을 통해 수퍼클래스의 constructor에게 전달된다.</strong>

```js
// 수퍼 클래스
class Base {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}

// 서브 클래스
class Derived extends Base {
  // 아래와 같이 암묵적으로 디폴트 constructor가 정의된다.
  // constructor(...args) { super(...args); }
}

const derived = new Derived(1, 2);
console.log(derived);  // Derived { a: 1, b : 2 }
```

반면, 수퍼클래스에서 추가한 프로퍼티와 서브클래스에서 추가한 프로퍼티를 갖는 인스턴스를 생성한다면 서브클래스의 constructor를 생략할 수 없다. 이 때 new 연산자와 함꼐 서브 클래스를 호출하면서 전달한 인수 중에서 수퍼 클래스의 constructor에게 전달할 필요가 있는 인수는 서브 클래스의 constructor에서 호출한 <strong>super를 통해 전달한다.</strong>

```js
// 수퍼클래스
class Base {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}

// 서브클래스
class Derived extends Base {
    constructor(a, b, c) {
        super(a, b);
		this.c = c;
    }
}

const derived = new Derived(1, 2, 3);
console.log(derived); // Derived { a: 1, b: 2, c: 3}
```

- super를 호출할 때 주의사항

1. 서브 클래스에서 constructor를 생략하지 않는 경우, 서브 클래스의 constructor에서는 반드시 super를 호출해야 한다.

   ```js
   class Base {}
   
   class Derived extends Base {
       constructor() {
        // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor       
           console.log('constructor call');
       }
   }
   
   const dervied = new Derived();
   ```

2. 서브 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없다.

   ```js
   class Base {}
   
   class Derived extends Base {
       constructor() {
       // ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructo        
           this.a = 1;
           super();
       }
   }
   
   const derived = new Derived(1);
   ```

3. super는 반드시 <strong>서브클래스의 constructor에서만 호출한다.</strong> 서브 클래스가 아닌 클래스 또는 함수에서 호출하면 에러를 발생시킨다.

   ```js
   class Base {
       constructor() {
           super(); // SyntaxError: 'super' keyword unexpected here
       }
   }
   
   function Foo() {
       super(); // SyntaxError: 'super' keyword unexpected here
   }
   ```

   #### super 참조

   메소드 내에서 super를 참조하면 수퍼클래스의 메소드를 호출할 수 있다.

   1. 서브 클래스의 프로토타입 메소드 내에서 super.prop는 수퍼 클래스의 프로토타입 메소드 prop를 가리킨다.

```js
// 수퍼클래스
class Base {
    constructor(name) {
        this.name = name;
    }
    
    sayHi() {
        return `hi! ${this.name}`;
    }
}

// 서브클래스
class Derived extends Base {
    sayHi() {
        return `${super.sayHi().}. how are you doing?`;
    }
}

const derived = new Derived('lee');
console.log(dervied.sayHi()); // hi! lee. how are you doing?
```

super 참조를 통해 수퍼클래스의 메소드를 참조하려면 super가 수퍼클래스의 메소드가 바인딩된 객체, 즉 수퍼클래스의 prototype 프로퍼티에 바인딩된 프로토타입을 참조할 수 있어야 한다. 위 예제는 아래 예제와 동일하게 동작한다.

```js
// 수퍼클래스
class Base {
    constructor(name) {
        this.name = name;
    }
        sayHi() {
        return `hi! ${this.name}`;
    }
}

class Derived extends Base {
    sayHi() {
        const _super = Object.getPrototypeOf(Derived.prototype);
        return `${_super.sayHi.call(this)} how are you doing?`;
    }
}
```

super는 자신이 바인딩되어 있는 객체의 프로토타입을 가리킨다. 위 예제에서 Derived 클래스의 sayHi는 Derived.prototype에 바인딩되어 있고 super는 Derived.prototype의 프로토타입인 Base.prototype을 가리킨다. 따라서 super.sayHi는 Base.prototype.sayHi를 가리킨다. 단, super.sayHi, 즉 Base.prototype.sayHi를 호출할 때 call 메소드를 사용해 this를 전달하여야 한다.

call 메소드를 사용해 this를 전달하지 않고 Base.prototype.sayHi를 그대로 호출하면 Base.prototype.sayHi 메소드 내부의 this는 Base.prototype를 가리킨다. Base.prototype.sayHi 메소드는 프로토타입 메소드이기 때문에 내부의 this는 Base.prototype이 아닌 인스턴스를 가리켜야 한다. name 프로퍼티는 인스턴스에 존재하기 때문이다.

이처럼 super 참조가 동작하기 위해서는 메소드가 자신을 바인딩하고 있는 객체의 프로토타입(위 예제의 경우, Base.prototype)을 찾을 수 있어야 한다. 이를 위해 메소드는 내부 슬롯 [[HomeObject]]를 갖으며 자신을 바인딩한 객체를 가리킨다.

```js
/*
[[HomeObject]]는 메소드 자신을 바인딩한 객체를 가리킨다.
이를 통해 메소드가 자신을 바인딩하고 있는 객체의 프로토타입을 찾을 수 있다.
예를 들어, Derived 클래스의 sayHi 메소드는 Derived.prototype에 바인딩된다.
따라서 Derived 클래스의 sayHi 메소드의 [[HomeObject]]는 Derived.prototype이고
이를 통해 Derived 클래스의 sayHi 메소드 내부의 super 참조가 Base.prototype으로 결정된다.
따라서 super.sayHi는 Base.prototype.sayHi를 가리키게 된다.
*/
super = Object.getPrototypeOf([[HomeObject]])
```

주의할 것은 ES6 사양에서 새롭게 정의한 메소드, 즉 <strong>ES6의 메소드 축약표현으로 정의된 함수만이 [[HomeObject]]를 갖는다</strong>는 것이다.

```js
const obj = {
    // ES6 식 메소드 축약표현 -> [[HomeObject]]를 가짐
    foo() {},
    // 일반함수 -> [[HomeObject]]를 가지지 않음
    bar: function() {}
};
```

super 참조는 클래스의 전유물은 아니다. 객체 리터럴에서도 super 참조를 사용할 수 있다. <strong>단, ES6의 메소드 축약표현으로 정의된 함수만 가능하다.</strong>

```js
const base = {
    name : 'lee',
    sayHi() {
        return `Hi! ${this.name}`;
    }
};

const derived = {
    __proto__ : base,
    // ES6 메소드 축약 표현 메소드-> [[HomeObject]]를 갖는다.
    sayHi() {
        return `${super.sayHi()}. how are you doing?`;
    }
};

console.log(derived.sayHi()); // Hi! lee. how are you doing?
```

2. 서브 클래스의 정적 메소드 내에서 super.prop은 수퍼클래스의 정적메소드 prop을 가리킨다.

```js
// 수퍼클래스
class Base {
    static sayHi() {
        return `hi`;
    }
}

// 서브클래스
class Dervied extends Base {
    static sayHi() {
        return `${super.sayHi()} how are you doing?`;
    }
}
console.log(Derived.sayHi()); // Hi! how are you doing?
```

<br>

### 상속 클래스의 인스턴스 생성과정

```js
class Rectangle {
    constructor(width, height) {
        this.width = width;
        this.height = height;
    }
    getArea() {
        return this.width * this.height;
    }
    toString() {
        return `width = ${this.width}, height = ${this.height}`;
    }
}

class ColorRectangle extends Rectangle {
    constructor(width, height, color) {
        super(width, height);
        this.color = color;
    }
    
    // 메소드 오버라이딩
    toString() {
        return super.toString() + `, color = ${this.color}`;
    }
}

const colorRectangle = new ColorRectangle(2, 4, 'red');
console,log(colorRectangle); 
// ColorRectangle {width: 2, height: 4, color: 'red'}

console.log(colorRectangle.getArea());  // 8
console.log(colorRectangle.toString()); 
// width = 2, height = 4, color = red
```

서브 클래스가 new 연산자와 함께 호출되면 아래의 과정을 통해 인스턴스를 생성한다.

1. 서브클래스의 super 호출

자바스크립트 엔진은 클래스를 평가할 때, 수퍼 클래스와 서브클래스를 구분하기 위해 "base" 또는 "derived"를 값으로 갖는 내부슬롯 [[ConstructorKind]] 를 갖는다. <strong>다른 클래스를 상속받지 않는 클래스는 내부슬롯 [[ConstructorKind]]의 값이 "base"로 설정</strong>되지만 <strong>다른 클래스를 상속받는 서브 클래스는 내부슬롯 [[ConstructorKind]]의 값이 "derived"로 설정</strong>된다. 이를 통해 수퍼클래스와 서브클래스는 new 연산자와 함께 호출되었을 때의 동작이 구분된다.

다른클래스를 상속받지 않는 클래스는 new 연산자와 함께 호출되었을 때 암묵적으로 빈 객체, 즉 인스턴스를 생성하고 이를 this에 바인딩한다.

하지만 서브클래스는 자신이 직접 인스턴스를 생성하지 않고 인스턴스 생성을 수퍼클래스에게 위임한다. 이것이 바로 서브 클래스의 constructor에서 반드시 super를 호출해야하는 이유이다.

서브클래스가 new 연산자와 함께 호출되면 서브클래스의 constructor 내부의 super 키워드가 함수처럼 호출된다. super 키워드를 호출하면 수퍼 클래스의 constructor가 호출된다. 좀 더 정확히 말하자면 수퍼클래스가 평가되어 생성된 함수 객체의 코드가 실행되기 시작한다.

만약 서브클래스 constructor 내부에 super 호출이 없으면 에러가 발생한다. 실제로 인스턴스를 생성하는 주체는 수퍼 클래이므로 수퍼 클래스의 constructor를 호출하는 super가 호출되지 않으면 인스턴스를 생성할 수 없기 때문이다.

2. 수퍼 클래스의 인스턴스 생성과 this 바인딩

수퍼 클래스의 constructor 내부의 코드가 실행되기 이전에 암묵적으로 빈 객체를 생성한다. 이 빈 객체가 바로 클래스가 생성한 인스턴스이다. 그리고 암묵적으로 생성된 빈 객체, 즉 인스턴스는 this에 바인딩된다. 따라서 수퍼 클래스의 constructor 내부의 this는 생성된 인스턴스를 가리킨다.

```js
// 수퍼 클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle
...
```

이 때 인스턴스는 수퍼클래스가 생성한 것이다. <strong>하지만 new 연산자와 함께 호출된 클래스가 서브클래스 라는 것이 중요하다.</strong> 즉, new 연산자와 함께 호출된 함수를 가리키는`new.target`이 가리키는 서브클래스가 생성한 것으로 처리된다.

따라서 <strong>생성된 인스턴스의 프로토타입</strong>은 수퍼클래스의 prototype 프로퍼티가 가리키는 객체가 아니라 <strong>서브클래스의 prototype 프로퍼티가 가리키는 객체</strong>이다.

```js
// 수퍼 클래스
class Rectangle {
  constructor(width, height) {
    // 암묵적으로 빈 객체, 즉 인스턴스가 생성되고 this에 바인딩된다.
    console.log(this); // ColorRectangle {}
    // new 연산자와 함께 호출된 함수, 즉 new.target은 ColorRectangle이다.
    console.log(new.target); // ColorRectangle

    // 생성된 인스턴스의 프로토타입으로 ColorRectangle.prototype가 설정된다.
    console.log(Object.getPrototypeOf(this) === ColorRectangle.prototype); // true
    console.log(this instanceof ColorRectangle); // true
    console.log(this instanceof Rectangle); // true
...
```

3. 수퍼 클래스의 인스턴스 초기화

수퍼 클래스의 constructor가 실행되어 this에 바인딩되어 있는 인스턴스를 초기화한다. 즉, this에 바인딩되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

4. 수퍼 클래스의 프로토타입 / 정적 메소드 추가

수퍼 클래스 몸체에 프로토타입 메소드가 존재하면 수퍼클래스의 prototype 프로퍼티가 가리키는 객체에 메소드로 추가된다. 수퍼 클래스 몸체에 정적 메소드가 존재하면 클래스에 메소드로 추가된다.

5. 서브 클래스 constructor로의 복귀와 this 바인딩

super의 호출이 종료되면 컨트롤은 서브클래스의 constructor로 복귀한다. 이 때 super가 반환한 인스턴스가 this에 바인딩 된다. 이처럼 서브 클래스는 별도의 인스턴스를 생성하지 않고 super가 반환한 인스턴스를 this에 바인딩하여 그대로 사용한다.

<strong>때문에 super가 호출되지 않으면 인스턴스가 생성되지 않으며 this 바인딩도 할 수 없다. 서브 클래스의 constructor에서 super를 호출하기 전에는 this를 참조할 수 없는 이유는 바로 이 때문이다. 따라서 서브 클래스 constructor 내부의 인스턴스 초기화는 반드시 super 호출 이후에 처리 되어야 한다.</strong>

6. 서브 클래스의 인스턴스 초기화

super 호출 이후, 서브 클래스의 constructor에 기술되어 있는 인스턴스 초기화가 실행된다. 즉, this에 바인딩 되어 있는 인스턴스에 프로퍼티를 추가하고 constructor가 인수로 전달받은 초기값으로 인스턴스의 프로퍼티를 초기화한다.

7. 인스턴스 반환

클래스의 모든 처리가 끝나면 완성된 인스턴스가 바인딩된 this가 암묵적으로 반환된다.

<br>

### 표준 빌트인 생성자 함수 확장

extends 키워드 다음에는 클래스뿐만이 아니라 [[Construct]] 내부 메소드를 갖는 함수 객체를 반환하는 모든 **표현식**을 사용할 수 있다. <strong>String, Number, Array와 같은 표준 빌트인 객체</strong>도 [[Construct]] 내부 메소드를 갖는 생성자 함수이므로 extends 키워드를 사용하여 확장할 수 있다.

```js
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
  // 중복된 배열 요소를 제거하고 반환한다: [1, 1, 2, 3] => [1, 2, 3]
  uniq() {
    return this.filter((v, i, self) => self.indexOf(v) === i);
  }

  // 모든 배열 요소의 평균을 구한다: [1, 2, 3] => 2
  average() {
    return this.reduce((pre, cur) => pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);
console.log(myArray); // MyArray(4) [1, 1, 2, 3]

// MyArray.prototype.uniq 호출
console.log(myArray.uniq()); // MyArray(3) [1, 2, 3]
// MyArray.prototype.average 호출
console.log(myArray.average()); // 1.75
```

Array 생성자 함수를 상속받아 확장한 MyArray 클래스가 생성한 인스턴스는 Array.prototype와 MyArray.prototype의 모든 메소드를 사용할 수 있다.

이때 주의할 것은 Array.prototype의 메소드 중에서 map, filter와 같이 새로운 배열을 반환하는 메소드가 MyArray 클래스의 인스턴스를 반환한다는 것이다.??

```js
console.log(myArray.filter(v => v % 2) instanceof MyArray); // true
```

만약 새로운 배열을 반환하는 메소드가 MyArray 클래스의 인스턴스를 반환하지 않고 Array의 인스턴스를 반환하면 MyArray 클래스의 메소드와 메소드 체이닝(method chaining)이 불가능하다.

myArray.filter가 반환하는 인스턴스는 MyArray 클래스가 생성한 인스턴스, 즉 MyArray 타입이다. 따라서 myArray.filter가 반환하는 인스턴스로 uniq 메소드를 연이어 호출(메소드 체이닝)할 수 있다. uniq 메소드가 반환하는 인스턴스는 Array.prototype.filter에 의해 생성되었기 때문에 Array 생성자 함수가 생성한 인스턴스로 생각할 수도 있겠다. 하지만 uniq 메소드가 반환하는 인스턴스도 MyArray 타입이다. 따라서 uniq 메소드가 반환하는 인스턴스로 average 메소드를 연이어 호출(메소드 체이닝)할 수 있다.

만약 MyArray 클래스의 uniq 메소드가 MyArray 클래스가 생성한 인스턴스가 아닌 Array가 생성한 인스턴스를 반환하도록 하려면 아래와 같이 <strong>Symbol.species</strong>를 사용하여 <strong>정적 접근자 프로퍼티를 추가한다.</strong>

```js
// Array 생성자 함수를 상속받아 확장한 MyArray
class MyArray extends Array {
  // 모든 메소드가 Array 타입의 인스턴스를 반환하도록 한다.
  static get [Symbol.species]() { return Array; }

  // 중복된 배열 요소를 제거하고 반환한다: [1, 1, 2, 3] => [1, 2, 3]
  uniq() {
    return this.filter((v, i, self) => self.indexOf(v) === i);
  }

  // 모든 배열 요소의 평균을 구한다: [1, 2, 3] => 2
  average() {
    return this.reduce((pre, cur) => pre + cur, 0) / this.length;
  }
}

const myArray = new MyArray(1, 1, 2, 3);

console.log(myArray.uniq() instanceof MyArray); // false
console.log(myArray.uniq() instanceof Array); // true

// 메소드 체이닝
// uniq 메소드는 Array 인스턴스를 반환하므로 average 메소드를 호출할 수 없다.
console.log(myArray.uniq().average());
// TypeError: myArray.uniq(...).average is not a function
```

