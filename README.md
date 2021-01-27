# redux-dynostore

## Deprecated

**This library is no longer being actively maintained.**

IOOF has been slowly moving away from the ubiquitous use of Redux as a core piece of our micro-frontend architecture and have been actively replacing
the usage of this library with more standard React and JavaScript patterns.  Due to some technical constraints, we've also been unable to upgrade to
the latest version of the library ourselves for quite some time now, further fuelling our desire to move away from this solution.

At this time, we will be ceasing all maintenance tasks and we recommend that you consider using an alternative library:

* [`redux-dynamic-modules`](https://www.npmjs.com/package/redux-dynamic-modules)
* [`redux-injectors`](https://www.npmjs.com/package/redux-injectors)
* [`redux-injector`](https://www.npmjs.com/package/redux-injector)
* [`redux-reducers-injector`](https://www.npmjs.com/package/redux-reducers-injector)
* [`redux-sagas-injector`](https://www.npmjs.com/package/redux-sagas-injector)
* [`paradux`](https://www.npmjs.com/package/paradux)

If you want to continue using this library, we encourage you to fork this repo and take over maintenance yourself.

---

[![build status](https://img.shields.io/travis/ioof-holdings/redux-dynostore/master.svg?style=flat-square)](https://travis-ci.org/ioof-holdings/redux-dynostore)
[![npm version](https://img.shields.io/npm/v/@redux-dynostore/core.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/core)
[![npm downloads](https://img.shields.io/npm/dm/@redux-dynostore/core.svg?style=flat-square)](https://www.npmjs.com/package/@redux-dynostore/core)
[![License: BSD-3-Clause](https://img.shields.io/npm/l/@redux-dynostore/core.svg?style=flat-square)](/LICENSE.md)

[![All Contributors](https://img.shields.io/badge/all_contributors-5-orange.svg?style=flat-square)](#contributors)
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
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="https://github.com/mpeyper"><img src="https://avatars0.githubusercontent.com/u/23029903?v=4" width="100px;" alt=""/><br /><sub><b>Michael Peyper</b></sub></a><br /><a href="#question-mpeyper" title="Answering Questions">💬</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/issues?q=author%3Ampeyper" title="Bug reports">🐛</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=mpeyper" title="Code">💻</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=mpeyper" title="Documentation">📖</a> <a href="#example-mpeyper" title="Examples">💡</a> <a href="#ideas-mpeyper" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-mpeyper" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/pulls?q=is%3Apr+reviewed-by%3Ampeyper" title="Reviewed Pull Requests">👀</a> <a href="#platform-mpeyper" title="Packaging/porting to new platform">📦</a> <a href="#talk-mpeyper" title="Talks">📢</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=mpeyper" title="Tests">⚠️</a> <a href="#tool-mpeyper" title="Tools">🔧</a></td>
    <td align="center"><a href="https://github.com/jpeyper"><img src="https://avatars2.githubusercontent.com/u/6560018?v=4" width="100px;" alt=""/><br /><sub><b>Jonathan Peyper</b></sub></a><br /><a href="#question-jpeyper" title="Answering Questions">💬</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/issues?q=author%3Ajpeyper" title="Bug reports">🐛</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=jpeyper" title="Code">💻</a> <a href="#ideas-jpeyper" title="Ideas, Planning, & Feedback">🤔</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/pulls?q=is%3Apr+reviewed-by%3Ajpeyper" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=jpeyper" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Gregor1971"><img src="https://avatars3.githubusercontent.com/u/11048958?v=4" width="100px;" alt=""/><br /><sub><b>Greg Miller</b></sub></a><br /><a href="#example-Gregor1971" title="Examples">💡</a></td>
    <td align="center"><a href="https://github.com/Ethorsen"><img src="https://avatars2.githubusercontent.com/u/1493968?v=4" width="100px;" alt=""/><br /><sub><b>Ethorsen</b></sub></a><br /><a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=Ethorsen" title="Code">💻</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=Ethorsen" title="Documentation">📖</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=Ethorsen" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/Jake88"><img src="https://avatars0.githubusercontent.com/u/6849798?v=4" width="100px;" alt=""/><br /><sub><b>Jake88</b></sub></a><br /><a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=Jake88" title="Code">💻</a> <a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=Jake88" title="Tests">⚠️</a></td>
    <td align="center"><a href="https://github.com/macklay"><img src="https://avatars3.githubusercontent.com/u/6972011?v=4" width="100px;" alt=""/><br /><sub><b>Nick Smirnov</b></sub></a><br /><a href="https://github.com/ioof-holdings/@redux-dynostore/core/commits?author=macklay" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.
Contributions of any kind are welcome!
