

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "Referrer-Policy",
    value: "same-origin",
  },
  {
    key: "Permissions-Policy",
    value:
      "accelerometer=(self), camera=(self), geolocation=(self), microphone=(self)",
  },

];

const mediaSecurityHeaders = [
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin"
  },
  {
    key: "Cross-Origin-Embedder-Policy",
    value: "require-corp"
  }
]

const nextConfig = {
  experimental: {
    appDir: true,
    serverActions: true,
   // nextScriptWorkers: true,
  },
  images: {
    remotePatterns: [
      {
        protocol:'https',
        hostname: 'cdn.sanity.io'
      }
    ],
    domains: ["cdn.sanity.io"],
    loader: "custom",
    loaderFile: "./lib/providers/sanity/imageLoader.tsx",
  },
  reactStrictMode: true,
  webpack: config => {
    /* On `node-fetch` v2, that `supabase-js` uses,
    `encoding` package was optionally required for `.textConverted`
    which means it wasn't in `node-fetch` deps.
    See: https://github.com/node-fetch/node-fetch/issues/412.
    Since `encoding` is not part of the deps by default, when using with webpack,
    it will raise a warning message.
    This can be ignored as it doesn't prevent anything to work well. */
    config.ignoreWarnings = [
      { module: /node_modules\/node-fetch\/lib\/index\.js/ },
      { file: /node_modules\/node-fetch\/lib\/index\.js/ },
      { module: /node_modules\/@walletconnect\/keyvaluestorage\/dist\/cjs\/node-js\/db.js/ },
      { file: /node_modules\/@walletconnect\/keyvaluestorage\/dist\/cjs\/node-js\/db.js/ },
      { module: /node_modules\/@walletconnect\/keyvaluestorage\/dist\/cjs\/node-js\/index.js/ },
      { file: /node_modules\/@walletconnect\/keyvaluestorage\/dist\/cjs\/node-js\/index.js/ },
      { module: /node_modules\/@walletconnect\/keyvaluestorage\/dist\/cjs\/index.js/ },
      { file: /node_modules\/@walletconnect\/keyvaluestorage\/dist\/cjs\/index.js/ },
      { module: /node_modules\/@walletconnect\/core\/dist\/index.cjs.js/ },
      { file: /node_modules\/@walletconnect\/core\/dist\/index.cjs.js/ },
      { module: /node_modules\/@thirdweb-dev\/wallets\/dist\/thirdweb-dev-wallets.esm.js/ },
      { file: /node_modules\/@thirdweb-dev\/wallets\/dist\/thirdweb-dev-wallets.esm.js/ },
      { module: /node_modules\/@thirdweb-dev\/react\/dist\/thirdweb-dev-react.esm.js/ },
      { file: /node_modules\/@thirdweb-dev\/react\/dist\/thirdweb-dev-react.esm.js/ },
      { file: /node_modules\/pino\/lib\/tools.js/ },
      { module: /node_modules\/pino\/pino.js/ }
    ];
  
    return config;
  },
    async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
      {
        source: "/(https://cdn.sanity.io|https://unpkg.com/@ffmpeg/core@0.12.2/dist/umd|https://unpkg.com)",
        headers: mediaSecurityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
