/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { createStore, combineReducers } from 'redux'
import dynostore, {
  dynamicReducers,
  createDynamicTarget,
  attachReducer,
  dispatchAction,
  shallowStateHandler,
  deepStateHandler,
  shallowMerge,
  deepMerge
} from 'src'

describe('integration tests', () => {
  const makeTestReducer = id => (state = `${id} - initialValue`, { type, newValue }) => {
    return type === 'CHANGE_VALUE' ? `${id} - ${newValue}` : state
  }

  const changeValue = newValue => ({ type: 'CHANGE_VALUE', newValue })

  const mockTarget = (enhancers, id, store, mockFn) => {
    return createDynamicTarget(enhancers)(id)(store)(mockFn)
  }

  test('should create dynostore', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const store = createStore(reducer, dynostore(dynamicReducers()))

    store.attachReducers({
      dynamic1: makeTestReducer('dynamic1'),
      dynamic2: makeTestReducer('dynamic2')
    })

    expect(store.getState()).toEqual({
      static1: 'static1 - initialValue',
      static2: 'static2 - initialValue',
      dynamic1: 'dynamic1 - initialValue',
      dynamic2: 'dynamic2 - initialValue'
    })
  })

  test('should create dynostore with shallow state handler', () => {
    const static1Reducer = makeTestReducer('static1')
    const static2Reducer = makeTestReducer('static2')

    const reducer = (state = {}, action) => {
      return {
        static1: static1Reducer(state.static1, action),
        static2: static2Reducer(state.static2, action)
      }
    }

    const store = createStore(
      reducer,
      dynostore(
        dynamicReducers({
          stateHandler: {
            ...shallowStateHandler,
            merge: (oldState, newState) => ({ ...shallowMerge(oldState, newState), defaultCalled: true })
          }
        })
      )
    )

    const dynamic1Reducer = makeTestReducer('dynamic1')
    const dynamic4Reducer = makeTestReducer('dynamic4')

    store.attachReducers({
      group1: (state = {}, action) => ({ dynamic1: dynamic1Reducer(state.dynamic1, action) }),
      'group1.dynamic2': makeTestReducer('dynamic2'),
      'group1.dynamic3': makeTestReducer('dynamic3')
    })

    store.attachReducers(
      {
        group2: (state = {}, action) => ({ dynamic4: dynamic4Reducer(state.dynamic4, action) }),
        'group2.dynamic5': makeTestReducer('dynamic5'),
        'group2.dynamic6': makeTestReducer('dynamic6')
      },
      {
        stateHandler: {
          ...deepStateHandler,
          merge: (oldState, newState) => ({ ...deepMerge(oldState, newState), overrideCalled: true })
        }
      }
    )

    store.dispatch(changeValue('newValue'))

    expect(store.getState()).toEqual({
      defaultCalled: true,
      static1: 'static1 - newValue',
      static2: 'static2 - newValue',
      group1: {
        defaultCalled: true,
        dynamic1: 'dynamic1 - newValue',
        dynamic2: 'dynamic2 - newValue',
        dynamic3: 'dynamic3 - newValue'
      },
      group2: {
        overrideCalled: true,
        dynamic4: 'dynamic4 - newValue',
        dynamic5: 'dynamic5 - newValue',
        dynamic6: 'dynamic6 - newValue'
      }
    })
  })

  test('should attach reducer', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const store = createStore(reducer, dynostore(dynamicReducers()))

    const target1 = mockTarget([attachReducer(makeTestReducer('dynamic1'))], 'dynamic1', store, jest.fn())
    const target2 = mockTarget([attachReducer(makeTestReducer('dynamic2'))], 'dynamic2', store, jest.fn())

    expect(store.getState()).toEqual({
      static1: 'static1 - initialValue',
      static2: 'static2 - initialValue',
      dynamic1: 'dynamic1 - initialValue',
      dynamic2: 'dynamic2 - initialValue'
    })

    expect(target1).not.toHaveBeenCalled()
    expect(target2).not.toHaveBeenCalled()
  })

  test('should detach reducer', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const store = createStore(reducer, dynostore(dynamicReducers()))

    mockTarget([attachReducer(makeTestReducer('dynamic1'))], 'dynamic1', store, jest.fn())
    mockTarget([attachReducer(makeTestReducer('dynamic2'))], 'dynamic2', store, jest.fn())

    store.detachReducers(['static2', 'dynamic1'])

    expect(store.getState()).toEqual({
      static1: 'static1 - initialValue',
      static2: 'static2 - initialValue',
      dynamic2: 'dynamic2 - initialValue'
    })

    expect(store.getState().hasOwnProperty('dynamic1')).toBe(false)
  })

  test('should dispatch actions', () => {
    const reducer = combineReducers({
      static1: makeTestReducer('static1'),
      static2: makeTestReducer('static2')
    })

    const store = createStore(reducer, dynostore(dynamicReducers()))

    const target = mockTarget([dispatchAction(changeValue('newValue'))], 'dynamic', store, jest.fn())

    expect(store.getState()).toEqual({
      static1: 'static1 - newValue',
      static2: 'static2 - newValue'
    })

    expect(target).not.toHaveBeenCalled()
  })

  test('should attach dynamic reducer to static key', () => {
    const reducer = combineReducers({
      group1: combineReducers({
        group2: combineReducers({
          key1: makeTestReducer('key1')
        }),
        key3: makeTestReducer('key3')
      }),
      key5: makeTestReducer('key5')
    })

    const store = createStore(reducer, dynostore(dynamicReducers()))

    store.attachReducers({
      group1: {
        group2: {
          key2: makeTestReducer('key2')
        },
        key4: makeTestReducer('key4')
      }
    })

    expect(store.getState()).toEqual({
      group1: {
        group2: {
          key1: 'key1 - initialValue',
          key2: 'key2 - initialValue'
        },
        key3: 'key3 - initialValue',
        key4: 'key4 - initialValue'
      },
      key5: 'key5 - initialValue'
    })
  })
})
