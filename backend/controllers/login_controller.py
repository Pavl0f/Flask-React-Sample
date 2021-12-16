from flask import Blueprint, request, jsonify, session
from flask_login import login_user, LoginManager
from backend import db, server
from backend import server
from backend.models.client import Client
import sys, os, traceback
import hashlib
import datetime

# ログインマネージャーの作成・シークレットキーの設定
login_manager = LoginManager()
login_manager.init_app(server)
server.config["SECRET_KEY"] = os.environ.get("FLASK_SECRET")

# LoginManagerとDBを関連付けるために必要
@login_manager.user_loader
def load_user(client_code):
    return db.session.query(Client).filter_by(client_code=client_code).first()

# # セッションID 有効期限の設定
# @server.before_request
# def before_request():
#     session.permanent = True
#     server.permanent_session_lifetime = datetime.timedelta(minutes=15)

mod_login = Blueprint('login', __name__)

@mod_login.route('/login', methods=["POST"])
def login():

    # 本当はデータベースから認証情報を取ってくる
    req = request.get_json()
    
    # メールアドレスからユーザー情報を取得
    client = db.session.query(Client).filter_by(email=req["email"]).first()
    
    # 認証情報が正しくない（アドレスが存在しない or パスワードが違う）
    if not client or not client.password == hashlib.sha256(req["password"].encode()).hexdigest():
        return jsonify({"is_login":False, "request_error":1}), 401

    # ログイン・セッションIDの生成
    login_user(client)

    return jsonify({"is_login":True, "request_error":0}), 200

