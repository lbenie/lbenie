---
title: 'How To Add Types With Jest And Typescript'
slug: 'how-to-add-types-with-jest-and-typescript'
tags: ['Jest', 'TypeScript', 'Unit Test', 'Test']
excerpt: 'Are you tired of having to manually type your objects?'
date: 2021-03-28
---

Are you like and you are tired of having to manually add `types` in your `TypeScript` unit tests with `ts-jest`?

If that's the case this article may be for you!

Let's dive into the problem.

> This presumes that you are writing your unit tests with jest and ts-jest.

## Installing dependencies

If you don't have them set up, then add these dependencies to your project

```sh
  npm i -D jest @types/jest ts-jest
```

or with yarn

```sh
  yarn add jest @types/jest ts-jest --dev
```

## Project setup

Let's set up your `jest.config.js` file properly

```js
/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  preset: 'ts-jest',
  coverageReporters: ['html', 'lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\\.ts': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
}
```

With this, we tell jest that we want to use `ts-jest` as our transformer for TypeScript files.

## The problem

```ts
export const myAwesomeFn = (a: number, b: number) => a + b
```

Let's say you want to mock a function from a random module; `ts-jest` won't compile if you want to mock the module. Let's see the example below:

```ts{7}
import { myAwesomeFn } from './my-awesome-module'

jest.mock('./my-awesome-module')

describe('my awesome describe', () => {
  it('should assert something cool', () => {
    myAwesomeFn.mockReturnValue('myAwesomeReturn')
  })
})
```

In the code snippet above, line 7 won't compile since TypeScript cannot properly infer that `myAwesomeFn` is mocked by `jest`.

### Possible solution

One way to resolve this problem is by casting the `myAwesomeFn` variable. For example:

```ts{7}
import { myAwesomeFn } from './my-awesome-module'

jest.mock('./my-awesome-module')

describe('my awesome describe', () => {
  it('should assert something cool', () => {
    (myAwesomeFn as jest.Mock).mockReturnValue('myAwesomeReturn')
  })
})
```

This will work but you won't get proper inference on the return type of `myAwesomeFn`.

> @types/jest provides us with nice mock construct -- jest.MockedFunction, jest.MockedFunction, jest.Mocked and finally jest.Mock

With that in mind, we can improve the typings by using the right _mock_ construct. But wait? How can TypeScript infer which construct to use?

### Solution I came up with

With `TypeScript` generics and `@types/jest` we can come up with a nice way to let TypeScript do the job for us :)

I created this little npm package [ts-jest-mock](https://github.com/lbenie/ts-jest-mock).

This package abstracts away a custom type and a utility function that we can use to improve our DX with `ts-jest`.

#### Example with ts-jest-mock

```ts{2,6,11,16}
import { myAwesomeFn } from './my-awesome-module'
import { createMock } from 'ts-jest-mock'

jest.mock('./my-awesome-module')

const myAwesomeFnMock = createMock(myAwesomeFn)

describe('my awesome describe', () => {
  beforeEach(() => {
    // Type error, TypeScript will complain that we are passing a string instead of a number
    myAwesomeFnMock.mockReturnValue('myAwesomeReturn')
  })

  it('should assert something cool', () => {
    // won't get executed because of compiler error
    expect(myAwesomeFnMock()).toBe('myAwesomeReturn')
  })
})
```

First on line `2` we import the utility function from `ts-jest-mock`. Then on line `11` we use the `beforeEach` pattern to properly create and infer our mock with the actual return type from our mocked module.
Since it properly infered the arguments and return types expected, line `11` will get a compiler error because we are trying to return a `string` but the actual return type is a `number` if you circle back when we defined this function [here](#the-problem). Finally, line `16` won't get executed at jest will exit with an error code.

## Conclusion

That's it folk, that's how you can get proper type inference in a unit test using `jest` and `ts-jest` with the help of `ts-jest-mock`.
