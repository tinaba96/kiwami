#!/bin/bash
set -e

rm -f /kiwami/tmp/pids/server.pid

exec "$@"
