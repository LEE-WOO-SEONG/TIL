# Method overload

: 동일한 이름을 가진 함수, 메소드등을 덮어 쓰는것?

```ts
function overloads(arg: number): number;
function overloads(arg: string, another: number): string;
function overloads(arg: number | string, another? : number) : number | string {
    if (typeof arg === 'string') {
        return 'string';
    }
    return arg;
}
```

