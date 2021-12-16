from flask import Blueprint, request, jsonify
from flask_login import current_user

mod_authenticate = Blueprint('authenticate', __name__)

@mod_authenticate.route('/authenticate', methods=["GET"])
def authenticate():

    if current_user.is_authenticated:
        return jsonify({"is_authenticated":True}), 200    
    else:
        return jsonify({"is_authenticated":False, "error_code":1}), 303