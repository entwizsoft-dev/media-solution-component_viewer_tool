//next
const {
    NextConfig
} = require("next");

/** @type {NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: [
            "d21ageesh0dquz.cloudfront.net",
            "d1dys2c3ny0p8.cloudfront.net"
        ]
    }
}

module.exports = nextConfig
