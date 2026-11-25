import { Link } from 'react-router-dom'
import CartSidebar from '../components/CartSidebar'
import Icon from '../components/Icon'
import MenuCard from '../components/MenuCard'
import { formatMoney, menuSections } from '../data/menu'
import { useCart } from '../context/CartContext'

const categoryLinks = [
  { id: 'pizzas-sec', label: 'Pizzas', icon: 'local_pizza', active: true },
  { id: 'sides-sec', label: 'Sides', icon: 'lunch_dining' },
  { id: 'drinks-sec', label: 'Drinks', icon: 'local_bar' },
]

export default function MenuPage() {
  const { total, itemCount } = useCart()

  return (
    <main className="w-full pt-28 bg-surface pb-24 lg:pb-0">
      <div className="flex flex-col w-full">
        <div className="w-full relative overflow-hidden bg-surface-container-low py-space-xl px-margin-sm md:px-margin mb-space-lg">
          <div className="absolute -top-16 -right-16 w-96 h-96 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full bg-primary/5 blur-2xl pointer-events-none" />
          <div className="max-w-7xl mx-auto relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-space-lg">
            <div className="space-y-space-xs max-w-2xl">
              <div className="inline-flex items-center gap-space-xs px-space-md py-space-xs rounded-full bg-secondary/10 text-secondary">
                <Icon name="local_fire_department" className="text-[16px]" />
                <span className="font-label-md text-label-md tracking-wider uppercase font-semibold">
                  Slow Fermented • 800° Stone Oven
                </span>
              </div>
              <h1 className="font-headline text-display-lg text-on-surface tracking-tight leading-tight">
                Handcrafted <span className="text-primary italic font-serif">Woodfired</span> Pizza
              </h1>
              <p className="text-body-lg text-on-surface-variant max-w-xl">
                Baked with passion in our 800° stone deck oven. Authentic slow-fermented Neapolitan
                dough with imported San Marzano D.O.P. and fior di latte.
              </p>
            </div>
            <div className="flex items-center gap-space-md bg-surface-container-lowest p-space-md rounded-xl shadow-md">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <Icon name="schedule" className="text-[26px]" />
              </div>
              <div>
                <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider block">
                  Pickup Ready In
                </span>
                <span className="text-price-lg text-on-surface font-bold">15–20 Minutes</span>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-margin-sm md:px-margin w-full pb-space-xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter">
            <div className="lg:col-span-8 flex flex-col space-y-space-xl">
              <div className="flex items-center gap-space-xs overflow-x-auto pb-space-xs no-scrollbar">
                {categoryLinks.map((link) => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() =>
                      document.getElementById(link.id)?.scrollIntoView({ behavior: 'smooth' })
                    }
                    className={`px-space-md py-space-xs rounded-full font-label-lg text-label-lg transition-all flex items-center gap-space-xs shrink-0 ${
                      link.active
                        ? 'bg-primary text-on-primary shadow-sm'
                        : 'bg-surface-container-high hover:bg-surface-container-highest text-on-surface'
                    }`}
                  >
                    <Icon name={link.icon} className="text-[18px]" />
                    {link.label}
                  </button>
                ))}
              </div>

              {menuSections.map((section) => (
                <section key={section.id} id={section.id} className="space-y-space-md scroll-mt-36">
                  <div className="flex items-baseline justify-between">
                    <div className="flex items-center gap-space-sm">
                      <Icon
                        name={section.icon}
                        className={`text-primary text-[28px] ${section.iconColor ?? ''}`}
                      />
                      <h2 className="font-headline text-headline-lg text-on-surface">{section.title}</h2>
                    </div>
                    <span className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">
                      {section.label}
                    </span>
                  </div>
                  <div className={`grid grid-cols-1 gap-space-md ${section.tileColumns ?? ''}`}>
                    {section.items.map((item) => (
                      <MenuCard key={item.id} item={item} variant={section.variant} />
                    ))}
                  </div>
                </section>
              ))}
            </div>

            <div className="lg:col-span-4">
              <CartSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Handy checkout bar for smaller screens. */}
      <div className="lg:hidden fixed bottom-0 left-0 w-full z-40 bg-surface-container-lowest shadow-[0_-4px_20px_rgba(35,32,29,0.12)] px-margin-sm py-space-sm flex items-center justify-between gap-space-md">
        <div>
          <span className="block font-label-md text-label-md text-on-surface-variant">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} • Total Due
          </span>
          <span className="text-price-lg text-primary font-bold tabular-nums">{formatMoney(total)}</span>
        </div>
        <Link
          to="/checkout"
          className="px-space-md py-space-xs rounded-full bg-primary text-on-primary font-label-lg text-label-lg flex items-center gap-1"
        >
          Ready to Pay
          <Icon name="arrow_forward" className="text-[18px]" />
        </Link>
      </div>
    </main>
  )
}
