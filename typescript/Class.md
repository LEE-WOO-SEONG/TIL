# Class



- strict : true mode인 경우

  : class 내부의 프로퍼티 정의 후 초기화가 없으면 error 발생.

  : 정의 및 초기화를 한꺼번에 할 경우 error 미 발생.

  : 또는 프로퍼티 뒤에 `!`를 붙여주면 타입 정의만 가능. (초기화가 이루어지지 않아도 error 미 발생)

```ts
class Person1 {
    name: string;  // error
    age: number;   // error
}

class Person {
    name!: string;
	age!: number;
}
```

- 프로퍼티 접근 제어자

  : 프토퍼티 접근 제어자를 나타내지 않으면 디폴트 값은 public 이다.

> public 접근 제어자는 인스턴스의 프로퍼티가 되며 어디서든 접근이 가능함.
>
> private(#) 접근 제어자는 해당 class 내부에서만 접근이 가능하며 상속 및 인스턴스 등 외부에서 접근이 불가능함.
>
> protected(static) 접근 제어자는 해당 class 및 해당 class를 `extends` 키워드로 상속한 class에서만 참조가 가능. (상속이 되는 개념은 아니고 프로토타입 체인으로 접근 가능.)

```ts
// JAVA 식 표현
class Person {
    name: string = 'lee';
    private _name: string = 'park';
    protected age:number = 29;
}

// es6 식 표현
class Person {
    name: string = 'lee';
    #_name: string = 'park';
    static age: number = 29;
}

// typescript 식 표현
class Perons {
    constructor(public name:string, private _age: number) {}
}

// es6 식 표현 위와 같음.
class Person {
    name: string;
    #_age: number;
    constructor(name: string, age: number) {
        this.name = name;
        this.#_age = age;
    }
}
```



