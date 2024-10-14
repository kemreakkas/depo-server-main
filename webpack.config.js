const path = require('path');

module.exports = {
    // diğer ayarlar
    resolve: {
        fallback: {
            "url": require.resolve("url/"),
            "path": require.resolve("path-browserify"),
            "fs": require.resolve("browserify-fs"),
            "stream": require.resolve("stream-browserify"),
            "util": require.resolve("util/"),
            "querystring": require.resolve("querystring-es3"),
            "string_decoder": require.resolve("string_decoder/"),
            "buffer": require.resolve("buffer/"),
            "zlib": require.resolve("browserify-zlib"),
            "crypto": require.resolve("crypto-browserify"),
            "assert": require.resolve("assert/"),
            "http": require.resolve("stream-http"),
            "net": require.resolve("net-browserify")
        }
    },
    output: {
        path: path.resolve(__dirname, 'public'),
        filename: 'bundle.js',
    },
    entry: './api/index.js',
};
