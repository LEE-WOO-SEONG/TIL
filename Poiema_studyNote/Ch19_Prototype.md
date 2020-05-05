# Prototype

- Toc

1. [객체지향 프로그래밍](#객체지향-프로그래밍)

2. [상속과 프로토타입](#상속과-프로토타입)

3. [프로토타입 객체](#프로토타입-객체)

   3-1. [proto 접근자 프로퍼티](#proto-접근자-프로퍼티)

   3-2. [함수 객체의 prototype 프로퍼티](#함수-객체의-prototype-프로퍼티)

   3-3. [프로토타입의 constructor 프로퍼티와 생성자 함수](#프로토타입의-constructor-프로퍼티와-생성자-함수)

4. [리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입](#리터럴-표기법에-의해-생성된-객체의-생성자-함수와-프로토타입)

5. [프로토타입의 생성시점](#프로토타입의-생성시점)

   5-1. [사용자 정의 생성자함수와 프로토타입 생성시점](#사용자-정의-생성자함수와-프로토타입-생성시점)

   5-2. [빌트인 생성자 함수와 프로토타입 생성시점](#빌트인-생성자-함수와-프로토타입-생성시점)

6. [객체생성방식과 프로토타입의 결정](#객체생성방식과-프로토타입의-결정)

7. [프로토타입 체인](#프로토타입-체인)

8. [캡슐화](#캡슐화)

9. [오버라이딩과 프로퍼티 쉐도잉](#오버라이딩과-프로퍼티-쉐도잉)

<br>

<br>

자바스크립트는 명령형(Imperative), 함수형(Functional), 프로토타입 기반(Prototype-based) 객체지향형 프로그래밍(Object Oriented Programming)을 지원하는 멀티 패러다임 프로그래밍 언어이다.

간혹 C++, java와 같은 **클래스기반** 객체지향 프로그래밍 언어의 특징인 클래스와 상속, 캡슐화를 위한 키워드 (private/ public / protected) 등이 없어서 자바스크립트는 객체지향 언어가 아니라고 오해하는 경우도 있지만 자바스크립트는 클래스 기반 객체지향 프로그래밍 언어보다 효율적이며 강력한 객체지향 프로그래밍 능력을 지니고 있는 **프로토타입** 기반의 객체지향 프로그래밍 언어이다.

> 클래스(class)?
>
> ES6에서 클래스가 새롭게 도입되었다. 하지만 ES6의 클래스가 기존의 프로토타입 기반 객체지향 모델을 폐지하고 새로운 객체지향 모델을 제공하는 것은 아니다. 사실 클래스도 함수이며 기존 프로토타입 기반 패턴의 [문법적 설탕](https://en.wikipedia.org/wiki/Syntactic_sugar) 이라고 볼 수 있다.
>
> 하지만 클래스와 생성자 함수가 모두 프로토타입 기반의 인스턴스를 생성하지만 정확히 동일하게 동작하지는 **않는다.** 클래스는 생성자 함수보다 엄격하며 생성자 함수에서는 제공하지 않는 기능을 제공하기도 한다.
>
> 따라서 클래스를 프로토타입 기반 객체생성패턴의 단순한 문법적 설탕이라는 표현보다는 새로운 객체생성 메커니즘으로 보는것이 합당하다고 할 수 있다.

<strong>자바스크립트는 객체 기반의 프로그래밍 언어이며 자바스크립트를 이루고 있는 거의 '모든 것'이 객체이다.</strong> 자바스크립트에서 원시타입의 값을 제외한 나머지 값들은 모두 객체이다.

<br>

## 객체지향 프로그래밍

객체지향 프로그래밍은 프로그램을 명령어 또는 함수의 목록으로 보는 전통적인 명령형 프로그래밍(Imperative Programming)의 절차지향적 관점에서 벗어나 여러개의 독립적 단위, 즉 객체들의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임을 말한다.

객체지향 프로그래밍은 실세계의 **실체**(사물이나 개념)를 인식하는 철학적 사고를 프로그래밍에 접목하려는 시도에서 시작한다. 실체는 특징이나 성질을 나타내는 **속성**(attribute, property)을 가지고 있으며 이를 통해 실체를 인식하거나 구별할 수 있다.

예를 들어 사람은 이름, 주소, 성별, 나이, 신장, 체중, 학력, 성격, 직업 등 다양한 속성을 갖는다. 이때 “이름이 아무개이고 성별은 여성이며 나이는 20세인 사람”과 같이 속성을 구체적으로 표현하면 특정한 사람을 다른 사람과 구별하여 인식할 수 있다.

이러한 방식을 프로그래밍에 접목시켜보자. 사람에게는 다양한 속성이 있으나 우리가 구현하려는 프로그램에서는 사람의 “이름”, “주소”라는 속성에만 관심이 있다고 가정하자. 이처럼 다양한 속성 중에서 프로그램에 필요한 속성만을 간추려 내어 표현하는 것을 <strong>추상화(abstraction)</strong>라 한다.

```javascript
// 이름과 주소 속성을 갖는 객체
const person = {
    name: 'Lee',
    address: 'Seoul'
};
```

이때 프로그래머는 이름과 주소 속성으로 표현된 객체인 person을 다른 객체와 구별하여 인식할 수 있다. <strong>이처럼 속성을 통해 여러개의 값을 하나의 단위로 구성한 복합적인 자료구조를 객체라 하며 객체지향 프로그래밍은 독립적인 객체의 집합으로 프로그램을 표현하려는 프로그래밍 패러다임이다.</strong>

```javascript
const circle = {
  radius: 5, // 반지름

  // 원의 지름: 2r
  getDiameter() {
    return 2 * this.radius;
  },

  // 원의 둘레: 2πr
  getPerimeter() {
    return 2 * Math.PI * this.radius;
  },

  // 원의 넓이: πrr
  getArea() {
    return Math.PI * Math.pow(this.radius, 2);
  }
};

console.log(circle);
// {radius: 5, getDiameter: ƒ, getPerimeter: ƒ, getArea: ƒ}

console.log(circle.getDiameter());  // 10
console.log(circle.getPerimeter()); // 31.41592653589793
console.log(circle.getArea());      // 78.53981633974483
```

객체지향 프로그래밍은 객체의 **상태**(state)를 나타내는 데이터와 상태 데이터를 조작할수 있는 **동작**(behavior)을 하나의 논리적인 단위로 묶어 생각한다. 객체의 상태 데이터를 프로퍼티(property), 동작을 메소드(method)라 부른다.

<br>

## 상속과 프로토타입

**상속**(Inheritance)은 객체지향 프로그래밍의 핵심개념으로 어떤 객체의 프로퍼티 또는 메소드를 다른 객체가 상속받아 그대로 사용할 수 있는 것을 말한다.

자바스크립트는 프로토타입을 기반으로 상속을 구현하여 불필요한 **중복**을 제거한다. 중복을 제거하는 방법은 기존의 코드를 적극적으로 재사용하는 것이다.

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
  this.getArea = function () {
    // Math.PI는 원주율을 나타내는 상수이다.
    // Math.pow는 첫번째 인수를 두번째 인수로 거듭제곱한 값을 반환한다.
    return Math.PI * Math.pow(this.radius, 2);
  };
}

// 인스턴스 생성
// 반지름이 1인 인스턴스 생성
const circle1 = new Circle(1);
// 반지름이 2인 인스턴스 생성
const circle2 = new Circle(2);

// Circle 생성자 함수는 인스턴스를 생성할 때마다 동일한 동작을 하는
// getArea 메소드를 중복 생성하고 모든 인스턴스가 중복 소유한다.
// 따라서 getArea 메소드는 하나만 생성하여 모든 인스턴스가 공유하는 것이 바람직하다.
console.log(circle1.getArea === circle2.getArea); // false

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

위 코드를 보면 Circle 생성자 함수가 생성하는 모든 객체(인스턴스)는 radius 프로퍼티와 geArea 메소드를 갖는다. 여기서 radius 프로퍼티 값은 인스턴스마다 다를 수 있으나 getArea 메소드는 모든 인스턴스가 동일한 내용의 메소드를 사용하고 있다.

하지만 인스턴스를 생성할 때마다 메소드는 중복으로 생성되고 있다. 이렇게 동일한 생성자함수에 의해 생성된 모든 인스턴스가 동일한 메소드를 **중복소유** 하는것은 메모리를 불필요하게 **낭비**하는 행위이다. 또한 인스턴스를 생성할 때마다 메소드를 생성하므로 퍼포먼스 측면에서도 악영향을 준다. 

![image](https://user-images.githubusercontent.com/62285872/81036146-f0aa6380-8ed8-11ea-8963-3e883bdaa7b3.png)

낭비를 줄이기 위해 상속을 통해 불필요한 중복을 제거해 보도록 하자. 자바스크립트는 **프로토타입**을 기반으로 상속을 구현한다.

```javascript
// 생성자 함수
function Circle(radius) {
  this.radius = radius;
}

// Circle 생성자 함수가 생성한 모든 인스턴스가 공유할 수 있도록 getArea 메소드를 프로토타입에 추가한다.
// 프로토타입은 Circle 생성자 함수의 prototype 프로퍼티에 바인딩되어 있다.
Circle.prototype.getArea = function () {
  return Math.PI * Math.pow(this.radius, 2);
};

// 인스턴스 생성
const circle1 = new Circle(1);
const circle2 = new Circle(2);

// Circle 생성자 함수가 생성한 모든 인스턴스는 부모 객체의 역할을 하는
// 프로토타입 Circle.prototype로부터 getArea 메소드를 상속받는다.
// 즉, Circle 생성자 함수가 생성하는 모든 인스턴스는 하나의 getArea 메소드를 공유한다.
console.log(circle1.getArea === circle2.getArea); // true

console.log(circle1.getArea()); // 3.141592653589793
console.log(circle2.getArea()); // 12.566370614359172
```

![image](https://user-images.githubusercontent.com/62285872/81036320-a970a280-8ed9-11ea-9fc4-54ae30fe9ccf.png)

Circle 생성자함수가 생성한 모든 인스턴스는 자신의 프로토타입 객체인 Circle.prototype의 모든 프로퍼티와 메소드를 **상속**받는다.

위 코드처럼 메소드를 Circle 생성자 함수의 상위객체인 Circle.prototype에 할당 해 두고 Circle 생성자 함수에는 변하는 데이터상태만을 구현 해 놓으면 동일한 내용의 메소드가 불필요하게 중복생성되어지는 것을 막을 수 있으며 가장 상위 객체의 있는 1개의 메소드를 상속에 의해 자유롭게 사용하여 효율적인 코드구현이 가능하다.

이처럼 생성자함수가 생성할 모든 인스턴스가 공통적으로 사용할 프로퍼티나 메소드를 최상위 객체인 프로토타입에 미리 구현해 놓으면 상속을 통해 자유롭게 사용이 가능하다. 

<br>

## 프로토타입 객체

프로토타입은 어떤 객체의 상위 객체의 역할을 하는 객체로 다른 객체에 공유 프로퍼티를 제공한다. 프로토타입을 상속받은 하위 객체는 상위 객체의 프로퍼티의 자유로운 사용이 가능하다.

모든객체는 [[Prototype]] 이라는 내부슬롯을 가지며 이 내부슬롯의 값은 프로토타입의 참조이다. [[Prototype]]에 저장되는 프로토타입은 객체가 생성될 때 객체 생성방식에 의해 결정된다.

- 객체리터럴에 의해 생성된 객체의 프로토타입 - Object.prototype
- 생성자 함수에 의해 생성된 객체의 프로토타입 - 생성자함수의 prototype 프로퍼티에 바인딩 되어있는 객체.

모든 객체는 **하나**의 프로토타입을 갖는다.([[Prototype]] 내부 슬롯의 값이 null인 객체는 프로토 타입이 없다.) 그리고 모든 프로토타입은 생성자 함수와 연결되어 있다. 즉, 객체와 프로토타입과 생성자함수는 서로 연결되어 있다.

[[Prototype]] 내부 슬롯에 직접 접근할 수 없지만, 객체는 _ _ proto _ _ 접근자 프로퍼티를 통해 자신의 프로토타입에 간접적으로 접근이 가능하다. 그리고 포로토타입은 자신의 constructor 프로퍼티를 통해 생성자 함수에 접근할 수 있고, 생성자 함수는 자신의 prototype 프로퍼티를 통해 프로토타입에 접근할 수 있다.

![image](https://user-images.githubusercontent.com/62285872/81037039-4cc2b700-8edc-11ea-96b4-4b6d5c80eea8.png)

<br>

### proto 접근자 프로퍼티

모든 객체는 _ _ proto _ _ 접근자 프로퍼티를 통해 자신의 프로토타입 즉, [[Prototype]] 내부슬롯에 간접적으로 접근이 가능하다.

```javascript
const person = { name: 'Lee' };
```

![image](https://user-images.githubusercontent.com/62285872/81037225-dbcfcf00-8edc-11ea-88a2-ce06779a4c05.png)	

위 그림의 빨간 박스로 표시한 것이 person 객체의 프로토타입인 Object.prototype이다. 이는 _ _ proto _ _ 접근자 프로퍼티를 통해 person 객체의 [[Prototype]] 내부 슬롯이 가리키는 객체인 Object.prototype에 접근한 결과를 크롬 브라우저가 콘솔에 표시한 것이다. 이처럼 모든 객체는 _ _ proto _ _ 접근자 프로퍼티를 통해 프로토타입을 가리키는 [[Prototype]] 내부 슬롯에 접근할 수 있다.

<br>

#### _ _ proto _ _는 접근자 프로퍼티이다.

접근자 프로퍼티티는 자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 사용하는 **접근자함수**로 구성된 프로퍼티이다.

![image](https://user-images.githubusercontent.com/62285872/81037357-61ec1580-8edd-11ea-8c79-43abfe4adda8.png)	

접근자 프로퍼티 _ _ proto _ _는 getter / setter 함수라고 부르는 접근자 함수를 통해 [[Prototype]] 내부슬롯의 값인 프로토타입을 취득하거나 할당한다.

_ _ proto _ _접근자 프로퍼티를 통해 프로토타입에 접근하면 내부적으로 getter 함수인 get _ _ proto _ _가 호출되며 새로운 프로토타입을 할당하면 setter 함수인 set _ _ proto _ _가 호출된다.  

```javascript
const obj = {};
const parent = { x: 1 };

// getter 함수인 get __proto__가 호출되어 obj 객체의 프로토타입을 취득
obj.__proto__;
// setter함수인 set __proto__가 호출되어 obj 객체의 프로토타입을 교체
obj.__proto__ = parent;

console.log(obj.x); // 1
```

<br>

#### _ _ proto _ _ 접근자 프로퍼티는 상속을 통해 사용된다.

_ _ proto _ _ 접근자 프로퍼티는 객체가 직접 소유하는 프로퍼티가 아니라 Object.prototype의 프로퍼티이다. 모든 객체는 상속을 통해 Object.prototype._ _ proto _ _ 접근자 프로퍼티를 사용할 수 있다.

```javascript
const person = { name: 'Lee' };

// person 객체는 __proto__ 프로퍼티를 소유하지 않는다.
console.log(person.hasOwnProperty('__proto__')); // false

// __proto__ 프로퍼티는 모든 객체의 프로토타입 객체인 Object.prototype의 접근자 프로퍼티이다.
console.log(Object.getOwnPropertyDescriptor(Object.prototype, '__proto__'));
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 모든 객체는 Object.prototype의 접근자 프로퍼티 __proto__를 상속받아 사용할 수 있다.
console.log({}.__proto__ === Object.prototype); // true
```

> Object.prototype?
>
> 모든 객체는 프로토타입의 계층구조인 프로토타입 체인에 묶여있다. 자바스크립트 엔진은 객체의 프로퍼티에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 _ _ proto _ _ 접근자 프로퍼티가 가리키는 링크를 따라 자신의 부모역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. 프로토타입 체인의 최상위 객체는 **Object.prototype**이며 이 객체의 프로퍼티와 메소드는 모든 객체에게 상속된다.

<br>

#### _ _ proto _ _ 접근자 프로퍼티를 통해 프로토타입에 접근하는 이유

[[Prototype]] 내부 슬롯의 값인 프로토타입에 접근하기 위해 접근자 프로퍼티를 사용하는 이유는 <strong>상호 참조에 의해 프로토타입 체인이 생성되는 것을 방지하기 위함이다.</strong>

```javascript
const parent = {};
const child = {};

// child의 프로토타입을 parent로 설정
child.__proto__ = parent;
// parent의 프로토타입을 child로 설정
parent.__proto__ = child; // TypeError: Cyclic __proto__ value
```

위 예제는 parent 객체를 child 객체의 프로토타입으로 설정한 후, child 객체를 parent 객체의 프로토타입으로 설정하였다. 이러한 코드가 에러없이 정상적으로 처리되면 서로가 자신의 프로토타입이 되는 비정상적인 프로토타입 체인이 만들어 지기 때문에 _ _ proto _ _ 접근자 프로퍼티는 에러를 발생시킨다.

<strong><em>프로토타입 체인은 단방향 링크드 리스트로 구현되어야 한다.</em></strong> 즉, 프로퍼티 검색방향이 한쪽 방향으로만 흘러가야 한다. 하지만 위 예제처럼 순환참조적인 프로토타입 체인이 만들어지면 프로토타입 체인 종점이 존재하지 않기 때문에 프로토타입 체인에서 프로퍼티를 검색할 때 무한루프에 빠지게 된다. 

>  따라서 아무런 체크없이 무조건적으로 프로토타입을 교체할 수 없도록 _ _ proto _ _ 접근자 프로퍼티를 통해 프로토타입에 접근하고 교체하도록 구현되어 있다? => 뭔말인지 모르겠따...

<br>

#### _ _ proto _ _ 접근자 프로퍼티를 코드 내에서 직접 사용하는 것은 비추천이다.

_ _ proto _ _ 접그자 프로퍼티는 ES5까지 ECMAScript 사양에 포함되지 않은 비표준이었다. 하지만 일부 브라우저에서 _ _ proto _ _ 를 지원하고 있었기 때문에 브라우저 호환성을 고려하여 ES6에서 _ _ proto _ _를 표준으로 채택하였다.

하지만 코드 내에서 _ _ proto _ _ 를 **직접** 사용하는 것은 추천하지 않는다. 그 이유는 모든 객체가 해당 접근자 프로퍼티를 사용할 수 있는 것은 아니기 때문이다.

```javascript
// obj는 프로토타입 체인의 종점이다. 따라서 Object.__proto__를 상속받을 수 없다.
const obj = Object.create(null);

// obj는 Object.__proto__를 상속받을 수 없다.
console.log(obj.__proto__); // undefined

// 따라서 Object.getPrototypeOf 메소드를 사용하는 편이 좋다.
console.log(Object.getPrototypeOf(obj)); // null
```

따라서 프로토타입의 참조를 취득하고 싶은 경우 `Object.getPropertyOf` 메소드를, 프로토타입을 교체하고 싶은 경우 `Object.setPropertyOf` 메소드를 사용할 것을 권장한다.

```javascript
const obj = {};
const parent = { x: 1 };

// obj 객체의 프로토타입을 취득
Object.getPrototypeOf(obj); // obj.__proto__;
// obj 객체의 프로토타입을 교체
Object.setPrototypeOf(obj, parent); // obj.__proto__ = parent;

console.log(obj.x); // 1
```

`Object.getPrototypeOf` 메소드 와 `Object.setPrototypeOf` 메소드는 get Object.prototype._ _ proto _ _와 set Object.prototype. _ _ proto _ _의 처리 내용과 정확히 일치한다. Object.getPrototypeOf 메소드는 ES5에서 도입된 메소드이며 IE9 이상을 지원한다. Object.setPrototypeOf 메소드는 ES6에서 도입된 메소드이며 IE11 이상을 지원한다.

<br>

### 함수 객체의 prototype 프로퍼티

함수객체는 _ _ proto _ _ 접근자 프로퍼티 이외에 **prototype** 프로퍼티도 소유한다. 함수 객체만이 소유하는 prototype 프로퍼티는 <strong>생성자 함수가 생성할 인스턴스의 프로토타입</strong>을 가리킨다.

```javascript
// 함수 객체는 prototype 프로퍼티를 소유한다.
console.log((function () {}).hasOwnProperty('prototype')); // true

// 일반 객체는 prototype 프로퍼티를 소유하지 않는다.
console.log({}.hasOwnProperty('prototype')); // false
```

prototype 프로퍼티는 생성자 함수로 호출할 수 없는 non-constructor인 화살표함수와 메소드가 소유할 수 없는 프로퍼티이다.

```javascript
// 화살표 함수는 non-constructor이다.
const Person = name => {
  this.name = name;
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(Person.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(Person.prototype); // undefined

// ES6의 메소드 축약 표현으로 정의한 메소드는 non-constructor이다.
const obj = {
  foo() {}
};

// non-constructor는 prototype 프로퍼티를 소유하지 않는다.
console.log(obj.foo.hasOwnProperty('prototype')); // false

// non-constructor는 프로토타입을 생성하지 않는다.
console.log(obj.foo.prototype); // undefined
```

생성자 함수로 호출이 가능한 일반함수인 함수선언문 / 함수표현식 또한 prototype 프로퍼티를 소유하지만 객체를 생성하지 않는 일반함수의 prototype 프로퍼티는 아무런 의미가 없다.

<strong>모든 객체가 가지고 있는(엄밀히 말하면 Object.prototype로부터 상속받은) _ _ proto _ _ 접근자 프로퍼티와 함수 객체만이 가지고 있는 prototype 프로퍼티는 결국 동일한 프로토타입을 가리킨다.</strong> 하지만 이들 프로퍼티를 사용하는 주체가 다르다.

| 구분                          | 소유     | 값                | 사용주체    | 사용목적                                                     |
| ----------------------------- | -------- | ----------------- | ----------- | ------------------------------------------------------------ |
| _ _ proto _ _ 접근자 프로퍼티 | 모든객체 | 프로토타입의 참조 | 모든객체    | 객체가 자신의 프로토타입에 접근 또는 교체하기 위해 사용      |
| prototype 프로퍼티            | 함수객체 | 프로토타입의 참조 | 생성자 함수 | 생성자 함수가 자신이 생성할 객체(인스턴스)의 프로토타입을 할당하기 위해 사용 |

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 결국 Person.prototype와 me.__proto__는 결국 동일한 프로토타입을 가리킨다.
console.log(Person.prototype === me.__proto__);  // true
```

![image](https://user-images.githubusercontent.com/62285872/81040816-31a97480-8ee7-11ea-8c46-b37d94442755.png)

<br>

### 프로토타입의 constructor 프로퍼티와 생성자 함수

모든 프로토타입은 constructor 프로퍼티를 갖는다. constructor 프로퍼티는 prototype 프로퍼티로 자신을 참조하고 있는 **생성자함수** 를 가리킨다. 이 연결은 생성자 함수가 **생성**될 때, 즉 함수객체가 생성될 때 이루어진다.

```javascript
// 생성자 함수
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// me 객체의 생성자 함수는 Person이다.
console.log(me.constructor === Person);  // true
```

위 예제에서 Person 생성자 함수는 me 객체를 생성했다. 이때 me 객체는 프로토타입의 contructor 프로퍼티를 통해 생성자 함수와 연결된다. me 객체에는 constructor 프로퍼티가 없지만 me 객체의 프로토타입인 Person.prototye에 constructor 프로퍼티가 있다. me 객체는 프로토타입인 Person.prototye에 constructor 프로퍼티를 상속받아 사용할 수 있다.

<br>

## 리터럴 표기법에 의해 생성된 객체의 생성자 함수와 프로토타입

생성자 함수에 의해 생성된 인스턴스는 프로토타입의 constructor 프로퍼티에 의해 생성자 함수와 연결된다.

리터럴 표기법에 의해 생성된 객체도 프로토타입이 존재한다. 하지만 리터럴 표기법에 의해 생성된 객체의 경우, 프로토타입의 constructor 프로퍼티가 가리키는 생성자 함수가 반드시 객체를 생성한 생성자 함수라고 단정할 수는 없다.

```javascript
// 객체 obj는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴로 생성하였다.
const obj = {};

// 하지만 객체 obj의 생성자 함수는 Object 생성자 함수이다.
console.log(obj.constructor === Object); // true
```

위 예제의 객체 obj는 Object 생성자 함수로 생성한 객체가 아니라 객체 리터럴에 의해 생성된 객체이다. 하지만 객체 obj는 Object 생성자 함수와 constructor 프로퍼티로 연결되어 있다. 그렇다면 객체 리터럴에 의해 생성된 객체는 사실 Object 생성자 함수로 생성되는 것은 아닐까? ECMAScript 사양을 살펴보자. Object 생성자 함수는 아래와 같이 동작하도록 정의되어 있다.

![image](https://user-images.githubusercontent.com/62285872/81043549-615b7b00-8eed-11ea-9ed4-aaff96edc23b.png)

Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작한다. 그리고 인수가 전달되지 않았을 때 추상 연산 ObjectCreate을 호출하여 빈 객체를 생성한다. 인수가 전달된 경우에는 인수를 객체로 변환한다.

> 추상연산(abstract operation)
>
> 추상연산은 ECMAScript 사양에서 내부 동작의 구현 알고리즘을 표현한 것이다. ECMAScript 사양에서 설명을 위해 사용되는 함수와 유사한 의사코드? 라고 이해하자.

```javascript
// Object 생성자 함수에 의한 객체 생성
let obj = new Object();
console.log(obj); // {}

// Object 생성자 함수는 new 연산자와 함께 호출하지 않아도 new 연산자와 함께 호출한 것과 동일하게 동작한다.
// 인수가 전달되지 않았을 때 추상 연산 ObjectCreate을 호출하여 빈 객체를 생성한다.
obj = Object();
console.log(obj); // {}

// 인수가 전달된 경우에는 인수를 객체로 변환한다.
// Number 객체 생성
obj = new Object(123);
console.log(obj); // Number {123}

// String  객체 생성
obj = new Object('123');
console.log(obj); // String {"123"}
```

객체 리터럴이 평가될 때는 아래와 같이 추상 연산 ObjectCreate을 호출하여 빈객체를 생성하고 프로퍼티를 추가하도록 정의되어 있다.

![image](https://user-images.githubusercontent.com/62285872/81043733-cd3de380-8eed-11ea-8483-9e9b73ff29a1.png)

이처럼 Object 생성자 함수호출과 객체 리터럴의 평가는 추상연산 ObjectCreate를 호출하여 빈 객체를 생성하는 점에서는 동일하나 new.target 확인이나 프로퍼티를 추가하는 처리 등의 세부내용은 다르다. 따라서 <strong>객체 리터럴에 의해 생성된 객체는 Object 생성자 함수가 생성한 객체가 아니다.</strong>

함수객체의 경우 또한 Function 생성자 함수방식으로 생성한 함수는 렉시컬 스코프를 만들지 않고 전역 함수인 것처럼 스코프를 생성하며 클로저도 만들지 않는다. 따라서 <strong>함수 선언문과 함수 표현식을 평가하여 함수 객체를 생성한 것은 Function 생성자 함수가 아니다.</strong> 하지만 constructor 프로퍼티를 통해 확인 해 보면 함수 foo의 생성자 함수는 Function 생성자 함수이다.

```javascript
// 함수 foo는 Function 생성자 함수로 생성한 함수 객체가 아니라 함수 선언문으로 생성하였다.
function foo() {}

// 하지만 constructor 프로퍼티를 통해 확인해보면 함수 foo의 생성자 함수는 Function 생성자 함수이다.
console.log(foo.constructor === Function); // true
```

리터럴 표기법에 의해 생성된 객체도 상속을 위해 프로토타입이 필요하다. 따라서 리터럴 표기법에 의해 생성된 객체도 **가상적인** 생성자 함수를 갖는다. 프로토타입은 생성자함수와 더불어 생성되며 prototype, constructor 프로퍼티에 의해 연결되어 있기 때문이다. <strong>다시말해 프로토타입과 생성자 함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재한다.</strong>

리터럴 표기법(객체 리터럴, 함수 리터럴, 배열 리터럴, 정규 표현식 리터럴 등)에 의해 생성된 객체는 생성자 함수에 의해 생성된 객체는 아니다. 하지만 큰 틀에서 생각해 보면 리터럴 표기법으로 생성한 객체도 생성자 함수로 생성한 객체와 본질적인 면에서 큰 차이는 없다.

예를 들어, 객체 리터럴에 의해 생성한 객체와 Object 생성자 함수에 의해 생성한 객체는 생성 과정에 차이는 있지만 결국 객체로서 동일한 특성을 갖는다. 함수 리터럴에 의해 생성한 함수와 Function 생성자 함수에 의해 생성한 함수는 생성 과정과 스코프, 클로저 등의 차이가 있지만 결국 함수로서 동일한 특성을 갖는다.

따라서 프로토타입의 constructor 프로퍼티를 통해 연결되어 있는 생성자함수를 / 리터럴 표기법으로 생성한 객체를 생성한 생성자 함수로 생각해도 크게 무리는 없다.

| 리터럴 표기법      | 생성자 함수 | 프로토타입         |
| :----------------- | :---------- | :----------------- |
| 객체 리터럴        | Object      | Object.protptype   |
| 함수 리터럴        | Function    | Function.prototype |
| 배열 리터럴        | Array       | Array.prototype    |
| 정규 표현식 리터럴 | RegExp      | RegExp.protptype   |

<br>

## 프로토타입의 생성시점

리터럴 표기법에 의해 생성된 객체도 생성자 함수와 연결되어있다. 객체는 리터럴 표기법 혹은 생성자 함수에 의해 생성되므로 <strong>결국 모든 객체는 생성자 함수와 연결되어 있다.</strong>

> 프로토 타입은 생성자 함수가 생성되는 시점에 더불어 생성된다. 프로토타입과 생성자함수는 단독으로 존재할 수 없고 언제나 쌍으로 존재하기 때문이다.

자바스크립트에서의 생성자 함수

- 사용자가 직접 정의한 사용자 정의 생성자 함수
- 자바스크립트가 기본 제공하는 빌트인 생성자 함수

<br>

### 사용자 정의 생성자함수와 프로토타입 생성시점

내부 메소드 [[Construct]]를 갖는 함수객체인 일반함수로 정의한 객체는 new 연산자와 함께 생성자 함수로 호출이 가능하다고 했다. 

생성자함수로 호출할 수 있는 함수인 constructor는 <strong>함수정의가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다. </strong>

```javascript
// 함수 정의(constructor)가 평가되어 함수 객체를 생성하는 시점에 프로토타입도 더불어 생성된다.
console.log(Person.prototype); // Error

// 생성자 함수
function Person(name) {
  this.name = name;
}
console.log(Person.prototype); // {constructor: ƒ}
```

생성자 함수로 호출이 불가능한 함수인 non-constructor는 프로토타입이 생성되지 않는다.

```javascript
// 화살표 함수는 non-constructor이다.
const Person = name => {
  this.name = name;
};

// non-constructor는 프로토타입이 생성되지 않는다.
console.log(Person.prototype); // undefined
```

함수 선언문은 다른 코드가 실행되기 이전에 자바스크립트 엔진에 의해 **먼저** 실행된다.(함수 호이스팅) 따라서 함수 선언문으로 정의된 Person 생성자 함수는 어떤 코드보다 먼저 평가되어 함수 객체가 된다. 이때 프로토타입도 더불어 생성된다. 생성된 프로토타입은 Person 생성자 함수의 prototype 프로퍼티에 바인딩된다. 

![image](https://user-images.githubusercontent.com/62285872/81049669-9e2d6f00-8ef9-11ea-8fb3-59feb1fe686b.png)	

함수 정의에 의해 생성된 프로토타입은 constructor 프로퍼티만을 갖는 **객체**이다. 여기서 알 수 있는 것은 프로토타입도 객체라는 것이고 모든 객체는 프로토타입을 가지므로.. 프로토타입도 자신의 프로토타입을 갖게된다. <strong>결과적으로 생성된 프로토타입의 프로토타입은 Object.prototype이다. </strong>

![image](https://user-images.githubusercontent.com/62285872/81049807-dd5bc000-8ef9-11ea-8f35-cc9db7e5c505.png)	

<strong><em>이처럼 사용자 정의 생성자 함수는 자신이 평가되어 함수객체로 생성되는 시점에 프로토타입도 더불어 생성되며 생성된 프로토타입의 프로토타입은 언제나 Object.prototype이다.</em></strong>

<br>

### 빌트인 생성자 함수와 프로토타입 생성시점

Object, String, Number, Function, Array, RegExp, Date, Promise 등과 같은 빌트인 생성자 함수도 일반함수와 마찬가지로 <strong>빌트인 생성자함수가 생성되는 시점에 프로토타입이 생성된다.</strong>

<em>모든 빌트인 생성자 함수는 전역객체가 생성되는 시점에 생성</em>되며 생성된 프로토타입은 빌트인 생성자 함수의 prototype 프로퍼티에 바인딩된다.

![image](https://user-images.githubusercontent.com/62285872/81050625-3ed05e80-8efb-11ea-9418-0c0f4031ada8.png)

> 전역객체는 코드가 실행되기 이전 단계에 자바스크립트 엔진에 의해 생성되는 특수한 객체이다. 전역객체는 클라이언트 사이드 환경인 브라우저에서는 window, 서버 사이드 환경인 node.js에서는 global 객체를 의미한다.
>
> 전역객체의 프로퍼티
>
> - 표준 빌트인 객체들
> - 환경에 따른 호스트 객체(클라이언트 web API 또는 Node.js의 호스트 API),
> - var 키워드로 선언한 전역변수와 전역함수
>
> Math를 제외한 표준 빌트인 객체는 모두 생성자 함수이다.

표준 빌트인 객체인 Object도 전역객체의 프로퍼티로 전역객체가 생성되는 시점에 생성된다. 이처럼 객체가 생성되기 이전에 빌트인 생성자 함수와 프로토타입은 이미 객체화되어 존재하고 있다. 이후 생성자함수 또는 리터럴표기법으로 객체를 생성하면 프로토타입은 생성된 객체의 [[Prototype]] 내부슬롯에 할당된다. 이로써 생성된 객체는 프로토타입을 상속받는다.

<br>

## 객체생성방식과 프로토타입의 결정

객체의 생성방법은 아래와 같다.

- 객체 리터럴
- Object 생성자 함수 (빌트인 생성자 함수)
- 생성자 함수 (사용자 정의 생성자 함수)
- Object.create 메소드
- 클래스

위와 같은 방식으로 생성된 모든 객체는 각각의 방식마다 세부적인 객체생성방식의 차이는 있으나 추상연산(ObjectCreate)에 의해 생성된다는 공통점을 갖는다.

추상연산 ObjectCreate는 **필수적**으로 자신이 생성할 객체의 프로토타입을 인수로 전달받는다. 그리고 자신이 생성할 객체에 추가할 프로퍼티 목록은 **옵션**으로 전달할 수 있다. 

추상연산 ObjectCreate는 

1. 빈객체를 생성한 후 
2. 객체에 추가할 프로퍼티 목록이 인수로 전달된 경우, 프로퍼티를 객체에 추가한다. 
3. 그리고 인수로 전달받은 프로토타입을 자신이 생성한 객체의 [[Prototype]] 내부슬롯에 할당한 다음, 생성한 객체를 반환한다.

<br>

### 객체리터럴에 의해 생성된 객체의 프로토타입

자바스크립트 엔진은 객체리터럴을 평가하여 객체를 생성할 때, 추상연산 ObjectCreate를 호출한다. 이때 추상연산 ObjectCreate에 전달되는 프로토타입은 Object.prototype이다.

```javascript
const obj = { x:1 };
```

위 객체리터럴이 평가되면 추상연산 ObjectCreate에 의해 아래와 같이 Object 생성자함수와 Object.prototype과 생성된 객체 사이에 연결이 만들어 진다.

![image](https://user-images.githubusercontent.com/62285872/81052437-62e16f00-8efe-11ea-88b8-b44fadf7e423.png)

이처럼 객체 obj는 Object.prototype을 프로토타입으로 갖게되며 이로써 Object.prototype을 상속받는다. obj 객체는 constructor 프로퍼티와 hasOwnProperty 메소드 등을 소유하지 않지만 프로토타입인 Object.prototype의 프로퍼티와 메소드를 상속받아 자신의 자산인 것 처럼 자유롭게 사용할 수 있다.

```javascript
const obj = { x: 1 };

// 객체 obj는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x'));    // true
```

<br>

### Object 생성자 함수에 의해 생성된 객체의 프로토타입

명시적으로 Object 생성자 함수를 호출하여 객체를 생성하면 **빈객체**가 생성된다. Object 생성자함수를 호출하면 객체 리터럴과 마찬가지로 추상연산 ObjectCreate를 호출한다. 이떄 추상연산 ObjectCreate에 전달되는 프로토타입은 Object.prototype이다.

```javascript
const obj = new Object();
obj.x = 1;
```

코드가 실행되면 추상 연산 ObjectCreate에 의해 아래와 같이 Object 생성자 함수와 Object.prototype과 생성된 객체 사이에 연결이 만들어 진다. 객체 리터럴에 의해 생성된 객체와 동일한 구조를 갖는 것을 알 수 있다.

![image](https://user-images.githubusercontent.com/62285872/81053371-ebacda80-8eff-11ea-9f8d-c4701d0aaf6f.png)

이처럼 객체 obj는 Object.prototype을 프로토타입으로 갖게 되며 이로써 Object.prototype을 상속받는다.

```javascript
const obj = new Object();
obj.x = 1;

// 객체 obj는 Object.prototype을 상속받는다.
console.log(obj.constructor === Object); // true
console.log(obj.hasOwnProperty('x'));    // true
```

객체 리터럴과 Object 생성자 함수에 의한 객체 생성 방식의 차이는 <strong>프로퍼티를 추가하는 방식에 있다.</strong> 객체 리터럴 방식은 객체 리터럴 내부에 프로퍼티를 추가하지만 Object 생성자 함수 방식은 일단 빈 객체를 생성한 이후 프로퍼티를 추가해야 한다.

<br>

### 생성자함수에 의해 생성된 객체의 프로토타입

new 연산자와 함께 생성자 함수를 호출하여 인스턴스를 생성하면 다른 객체방식과 마찬가지로 추상연산 ObjectCreate를 호출한다.

이 때, 객체리터럴 / Object 생성자함수로 생성한 객체의 prototype과는 다르게 추상연산 ObjectCreate에 전달되는 프로토타입은 생성자 함수의 <strong>prototype 프로퍼티에 바인딩되어있는 객체이다.</strong>

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');
```

![image](https://user-images.githubusercontent.com/62285872/81054175-472b9800-8f01-11ea-87cf-8f9245e9c7cb.png)

빌트인 객체인 Object 생성자 함수와 더불어 생성된 프로토타입 Object.prototype은 다양한 빌트인 메소드(hasOwnProperty, propertyIsEnumerable 등)를 갖고 있다. 

<strong>하지만 사용자 정의 생성자 함수 Person과 더불어 생성된 프로토타입 Person.prototype의 프로퍼티는 constructor 뿐이다.</strong>

프로토타입 Person.prototype에 프로퍼티를 추가하여 하위(자식) 객체가 상속받을 수 있도록 구현해보자. 프로토타입은 객체이다. 따라서 일반 객체와 같이 프로토타입에도 프로퍼티를 추가/삭제할 수 있다. 그리고 이렇게 추가/삭제된 프로퍼티는 프로토타입 체인에 즉각 반영된다.

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 메소드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');
const you = new Person('Kim');

me.sayHello();  // Hi! My name is Lee
you.sayHello(); // Hi! My name is Kim
```

![image](https://user-images.githubusercontent.com/62285872/81054609-1009b680-8f02-11ea-854d-42a0edb8d080.png)

Person 생성자 함수를 통해 생성된 모든 객체는 프로토타입에 추가된 sayHello 메소드를 상속받아 자신의 메소드처럼 사용할 수 있다.

<br>

## 프로토타입 체인

```javascript
function Person(name) {
  this.name = name;
}

// 프로토타입 메소드
Person.prototype.sayHello = function () {
  console.log(`Hi! My name is ${this.name}`);
};

const me = new Person('Lee');

// hasOwnProperty는 Object.prototype의 메소드이다.
console.log(me.hasOwnProperty('name')); // true
```

Person 생성자 함수에 의해 생성된 me 객체는 Object.prototype의 메소드인 hasOwnProperty를 호출할 수 있다. 이것은 me 객체가 Person.prototype 뿐만 아니라 <strong>Object.prototype도 상속받았다는 의미이다.</strong>

```javascript
// me 객체의 프로토타입은 Person.prototype이다.
console.log(Object.getPrototypeOf(me) === Person.prototype); // true

// Person.prototype의 프로토타입은 Object.prototype이다. 프로토타입의 프로토타입은 언제나 Object.prototype이다.
console.log(Object.getPrototypeOf(Person.prototype) === Object.prototype); // true
```

![image](https://user-images.githubusercontent.com/62285872/81055825-742d7a00-8f04-11ea-90e4-deb92cd38a38.png)

자바스크립트는 객체의 프로퍼티 혹은 메소드에 접근하려고 할 때 해당 객체에 접근하려는 프로퍼티가 없다면 // [[Prototype]] 내부 슬롯의 참조값을 따라 자신의 부모역할을 하는 프로토타입의 프로퍼티를 순차적으로 검색한다. <strong>이것을 프로토타입 체인이라 한다.</strong> 프로토타입 체인은 자바스크립트가 객체지향 프로그래밍의 **상속**을 구현하는 메커니즘이다.

만약, `객체.hasOwnProperty(' ')`와 같이 메소드를 호출하면 자바스크립트 엔진은 아래와 같은 과정을 거쳐 메소드를 검색한다. 물론 프로퍼티를 검색하는 경우도 마찬가지다.

1. 먼저 hasOwnProperty 메소드를 호출한 객체에서 hasOwnProperty 메소드를 검색한다. 없을 경우 프로토타입 체인을 따라 프로토타입 객체로 이동하여 해당 메소드를 검색한다.
2. 프로토타입 체인을 따라 올라가다 프로토타입 객체에서 해당 메소드를 발견하면, 자바스크립트엔진은 해당 메소드를 호출한다. 이 때 해당 메소드를 가진 객체가 아닌 호출한 객체가 해당 메소드의 this에 바인딩된다.

```javascript
Object.prototype.hasOwnProperty.call(me, 'name');
```

> call 메소드?? => 이해안됨..
>
> call 메소드는 this로 사용할 객체를 전달하면서 함수를 호출한다. 상기 예제에서는 this로 사용할 me 객체를 전달하면서 Object.prototype.hasOwnProperty 메소드를 호출하는 의미이다.

프로토타입 체인의 최상위에 위치하는 객체는 언제나 Object.prototype이다. 따라서 모든 객체는 Object.prototype을 상속받는다. **Object.prototype을 프로토타입 체인의 종점(End of prototype chain)**이라 한다. Object.prototype의 프로토타입, 즉 [[Prototype]] 내부 슬롯의 값은 **null**이다.

프로토타입 체인의 종점인 Object.prototype에서도 프로퍼티를 검색할 수 없는 경우, undefined를 반환한다. 이 때 에러가 발생하지 않는것에 주의하자.

자바스크립트 엔진은 프로토타입 체인을 따라 **프로퍼티**와 **메소드**를 검색한다. 다시말해, 자바스크립트 엔진은 객체간의 상속관계로 이루어진 프로토타입의 계층적인 구조에서 객체의 프로퍼티를 검색한다. <strong>따라서 프로토타입 체인은 상속과 프로퍼티 검색을 위한 메커니즘이라고 할 수 있다.</strong>

이에 반해, 프로퍼티가 아닌 **식별자**는 스코프 체인에서 검색한다. 즉, 자바스크립트 엔진은 함수의 중첩관계로 이루어진 스코프의 계층적 구조에서 식별자를 검색한다. <strong>따라서 스코프 체인은 식별자 검색을 위한 메커니즘 이라 할 수 있다.</strong>

```javascript
me.hasOwnProperty('name');
```

위 예제의 검색순서

1. 스코프체인에서 식별자 me를 검색
2. 스코프체인에서 식별자 me를 찾은 다음, me 객체의 프로토타입 체인에서 메소드를 검색

<strong>이처럼 스코프체인과 프로토타입 체인은 서로 협력하여 식별자와 프로퍼티를 검색한다.</strong>

<br>

## 캡슐화

```javascript
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메소드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person('Lee');
```

이와 같이 즉시 실행 함수를 사용하여 생성자 함수와 프로토타입을 확장하는 코드를 하나의 함수 내에 깔끔하게 모을 수 있다.

위 패턴을 사용하면 캡슐화를 쉽게 구현할 수 있다. 캡슐화(encapsulation)는 정보의 일부를 외부에 감추어 은닉(정보 은닉(information hiding))하는 것을 말한다. 즉, 외부에 공개할 필요가 없는 정보는 외부에 노출되지 않도록 감추어 적절치 못한 접근으로부터 정보를 보호하고 객체간의 상호 의존성, 즉 결합도를 낮추는 효과를 얻는다.

```javascript
// name 프로퍼티는 public하다. 즉, 외부에서 자유롭게 접근하고 변경할 수 있다.
me.name = 'Kim';
me.sayHello(); // Hi! My name is Kim
```

name 프로퍼티를 캡슐화 해 보자.

```javascript
const Person = (function () {
  //  지역변수이며 private하다
  let _name = '';

  // 생성자 함수
  function Person(name) { _name = name; }

  // 프로토타입 메소드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${_name}`);
  };

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person('Lee');

// _name은 지역 변수이므로 외부에서 접근하여 변경할 수 없다. 즉, private하다.
me._name = 'Kim';
me.sayHello(); // Hi! My name is Lee

console.log(me);  // Person {}
```

<br>

## 오버라이딩과 프로퍼티 쉐도잉

```javascript
const Person = (function () {
  // 생성자 함수
  function Person(name) {
    this.name = name;
  }

  // 프로토타입 메소드
  Person.prototype.sayHello = function () {
    console.log(`Hi! My name is ${this.name}`);
  };

  // 생성자 함수를 반환
  return Person;
}());

const me = new Person('Lee');

// 인스턴스 메소드
me.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};

// 인스턴스 메소드가 호출된다. 프로토타입 메소드는 인스턴스 메소드에 의해 가려진다.
me.sayHello(); // Hey! My name is Lee
```

생성자 함수로 객체(인스턴스)를 생성한 다음, 인스턴스에 메소드를 추가하였다. 이를 그림으로 나타내면 아래와 같다.

![image](https://user-images.githubusercontent.com/62285872/81059666-d2119000-8f0b-11ea-9212-f67356e23043.png)

프로토타입이 소유한 프로퍼티 혹은 메소드를 프로토타입 프로퍼티 또는 메소드라 부르고 인스턴스가 소유한 프로퍼티를 인스턴스 프로퍼티라 부른다.

프로토타입 프로퍼티와 같은 이름의 프로퍼티를 인스턴스에 추가하면 프로토타입 체인을 따라 프로토타입 프로퍼티를 검색하여 프로토타입 프로퍼티를 덮어쓰는 것이 아니라 인스턴스 프로퍼티로 추가한다. 이때 인스턴스 메소드 sayHello는 프로토타입 메소드 sayHello를 오버라이딩하였고 프로토타입 메소드 sayHello는 가려진다. 이처럼 상속 관계에 의해 프로퍼티가 가려지는 현상을 <strong>프로퍼티 쉐도잉(property shadowing)이라 한다.</strong>

> 오버라이딩 (Overriding)
>
> 상위 클래스가 가지고 있는 메소드를 하위 클래스가 재 정의하여 사용하는 방식.
>
> override의 사전적 의미는 무시하다 / .. 보다 더 중요하다 이다.
>
> 하위클래스가 가지는 메소드에 의해 상위클래스의 프로퍼티가 무시(?)되는 현상.

> 오버로딩 (Overrloading)
>
> 함수의 이름은 동일하지만 매개변수의 타입 또는 개수가 다른 메소드를 구현하고 매개변수에 의해 메소드를 구별하여 호출하는 방식이다. 자바스크립트는 오버로딩을 지원하지 않지만 arguments 객체를 사용하여 구현할 수는 있다.

- 프로퍼티 삭제

```javascript
// 인스턴스 메소드를 삭제한다.
delete me.sayHello;
// 인스턴스에는 sayHello 메소드가 없으므로 프로토타입 메소드가 호출된다.
me.sayHello(); // Hi! My name is Lee
```

이와 같이 하위 객체를 통해 프로토타입의 프로퍼티를 변경 또는 삭제하는 것은 불가능하다. 다시 말해 하위 객체를 통해 프로토타입에 get 액세스는 허용되나 set 액세스는 허용되지 않는다.

프로토타입 프로퍼티를 변경 또는 삭제하려면 하위 객체를 통해 프로토타입 체인으로 접근하는 것이 아니라 프로토타입에 **직접** 접근하여야 한다.

```javascript
// 프로토타입 메소드 변경
Person.prototype.sayHello = function () {
  console.log(`Hey! My name is ${this.name}`);
};
me.sayHello(); // Hey! My name is Lee

// 프로토타입 메소드 삭제
delete Person.prototype.sayHello;
me.sayHello(); // TypeError: me.sayHello is not a function
```

<br>

## 프로토타입의 교체

프로토타입은 다른 임의의 객체로 변경이 가능하다. 이것은 부모 객체인 프로토타입을 동적으로 변경할 수 있다는 것을 의미한다. 이러한 특징을 활용하여 객체간 상속관계의 변경이 가능하다. 프로토타입은 생성자 함수 또는 인스턴스에 의해 교체할 수 있다.??

### 생성자 함수에 의한 프로토타입의 교체

```javascript
const Person = (function () {
  function Person(name) {
    this.name = name;
  }

  // ① 생성자 함수의 prototype 프로퍼티를 통해 프로토타입을 교체
  Person.prototype = {
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };

  return Person;
}());

const me = new Person('Lee');
```

![image](https://user-images.githubusercontent.com/62285872/81061728-d2138f00-8f0f-11ea-93e0-0a5fa9686c3c.png)

프로토타입으로 교체한 객체 리터럴에는 constructor 프로퍼티가 없다. 따라서 me 객체의 생성자 함수를 검색하면 프로토타입 체인에 의해 상위 프로토타입인 Object.prototype에서 constructor 프로퍼티를 검색하여 Person이 아닌 Object가 나온다.

constructor 프로퍼티는 자바스크립트 엔진이 <strong>프로토타입을 생성할 때</strong> 암묵적으로 추가한 프로퍼티이다.

```javascript
// 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수 간의 링크가 파괴된다.
console.log(me.constructor === Person); // false
// 프로토타입 체인을 따라 Object.prototype의 constructor 프로퍼티가 검색된다.
console.log(me.constructor === Object); // true
```

위와 같이 프로토타입을 교체하면 constructor 프로퍼티와 생성자 함수간의 링크가 파괴된다. 이렇게 파괴된 링크는 프로토타입에서의 프로퍼티의 동적추가로 복구가 가능하다.

```javascript
 Person.prototype = {
    // constructor 프로퍼티와 생성자 함수 간의 링크 설정
    constructor: Person,
    sayHello() {
      console.log(`Hi! My name is ${this.name}`);
    }
  };
```

<br>

### 인스턴스에 의한 프로토타입의 교체

프로토타입 접근 방법.

- 생성자함수의 prototype 프로퍼티.
- 인스턴스의 _ _ proto _ _ 접근자 프로퍼티.
- 인스턴스의 `Object.getPrototypeOf` 메소드를 통한 통한 값의 참조.
- 인스턴스의 `Object.setPrototypeOf` 메소드를 통한 값의 저장.

프로토타입 교체 방법

1. 생성자 함수의 prototype 프로퍼티에 다른 임의의 객체를 바인딩(미래에 생성될 인스턴스의 프로토타입을 지정하는것.)
2. _ _ proto _ _ 접근자 프로퍼티를 통한 프로토타입의 교체 (이미 생성된 인스턴스의 프로토타입을 교체하는 것.)

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};

// ① me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee
```

![image](https://user-images.githubusercontent.com/62285872/81062995-fb351f00-8f11-11ea-9a2e-3096dfa2b975.png)

- 생성자함수에 의한 프로토타입 교체 vs 인스턴스에 의한 프로토타입 교체

![image](https://user-images.githubusercontent.com/62285872/81063262-7991c100-8f12-11ea-9ae3-3183337ebe1b.png)

```javascript
function Person(name) {
  this.name = name;
}

const me = new Person('Lee');

// 프로토타입으로 교체할 객체
const parent = {
  // constructor 프로퍼티와 생성자 함수 간의 링크 설정
  constructor: Person,
  sayHello() {
    console.log(`Hi! My name is ${this.name}`);
  }
};

// 생성자 함수의 prototype 프로퍼티와 프로토타입 간의 링크 설정
Person.prototype = parent;

// me 객체의 프로토타입을 parent 객체로 교체한다.
Object.setPrototypeOf(me, parent);
// 위 코드는 아래의 코드와 동일하게 동작한다.
// me.__proto__ = parent;

me.sayHello(); // Hi! My name is Lee

// constructor 프로퍼티가 생성자 함수를 가리킨다.
console.log(me.constructor === Person); // true
console.log(me.constructor === Object); // false

// 생성자 함수의 prototype 프로퍼티가 교체된 프로토타입을 가리킨다.
console.log(Person.prototype === Object.getPrototypeOf(me)); // true
```

생성자함수의 prototype 프로퍼티를 사용한 프로토타입 교체 방법은 앞으로 생성될 인스턴스들은 자동으로 변경된 프로토타입으로 생성이 되는 장점이 있다.

반대로 인스턴스의 프로퍼티나 메소드를 이용한 변경방법의 경우 이미 인스턴스가 생성된 후 변경하는 것이기 때문에 생성자함수의 prototype 프로퍼티와 인스턴스의 _ _ proto _ _ 혹은 Object.setPrototypeOf() 메소드를 이용한 프로토타입의 변경 작업이 매번 필요하다.

ES6에 도입된 클래스를 사용하면 간편하고 직관적으로 상속관계의 구현이 가능하다. 클래스는 뒤에서 자세히 배운다.  