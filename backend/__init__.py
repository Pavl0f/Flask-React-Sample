# Flask関係のモジュール群
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import sys, os, random

# Flaskサーバー生成
def createServer():
    server = Flask(__name__, template_folder="../frontend/dist", static_folder="../frontend/dist")
    return server


def createDB(server, isDev=True, dburl="127.0.0.1:5432", dbname="testdb"):

    isDev = True
    
    # 開発環境で検証する場合は、ローカルのPostgresを使う
    if isDev:        
        pg_url=dburl
        pg_username=os.environ.get("PGUSERNAME")
        pg_dbname=dbname
        pg_password=os.environ.get("PGPASS")
        db_url = f'postgresql+psycopg2://{pg_username}:{pg_password}@{pg_url}/{pg_dbname}'
    
    # DBインスタンスを生成
    server.config['SQLALCHEMY_DATABASE_URI'] = db_url
    db = SQLAlchemy(server)
    
    return db

# サーバ・データベース作成
server = createServer()
db = createDB(server)

@server.errorhandler(404)   
def not_found(e):
  return render_template('index.html')

from backend.controllers.index_controller import mod_index
server.register_blueprint(mod_index)

from backend.controllers.register_controller import mod_register
server.register_blueprint(mod_register)

from backend.controllers.login_controller import mod_login
server.register_blueprint(mod_login)

from backend.controllers.logout_controller import mod_logout
server.register_blueprint(mod_logout)

from backend.controllers.authenticate_controller import mod_authenticate
server.register_blueprint(mod_authenticate)