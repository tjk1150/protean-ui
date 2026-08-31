import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import * as Screen from './index.parts'

describe('Screen', () => {
  it('renders the slot structure in declaration order', () => {
    render(
      <Screen.Root>
        <Screen.Navigation>
          <span>nav</span>
        </Screen.Navigation>
        <Screen.Content>
          <p>content</p>
        </Screen.Content>
        <Screen.Actions>
          <button type="button">buy</button>
        </Screen.Actions>
      </Screen.Root>
    )

    const root = document.querySelector('[data-scope="screen"]') as HTMLElement
    const parts = [...root.children].map((child) => child.getAttribute('data-part'))
    expect(parts).toEqual(['navigation', 'content', 'actions'])
    expect(root.querySelector('main[data-part="content"]')).not.toBeNull()
  })
})
