import React from 'react'
import { Counter } from '.'

export default class DynaCounter extends React.Component {
  constructor(props) {
    super(props)
    this.CounterInst = Counter.createInstance(props.id)
  }

  render() {
    return <this.CounterInst />
  }
}
