// Bundle analyzer
const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer({
    reactStrictMode: true,

    images: {
        domains: [
            "tektree-aws-s3.s3.eu-north-1.amazonaws.com",
            "lh3.googleusercontent.com",
        ],
        formats: ["image/avif", "image/webp"],
    },

    env: {
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    },
});
