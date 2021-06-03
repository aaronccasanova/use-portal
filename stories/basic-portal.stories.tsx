import React from 'react'
import { Meta, Story } from '@storybook/react'
import { usePortal } from '../src'

function Child() {
  // The click event on this button will bubble up to parent,
  // because there is no 'onClick' attribute defined
  return (
    <div>
      <h2>Child</h2>
      <button>Click</button>
    </div>
  )
}

const PortalPlayground = () => {
  const { Portal } = usePortal()

  const [clicks, setClicks] = React.useState(0)

  function handleClick() {
    // This will fire when the button in Child is clicked,
    // updating Parent's state, even though button
    // is not direct descendant in the DOM.
    setClicks(prevClicks => prevClicks + 1)
  }

  return (
    <div onClick={handleClick}>
      <h1>Parent {clicks}</h1>
      <Portal>
        <Child />
      </Portal>
    </div>
  )
}

const meta: Meta = {
  title: 'Portal Playground',
  component: PortalPlayground,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
}

export default meta

const Template: Story<{}> = args => <PortalPlayground {...args} />

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({})

Default.args = {}
