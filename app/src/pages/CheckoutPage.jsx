import { useState } from 'react'
import { Link } from 'react-router-dom'
import Icon from '../components/Icon'
import { useCart } from '../context/CartContext'
import { checkoutLabels, formatMoney } from '../data/menu'

const tabs = [
  { id: 'card', label: 'Card' },
  { id: 'express', label: 'Apple / GPay' },
  { id: 'pickup', label: 'In Store' },
]

function Field({ label, id, ...props }) {
  return (
    <div>
      <label htmlFor={id} className="block font-label-md text-label-md text-on-surface-variant mb-1">
        {label}
      </label>
      <input
        id={id}
        className="w-full bg-surface-container-low text-on-surface px-space-md py-space-sm rounded-lg outline-none text-body-md focus:ring-2 focus:ring-primary"
        {...props}
      />
    </div>
  )
}

export default function CheckoutPage() {
  const { items, itemCount, subtotal, tax, total } = useCart()
  const [payment, setPayment] = useState('card')
  const [instructions, setInstructions] = useState('')
  const [contact, setContact] = useState({
    name: 'Marco Vane',
    phone: '(555) 349-8201',
    email: 'm.vane@example.com',
  })
  const [card, setCard] = useState({
    holder: 'Marco Vane',
    number: '4532 •••• •••• 8892',
    expiry: '09/27',
    cvc: '894',
  })
  const [processing, setProcessing] = useState(false)
  const [success, setSuccess] = useState(false)

  const submitOrder = () => {
    setProcessing(true)
    window.setTimeout(() => {
      setProcessing(false)
      setSuccess(true)
    }, 700)
  }

  return (
    <main className="w-full pt-36 bg-surface">
      <div className="w-full px-margin-sm md:px-margin pb-margin">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-sm mb-space-lg pb-space-sm">
          <Link
            to="/"
            className="inline-flex items-center gap-space-xs text-on-surface-variant hover:text-primary transition-colors font-label-lg text-label-lg group"
          >
            <Icon name="arrow_back" className="text-[18px] transition-transform group-hover:-translate-x-1" />
            Back to Menu &amp; Order
          </Link>
          <div className="flex items-center gap-space-sm text-tertiary font-label-md text-label-md bg-tertiary-fixed/40 px-space-md py-space-xs rounded-full">
            <Icon name="verified_user" className="text-[16px]" />
            Secured 256-Bit Order Reservation
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          <div className="lg:col-span-7 space-y-space-lg">
            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_2px_12px_rgba(35,32,29,0.04)] relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 w-36 h-36 rounded-full bg-secondary-container/10 pointer-events-none" />
              <div className="flex flex-wrap items-baseline justify-between gap-space-xs mb-space-xs">
                <h1 className="font-headline text-headline-lg text-on-surface tracking-tight">
                  Review Your Order
                </h1>
                <span className="font-label-md text-label-md bg-surface-container-high text-on-surface-variant px-space-sm py-space-xs rounded-full font-semibold">
                  Order #SP-8429
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-space-xs sm:gap-space-md text-on-surface-variant pt-space-xs">
                <div className="flex items-center gap-space-xs text-body-md">
                  <Icon name="storefront" className="text-primary text-[18px]" />
                  <span className="font-semibold text-on-surface">Sam&apos;s Pizza</span>
                  <span>•</span>
                  <span>142 Elm St</span>
                </div>
                <div className="flex items-center gap-space-xs font-label-md text-label-md text-tertiary font-bold bg-tertiary-fixed/30 px-space-sm py-0.5 rounded-full w-fit">
                  <Icon name="schedule" className="text-[16px]" />
                  Estimated Pickup: 15–20 Mins
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_2px_12px_rgba(35,32,29,0.04)] space-y-space-md">
              <div className="flex items-center justify-between pb-space-sm">
                <h2 className="font-headline text-headline-sm text-on-surface font-semibold">
                  Kitchen Items ({items.length})
                </h2>
                <span className="font-label-md text-label-md text-on-surface-variant">
                  Oven Queue Priority Active
                </span>
              </div>

              <div className="space-y-space-sm">
                {items.map((line) => {
                  const label = checkoutLabels[line.id] ?? {
                    name: line.name,
                    detail: () => line.size ?? '',
                  }
                  return (
                    <div
                      key={line.key}
                      className="p-space-md bg-surface-container-low rounded-lg flex items-center justify-between gap-space-md transition-all hover:bg-surface-container"
                    >
                      <div className="flex items-center gap-space-md min-w-0">
                        <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 bg-surface-container-high flex items-center justify-center">
                          {label.image ? (
                            <img className="w-full h-full object-cover" src={label.image} alt={label.name} />
                          ) : (
                            <Icon
                              name={label.icon ?? 'restaurant'}
                              className={`text-[28px] ${label.iconColor ?? 'text-secondary'}`}
                            />
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-space-xs">
                            <h3 className="text-title-md text-on-surface truncate">{label.name}</h3>
                            {label.badge && (
                              <span
                                className={`${label.badgeStyle} text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded`}
                              >
                                {label.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-body-md text-on-surface-variant">{label.detail(line.size)}</p>
                          <p className="font-label-md text-label-md text-secondary mt-0.5">
                            {line.qty} × {formatMoney(line.unitPrice)}
                          </p>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-price-lg text-on-surface font-bold tabular-nums">
                          {formatMoney(line.unitPrice * line.qty)}
                        </span>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="pt-space-md">
                <label
                  htmlFor="special-instructions"
                  className="flex items-center justify-between font-label-lg text-label-lg text-on-surface mb-space-xs font-semibold"
                >
                  <span className="flex items-center gap-space-xs">
                    <Icon name="edit_note" className="text-primary text-[18px]" />
                    Special Kitchen Instructions
                  </span>
                  <span className="font-label-md text-label-md text-on-surface-variant font-normal">
                    Optional
                  </span>
                </label>
                <textarea
                  id="special-instructions"
                  rows={3}
                  value={instructions}
                  onChange={(event) => setInstructions(event.target.value)}
                  placeholder="e.g., extra napkins, sauce on the side, well-done bake..."
                  className="w-full bg-surface-container-low focus:bg-surface-container-lowest text-on-surface placeholder:text-on-surface-variant/60 rounded-lg p-space-md outline-none transition-all resize-none text-body-md shadow-inner focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div className="bg-surface-container p-space-lg rounded-xl flex items-start gap-space-md">
              <div className="w-10 h-10 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center shrink-0">
                <Icon name="pin_drop" className="text-[22px]" />
              </div>
              <div className="space-y-space-xs">
                <h4 className="text-title-md text-on-surface">Curbside &amp; Counter Bays</h4>
                <p className="text-body-md text-on-surface-variant">
                  Park in stalls 1–4 with hazard lights on for contactless hand-off, or walk straight to
                  the fast-pickup counter inside. We prep items so they exit the brick oven right as you
                  arrive.
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-space-lg">
            <div className="sticky top-28 bg-surface-container-lowest p-space-lg rounded-xl shadow-[0_4px_24px_rgba(35,32,29,0.08)] space-y-space-lg">
              <div>
                <h2 className="font-headline text-headline-sm text-on-surface font-semibold mb-space-md">
                  Order Summary
                </h2>
                <div className="space-y-space-xs text-body-md text-on-surface-variant">
                  <div className="flex justify-between items-center">
                    <span>Subtotal ({itemCount} items)</span>
                    <span className="font-semibold text-on-surface tabular-nums">{formatMoney(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="flex items-center gap-1">
                      Local Food &amp; Beverage Tax
                      <span className="font-label-md text-label-md bg-surface-container px-1 rounded text-on-surface-variant">
                        8.875%
                      </span>
                    </span>
                    <span className="font-semibold text-on-surface tabular-nums">{formatMoney(tax)}</span>
                  </div>
                  <div className="flex justify-between items-center text-tertiary">
                    <span>Pickup Fee</span>
                    <span className="font-semibold uppercase font-label-md">FREE</span>
                  </div>
                </div>

                <div className="mt-space-md pt-space-md bg-surface-container-low p-space-md rounded-lg flex items-baseline justify-between">
                  <div>
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block">
                      Total Due
                    </span>
                    <span className="font-headline text-headline-md text-primary font-bold leading-none tabular-nums">
                      {formatMoney(total)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-label-md text-label-md text-tertiary font-semibold flex items-center gap-1">
                      <Icon name="check_circle" className="text-[16px]" />
                      Ready in ~15 mins
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-space-sm pt-space-xs">
                <h3 className="text-title-md text-on-surface flex items-center gap-space-xs">
                  <Icon name="sms" className="text-secondary text-[18px]" />
                  Pickup Notification
                </h3>
                <div className="space-y-space-xs">
                  <Field
                    id="customer-name"
                    label="Full Name"
                    type="text"
                    placeholder="Enter name"
                    value={contact.name}
                    onChange={(event) => setContact({ ...contact, name: event.target.value })}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-xs">
                    <Field
                      id="customer-phone"
                      label="Phone (SMS Alert)"
                      type="tel"
                      placeholder="(555) 000-0000"
                      value={contact.phone}
                      onChange={(event) => setContact({ ...contact, phone: event.target.value })}
                    />
                    <Field
                      id="customer-email"
                      label="Email Receipt"
                      type="email"
                      placeholder="name@email.com"
                      value={contact.email}
                      onChange={(event) => setContact({ ...contact, email: event.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-space-sm">
                <h3 className="text-title-md text-on-surface flex items-center gap-space-xs">
                  <Icon name="payments" className="text-primary text-[18px]" />
                  Payment Method
                </h3>
                <div className="grid grid-cols-3 gap-space-xs bg-surface-container-low p-1 rounded-lg">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setPayment(tab.id)}
                      className={`py-space-xs px-space-sm rounded-md font-label-md text-label-md transition-all text-center ${
                        payment === tab.id
                          ? 'bg-surface-container-lowest text-primary shadow-sm font-semibold'
                          : 'text-on-surface-variant font-medium hover:text-on-surface'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {payment === 'card' && (
                  <div className="space-y-space-xs pt-space-xs">
                    <Field
                      id="card-holder"
                      label="Cardholder Name"
                      type="text"
                      value={card.holder}
                      onChange={(event) => setCard({ ...card, holder: event.target.value })}
                    />
                    <Field
                      id="card-number"
                      label="Card Number"
                      type="text"
                      value={card.number}
                      onChange={(event) => setCard({ ...card, number: event.target.value })}
                    />
                    <div className="grid grid-cols-2 gap-space-xs">
                      <Field
                        id="card-expiry"
                        label="Expiry Date"
                        type="text"
                        placeholder="MM/YY"
                        value={card.expiry}
                        onChange={(event) => setCard({ ...card, expiry: event.target.value })}
                      />
                      <Field
                        id="card-cvc"
                        label="CVC / CVV"
                        type="password"
                        value={card.cvc}
                        onChange={(event) => setCard({ ...card, cvc: event.target.value })}
                      />
                    </div>
                  </div>
                )}

                {payment === 'express' && (
                  <div className="p-space-md bg-surface-container-low rounded-lg text-center space-y-space-sm">
                    <p className="text-body-md text-on-surface-variant">
                      Fast 1-touch biometric checkout using your device wallet.
                    </p>
                    <button
                      type="button"
                      onClick={submitOrder}
                      className="w-full bg-on-surface text-inverse-on-surface py-space-sm px-space-md rounded-full font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-xs hover:opacity-95 transition-opacity"
                    >
                      <Icon name="fingerprint" className="text-[18px]" />
                      Pay with Apple Pay / GPay
                    </button>
                  </div>
                )}

                {payment === 'pickup' && (
                  <div className="p-space-md bg-secondary-container/20 text-on-secondary-container rounded-lg space-y-space-xs">
                    <div className="flex items-center gap-space-xs font-title-md">
                      <Icon name="store" className="text-[20px]" />
                      Pay In Store at Counter
                    </div>
                    <p className="text-body-md text-on-surface-variant">
                      We accept Cash, Apple Pay, Visa, Mastercard, and Amex at the Elm St counter when
                      you pick up.
                    </p>
                  </div>
                )}
              </div>

              <div className="space-y-space-xs pt-space-xs">
                <button
                  type="button"
                  onClick={submitOrder}
                  disabled={processing}
                  className="w-full bg-primary text-on-primary hover:bg-primary-container active:scale-[0.99] transition-all py-space-md px-space-lg rounded-full font-label-lg text-label-lg font-bold flex items-center justify-center gap-space-sm shadow-md disabled:opacity-70"
                >
                  {processing ? (
                    <>
                      <Icon name="progress_activity" className="animate-spin text-[20px]" />
                      Processing {formatMoney(total)}...
                    </>
                  ) : (
                    <>
                      <Icon name="lock" className="text-[20px]" />
                      Submit Order ({formatMoney(total)})
                    </>
                  )}
                </button>
                <p className="text-center font-label-md text-label-md text-on-surface-variant">
                  By placing this order you agree to Sam&apos;s kitchen terms.
                </p>
              </div>

              <div className="pt-space-xs">
                <div className="grid grid-cols-3 gap-space-xs text-center">
                  {[
                    ['encrypted', 'SSL Encrypted', 'text-tertiary'],
                    ['award_star', '100% Quality', 'text-secondary'],
                    ['contactless', 'Contactless Pick', 'text-primary'],
                  ].map(([icon, label, color]) => (
                    <div key={label} className="flex flex-col items-center gap-1 p-space-xs bg-surface-container-low rounded-lg">
                      <Icon name={icon} className={`${color} text-[20px]`} />
                      <span className="font-label-md text-[11px] text-on-surface-variant font-medium">{label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`fixed inset-0 z-50 flex items-center justify-center bg-inverse-surface/50 backdrop-blur-sm transition-all duration-300 px-margin-sm ${
          success ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div
          className={`bg-surface-container-lowest max-w-md w-full rounded-2xl p-space-xl shadow-2xl space-y-space-md transition-all duration-300 text-center relative ${
            success ? 'scale-100' : 'scale-95'
          }`}
        >
          <div className="w-16 h-16 rounded-full bg-tertiary-fixed text-tertiary mx-auto flex items-center justify-center shadow-md">
            <Icon name="check_circle" className="text-[36px]" />
          </div>
          <div className="space-y-space-xs">
            <span className="font-label-md text-label-md uppercase tracking-wider text-secondary font-bold">
              Wood-Fired Oven Fired Up!
            </span>
            <h3 className="font-headline text-headline-lg text-on-surface">Order Placed Successfully</h3>
            <p className="text-body-md text-on-surface-variant">
              Order <strong className="text-on-surface">#SP-8429</strong> is received. We&apos;ve sent an
              SMS notification and receipt to {contact.name.split(' ')[0] || 'you'} at {contact.phone}.
            </p>
          </div>
          <div className="bg-surface-container-low p-space-md rounded-xl text-left space-y-space-xs text-body-md">
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Est. Oven Ready Time:</span>
              <strong className="text-primary">15–20 minutes</strong>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Pickup Location:</span>
              <span className="text-on-surface font-semibold">142 Elm St, Bay 2</span>
            </div>
            <div className="flex justify-between">
              <span className="text-on-surface-variant">Amount Paid:</span>
              <strong className="text-on-surface tabular-nums">{formatMoney(total)}</strong>
            </div>
          </div>
          <div className="pt-space-sm space-y-space-xs">
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="w-full bg-primary text-on-primary py-space-sm px-space-md rounded-full font-label-lg text-label-lg font-bold hover:bg-primary-container transition-all"
            >
              View Live Order Tracker
            </button>
            <button
              type="button"
              onClick={() => setSuccess(false)}
              className="w-full text-on-surface-variant hover:text-on-surface py-space-xs font-label-md text-label-md"
            >
              Dismiss Window
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
