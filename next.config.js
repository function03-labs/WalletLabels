/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pbs.twimg.com",
        port: "",
        pathname: "/profile_images/**",
      },
      {
        protocol: "https",
        hostname: "abs.twimg.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "cryptologos.cc",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.jakerunzer.com",
        port: "",
        pathname: "/**",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/ethereum/:slug",
        destination: "https://api-c.walletlabels.xyz/ethereum/:slug",
        has: [
          {
            type: "header",
            key: "x-api-key",
          },
        ],
      },
      {
        source: "/api/optimism/:slug",
        destination: "https://api-c.walletlabels.xyz/optimism/:slug",
        has: [
          {
            type: "header",
            key: "x-api-key",
          },
        ],
      },
      {
        source: "/api/arbitrum/:slug",
        destination: "https://api-c.walletlabels.xyz/arbitrum/:slug",
        has: [
          {
            type: "header",
            key: "x-api-key",
          },
        ],
      },
      {
        source: "/api/solana/:slug",
        destination: "https://api-c.walletlabels.xyz/solana/:slug",
        has: [
          {
            type: "header",
            key: "x-api-key",
          },
        ],
      },
    ];
  },
};
