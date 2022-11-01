import {
  anatomy,
  PartsStyleFunction,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools'
import { cssVar, mode } from '@chakra-ui/theme-tools'

const parts = anatomy('date-picker').parts(
  'popper',
  'content',
  'header',
  'body',
  'footer',
  'arrow',
  'closeButton',
  'previousButton',
  'nextButton',
  'day',
)

const $popperBg = cssVar('popper-bg')

const $arrowBg = cssVar('popper-arrow-bg')
const $arrowShadowColor = cssVar('popper-arrow-shadow-color')

const baseStyleContainer: SystemStyleObject = {
  position: 'relative',
  display: 'inline-block',
  p: 2,
}

const baseStylePopper: SystemStyleObject = {
  zIndex: 10,
}

const baseStyleContent: SystemStyleFunction = (props) => {
  const bg = mode('white', 'gray.700')(props)
  const shadowColor = mode('gray.200', 'whiteAlpha.300')(props)

  return {
    [$popperBg.variable]: `colors.${bg}`,
    bg: $popperBg.reference,
    [$arrowBg.variable]: $popperBg.reference,
    [$arrowShadowColor.variable]: `colors.${shadowColor}`,
    border: '1px solid',
    borderColor: 'inherit',
    borderRadius: 'md',
    boxShadow: 'sm',
    zIndex: 'inherit',
    p: 2,
  }
}

const baseStyleHeader: SystemStyleObject = {
  px: 3,
  py: 2,
  borderBottomWidth: '1px',
}

const baseStyleBody: SystemStyleObject = {
  position: 'relative',
  px: 3,
  py: 2,
}

const baseStyleFooter: SystemStyleObject = {
  px: 3,
  py: 2,
  borderTopWidth: '1px',
}

const baseStyleCloseButton: SystemStyleObject = {
  position: 'absolute',
  borderRadius: 'md',
  top: 1,
  insetEnd: 2,
  padding: 2,
}

const baseStyleDay: SystemStyleObject = {
  width: 10,
  height: 10,
  my: '1px',
  borderRadius: 'md',
  transitionProperty: 'common',
  transitionDuration: 'normal',
}

const baseStyleYear: SystemStyleObject = {
  py: 2,
  px: 3,
  borderRadius: 'md',
  transitionProperty: 'common',
  transitionDuration: 'normal',
}

const baseStyleNav: SystemStyleObject = {
  display: 'flex',
}

const baseStyleNavButton: SystemStyleObject = {
  position: 'absolute',
  top: 3,
}

const baseStylePreviousButton: SystemStyleObject = {
  ...baseStyleNavButton,
  left: 3,
}

const baseStyleNextButton: SystemStyleObject = {
  ...baseStyleNavButton,
  right: 3,
}

const baseStylemMonthLabel: SystemStyleObject = {
  justifyContent: 'center',
  fontWeight: 'bold',
  mb: 6,
  fontSize: ['md', 'lg'],
}

const baseStylemYearsLabel: SystemStyleObject = {
  justifyContent: 'center',
  fontWeight: 'bold',
  mb: 2,
  fontSize: ['md', 'lg'],
}

const baseStylemWeekdayLabel: SystemStyleObject = {
  justifyContent: 'center',
  color: 'gray.500',
  mb: 4,
  fontSize: ['sm', 'md'],
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  container: baseStyleContainer,
  popper: baseStylePopper,
  content: baseStyleContent(props),
  header: baseStyleHeader,
  body: baseStyleBody,
  footer: baseStyleFooter,
  arrow: {},
  closeButton: baseStyleCloseButton,
  nav: baseStyleNav,
  previousButton: baseStylePreviousButton,
  nextButton: baseStyleNextButton,
  day: baseStyleDay,
  year: baseStyleYear,
  monthLabel: baseStylemMonthLabel,
  yearsLabel: baseStylemYearsLabel,
  weekdayLabel: baseStylemWeekdayLabel,
})

const variantDefault: PartsStyleFunction<typeof parts> = (props) => {
  const { colorScheme: c } = props
  return {
    day: {
      borderRadius: 'md',
      _hover: {
        bg: mode('blackAlpha.100', 'whiteAlpha.100')(props),
        borderRadius: 'md',
      },
      _selected: {
        bg: `${c}.100`,
        borderRadius: 'none',
        _hover: {
          borderRadius: 'none',
        },
        '&[data-first] span, &[data-last] span': {
          display: 'inline-flex',
          bg: `${c}.500`,
          borderRadius: 'md',
          color: 'white',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '&[data-first], &[data-first]:hover': {
          borderStartRadius: 'md',
        },
        '&[data-last], &[data-last]:hover': {
          borderEndRadius: 'md',
        },
        '&[data-first][data-last]': {
          bg: 'transparent',
        },
      },
      _highlighted: {
        bg: `${c}.100`,
        borderRadius: 'none',
        '&[data-first] span': {
          display: 'inline-flex',
          bg: `${c}.500`,
          borderRadius: 'md',
          color: 'white',
          height: '100%',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '&[data-first]': {
          borderStartRadius: 'md',
        },
        '&:hover': {
          borderEndRadius: 'md',
        },
      },
      _disabled: {
        color: 'muted',
      },
      '&[data-week-start], &[data-month-start]': { borderStartRadius: 'md' },
      '&[data-week-end], &[data-month-end]': {
        borderEndRadius: 'md',
      },
    },
    year: {
      _hover: {
        bg: mode('blackAlpha.100', 'whiteAlpha.100')(props),
        borderRadius: 'md',
      },
      _active: {
        bg: `${c}.500`,
        color: 'white',
      },
      _disabled: {
        color: 'muted',
      },
    },
  }
}

export default {
  defaultProps: {
    variant: 'default',
    colorScheme: 'primary',
  },
  parts: parts.keys,
  baseStyle,
  variants: {
    default: variantDefault,
  },
}
