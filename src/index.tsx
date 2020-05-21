import * as React from 'react'
import ReactDOM from 'react-dom'
import './view/style/main.scss'
import { HomeComponent } from './view/components/HomeComponent'

const App = () => {
  return <HomeComponent />
}

ReactDOM.render(<App />, document.getElementById('root'))
