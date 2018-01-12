#!/bin/bash
# echo "full no-cache"
# echo "single no-cache"
for i in {1..100}
  do
    # yarn test
    yarn test:jest:single
 done
