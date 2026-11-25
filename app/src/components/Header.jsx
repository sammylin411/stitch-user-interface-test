import { Link, useLocation } from 'react-router-dom'
import { images } from '../data/images'
import Icon from './Icon'

export default function Header() {
  const { pathname } = useLocation()
  const onMenu = pathname === '/'

  const stepClass = (active) =>
    `px-space-md py-space-xs rounded-full transition-all duration-200 flex items-center font-label-lg text-label-lg ${
      active
        ? 'bg-primary-container text-on-primary-container font-semibold shadow-sm'
        : 'text-on-surface-variant hover:text-on-surface'
    }`

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
      <div className="w-full bg-secondary-container/20 px-margin-sm md:px-margin py-space-xs text-center">
        <div className="flex items-center justify-center gap-space-sm text-on-secondary-container">
          <Icon name="local_pizza" className="text-[16px]" />
          <span className="font-label-md text-label-md tracking-normal">
            Fresh &amp; Hot • 15–20 min pickup at 142 Elm St
          </span>
          <Icon name="storefront" className="text-[16px]" />
        </div>
      </div>

      <div className="w-full px-margin-sm md:px-margin flex items-center justify-between gap-space-md py-space-sm">
        <Link to="/" className="flex items-center gap-space-md">
          <img src={images.logo} alt="Sam's Pizza Minimal Logo" className="h-14 w-auto object-contain transition-transform" />
          <div className="flex flex-col justify-center">
            <span className="font-headline text-headline-lg font-serif leading-none text-primary tracking-tight font-bold">
              Sam&apos;s Pizza
            </span>
            <span className="text-body-md text-on-surface-variant tracking-normal font-medium mt-space-xs">
              Artisanal Wood-Fired Trattoria
            </span>
          </div>
        </Link>

        <nav className="flex items-center bg-surface-container-low p-space-xs rounded-full shadow-[0_1px_4px_rgba(35,32,29,0.04)]">
          <Link to="/" className={stepClass(onMenu)}>
            1. Menu &amp; Order
          </Link>
          <div className="w-4 h-0.5 bg-outline-variant/60 mx-space-xs rounded-full" />
          <Link to="/checkout" className={stepClass(!onMenu)}>
            2. Ready to Pay
          </Link>
        </nav>

        <div className="flex items-center gap-space-md">
          <div className="hidden md:flex flex-col text-right">
            <span className="font-label-md text-label-md text-on-surface font-semibold">
              Pickup Counter
            </span>
            <span className="text-body-md text-tertiary font-medium">Order Line Open</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
            <Icon name="person" className="text-on-primary text-[18px]" />
          </div>
        </div>
      </div>
    </header>
  )
}
