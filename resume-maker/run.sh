#!/bin/bash
cd /usr/src/app
apt-get update
apt-get install -y texlive-full
npm run build
npm start
