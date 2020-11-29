import * as React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import { composeEnhancers } from './data/devTool'
import { StartPageComponent } from './view/components/StartPageComponent'
import { AccessesPageComponent } from './view/components/AccessesPageComponent'
import { RecordingPageComponent } from './view/components/RecordingPageComponent'
import './view/styles/globalStyles'
import { reducer } from './data/reducer'
import { CompletePageComponent } from './view/components/CompletePageComponent'
import { ShareComponent } from './view/components/ShareComponent'
import { ProtectedRoute } from './view/components/ProtectedRoute'

const store = createStore(reducer, composeEnhancers('brandLens')(applyMiddleware(thunk)))
const Root = () => {
    return (
        <Provider store={store}>
            <Router>
                <ProtectedRoute path="/start">
                    <StartPageComponent />
                </ProtectedRoute>
                <ProtectedRoute path="/accesses">
                    <AccessesPageComponent />
                </ProtectedRoute>
                <ProtectedRoute path="/recording">
                    <RecordingPageComponent />
                </ProtectedRoute>
                <ProtectedRoute path="/complete">
                    <CompletePageComponent />
                </ProtectedRoute>
                <ProtectedRoute path="/share">
                    <ShareComponent hashTags={['#hashtag', '#hashtag']} />
                </ProtectedRoute>
                <Route path="*">
                    <Redirect to="/recording" />
                </Route>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))
