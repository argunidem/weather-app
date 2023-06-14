module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      primary: 'Poppins',
    },
    extend: {
      keyframes: {
        shake: {
          '0%': {
            transform: 'translate(3px, 0)',
          },
          '50%': {
            transform: 'translate(-3px, 0)',
          },
          '100%': {
            transform: 'translate(0, 0)',
          },
        },
        'change-color': {
          '0%': {
            opacity: 0,
          },
          '8%': {
            opacity: 1,
          },
          '20%': {
            opacity: 0.4,
          },
          '30%': {
            opacity: 0.9,
          },
          '40%': {
            opacity: 0.6,
          },
          '50%': {
            opacity: 1,
          },
          '60%': {
            opacity: 0.3,
          },
          '70%': {
            opacity: 0.6,
          },
          '80%': {
            opacity: 0.9,
          },
          '90%': {
            opacity: 0.5,
          },
          '100%': {
            opacity: 1,
          },
        },
      },
      animation: {
        shake: 'shake 150ms 2 linear',
        'change-color': 'change-color 22s linear infinite alternate forwards',
      },
    },
  },
  plugins: [],
};
