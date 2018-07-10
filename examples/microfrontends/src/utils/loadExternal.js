const loadScript = uri =>
  new Promise((resolve, reject) => {
    const js = document.createElement('script')
    js.src = uri
    js.async = true
    js.onload = () => resolve()
    js.onerror = () => reject(Error('Failed to load'))
    document.head.appendChild(js)
  })

const loadExternal = (id, selector = id) => loadScript(`/externals/${id}.js`).then(() => window[selector])

export default loadExternal
