import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbItemProps,
  BreadcrumbLink,
  BreadcrumbProps,
  SkeletonText,
  Text,
} from '@chakra-ui/react'
import { Link } from '@saas-ui/react'

export interface BreadcrumbsItem extends Omit<BreadcrumbItemProps, 'title'> {
  title?: React.ReactNode
  href?: string
}

export interface BreadCrumbsProps extends BreadcrumbProps {
  items: BreadcrumbsItem[]
}

/**
 * Breadcrumbs helper component.
 *
 * Wraps breadcrumb links to work with your router.
 * Renders items without a title as a Skeleton animation.
 */
export const Breadcrumbs: React.FC<BreadCrumbsProps> = (props) => {
  const { items = [], ...rest } = props
  return (
    <Breadcrumb {...rest}>
      {items?.map((item, i) => {
        const { href, title, ...itemProps } = item

        return (
          <BreadcrumbItem key={i} {...itemProps} fontSize="md">
            {href ? (
              <BreadcrumbLink
                as={Link}
                href={href}
                fontWeight="semibold"
                _hover={{
                  textDecoration: 'none',
                }}
              >
                {title}
              </BreadcrumbLink>
            ) : title ? (
              <Text color="muted">{title}</Text>
            ) : (
              <SkeletonText width="28" noOfLines={1} />
            )}
          </BreadcrumbItem>
        )
      })}
    </Breadcrumb>
  )
}
