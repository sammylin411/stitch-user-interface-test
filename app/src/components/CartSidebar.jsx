import { useState } from 'react'
import { Link } from 'react-router-dom'
import { formatMoney } from '../data/menu'
import { useCart } from '../context/CartContext'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'

export default function CartSidebar() {
  const { items, itemCount, subtotal, tax, total, changeQty } = useCart()
  const [pickupMode, setPickupMode] = useState('counter')

  return (
    <div className="sticky top-28 bg-surface-container-lowest rounded-xl p-space-md shadow-md flex flex-col space-y-space-md">
      <div className="flex items-center justify-between pb-space-sm bg-surface-container-low/50 -m-space-md p-space-md rounded-t-xl">
        <div className="flex items-center gap-space-xs">
          <Icon name="shopping_bag" className="text-primary text-[24px]" />
          <h2 className="font-headline text-headline-sm text-on-surface">Your Order</h2>
        </div>
        <div className="flex items-center gap-space-xs bg-primary/10 px-space-sm py-0.5 rounded-full">
          <span className="font-label-md text-label-md font-bold text-primary">
            {itemCount} {itemCount === 1 ? 'Item' : 'Items'}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between bg-surface-container-low p-space-xs rounded-full text-center font-label-md text-label-md">
        <button
          type="button"
          onClick={() => setPickupMode('counter')}
          className={`flex-1 py-1 rounded-full flex items-center justify-center gap-1 ${
            pickupMode === 'counter'
              ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
              : 'text-on-surface-variant'
          }`}
        >
          <Icon name="storefront" className="text-[16px]" />
          Pickup at Counter
        </button>
        <button
          type="button"
          onClick={() => setPickupMode('time')}
          className={`flex-1 py-1 rounded-full flex items-center justify-center gap-1 ${
            pickupMode === 'time'
              ? 'bg-surface-container-lowest text-on-surface font-semibold shadow-sm'
              : 'text-on-surface-variant'
          }`}
        >
          <Icon name="timer" className="text-[16px]" />
          15–20m
        </button>
      </div>

      <div id="cart-items-container" className="space-y-space-sm max-h-96 overflow-y-auto pr-1 no-scrollbar">
        {items.length === 0 ? (
          <div className="text-center py-space-lg">
            <p className="font-label-lg text-label-lg font-bold text-on-surface">Your cart is empty.</p>
            <p className="text-body-md text-on-surface-variant mt-space-xs">
              Select items from the menu to start your order.
            </p>
          </div>
        ) : (
          items.map((line) => (
            <div
              key={line.key}
              className="flex items-center justify-between p-space-xs rounded-lg bg-surface hover:bg-surface-container-low transition-colors group"
            >
              <div className="flex-1 pr-2">
                <div className="font-label-lg text-label-lg font-bold text-on-surface">{line.name}</div>
                <div className="font-label-md text-label-md text-on-surface-variant">
                  {line.size ? `${line.size} • ` : ''}
                  {formatMoney(line.unitPrice)} each
                </div>
              </div>
              <div className="flex items-center gap-space-xs">
                <QuantityStepper
                  compact
                  qty={line.qty}
                  onMinus={() => changeQty(line.key, -1)}
                  onPlus={() => changeQty(line.key, 1)}
                />
                <span className="font-label-lg text-label-lg font-bold text-primary w-14 text-right tabular-nums">
                  {formatMoney(line.unitPrice * line.qty)}
                </span>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="space-y-space-xs pt-space-sm bg-surface-container-low/40 p-space-sm rounded-lg">
        <div className="flex items-center justify-between text-body-md text-on-surface-variant">
          <span>Subtotal</span>
          <span className="font-semibold text-on-surface tabular-nums">{formatMoney(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-body-md text-on-surface-variant">
          <span>Estimated Tax (8.875%)</span>
          <span className="font-semibold text-on-surface tabular-nums">{formatMoney(tax)}</span>
        </div>
        <div className="flex items-center justify-between text-price-lg text-on-surface pt-space-xs font-bold">
          <span>Total Due</span>
          <span className="text-primary font-bold tabular-nums">{formatMoney(total)}</span>
        </div>
      </div>

      <Link
        to="/checkout"
        className="w-full py-space-sm px-space-md rounded-full bg-primary hover:bg-primary-container text-on-primary font-label-lg text-label-lg transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-space-xs group"
      >
        <span>Ready to Pay</span>
        <Icon name="arrow_forward" className="text-[20px] group-hover:translate-x-1 transition-transform" />
      </Link>
      <div className="flex items-center justify-center gap-space-xs text-on-surface-variant text-label-md font-label-md text-center">
        <Icon name="check_circle" className="text-[16px] text-tertiary" />
        <span>Pay on pickup or pay now next step</span>
      </div>
    </div>
  )
}
