import React from 'react'
import { HashRouter, Redirect, Route, Switch } from 'react-router-dom'
import App from './App'
import Login from './components/pages/Login'
import NotFound from './components/pages/NotFound'
export default function Page() {
  return (
    <HashRouter>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/app/dashboard/index" push />} />
        <Route path="/app" component={App} />
        <Route path="/404" component={NotFound} />
        <Route exact path="/login" component={Login} />
        <Route component={NotFound} />
        <Route />
      </Switch>
    </HashRouter>
  )
}
