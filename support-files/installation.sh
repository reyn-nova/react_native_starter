#!/bin/bash

if [ $# -eq 0 ]
  then
    echo "Harap memberi argument nama aplikasi dan package name"
    exit 1
fi

if [ $# -eq 1 ]
  then
    echo "Harap memberi argument package name"
    exit 1
fi

if [ -d "$1" ]; then
  echo "Folder dengan nama '$1' sudah dipakai";
  exit 1
fi

git clone https://github.com/nald-dev/react_native_starter.git $1;
cd $1;
rm -rf .git;
git init;
npm i -f;
node support-files/patch-react-gradle.js
node support-files/pod-repo-update.js;
node support-files/write-environment-info.js;
node support-files/submit-initial-commit.js;

if [ $# -eq 3 ]
  then
    git remote add origin $3;
    node support-files/rename-git-url.js $3;
fi

node support-files/rename-buck.js $2;
node support-files/rename-ios-bundle-id.js $2;
node support-files/change-package-name-reference.js $2;
node support-files/rename-readme-title.js $1;
npx react-native-rename "$1" -b $2;
npm i -f;
node support-files/pod-install.js;
node support-files/submit-rename-app-commit.js;

git remote add core https://github.com/nald-dev/react_native_starter.git;
git fetch core;

echo "Proses clone project '$1' sudah selesai, buka folder '$1' anda selanjutnya masih perlu mengatur credential google firebase di android & iOS";
