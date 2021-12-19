# Overview
Flask

# Environment
AMI: amzn2-ami-hvm-2.0.20211005.0-x86_64-gp2
Python: 3.7.10
Pip: 20.2.2
Node: 16.13.1
npm: 8.1.2
PostgreSQL: 9.2.24

# Set Up

```
## パッケージインストール
sudo yum install -y git gcc python3-devel
sudo yum install -y postgresql postgresql-server postgresql-devel 

## node (v16.13.1) インストール
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.34.0/install.sh | bash
. ~/.nvm/nvm.sh
nvm install 16.13.1

## リポジトリクローン
git clone https://github.com/Pavl0f/Flask-React-Sample.git
cd Flask-React-Sample

## ビルド
npm install
npm run production

## Python モジュール インストール
sudo pip3 install -r requirements.txt

## データベース 起動
sudo /sbin/service postgresql initdb
sudo /sbin/service postgresql start
sudo /sbin/chkconfig postgresql on

## データベースの認証設定を変更
sudo sed -i -e "s/peer/trust/g" /var/lib/pgsql/data/pg_hba.conf
sudo sed -i -e "s/ident/md5/g" /var/lib/pgsql/data/pg_hba.conf
sudo /sbin/service postgresql restart

## postgres ユーザのパスワードを更新
psql -U postgres
postgres=# \password
新しいパスワード: ******
もう一度入力してください： ******

## テーブル作成
createdb testdb -U postgres
psql -U postgres -d testdb

postgres=# create table client(
    client_code varchar(32) primary key,
    username varchar(32),
    email varchar(64) unique,
    password varchar(64)
);

## 環境変数設定
echo export PGPASS=****** >> ~/.bashrc
echo export PGUSERNAME=postgres >> ~/.bashrc
echo export FLASK_SECRET=*************************** >> ~/.bashrc
source ~/.bashrc
```

# Run
```
sudo -E python3 app.py --prod
```