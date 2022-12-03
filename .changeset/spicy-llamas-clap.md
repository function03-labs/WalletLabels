---
'desktop': minor
'web': minor
---

Upgraded to Next.js 13

## Breaking changes

After upgrading you may need to add `legacyBehavior` to the Next Link component, since Saas UI wraps links and the new version of Next.js now renders an anchor tag itself.

```ts
const NextLink = (props: LinkProps) => <Link {...props} legacyBehavior/>

<SaasProvider linkComponent={NextLink}>...</SaasProvider>
```
