import type {
  PartsStyleFunction,
  SystemStyleFunction,
  SystemStyleObject,
} from '@chakra-ui/theme-tools'
import { cssVar, mode, anatomy } from '@chakra-ui/theme-tools'

const parts = anatomy('tour-dialog').parts(
  'popper',
  'content',
  'header',
  'body',
  'footer',
  'arrow',
  'closeButton',
)

const $popperBg = cssVar('tour-dialog-bg')

const $arrowBg = cssVar('popper-arrow-bg')
const $arrowShadowColor = cssVar('popper-arrow-shadow-color')

const baseStylePopper: SystemStyleObject = {
  zIndex: 'modal',
}

const baseStyleContent: SystemStyleFunction = (props) => {
  const { colorScheme: c } = props
  const bg = `${c}.500`
  const shadowColor = mode('blackAlpha.200', 'whiteAlpha.300')(props)

  return {
    [$popperBg.variable]: `colors.${bg}`,
    bg: $popperBg.reference,
    [$arrowBg.variable]: $popperBg.reference,
    [$arrowShadowColor.variable]: `colors.${shadowColor}`,
    color: 'white',
    width: 'xs',
    border: '1px solid',
    borderColor: 'inherit',
    borderRadius: 'md',
    boxShadow: 'sm',
    zIndex: 'inherit',
    _focus: {
      outline: 0,
    },
  }
}

const baseStyleHeader: SystemStyleObject = {
  px: 4,
  py: 3,
  fontWeight: 'bold',
}

const baseStyleBody: SystemStyleObject = {
  px: 3,
  py: 2,
  fontSize: 'md',
}

const baseStyleFooter: SystemStyleObject = {
  px: 3,
  py: 2,
  display: 'flex',
  alignItems: 'center',
}

const baseStyleCloseButton: SystemStyleObject = {
  position: 'absolute',
  borderRadius: 'md',
  top: 1,
  insetEnd: 2,
  padding: 2,
}

const baseStyle: PartsStyleFunction<typeof parts> = (props) => ({
  popper: baseStylePopper,
  content: baseStyleContent(props),
  header: baseStyleHeader,
  body: baseStyleBody,
  footer: baseStyleFooter,
  arrow: {},
  closeButton: baseStyleCloseButton,
})

export default {
  defaultProps: {
    colorScheme: 'primary',
  },
  parts: parts.keys,
  baseStyle,
}
