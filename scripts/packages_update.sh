#!/bin/bash

# delete node_modules on linux
rm -rf ./node_modules ./yarn.lock ./packages/*/node_modules 
# install again
lerna exec -- yarn install
lerna bootstrap
# build a server bundle
lerna run build --stream --scope pm2graphql