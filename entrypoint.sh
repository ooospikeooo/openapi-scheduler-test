#!/bin/sh
ls -al
echo 
echo "BUILDENV: ${BUILDENV}"
echo "WORKDIR: ${WORKDIR}"
npm run prod.pm2.runtime
