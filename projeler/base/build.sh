#!/bin/bash
# Concatenate src/ fragments into index.html
cd "$(dirname "$0")"
cat src/00-head.html src/10-site.html src/20-fair.html src/99-tail.html > index.html
echo "built index.html — $(wc -l < index.html) lines, $(du -h index.html | cut -f1)"
