# Flask関係のモジュール群
from flask import Flask, render_template
from flask_sqlalchemy import SQLAlchemy
import sys, os, random

# Flaskサーバー生成
def createServer():
    server = Flask(__name__, template_folder="../frontend/dist", static_folder="../frontend/dist")
    return server

# DB を作成
def createDB(server):
    
    pg_url=os.environ.get("PG_URL")        # 127.0.0.1:5432
    pg_username=os.environ.get("PG_USERNAME")   # postgres
    pg_dbname=os.environ.get("PG_DBNAME")       # testdb
    pg_password=os.environ.get("PG_PASS")       # password
    
    # DBインスタンスを生成
    server.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql+psycopg2://{pg_username}:{pg_password}@{pg_url}/{pg_dbname}'
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

from backend.controllers.testapi_controller import mod_testapi
server.register_blueprint(mod_testapi)