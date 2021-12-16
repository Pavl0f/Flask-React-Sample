from backend import db
from flask_login import UserMixin

class Client(UserMixin, db.Model):
    
    client_code = db.Column(db.String(64), primary_key=True)
    username = db.Column(db.String(32), unique=False)
    email = db.Column(db.String(64), unique=True)
    password = db.Column(db.String(64), unique=False)

    def __repr__(self):
        return "<Client {0} {1}:{2}>".format(self.client_code, self.email, self.username)

    def get_id(self):
        return self.client_code
