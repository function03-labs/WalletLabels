# @saas-ui-pro/react

## 0.27.0

### Minor Changes

- e9b3b00: Removed ErrorBoundary component
- e9b3b00: Removed useScript hook
- e9b3b00: Removed Tenancy provider

### Patch Changes

- 6478142: Updated to @saas-ui/react@2.2.3
- Updated dependencies [6478142]
  - @saas-ui-pro/onboarding@0.13.1

## 0.26.1

### Patch Changes

- 944b91b: Improved default font definition in pro theme

## 0.26.0

### Minor Changes

- 9710d8d: Revert button size changes in theme

### Patch Changes

- f08939c: Update to Saas UI 2.2.1

## 0.25.0

### Minor Changes

- 18c670f: Updated to Saas UI 2.2.0

### Patch Changes

- 18c670f: Added `use client` directive for improved RSC support
- Updated dependencies [18c670f]
- Updated dependencies [18c670f]
  - @saas-ui-pro/onboarding@0.13.0

## 0.24.3

### Patch Changes

- 94bac41: Updated to @saas-ui/react@2.0.5

## 0.24.2

### Patch Changes

- 4e958aa: Fix DataGrid striped variant name to be consistent with Chakra UI
- 4e958aa: Page settings variant header now supports nav and toolbar

## 0.24.1

### Patch Changes

- ef500b3: Updated dependencies

## 0.24.0

### Minor Changes

- 20103b7: Deprecated TenancyProvider and useTenant in favor of a user defined useWorkspace hook.

## 0.23.0

### Minor Changes

- cb6b80e: Updated Beacon default size to sm and colorScheme to primary.
- a3451a3: Fix issue where BulkActions would not align properly.
- ca33836: Update to Saas UI 2.0 🥳

### Patch Changes

- 807b4c8: Improve DataGrid types.
- Updated dependencies [ca33836]
  - @saas-ui-pro/onboarding@0.12.0

## 0.22.1

### Patch Changes

- 0230795: Fixed issue where single value filters would cause infinite loop.

## 0.22.0

### Minor Changes

- e8f1af1: Menu/MenuList now imported from Chakra UI.
- e8f1af1: Divider now imported from Chakra UI.
- 66d6cf0: Update to Chakra UI 2.7 and Saas UI 2.0.0-rc.31

### Patch Changes

- Updated dependencies [66d6cf0]
  - @saas-ui-pro/onboarding@0.11.0

## 0.21.4

### Patch Changes

- 02a387f: Page / PageContainer now support passing a ref

## 0.21.3

### Patch Changes

- 8c5f49d: Fixed checked styles for ToggleButton
- Bump version
- Updated dependencies
  - @saas-ui-pro/onboarding@0.10.2

## 0.21.2

### Patch Changes

- dfc2881: Fix issue where useColumnVisibility would not update

## 0.21.1

### Patch Changes

- 9a17b0f: Fix Stepper dot variant

## 0.21.0

### Minor Changes

- 9f3b135: Link no longer uses legacyBehavior

### Patch Changes

- 12ac18d: Fix issue where TenantProvider onChange handler would not update the internal context memo.
- 9f3b135: Fix default Section header spacing

## 0.20.2

### Patch Changes

- Bump version
- Updated dependencies
  - @saas-ui-pro/onboarding@0.10.1

## 0.20.1

### Patch Changes

- d6e513e: Added new default-sidebar variant to Page for sidebar layouts.

## 0.20.0

### Minor Changes

- 347eefb: SplitPage now accepts 2 children instead of composing the parent page using content
- 347eefb: Restructured Page component composition. PageHeader and PageBody should now defined as child components.
- 347eefb: BulkActions actions prop renamed to children.
- 58e1f6c: Improved Section composition, Section no longer accepts title and description, SectionHeading renamed to SectionTitle

### Patch Changes

- 347eefb: SplitPage now accepts orientation vertical/horizontal prop for vertical splits
- 95d9eba: Fix issue where DataGrid would throw an error when no visibleColumns are set.
- 347eefb: ResizeBox now supports onHandleClick property

## 0.19.0

### Minor Changes

- 24f7eee: Upgrade packages

### Patch Changes

- Updated dependencies [24f7eee]
  - @saas-ui-pro/onboarding@0.10.0

## 0.18.0

### Minor Changes

- fa9ed9f: Increased annotated section variant header spacing on large screens.
- fa9ed9f: Updated Page settings variant default width to container.xl
- 6ac2537: BulkActions now use floating banner variant by default.
- 1558662: Renamed @saas-ui/features to @saas-ui/feature-flags
- dbd06ff: MenuListFilter renamed to MenuInput
- dbd06ff: Renamed PageSidebar to Aside
- 6ac2537: FiltersMenu now accepts async items, allowing you to fetch filter items asynchronous

### Patch Changes

- 6ac2537: onBeforeEnableFilter no longer swallows thrown errors
- 6ac2537: ActiveFiltersList now accepts children
- 6ac2537: Added new ResetFilters button
- 6ac2537: useColumns now gives you a column helper (createColumnHelper) property for better typesafety
- dbd06ff: useResize now returns the current width
- 6ac2537: Added new floating banner variant.
- 6ac2537: DataGrid selected styles are now more subtle.
- 6ac2537: FiltersProvider can now be controlled using the activeFilters prop

## 0.17.1

### Patch Changes

- a0ec847: added more contrast to muted color in dark mode.
- Updated dependencies [446d598]
  - @saas-ui/onboarding@0.9.0

## 0.17.0

### Minor Changes

- 93fa5d0: Improved TimeLine composition and theme. TimeLine items now work properly on all background colors.

## 0.16.0

### Minor Changes

- 82c89a2: Allow to customize the DataGrid selection checkbox.

### Patch Changes

- 0a22b7c: DataGridCheckbox now inherits colorScheme from DataGrid.

## 0.15.2

### Patch Changes

- ef60b80: useSearchQuery can now be controlled.
- ef60b80: FilterMenu input can now be controlled and supports async loading of items.

## 0.15.1

### Patch Changes

- c5ab025: Update dependencies
- Updated dependencies [c5ab025]
  - @saas-ui/onboarding@0.8.1

## 0.15.0

### Minor Changes

- Fix build

### Patch Changes

- Updated dependencies
  - @saas-ui/onboarding@0.8.0
  - @saas-ui/router@0.8.0

## 0.14.1

### Patch Changes

- Fix bundle extensions.
- Updated dependencies
  - @saas-ui/onboarding@0.7.1
  - @saas-ui/router@0.7.1

## 0.14.0

### Minor Changes

- Upgrade to Chakra UI 2.4.8.

### Patch Changes

- Updated dependencies
  - @saas-ui/onboarding@0.7.0
  - @saas-ui/router@0.7.0

## 0.13.0

### Minor Changes

- 6fc0efb: Update secondary button variant, which is now a gray outline button.
- 6fc0efb: New segment variant for tabs.
- 336ae84: Add Node 18 engine support

### Patch Changes

- c057716: Fixed issue with ResizeBox where it would not render the handle in the correct position.
- addc03b: Add relative position to ResizeBox

## 0.12.2

### Patch Changes

- c0c8676: Fixed Beacon styles
- Updated dependencies [c0c8676]
  - @saas-ui/onboarding@0.6.2

## 0.12.1

### Patch Changes

- 84ee878: ToolbarButton no longer overrides variant to subtle for active items
- 6602816: Updated dependencies
- 2219d6b: Fixed color theme styles
- c35cd59: Improved MenuListFilter styles to allow for better theming.
- a5c4511: Added ghost variant definitions for button in the pro theme
- Updated dependencies [6602816]
  - @saas-ui/onboarding@0.6.1

## 0.12.0

### Minor Changes

- d1f3a55: Updated to Saas UI 1.7.0

### Patch Changes

- ea688e0: Add missing React import
- d1f3a55: Add onResize property to PageSidebar
- Updated dependencies [d1f3a55]
  - @saas-ui/onboarding@0.6.0
  - @saas-ui/router@0.6.0

## 0.11.2

### Patch Changes

- 8d58b10: Update dependencies

## 0.11.1

### Patch Changes

- Updated dependencies [237d2e9]
- Updated dependencies [325d285]
  - @saas-ui/onboarding@0.5.2
  - @saas-ui/router@0.5.0

## 0.11.0

### Minor Changes

- 04e2063: Updated to Chakra UI 2.3.6

## 0.10.3

### Patch Changes

- c187d47: Make sure filters always have a fallback operator

## 0.10.2

### Patch Changes

- 1772aac: Fixed issue where filters context would not update.

## 0.10.1

### Patch Changes

- f7b55ba: Updated dependencies

## 0.10.0

### Minor Changes

- bf9803c: Added new ToggleButtonGroup and ToggleButton component.
- 65099b0: BREAKING: Migrated to the new open source Sidebar component

Follow the instructions in the documentation to migrate your code.
https://saas-ui.dev/docs/components/layout/sidebar

New examples are available here:
https://github.com/saas-js/saas-ui-pro/blob/main/packages/app-features/core/components/sidebar/sidebar.tsx
https://github.com/saas-js/saas-ui/blob/main/packages/saas-ui-sidebar/stories/sidebar.stories.tsx

## 0.9.0

### Minor Changes

- a6f9696: Updated to @saas-ui/react 1.4.0

### Patch Changes

- 24bf362: Improved DataGrid row border styles in dark mode.
- 086a4bd: Added new stepper dot variant

## 0.8.0

### Minor Changes

- df67499: AppShell: removed hideSidebar property and add new aside prop. Default variant is now fullscreen.

### Patch Changes

- 2823bfd: Export PageSidebarContainerProps

## 0.7.1

### Patch Changes

- 2d4a637: Renamed ESM modules to .js to fix issues with Next.js
- Updated dependencies [2d4a637]
  - @saas-ui/onboarding@0.5.1
  - @saas-ui/router@0.4.1

## 0.7.0

### Minor Changes

- Updated exports definition to fix issues with Nextjs

### Patch Changes

- Updated dependencies
  - @saas-ui/onboarding@0.5.0
  - @saas-ui/router@0.4.0

## 0.6.2

### Patch Changes

- 1c6a1ec: Added supported node versions in package.json
- 5cb8bab: Toolbar variant and size can now be configured in the theme

## 0.6.1

### Patch Changes

- a017905: Improved package definition.
- Updated dependencies [a017905]
  - @saas-ui/onboarding@0.4.1
  - @saas-ui/router@0.3.1

## 0.6.0

### Minor Changes

- 3729178: DataGrid ref has been renamed to instanceRef, ref now references the container element.
- f7df7fc: Added new Timeline component.
- 736f5ab: BREAKING: Updated to React Table v8

  The v8 API has changed quite a bit, so we have to introduce some breaking changes.

  The column definitions.

  - new `useColumns` hook, thanks to @Bret12345.
  - isNumeric and href now need to be set in the new column meta object.
  - accessor renamed to accessorKey.
  - filter is now filterFn
  - Header and Cell are now lowercase, header and cell.
  - width is now size and only accept a number.

  ```
  const columns: ColumnDef<Contact>[] = [
    {
      id: 'name',
      accessorKey: 'fullName',
      header: 'Name',
      size: 300,
      meta: {
        href: ({ id }) => `/app/${tenant}/contacts/view/${id}`,
      },
    }
  ]
  ```

  - cell.value is now cell.getValue()

  ```
  const DateCell: DataGridCell<Contact> = ({ cell }) => {
    return <>{format(new Date(cell.getValue<string>()), 'PP')}</>
  }
  ```

  Updated table props

  - ref is now a ref to the container element, use `instanceRef` to get access to the React Table instance.
  - plugins no longer supported, you can use the new getXModel() API now.
  - initialState has an updated type signature.
  - new state property, that allows you to partially control the table state.

  More info: https://tanstack.com/table/v8/docs

- 04f84cb: TypeScript is now transpiled to cjs and mjs.

### Patch Changes

- ebda65c: updated dependencies
- 736f5ab: BulkActions actions now accepts a render prop that gives you access to the selections.
- 807f2a5: Moved Tooltip specific Command styles into Command theme.
- d6e068c: Date filters now support ISO strings and timestamps.
- 05437dd: Make sure sidebar doesn't animate on initial render
- 408143d: Using date-fns ESM module
- Updated dependencies [ebda65c]
- Updated dependencies [c5b38ef]
- Updated dependencies [04f84cb]
- Updated dependencies [c5b38ef]
- Updated dependencies [408143d]
  - @saas-ui/onboarding@0.4.0
  - @saas-ui/router@0.3.0

## 0.5.3

### Patch Changes

- bff7d3f: Fixed issue where DataGrid pagination wasn't working.
  - @saas-ui/onboarding@0.3.3

## 0.5.2

### Patch Changes

- 62964e3: Removed scrollbar styles because they are unreliable.
  - @saas-ui/onboarding@0.3.2

## 0.5.1

### Patch Changes

- 12c3643: Fixed SidebarGroupTitle styles.
- 005eea5: Updated dependencies
- b8a65b1: Improved theme tokens, added 'sidebar-on' token.
  - @saas-ui/onboarding@0.3.1

## 0.5.0

### Minor Changes

- 28faa7a: Updated to Chakra UI 2.2.1
- c1d4765: BREAKING: Updated to Chakra UI 2.1
- c1d4765: BREAKING: React 18 support.

### Patch Changes

- 15dd8a7: PageBody now accepts style props.
- f172105: Updated dependencies
- c19d21e: BREAKING: SectionHeading no longer accepts title and description props, use SectionTitle and SectionDescription composition instead.
- f1c8fbc: Updated PageSidebar to use new resizer api.
- 9881094: Beacon now supports colorScheme.
- fd61365: Fix MenuListFilter focus color.
- 4d2ce96: useResize position renamed to handlePosition.
- fd61365: New FiltersAddButton to be used in combination with FiltersProvider.
- 9881094: Beacon now supports sm, md and lg sizes
- c19d21e: Move Section title and description to separate components.
- 15dd8a7: Disabled border on last Td in the DataGrid tbody.
- 77179dd: Pro package now re-exports all onboarding components.
- c19d21e: Added classnames to Section components.
- 5fb9268: "or" in a Command will now be rendered as regular text.
- 59bf0ae: New DataGridCell type for custom grid cells.
- 49a15d7: FiltersProvider now accepts defaultFilters
- 4e38347: Added new ResizeBox component that implements useResize and ResizeHandle.
- 15dd8a7: PageBody now accepts contentProps property this is passed down to the content wrapper.
- 4d2ce96: Sidebar isResizable is now false by default.
- 5971538: Fixed dependency issue.
- 7bff4f4: Fixed vertical scrollbar height and corner color.
- Updated dependencies [f172105]
- Updated dependencies [28faa7a]
- Updated dependencies [9e2ca35]
- Updated dependencies [9881094]
- Updated dependencies [9881094]
- Updated dependencies [57942f7]
- Updated dependencies [c1d4765]
- Updated dependencies [c1d4765]
- Updated dependencies [9881094]
  - @saas-ui/onboarding@0.3.0
  - @saas-ui/router@0.2.0

## 0.4.2

### Patch Changes

- 3550e80: Scrollbars now match the app theme.
- 27bd254: Added @chakra-ui/react-utils to dependencies.
- 3550e80: Improved theme tokens that allows you to easily create new color schemes.
- 3550e80: Improved gray outline button border color.

## 0.4.1

### Patch Changes

- 814da03: Improved annotated section styles on small screens.
- 051967b: DataGrid now overflows correctly on small screens.
- 5993ce1: Increased Sidebar default width on small screens.
- 814da03: Improved Page settings variant styles on small screens.
- 1a812c9: PageHeader tabbar now renders in a separate div.
- 4486d93: Fixed SidebarToggleButton not rendering correctly on small screens.
- cbc9532: Toolbar is now rendered as a ButtonGroup instead of having the ButtonGroup as a child.
- 342ceb1: Added minimal width to AppShell flex boxes to make sure children get sized correctly on smaller screens.
- 516976f: SplitPage is now responsive.

## 0.4.0

### Minor Changes

- d16d663: Updated SidebarLink icon sizes to be consistant with Chakra UI buttons.

### Patch Changes

- d16d663: DEPRECATED: SidebarMenu will be removed from 0.5.x onwards, as it's redundant and missing important features, use Menu instead.
- 1d7b35f: PageSidebar now accepts isResizable and isOpen properties, making is resizable/collapsible.
- 5c3e69c: Changed SidebarLink classname prefix to 'saas'
- 1d7b35f: useResize now supports resizing right aligned elements.
- Updated dependencies [c502085]
  - @saas-ui/router@0.1.4

## 0.3.17

### Patch Changes

- d50c603: Added proper zIndex value to BulkActions.
- ab9d51e: Now exporting the NoResults component from DataGrid.
- 7ca6e30: useSearchQuery now accepts a default value and items are optional.
- ab9d51e: Added inline search (globalFilter) functionality to ListPage.
- 165f41c: DataGrid columns no longer shift width on filtering.
- e24c5a6: Added @types/react-table as dev dependency.
- Updated dependencies [165f41c]
  - @saas-ui/router@0.1.3

## 0.3.16

### Patch Changes

- Only publish source files.
- Updated dependencies
  - @saas-ui/router@0.1.2

## 0.3.15

### Patch Changes

- a852a8c: SidebarLink now renders data-active attribute when isActive is true.
- 632db56: Importing dependencies directly from @saas-ui/react to make sure there aren't any version mismatches.

## 0.3.14

### Patch Changes

- 335b13b: Moved useActivePath to @saas-ui/router.
- Updated dependencies [335b13b]
  - @saas-ui/router@0.1.1

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
