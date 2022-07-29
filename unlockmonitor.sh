#!/usr/bin/env bash

# cd inside script directory
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
cd $SCRIPT_DIR

# set working status when first run
node update_custom_status.js "computer" "Working..."

# watch for screen unlock event and update status
dbus-monitor --session "type='signal',interface='org.gnome.ScreenSaver'" |
  while read x; do
    case "$x" in
      *"boolean false"*) node update_custom_status.js "computer" "Working...";
    esac
  done
