import * as React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router } from 'react-router-dom'

import { composeEnhancers } from './data/devTool'
import { StartPageComponent } from './view/components/StartPageComponent'
import { AccessesPageComponent } from './view/components/AccessesPageComponent'
import { RecordingPageComponent } from './view/components/RecordingPageComponent'
import './view/styles/globalStyles'
import { reducer } from './data/reducer'
import { ShareComponent } from './view/components/ShareComponent'
import { ProtectedRoute } from './view/components/ProtectedRoute'
import { EditVideoComponent } from './view/components/EditVideoComponent'
import { RecordingCompleteComponent } from './view/components/RecordingCompleteComponent'

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
                <ProtectedRoute path="/share">
                    <ShareComponent hashTags={['#hashtag', '#hashtag']} />
                </ProtectedRoute>
                <ProtectedRoute path="/edit">
                    <EditVideoComponent />
                </ProtectedRoute>
                <ProtectedRoute path="/complete">
                    <RecordingCompleteComponent />
                </ProtectedRoute>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))
