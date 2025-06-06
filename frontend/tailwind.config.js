/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        light: {
          background: '#DBEAFE',
          backgroundSecondary: '#e6f0fe',
          surface: '#FFFFFF',
          primaryText: '#1E3A8A',
          secondaryText: '#3B82F6',
          primaryAccent: '#60A5FA',
          success: '#22C55E',
          warning: '#FBBF24',
          error: '#EF4444',
          divider: '#BFDBFE',
          primaryAccentHover: '#3B82F6',
        },
        dark: {
          background: '#222222',
          backgroundSecondary: '#393939',
          surface: '#282828',
          primaryText: '#D0D6DD',
          secondaryText: '#7F95A1',
          primaryAccent: '#10A37F',
          success: '#22C55E',
          warning: '#FBBF24',
          error: '#EF4444',
          divider: '#243B53',
          primaryAccentHover: '#0E766E',
        },
      },
    },
  },
  plugins: [],
}
