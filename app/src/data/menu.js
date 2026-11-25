import { images } from './images'

// All menu content lives here so names, descriptions and prices can be changed in one place.
export const menuSections = [
  {
    id: 'pizzas-sec',
    title: 'Artisanal Pizzas',
    label: '3 Specialties',
    icon: 'local_pizza',
    variant: 'wide',
    items: [
      {
        id: 'pep-pizza',
        name: 'Pepperoni Pizza',
        price: 12.95,
        description:
          'Rich crushed San Marzano tomato sauce, fresh mozzarella, crispy pepperoni slices baked to a bubbly crisp crust.',
        badge: 'Popular',
        badgeStyle: 'bg-primary text-on-primary',
        image: images.pepperoniPizza,
        defaultSize: 'Large',
        sizes: [
          { label: 'Small', price: 7 },
          { label: 'Medium', price: 10 },
          { label: 'Large', price: 12.95 },
        ],
      },
      {
        id: 'cheese-pizza',
        name: 'Cheese Pizza',
        price: 10.95,
        description:
          'House tomato sauce, melted whole-milk mozzarella, aged parmesan blend baked with a golden blistered rim.',
        badge: 'Vegetarian',
        badgeStyle: 'bg-tertiary-container text-on-tertiary-container',
        image: images.cheesePizza,
        defaultSize: 'Large',
        sizes: [
          { label: 'Small', price: 6.5 },
          { label: 'Medium', price: 9.25 },
          { label: 'Large', price: 10.95 },
        ],
      },
      {
        id: 'eggplant-pizza',
        name: 'Eggplant Pizza',
        price: 11.95,
        description:
          'Roasted eggplant medallions, whipped garlic ricotta, house red sauce, and fresh aromatic basil leaves.',
        badge: 'Chef Special',
        badgeStyle: 'bg-tertiary-container text-on-tertiary-container',
        image: images.eggplantPizza,
        defaultSize: 'Large',
        sizes: [
          { label: 'Small', price: 6.75 },
          { label: 'Medium', price: 9.75 },
          { label: 'Large', price: 11.95 },
        ],
      },
    ],
  },
  {
    id: 'sides-sec',
    title: 'Savory Sides',
    label: 'Crisp & Fresh',
    icon: 'lunch_dining',
    iconColor: 'text-secondary',
    variant: 'tile',
    tileColumns: 'md:grid-cols-2',
    items: [
      {
        id: 'fries',
        name: 'Fries',
        price: 4.5,
        description:
          'Golden crisp russet fries tossed with coarse sea salt and freshly picked rosemary.',
        image: images.fries,
        defaultSize: 'Large',
        sizes: [
          { label: 'Small', price: 3.5 },
          { label: 'Large', price: 4.5 },
        ],
      },
      {
        id: 'greek-salad',
        name: 'Greek Salad',
        price: 7.25,
        description:
          'Crisp romaine, Kalamata olives, feta cheese, cucumbers, red onion, oregano vinaigrette. Single size portion.',
        image: images.greekSalad,
        fixedLabel: 'Single Size Serves 1–2',
      },
    ],
  },
  {
    id: 'drinks-sec',
    title: 'Cold Drinks',
    label: 'Chilled Refreshment',
    icon: 'local_drink',
    iconColor: 'text-tertiary',
    variant: 'tile',
    tileColumns: 'md:grid-cols-3',
    items: [
      {
        id: 'coke',
        name: 'Coke',
        price: 2,
        description: 'Chilled classic Coca-Cola.',
        image: images.coke,
        defaultSize: 'Medium',
        sizes: [
          { label: 'S', price: 1 },
          { label: 'M', price: 2 },
          { label: 'L', price: 3 },
        ],
      },
      {
        id: 'sprite',
        name: 'Sprite',
        price: 2,
        description: 'Crisp lemon-lime soda.',
        image: images.sprite,
        defaultSize: 'Medium',
        sizes: [
          { label: 'S', price: 1 },
          { label: 'M', price: 2 },
          { label: 'L', price: 3 },
        ],
      },
      {
        id: 'bottled-water',
        name: 'Bottled Water',
        price: 5,
        description: 'Pure mountain spring water 500ml.',
        image: images.bottledWater,
        fixedLabel: '500ml Bottle',
      },
    ],
  },
]

// The sample order shown in the original menu design.
export const initialCart = [
  { key: 'pep-pizza-Large', id: 'pep-pizza', name: 'Pepperoni Pizza', size: 'Large', unitPrice: 12.95, qty: 1 },
  { key: 'fries-Small', id: 'fries', name: 'Fries', size: 'Small', unitPrice: 3.5, qty: 1 },
  { key: 'coke-Medium', id: 'coke', name: 'Coke', size: 'Medium', unitPrice: 2, qty: 2 },
]

// Extra wording used on the review page for each ordered item.
export const checkoutLabels = {
  'pep-pizza': { name: 'Pepperoni Pizza', badge: 'Hot', badgeStyle: 'bg-primary-fixed text-on-primary-fixed-variant', detail: (size) => `${size || 'Large'} (16") • Slow-fermented sourdough`, image: images.checkoutPepperoni },
  'cheese-pizza': { name: 'Cheese Pizza', badge: 'Veg', badgeStyle: 'bg-tertiary-fixed text-on-tertiary-fixed', detail: (size) => `${size || 'Large'} • Whole-milk mozzarella & basil`, image: images.cheesePizza },
  'eggplant-pizza': { name: 'Eggplant Pizza', badge: 'Veg', badgeStyle: 'bg-tertiary-fixed text-on-tertiary-fixed', detail: (size) => `${size || 'Medium'} (12") • Garlic confit & ricotta`, image: images.checkoutEggplant },
  fries: { name: 'Tuscan Fries', detail: (size) => `${size || 'Small'} • Sea salt & rosemary dust`, icon: 'lunch_dining', iconColor: 'text-secondary' },
  'greek-salad': { name: 'Greek Salad', detail: () => 'Regular • Kalamata olives, feta & oregano', image: images.checkoutGreekSalad },
  coke: { name: 'Coca-Cola Classic', detail: (size) => `${size || 'Medium'} Fountain • Chilled`, icon: 'local_drink', iconColor: 'text-primary' },
  sprite: { name: 'Sprite', detail: (size) => `${size || 'Medium'} Fountain • Chilled`, icon: 'local_drink', iconColor: 'text-tertiary' },
  'bottled-water': { name: 'Natural Spring Water', detail: () => 'Bottled 750ml • Still Italian Springs', icon: 'water_bottle', iconColor: 'text-tertiary' },
}

export const TAX_RATE = 0.08875

export const formatMoney = (value) => `$${value.toFixed(2)}`
