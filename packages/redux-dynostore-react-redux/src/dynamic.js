/**
 * Copyright 2018, IOOF Holdings Limited.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

import React from 'react'
import PropTypes from 'prop-types'
import hoistNonReactStatics from 'hoist-non-react-statics'
import wrapDisplayName from 'recompose/wrapDisplayName'
import { createDynamicTarget } from '@redux-dynostore/core'

const createDynamic = (identifier, enhancers) => {
  const dynamicEnhancer = createDynamicTarget(enhancers)(identifier)

  return Component => {
    class Dynamic extends React.Component {
      constructor(props, context) {
        super(props, context)
        this.EnhancedComponent = dynamicEnhancer(context.store)(Component)
      }

      render() {
        return <this.EnhancedComponent identifier={identifier} {...this.props} />
      }
    }

    hoistNonReactStatics(Dynamic, Component)
    Dynamic.displayName = wrapDisplayName(Component, 'Dynamic')

    Dynamic.createInstance = (instanceIdentfier, ...instanceEnhancers) =>
      createDynamic(instanceIdentfier, enhancers.concat(instanceEnhancers))(Component)

    Dynamic.contextTypes = {
      store: PropTypes.object
    }

    return Dynamic
  }
}

const dynamic = (identifier, ...enhancers) => createDynamic(identifier, enhancers)

export default dynamic
