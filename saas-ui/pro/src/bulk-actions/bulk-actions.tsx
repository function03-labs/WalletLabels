import * as React from 'react'
import {
  Banner,
  BannerProps,
  BannerContent,
  BannerTitle,
  BannerActions,
} from '@saas-ui/react'
import { MaybeRenderProp } from '@chakra-ui/react-utils'
import { runIfFn } from '@chakra-ui/utils'

export type BulkActionsSelections = string[] | number[]

export interface BulkActionsProps extends BannerProps {
  /**
   * Array with selected ids.
   */
  selections: BulkActionsSelections
  /**
   * The title
   *
   * ":selections" will be replaced with the amount of selected items.
   *
   * @default ":selections selected"
   */
  title?: string
  /**
   * The action buttons.
   */
  actions: MaybeRenderProp<{ selections: BulkActionsSelections }>
}

/**
 * BulkActions will open when there are 1 or more selections.
 */
export const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const {
    selections = [],
    title = ':selections selected',
    actions,
    ...rest
  } = props

  const isOpen = !!selections?.length

  return (
    <Banner
      initial="exit"
      isOpen={isOpen}
      colorScheme="primary"
      variant="solid"
      position="absolute"
      minH="14"
      zIndex="banner"
      variant="floating"
      {...rest}
    >
      <BannerContent>
        <BannerTitle>
          {title.replace(':selections', selections.length.toString())}
        </BannerTitle>
      </BannerContent>
      <BannerActions flexShrink={0}>
        {runIfFn(actions, { selections })}
      </BannerActions>
    </Banner>
  )
}

BulkActions.displayName = 'BulkActions'
