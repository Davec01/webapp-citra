/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  trailingSlash: true, // Mantener si es necesario
  images: {
    unoptimized: true, // Desactiva optimización de imágenes
  },
};

export default nextConfig;
