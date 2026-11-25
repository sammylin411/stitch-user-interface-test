import Icon from './Icon'

export default function QuantityStepper({ qty, onMinus, onPlus, compact = false }) {
  const btn = compact
    ? 'w-6 h-6 rounded-full bg-surface text-on-surface flex items-center justify-center font-bold text-xs hover:bg-primary hover:text-on-primary transition-colors'
    : 'w-7 h-7 rounded-full bg-surface hover:bg-surface-container-low text-on-surface flex items-center justify-center font-bold'

  return (
    <div
      className={`flex items-center rounded-full ${
        compact ? 'bg-surface-container-highest px-1 py-0.5' : 'bg-surface-container-highest p-1'
      }`}
    >
      <button type="button" className={btn} onClick={onMinus} aria-label="Decrease quantity">
        -
      </button>
      <span
        className={`text-center font-semibold text-on-surface tabular-nums ${
          compact ? 'w-6 font-label-md' : 'w-8 font-title-md'
        }`}
      >
        {qty}
      </span>
      <button type="button" className={btn} onClick={onPlus} aria-label="Increase quantity">
        +
      </button>
    </div>
  )
}
