# @saas-ui/pro

## 0.3.13

### Patch Changes

- 821fb61: Removed dependency on react-icons and added react-icons to devDependencies.

## 0.3.12

### Patch Changes

- 3dd0eed: Fixed internal ErrorBoundary import.
- 6657bdd: No longer require `downlevelIteration` to be true in tsconfig.

## 0.3.11

### Patch Changes

- 370e2be: Fixed issue where PageBody maxW could not be overwritten.
- 717f3a9: Updated SidebarMenu label type to ReactNode.

## 0.3.10

### Patch Changes

- f96b1e1: Improved platformSelect types.
- 446c114: Links in DataGrid no longer have an underline on hover by default.
- ebd6a26: BulkActions title can now be configured.
- ebd6a26: BulkActions selections now supports strings or numbers.
- ebd6a26: BulkActions now supports all Banner props.
- 0ddbf5c: DataGridPagination now supports onChange handler to be used for remote pagination.

## 0.3.9

### Patch Changes

- 1f12e2d: Added classname to MenuListFilter
- b61928d: Fixed lg fontSize definition.
- 7d3e2b0: Addd proper focus styles on SidebarButton and SidebarLink elements.
- b3a90d0: Fixed issue where useResize would prevent all container click events.
- 8fdb19a: Improved SidebarLink icon sizing

## 0.3.8

### Patch Changes

- 8cfcd9e: Improved ActiveFilter typings

## 0.3.7

### Patch Changes

- Added seperate export for theme to support Chakra Theme tokens

## 0.3.6

### Patch Changes

- baed105: Fixed MenuListFilter types

## 0.3.5

### Patch Changes

- ebfa994: ActiveFilter is now controlled, allowing change action to be cancelled on custom filter input.
- ebfa994: Now using filter values to render active filter labels.

## 0.3.4

### Patch Changes

- ae2083f: Filter operators can now be configured in the FilterItem config.
- ae2083f: New async onBeforeEnableFilter callback to allow custom user input when enabling filters.

## 0.3.3

### Patch Changes

- Fixed useActiveFilter typings

## 0.3.2

### Patch Changes

- 948e812: DataGrid now accepts all filter operators.
- eb1073b: Added classnames to AppShell
- 3833c56: Added ResizeHandle classnames and display name
- 8709e3a: Improved DataGrid styles and new NoResults/NoFilteredResults components
- a51f156: Fixed Resize container ref not being set.

## 0.3.1

### Patch Changes

- c516bcb: Added new onSortChange callback to DataGrid to enable remote sorting.
- c516bcb: Disabled user select on DataGrid headers.

## 0.3.0

### Minor Changes

- 7abed42: BREAKING: Removed billing, charts and onboarding packages from core.

### Patch Changes

- 3b8a68a: Added filters plugin to DataGrid
- 197c626: Added new ActiveFilter component.
- 1103d79: Added new default-border-color semantic token.
- 44c5397: New FiltersProvider and ActiveFiltersList components
- 93f54b6: Removed hover style from MenuListFilter input.
- 3b8a68a: DataGridPagination no longer included by default.

## 0.2.6

### Patch Changes

- Fix: No longer passing down resize props to Sidebar container element.

## 0.2.5

### Patch Changes

- Updated peer dependencies
- Updated dependencies
  - @saas-ui/billing@0.1.1
  - @saas-ui/charts@0.0.1
  - @saas-ui/onboarding@0.1.1

## 0.2.4

### Patch Changes

- Fixed useActivePath SSR issue.
- 42f165c: Added ResponsiveMenu component

## 0.2.3

### Patch Changes

- c42cd5d: Added new useResize hook, Sidebar is now resizable.

## 0.2.2

### Patch Changes

- be3eab9: Added displayNames to all Sidebar components.
- 5787f35: New default variant for Page and fixed padding issue.
- 51b3e22: Improved AppShell fullscreen variant and added new default variant
- 4eb7b3f: Condensed SidebarNav now aligns items center.
- be3eab9: SidebarLink now accepts isActive prop

## 0.2.1

### Patch Changes

- 3583ef8: Added fullscreen variant for AppShell
- 6d0b31f: Removed @chakra-ui/icons dependency
- bfcc252: New ToolbarToggleGroup and ToolbarToggleButton components

## 0.2.0

### Minor Changes

- Updated Minimal @saas-ui/react version to 0.12.0

## 0.1.0

### Minor Changes

- BREAKING: Restructured packages, PageShell has been renamed to AppShell

### Patch Changes

- Updated dependencies
  - @saas-ui/billing@0.1.0
  - @saas-ui/charts@null
  - @saas-ui/onboarding@0.1.0
