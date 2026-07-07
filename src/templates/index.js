/* =========================
   TEMPLATE IMPORTS
========================= */

import ModernGlass from './ModernGlass'
import MinimalClassic from './MinimalClassic'
import ExecutiveElite from './ExecutiveElite'
import CreativeGradient from './CreativeGradient'

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

  minimalClassic: {
    /* CORE */

    id: 'minimalClassic',

    name: 'Minimal Classic',

    component: MinimalClassic,

    /* UI */

    thumbnail:
      '/templates/minimal-classic.svg',

    description:
      'Clean single-column resume with a bold header',

    category:
      'Classic',

    accent:
      'blue',

    premium: false,

    darkSupported: true,

    featured: false,
  },

  executiveElite: {
    /* CORE */

    id: 'executiveElite',

    name: 'Executive Elite',

    component: ExecutiveElite,

    /* UI */

    thumbnail:
      '/templates/executive-elite.svg',

    description:
      'Bold two-column layout for senior and leadership roles',

    category:
      'Executive',

    accent:
      'amber',

    premium: true,

    darkSupported: true,

    featured: true,
  },

  creativeGradient: {
    /* CORE */

    id: 'creativeGradient',

    name: 'Creative Gradient',

    component: CreativeGradient,

    /* UI */

    thumbnail:
      '/templates/creative-gradient.svg',

    description:
      'Vibrant single-page layout for creative and design roles',

    category:
      'Creative',

    accent:
      'purple',

    premium: true,

    darkSupported: true,

    featured: false,
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