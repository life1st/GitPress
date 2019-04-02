import React, {Component} from 'react'
import { BrowserRouter as Router, Route, Link, Switch, Redirect } from 'react-router-dom'
import Loadable from 'react-loadable'

import Home from '../pages/Home'
const Loading = () => (
  <div>
    Loading...
  </div>
)

const About = Loadable({
  loader: () => import('../pages/About'),
  loading: Loading
})

const Repos = Loadable({
  loader: () => import('../pages/Repos'),
  loading: Loading
})

const Repo = Loadable({
  loader: () => import('../pages/Repo'),
  loading: Loading
})

const Login = Loadable({
  loader: () => import('../pages/Login'),
  loading: Loading
})

class Pages extends Component {
  render() {
    return (
      <Router>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
        <Link to='/repos'>Repos</Link>
        <Link to='/login'>Login</Link>
        <Switch>
          <Route exact path='/' component={Home} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/about' component={About} />
          <Route exact path='/repos' component={Repos} />
          <Route path='/repo/:sha' component={Repo} />
          <Route path='/repo' component={Repo} />
          <Redirect to='/'></Redirect>
        </Switch>
      </Router>
    )
  }

  handleRepoClick = (repo) => {
    console.log(repo)
  }
}

export default Pages