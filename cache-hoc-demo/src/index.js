import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Switch, Route } from 'react-router-dom';
import './index.css';
import App from './App';
import Item from './Item';

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
        <Switch>
            <Route exact path='/' component={App}/>
            <Route exact path='/item' component={Item}/> 
        </Switch>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
