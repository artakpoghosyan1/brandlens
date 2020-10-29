import * as React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { app } from './data/reducer'
import { composeEnhancers } from './data/devTool'
import { StartComponent } from './view/components/StartComponent'
import { AccessesComponent } from './view/components/AccessesComponent'
import { RecordingComponent } from './view/components/RecordingComponent'
import './view/styles/globalStyles'

const store = createStore(app, composeEnhancers('effect')(applyMiddleware(thunk)))

const Root = () => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/start">
                    <StartComponent />
                </Route>
                <Route path="/accesses">
                    <AccessesComponent />
                </Route>
                <Route path="/recording">
                    <RecordingComponent />
                </Route>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))
