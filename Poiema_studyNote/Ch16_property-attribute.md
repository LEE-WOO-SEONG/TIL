# property-attribute

- Toc

1. [내부 슬롯과 내부 메소드](#내부-슬롯과-내부-메소드)

2. [프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체](#프로퍼티-어트리뷰트와-프로퍼티-디스크립터-객체)

3. [데이터 프로퍼티와 접근자 프로퍼티](#데이터-프로퍼티와-접근자-프로퍼티)

   3-1.[데이터 프로퍼티](#데이터-프로퍼티)

   3-2.[접근자 프로퍼티](#접근자-프로퍼티)

4. [프로퍼티의 정의](#프로퍼티의-정의)

5. [객체변경 방지](#객체변경-방지)



<br>

<br>

## 내부 슬롯과 내부 메소드

내부 슬롯(internal slot)과 내부 메소드(internal method)는 자바스크립트 엔진의 알고리즘을 설명하기 위해 ECMAScript 사양에서 사용하는 의사 프로퍼티(Pseudo property)와 의사 메소드(Pseudo method)이다. 내부 슬롯과 내부 메소드는 이중 대괄호([[...]]로 감싸서 표현한다.

![image](https://user-images.githubusercontent.com/62285872/80854360-8b553900-8c72-11ea-941e-4a2d7ce3365a.png)

내부 슬롯과 내부 메소드는 ECMAScript 사양에 정의된 대로 구현되어 자바스크립트 엔진에서 실제로 동작하지만 **외부로 공개된 객체의 프로퍼티는 아니다.**

내부 슬롯과 내부 메소드는 자바스크립트 엔진의 **내부 로직**이므로 원칙적으로 자바스크립트는 일부를 제외하고는 내부 슬롯과 내부 메소드에 직접적으로 접근하거나 호출할 수 있는 방법을 제공하지 않는다. 

<br>

## 프로퍼티 어트리뷰트와 프로퍼티 디스크립터 객체

자바스크립트 엔진은 프로퍼티를 생성할 때 프로퍼티의 **상태**를 나타내는 **프로퍼티 어트리뷰트**를 기본값으로 자동 정의한다.

>  프로퍼티의 상태란?
>
> - 프로퍼티의 값(value)
> - 값의 갱신가능 여부(writable)
> - 열거가능 여부(enumerable)
> - 재정의 가능여부(configurable)

<br>

프로퍼티 어트리뷰트는 자바스크립트 엔진이 관리하는 내부 상태 값(meta-property)인 **내부 슬롯**이다. 그렇기 때문에 직접 접근은 불가능하지만, `Object.getOwnPropertyDescriptor` 메소드를 사용하여 간접적으로 확인할 수는 있다. 

> 프로퍼티 어트리뷰트
>
> - [[Value]]
> - [[Writable]]
> - [[Enumerable]]
> - [[Configurable]]

```javascript
const person = {
  name: 'Lee'
};

// 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체를 반환한다.
console.log(Object.getOwnPropertyDescriptor(person, 'name'));
// {value: "Lee", writable: true, enumerable: true, configurable: true}
```

![image](https://user-images.githubusercontent.com/62285872/80854915-e2f5a380-8c76-11ea-9e0a-3f1b476cb8dc.png)	

`Object.getOwnPropertyDescriptor` 메소드를 호출할 때 첫번째 매개변수에는 **객체**의 참조를 전달하고 두번째 매개변수에는 **프로퍼티 키**를 **문자열**로 전달한다.

이 때 해당 메소드는 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터(property Descriptor) 객체를 반환한다. 존재하지 않는 프로퍼티나 상속받은 프로퍼티에 대한 프로티 디스크립터를 요구하면 undefined가 반환된다.

`Object.getOwnPropertyDescriptor` 메소드는 **하나**의 프로퍼티에 대해 프로퍼티 디스크립터 객체를 반환하지만 ES8에서 도입된 `Object.getOwnPropertyDescriptors` 메소드는 **모든** 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.

```javascript
const person = {
  name: 'Lee'
};

// 프로퍼티 동적 생성
person.age = 20;

// 모든 프로퍼티의 프로퍼티 어트리뷰트 정보를 제공하는 프로퍼티 디스크립터 객체들을 반환한다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: true},
  age: {value: 20, writable: true, enumerable: true, configurable: true}
*/
```

![image](https://user-images.githubusercontent.com/62285872/80855009-00773d00-8c78-11ea-817f-47caff515b18.png)	

<br>

## 데이터 프로퍼티와 접근자 프로퍼티

프로퍼티 구성

- 데이터 프로퍼티(data property)

키와 값으로 구성된 일반적인 프로퍼티.

- 접근자 프로퍼티(access property)

**자체적으로는 값을 갖지 않고** 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 **접근자 함수**로 구성된 프로퍼티

<br>

### 데이터 프로퍼티

데이터프로퍼티는 아래와 같은 **프로퍼티 어트리뷰트**를 갖는다. 이 프로퍼티 어트리뷰트는 자바스크립트 엔진이 프로퍼티를 생성할 때 기본값을 자동 정의된다.

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                         |
| ------------------- | ----------------------------------- | ------------------------------------------------------------ |
| [[Value]]           | value                               | - 프로퍼티 키를 통해 프로퍼티 값에 접근하면 반환되는 값.<br />- 프로퍼티 키를 통해 프로퍼티 값을 변경하면 [[Value]]에 값을 재할당한다.  이 때 프로퍼티가 없으면 프로퍼티를 동적 생성하고 성성된 프로퍼티의 [[Value]]에 값을 저장한다. |
| [[Writable]]        | writable                            | - 프로퍼티 값의 **변경가능** 여부를 나타내며, **불리언** 값을 갖는다.<br />- [[Writable]]의 값이 false인 경우 해당 프로퍼티의 [[Value]]의 값을 변경할 수 없는 읽기전용 프로퍼티가 된다. |
| [[Enumerable]]      | enumerable                          | - 프로퍼티의 **열거가능** 여부를 나타내며, **불리언** 값을 갖는다.<br />- [[Enumerable]]의 값이 false인 경우 해당 프로퍼티는 `for...in` 문이나 `Object.keys` 메소드 등으로 열거가 불가능하다. |
| [[Configurable]]    | configurable                        | - 프로퍼티의 **재정의** 가능여부를 나타내며 **불리언** 값을 갖는다.<br />- [[Configurable]]의 값이 false인 경우 해당 프로퍼티의 **삭제**, 프로퍼티 어트리뷰트 **값의 변경**이 불가능하다. 단, [[Writable]]이 true인 경우 [[Value]]의 변경과 [[Writable]]을 false로 변경하는 것은 허용된다. |

프로퍼티가 생성될 때 [[Value]]의 값은 프로퍼티 값으로 초기화되며 [[Writable]], [[Enumerable]], [[Configurable]]의 기본값 true로 초기화된다.

<br>

### 접근자 프로퍼티

자체적으로는 값을 갖지 않고 다른 데이터 프로퍼티의 값을 읽거나 저장할 때 호출되는 접근자 함수로 구성된 프로퍼티다.

| 프로퍼티 어트리뷰트 | 프로퍼티 디스크립터 객체의 프로퍼티 | 설명                                                         |
| ------------------- | ----------------------------------- | ------------------------------------------------------------ |
| [[Get]]             | get                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 **값을 읽을 때** 호출되는 접근자 함수. 접근자 프로퍼티 키로 프로퍼티 값에 접근하면 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수가 호출되고 그 결과가 프로퍼티 값으로 **반환**된다. |
| [[Set]]             | set                                 | 접근자 프로퍼티를 통해 데이터 프로퍼티의 **값을 저장**할 때 호출되는 접근자 함수. 접근자 프로퍼티 키로 프로퍼티 값을 저장하면 프로퍼티 어트리뷰트 [[Set]]의 값, 즉 setter 함수가 호출되고 그 결과가 프로퍼티 값으로 **저장**된다. |
| [[Enumerable]]      | enumerable                          | 데이터 프로퍼티의 [[Enumerable]]와 같다.                     |
| [[Configurable]]    | configurable                        | 데이터 프로퍼티의 [[Configurable]]와 같다.                   |

접근자 함수는 getter / setter 함수라고도 부른다. 접근자 프로퍼티는 getter와 setter 함수를 모두 정의할 수도 있고 하나만 정의할 수도 있다.

```javascript
const person = {
  // 데이터 프로퍼티
  firstName: 'Ungmo',
  lastName: 'Lee',

  // fullName은 접근자 함수로 구성된 접근자 프로퍼티이다.
  // getter 함수
  get fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set fullName(name) {
    // 배열 디스트럭처링 할당: "31.1 배열 디스트럭처링 할당" 참고
    [this.firstName, this.lastName] = name.split(' ');
  }
};

// 데이터 프로퍼티를 통한 프로퍼티 값의 참조.
console.log(person.firstName + ' ' + person.lastName); // Ungmo Lee

// 접근자 프로퍼티를 통한 프로퍼티 값의 저장
// 접근자 프로퍼티 fullName에 값을 저장하면 setter 함수가 호출된다.
person.fullName = 'Heegun Lee';
console.log(person); // {firstName: "Heegun", lastName: "Lee"}

// 접근자 프로퍼티를 통한 프로퍼티 값의 참조
// 접근자 프로퍼티 fullName에 접근하면 getter 함수가 호출된다.
console.log(person.fullName); // Heegun Lee

// firstName는 데이터 프로퍼티이다.
// 데이터 프로퍼티는 value, writable, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log(descriptor);
// {value: "Heegun", writable: true, enumerable: true, configurable: true}

// fullName는 접근자 프로퍼티이다.
// 접근자 프로퍼티는 get, set, enumerable, configurable 프로퍼티 어트리뷰트를 갖는다.
descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log(descriptor);
// {get: ƒ, set: ƒ, enumerable: true, configurable: true}
```

person 객체의 `firsName` 과 `lastName` 프로퍼티는 일반적인 **데이터 프로퍼티**이다. 메소드 앞에 get / set 이 붙은 메소드는 getter 함수와 setter 함수이고 각 함수의 이름인 fullName이 **접근자 프로퍼티**이다.

> 접근자 함수
>
> - getter 함수
>
> 값을 읽어드릴 때만 사용이 가능, 갱신 / 변경등에는 사용이 불가능. 또한 해당 함수가 없으면 접근자 프로퍼티를 사용하여 값을 읽고자 할 때 undefined가 반환됨.
>
> - setter 함수
>
> 값의 저장, 변경 시에만 사용이 가능. 값을 읽어드리고 싶을 때에는 getter함수를 사용한다. setter 함수가 없으면 접근자 프로퍼티를 사용하여 값을 갱신하고자 할 때 Error 가 발생하여 변경이 안됨.

- 접근자 프로퍼티 (키)로 프로퍼티 값에 접근 시 동작과정

1. 프로퍼티 키가 유효한지 확인한다. 프로퍼티 키는 문자열 또는 심볼값 이어야 한다.
2. 프로토타입 체인에서 프로퍼티를 검색한다.

3. 검색된 프로퍼티가 데이터 프로퍼티인지 접근자 프로퍼티인지 확인한다.

4. 접근자 프로퍼티의 프로퍼티 어트리뷰트 [[Get]]의 값, 즉 getter 함수를 호출하여 그 결과를 반환한다. 

   프로퍼티 어트리뷰트 [[Get]]의 값은 `Object.getOwnPropertyDescriptor` 메소드가 반환하는 프로퍼티 디스크립터 객체의 get 프로퍼티 값과 같다.

> 프로토 타입 체인이란?
>
> **프로토타입**(prototype)은 어떤 객체의 상위(부모) 객체의 역할을 하는 객체이다. 프로토타입은 하위(자식) 객체에게 자신의 프로퍼티와 메소드를 **상속** 한다. 프로토타입 객체의 프로퍼티나 메소드를 상속받은 하위 객체는 자신의 프로퍼티 또는 메소드인 것 처럼 자유롭게 사용이 가능하다.
>
> **프로토타입 체인**은 프로토타입이 단방향으로 연결되어 있는 **상속** 구조를 말한다. 객체의 프로퍼티나 메소드에 접근하려 할 때 해당 객체에 접근하려는 프로퍼티 또는 메소드가 없다면 프로토 타입 체인을 따라 포로토 타입의 프로퍼티나 메소드를 **차례대로** 검색한다.

- 접근자 프로퍼티와 데이터 프로퍼티를 구별하는 방법은 디스크립터 객체를 호출하여 프로퍼티를 확인 해 보면 된다.

```javascript
// 일반 객체의 __proto__는 접근자 프로퍼티이다.
Object.getOwnPropertyDescriptor(Object.prototype, '__proto__');
// {get: ƒ, set: ƒ, enumerable: false, configurable: true}

// 함수 객체의 prototype은 데이터 프로퍼티이다.
Object.getOwnPropertyDescriptor(function() {}, 'prototype');
// {value: {…}, writable: true, enumerable: false, configurable: false}
```

<br>

## 프로퍼티의 정의

프로퍼티 정의란 **새로운 프로퍼티를 추가**하면서 프로퍼티 어트리뷰트를 명시적으로 정의하거나 기존 프로퍼티의 프로퍼티 어트리뷰트를 **재정의** 하는 것을 말한다.

`Object.defineProperty` 메소드를 사용하면 프로퍼티의 어트리뷰트를 정의할 수 있다.

- `Object.defineProperty`의 인수

1. 객체
2. 프로퍼티 키인 문자열
3. `Object.getOwnPropertyDescriptor` 객체의 프로퍼티

```javascript
const person = {};

// 데이터 프로퍼티 정의
Object.defineProperty(person, 'firstName', {
  value: 'Ungmo',
  writable: true,
  enumerable: true,
  configurable: true
});

// 데이터 프로퍼티 어트리뷰트 누락
Object.defineProperty(person, 'lastName', {
  value: 'Lee'
});

let descriptor = Object.getOwnPropertyDescriptor(person, 'firstName');
console.log('firstName', descriptor);
// firstName {value: "Ungmo", writable: true, enumerable: true, configurable: true}

descriptor = Object.getOwnPropertyDescriptor(person, 'lastName');
console.log('lastName', descriptor);
// lastName {value: "Lee", writable: false, enumerable: false, configurable: false}
```

위 예제를 보면 `Object.defineProperty` 메소드를 통해 person 객체의 프로퍼티의 어트리뷰트를 정의하였다. 프로퍼티 정의 시 모든 프로퍼티 어트리뷰트를 명시적으로 정의 해 주지 않으면 누락된 프로퍼티 어트리뷰트는 기본값은 undefined 혹은 false가 된다.

```javascript
// [[Enumerable]]의 값이 false인 경우
console.log(Object.keys(person)); // ["firstName"]만 표시됨

// [[Writable]]의 값이 false 일 경우
person.lastName = 'Kim'; // 에러는 발생하지 않고 무시된다.

// [[Configurable]]의 값이 false인 경우
delete person.lastName;  // 에러는 발생하지 않고 무시된다.
Object.defineProperty(person, 'lastName', { enumerable: true });
// Uncaught TypeError: Cannot redefine property: lastName

```

- 데이터 어트리뷰트 중 [[Enumerable]] 가 false 일 경우 `for...in` 문이나 `Object.keys`등으로 열거할 수 없다.
- 데이터 어트리뷰트 중 [[Writable]] 값이 false 일 경우 [[Value]]의 변경이 불가능 하다. 
- 데이터 어트리뷰트 중 [[Configurable]]이 false 일 경우에는 delete를 통한 프로퍼티 **삭제** 또는 `Object.defineProperty` 메소드를 통한 프로퍼티의 **재정의**가 불가능하다.

```javascript
// 접근자 프로퍼티 정의
Object.defineProperty(person, 'fullName', {
  // getter 함수
  get() {
    return `${this.firstName} ${this.lastName}`;
  },
  // setter 함수
  set(name) {
    [this.firstName, this.lastName] = name.split(' ');
  },
  enumerable: true,
  configurable: true
});

descriptor = Object.getOwnPropertyDescriptor(person, 'fullName');
console.log('fullName', descriptor);
// fullName {get: ƒ, set: ƒ, enumerable: true, configurable: true}

person.fullName = 'Heegun Lee';
console.log(person); 
// {firstName: "Heegun", lastName: "Lee", fullName: "Heegun Lee"}
```

- 프로퍼티 정의 시 누락된 프로퍼티 디스크립터 객체 프로퍼티의 기본값 정의

| 프로퍼티 디스크립터 객체의 프로퍼티 | 대응하는 프로퍼티 어트리뷰트 | 디스크립터 객체의 프로퍼티 누락 시의 기본값 |
| :---------------------------------- | :--------------------------- | :------------------------------------------ |
| value                               | [[Value]]                    | undefined                                   |
| get                                 | [[Get]]                      | undefined                                   |
| set                                 | [[Set]]                      | undefined                                   |
| writable                            | [[Writable]]                 | false                                       |
| enumerable                          | [[Enumerable]]               | false                                       |
| configurable                        | [[Configurable]]             | false                                       |

`Object.defineProperties` 메소드를 통하면 여러개의 프로퍼티의 정의가 가능하다.

```javascript
const person = {};

Object.defineProperties(person, {
  // 데이터 프로퍼티 정의
  firstName: {
    value: 'Ungmo',
    writable: true,
    enumerable: true,
    configurable: true
  },
  lastName: {
    value: 'Lee',
    writable: true,
    enumerable: true,
    configurable: true
  },
  // 접근자 프로퍼티 정의
  fullName: {
    // getter 함수
    get() {
      return `${this.firstName} ${this.lastName}`;
    },
    // setter 함수
    set(name) {
      [this.firstName, this.lastName] = name.split(' ');
    },
    enumerable: true,
    configurable: true
  }
});

person.fullName = 'Heegun Lee';
console.log(person); 
// {firstName: "Heegun", lastName: "Lee", fullName: "Heegun Lee"}
```

<br>

## 객체변경 방지

- 자바스크립트에서 객체의 변경을 방지할 수 있는 메소드

| 구분           | 메소드                   | 프로퍼티 추가 | 프로퍼티 삭제 | 프로퍼티 값 읽기 | 프로퍼티 값 쓰기 | 프로퍼티 어트리뷰트 재정의 |
| :------------- | :----------------------- | :-----------: | :-----------: | :--------------: | :--------------: | :------------------------: |
| 객체 확장 금지 | Object.preventExtensions |       ✕       |       ○       |        ○         |        ○         |             ○              |
| 객체 밀봉      | Object.seal              |       ✕       |       ✕       |        ○         |        ○         |             ✕              |
| 객체 동결      | Object.freeze            |       ✕       |       ✕       |        ○         |        ✕         |             ✕              |

### 객체확장 금지

`Object.preventExtensions` 메소드는 객체의 확장을 금지한다.

확장이 금지된 객체는 프로퍼티의 추가가 금지된다.

- 객체의 프로퍼티 추가 방법

1. 프로퍼티의 동적 추가
2. `Object.defineProperty` 메소드를 통한 프로퍼티 추가

확장이 금지된 객체인지는 `Object.isExtensible` 메소드를 통해 확인이 가능하다.

```javascript
const person = { name: 'Lee' };

// person 객체는 확장이 금지된 객체가 아니다.
console.log(Object.isExtensible(person)); // true

// person 객체의 확장을 금지하여 프로퍼티 추가를 금지한다.
Object.preventExtensions(person);

// person 객체는 확장이 금지된 객체다.
console.log(Object.isExtensible(person)); // false

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

Object.defineProperty(person, 'age', { value: 20 });
// TypeError: Cannot define property age, object is not extensible
```

<br>

### 객체밀봉

`Object.seal` 메소드를 통해 객체의 밀봉이 가능하다. 밀봉된 객체는 프로퍼티 읽기와 쓰기만 가능하다.

밀봉된 객체인지는 `Object.isSealed` 메소드를 통해 확인이 가능하다.

```javascript
const person = { name: 'Lee' };

// person 객체는 밀봉(seal)된 객체가 아니다.
console.log(Object.isSealed(person)); // false

// person 객체를 밀봉(seal)하여 프로퍼티 추가, 삭제, 재정의를 금지한다.
Object.seal(person);

// person 객체는 밀봉(seal)된 객체다.
console.log(Object.isSealed(person)); // true

// 밀봉(seal)된 객체는 configurable가 false이다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: true, enumerable: true, configurable: false},
}
*/

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 값 갱신은 가능하다.
Object.defineProperty(person, 'name', { value: 'Kim' });
console.log(person); // {name: "Kim"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { configurable: true });
// TypeError: Cannot redefine property: name
```

<br>

### 객체동결

`Object.freeze` 메소드를 통해 객체의 동결이 가능하다. 동결된 객체는 프로퍼티 읽기만이 가능하다.

`Object.isFrozen` 메소드를 통해 객체의 동결여부 확인이 가능하다.

```javascript
const person = { name: 'Lee' };

// person 객체는 동결(freeze)된 객체가 아니다.
console.log(Object.isFrozen(person)); // false

// person 객체를 동결(freeze)하여 프로퍼티 추가, 삭제, 재정의, 쓰기를 금지한다.
Object.freeze(person);

// person 객체는 동결(freeze)된 객체다.
console.log(Object.isFrozen(person)); // true

// 동결(freeze)된 객체는 writable과 configurable가 false이다.
console.log(Object.getOwnPropertyDescriptors(person));
/*
{
  name: {value: "Lee", writable: false, enumerable: true, configurable: false},
}
*/

// 프로퍼티 추가가 금지된다.
person.age = 20; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 삭제가 금지된다.
delete person.name; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 값 갱신이 금지된다.
person.name = 'Kim'; // 무시. strict mode에서는 에러
console.log(person); // {name: "Lee"}

// 프로퍼티 어트리뷰트 재정의가 금지된다.
Object.defineProperty(person, 'name', { value: 'Kim' });
// TypeError: Cannot redefine property: name
```

<br>

### 불변객체

지금까지 살펴본 객체확장 금지 / 객체 밀봉 / 객체 동결은 **얕은 변경방지**(shallow only) 방법으로 직속 프로퍼티만 변경이 방지되고 **중첩객체까지는 영향을 주지 않는다.**

```javascript
const person = {
  name: 'Lee',
  address: { city: 'Seoul' }
};
// 얕은 객체 동결
Object.freeze(person);

console.log(Object.isFrozen(person)); // true
// 중첩 객체까지 동결하지 못한다.
console.log(Object.isFrozen(person.address)); // false

person.address.city = 'Busan';
console.log(person); // {name: "Lee", address: {city: "Busan"}}
```

객체의 중첩객체까지 동결하여 변경이 불가능한 읽기전용의 불변객체를 구현하려면 객체를 값으로 갖는 모든 프로퍼티에 대해 **재귀적** 으로 `Object.freeze` 메소드를 호출해야 한다.