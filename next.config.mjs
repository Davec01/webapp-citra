/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',  // Aplica a todas las rutas
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*',  // Permitir todos los dominios (ajústalo si es necesario)
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET, POST, PUT, DELETE, OPTIONS',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-Requested-With, Content-Type, Authorization',
          },
        ],
      },
    ]
  },
};

export default nextConfig;
