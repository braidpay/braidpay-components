#!/bin/bash

# Define the versions to deprecate (all except the latest 0.1.41)
VERSIONS_TO_DEPRECATE=(
  "0.1.33"
  "0.1.35"
  "0.1.36"
  "0.1.37"
  "0.1.38"
  "0.1.40"
)

# Deprecate message
DEPRECATE_MESSAGE="This version is deprecated. Please use version 0.1.41 or later."

# Deprecate each version
for version in "${VERSIONS_TO_DEPRECATE[@]}"; do
  echo "Deprecating braidpay-components@$version..."
  npm deprecate braidpay-components@$version "$DEPRECATE_MESSAGE"
done

echo "Done deprecating versions." 