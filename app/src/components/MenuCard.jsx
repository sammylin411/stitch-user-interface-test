import { useState } from 'react'
import { formatMoney } from '../data/menu'
import { useCart } from '../context/CartContext'
import Icon from './Icon'
import QuantityStepper from './QuantityStepper'

export default function MenuCard({ item, variant }) {
  const { addItem } = useCart()
  const initialIndex = item.sizes
    ? Math.max(
        0,
        item.sizes.findIndex((size) => size.label === item.defaultSize),
      )
    : -1
  const [sizeIndex, setSizeIndex] = useState(initialIndex)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  const selectedSize = sizeIndex >= 0 ? item.sizes[sizeIndex] : null
  const price = selectedSize?.price ?? item.price

  const sizeButtons = item.sizes ? (
    <div className="flex items-center gap-space-xs flex-wrap" data-sizes-group>
      {item.sizes.map((size, index) => {
        const active = index === sizeIndex
        return (
          <button
            key={size.label}
            type="button"
            onClick={() => setSizeIndex(index)}
            className={`px-space-md py-space-xs rounded-full font-label-md text-label-md transition-colors ${
              active
                ? 'bg-secondary text-on-secondary shadow-sm'
                : 'bg-surface text-on-surface hover:bg-surface-container-high'
            }`}
          >
            {size.label}{' '}
            <span className={`font-semibold ${active ? 'text-on-secondary' : 'text-secondary'}`}>
              {formatMoney(size.price)}
            </span>
          </button>
        )
      })}
    </div>
  ) : (
    <div className="text-center font-label-md text-label-md text-on-surface-variant py-1">
      {item.fixedLabel} • <span className="font-semibold text-secondary">{formatMoney(item.price)}</span>
    </div>
  )

  const addButton = (
    <button
      type="button"
      onClick={() => {
        addItem(item, selectedSize, qty)
        setQty(1)
        setAdded(true)
        window.setTimeout(() => setAdded(false), 800)
      }}
      className={`px-space-md py-space-xs rounded-full font-label-lg text-label-lg transition-colors flex items-center gap-1 shadow-sm active:scale-95 ${
        added
          ? 'bg-tertiary-container text-on-tertiary-container'
          : 'bg-primary-container hover:bg-primary text-on-primary'
      }`}
    >
      <Icon name={added ? 'check' : 'add_shopping_cart'} className="text-[18px]" />
      {added ? 'Added' : 'Add'}
    </button>
  )

  const controls = (
    <div
      className={`mt-space-md pt-space-sm bg-surface-container-low/40 rounded-lg p-space-sm flex flex-col gap-space-xs ${
        variant === 'wide'
          ? 'sm:flex-row sm:items-center sm:justify-between'
          : ''
      }`}
    >
      {sizeButtons}
      <div
        className={`flex items-center gap-space-xs ${
          variant === 'wide' ? 'w-full sm:w-auto justify-end' : 'justify-between mt-space-xs'
        }`}
      >
        <QuantityStepper qty={qty} onMinus={() => setQty(Math.max(1, qty - 1))} onPlus={() => setQty(qty + 1)} />
        {addButton}
      </div>
    </div>
  )

  if (variant === 'wide') {
    return (
      <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row gap-space-md">
        <div className="md:w-48 h-44 md:h-auto rounded-lg overflow-hidden shrink-0 relative">
          <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
          {item.badge && (
            <span
              className={`absolute top-2 left-2 font-label-md text-label-md px-space-xs py-0.5 rounded-full shadow-sm ${item.badgeStyle}`}
            >
              {item.badge}
            </span>
          )}
        </div>
        <div className="flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-start justify-between gap-space-sm">
              <h3 className="font-headline text-headline-md text-on-surface">{item.name}</h3>
              <div className="text-price-lg text-primary font-bold tabular-nums">{formatMoney(price)}</div>
            </div>
            <p className="text-body-md text-on-surface-variant mt-space-xs">{item.description}</p>
          </div>
          {controls}
        </div>
      </div>
    )
  }

  return (
    <div className="bg-surface-container-lowest rounded-xl p-space-md shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
      <div>
        <div className="w-full h-40 rounded-lg overflow-hidden mb-space-sm">
          <img className="w-full h-full object-cover" src={item.image} alt={item.name} />
        </div>
        <div className="flex items-start justify-between">
          <h3 className="font-headline text-headline-sm text-on-surface">{item.name}</h3>
          <div className="text-price-lg text-primary font-bold tabular-nums">{formatMoney(price)}</div>
        </div>
        <p className="text-body-md text-on-surface-variant mt-space-xs">{item.description}</p>
      </div>
      {controls}
    </div>
  )
}
