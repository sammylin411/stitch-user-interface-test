import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { initialCart, TAX_RATE } from '../data/menu'

const CartContext = createContext(null)
const STORAGE_KEY = 'sams-pizza-cart'

function readSavedCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      const parsed = JSON.parse(saved)
      if (Array.isArray(parsed)) return parsed
    }
  } catch {
    // Ignore old or broken saved data and use the sample order.
  }
  return initialCart
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(readSavedCart)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const value = useMemo(() => {
    const itemCount = items.reduce((sum, item) => sum + item.qty, 0)
    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.qty, 0)
    const tax = subtotal * TAX_RATE

    const addItem = (item, size, qty) => {
      const key = size ? `${item.id}-${size.label}` : item.id
      setItems((current) => {
        const existing = current.find((line) => line.key === key)
        if (existing) {
          return current.map((line) =>
            line.key === key ? { ...line, qty: line.qty + qty } : line,
          )
        }
        return [
          ...current,
          {
            key,
            id: item.id,
            name: item.name,
            size: size?.label ?? null,
            unitPrice: size?.price ?? item.price,
            qty,
          },
        ]
      })
    }

    const changeQty = (key, change) => {
      setItems((current) =>
        current
          .map((line) =>
            line.key === key ? { ...line, qty: line.qty + change } : line,
          )
          .filter((line) => line.qty > 0),
      )
    }

    return {
      items,
      itemCount,
      subtotal,
      tax,
      total: subtotal + tax,
      addItem,
      changeQty,
    }
  }, [items])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used inside CartProvider')
  return context
}
