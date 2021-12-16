from flask import Blueprint, render_template

mod_index = Blueprint('index', __name__)

@mod_index.route('/', methods=["GET"])
def root():
    return render_template('index.html')