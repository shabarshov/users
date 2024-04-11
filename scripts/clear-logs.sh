#!/bin/bash

if [ -d "./logs/sequelize" ]; then
  rm ./logs/sequelize/* > /dev/null 2>&1
fi

if [ -d "./logs/node" ]; then
  rm ./logs/node/* > /dev/null 2>&1
fi
