import React from 'react';
import {
    HashRouter as Router, Switch, Route
} from 'react-router-dom'
import Login from './pages/Login';
import Home from './pages/Home';
import ImgBed from './pages/ImgBed';
export default function App(){
    return (
        <Router>
            <Switch>
                <Route path="/home" component={Home}></Route>
                <Route path="/imgBed" component={ImgBed}></Route>
                <Route path="/" component={Login}></Route>
            </Switch>
        </Router>
    );
}