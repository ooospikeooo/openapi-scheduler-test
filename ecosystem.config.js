require('dotenv').config({ path: require("path").join(__dirname, `./dist/env/.env.${process.env.BUILDENV}`)});

module.exports = {
  apps : [{
    name   : "app",
    script : "./dist/src/app.js",
    env: {
      NODE_ENV: "development"
    },
    env_production : {
       NODE_ENV: "production"
    },
    out_file: `${process.env.LOGDIR}/out.log`,
    error_file: `${process.env.LOGDIR}/error.log`,
    // out_file: `logs/out.log`,
    // error_file: `logs/error.log`,
    time: true,
    log_date_format : "YYY-MM-DD HH:mm Z",
    log_type: "json"
  }]
}
