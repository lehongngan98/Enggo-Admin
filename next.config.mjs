/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['res.cloudinary.com']
    },
    experimental: {
        runtime: 'edge',
        serverActions: true,
    },
};

export default nextConfig;