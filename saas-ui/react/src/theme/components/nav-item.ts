export default {
  baseStyle: {
    item: {
      color: 'sidebar-text',
    },
    link: {
      color: 'sidebar-text',
      _hover: {
        bg: 'sidebar-on-muted',
      },
    },
    icon: {
      color: 'sidebar-text',
      opacity: 0.5,
      '.sui-nav-item [data-active] &, .sui-nav-item:not([data-active]):hover &':
        {
          opacity: 1,
        },
    },
  },
  variants: {
    neutral: {
      link: {
        _hover: {
          bg: 'sidebar-on-muted',
        },
        _active: {
          bg: 'sidebar-on-subtle',
        },
      },
    },
  },
}
