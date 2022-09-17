window.sessionStorage.clear();

// eslint-disable-next-line import/no-anonymous-default-export
export default Comp => {
  return class CacheWrapper extends Comp {
    constructor (props) {
      super(props)
      // 初始化
      if (!window.sessionStorage.getItem(this.CACHE_NAME)) {
        window.sessionStorage.setItem(this.CACHE_NAME, JSON.stringify({}))
      }
      const { history: { action } = {} } = props
      // 取 state
      if (action === 'POP') {
        const { state = {} } = JSON.parse(window.sessionStorage.getItem(this.CACHE_NAME))
        this.state = {
          ...state,
        }
      }
    }

    async componentDidMount () {
      if (super.componentDidMount) {
        await super.componentDidMount()
      }
      const { history: { action } = {} } = this.props
      if (action !== 'POP') return
      const { scrollTops = [] } = JSON.parse(window.sessionStorage.getItem(this.CACHE_NAME) || {})
      const { scrollElRefs = [] } = this
      // 取 scrollTop
      scrollElRefs.forEach((el, index) => {
        if (el && el.scrollTop !== undefined) {
          el.scrollTop = scrollTops[index]
        }
      })
    }

    componentWillUnmount () {
      const { history: { action } = {} } = this.props
      if (super.componentWillUnmount) {
        super.componentWillUnmount()
      }
      if (action === 'PUSH') {
        const scrollTops = []
        const { scrollElRefs = [] } = this
        scrollElRefs.forEach(ref => {
          if (ref && ref.scrollTop !== undefined) {
            scrollTops.push(ref.scrollTop)
          }
        })
        window.sessionStorage.setItem(this.CACHE_NAME, JSON.stringify({
          state: {
              ...this.state
            },
            scrollTops
        }))
      }
      if (action === 'POP') {
        window.sessionStorage.setItem(this.CACHE_NAME, JSON.stringify({}))
      }
    }
  }
}