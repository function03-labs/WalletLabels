import { anatomy, PartsStyleFunction } from '@chakra-ui/theme-tools'

const parts = anatomy('page-sidebar').parts(
  'container',
  'headerWrapper',
  'header',
  'title',
  'body',
)

const baseStyle: PartsStyleFunction<typeof parts> = (props) => {
  return {
    container: {
      display: 'flex',
      flexDirection: 'column',
      minH: 0,
      position: 'relative',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'stretch',
      py: 2,
      px: 4,
      minH: 12,
      borderBottomWidth: '1px',
      '& > .saas-toolbar': {
        ms: 4,
      },
    },
    title: {
      fontWeight: 'bold',
      fontSize: 'md',
    },
    body: {
      flex: 1,
      overflow: 'auto',
      py: 2,
      px: 4,
    },
  }
}

export default {
  parts: parts.keys,
  baseStyle,
}
