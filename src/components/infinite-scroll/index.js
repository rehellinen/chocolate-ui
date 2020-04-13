import { throttle } from 'throttle-debounce'

function getStyle (element, styleName) {
  if (!element || !styleName) return null

  const computed = window.getComputedStyle(element, null)
  return computed ? computed[styleName] : null
}

export const getScrollContainer = (el) => {
  let parent = el
  while (parent) {
    if ([window, document, document.documentElement].includes(parent)) {
      return window
    }

    const overflow = getStyle(parent, 'overflow-y')
    if (overflow.match(/(scroll|auto)/)) {
      return parent
    }
    parent = parent.parentNode
  }

  return parent
}

const getPositionSize = (el, prop) => {
  return el === window || el === document
    ? document.documentElement[prop]
    : el[prop]
}

const getOffsetHeight = el => getPositionSize(el, 'offsetHeight')

const getClientHeight = el => getPositionSize(el, 'clientHeight')

const scope = 'InfiniteScroll'
const attributes = {
  delay: {
    type: Number,
    default: 200
  },
  distance: {
    type: Number,
    default: 0
  },
  disabled: {
    type: Boolean,
    default: false
  },
  immediate: {
    type: Boolean,
    default: true
  }
}

const getScrollOptions = (el, vm) => {
  return Object.entries(attributes).reduce((map, [key, option]) => {
    const { type, default: defaultValue } = option

    let value = el.getAttribute(`infinite-scroll-${key}`)
    value = vm[value] == null ? value : vm[value]
    switch (type) {
      case Number:
        value = Number(value)
        value = Number.isNaN(value) ? defaultValue : value
        break
      case Boolean:
        value = value !== null
          ? value === 'false'
            ? false
            : Boolean(value)
          : defaultValue
        break
      default:
        value = type(value)
    }
    map[key] = value
    return map
  }, {})
}

const getElementTop = el => el.getBoundingClientRect().top

const handleScroll = function (cb) {
  const { el, vm, container, observer } = this[scope]
  const { distance, disabled } = getScrollOptions(el, vm)
  if (disabled) return

  const containerInfo = container.getBoundingClientRect()
  if (!containerInfo.width && !containerInfo.height) return

  let shouldTrigger = false

  if (container === el) {
    const scrollBottom = container.scrollTop + getClientHeight(container)
    shouldTrigger = container.scrollHeight - scrollBottom <= distance
  } else {
    const heightBelowTop = getOffsetHeight(el) + getElementTop(el) - getElementTop(container)
    const offsetHeight = getOffsetHeight(container)
    const borderBottom = Number.parseFloat(getStyle(container, 'borderBottomWidth'))
    shouldTrigger = heightBelowTop - offsetHeight + borderBottom <= distance
  }

  if (shouldTrigger && typeof cb === 'function') {
    cb.call(vm)
  } else if (observer) {
    observer.disconnect()
    this[scope].observer = null
  }
}

export default {
  name: 'InfiniteScroll',
  inserted (el, binding, vnode) {
    const cb = binding.value

    const vm = vnode.context
    const container = getScrollContainer(el)
    const { delay, immediate } = getScrollOptions(el, vm)
    const onScroll = throttle(delay, handleScroll.bind(el, cb))

    el[scope] = { el, vm, container, onScroll }

    if (container) {
      container.addEventListener('scroll', onScroll)

      if (immediate) {
        const observer = el[scope].observer = new MutationObserver(onScroll)
        observer.observe(container, { childList: true, subtree: true })
        onScroll()
      }
    }
  },
  unbind (el) {
    const { container, onScroll } = el[scope]
    if (container) {
      container.removeEventListener('scroll', onScroll)
    }
  }
}

