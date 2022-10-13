# @app/features

## 0.12.0

### Minor Changes

- 67d872d: Removed direct dependency to react-hook-form

## 0.11.1

### Patch Changes

- f7b55ba: Updated dependencies
- Updated dependencies [f7b55ba]
  - @app/config@0.1.2
  - @app/i18n@0.1.3
  - @saas-ui/billing@0.6.2
  - @saas-ui/charts@0.3.2
  - @saas-ui/date-picker@0.4.2
  - @saas-ui/pro@0.10.1

## 0.11.0

### Minor Changes

- de52953: Updated to @tanstack/react-query v4
- c76ba03: New view options on the Contacts list page.
- 65099b0: BREAKING: Migrated to the new open source Sidebar component

### Patch Changes

- 3912ec2: Added keyboard shortcut to focus inline search.
- Updated dependencies [bf9803c]
- Updated dependencies [65099b0]
  - @saas-ui/pro@0.10.0

## 0.10.2

### Patch Changes

- Updated dependencies
  - @saas-ui/billing@0.6.1

## 0.10.1

### Patch Changes

- Updated dependencies [c30c993]
  - @saas-ui/billing@0.6.0

## 0.10.0

### Minor Changes

- a6f9696: Updated to @saas-ui/react 1.4.0
- 086a4bd: New onboarding flow

### Patch Changes

- Updated dependencies [a6f9696]
- Updated dependencies [24bf362]
- Updated dependencies [086a4bd]
  - @saas-ui/pro@0.9.0

## 0.9.0

### Minor Changes

- 3fb85dc: Renamed app package to @app/features

### Patch Changes

- Updated dependencies [2823bfd]
- Updated dependencies [df67499]
  - @saas-ui/pro@0.8.0

## 0.8.1

### Patch Changes

- Updated dependencies [2d4a637]
  - @saas-ui/billing@0.5.1
  - @saas-ui/charts@0.3.1
  - @saas-ui/date-picker@0.4.1
  - @saas-ui/features@0.6.1
  - @saas-ui/onboarding@0.5.1
  - @saas-ui/pro@0.7.1
  - @saas-ui/router@0.4.1

## 0.8.0

### Patch Changes

- Updated dependencies
  - @saas-ui/billing@0.5.0
  - @saas-ui/charts@0.3.0
  - @saas-ui/date-picker@0.4.0
  - @saas-ui/features@0.6.0
  - @saas-ui/onboarding@0.5.0
  - @saas-ui/pro@0.7.0
  - @saas-ui/router@0.4.0

## 0.7.2

### Patch Changes

- Updated dependencies [1c6a1ec]
- Updated dependencies [5cb8bab]
  - @saas-ui/pro@0.6.2

## 0.7.1

### Patch Changes

- Updated dependencies [a017905]
  - @saas-ui/billing@0.4.1
  - @saas-ui/charts@0.2.1
  - @saas-ui/date-picker@0.3.1
  - @saas-ui/features@0.5.1
  - @saas-ui/onboarding@0.4.1
  - @saas-ui/pro@0.6.1
  - @saas-ui/router@0.3.1

## 0.7.0

### Minor Changes

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

- 736f5ab: ListPage selections now include row ids instead of index.

### Patch Changes

- 408143d: Using date-fns ESM module
- Updated dependencies [ebda65c]
- Updated dependencies [3729178]
- Updated dependencies [f7df7fc]
- Updated dependencies [c5b38ef]
- Updated dependencies [736f5ab]
- Updated dependencies [736f5ab]
- Updated dependencies [3e47630]
- Updated dependencies [04f84cb]
- Updated dependencies [c5b38ef]
- Updated dependencies [807f2a5]
- Updated dependencies [d6e068c]
- Updated dependencies [05437dd]
- Updated dependencies [408143d]
  - @app/i18n@0.1.2
  - @saas-ui/billing@0.4.0
  - @saas-ui/date-picker@0.3.0
  - @saas-ui/onboarding@0.4.0
  - @saas-ui/pro@0.6.0
  - @saas-ui/charts@0.2.0
  - @saas-ui/features@0.5.0
  - @saas-ui/router@0.3.0

## 0.6.4

### Patch Changes

- Updated dependencies [bff7d3f]
  - @saas-ui/pro@0.5.3
  - @saas-ui/onboarding@0.3.3

## 0.6.3

### Patch Changes

- Updated dependencies [df69c2e]
  - @saas-ui/date-picker@0.2.1

## 0.6.2

### Patch Changes

- Updated dependencies [62964e3]
  - @saas-ui/pro@0.5.2
  - @saas-ui/onboarding@0.3.2

## 0.6.1

### Patch Changes

- b8a65b1: Fixed GlobalSearch hover border color.
- 005eea5: Fixed TenantMenu and UserMenu zIndex on small screens.
- 005eea5: Updated dependencies
- 005eea5: Added new SaasUI logo.
- Updated dependencies [12c3643]
- Updated dependencies [005eea5]
- Updated dependencies [b8a65b1]
  - @saas-ui/pro@0.5.1
  - @app/config@0.1.1
  - @app/i18n@0.1.1
  - @saas-ui/charts@0.1.1
  - @saas-ui/onboarding@0.3.1

## 0.6.0

### Minor Changes

- 28faa7a: Updated to Chakra UI 2.2.1
- c1d4765: BREAKING: Updated to Chakra UI 2.1
- c1d4765: BREAKING: React 18 support.

### Patch Changes

- f172105: Updated dependencies
- 0b1ae8e: Updated to @saas-ui/react@1.0.0-rc.14
- 15dd8a7: Restructred the metrics, added Churn and progress bars in the country breakdown.
- 59bf0ae: New DataGridCell type for custom grid cells.
- 7e9db6a: Settings Sidebar now positioned correctly in Electron
- Updated dependencies [15dd8a7]
- Updated dependencies [f172105]
- Updated dependencies [28faa7a]
- Updated dependencies [9e2ca35]
- Updated dependencies [c19d21e]
- Updated dependencies [f1c8fbc]
- Updated dependencies [9881094]
- Updated dependencies [fd61365]
- Updated dependencies [4d2ce96]
- Updated dependencies [15dd8a7]
- Updated dependencies [fd61365]
- Updated dependencies [9881094]
- Updated dependencies [c19d21e]
- Updated dependencies [15dd8a7]
- Updated dependencies [57942f7]
- Updated dependencies [77179dd]
- Updated dependencies [c1d4765]
- Updated dependencies [c19d21e]
- Updated dependencies [5fb9268]
- Updated dependencies [0e6c871]
- Updated dependencies [59bf0ae]
- Updated dependencies [49a15d7]
- Updated dependencies [4e38347]
- Updated dependencies [15dd8a7]
- Updated dependencies [4d2ce96]
- Updated dependencies [15dd8a7]
- Updated dependencies [c1d4765]
- Updated dependencies [5971538]
- Updated dependencies [0e6c871]
- Updated dependencies [7bff4f4]
- Updated dependencies [9881094]
  - @saas-ui/pro@0.5.0
  - @app/config@0.1.0
  - @app/i18n@0.1.0
  - @saas-ui/billing@0.3.0
  - @saas-ui/charts@0.1.0
  - @saas-ui/date-picker@0.2.0
  - @saas-ui/features@0.4.0
  - @saas-ui/onboarding@0.3.0
  - @saas-ui/router@0.2.0

## 0.5.2

### Patch Changes

- 3550e80: Moved sidebar search input to new GlobalSearch component.
- 3550e80: Moved sidebar sub components into separate folders.
- Updated dependencies [3550e80]
- Updated dependencies [27bd254]
- Updated dependencies [3550e80]
- Updated dependencies [3550e80]
  - @saas-ui/pro@0.4.2

## 0.5.1

### Patch Changes

- 22cb4f6: ListPage is now fully responsive.
- 814da03: Settings pages are now fully responsive.
- 516976f: SplitPage is now responsive.
- Updated dependencies [814da03]
- Updated dependencies [051967b]
- Updated dependencies [5993ce1]
- Updated dependencies [814da03]
- Updated dependencies [1a812c9]
- Updated dependencies [4486d93]
- Updated dependencies [cbc9532]
- Updated dependencies [342ceb1]
- Updated dependencies [516976f]
  - @saas-ui/pro@0.4.1
  - @ui/core@0.0.27
  - @app/config@0.0.18

## 0.5.0

### Minor Changes

- d16d663: Added React icons Context and changed the default icon size to scale better with the Chakra UI theme.

### Patch Changes

- 1d7b35f: Added new Breadcrumbs component.
- d16d663: TenantMenu and UserMenu no longer using SidebarMenu
- d16d663: DEPRECATED: SidebarMenu will be removed from 0.5.x onwards, as it's redundant and missing important features, use Menu instead.
- d28ed12: Fixed implicited any index errors.
- c8ac3a3: Added hotkey "/" that focuses the main search.
- 1d7b35f: Sidebar on the contacts view page is now collapsible.
- c8ac3a3: New SearchInput wrapper with Feather icons to make all search inputs consistent thoughout the app.
- d36458b: Removed dependencies on next/router.
- f14e689: Render Saas UI logo correctly in dark mode.
- Updated dependencies [d16d663]
- Updated dependencies [c502085]
- Updated dependencies [c8ac3a3]
- Updated dependencies [1d7b35f]
- Updated dependencies [5c3e69c]
- Updated dependencies [d16d663]
- Updated dependencies [1d7b35f]
  - @saas-ui/pro@0.4.0
  - @saas-ui/router@0.1.4
  - @app/config@0.0.17
  - @ui/core@0.0.26

## 0.4.6

### Patch Changes

- ab9d51e: Added inline search (globalFilter) functionality to ListPage.
- 165f41c: Added segmented controls to contacts overview.
- Updated dependencies [d50c603]
- Updated dependencies [165f41c]
- Updated dependencies [ab9d51e]
- Updated dependencies [7ca6e30]
- Updated dependencies [ab9d51e]
- Updated dependencies [165f41c]
- Updated dependencies [e24c5a6]
  - @saas-ui/pro@0.3.17
  - @saas-ui/router@0.1.3
  - @ui/core@0.0.25
  - @app/config@0.0.16

## 0.4.5

### Patch Changes

- Updated dependencies
  - @saas-ui/billing@0.2.1
  - @saas-ui/charts@0.0.2
  - @saas-ui/date-picker@0.1.4
  - @saas-ui/features@0.3.1
  - @saas-ui/onboarding@0.2.2
  - @saas-ui/pro@0.3.16
  - @saas-ui/router@0.1.2
  - @ui/core@0.0.24
  - @app/config@0.0.15

## 0.4.4

### Patch Changes

- Updated dependencies [a852a8c]
- Updated dependencies [632db56]
  - @saas-ui/pro@0.3.15
  - @ui/core@0.0.23
  - @app/config@0.0.14

## 0.4.3

### Patch Changes

- Updated dependencies [aa785af]
- Updated dependencies [335b13b]
  - @saas-ui/date-picker@0.1.3
  - @saas-ui/pro@0.3.14
  - @saas-ui/router@0.1.1
  - @ui/core@0.0.22
  - @app/config@0.0.13

## 0.4.2

### Patch Changes

- Updated dependencies [821fb61]
  - @saas-ui/pro@0.3.13
  - @ui/core@0.0.21
  - @app/config@0.0.12

## 0.4.1

### Patch Changes

- Updated dependencies [3dd0eed]
- Updated dependencies [6657bdd]
  - @saas-ui/pro@0.3.12
  - @ui/core@0.0.20
  - @app/config@0.0.11

## 0.4.0

### Patch Changes

- Updated dependencies [18fe98b]
  - @saas-ui/features@0.3.0

## 0.3.1

### Minor Changes

- New Paddle integration and checkout page.

## 0.3.0

### Minor Changes

- e01ca96: Added new BillingProvider to handle billing subscriptions.
- e80e0c2: New useLocation hook that can be used to get the current pathname.
- e80e0c2: Moved AppLayout out of AppProvider, should be included manually in your app root now.

### Patch Changes

- d1ef2d5: TenantMenu now correctly sets slug instead of id on change.
- 6a892ce: Added new usePath hook
- ed7ddea: Added avatar to currentUser mock data.
- b5f9eac: Added FeaturesProvider to AppProvider to enable features flags.
- c3b91e4: New Button wrapper component that supports href.
- Updated dependencies [a49e48c]
- Updated dependencies [8873747]
- Updated dependencies [412d774]
- Updated dependencies [370e2be]
- Updated dependencies [717f3a9]
- Updated dependencies [e01ca96]
- Updated dependencies [e80e0c2]
  - @saas-ui/features@0.2.1
  - @app/config@0.0.10
  - @app/i18n@null
  - @saas-ui/pro@0.3.11
  - @saas-ui/billing@0.2.0
  - @saas-ui/router@0.1.0
  - @ui/core@0.0.19

## 0.2.0

### Minor Changes

- 5fbf9ae: Now using MSW to mock api requests

## 0.2.4

### Patch Changes

- Updated dependencies [f96b1e1]
- Updated dependencies [446c114]
- Updated dependencies [ebd6a26]
- Updated dependencies [ebd6a26]
- Updated dependencies [ebd6a26]
- Updated dependencies [0ddbf5c]
  - @saas-ui/pro@0.3.10
  - @ui/core@0.0.18
  - @app/config@0.0.9

## 0.2.3

### Patch Changes

- Updated dependencies [1f12e2d]
- Updated dependencies [b61928d]
- Updated dependencies [7d3e2b0]
- Updated dependencies [b3a90d0]
- Updated dependencies [8fdb19a]
  - @saas-ui/pro@0.3.9
  - @ui/core@0.0.17
  - @app/config@0.0.8

## 0.2.2

### Patch Changes

- 0e27926: Added hotkey navigation to sidebar navigation.

## 0.2.1

### Patch Changes

- Updated dependencies [3b14bcf]
  - @saas-ui/onboarding@0.2.1

## 0.2.0

### Patch Changes

- Updated dependencies [7a6413b]
- Updated dependencies [fc48900]
- Updated dependencies [09d4444]
- Updated dependencies [a44ee13]
- Updated dependencies [8cfcd9e]
  - @saas-ui/onboarding@0.2.0
  - @ui/core@0.0.16
  - @saas-ui/pro@0.3.8
  - @app/config@0.0.7

## 0.1.9

### Patch Changes

- Updated dependencies
  - @saas-ui/pro@0.3.7
  - @ui/core@0.0.15
  - @app/config@0.0.6

## 0.1.8

### Patch Changes

- Updated dependencies [baed105]
  - @saas-ui/pro@0.3.6
  - @ui/core@0.0.14
  - @app/config@0.0.5

## 0.1.7

### Patch Changes

- Updated dependencies [ce05aae]
- Updated dependencies [ebfa994]
- Updated dependencies [ebfa994]
  - @saas-ui/date-picker@0.1.2
  - @saas-ui/pro@0.3.5
  - @ui/core@0.0.13
  - @app/config@0.0.4

## 0.1.6

### Patch Changes

- Updated dependencies
  - @saas-ui/date-picker@0.1.1

## 0.1.5

### Patch Changes

- Updated dependencies [ae2083f]
- Updated dependencies [ae2083f]
  - @saas-ui/pro@0.3.4
  - @ui/core@0.0.12
  - @app/config@0.0.3

## 0.1.4

### Patch Changes

- Updated dependencies
  - @ui/core@0.0.11
  - @app/config@0.0.2

## 0.1.3

### Patch Changes

- Updated dependencies
  - @saas-ui/pro@0.3.3
  - @ui/core@0.0.10
  - @app/config@0.0.1

## 0.1.2

### Patch Changes

- Updated dependencies [948e812]
- Updated dependencies [eb1073b]
- Updated dependencies [3833c56]
- Updated dependencies [8709e3a]
- Updated dependencies [a51f156]
  - @saas-ui/pro@0.3.2
  - @ui/core@0.0.9
  - @app/config@null

## 0.1.1

### Patch Changes

- Updated dependencies [c516bcb]
- Updated dependencies [c516bcb]
  - @saas-ui/pro@0.3.1
  - @ui/core@0.0.8
  - @app/config@null

## 0.1.0

### Patch Changes

- Updated dependencies [3b8a68a]
- Updated dependencies [197c626]
- Updated dependencies [1103d79]
- Updated dependencies [44c5397]
- Updated dependencies [93f54b6]
- Updated dependencies [7abed42]
- Updated dependencies [3b8a68a]
  - @saas-ui/pro@0.3.0
  - @ui/core@0.0.7
  - @app/config@null

## 0.0.6

### Patch Changes

- Updated dependencies
  - @saas-ui/pro@0.2.6
  - @ui/core@0.0.6
  - @app/config@null

## 0.0.5

### Patch Changes

- Updated dependencies
  - @saas-ui/pro@0.2.5
  - @ui/core@0.0.5
  - @app/config@null

## 0.0.4

### Patch Changes

- Updated dependencies
- Updated dependencies [42f165c]
  - @saas-ui/pro@0.2.4
  - @ui/core@0.0.4
  - @app/config@null

## 0.0.3

### Patch Changes

- Updated dependencies [c42cd5d]
  - @saas-ui/pro@0.2.3
  - @ui/core@0.0.3
  - @app/config@null

## 0.0.2

### Patch Changes

- Updated dependencies [be3eab9]
- Updated dependencies [5787f35]
- Updated dependencies [51b3e22]
- Updated dependencies [4eb7b3f]
- Updated dependencies [be3eab9]
  - @saas-ui/pro@0.2.2
  - @ui/core@0.0.2
  - @app/config@null

## 0.0.1

### Patch Changes

- 6d0b31f: Removed @chakra-ui/icons dependency
- Updated dependencies [3583ef8]
- Updated dependencies [6d0b31f]
- Updated dependencies [bfcc252]
  - @saas-ui/pro@0.2.1
  - @ui/core@0.0.1
  - @app/config@null
