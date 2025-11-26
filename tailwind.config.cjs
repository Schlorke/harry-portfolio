/** @type {import('tailwindcss').Config} */
const config = {
  prefix: 'tw-',
  corePlugins: {
    preflight: false
  },
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.mdx'
  ],
  theme: {
    extend: {
      colors: {
        first: {
          DEFAULT: 'hsl(358, 80%, 49%)',
          alt: 'hsl(358, 76%, 45%)'
        },
        white: 'hsl(0, 0%, 98%)',
        black: 'hsl(0, 0%, 1%)',
        text: 'hsl(358, 2%, 66%)',
        body: 'hsl(358, 100%, 1%)',
        container: 'hsl(358, 2%, 10%)'
      },
      fontFamily: {
        body: ['Poppins', 'sans-serif'],
        second: ['Alegreya Sans SC', 'sans-serif']
      },
      fontSize: {
        biggest: ['2.5rem', { lineHeight: '1.2' }],
        h1: ['1.5rem', { lineHeight: '1.2' }],
        h2: ['1.25rem', { lineHeight: '1.2' }],
        h3: ['1rem', { lineHeight: '1.2' }],
        normal: ['0.9375rem', { lineHeight: '1.5' }],
        small: ['0.813rem', { lineHeight: '1.5' }],
        smaller: ['0.75rem', { lineHeight: '1.5' }]
      },
      screens: {
        xs: '320px',
        sm: '540px',
        md: '768px',
        lg: '1200px',
        xl: '1500px'
      },
      spacing: {
        container: '1168px'
      },
      backgroundImage: {
        'conic-gradient':
          'conic-gradient(from 150deg at 50% 45%, hsl(358, 80%, 20%) 0deg, hsl(358, 80%, 48%) 140deg, hsl(358, 80%, 20%) 360deg)'
      },
      zIndex: {
        tooltip: '10',
        fixed: '100'
      }
    }
  },
  plugins: []
}

module.exports = config
