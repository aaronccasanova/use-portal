import 'react-app-polyfill/ie11'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { usePortal } from '../src'

const App = () => {
  const { Portal } = usePortal()
  return (
    <div>
      Parent
      <Portal>
        Child
      </Portal>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
