/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'my-product-store-bucket2.s3.ap-south-1.amazonaws.com',
      "my-product-store-bucket-dev.s3.ap-south-1.amazonaws.com"
    ],
  },
}

module.exports = nextConfig