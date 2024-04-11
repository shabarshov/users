#!/bin/bash

if [ -d "./logs/sequelize/info" ]; then
  rm ./logs/sequelize/info/* > /dev/null 2>&1
fi

if [ -d "./logs/sequelize/errors/" ]; then
  rm ./logs/sequelize/errors/* > /dev/null 2>&1
fi

if [ -d "./logs/node/info" ]; then
  rm ./logs/node/info/* > /dev/null 2>&1
fi

if [ -d "./logs/node/errors/" ]; then
  rm ./logs/node/errors/* > /dev/null 2>&1
fi
