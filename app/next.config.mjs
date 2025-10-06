/** @type {import('next').NextConfig} */
const nextConfig = {
    images : {
        remotePatterns : [
            {
                protocol: 'https',
                hostname : 'cdn.dummyjson.com',
                port : '',
                pathname: '/**'
            },
            {
                protocol: 'https',
                hostname : 'www.aputf.org',
                port : '',
                pathname: '/**'
            }

        ]
    }
};

export default nextConfig;
