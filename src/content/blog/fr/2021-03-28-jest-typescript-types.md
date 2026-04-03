---
title: 'Comment ajouter des types avec Jest et TypeScript'
slug: 'how-to-add-types-with-jest-and-typescript'
description: 'Êtes-vous fatigué de devoir typer manuellement vos objets?'
date: 2021-03-28
tags: ['Jest', 'TypeScript', 'Unit Test', 'Test']
draft: false
locale: 'fr'
translationKey: 'jest-typescript-types'
featured: false
---

Êtes-vous comme moi et vous êtes fatigué de devoir ajouter manuellement des `types` dans vos tests unitaires `TypeScript` avec `ts-jest` ?

Si c'est le cas, cet article est peut-être pour vous !

Plongeons dans le problème.

> Ceci présuppose que vous écrivez vos tests unitaires avec jest et ts-jest.

## Installation des dépendances

Si vous ne les avez pas configurées, ajoutez ces dépendances à votre projet

```sh
  npm i -D jest @types/jest ts-jest
```

ou avec yarn

```sh
  yarn add jest @types/jest ts-jest --dev
```

## Configuration du projet

Configurons correctement votre fichier `jest.config.js`

```js
/**
 * @type {import('@jest/types').Config.ProjectConfig}
 */
module.exports = {
  preset: 'ts-jest',
  coverageReporters: ['html', 'lcov', 'text'],
  coverageDirectory: '<rootDir>/coverage',
  transform: {
    '^.+\.ts': 'ts-jest',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
    },
  },
}
```

Avec cela, nous indiquons à jest que nous voulons utiliser `ts-jest` comme transformateur pour les fichiers TypeScript.

## Le problème

```ts
export const myAwesomeFn = (a: number, b: number) => a + b
```

Disons que vous voulez simuler (mock) une fonction d'un module quelconque ; `ts-jest` ne compilera pas si vous voulez simuler le module. Voyons l'exemple ci-dessous :

```ts {7}
import { myAwesomeFn } from './my-awesome-module'

jest.mock('./my-awesome-module')

describe('my awesome describe', () => {
  it('should assert something cool', () => {
    myAwesomeFn.mockReturnValue('myAwesomeReturn')
  })
})
```

Dans l'extrait de code ci-dessus, la ligne 7 ne compilera pas car TypeScript ne peut pas déduire correctement que `myAwesomeFn` est simulé par `jest`.

### Solution possible

Une façon de résoudre ce problème est de convertir (cast) la variable `myAwesomeFn`. Par exemple :

```ts {7}
import { myAwesomeFn } from './my-awesome-module'

jest.mock('./my-awesome-module')

describe('my awesome describe', () => {
  it('should assert something cool', () => {
    (myAwesomeFn as jest.Mock).mockReturnValue('myAwesomeReturn')
  })
})
```

Cela fonctionnera, mais vous n'obtiendrez pas d'inférence appropriée sur le type de retour de `myAwesomeFn`.

> @types/jest nous fournit de belles constructions de simulation -- jest.MockedFunction, jest.MockedFunction, jest.Mocked et finalement jest.Mock

Avec cela à l'esprit, nous pouvons améliorer le typage en utilisant la bonne construction de _mock_. Mais attendez ? Comment TypeScript peut-il déduire quelle construction utiliser ?

### Solution que j'ai trouvée

Avec les génériques `TypeScript` et `@types/jest`, nous pouvons trouver un moyen élégant de laisser TypeScript faire le travail pour nous :)

J'ai créé ce petit paquet npm [ts-jest-mock](https://github.com/lbenie/ts-jest-mock).

Ce paquet abstrait un type personnalisé et une fonction utilitaire que nous pouvons utiliser pour améliorer notre DX avec `ts-jest`.

#### Exemple avec ts-jest-mock

```ts {2,6,11,16}
import { myAwesomeFn } from './my-awesome-module'
import { createMock } from 'ts-jest-mock'

jest.mock('./my-awesome-module')

const myAwesomeFnMock = createMock(myAwesomeFn)

describe('my awesome describe', () => {
  beforeEach(() => {
    // Erreur de type, TypeScript se plaindra que nous passons une chaîne au lieu d'un nombre
    myAwesomeFnMock.mockReturnValue('myAwesomeReturn')
  })

  it('should assert something cool', () => {
    // ne sera pas exécuté à cause de l'erreur du compilateur
    expect(myAwesomeFnMock()).toBe('myAwesomeReturn')
  })
})
```

Tout d'abord, à la ligne `2`, nous importons la fonction utilitaire de `ts-jest-mock`. Ensuite, à la ligne `11`, nous utilisons le pattern `beforeEach` pour créer et déduire correctement notre simulation avec le type de retour réel de notre module simulé.
Puisqu'il a correctement déduit les arguments et les types de retour attendus, la ligne `11` obtiendra une erreur du compilateur car nous essayons de retourner une `string` mais le type de retour réel est un `number` si vous revenez en arrière lorsque nous avons défini cette fonction [ici](#le-problème). Enfin, la ligne `16` ne sera pas exécutée du tout et jest se terminera avec un code d'erreur.

## Conclusion

Voilà, c'est ainsi que vous pouvez obtenir une inférence de type appropriée dans un test unitaire en utilisant `jest` et `ts-jest` avec l'aide de `ts-jest-mock`.
