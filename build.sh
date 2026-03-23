#!/bin/bash
yarn build
cp dist/assets/index*.js dist/ha-lcars-panel.js
cp dist/assets/index*.css dist/ha-lcars-panel.css
