import {
  chakra,
  fadeConfig,
  Portal,
  SystemStyleObject,
  useStyleConfig,
} from '@chakra-ui/react'
import { cx } from '@chakra-ui/utils'
import { motion } from 'framer-motion'
import * as React from 'react'
import { useTourSpotlight, TourSpotlightProps } from './use-tour-spotlight'

export const MotionBox = chakra(motion.div)

export const TourSpotlight: React.FC<TourSpotlightProps> = React.forwardRef(
  (props, ref) => {
    const {
      motionPreset,
      spacing,
      closeOnClick,
      hideOverlay,
      onClick,
      ...rest
    } = props

    const styles = useStyleConfig('SuiSpotlight', props)

    const { getSpotlightProps } = useTourSpotlight()

    const spotlightStyles: SystemStyleObject = {
      position: 'absolute',
      zIndex: 'overlay',
      transitionProperty: 'all',
      transitionDuration: 'slow',
      borderRadius: 'md',
      borderWidth: '2px',
      borderColor: 'primary.500',
      ...styles,
    }

    const motionProps: any = motionPreset === 'none' ? {} : fadeConfig

    return (
      <Portal>
        <MotionBox
          {...rest}
          {...motionProps}
          {...getSpotlightProps(props)}
          ref={ref}
          __css={spotlightStyles}
          className={cx('sui-spotlight', props.className)}
        />
      </Portal>
    )
  },
)

TourSpotlight.displayName = 'TourSpotlight'

TourSpotlight.defaultProps = {
  spacing: 4,
  closeOnClick: true,
}
