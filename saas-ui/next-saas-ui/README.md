# Next.js Saas UI Plugin

This plugin makes sure Saas UI Pro packages are transpiled correctly.

## Install

```sh
yarn add @saas-ui/next-saas-ui
```

## Usage

Edit your `next.config.js` file

```js next.config.js
const withSaasUI = require('@saas-ui/next-saas-ui')

module.exports = withSaasUI({
  // your next config
})
```
