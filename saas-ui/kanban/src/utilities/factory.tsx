import {
  SystemStyleObject,
  chakra,
  forwardRef,
  As,
  PropsOf,
  RightJoinProps,
  ComponentWithAs,
} from '@chakra-ui/react'

export function factory<Props extends object, Component extends As>(
  component: Component,
  styles: SystemStyleObject = {},
) {
  const StyledComponent = chakra(component)
  return forwardRef((props, ref) => {
    return <StyledComponent ref={ref} {...props} __css={styles} />
  }) as unknown as ComponentWithAs<
    Component,
    RightJoinProps<Omit<PropsOf<Component>, 'color'>, Props>
  >
}
