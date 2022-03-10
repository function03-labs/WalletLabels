import {
  Banner,
  BannerContent,
  BannerTitle,
  BannerActions,
} from '@saas-ui/banner'

export interface BulkActionsProps {
  selections: string[]
  actions: React.ReactNode
}

export const BulkActions: React.FC<BulkActionsProps> = (props) => {
  const { selections, actions, ...rest } = props

  const isOpen = !!selections?.length

  const bannerStyles = {
    position: 'absolute',
    right: 0,
    top: 0,
    minHeight: 14,
  }

  return (
    <Banner
      initial="exit"
      isOpen={isOpen}
      sx={bannerStyles}
      colorScheme="primary"
      variant="solid"
      {...rest}
    >
      <BannerContent>
        <BannerTitle>{selections.length} selected</BannerTitle>
      </BannerContent>
      <BannerActions flexShrink={0}>{actions}</BannerActions>
    </Banner>
  )
}
