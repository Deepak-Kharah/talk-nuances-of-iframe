/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      {
        source: "/history",
        destination: "/history/0",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
