/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-plum': '#330066',
        'deep-plum-raw': '#2C0065',
        'accent-orange': '#FF8A00',
        'accent-pink': '#F63BBE',
        'accent-green': '#4CB46A',
        'accent-turquoise': '#2F8CEB',
        'accent-purple': '#9A40EF',
        'accent-dark-orange': '#FF5C3D',
        'ink-black': '#000000',
        'pure-white': '#FFFFFF',
        'mist-gray': '#F4F0F8'
      },
      fontFamily: {
        heading: [
          '"ITC Avant Garde Gothic"',
          '"ITC Avant Garde Gothic Std"',
          '"TeX Gyre Adventor"',
          '"Century Gothic"',
          'sans-serif'
        ],
        body: [
          '"ITC Avant Garde Gothic"',
          '"ITC Avant Garde Gothic Std"',
          '"TeX Gyre Adventor"',
          '"Century Gothic"',
          'sans-serif'
        ]
      },
      boxShadow: {
        'soft-xl': '0 24px 54px -26px rgba(17, 7, 38, 0.38)'
      },
      maxWidth: {
        '8xl': '90rem'
      },
      backgroundImage: {
        'hero-glow':
          'radial-gradient(circle at 50% -8%, rgba(246,59,190,0.24), transparent 44%), radial-gradient(circle at 12% 40%, rgba(47,140,235,0.18), transparent 34%), radial-gradient(circle at 88% 30%, rgba(255,138,0,0.2), transparent 34%)'
      }
    }
  },
  plugins: []
};
