/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  eslint: {
    ignoreDuringBuilds: true, // ⚠️ Desactiva ESLint en la compilación
  },
};

export default nextConfig;
