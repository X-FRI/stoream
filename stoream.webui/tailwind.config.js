module.exports = {
    // ... your existing config
    theme: {
      extend: {
        // ... your existing extends
        animation: {
          'fade-in': 'fadeIn 0.8s ease-in-out forwards',
          'fade-in-delay': 'fadeIn 0.8s ease-in-out 0.3s forwards',
          'fade-in-delay-2': 'fadeIn 0.8s ease-in-out 0.6s forwards',
          'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
          'bounce-subtle': 'bounceSlight 2s infinite',
        },
        keyframes: {
          fadeIn: {
            '0%': { opacity: 0, transform: 'translateY(10px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
          bounceSlight: {
            '0%, 100%': { transform: 'translateY(-3px)' },
            '50%': { transform: 'translateY(0)' },
          },
        },
      },
    },
    // ... rest of your config
  }