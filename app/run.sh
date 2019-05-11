#!/bin/bash
cd /usr/src
apt-get update
apt-get install -y texlive-full
npm run build
npm start
