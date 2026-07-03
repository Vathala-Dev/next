#!/usr/bin/env bash
# Build static export for https://dev.vathala.com/test/
set -euo pipefail
export BASE_PATH=/
# export NEXT_PUBLIC_SITE_URL=https://dev.vathala.com/test
export NEXT_PUBLIC_VATHALA_API_URL=https://vathala.com

pnpm run build
echo "Upload everything inside ./out/ to the server's /test/ directory."
