/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: '#0B1B33', 900: '#0B1B33', 800: '#13284A', 700: '#1D3761', 600: '#2B4A7A' },
        accent: { DEFAULT: '#0F766E', 50: '#ECFDF9', 100: '#CCF5EC', 200: '#99E6D6', 500: '#14958A', 600: '#0F766E', 700: '#0B5C56' },
        ok: { 50: '#ECFDF3', 100: '#D1FADF', 600: '#16803C', 700: '#11632F' },
        warn: { 50: '#FFFAEB', 100: '#FEF0C7', 600: '#B54708', 700: '#93370D' },
        bad: { 50: '#FEF3F2', 100: '#FEE4E2', 600: '#C0362C', 700: '#9A2A22' },
        info: { 50: '#EFF4FF', 100: '#D9E5FF', 600: '#2D5BD0', 700: '#2347A8' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,27,51,0.06), 0 1px 1px rgba(11,27,51,0.04)',
        pop: '0 12px 32px rgba(11,27,51,0.18)',
      },
    },
  },
  plugins: [],
}
