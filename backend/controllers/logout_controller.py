from flask import Blueprint, request, jsonify, render_template, Response
from flask_login import login_required, logout_user

mod_logout = Blueprint('logout', __name__)

@mod_logout.route('/logout', methods=["GET"])
@login_required
def logout():
    logout_user()

    return Response('''
    ログアウトに成功しました<br/>
    <a href="/">ホーム画面</a>
    ''')