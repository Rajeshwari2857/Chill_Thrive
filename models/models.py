from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db=SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(30), unique=True, nullable=False)
    email=db.Column(db.String(20), unique=True, nullable=False)
    phone = db.Column(db.String(10), nullable=False, default="default.jpg")  
    password = db.Column(db.String(60), nullable=False)
    role = db.Column(db.Integer, nullable=False, default=1)
    # 1 = customer
    # 0 = admin
    # 2 = employee