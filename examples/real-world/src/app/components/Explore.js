/* eslint-disable no-undef */

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Explore extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    githubRepo: PropTypes.string.isRequired
  }

  componentDidUpdate(prevProps) {
    if (this.props.value !== prevProps.value) {
      this.setInputValue(this.props.value)
    }
  }

  getInputValue = () => {
    return this.input.value
  }

  setInputValue = val => {
    // Generally mutating DOM is a bad idea in React components,
    // but doing this for a single uncontrolled field is less fuss
    // than making it controlled and maintaining a state for it.
    this.input.value = val
  }

  handleKeyUp = e => {
    if (e.keyCode === 13) {
      this.handleGoClick()
    }
  }

  handleGoClick = () => {
    this.props.onChange(this.getInputValue())
  }

  render() {
    return (
      <div>
        <p>Type a username or repo full name and hit 'Go':</p>
        <input
          size="45"
          ref={input => (this.input = input)}
          defaultValue={this.props.value}
          onKeyUp={this.handleKeyUp}
        />
        <button onClick={this.handleGoClick}>Go!</button>
        <p>
          Code on{' '}
          <a href={this.props.githubRepo} target="_blank" rel="noopener noreferrer">
            Github
          </a>
          .
        </p>
        <p>Move the DevTools with Ctrl+W or hide them with Ctrl+H.</p>
      </div>
    )
  }
}
