from flask import Flask, render_template, url_for, flash, redirect, request, session
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from form import RegistrationForm, LoginForm
from dotenv import load_dotenv
from models.models import db, User, Appointments
import os
from werkzeug.security import generate_password_hash, check_password_hash
from flask import jsonify


load_dotenv()

app = Flask(__name__)

app.secret_key = os.getenv('SECRET_KEY')
DATABASE_URL = os.getenv("DATABASE_URL")
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
    "pool_pre_ping": True
}
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
        user = User.query.filter_by(id=session['user_id']).first()
        return render_template('chill_thrive.html', title = "Chill thrive", user=user)
    return render_template('chill_thrive.html', user_logged_in=user_logged_in)


@app.route('/history')
def history():
    if 'user_id' not in session:
        flash('Please log in to book an appointment.', 'error')
        return redirect(url_for('login'))
    # gives list of appointments of the user in session
    today = datetime.now().date()

    active_appointments = (
        Appointments.query
        .filter(Appointments.date >= today, Appointments.user_id==session['user_id'])
        .order_by(Appointments.date.asc(), Appointments.slot.asc())
        .all()
    )

    past_appointments = (
        Appointments.query
        .filter(Appointments.date < today, Appointments.user_id==session['user_id'])
        .order_by(Appointments.date.desc(), Appointments.slot.desc())
        .all()
    )
    user = User.query.filter_by(id=session['user_id']).first()
    return render_template('history.html', title="History", active_appointments=active_appointments, past_appointments=past_appointments, user=user)


@app.route('/founder')
def founder():
    if 'user_id' in session:
        user = User.query.filter_by(id=session['user_id']).first()
        return render_template('founder.html', title = "Founder", user=user)
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


@app.route("/booking", methods=["GET", "POST"])
def booking():
    if 'user_id' not in session:
        flash('Please log in to book an appointment.', 'error')
        return redirect(url_for('login'))
    
    if request.method == 'POST':
        data = request.get_json()

        recovery_path = data.get('recovery_path')
        date_str = data.get('date')
        slot = data.get('slot')

        booking_date = datetime.strptime(date_str, "%Y-%m-%d").date()
        # Validate date is not in the past
        if booking_date < datetime.now().date():
            return jsonify(
                success=False,
                message="Cannot book a slot in the past. Please select a valid date."
            ), 400

        # check if slot is already booked
        existing = Appointments.query.filter_by(
            date=booking_date,
            slot=slot
        ).first()

        if existing:
            return jsonify(
                success=False,
                message="This time slot is already booked. Please choose another slot."
            ), 409  # Conflict

        # create new booking
        appointment = Appointments(
            user_id=session['user_id'],
            recovery_path=recovery_path,
            date=booking_date,
            slot=slot
        )

        db.session.add(appointment)
        db.session.commit()

        return jsonify(
            success=True,
            message="Booking confirmed"
        ), 200
    user = User.query.filter_by(id=session['user_id']).first()
    return render_template("booking.html", title="booking", user=user)


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
            if user.role == 1:
                return redirect(url_for('booking'))
            else:
                return redirect(url_for('admin_dashboard'))
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


@app.route('/admin-dashboard')
def admin_dashboard():
    if 'user_id' not in session:
        flash('Please log in.', 'error')
        return redirect(url_for('login'))

    user = User.query.get(session['user_id'])

    if not user or user.role not in (0, 2):
        flash('Access denied. Admins and Employees only.', 'error')
        return redirect(url_for('booking'))

    today = datetime.now().date()

    active_appointments = (
        Appointments.query
        .filter(Appointments.date >= today)
        .order_by(Appointments.date.asc(), Appointments.slot.asc())
        .all()
    )

    past_appointments = (
        Appointments.query
        .filter(Appointments.date < today)
        .order_by(Appointments.date.desc(), Appointments.slot.desc())
        .all()
    )

    return render_template(
        'admin_dashboard.html',
        title="Admin Dashboard",
        active_appointments=active_appointments,
        past_appointments=past_appointments,
        user=user
    )


if __name__ == "__main__":
    app.run(debug=True)
