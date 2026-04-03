---
title: "ts-jest-mock"
slug: "ts-jest-mock"
summary: "Une méthode pour inférer automatiquement les définitions de types Jest."
date: 2021-04-08T16:48:42.286Z
url: "https://github.com/lbenie/ts-jest-mock"
repository: "https://github.com/lbenie/ts-jest-mock"
tags: ["TypeScript", "ts-jest", "jest", "unit test"]
featured: false
status: "completed"
locale: "fr"
translationKey: "ts-jest-mock"
---

**ts-jest-mock**

It is a library to help writing unit tests using **jest** and **TypeScript**. With the `createMock` helper, you will be able to automatically infer the values when using all the `.mock` functions when using mocks.

For example, let's say `myAwesomeThing` is a function that returns a number.

```typescript
import { myAwesomeThing } from 'my-awesome-module'
import { createMock } from 'ts-jest-mock'

jest.mock('my-awesome-module')

const myAwesomeThingMock = createMock(myAwesomeThing)

describe('some describe', () => {
  it('test something', () => {
    myAwesomeThingMock.mockReturnValue(4)
    expect(myAwesomeThing()).toBe(4)
  })
})
```
