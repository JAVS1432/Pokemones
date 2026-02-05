import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.dog.ceo', // El dominio de tu imagen
        port: '',
        pathname: '/breeds/**', // Permite todas las rutas dentro de ese dominio
      },
    ],
  },
};

export default nextConfig;
