import loadExternal from './utils/loadExternal'

loadExternal('common-packages', 'commonPackages')
  .then(({ setupCommonPackages }) => {
    setupCommonPackages()
    require('./app')
  })
  .catch(console.error)
