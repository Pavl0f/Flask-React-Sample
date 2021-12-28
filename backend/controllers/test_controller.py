from flask import Blueprint, request, jsonify
import os
import traceback
import time, random

mod_test = Blueprint('test', __name__)

@mod_test.route('/test', methods=["GET","POST"])
def test():

    # データの受け取り
    req = request.get_json()
    print(req)

    return jsonify({}), 200