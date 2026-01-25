from flask import Flask, render_template, url_for, flash, redirect, request, session
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
    user_logged_in = False
    if 'user_id' in session:
        user_logged_in=True
    return render_template('chill_thrive.html', user_logged_in=user_logged_in)


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


@app.route("/booking")
def booking():
    if request.method == 'POST':
        data = request.get_json()
        recovery_path = data.get('recovery_path')
        date = data.get('date')
        slot = data.get('slot')
        print("Recovery path: ", recovery_path)
        print("Date: ", date)
        print("Slot: ", slot)

    return render_template("booking.html", title = "booking")


@app.route('/logout')
def logout():
    session.pop('user_id', None)
    flash('You have been logged out.', 'success')
    return redirect(url_for('chill_thrive'))


@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']

        user = User.query.filter_by(email=email).first()
        if user and check_password_hash(user.password, password):
            session['user_id'] = user.id
            return redirect(url_for('booking'))
        flash('Invalid email or password.', 'error')
    return render_template('login.html')


@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        name = request.form['name']
        phone = request.form['phone']
        email = request.form['email']
        password = request.form['password']
        hashed_password = generate_password_hash(password)

        try:
            new_user = User(email=email, name=name, phone=phone,
                            password=hashed_password, role=1)
            db.session.add(new_user)
            db.session.commit()
            flash('Signup successful! Please log in.', 'success')
            return redirect(url_for('login'))
        except Exception as e:
            flash('Username or email already exists.', 'error')
            print(e)
    return render_template('signup.html')


if __name__ == "__main__":
    app.run(debug=True)
