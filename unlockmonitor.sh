#!/usr/bin/env bash

# cd inside script directory
SCRIPT_DIR=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" &> /dev/null && pwd)
cd $SCRIPT_DIR

PENDULUM_STATUS_EMOJI="${PENDULUM_STATUS_EMOJI:-'computer'}"
PENDULUM_STATUS_TEXT="${PENDULUM_STATUS_TEXT:-'Working...'}"

# set working status when first run
node update_custom_status.js "$PENDULUM_STATUS_EMOJI" "$PENDULUM_STATUS_TEXT"

# watch for screen unlock event and update status
dbus-monitor --session "type='signal',interface='org.gnome.ScreenSaver'" |
  while read x; do
    case "$x" in
      *"boolean false"*) node update_custom_status.js "$PENDULUM_STATUS_EMOJI" "$PENDULUM_STATUS_TEXT"
    esac
  done
