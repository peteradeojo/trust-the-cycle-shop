const daisyui = require('daisyui');

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './**/*.html',
    './src/**/*.{jsx,scss,css}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui
  ],
}

