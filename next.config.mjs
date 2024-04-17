/** @type {import('next').NextConfig} */
const nextConfig = {
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
};

export default nextConfig;
