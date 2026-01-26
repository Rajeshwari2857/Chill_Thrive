from datetime import datetime
from flask_sqlalchemy import SQLAlchemy


db=SQLAlchemy()


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(30), unique=True, nullable=False)
    email=db.Column(db.String, unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)  
    password = db.Column(db.String(400), nullable=False)
    role = db.Column(db.Integer, nullable=False, default=1)
    appointments = db.relationship("Appointments", backref = "customer", lazy = True)
    # 0 = admin
    # 1 = customer
    # 2 = employee


class Appointments(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable = False)
    recovery_path = db.Column(db.Integer, nullable=False)
    # 1 = ice bath
    # 2 = jacuzzi
    # 3 = steam bath
    # 4 = full combo
    date = db.Column(db.Date, nullable=False)
    slot = db.Column(db.Integer, nullable=False)
    # 1 = 9 am
    # 2 = 12 pm 
    # 3 = 3 pm
    # 4 = 6 pm
