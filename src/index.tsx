import React from 'react'
import ReactDOM from 'react-dom'

const isServer = typeof window === 'undefined'

interface UsePortalOptions {
  /**
   * Element the Portal is attached to.
   *
   * Defaults to `document.body`.
   */
  target?: HTMLElement
  /**
   * Element that wraps the child content of the Portal component.
   *
   * Defaults to `div`.
   */
  container?: HTMLElement
  /**
   * Defines where the Portal is inserted into the `target` element.
   *
   * Defaults to 'append'.
   */
  insertionOrder?: 'append' | 'prepend'
}

export interface PortalProps {
  children: React.ReactNode
  key?: string | null
}

export interface UsePortalReturnType {
  /**
   * Portal component that renders child content into
   * the `target` DOM element.
   */
  Portal: (props: PortalProps) => React.ReactPortal | null
  /**
   * Element the Portal is attached to.
   *
   * Defaults to `document.body`.
   */
  target: HTMLElement | null
  /**
   * Element that wraps the child content of the Portal component.
   *
   * Defaults to `div`.
   */
  container: HTMLElement | null
}

export function usePortal(options: UsePortalOptions = {}): UsePortalReturnType {
  const container = React.useMemo<HTMLElement | null>(() => {
    return isServer ? null : options.container || document.createElement('div')
  }, [options.container])

  const target = React.useMemo<null | HTMLElement>(() => {
    return isServer ? null : options.target || document.body
  }, [options.target])

  React.useEffect(() => {
    if (container && target) {
      const insert =
        options.insertionOrder === 'prepend' ? 'prepend' : 'appendChild'

      target[insert](container)
    }

    return () => {
      if (container && target) {
        target.removeChild(container)
      }
    }
  }, [container, target, options.insertionOrder])

  const Portal = React.useCallback(
    (props: PortalProps) => {
      if (!container) return null

      return ReactDOM.createPortal(props.children, container, props.key)
    },
    [container],
  )

  return { Portal, container, target }
}

export default usePortal
