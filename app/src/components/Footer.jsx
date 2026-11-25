import { images } from '../data/images'
import Icon from './Icon'

const hours = [
  ['Tue – Thu:', '11:30 AM – 10:00 PM'],
  ['Fri – Sat:', '11:30 AM – 11:30 PM'],
  ['Sun:', '12:00 PM – 9:30 PM'],
  ['Mon:', 'Fermentation & Prep (Closed)'],
]

export default function Footer() {
  return (
    <footer className="w-full bg-surface-container-low mt-space-xl shadow-[0_-1px_6px_rgba(35,32,29,0.03)]">
      <div className="w-full px-margin-sm md:px-margin py-margin">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-gutter">
          <div className="space-y-space-sm">
            <div className="flex items-center gap-space-sm">
              <img src={images.logo} alt="Sam's Pizza Minimal Logo" className="h-12 w-auto object-contain" />
              <span className="font-headline text-headline-md font-serif text-primary font-bold">
                Sam&apos;s Pizza
              </span>
            </div>
            <p className="text-body-md text-on-surface-variant max-w-sm">
              Artisanal slow-fermented wood-fired sourdough pies crafted with genuine D.O.P. Italian
              ingredients and passionate culinary care.
            </p>
          </div>

          <div className="space-y-space-xs">
            <h4 className="text-title-md text-on-surface font-semibold">Pickup Location</h4>
            <p className="text-body-md text-on-surface-variant">
              142 Elm Street
              <br />
              Little Italy District
              <br />
              New York, NY 10013
            </p>
            <p className="font-label-md text-label-md text-tertiary mt-space-xs font-semibold">
              Dedicated Curbside &amp; Counter Bays
            </p>
          </div>

          <div className="space-y-space-xs">
            <h4 className="text-title-md text-on-surface font-semibold">Kitchen Hours</h4>
            <div className="text-body-md text-on-surface-variant space-y-space-xs">
              {hours.map(([day, time]) => (
                <div key={day}>
                  <span className="font-semibold text-on-surface">{day}</span> {time}
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-space-xs">
            <h4 className="text-title-md text-on-surface font-semibold">Order Help &amp; Inquiries</h4>
            <p className="text-body-md text-on-surface-variant">
              Kitchen Desk: (555) 234-PIZZA
              <br />
              Email: ciao@samspizza.com
            </p>
            <div className="pt-space-xs flex items-center gap-space-sm text-secondary">
              <Icon name="timer" className="text-[18px]" />
              <span className="font-label-md text-label-md font-semibold">Avg Bake Time: 90 Seconds</span>
            </div>
          </div>
        </div>

        <div className="mt-margin pt-space-md flex flex-col md:flex-row items-center justify-between gap-space-sm text-on-surface-variant">
          <span className="text-body-md">
            © 2024 Sam&apos;s Pizza Co. All rights reserved. Crafted with slow-fire reverence.
          </span>
          <div className="flex items-center gap-space-lg font-label-md text-label-md">
            <span className="hover:text-primary cursor-pointer transition-colors">Dietary &amp; Allergens</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Privacy Policy</span>
            <span className="hover:text-primary cursor-pointer transition-colors">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
