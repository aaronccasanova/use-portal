import React from 'react'
import ReactDOM from 'react-dom'

const isServer = typeof window === 'undefined'

interface UsePortalOptions {
  /**
   * Element to insert the Portal.
   *
   * Defaults to a 'div' element.
   */
  target?: HTMLElement
  /**
   * Element used for the Portal container.
   *
   * Defaults to a 'div' element.
   */
  portal?: HTMLElement
  /**
   * HTML Tag used for the Portal container element.
   *
   * Defaults to 'div'.
   */
  tagName?: keyof HTMLElementTagNameMap
  /**
   * Defines where the Portal is inserted into the target element.
   *
   * Defaults to 'append'.
   */
  insertionOrder?: 'append' | 'prepend'
}

export interface PortalProps {
  children: React.ReactNode;
  key?: string | null;
}

export interface UsePortalReturnType {
  Portal: (props: PortalProps) => React.ReactPortal | null;
  portal: HTMLElement | null;
  target: HTMLElement | null;
}

export function usePortal(
  options: UsePortalOptions = {}
): UsePortalReturnType {
  const portal = React.useMemo<HTMLElement | null>(() => {
    return !isServer
      ? options.portal || document.createElement(options.tagName || 'div')
      : null
  }, [options.portal, options.tagName])

  const target = React.useMemo<null | HTMLElement>(() => {
    return !isServer ? options.target || document.body : null
  }, [options.target])

  React.useEffect(() => {
    if (portal && target) {
      const insert = options.insertionOrder === 'prepend'
        ? 'prepend'
        : 'appendChild'

      target[insert](portal)
    }

    return () => {
      if (portal && target) {
        target.removeChild(portal)
      }
    }
  }, [portal, target, options.insertionOrder])

  const Portal = React.useCallback(
    (props: PortalProps) => {
      if (!portal) return null

      return ReactDOM.createPortal(props.children, portal, props.key)
    },
    [portal],
  )

  return { Portal, portal, target  }
}

export default usePortal
