import * as React from 'react'
import ReactDOM from 'react-dom'
import { applyMiddleware, createStore } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import { composeEnhancers } from './data/devTool'
import { StartPageComponent } from './view/components/StartPageComponent'
import { AccessesPageComponent } from './view/components/AccessesPageComponent'
import { RecordingPageComponent } from './view/components/RecordingPageComponent'
import './view/styles/globalStyles'
import { reducer } from './data/reducer'
import { CompletePageComponent } from './view/components/CompletePageComponent'
import { ShareComponent } from './view/components/ShareComponent'

const store = createStore(reducer, composeEnhancers('effect')(applyMiddleware(thunk)))
const Root = () => {
    return (
        <Provider store={store}>
            <Router>
                <Route path="/start">
                    <StartPageComponent />
                </Route>
                <Route path="/accesses">
                    <AccessesPageComponent />
                </Route>
                <Route path="/recording">
                    <RecordingPageComponent />
                </Route>
                <Route path="/complete">
                    <CompletePageComponent />
                </Route>
                <Route path="/share">
                    <ShareComponent hashTags={['#hashtag', '#hashtag']} />
                </Route>
            </Router>
        </Provider>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'))
