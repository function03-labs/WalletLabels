import { SystemStyleObject } from '@chakra-ui/react'
import {
  PropertyList,
  Property,
  PropertyLabel,
  PropertyValue,
} from '@saas-ui/react'

export const MenuPropertyList = PropertyList

export interface MenuPropertyProps {
  orientation?: 'horizontal' | 'vertical'
  label: React.ReactNode
  value: React.ReactNode
}

export const MenuProperty: React.FC<MenuPropertyProps> = (props) => {
  const { orientation, label, value } = props

  const isVertical = orientation === 'vertical'

  const propertyStyles: SystemStyleObject = {
    px: '0.8rem',
    py: '0.4rem',
    ...(isVertical
      ? {
          flexDirection: 'column',
          alignItems: 'flex-start',
        }
      : {}),
  }

  const labelStyles: SystemStyleObject = {
    flex: 1,
    width: 'auto',
    py: 0,
    ...(isVertical
      ? {
          mb: 2,
        }
      : { maxW: '80%' }),
  }

  const valueStyles: SystemStyleObject = {
    flex: 0,
    py: 0,
  }

  return (
    <Property sx={propertyStyles}>
      <PropertyLabel sx={labelStyles}>{label}</PropertyLabel>
      <PropertyValue sx={valueStyles}>{value}</PropertyValue>
    </Property>
  )
}
