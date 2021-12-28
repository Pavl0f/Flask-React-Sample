#!/bin/sh
# 念のため
cd ~/Flask-React-Sample

# Gunicorn と Nginx をインストール
sudo pip3 install gunicorn
sudo amazon-linux-extras install nginx1 -y

# Nginx のコンフィグを上書き
sudo cp nginx-proxy.conf.sample /etc/nginx/nginx.conf

# Nginx を起動
sudo systemctl start nginx
sudo systemctl enable nginx