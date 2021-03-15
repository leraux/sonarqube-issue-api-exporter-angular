const PROXY_CONFIG = [
      {
        context: [
          "/api/"
        ],
        target: "http://localhost:9000/",
        changeOrigin: true,
        secure: false
      }
    ];

    module.exports = PROXY_CONFIG;