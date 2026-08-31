'use client'

import { Dialog } from '@protean-ui/react'
import { AddressForm } from './address-form'

export function ProteanCheckoutDialog() {
  return (
    <Dialog.Root role="form">
      <Dialog.Trigger className="button">Edit shipping address</Dialog.Trigger>
      <Dialog.Content title="Edit shipping address">
        <AddressForm />
      </Dialog.Content>
    </Dialog.Root>
  )
}
