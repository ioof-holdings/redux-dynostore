/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useState, useEffect, useRef } from 'react'
import { ReactReduxContext } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { createDynamicTarget } from '@redux-dynostore/core'

const createDynamic = (identifier, enhancers) => {
  const dynamicEnhancer = createDynamicTarget(enhancers)(identifier)

  const useEnhancedComponent = (store, Component) => {
    const [dynamicState, setDynamicState] = useState(() => ({
      EnhancedComponent: dynamicEnhancer(store)(Component),
      store
    }))
    useEffect(() => {
      if (store !== dynamicState.store) {
        const NewEnhancedComponent = dynamicEnhancer(store)(Component)
        setDynamicState({ EnhancedComponent: NewEnhancedComponent, store })
      }
    }, [store])
    return dynamicState.EnhancedComponent
  }

  return Component => {
    const Dynamic = (props) => {
      const { store } = useContext(ReactReduxContext)
      const EnhancedComponent = useEnhancedComponent(store, Component)
      return <EnhancedComponent identifier={identifier} {...props} />
    }

    hoistNonReactStatics(Dynamic, Component)
    Dynamic.displayName = wrapDisplayName(Component, 'Dynamic')

    Dynamic.createInstance = (instanceIdentfier, ...instanceEnhancers) =>
      createDynamic(instanceIdentfier, enhancers.concat(instanceEnhancers))(Component)

    return Dynamic
  }
}

const dynamic = (identifier, ...enhancers) => createDynamic(identifier, enhancers)

export default dynamic
