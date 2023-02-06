#!/bin/bash

abort() {
    echo "* * * * ABORTED * * * *";
    echo "This should be used to merge branches other than 'main' with latest updates from 'main'";
    printf "\n";
}

fill() {
    git fetch;
    git merge main;
    echo "* * * * SUCCESS * * * *";
    echo "This branch is now up to date with 'main'";
}

clear;
branch=$(git symbolic-ref --short HEAD);
[[ $branch = "main" ]] && abort || fill;