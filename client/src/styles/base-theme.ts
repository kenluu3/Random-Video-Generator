const baseTheme = {
  fontFamily: 'Roboto, sans-serif',
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18, 
    xl: 20,
  },
  headings: {
    fontFamily: 'Roboto, sans-serif',
  },
  defaultRadius: 'xs',
  shadows: 'md',
  components: {
    Button: {
      defaultProps: {
        uppercase: true,
      }
    },
    Text: {
      defaultProps: {
        weight: 0,
        color: 'black',
      }
    },
    Paper: {
      defaultProps: {
        p: 'xs',
        radius: 'sm',
        withBorder: true,
      }
    },
    TextInput: {
      defaultProps: {
        autoComplete: 'true',
      }
    },
    PasswordInput: {
      defaultProps: {
        autoComplete: 'true',
      }
    }
  }
}

export { baseTheme };