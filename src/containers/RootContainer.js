import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import HomePage from './HomePage'
// import TestPage from './TestPage'
// import TestLocalPage from './TestLocalPage'

export const Routes = () => (
  <React.Fragment>
    <Route exact path="/" component={HomePage}/>
    <Route path="/home/tk/:token" component={HomePage}/>
    {/* <Route path="/test" component={TestPage}/>
    <Route path="/test_local" component={TestLocalPage}/> */}
  </React.Fragment>
)

const RootContainer = () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        {/* <li><Link to="/test">TestPage</Link></li>
        <li><Link to="/test_local">TestLocalPage</Link></li> */}
      </ul>
      <hr/>
      <Routes/>
    </div>
  </Router>
)

export default RootContainer;