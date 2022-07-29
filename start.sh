#!/usr/bin/env bash

# cd inside script directory
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
cd $SCRIPT_DIR

# show main window
gjs index.js &
