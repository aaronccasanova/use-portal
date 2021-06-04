import React from 'react'
import * as ReactDOM from 'react-dom'
import { Default as PortalPlayground } from '../stories/simple-portal.stories'

describe('PortalPlayground', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<PortalPlayground />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
