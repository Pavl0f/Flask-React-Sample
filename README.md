# Overview
- Flask x REACT x Postgresql/RDS
- Nginx x Gunicorn x Flask x REACT x Postgresql/RDS

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
# リポジトリのクローン
sudo yum install -y git
git clone https://github.com/Pavl0f/Flask-React-Sample.git
cd Flask-React-Sample

# 初期設定 (モジュールのインストール〜アプリケーションのビルド・データベースの作成)
bash setup-localdb.sh

# postgres ユーザのパスワードを更新
psql -U postgres
postgres=# \password
新しいパスワード: ******
もう一度入力してください： ******

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
# リポジトリのクローン
sudo yum install -y git
git clone https://github.com/Pavl0f/Flask-React-Sample.git
cd Flask-React-Sample

# 初期設定 (モジュールのインストール〜アプリケーションのビルド)
bash setup-rds.sh

# 事前に作成した RDS のパラメータを設定
echo export RDS_ENDPOINT=xxxx.yyyy.ap-northeast-1.rds.amazonaws.com >> ~/.bashrc
echo export RDS_PORT=5432 >> ~/.bashrc
echo export RDS_USERNAME=postgres >> ~/.bashrc
echo export RDS_DBNAME=testdb >> ~/.bashrc
source ~/.bashrc

## RDS setup
psql --host=$RDS_ENDPOINT --port=$RDS_PORT --username=$RDS_USERNAME --dbname=$RDS_DBNAME << EOF
create table client(
    client_code varchar(32) primary key,
    username varchar(32),
    email varchar(64) unique,
    password varchar(64)
);
EOF

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
vi nginx.conf
```

```
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
```

```
## Nginx の設定を書き換え
sudo cp nginx.conf /etc/nginx/nginx.conf

## Nginx を起動
sudo systemctl start nginx
sudo systemctl enable nginx
```


# Run
```
sudo -E python3 app.py --prod
```

# Options (Nginx をつける)
```
gunicorn app:server -c gunicorn-settings.py
```


