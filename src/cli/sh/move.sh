#!/bin/bash
#
# # # # # # # # # # # # # # # # # # # # # # # # # # # #
#   @title:  MOVE
#   @desc:   Move to/create specific branch, else main
# # # # # # # # # # # # # # # # # # # # # # # # # # # #

welcome_home() {
    echo "_  _ ____    ___  _    ____ ____ ____    _    _ _  _ ____    _  _ ____ _  _ ____ ";
    echo "|\ | |  |    |__] |    |__| |    |___    |    | |_/  |___    |__| |  | |\/| |___ ";
    echo "| \| |__|    |    |___ |  | |___ |___    |___ | | \_ |___    |  | |__| |  | |___ ";
    echo "                                                                                 ";
}

is_home() {
    target="main";
    welcome_home;
}

clear;
[ -z "$1" ] && is_home || target="$1";
exists=`git show-ref refs/heads/$target`;
[ -n "$exists" ] && git checkout $target || git checkout -b $target;