/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true, // Cloud Run no necesita optimización de imágenes
  },
  output: "standalone", // ⚠️ Importante: Esto permite ejecutar Next.js como servidor en Cloud Run
};

export default nextConfig;
