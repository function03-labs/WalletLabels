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
      color: 'sidebar-muted',
      '.saas-nav-item [data-active] &, .saas-nav-item:not([data-active]):hover &':
        {
          color: 'sidebar-text',
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
