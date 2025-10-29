#!/usr/bin/bash
mkdir -p /e/Programmation/.npm-cache /e/Programmation/.temp
export NPM_CONFIG_CACHE=/e/Programmation/.npm-cache
export TEMP=/e/Programmation/.temp
export TMP=/e/Programmation/.temp
echo "npm cache and temp now redirected to E:"
bash
