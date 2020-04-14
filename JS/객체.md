### 객체란?

: 객체(object)란 물리적으로 존재하거나 추상적으로 생각할 수 있는 것 중에서 자신의 속성을 가지고 있고 다른것과 식별 가능한 것을 일컫는다.



#### 객체

- 어떠한 값을 선언하게 될 때 하나의 이름에 여러종류의 값을 넣을 수 있게 해줌.
- 객체 내에서 여러종류의 값 선언 시 쉼표(,)를 사용하여야 한다.

```
// 따로 선언

const dogName = "멍멍이"
const dogAge = "2"
const dogType = "치와와"

// 객체를 이용

const dog = {
  name: "멍멍이",
  age: "2살",
  type: "치와와"
}
```

- 객체 비구조화 할당

  : 객체와 관련된 함수 작성 시 중복적인 내용을 따로 구조화 해서 나타내는것? 정도로 이해한다.

```
const dog = {
  name: "멍멍이",
  age: "2살",
  type: "치와와"
}

// 일반작성 

function print(it) {
	return `강아지의 이름은 ${it.name}이고 나이는 ${it.age}입니다.`	
}

// 비구조화 할당

function print(it) {
	const {name, age} = (it)
	return `강아지의 이름은 ${name}이고 나이는 ${age}입니다.`	
}
```



- 객체 내부에 함수 추가

```
const dog = {
  name: "멍멍이",
  age: "2살",
  type: "치와와",
  say: function() {                     -> 함수
    console.log(this.age);            
  }
}
```

**객체 내부 함수 작성 유형**

```
1. say: function say() {}
2. say: function() {}
3. say() {}
4. say: () => {}
```

객체 내부의 함수 작성 시 앞서 배운 화살표 함수로도 나타낼 수 있으나,

<u>화살표 함수로 나타낼 시 `this`가 누구인지 인식을 할 수 없으니 주의한다.</u>



- getter 함수

: 특정값을 <u>**조회**</u>하려고 할 때 원하는 코드의 실행이 가능하다.

  get 함수를 사용할 때에는 **return**으로 반환해 줄 무언가가 필요하다.

```
const numbers = {
  a: 1,
  b: 2,
  get sum() {
    console.log("sum 함수가 실행됩니다!")
    return this.a + this.b
  }
}
```



- setter 함수

:  특정값을 <u>**설정**</u>할 때 마다  원하는 코드를 실행한다. 

   set함수는 parameter인 **value**값을 설정 해 줘야 한다.

```
const dog = {
  _name: "멍멍이",
  set name(value) {
    console.log("이름이 바뀝니다..." + value);
    this._name = value;
  }
};
```

