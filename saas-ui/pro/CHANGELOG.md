# @saas-ui/pro

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
