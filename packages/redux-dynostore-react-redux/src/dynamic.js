/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React, { useContext, useEffect, useState } from 'react'
import { ReactReduxContext } from 'react-redux'
import hoistNonReactStatics from 'hoist-non-react-statics'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { createDynamicTarget } from '@redux-dynostore/core'
import isObject from './utils/isObject'

const splitOptions = args => {
  const [lastItem] = args.slice(-1)
  return isObject(lastItem) ? [args.slice(0, -1), lastItem] : [args, {}]
}

const createDynamic = (identifier, enhancers, options) => {
  const { context = ReactReduxContext } = options
  const dynamicEnhancer = createDynamicTarget(enhancers)(identifier)

  return Component => {
    const Dynamic = React.forwardRef((props, ref) => {
      const { store } = useContext(context)
      const [EnhancedComponent, setEnhancedComponent] = useState(null)
      useEffect(() => {
        setEnhancedComponent(() => dynamicEnhancer(store)(Component))
      }, [store])
      return EnhancedComponent && <EnhancedComponent identifier={identifier} {...props} ref={ref} />
    })

    hoistNonReactStatics(Dynamic, Component)
    Dynamic.displayName = wrapDisplayName(Component, 'Dynamic')

    Dynamic.createInstance = (instanceIdentifier, ...instanceEnhancers) =>
      createDynamic(instanceIdentifier, enhancers.concat(instanceEnhancers), options)(Component)

    return Dynamic
  }
}

const dynamic = (identifier, ...enhancers) => {
  return createDynamic(identifier, ...splitOptions(enhancers))
}

export default dynamic
