module.exports = {
  apps: [{
    name: "PROYECO API",
    script: "./dist/src/index.js",
    instances: "max",
    exec_mode: "cluster",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    },
  }],

};
