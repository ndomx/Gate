/** @type {import('next').NextConfig} */
const nextConfig = {
  redirects: async () => [
    {
      source: "/",
      destination: "/gates",
      permanent: true,
    },
  ],
};

export default nextConfig;
