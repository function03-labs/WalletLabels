import {
  chakra,
  forwardRef,
  HTMLChakraProps,
  createStylesContext,
  useMultiStyleConfig,
  ThemingProps,
} from '@chakra-ui/react'
import { cx, dataAttr, __DEV__ } from '@chakra-ui/utils'
import { timelineStyleConfig } from './timeline.styles'

const [StylesProvider, useStyles] = createStylesContext('Timeline')

export const useTimelineStyles = useStyles

export interface TimelineProps
  extends HTMLChakraProps<'ul'>,
    ThemingProps<'Timeline'> {}

export const Timeline: React.FC<TimelineProps> = (props) => {
  const { children, ...rest } = props

  const styles = useMultiStyleConfig('Timeline', {
    styleConfig: timelineStyleConfig,
    ...props,
  })

  const timelineStyles = {
    position: 'relative',
    listStyle: 'none',
    ...styles.container,
  }

  return (
    <StylesProvider value={styles}>
      <chakra.ul
        {...rest}
        __css={timelineStyles}
        className={cx('saas-timeline', props.className)}
      >
        {children}
      </chakra.ul>
    </StylesProvider>
  )
}

if (__DEV__) {
  Timeline.displayName = 'Timeline'
}

export interface TimelineItemProps extends HTMLChakraProps<'li'> {}

export const TimelineItem = forwardRef<TimelineItemProps, 'li'>(
  (props, ref) => {
    const { children, ...rest } = props

    const styles = useStyles()

    const itemStyles = {
      display: 'flex',
      minHeight: '32px',
      position: 'relative',
      ...styles.item,
    }

    return (
      <chakra.li
        {...rest}
        ref={ref}
        __css={itemStyles}
        className={cx('saas-timeline__item', props.className)}
      >
        {children}
      </chakra.li>
    )
  },
)

if (__DEV__) {
  TimelineItem.displayName = 'TimelineItem'
}

export interface TimelineContentProps extends HTMLChakraProps<'div'> {}

export const TimelineContent: React.FC<TimelineContentProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const contentStyles = {
    flex: 1,
    ...styles.content,
  }

  return (
    <chakra.div
      {...rest}
      __css={contentStyles}
      className={cx('saas-timeline__content', props.className)}
    >
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  TimelineContent.displayName = 'TimelineContent'
}

export interface TimelineSeparatorProps extends HTMLChakraProps<'div'> {}

export const TimelineSeparator: React.FC<TimelineSeparatorProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const separatorStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    flexShrink: 0,
    ...styles.separator,
  }

  return (
    <chakra.div
      {...rest}
      __css={separatorStyles}
      className={cx('saas-timeline__separator', props.className)}
    >
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  TimelineSeparator.displayName = 'TimelineSeparator'
}

export interface TimelineDotProps extends HTMLChakraProps<'div'> {}

export const TimelineDot: React.FC<TimelineDotProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const dotStyles = {
    ...styles.dot,
  }

  return (
    <chakra.div
      {...rest}
      __css={dotStyles}
      className={cx('saas-timeline__dot', props.className)}
    >
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  TimelineDot.displayName = 'TimelineDot'
}

export interface TimelineIconProps extends HTMLChakraProps<'div'> {}

export const TimelineIcon: React.FC<TimelineIconProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const iconStyles = {
    display: 'flex',
    alignItems: 'center',
    zIndex: 1,
    ...styles.icon,
  }

  return (
    <chakra.div
      {...rest}
      __css={iconStyles}
      className={cx('saas-timeline__icon', props.className)}
      data-dot={dataAttr(!children)}
    >
      {children || <TimelineDot />}
    </chakra.div>
  )
}

if (__DEV__) {
  TimelineIcon.displayName = 'TimelineIcon'
}

export interface TimelineTrackProps extends HTMLChakraProps<'div'> {}

export const TimelineTrack: React.FC<TimelineTrackProps> = (props) => {
  const { children, ...rest } = props

  const styles = useStyles()

  const trackStyles = {
    flex: 1,
    width: '1px',
    minH: '10px',
    position: 'absolute',
    top: '4px',
    bottom: 0,
    ...styles.track,
  }

  return (
    <chakra.div
      {...rest}
      __css={trackStyles}
      className={cx('saas-timeline__track', props.className)}
    >
      {children}
    </chakra.div>
  )
}

if (__DEV__) {
  TimelineTrack.displayName = 'TimelineTrack'
}
