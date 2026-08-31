import { Navigation, PrimaryAction, Screen } from '@protean-ui/react'
import Link from 'next/link'
import { Glyph } from '../glyphs'
import '../navigation-spike/navigation.css'
import { BillingSelect } from './billing-select'
import './screen.css'

export default function ScreenDemoPage() {
  return (
    <Screen.Root>
      <Screen.Navigation>
        <Navigation.Root aria-label="Primary">
          <Navigation.Item href="/screen-demo" current icon={<Glyph path="M3 9.5 10 3l7 6.5V17h-5v-4H8v4H3z" />}>
            Home
          </Navigation.Item>
          <Navigation.Item href="#orders" icon={<Glyph path="M4 5h12l-1 11H5zM7 5a3 3 0 0 1 6 0" />}>
            Orders
          </Navigation.Item>
          <Navigation.Item href="#growth" icon={<Glyph path="M3 16l4-6 3 3 4-7 3 4" />}>
            Growth
          </Navigation.Item>
          <Navigation.Item href="#settings" icon={<Glyph path="M10 12.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5zM10 2v2m0 12v2M2 10h2m12 0h2M4.3 4.3l1.4 1.4m8.6 8.6 1.4 1.4m0-11.4-1.4 1.4M5.7 14.3l-1.4 1.4" />}>
            Settings
          </Navigation.Item>
        </Navigation.Root>
      </Screen.Navigation>

      <Screen.Content>
        <p>
          <Link href="/">Back</Link>
        </p>
        <h1>Screen demo</h1>
        <p className="lede">
          The full declaration from the validation report: navigation, content, and a primary
          action. There is not a single breakpoint in this page&apos;s source.
        </p>
        <section className="plan-card">
          <h2>Protean starter plan</h2>
          <p className="plan-price">$12 / month</p>
          <ul>
            <li>Policy engine with the app-first pack</li>
            <li>Four semantic components, one decision layer</li>
            <li>Your components, your styles, our decisions</li>
          </ul>
          <div className="plan-note">
            Billing cycle
            <BillingSelect />
          </div>
          <label className="plan-note">
            Promo code
            <input name="promo" placeholder="Try focusing me on a phone" />
          </label>
        </section>
        <p className="hint">
          On a phone the buy button is a fixed action bar stacked above the bottom navigation
          and it dodges the virtual keyboard (focus the input). In a narrow desktop window it
          is a sticky footer. On a wide screen it sits inline after the content.
        </p>
      </Screen.Content>

      <Screen.Actions>
        <PrimaryAction.Root>Buy now</PrimaryAction.Root>
      </Screen.Actions>
    </Screen.Root>
  )
}
