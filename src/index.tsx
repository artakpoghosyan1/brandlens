import * as React from 'react'
import ReactDOM from 'react-dom'
import './view/style/main.scss'
import { app } from './data/reducer'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeEnhancers } from './data/devTool'
import { PagesComponent } from './view/components/PagesComponent'

const store = createStore(
    app,
    composeEnhancers('effect')(applyMiddleware(thunk))
)

const App = () => {
    return (
        <>
            <Provider store={store}>
                <PagesComponent />
            </Provider>
        </>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))
