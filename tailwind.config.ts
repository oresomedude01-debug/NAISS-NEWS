import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        dark: '#000000',
        'dark-secondary': '#111111',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgb(17, 24, 39)',
            a: {
              color: 'rgb(37, 99, 235)',
              '&:hover': {
                color: 'rgb(29, 78, 216)',
              },
            },
          },
        },
      },
    },
  },
  plugins: [],
  darkMode: 'class',
};

export default config;
