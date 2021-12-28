#!/bin/sh
## パッケージインストール
sudo yum install -y git gcc python3-devel
sudo yum install -y postgresql postgresql-server postgresql-devel 

## node (v16.13.1) インストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16.13.1

## ビルド
npm install
npm run production

## Python モジュール インストール
sudo pip3 install -r requirements.txt