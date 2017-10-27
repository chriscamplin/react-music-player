import React from 'react'
import { PlayList } from './player'

class App extends React.Component {
  render () {
    return (
      <div className='container'>
        <h1 className='title'>IWOCA PLAYER</h1>
        <div className='players'>
          <section>
            <h1>Player</h1>
            <PlayList />
          </section>
        </div>
      </div>
    )
  }
}

export default App
