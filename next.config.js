//next
const {
    NextConfig
} = require("next");

/** @type {NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    async rewrites() {
        return {
            fallback: [
                {
                    source: "/admin/:path*",
                    destination: process.env.NEXT_PUBLIC_API_URL + "/admin/:path*",
                },
                {
                    source: "/template/:path*",
                    destination: process.env.NEXT_PUBLIC_API_URL + "/template/:path*",
                },
                {
                    source: "/collection/:path*",
                    destination: process.env.NEXT_PUBLIC_API_URL + "/collection/:path*",
                },
                {
                    source: "/config/:path*",
                    destination: process.env.NEXT_PUBLIC_API_URL + "/config/:path*",
                },
            ]
        }
    },
    images: {
        domains: [
            "d21ageesh0dquz.cloudfront.net",
            "d1dys2c3ny0p8.cloudfront.net"
        ]
    }
}

module.exports = nextConfig
