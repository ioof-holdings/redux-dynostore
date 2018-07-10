import React from 'react'
import External from '../components/External'

const ExternalHome = External('home')

const Home = () => (
  <main>
    <h2>Welcome</h2>
    <ExternalHome />
  </main>
)

export default Home
