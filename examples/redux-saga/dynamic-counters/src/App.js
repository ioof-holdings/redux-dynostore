import React from 'react'
import { connect } from 'react-redux'
import { DynaCounter } from './components'
import { ADD_COUNTER } from './actionTypes'

class App extends React.Component {
  constructor(props) {
    super(props)
    this._counterNameInputRef = React.createRef()
  }

  _handleNewCounterClick = () => {
    const counterName = this._counterNameInputRef.current.value.trim()
    if (this.props.allIds.indexOf(counterName) !== -1) {
      alert('Each identifier must be unique')
      return
    }
    if (counterName.length < 1) {
      alert('New identifier must not be null')
      return
    }
    this.props.addCounter(counterName)
  }

  render() {
    return (
      <div>
        <div>
          {this.props.allIds.map(id => {
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

const mapStateToProps = state => {
  return { allIds: state.counters.allIds }
}
const mapDispatchToProps = {
  addCounter: counterName => {
    return { type: ADD_COUNTER, value: counterName }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
