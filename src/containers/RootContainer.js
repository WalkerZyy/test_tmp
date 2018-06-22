import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  Switch
} from 'react-router-dom'
import AsyncComponent from '@src/utils/AsyncComponent';
import HomePage from './HomePage';
import NotFoundPage from './NotFoundPage';
// import TestPage from './TestPage'
// import TestLocalPage from './TestLocalPage'
const CareerPlansPage = AsyncComponent(() => import("./CareerPlansPage.js"));
const LoginPage = AsyncComponent(() => import("./LoginPage"));

export const Routes = () => (
  <Switch>
    <Route exact path="/" component={HomePage}/>
    <Route path="/home/tk/:token" component={HomePage}/>
    <Route path="/login" component={LoginPage}/>
    <Route path="/careerplans" component={CareerPlansPage}/>
    <Route path="/404" component={NotFoundPage} />
    <Redirect from='*' to="/404" />
    {/* <Route path="/test" component={TestPage}/>
    <Route path="/test_local" component={TestLocalPage}/> */}
  </Switch>
)

const RootContainer = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/careerplans">CareerPlansPage</Link></li>
        {/* <li><Link to="/test">TestPage</Link></li>
        <li><Link to="/test_local">TestLocalPage</Link></li> */}
      </ul>
      <hr/>
      <Routes/>
    </div>
  </Router>
)

export default RootContainer;