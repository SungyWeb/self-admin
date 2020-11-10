import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import AllComponents from '../components'
import { checkLogin } from '../units'
import { IFMenu, IFMenuBase } from './config'
import RouteConfig from './config'
import RouteWrapper from './RouteWrapper'
export default function CRouter(props: { auth: any }) {
  const { auth } = props
  const getPermits = (): any[]|null => auth ? auth.permissions : null
  const requireAuth = (permit: any, component: React.ReactElement) => {
    const permits = getPermits()
    if(permits && permits.includes(permit)) {
      return component
    }
    return <Redirect to="/404" />
  }
  const requireLogin = (permit: any, component: React.ReactElement) => {
    const permits = getPermits()
    if(!checkLogin(permits)) {
      return <Redirect to="/login" />
    }
    return permit ? requireAuth(permit, component) : component
  }
  const createMenu = (m: IFMenu) => {
    const route = (r: IFMenuBase) => {
      debugger
      const Component = r.component && AllComponents[r.component as keyof typeof AllComponents]
      return (
        <Route
          key={r.key}
          exact
          path={r.route}
          render={props => {
            const wrapper = <RouteWrapper {...{ ...props, Comp: Component, route: r }} />
            return r.isVisitor ? wrapper : requireLogin(r.requireAuth, wrapper);
          }}
        />
      )
    }
    const subRoute = (r: IFMenu): any => {
      return r.subs && r.subs.map((subR: IFMenu) => (subR.subs ? subRoute(subR) : route(subR)));
    }
    return m.component ? route(m) : subRoute(m)
  }
  type RouteConfigKeyType = keyof typeof RouteConfig
  const createRoute = (key: RouteConfigKeyType) => RouteConfig[key].map(createMenu)
  // const getAsyncMenus = () =>
  return (
    <Switch>
      { Object.keys(RouteConfig).map(key => createRoute(key as RouteConfigKeyType))}
      <Route render={() => <Redirect to="/404" />} />
    </Switch>
  )
}
