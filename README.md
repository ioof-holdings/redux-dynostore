# redux-dynostore

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/core.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/core)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/core.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/core)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/core.svg?style=flat-square)](/LICENSE.md)

[![All Contributors](https://img.shields.io/badge/all_contributors-4-orange.svg?style=flat-square)](#contributors)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

[![Watch on GitHub](https://img.shields.io/github/watchers/ioof-holdings/redux-dynostore.svg?style=social)](https://github.com/ioof-holdings/redux-dynostore/watchers)
[![Star on GitHub](https://img.shields.io/github/stars/ioof-holdings/redux-dynostore.svg?style=social)](https://github.com/ioof-holdings/redux-dynostore/stargazers)

These libraries provide tools for building dynamic [Redux](http://redux.js.org/) stores.

## Usage

Make a `dynostore`, including the dynamic enhancers you need:

```javascript
import dynostore, { dynamicReducers }  from '@redux-dynostore/core'
import { dynamicSagas } from '@redux-dynostore/redux-saga'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(reducer, compose(
  applyMiddleware(sagaMiddleware),
  dynostore(
    dynamicReducers(),
    dynamicSagas(sagaMiddleware)
  )
))
```

Make a dynamic component:

```javascript
import dynamic from '@redux-dynostore/react-redux'
import subspaced from '@redux-dynostore/react-redux-subspace'
import { attachReducer } from '@redux-dynostore/redux-subspace'
import runSaga from '@redux-dynostore/redux-subspace-saga'

export default dynamic('identifier', subspaced(), attachReducer(myReducer), runSaga(mySaga))(MyComponent)
```

## Packages

* [`@redux-dynostore/core`](./packages/redux-dynostore-core): The core package for redux-dynostore
* [`@redux-dynostore/react-redux`](./packages/redux-dynostore-react-redux): React bindings to simplify usage in react projects
* [`@redux-dynostore/redux-saga`](./packages/redux-dynostore-redux-saga): Dynamic enhancer to run sagas
* [`@redux-dynostore/redux-subspace`](./packages/redux-dynostore-redux-subspace): redux-subspace extensions
* [`@redux-dynostore/react-redux-subspace`](./packages/redux-dynostore-react-redux-subspace): react-redux-subspace extentions
* [`@redux-dynostore/redux-subspace-saga`](./packages/redux-dynostore-redux-subspace-saga): redux-subspace-saga extensions

## FAQ

_Whats with the name?_
> It's about adding dynamic features to redux stores… And it sounds like dinosaur. Raaaawwwwwrrrrrr!

## Media

* [From Monolith to Micro-Frontends](https://mpeyper.github.io/from-monolith-to-micro-frontends-wd42/) - [Web Developer 42˚](http://web.dev42.co/) (Michael Peyper)

## Contributors

Thanks goes to these wonderful people ([emojis](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore -->
| [<img src="https://avatars0.githubusercontent.com/u/23029903?v=4" width="100px;"/><br /><sub><b>Michael Peyper</b></sub>](https://github.com/mpeyper)<br />[💬](#question-mpeyper "Answering Questions") [🐛](https://github.com/ioof-holdings/@redux-dynostore/core/issues?q=author%3Ampeyper "Bug reports") [💻](https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=mpeyper "Code") [📖](https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=mpeyper "Documentation") [💡](#example-mpeyper "Examples") [🤔](#ideas-mpeyper "Ideas, Planning, & Feedback") [🚇](#infra-mpeyper "Infrastructure (Hosting, Build-Tools, etc)") [👀](#review-mpeyper "Reviewed Pull Requests") [📦](#platform-mpeyper "Packaging/porting to new platform") [📢](#talk-mpeyper "Talks") [⚠️](https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=mpeyper "Tests") [🔧](#tool-mpeyper "Tools") | [<img src="https://avatars2.githubusercontent.com/u/6560018?v=4" width="100px;"/><br /><sub><b>Jonathan Peyper</b></sub>](https://github.com/jpeyper)<br />[💬](#question-jpeyper "Answering Questions") [🐛](https://github.com/ioof-holdings/@redux-dynostore/core/issues?q=author%3Ajpeyper "Bug reports") [💻](https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=jpeyper "Code") [🤔](#ideas-jpeyper "Ideas, Planning, & Feedback") [👀](#review-jpeyper "Reviewed Pull Requests") [⚠️](https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=jpeyper "Tests") | [<img src="https://avatars3.githubusercontent.com/u/11048958?v=4" width="100px;"/><br /><sub><b>Greg Miller</b></sub>](https://github.com/Gregor1971)<br />[💡](#example-Gregor1971 "Examples") | [<img src="https://avatars2.githubusercontent.com/u/1493968?v=4" width="100px;"/><br /><sub><b>Ethorsen</b></sub>](https://github.com/Ethorsen)<br />[💻](https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=Ethorsen "Code") [📖](https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=Ethorsen "Documentation") [⚠️](https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=Ethorsen "Tests") |
| :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind are welcome!
