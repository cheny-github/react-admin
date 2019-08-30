import React from 'react';
import './App.css';
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import Login from './pages/login/login';
import Admin from './pages/admin/admin';
// import moduleName from 'r'
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/login" component={Login} ></Route>
        <Route path="/" component={Admin} ></Route>
      </Switch>
    </BrowserRouter> 
  );
}

export default App;
