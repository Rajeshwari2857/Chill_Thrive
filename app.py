from flask import Flask, render_template, url_for, flash, redirect
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from form import RegistrationForm, LoginForm
from dotenv import load_dotenv
from models.models import db, User
import os


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
