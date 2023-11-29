/** @type {import('next-sitemap').IConfig} */
module.exports = {
    siteUrl: process.env.SITE_URL || 'https://walletlabels.xyz',
    generateRobotsTxt: true, // (optional)
    sitemapSize: 7000,

    // ...other options
  }