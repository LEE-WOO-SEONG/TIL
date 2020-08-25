# Iterable

## for...of

- es3 : for (var i = 0; i < array.length; i++) {}
- es5: array.forEach(() => {})
- es6: for (const value of array) {}

## for...in

- 배열을 순회할 때는 사용하지 않을 것

  - index가 number가 아닌 string으로 나옴.
  - 배열의 프로퍼티를 순회할 수도 있다.
  - 런타임 환경에 따라 prototype 체인의 프로퍼티를 순회할 수도 있다.
  - 루프가 무작위로 순회할 수도 있다.
  - for...of 를 쓸 것.

- 객체를 순회할 때

  for (const prop of Object.keys(obj)) 도 사용할 수 있다.

- lib.es2015.iterable.d.ts

```ts
interface IteratorResult<T> {
    done: boolean;
    value: T;
}

interface Iterator<T> {
    next(value?: any): IteratorResult<T>;
    return?(value?: any): IteratorResult<T>;
    throw?(e?: any): IteratorResult<T>;
}

interface Iterable<T> {
    [Symbol.iterator](): Iterator<T>;
}

interface IterableIterator<T> extends Iterator<T> {
    [Symbol.iterator](): IterableIterator<T>;
}
```

- Custom iterable

```ts
class CustomIterable implements Iterable<string> {
  private _array: Array<string> = ["first", "second"];

  [Symbol.iterator]() {
    var nextIndex = 0;

    return {
      next: () => {
        return {
          value: this._array[nextIndex++],
          done: nextIndex > this._array.length
        };
      }
    };
  }
}

const cIterable = new CustomIterable();

for (const item of cIterable) {
  console.log(item);
}
```

