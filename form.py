from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField,IntegerField
from wtforms.validators import DataRequired, Length, Email, EqualTo

class RegistrationForm(FlaskForm):
    name = StringField("Full Name", validators=[
        DataRequired()
        ])
    email = StringField('Email', validators=[
        DataRequired(),
        Email()
        ])
    phone = IntegerField('Phone number', validators=[
        DataRequired(), 
        Length(min=10, max = 10, message="Please enter a valid Phone number")
        ])
    password = PasswordField('Password', validators=[
        DataRequired()
        ])
    confirm_password = PasswordField('Confirm Password', validators=[
        DataRequired(), 
        EqualTo('password')
        ])
    submit = SubmitField('Sign up')


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[
        DataRequired(),
        Email()
        ])

    password = PasswordField('Password', validators=[
        DataRequired()
        ])
    remember = BooleanField('Remember me')
    submit = SubmitField('Login')   