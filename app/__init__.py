from flask import Flask
from flask_wtf.csrf import CSRFProtect
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager


app = Flask(__name__)
csrf = CSRFProtect(app)
app.config['SECRET_KEY'] = "v\xf9\xf7\x11\x13\x18\xfaMYp\xed_\xe8\xc9w\x06\x8e\xf0f\xd2\xba\xfd\x8c\xda"
# app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://postgres:Christ4life@localhost/Project2"
app.config['SQLALCHEMY_DATABASE_URI'] = "postgresql://jixgnzupqbhist:5cc730085b0879b543b7fe3a277b2ce5d5021160b82c38a4092d19f91eaf7ea1@ec2-54-165-36-134.compute-1.amazonaws.com:5432/dv7eu77k1tv7n"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = True # added just to suppress a warning

# Flask-Login login manager
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

db = SQLAlchemy(app)

UPLOAD_FOLDER = './app/static/uploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

app.config.from_object(__name__)

from app import views
