import 'babel-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { AppContainer } from 'react-hot-loader'
import { Provider } from 'react-redux'
import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import Immutable from 'immutable'

import App from '../shared/app'
import helloReducer from '../shared/reducer/hello'
import { APP_CONTAINER_SELECTOR } from '../shared/config'
import { isProd } from '../shared/util'
import setUpSocket from './socket'

const composeEnhancers = (isProd ? undefined : window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose
const preloadedState = window.__PRELOADED_STATE__

const store = createStore(combineReducers(
    { hello: helloReducer }),
    { hello: Immutable.fromJS(preloadedState.hello) },
    composeEnhancers(applyMiddleware(thunkMiddleware)))

const rootEl = document.querySelector(APP_CONTAINER_SELECTOR)

const wrapApp = (AppComponent, reduxStore) =>
    <Provider store={reduxStore}>
        <BrowserRouter>
            <AppContainer>
                <AppComponent />
            </AppContainer>
        </BrowserRouter>
    </Provider>

ReactDOM.render(wrapApp(App, store), rootEl)

if (module.hot) {
    module.hot.accept('../shared/app', () => {
        const NextApp = require('../shared/app').default
        ReactDOM.render(wrapApp(NextApp, store), rootEl)
    })
}

setUpSocket(store)