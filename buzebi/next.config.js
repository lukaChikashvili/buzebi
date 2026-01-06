/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
      turbo: false
    },
  
    webpack(config) {
      config.module.rules.push({
        test: /\.(glsl|vs|fs|vert|frag)$/,
        use: 'raw-loader'
      })
      return config
    }
  }
  
  module.exports = nextConfig