/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
        secondary: '#7c3aed',
        accent: '#ec4899',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['SF Mono', 'Monaco', 'Cascadia Code', 'Roboto Mono', 'monospace'],
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('colors.gray.700'),
            h1: {
              color: theme('colors.gray.900'),
              fontWeight: '800',
            },
            h2: {
              color: theme('colors.gray.900'),
              fontWeight: '700',
            },
            h3: {
              color: theme('colors.gray.900'),
              fontWeight: '600',
            },
            a: {
              color: theme('colors.orange.600'),
              '&:hover': {
                color: theme('colors.orange.700'),
              },
            },
            code: {
              color: theme('colors.orange.600'),
              backgroundColor: theme('colors.orange.50'),
              padding: '0.125rem 0.25rem',
              borderRadius: '0.25rem',
              fontWeight: '600',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: theme('colors.gray.900'),
              color: theme('colors.gray.100'),
            },
            blockquote: {
              borderLeftColor: theme('colors.orange.500'),
              color: theme('colors.gray.600'),
            },
          },
        },
        dark: {
          css: {
            color: theme('colors.gray.300'),
            h1: {
              color: theme('colors.gray.100'),
            },
            h2: {
              color: theme('colors.gray.100'),
            },
            h3: {
              color: theme('colors.gray.100'),
            },
            a: {
              color: theme('colors.orange.400'),
              '&:hover': {
                color: theme('colors.orange.300'),
              },
            },
            code: {
              color: theme('colors.orange.400'),
              backgroundColor: 'rgba(251, 146, 60, 0.1)',
            },
            pre: {
              backgroundColor: theme('colors.gray.800'),
              color: theme('colors.gray.100'),
            },
            blockquote: {
              borderLeftColor: theme('colors.orange.400'),
              color: theme('colors.gray.400'),
            },
            strong: {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}