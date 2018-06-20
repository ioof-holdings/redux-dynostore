import React from 'react'
import { connect } from 'react-redux'
import Counter from './components/Counter'
import { ADD_COUNTER } from './actionTypes'

const initialState = { counters: ['Counter one', 'Counter two'] }

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTER:
      return { ...state, counters: [...state.counters, action.value] }
    default:
      return state
  }
}

class DynaCounter extends React.Component {
  constructor(props) {
    super(props)
    this.CounterInst = Counter.createInstance(props.id)
  }

  render() {
    return <this.CounterInst />
  }
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this._counterNameInputRef = React.createRef()
  }

  _handleNewCounterClick = () => {
    const counterName = this._counterNameInputRef.current.value.trim()
    if (this.props.counters.indexOf(counterName) !== -1) {
      alert('Each identifier must be unique')
      return
    }
    if (counterName.length < 1) {
      alert('New identifier must not be null')
      return
    }
    this.props.dispatch({ type: ADD_COUNTER, value: counterName })
  }

  render() {
    return (
      <div>
        <div>
          {this.props.counters.map(id => {
            return (
              <div>
                <span>{id}</span>
                <DynaCounter key={id} id={id} />
                <br />
              </div>
            )
          })}
        </div>
        <input type="text" ref={this._counterNameInputRef} />{' '}
        <button
          onClick={e => {
            this._handleNewCounterClick()
          }}
        >
          add a new counter
        </button>
      </div>
    )
  }
}

const mapStateToProps = state => ({ counters: state.page.counters })

export default connect(mapStateToProps)(App)
