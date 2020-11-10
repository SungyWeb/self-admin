import React from 'react'
import DocumentTitle from 'react-document-title'
export default function RouteWrapper(props: any) {
  const {Comp, route, ...restProps} = props
  return <DocumentTitle title={route.title} ><Comp {...restProps} /></DocumentTitle>
}
