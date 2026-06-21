import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: { ink: '#14181E', brass: '#C07C3C', paper: '#F5F2EC' },
    },
  },
  plugins: [],
}

export default config
