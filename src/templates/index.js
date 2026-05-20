/* =========================
   TEMPLATE IMPORTS
========================= */

import ModernGlass from './ModernGlass'

/* =========================
   TEMPLATE REGISTRY
========================= */

const templates = {
  modernGlass: {
    /* CORE */

    id: 'modernGlass',

    name: 'Modern Glass',

    component: ModernGlass,

    /* UI */

    thumbnail:
      '/templates/modern-glass.jpg',

    description:
      'Premium glassmorphism resume layout',

    category:
      'Modern',

    accent:
      'blue',

    premium: false,

    darkSupported: true,

    featured: true,
  },
}

/* =========================
   HELPERS
========================= */

export const templateList =
  Object.values(templates)

/* =========================
   EXPORT
========================= */

export default templates