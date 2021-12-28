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
RDS_ENDPOINT=xxxx.yyyy.ap-northeast-1.rds.amazonaws.com >> ~/.bashrc
RDS_PORT=5432 >> ~/.bashrc
RDS_USERNAME=postgres >> ~/.bashrc
RDS_DBNAME=testdb >> ~/.bashrc

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

# Run
```
sudo -E python3 app.py --prod
```

# Options (Nginx)
```
# Nginx 設定
bash setup-nginx.sh

# Guinicorn からサーバを起動
gunicorn app:server -c gunicorn-settings.py
```


