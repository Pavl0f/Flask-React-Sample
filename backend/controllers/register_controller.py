from flask import Blueprint, request, jsonify
import os
from backend import db
from backend.models.client import Client
import hashlib
import traceback
import time, random

mod_register = Blueprint('register', __name__)

@mod_register.route('/register', methods=["POST"])
def register():

    # データの受け取り
    req = request.get_json()

    # ユーザー情報を登録
    client = Client()
    client.client_code = f"{int(time.time())}-{int(random.random()*(1e10))}"
    client.username = req["username"]
    client.email = req["email"]
    client.password = hashlib.sha256(req["password"].encode()).hexdigest()
    
    # ユーザー情報をデータベースに登録
    try:
        db.session.add(client)
        db.session.commit()
    except:
        traceback.print_exc()
        return jsonify({"signup_error":1}), 400

    return jsonify({"signup_error":0}), 200