#!/bin/bash
# TekTree IP Data Scraper

# # # # # # # # # # # # # # # # # # # # # # # # #
#   @title:  IP 
#   @desc:   Fetch user IP details - e.g. ./ipdata,sh 8.8.8.8
# # # # # # # # # # # # # # # # # # # # # # # # #

if [ -z $NEXT_PUBLIC_IP_DATA_KEY ]; then
  echo ""
  echo "ERROR : NEXT_PUBLIC_IP_DATA_KEY env is not set"
  echo ""
  exit 1;
fi

curl "https://api.ipdata.co/$1?api-key=$NEXT_PUBLIC_IP_DATA_KEY"