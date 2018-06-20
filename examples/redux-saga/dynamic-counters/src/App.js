import React from 'react'
import { connect } from 'react-redux'
import Counter from './components/Counter'
import { ADD_COUNTER } from './actionTypes'

const initialState = { counterIds: ['Counter one', 'Counter two'] }

export const pageReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COUNTER:
      return { ...state, counterIds: [...state.counterIds, action.value] }
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
    if (this.props.counterIds.indexOf(counterName) !== -1) {
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
          {this.props.counterIds.map(id => {
            return (
              <div key={id}>
                <span>{id}</span>
                <DynaCounter id={id} />
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

const mapStateToProps = state => ({ counterIds: state.page.counterIds })

export default connect(mapStateToProps)(App)
