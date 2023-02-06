#!/bin/bash

# # # # # # # # # # # # # # # # # # # # # # # # # # # #
#   @title:  PREP
#   @desc:   Prepare build for deployment
# # # # # # # # # # # # # # # # # # # # # # # # # # # #

ready() {
    echo "    ____  _________    ______  __   __________     ____  __________  __    ______  __   __";
    echo "   / __ \/ ____/   |  / __ \ \/ /  /_  __/ __ \   / __ \/ ____/ __ \/ /   / __ \ \/ /  / /";
    echo "  / /_/ / __/ / /| | / / / /\  /    / / / / / /  / / / / __/ / /_/ / /   / / / /\  /  / / ";
    echo " / _, _/ /___/ ___ |/ /_/ / / /    / / / /_/ /  / /_/ / /___/ ____/ /___/ /_/ / / /  /_/  ";
    echo "/_/ |_/_____/_/  |_/_____/ /_/    /_/  \____/  /_____/_____/_/   /_____/\____/ /_/  (_)   ";
    echo "                                                                                          ";
}

abort() {
    printf "\n\n* * * ABORTED * * *\n\nInvalid repository, please try again.";
    exit 1;
}

prep() {
    next lint;
    next build;
    git add .;
    git commit -m "$msg";
    clear;
    ready;
}

clear;
echo "Commit Message:";
read msg;

[[ -z "$msg" ]] && abort || prep;