# 클래스

- Toc

1. [클래스는 프로토타입의 문법적 설탕인가?](#클래스는-프로토타입의-문법적-설탕인가)
2. [클래스 정의](#클래스-정의)
3. [클래스 호이스팅](#클래스-호이스팅)
4. [인스턴스 생성](#인스턴스-생성)
5. [메소드](#메소드)

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

