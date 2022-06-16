#!/usr/bin/env sh

if ! [ -x "$(command -v parallel)" ]; then
    echo "couldn't find parallel. Installing..."
    sudo apt -y install linux-tools-generic
    if ! [ -x "$(command -v parallel)" ]; then
      echo "Error: still couldn't find parallel. exiting..." >&2
      exit 1
    fi
fi

echo "Running in parallel: npm run {lint:css,lint:js,prettier:check}"

parallel npm run "{1}" ::: lint:css lint:js prettier:check
