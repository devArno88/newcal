#!/bin/bash

# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 
#   @title:  PUSH
#   @desc:   Push production build to specific repository 
#   @info:   Pushing to 'main' will trigger a new Vercel deployment
# # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # #


good_luck() {
    echo "_  _ ____ _   _    ___ _  _ ____       ____    ___  ____    _ _ _ _ ___ _  _    _   _ ____ _  _ ";
    echo "|\/| |__|  \_/      |  |__| |___    __ |___    |__] |___    | | | |  |  |__|     \_/  |  | |  | ";
    echo "|  | |  |   |       |  |  | |___       |       |__] |___    |_|_| |  |  |  |      |   |__| |__| ";
    echo "                                                                                                ";
};

# abort() {
#     printf "\n\n* * * ABORTED * * *\n\nPlease try again and provide a branch that is not main";
#     exit 1;
# }

clear;
echo "Branch:";
read branch;
git push origin $branch;
good_luck;