#!/bin/bash
cd vue
yarn build
cp dist/assets/index*.js dist/ha-lcars-panel.js
cp dist/assets/index*.css dist/ha-lcars-panel.css
cd ..
docker compose down
docker compose up -d