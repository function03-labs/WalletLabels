import React, { forwardRef } from 'react'
import { chakra } from '@chakra-ui/react'

import { Handle, Remove } from './kanban-action'

export interface KanbanColumnProps {
  children: React.ReactNode
  columns?: number
  label?: string
  style?: React.CSSProperties
  horizontal?: boolean
  hover?: boolean
  handleProps?: React.HTMLAttributes<any>
  scrollable?: boolean
  shadow?: boolean
  placeholder?: boolean
  unstyled?: boolean
  onClick?(): void
  onRemove?(): void
}

export const KanbanColumn = forwardRef<HTMLDivElement, KanbanColumnProps>(
  (
    {
      children,
      columns = 1,
      handleProps,
      horizontal,
      hover,
      onClick,
      onRemove,
      label,
      placeholder,
      style,
      scrollable,
      shadow,
      unstyled,
      ...props
    },
    ref,
  ) => {
    const styles = {
      Column: {
        display: 'flex',
        flexDirection: horizontal ? 'row' : 'column',
        flex: 1,
        overflow: scrollable ? 'auto' : 'visible',
        padding: '0.5rem',
        boxShadow: shadow ? '0 0 0 1px rgba(0, 0, 0, 0.1)' : undefined,
        borderRadius: '0.25rem',
        minWidth: '280px',
        _hover: hover
          ? {
              background: 'rgba(0, 0, 0, 0.05)',
            }
          : undefined,
      },
      header: {
        display: 'flex',
        justifyContent: 'space-between',
        py: 4,
        px: 6,
      },
      actions: {
        display: 'flex',
        color: 'inherit',
      },
    }

    const as = onClick ? 'button' : 'div'

    return (
      <chakra.div
        {...props}
        as={as}
        ref={ref}
        __css={styles.Column}
        style={
          {
            ...style,
            '--columns': columns,
          } as React.CSSProperties
        }
        onClick={onClick}
        tabIndex={onClick ? 0 : undefined}
      >
        {label ? (
          <chakra.header __css={styles.header}>
            {label}
            <chakra.div __css={styles.actions}>
              {onRemove ? <Remove onClick={onRemove} /> : undefined}
              <Handle {...handleProps} />
            </chakra.div>
          </chakra.header>
        ) : null}
        {placeholder ? children : <ul>{children}</ul>}
      </chakra.div>
    )
  },
)
