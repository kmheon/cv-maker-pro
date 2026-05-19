export const themeClasses = (
  darkMode
) => {
  return {
    /* PAGE */

    page: darkMode
      ? 'bg-zinc-950 text-white'
      : 'bg-zinc-100 text-black',

    /* CARDS */

    card: darkMode
      ? 'bg-zinc-900 text-white'
      : 'bg-white text-black',

    /* SIDEBAR */

    sidebar: darkMode
      ? 'bg-zinc-950 text-white'
      : 'bg-[#0f172a] text-white',

    /* TEXT */

    heading: darkMode
      ? 'text-white'
      : 'text-zinc-900',

    body: darkMode
      ? 'text-zinc-300'
      : 'text-zinc-600',

    muted: darkMode
      ? 'text-zinc-400'
      : 'text-zinc-500',

    /* INPUTS */

    input: darkMode
      ? `
        bg-zinc-800
        border-zinc-700
        text-white
      `
      : `
        bg-white
        border-zinc-200
        text-black
      `,

    /* TAGS */

    tag: darkMode
      ? `
        bg-zinc-800
        text-zinc-200
      `
      : `
        bg-zinc-100
        text-zinc-700
      `,
  }
}