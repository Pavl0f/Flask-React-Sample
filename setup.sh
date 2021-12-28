#!/bin/sh

# パッケージインストール
sudo yum install -y gcc python3-devel
sudo yum install -y postgresql postgresql-server postgresql-devel 

# node (v16.13.1) インストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16.13.1

# ビルド
npm install
npm run production

# Python モジュール インストール
sudo pip3 install -r requirements.txt

# データベース 起動
sudo /sbin/service postgresql initdb
sudo /sbin/service postgresql start
sudo /sbin/chkconfig postgresql on

# データベースの認証設定を変更
sudo sed -i -e "s/peer/trust/g" /var/lib/pgsql/data/pg_hba.conf
sudo sed -i -e "s/ident/md5/g" /var/lib/pgsql/data/pg_hba.conf
sudo /sbin/service postgresql restart

# データベースの作成
createdb testdb -U postgres

# テーブルの作成
psql -U postgres -d testdb << EOF
create table client(
    client_code varchar(32) primary key,
    username varchar(32),
    email varchar(64) unique,
    password varchar(64)
);
EOF