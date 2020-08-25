# 	generic



## generic을 사용하는 이유?

: any type 사용 지양.

: any type을 정확하게 추론 해 내기 위함?

: type을 하나의 변수처럼 이용한다?

: 함수에서 인수의 타입과 return 값의 타입이 같은 경우에 대하여 어떻게 표현 해 줄거냐?

```ts
// basic
function helloGeneric<T>(message: T): T {
    return message;
}

// generic o
helloGeneric<number>(30);
helloGeneric<number>('lee'); // error

// generic x : 인수의 타입을 제네릭의 타입으로 추론.
helloGeneric('kim');

// Array
function helloArray<T>(message: T[]): T {
    return message[0];
}

// Tuple
function helloTuple<T, K>(message: [T, K]): T {
    return message[0];
}

// Class
class Person<T> {
    name!: T;
}

// Class with extends
class Person2<T extends string | number, K>(name: T, age: K) {
    name: T;
    age: K;
    constructor(name: T, age: K) {
        this.name = name;
        this.age = age;
    }
}

// keyof : 우변의 객체의 객체의 프로퍼티 키를 문자열로 가져옴.
interface Person {
    name: string;
    age: number;
}

function getProperty<T, K extends keyof T>(person: T, key: K): T[K] {
    return person[key];
}

console.log(getProperty({ name: 'lee', age: 29 }, age));  // 29

// 내장 메소드
// 1. Partial
type PartialPerson = Partial<Person>;
type ReadonlyPerson = Readonly<Person>;
type PickProperty = Pick<Person, "age">;
```



