from flask import Flask, render_template, url_for, flash, redirect
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from form import RegistrationForm, LoginForm
from dotenv import load_dotenv
from models.models import db, User
import os
from werkzeug.security import generate_password_hash, check_password_hash


load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv('SECRET_KEY')
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///project_db.sqlite3'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
UPLOAD_FOLDER = 'static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

db.init_app(app)

with app.app_context():
    db.create_all()

    admin_email = os.getenv("ADMIN_EMAIL")
    admin_password = os.getenv("ADMIN_PASSWORD")
    hashed_admin_pw = generate_password_hash(admin_password)
    admin_name = os.getenv("ADMIN_NAME")
    admin_phone = os.getenv("ADMIN_PHONE")

    admin_user = User.query.filter_by(email=admin_email).first()

    # do nothing if admin exists, or creates new admin
    if admin_user:
        print("Admin user exists")
        pass
    else:
        print("Creating Admin user")
        admin = User(
            email = admin_email,
            phone = admin_phone,
            name = admin_name,
            password = hashed_admin_pw,
            role = 0
        )
        db.session.add(admin)
    db.session.commit()

@app.route('/')
@app.route('/home')
def chill_thrive():
    return render_template('chill_thrive.html')


@app.route('/founder')
def founder():
    return render_template("founder.html", title="Founder")


@app.route("/events")
def events():
    return render_template("events.html", title = "Events")


@app.route("/jacuzzi")
def jacuzzi():
    return render_template("jacuzzi.html", title = "Jacuzzi")


@app.route("/ice_bath")
def ice_bath():
    return render_template("ice_bath.html", title = "Ice bath")


@app.route("/steam_bath")
def steam_bath():
    return render_template("steam_bath.html", title = "Steam bath")


@app.route("/#booking")
@app.route("/home#booking")
def login():
    form = RegistrationForm()
    if form.validate_on_submit():
        flash(f'Account created for {form.full_name.data}!', "success")
        return redirect(url_for('chill_thrive'))
    return render_template()

def register():
    form = LoginForm()
    if form.validate_on_submit():
        if form.email.data == 'admin@blog.com' and form.password.data == "password":
            flash('You have been logged in successfully!', 'success')
            return redirect(url_for('chill_thrive'))
        else:
            flash('Login failed. Please check your email and password', 'danger')
    return render_template()


if __name__ == "__main__":
    app.run(debug=True)
