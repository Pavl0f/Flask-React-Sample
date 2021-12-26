# Overview
Flask x REACT x Postgresql on EC2 

# Environment
```
AMI: amzn2-ami-hvm-2.0.20211005.0-x86_64-gp2
Python: 3.7.10
Pip: 20.2.2
Node: 16.13.1
npm: 8.1.2
PostgreSQL: 9.2.24
```

# Set Up (Local DB)

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
echo export PG_PASS=****** >> ~/.bashrc
echo export PG_USERNAME=postgres >> ~/.bashrc
echo export PG_URL=127.0.0.1:5432 >> ~/.bashrc
echo export PG_DBNAME=testdb >> ~/.bashrc

echo export FLASK_SECRET=*************************** >> ~/.bashrc
source ~/.bashrc
```

# Set Up (RDS)

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

## RDS setup
psql \
--host=$RDS_ENDPOINT \
--port=$RDS_PORT \
--username=$RDS_USERNAME \
--dbname=$RDS_DBNAME

postgres=# create table client(
    client_code varchar(32) primary key,
    username varchar(32),
    email varchar(64) unique,
    password varchar(64)
);

## 環境変数設定
echo export PG_PASS=****** >> ~/.bashrc
echo export PG_USERNAME=$RDS_USERNAME >> ~/.bashrc
echo export PG_URL="${RDS_ENDPOINT}:${RDS_PORT}" >> ~/.bashrc
echo export PG_DBNAME=$RDS_DBNAME >> ~/.bashrc

echo export FLASK_SECRET=*************************** >> ~/.bashrc
source ~/.bashrc
```

# Set Up (Nginx を使う場合)

```
## Gunicorn と Nginx をインストール
sudo pip3 install gunicorn
sudo amazon-linux-extras install nginx1 -y

## プロキシ用の Nginx の設定ファイル作成
cat <<EOL >> nginx.conf
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 4096;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;

    include /etc/nginx/conf.d/*.conf;

    server {

        listen       80;
        listen       [::]:80;
        server_name  _;
        root         /usr/share/nginx/html;
    
        include /etc/nginx/default.d/*.conf;

        location / {
            proxy_pass    http://127.0.0.1:9876;
        } 

        error_page 404 /404.html;
        location = /404.html {
        }

        error_page 500 502 503 504 /50x.html;
        location = /50x.html {
        }
    }
}
EOL

## Nginx の設定を書き換え
sudo cp nginx.conf /etc/nginx/nginx.conf

## Nginx を起動
sudo systemctl start nginx
sudo systemctl enable nginx
```


# Run (Nginx なし)
```
sudo -E python3 app.py --prod
```

# Run (Nginx あり)
```
gunicorn app:server -c gunicorn-settings.py
```
