### 프로토타입과 클래스



#### 객체 생성자?

: 객체 생성자는 함수를 통해서 새로운 객체를 만들고 그 안에 값 또는 함수를 구현할 수 있게 해준다.

- 객체 생성자 사용 시 유의사항

1. 객체 생성자를 만들때 함수의 이름은 대문자로 시작하게 만든다. ex)`function Animal()`

2. 객체 생성자를 통해 또 다른 객체 생성 시, 기존 객체생성자 앞에 `new`를 표기한다. ex) `const dog = new Animal()`

```
function Animal(type, name, sound) {
  this.type = type;
  this.name = name;
  this.sound = sound;
  this.say = function() {
    console.log(this.sound);
  };
}

const dog = new Animal('개', '멍멍이', '멍멍');
const cat = new Animal('고양이', '야옹이', '야옹');

dog.say();
cat.say();
```



- 객체생성자 상속받기

```
function 객체() {
  객체생성자.call(this, 객체생성자의 parameter);
}

객체.prototype = 객체생성자.prototype;
```

 ```
function Animal(type, name, sound) {
  this.type = type;
  this.name = name;
  this.sound = sound;
  // this.say = function() {
  //   console.log(this.sound);
  // }
};

Animal.prototype.say = function() {
  console.log(this.sound);
}

// 상속

function Dog(name,sound) {
  Animal.call(this, '개', name, sound);
}
 
function Cat(name,sound) {
  Animal.call(this, '고양이', name, sound);
}

Dog.prototype = Animal.prototype;
Cat.prototype = Animal.prototype;

 ```



#### 프로토타입(prototype)

: 객체생성자에 의해 새로운 객체를 만들었을 때, 그렇게 생성된 객체들끼리 공유할 수 있는 값이나 함수를 말한다.

- prototype의 사전적 정의

  : 원래의 형태 또는 전형적인 예, 기초 또는 표준이다. 시제품이 나오기 전의 제품의 **원형**이다.

    프로토 타입은 "정보시스템의 미완성 버전 또는 중요한 기능들이 포함되어 있는 시스템의 **초기모델**"이다.

  

  자바스크립트에서 프로토타입은 **자신을 만들어낸 객체의 원형**을 뜻한다.



```
function Animal(type, name, sound) {
  this.type = type;
  this.name = name;
  this.sound = sound;
 // this.say = function() {
 //   console.log(this.sound);
 //};
}

// prototype
Animal.prototype.say = function() {
	console.log(this.sound);
}


const dog = new Animal('개', '멍멍이', '멍멍');
const cat = new Animal('고양이', '야옹이', '야옹');

dog.say();
cat.say();
```



<img src="C:\Users\112606\AppData\Roaming\Typora\typora-user-images\image-20200415224225475.png"/>		



### 클래스(class)

: 객체생성자와 프로토타입을 좀 더 쉽고 간결하게 사용하기 위해 만들어진 개념.

  constructor로 각 타입을 지정한다. class 내에 선언하는 함수는 자동으로 prototype이 된다.

  class 상속의 경우에는 super를 사용한다.

```
class Animal {
  constructor(type,name,sound) {
    this.type = type;
    this.name = name;
    this.sound = sound;
  }
  say() {
    console.log(this.sound);
  }
}

class Dog extends Animal {
  constructor(name,sound) {
    super('개',name,sound);
  }
}

const dog = new Dog('멍멍이','멍멍');

dog.say()

```

