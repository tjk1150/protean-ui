'use client'

import { Dialog } from '@base-ui/react/dialog'
import { Drawer } from '@base-ui/react/drawer'
import * as React from 'react'
import { AddressForm } from './address-form'

function useMediaQuery(query: string): boolean {
  const subscribe = React.useCallback(
    (callback: () => void) => {
      const list = window.matchMedia(query)
      list.addEventListener('change', callback)
      return () => list.removeEventListener('change', callback)
    },
    [query]
  )
  return React.useSyncExternalStore(
    subscribe,
    () => window.matchMedia(query).matches,
    () => false
  )
}

export function ManualResponsiveDialog() {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery('(min-width: 600px)')

  if (isDesktop) {
    return (
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="button">Edit shipping address</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop className="manual-backdrop" />
          <Dialog.Popup className="manual-modal">
            <Dialog.Title className="manual-title">Edit shipping address</Dialog.Title>
            <AddressForm />
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    )
  }

  return (
    <Drawer.Root open={open} onOpenChange={setOpen} swipeDirection="down">
      <Drawer.Trigger className="button">Edit shipping address</Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Backdrop className="manual-backdrop" />
        <Drawer.Popup className="manual-sheet">
          <Drawer.Title className="manual-title">Edit shipping address</Drawer.Title>
          <AddressForm />
        </Drawer.Popup>
      </Drawer.Portal>
    </Drawer.Root>
  )
}
