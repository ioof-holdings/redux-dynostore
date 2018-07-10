import React from 'react'

const Home = () => (
  <div>
    <p>
      This example is designed to demonstrate how{' '}
      <a href="https://github.com/ioof-holdings/redux-dynostore">redux-dynostore</a> can be used to dynamically load{' '}
      <a href="https://mpeyper.github.io/from-monolith-to-micro-frontends-wd42/#/1">microfrontends</a>.
    </p>
    <p>
      Each page of this demo loads a seperate bundle that can be versioned, built, tested, deployed and released in
      complete isolation with the parent application or other microfrontends.
    </p>
    <p>Note: this demo only show how the integration can work, not a complete development lifecycle.</p>
  </div>
)

export default Home
