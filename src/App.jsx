import React from 'react';

import {
    HashRouter as Router, Switch, Route
} from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';
import RouterGuard from './components/RouterGuard';


export default function App(){
    
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <RouterGuard/>
                </Switch>
            </Router>
        </Provider>
        
    );
}