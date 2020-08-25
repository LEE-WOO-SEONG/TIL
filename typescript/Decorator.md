# Decorator



## Decorator

- 함수이다.
- 컴파일 타임에는 그 함수의 타입만 체크한다.
- 런타임에 사용 및 처리가 된다.
- 클래스, 메서드, 프로퍼티, 메서드의 파라미터에 사용할 수 있다.
- 클래스가 인스턴스로 만들어질 때가 아니라, 최초 클래스가 참조될 때 한번만 적용된다.

1. class decorator

   : 클래스 선언부 앞에 붙이고 클래스의 프로퍼티를 변경하는 데코레이터

```ts
function ClassDecorator1(constructor: any) {
  console.log("decorator"); // decorator
  return <any>class Car_1 extends constructor {
    name = "G70";
    color = "black";
  };
}

@ClassDecorator1
class Car {
  constructor(public name: string, public price: number) {}
}

const car1 = new Car("G70", 5000);
console.log(car1);
// Car_1 {name: "G70", price: 5000, color: "black"}
```

2. 파라미터가 있는 class decorator

   : decorator에 파라미터를 입력받는다.

```ts
function ClassDecorator2(param: any) {
  console.log(param); // {someValue: "hello!"}
  return function (constructor: any) {
    console.log(constructor); 
    // ƒ Car(name, price) {
    //   this.name = name;
    //   this.price = price;
    // }
    return <any>class Car_2 extends constructor {
      someValue = param.someValue + " world!";
    };
  };
}

@ClassDecorator2({ someValue: "hello" })
class Car {
  constructor(public name: string, public price: number) {}
}

const car2 = new Car("SM5", 4000);
console.log(car2);
// Car_2 {name: "SM5", price: 4000, someValue: "hello world!"}
```

3. class property decorator

   : 클래스의 프로퍼티에 사용하는 데코레이터

```ts
class Container {
  private static map: { [key: string]: any } = {};

  static add(key: string, value: string): void {
    Container.map[key] = value;
  }

  static get(key: string): string {
    return Container.map[key];
  }
}

Container.add("myType", "Classic");
console.log(Container.get("myType"));

class Car {
  @inject("myType") // 주입
  private type!: Function;
  constructor(private name: string, private price: number) {}

  toString() {
    return `${this.name} ${this.type} ${this.price}`;
  }
}

function inject(param: string) {
  return function (target: any, decoratedPropertyName: string) {
    console.log(target); // {constructor: ƒ, toString: ƒ}
    console.log(decoratedPropertyName); // type
    target[decoratedPropertyName] = Container.get(param);
  };
}

const car3 = new Car("veloster", 3000);
console.log(car3);
console.log(car3.toString());
// Car {name: "veloster", price: 3000}
```

4. Lazy initialization

   : decorator는 class를 호출하여 인스턴스를 생성할 때 마다가 아닌 최초 클래스가 '정의' 될 때 한번만 실행된다고 하였다. 

   위와 같은 특징으로 인해 Container 클래스의 값을 수정하여도 이후 생성된 인스턴스에서의 'myType'의 값은 수정되지 않는다.

   이 문제를 해결하기 위해서는 함수를 리턴해 값을 필요로 할 때 실행하도록 구현한다.

```ts
class Container {
  private static map: { [key: string]: any } = {};

  static add(key: string, value: string): void {
    Container.map[key] = value;
  }

  static get(key: string): string {
    return Container.map[key];
  }
}

class Car {
  @inject("myType", "big car")
  private type!: Function;
  constructor(private name: string, private price: number) {}

  toString() {
    return `${this.name} ${this.type()} ${this.price}`;
  }
}

function inject(param: string, value: string) {
  return function (target: any, decoratedPropertyName: string) {
    target[decoratedPropertyName] = () => {
      Container.add(param, value);
      return Container.get(param);
    };
  };
}

const car3 = new Car("veloster", 3000);
console.log(car3);
console.log(car3.toString());

```



