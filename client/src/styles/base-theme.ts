const baseTheme = {
  defaultRadius: 'sm',
  components: {
    Button: {
      defaultProps: {
        radius: 'xs',
        color: 'indigo',
        uppercase: true,
      },
    },
  },
  headings: {
    fontFamily: 'cursive, fantasy'
  },
  fontSizes: {
    xs: 11,
    sm: 12,
    md: 14,
    lg: 16,
    xl: 20,
  }
}

export { baseTheme };