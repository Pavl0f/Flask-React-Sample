from flask import Blueprint, request, jsonify
import os
import traceback
import time, random

mod_testapi = Blueprint('testapi', __name__)

@mod_testapi.route('/testapi', methods=["GET","POST"])
def test():

    # データの受け取り
    req = request.get_json()
    print(req)

    return jsonify({}), 200