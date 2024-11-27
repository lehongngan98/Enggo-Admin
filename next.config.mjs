/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // Tên miền từ Cloudinary
      },
      {
        protocol: "https",
        hostname: "image-enggo.s3.ap-southeast-1.amazonaws.com", // Thêm tên miền của bạn ở đây
      },
    ],
  },
};

export default nextConfig;
