module.exports = {
  apps : [{
    name   : "app",
    script : "./public/src/app.js",
    env: {
      NODE_ENV: "development"
    },
    env_production : {
       NODE_ENV: "production"
    },
    out_file: "/dev/null",
    error_file: "/dev/null"
  }]
}
