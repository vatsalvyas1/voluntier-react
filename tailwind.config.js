/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#FFFFFF',
        foreground: '#000000',
        primary: '#3B82F6',
        border: '#E5E7EB',
        input: '#D1D5DB',
        ring: '#2563EB',
        'primary-foreground': '#FFFFFF',
        secondary: '#F87171',
        'secondary-foreground': '#FFFFFF',
        accent: '#34D399',
        'accent-foreground': '#FFFFFF',
        destructive: '#EF4444',
        'destructive-foreground': '#FFFFFF',
        muted: '#6B7280',
        'muted-foreground': '#FFFFFF',
        card: '#F9FAFB',
        'card-foreground': '#111827',
        popover: '#F3F4F6',
        'popover-foreground': '#111827',
      },
    boxShadow: {
      'custom-kaala':'3px 3px rgb(114,114,114)',
    }
    },
  },
  plugins: [],
}

