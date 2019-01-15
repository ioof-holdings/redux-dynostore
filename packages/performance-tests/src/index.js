import 'colors'
import { createStore, combineReducers } from 'redux'
import dynostore, { dynamicReducers, deepStateHandler, shallowStateHandler } from '@redux-dynostore/core'

process.env.NODE_ENV = 'production'

const timed = func => {
  const startTime = process.hrtime()
  func()
  const duration = process.hrtime(startTime)
  return duration[0] * 1e3 + duration[1] * 1e-6
}

const makeRow = (values, columnWidths) =>
  `| ${values.map((value, index) => value.toString().padEnd(columnWidths[index])).join(' | ')} |`

const makeTestReducer = id => (state = { value: 0 }, action) => {
  return action.id === id && action.type === 'CHANGE_VALUE' ? { ...state, value: action.newValue } : state
}

const changeValue = (id, newValue) => ({ type: 'CHANGE_VALUE', id, newValue })

const reduxSetup = (branches, depth, testCases) => {
  let reducerCount = 0
  const actions = []
  const makeReducer = (width, depth, parentId) => {
    const reducers = {}

    for (let i = 1; i <= width; i++) {
      const id = `${parentId ? `${parentId}-` : ''}${i}`
      if (depth > 1) {
        reducers[id] = makeReducer(width, depth - 1, id)
      } else {
        reducers[id] = makeTestReducer(id)
        reducerCount++
        for (let newValue = 1; newValue <= testCases; newValue++) {
          actions.push(changeValue(id, newValue))
        }
      }
    }

    return combineReducers(reducers)
  }

  const store = createStore(makeReducer(branches, depth))

  return { name: 'redux', store, actions, reducerCount }
}

const dynostoreSetup = (branches, depth, testCases, options) => {
  let reducerCount = 0
  const actions = []
  const makeReducers = (width, depth, parentId) => {
    const reducers = {}

    for (let i = 1; i <= width; i++) {
      const id = `${parentId ? `${parentId}-` : ''}${i}`
      if (depth > 1) {
        reducers[id] = makeReducers(width, depth - 1, id)
      } else {
        reducers[id] = makeTestReducer(id)
        reducerCount++
        for (let newValue = 1; newValue <= testCases; newValue++) {
          actions.push(changeValue(id, newValue))
        }
      }
    }

    return reducers
  }

  const store = createStore((state = {}) => state, dynostore(dynamicReducers(), options))
  store.attachReducers(makeReducers(branches, depth))

  return { name: 'dynostore', store, actions, reducerCount }
}

const testCase = (scenario, setup, { branches, depth, updates = 3 }, variations = [{}]) => ({
  scenario,
  setup,
  branches,
  depth,
  updates,
  variations
})

const createTestCaseSet = (scenario, constraints) => [
  testCase(scenario, reduxSetup, constraints),
  testCase(scenario, dynostoreSetup, constraints, [
    { name: 'shallow', stateHandler: shallowStateHandler },
    { name: 'deep', stateHandler: deepStateHandler }
  ])
]

const testCases = [
  ...createTestCaseSet('flat', { branches: 1024, depth: 1 }),
  ...createTestCaseSet('shallow', { branches: 32, depth: 2 }),
  ...createTestCaseSet('deep', { branches: 2, depth: 10 }),
  ...createTestCaseSet('deepest', { branches: 1, depth: 1024, updates: 3072 }),
  ...createTestCaseSet('balanced', { branches: 4, depth: 5 })
]

let testCount = 0

console.log(`Starting performance tests`.blue)
console.log()

const columnWidths = [4, 23, 8, 8, 5, 13, 7, 15, 24]

console.log(
  makeRow(
    [
      'case',
      'setup',
      'scenario',
      'branches',
      'depth',
      'leaf reducers',
      'updates',
      'total time (ms)',
      'average update time (ms)'
    ],
    columnWidths
  )
)
console.log(makeRow(columnWidths.map(width => '-'.repeat(width)), columnWidths))

testCases.forEach(({ scenario, setup, branches, depth, updates, variations }) => {
  variations.forEach(({ name: variationName, ...options }) => {
    const { name, store, actions, reducerCount } = setup(branches, depth, updates, options)

    const splitTimes = []
    const totalTime = timed(() => {
      actions.forEach(action => {
        const splitTime = timed(() => store.dispatch(action))
        splitTimes.push(splitTime)
      })
    })

    console.log(
      makeRow(
        [
          ++testCount,
          `${name}${variationName ? ` (${variationName})` : ''}`,
          scenario,
          branches,
          depth,
          reducerCount,
          actions.length,
          totalTime.toFixed(2),
          (splitTimes.reduce((prev, next) => prev + next) / splitTimes.length).toFixed(2)
        ],
        columnWidths
      )
    )
  })
})
