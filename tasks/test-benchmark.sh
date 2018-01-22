#!/bin/bash
# echo "full no-cache"
# echo "full with cache"
# echo "single with cache"
echo "single no-cache"
for i in {1..100}
  do
    # yarn test:jest:nocache
    # yarn test:jest
    # yarn test:jest:single
    yarn test:jest:single:nocache
 done
