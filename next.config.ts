// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: false, // Keep this for now to avoid double-auth issues
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true,
//   },

//   // async redirects() {
//   //   return [
//   //     {
//   //       source: '/',
//   //       destination: '/shop',
//   //       permanent: true,
//   //       // [!code ++] EXCLUDE the callback path from this rule
//   //       missing: [
//   //         {
//   //           type: 'header',
//   //           key: 'referer',
//   //           value: '.*auth-callback.*', 
//   //         }
//   //       ]
//   //     },
//   //   ]
//   // },
// };

// export default nextConfig;
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   reactStrictMode: false,
//   // Redirects block removed to allow Home Page to load
// };

// export default nextConfig;
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // The redirects block has been removed to stop the forced redirection to /shop
};

export default nextConfig;