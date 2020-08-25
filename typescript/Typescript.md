# Typescript 설정

<br>

## 타입스크립트

- 오픈소스 프로그래밍 언어이다.
- 자바스크립트의 superset으로 ECMAScript의 최신 표준을 지원한다.
- 타입스크립트 컴파일러 (node.js가 설치되어있는 환경에서만 구동이가능한 application) 를 통해 타입스크립트를 자바스크립트로 변환한다.
- 정적인 언어로 컴파일 시간에 타입을 검사한다.
- `.ts` 의 파일타입을 가짐.
- 장점
  1. 강력한 타입으로 대규모 어플리케이션 개발에 용이함. (동적언어에 비해 실수줄어듬.)
  2. 유명한 자바스크립트 라이브러리와의 편리한 사용이 가능.
  3. 개발 도구에서의 강력한 지원

<br>

- typescript 설치

```bash
$ npm istall -g typescript 
```

- typescript를 javascript로 컴파일

  : 기본적으로 es5 형태의 문법의 js 파일로 변환됨.

  : 특정 문법으로 파일 변환을 필요로 하는 경우 `--target` 명령어를 사용한다.

  : es5 형식으로 파일 변환 시 es5에서 지원하지 않는 문법(EX.promise)들은 라이브러리 옵션을 사용하여 변환한다. `--lib` 명령어를 사용한다.

  : 기본적으로 es5는 nodejs에서 사용하는 commonjs 모듈 시스템을 사용한다. 만약 es6 문법의 js 파일로 변환하면서 commonjs의 모듈 시스템을 사용하고 싶다면, `--module` 명령어를 사용한다.

```bash
// 기본 컴파일
$ tsc [filename.ts]

// es6 문법으로 컴파일
$ tsc [filename.ts] --target es6

// es5에서 지원하지 않는 promise 컴파일
$ tsc [filename.ts] --lib es2015.promise

// es6 문법으로 컴파일 + commonjs 모듈 시스템 사용
$ tsc [filename.ts] --target es6 --module commonjs
```

> 타입스크립트 컴파일 설정 확인이 필요한 경우 `--showconfig` 명령어를 사용한다.

- typescript 설정파일 만들기

  1. 프로젝트의 root 폴더에 `tsconfig.json` 파일을 생성.

  2. config 설정

     ```ts
     // tsconfig.json
     {
       "include": ["src/**/*.ts"], // js로 컴파일할 파일 경로 설정
       "exclude": ["node_modules"], // js로 컴파일 시 배제할 dir
       "compilerOptions": {
         "module": "es6",    // 컴파일 할 모듈 방식 설정
         "rootDir": "src",   // ts 파일의 root dir
         "outDir": "dist",   // 컴파일 한 파일이 담길 dir
         "target": "es5",    // 컴파일 할 버젼
         "sourceMap": true,  // 브라우저 source 탭에서 typescript 소스코드의 확인이 가능하도록 하게 하는 설정.
         "removeComments": true, // ts파일에 적힌 주석을 js로 컴파일 시 제거.
         "noImplicitAny": true   // js 변수에 무조건적인 타입설정을 하게하는 설정.
       }
     }
     ```